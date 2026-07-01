# Jobber Integration

The website booking form pushes leads into **Jobber** through a Supabase Edge
Function so the OAuth secrets never touch the browser.

```
Website /book form
        │  POST JSON
        ▼
Supabase Edge Function  ── refresh token ──▶  Jobber OAuth  (api.getjobber.com/api/oauth/token)
   (jobber-lead)         ── clientCreate  ──▶  Jobber GraphQL (api.getjobber.com/api/graphql)
        │                ── requestCreate ──▶
        ▼
Supabase tables: jobber_leads (source of truth) + jobber_oauth (rotating tokens)
```

Deploy target: the shared **SFP Supabase project** (`ekuzbozvnouexksthlfa`).

---

## 1. Create the Jobber app (one time)

1. In the [Jobber Developer Center](https://developer.getjobber.com), create a
   new app under Patrick's Jobber account.
2. Scopes: at minimum `read_clients`, `write_clients`, `write_requests`.
3. Redirect URI: a temporary bootstrap URL (see step 3) — e.g.
   `https://ekuzbozvnouexksthlfa.supabase.co/functions/v1/jobber-oauth-callback`
   or any URL you can read the `?code=` off of.
4. Copy the **Client ID** and **Client Secret**.

## 2. Apply the database migration

`supabase/migrations/20260630_jobber_integration.sql` creates `jobber_oauth`
and `jobber_leads` (RLS on, no policies — service-role only). Apply it to the
SFP project.

## 3. Bootstrap the OAuth connection (one time)

Jobber uses the authorization-code flow and **rotates refresh tokens**, so we
capture the first refresh token manually and store it:

1. Visit the authorize URL (fill in CLIENT_ID + REDIRECT_URI):
   `https://api.getjobber.com/api/oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&response_type=code`
2. Approve — grab the `code` from the redirect.
3. Exchange it for tokens:
   ```bash
   curl -X POST https://api.getjobber.com/api/oauth/token \
     -H "Content-Type: application/json" \
     -d '{"grant_type":"authorization_code","client_id":"...","client_secret":"...","code":"...","redirect_uri":"..."}'
   ```
4. Insert the returned `refresh_token` into `jobber_oauth`:
   ```sql
   insert into public.jobber_oauth (provider, refresh_token)
   values ('jobber', 'THE_REFRESH_TOKEN');
   ```
   From here the Edge Function auto-refreshes and persists the rotated token.

## 4. Set secrets + deploy the function

```bash
supabase secrets set JOBBER_CLIENT_ID=... JOBBER_CLIENT_SECRET=...
supabase functions deploy jobber-lead --project-ref ekuzbozvnouexksthlfa
```
(`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are injected by the platform.)

## 5. Point the site at the function

Set in `.env.local` (and the host's env), then rebuild:
```
NEXT_PUBLIC_JOBBER_LEAD_URL=https://ekuzbozvnouexksthlfa.supabase.co/functions/v1/jobber-lead
```
Without it, the booking form stays in DEMO MODE (simulated success).

---

## Before go-live — verify against the live schema

- Confirm `JOBBER_API_VERSION` in the function is a **current active version**
  (Developer Center → API Versioning).
- Validate `ClientCreateInput` and especially **`RequestCreateInput`** field
  names in the Developer Center **GraphiQL** — field names can differ by version.
  The function is written defensively (the lead is saved to `jobber_leads`
  before any Jobber call), so a schema mismatch never loses a lead.
- Lock `Access-Control-Allow-Origin` in the function to the production domain.
- Decide whether "customer picks a slot" should hard-book a Jobber visit or
  create a request the office confirms. Current build sends the requested
  date/window as request instructions for the office to confirm — the safe
  default, since Jobber's API has no public open-slot availability endpoint.
