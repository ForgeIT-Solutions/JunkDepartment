"use client";

/*
 * Booking form → Jobber.
 * Posts to the `jobber-lead` Supabase Edge Function (URL from
 * NEXT_PUBLIC_JOBBER_LEAD_URL). Until that env var is set, the form runs in
 * DEMO MODE and simulates a successful booking so the flow can be shown.
 * See JOBBER-INTEGRATION.md for wiring the real endpoint + credentials.
 */

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, AlertTriangle, ArrowRight, CalendarDays } from "lucide-react";
import { SERVICE_TYPE_OPTIONS, TIME_SLOTS } from "@/lib/constants";

type Status = "idle" | "submitting" | "success" | "error";

const LEAD_URL = process.env.NEXT_PUBLIC_JOBBER_LEAD_URL;

const inputBase =
  "w-full bg-brand-charcoal border border-brand-ash text-brand-cream placeholder-brand-mist/60 px-4 py-3 min-h-[48px] text-base rounded-sm focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/40 transition";
const labelBase =
  "block text-brand-gold uppercase tracking-[0.18em] text-xs font-bold mb-2";

/** Today in YYYY-MM-DD, for the date input's min. */
function todayISO() {
  const d = new Date();
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tz).toISOString().slice(0, 10);
}

export function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [slot, setSlot] = useState<string>("");
  const [submittedName, setSubmittedName] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (String(data.get("_gotcha") || "")) return; // bot

    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      address: String(data.get("address") || ""),
      serviceType: String(data.get("serviceType") || ""),
      details: String(data.get("details") || ""),
      preferredDate: String(data.get("preferredDate") || ""),
      preferredSlot: slot,
    };

    if (!slot) {
      setStatus("error");
      setErrorMsg("Please pick an arrival window.");
      return;
    }

    setStatus("submitting");
    setErrorMsg(null);

    // DEMO MODE — no endpoint configured yet.
    if (!LEAD_URL) {
      await new Promise((r) => setTimeout(r, 700));
      setSubmittedName(payload.name);
      setStatus("success");
      form.reset();
      setSlot("");
      return;
    }

    try {
      const res = await fetch(LEAD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok && res.status !== 202) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Something went wrong. Please try again or call us.");
      }
      setSubmittedName(payload.name);
      setStatus("success");
      form.reset();
      setSlot("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please call us directly."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="bg-brand-green-dark border-l-4 border-brand-gold p-5 sm:p-8 rounded-sm">
        <CheckCircle2 size={48} className="text-brand-gold" strokeWidth={1.5} aria-hidden />
        <h3 className="mt-4 font-display font-black uppercase text-brand-cream text-2xl sm:text-3xl tracking-tight">
          You&apos;re booked{submittedName ? `, ${submittedName}` : ""}!
        </h3>
        <p className="mt-2 text-brand-cream/80 text-sm sm:text-base">
          We&apos;ve got your request and your preferred window. We&apos;ll text you to confirm the
          exact time, and again when we&apos;re about 15 minutes out.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="bf-name" className={labelBase}>Full Name *</label>
          <input id="bf-name" name="name" type="text" required autoComplete="name" className={inputBase} placeholder="Jane Smith" />
        </div>
        <div>
          <label htmlFor="bf-phone" className={labelBase}>Phone Number *</label>
          <input id="bf-phone" name="phone" type="tel" required autoComplete="tel" className={inputBase} placeholder="(331) 213-9977" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="bf-email" className={labelBase}>Email Address *</label>
          <input id="bf-email" name="email" type="email" required autoComplete="email" className={inputBase} placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor="bf-address" className={labelBase}>Pickup Address</label>
          <input id="bf-address" name="address" type="text" autoComplete="street-address" className={inputBase} placeholder="123 Main St, Your City" />
        </div>
      </div>

      <div>
        <label htmlFor="bf-service" className={labelBase}>Service Type *</label>
        <select id="bf-service" name="serviceType" required defaultValue="" className={inputBase}>
          <option value="" disabled>Select a service…</option>
          {SERVICE_TYPE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="bf-details" className={labelBase}>What Are We Hauling? *</label>
        <textarea id="bf-details" name="details" required rows={4} className={`${inputBase} min-h-[120px]`} placeholder="Type of items, rough volume, access (stairs, basement, etc.)" />
      </div>

      {/* ---- Scheduling ---- */}
      <div className="border-t border-brand-ash/40 pt-5">
        <p className="flex items-center gap-2 text-brand-cream font-display font-bold uppercase tracking-wide text-sm mb-4">
          <CalendarDays size={18} className="text-brand-gold" /> Pick Your Time
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="bf-date" className={labelBase}>Preferred Date *</label>
            <input id="bf-date" name="preferredDate" type="date" required min={todayISO()} className={inputBase} />
          </div>
          <div>
            <span className={labelBase}>Arrival Window *</span>
            <div className="grid grid-cols-1 gap-2" role="radiogroup" aria-label="Arrival window">
              {TIME_SLOTS.map((s) => {
                const active = slot === s;
                return (
                  <button
                    type="button"
                    key={s}
                    role="radio"
                    aria-checked={active}
                    onClick={() => setSlot(s)}
                    className={`text-left px-4 py-2.5 rounded-sm border text-sm font-medium transition min-h-[44px] ${
                      active
                        ? "border-brand-gold bg-brand-gold text-brand-green-dark"
                        : "border-brand-ash bg-brand-charcoal text-brand-cream hover:border-brand-gold/60"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Honeypot */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {errorMsg && (
        <div role="alert" className="flex items-start gap-3 bg-amber-950/40 border border-amber-600/50 text-amber-200 text-sm p-4 rounded-sm">
          <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
          <p>{errorMsg}</p>
        </div>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn-primary w-full text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed">
        {status === "submitting" ? (
          <><Loader2 size={18} className="animate-spin" /> Booking…</>
        ) : (
          <>Book My Pickup <ArrowRight size={18} /></>
        )}
      </button>

      <p className="text-brand-mist text-xs text-center">
        No payment required to book. We confirm your firm price before we start.
      </p>
    </form>
  );
}
