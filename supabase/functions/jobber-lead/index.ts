// Supabase Edge Function: jobber-lead
// -----------------------------------------------------------------------------
// Receives a booking/lead from the Junk Dept. website and pushes it into Jobber.
//
// Flow:
//   1. Validate the incoming lead payload.
//   2. Store the lead in `jobber_leads` (source of truth — never lose a lead
//      even if the Jobber call fails).
//   3. Refresh the Jobber OAuth access token using the stored refresh token
//      (Jobber ROTATES refresh tokens, so we persist the new one every time).
//   4. Create the client in Jobber (clientCreate), then create a work request
//      (requestCreate) that carries the service, details, and requested time.
//   5. Record the Jobber IDs back onto the lead row.
//
// Secrets (set via `supabase secrets set` — NEVER in the frontend):
//   JOBBER_CLIENT_ID, JOBBER_CLIENT_SECRET
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (auto-injected in the platform)
//
// One-time bootstrap: complete the OAuth consent once and insert the initial
// refresh_token into the `jobber_oauth` table (see JOBBER-INTEGRATION.md).
// -----------------------------------------------------------------------------

import { createClient } from "jsr:@supabase/supabase-js@2";

// Pin the Jobber API version. Update to a current active version from the
// Developer Center (format YYYY-MM-DD) and re-test before shipping.
const JOBBER_API_VERSION = "2025-01-20";
const JOBBER_TOKEN_URL = "https://api.getjobber.com/api/oauth/token";
const JOBBER_GRAPHQL_URL = "https://api.getjobber.com/api/graphql";

const cors = {
  "Access-Control-Allow-Origin": "*", // TODO: lock to the production domain
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });

interface LeadPayload {
  name: string;
  email: string;
  phone: string;
  address?: string;
  serviceType?: string;
  details?: string;
  preferredDate?: string; // ISO date, e.g. 2026-07-15
  preferredSlot?: string; // human label, e.g. "8:00 AM – 10:00 AM"
}

function validate(p: Partial<LeadPayload>): p is LeadPayload {
  return (
    typeof p.name === "string" && p.name.trim().length > 1 &&
    typeof p.email === "string" && /.+@.+\..+/.test(p.email) &&
    typeof p.phone === "string" && p.phone.replace(/\D/g, "").length >= 10
  );
}

const admin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

/** Exchange the stored (rotating) refresh token for a fresh access token. */
async function getAccessToken(): Promise<string> {
  const { data: row, error } = await admin
    .from("jobber_oauth")
    .select("id, refresh_token")
    .eq("provider", "jobber")
    .single();
  if (error || !row?.refresh_token) {
    throw new Error("Jobber not connected: no refresh token on file. Run the OAuth bootstrap.");
  }

  const res = await fetch(JOBBER_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "refresh_token",
      client_id: Deno.env.get("JOBBER_CLIENT_ID"),
      client_secret: Deno.env.get("JOBBER_CLIENT_SECRET"),
      refresh_token: row.refresh_token,
    }),
  });
  if (!res.ok) throw new Error(`Jobber token refresh failed: ${res.status} ${await res.text()}`);

  const tok = await res.json();
  // Persist the ROTATED refresh token immediately, or the next call breaks.
  await admin
    .from("jobber_oauth")
    .update({
      refresh_token: tok.refresh_token ?? row.refresh_token,
      access_token: tok.access_token,
      expires_at: new Date(Date.now() + (tok.expires_in ?? 3600) * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", row.id);

  return tok.access_token as string;
}

async function jobberGraphQL(accessToken: string, query: string, variables: unknown) {
  const res = await fetch(JOBBER_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-JOBBER-GRAPHQL-VERSION": JOBBER_API_VERSION,
    },
    body: JSON.stringify({ query, variables }),
  });
  const body = await res.json();
  if (body.errors) throw new Error(`Jobber GraphQL error: ${JSON.stringify(body.errors)}`);
  return body.data;
}

const CLIENT_CREATE = /* GraphQL */ `
  mutation CreateClient($input: ClientCreateInput!) {
    clientCreate(input: $input) {
      client { id }
      userErrors { message }
    }
  }
`;

// NOTE: validate RequestCreateInput field names against the account's API
// version in the Developer Center GraphiQL before go-live.
const REQUEST_CREATE = /* GraphQL */ `
  mutation CreateRequest($input: RequestCreateInput!) {
    requestCreate(input: $input) {
      request { id }
      userErrors { message }
    }
  }
`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let payload: Partial<LeadPayload>;
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  if (!validate(payload)) return json({ error: "Missing or invalid fields" }, 422);

  // 1. Persist the lead first — this is the source of truth.
  const { data: lead, error: leadErr } = await admin
    .from("jobber_leads")
    .insert({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      address: payload.address ?? null,
      service_type: payload.serviceType ?? null,
      details: payload.details ?? null,
      preferred_date: payload.preferredDate ?? null,
      preferred_slot: payload.preferredSlot ?? null,
      status: "received",
    })
    .select("id")
    .single();
  if (leadErr) return json({ error: "Could not save lead", detail: leadErr.message }, 500);

  // 2. Push to Jobber (best-effort — the lead is already saved).
  try {
    const token = await getAccessToken();

    const [first, ...rest] = payload.name.trim().split(" ");
    const clientData = await jobberGraphQL(token, CLIENT_CREATE, {
      input: {
        firstName: first,
        lastName: rest.join(" ") || "-",
        emails: [{ description: "MAIN", primary: true, address: payload.email }],
        phones: [{ description: "MAIN", primary: true, number: payload.phone }],
      },
    });
    const clientId = clientData?.clientCreate?.client?.id;

    const when =
      payload.preferredDate || payload.preferredSlot
        ? `\nRequested time: ${payload.preferredDate ?? ""} ${payload.preferredSlot ?? ""}`.trim()
        : "";
    const requestData = await jobberGraphQL(token, REQUEST_CREATE, {
      input: {
        clientId,
        title: `Website: ${payload.serviceType ?? "Junk Removal"}`,
        instructions:
          `${payload.details ?? "No details provided."}` +
          `${payload.address ? `\nAddress: ${payload.address}` : ""}` +
          `${when}`,
      },
    });
    const requestId = requestData?.requestCreate?.request?.id;

    await admin
      .from("jobber_leads")
      .update({ status: "sent_to_jobber", jobber_client_id: clientId, jobber_request_id: requestId })
      .eq("id", lead.id);

    return json({ ok: true, leadId: lead.id, jobber: { clientId, requestId } });
  } catch (err) {
    // Lead is safe; surface a soft success so the customer still gets a receipt.
    await admin
      .from("jobber_leads")
      .update({ status: "jobber_failed", error: String(err) })
      .eq("id", lead.id);
    return json({ ok: true, leadId: lead.id, jobberQueued: true }, 202);
  }
});
