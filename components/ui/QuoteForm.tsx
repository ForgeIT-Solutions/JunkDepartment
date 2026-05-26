"use client";

/*
 * FORMSPREE SETUP:
 * 1. Go to https://formspree.io and create a free account
 * 2. Create a new form and copy your Form ID
 * 3. Replace FORMSPREE_FORM_ID in lib/constants.ts with your ID
 * 4. Formspree free tier: 50 submissions/month — upgrade if needed
 */

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import {
  FORMSPREE_FORM_ID,
  SERVICE_TYPE_OPTIONS,
  REFERRAL_SOURCE_OPTIONS,
} from "@/lib/constants";

type Status = "idle" | "submitting" | "success" | "error";

const inputBase =
  "w-full bg-brand-charcoal border border-brand-ash text-brand-cream placeholder-brand-mist/60 px-4 py-3 rounded-sm focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/40 transition";

const labelBase =
  "block text-brand-gold uppercase tracking-[0.18em] text-xs font-bold mb-2";

export function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedName, setSubmittedName] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");

    setStatus("submitting");
    setErrorMsg(null);

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(
          body?.errors?.[0]?.message ||
            "Something went wrong submitting your quote. Please try again."
        );
      }
      setSubmittedName(name);
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or call us directly."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="bg-brand-green-dark border-l-4 border-brand-gold p-8 rounded-sm">
        <CheckCircle2
          size={48}
          className="text-brand-gold"
          strokeWidth={1.5}
          aria-hidden
        />
        <h3 className="mt-4 font-display font-black uppercase text-brand-cream text-3xl tracking-tight">
          Thanks{submittedName ? `, ${submittedName}` : ""}!
        </h3>
        <p className="mt-2 text-brand-cream/80">
          We&apos;ll be in touch within 24 hours to confirm your quote.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="qf-name" className={labelBase}>
            Full Name *
          </label>
          <input
            id="qf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputBase}
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label htmlFor="qf-phone" className={labelBase}>
            Phone Number *
          </label>
          <input
            id="qf-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={inputBase}
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      <div>
        <label htmlFor="qf-email" className={labelBase}>
          Email Address *
        </label>
        <input
          id="qf-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputBase}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="qf-service" className={labelBase}>
          Service Type *
        </label>
        <select
          id="qf-service"
          name="service_type"
          required
          defaultValue=""
          className={inputBase}
        >
          <option value="" disabled>
            Select a service…
          </option>
          {SERVICE_TYPE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="qf-desc" className={labelBase}>
          Job Description *
        </label>
        <textarea
          id="qf-desc"
          name="description"
          required
          rows={5}
          className={inputBase}
          placeholder="Tell us what you'd like hauled — type of items, approximate volume, access (stairs, basement, etc.)"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="qf-date" className={labelBase}>
            Preferred Date
          </label>
          <input
            id="qf-date"
            name="preferred_date"
            type="date"
            className={inputBase}
          />
        </div>
        <div>
          <label htmlFor="qf-source" className={labelBase}>
            How Did You Hear About Us?
          </label>
          <select
            id="qf-source"
            name="referral_source"
            defaultValue=""
            className={inputBase}
          >
            <option value="">— Select —</option>
            {REFERRAL_SOURCE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Honeypot for bots */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {errorMsg && (
        <div
          role="alert"
          className="flex items-start gap-3 bg-amber-950/40 border border-amber-600/50 text-amber-200 text-sm p-4 rounded-sm"
        >
          <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
          <p>{errorMsg}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            Get My Free Quote <ArrowRight size={18} />
          </>
        )}
      </button>

      <p className="text-brand-mist text-xs text-center">
        We respect your privacy. Your info will never be shared.
      </p>
    </form>
  );
}
