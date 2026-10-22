"use client";

import Link from "next/link";
import { useCallback, useState } from "react";

import { CalendlyStep } from "@/components/sections/calendly-step";
import { DIAL_CODES } from "@/lib/dial-codes";
import { siteConfig } from "@/lib/site";

/**
 * Demo request form (`/trial`, the "Book a demo" destination), in two steps
 * like viktor.com/contact-sales:
 *
 * 1. Work email only → "Continue". A partial lead (email, `stage: "email"`)
 *    is sent to the sheet straight away, so drop-offs are still captured.
 * 2. The rest of the details → "Book my demo" sends the full lead
 *    (`stage: "details"`). The email shows at the top with a "Change" link.
 * 3. Only when `siteConfig.calendlyUrl` is set: "Pick a time" — Calendly's
 *    inline scheduler, prefilled with name and email. A booking sends
 *    `stage: "booked"` (with the Calendly event URI).
 *
 * Plumbing mirrors xuralabs.com's:
 *
 * - Fields: name, email, jobTitle, company, phone (optional, sent as
 *   "<dial code> <number>" from the country picker + input), useCase, plus
 *   `source` and `ts` stamped at submit time.
 * - Blocks consumer email domains inline (asks for a business address).
 * - Submits twice for durability: an `Image().src` GET beacon (URL-encoded, no
 *   CORS worries) AND a `fetch(..., { mode: "no-cors" })` JSON POST. Either
 *   one lands in the Google Sheet; both is belt-and-braces.
 * - Endpoint is hard-coded below. It is the same public Google Apps Script
 *   Web App URL that xuralabs.com submits to today — public by design
 *   (deployed as *Execute as: Me · Who has access: Anyone*). To point at a
 *   different sheet, deploy your own Apps Script and edit `SHEETS_URL`.
 *   No env vars, no server route (see decisions-log ADR-0020).
 * - Success state renders in-place with a "Get started for free" CTA.
 */
const SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbx8KkFR3QUmLwg7MSKvn-AjJ97PwD1QlurNdiIvyT4QtXop9Cb7Xn0nboaYMm7i58WC/exec";

type Values = {
  name: string;
  email: string;
  jobTitle: string;
  company: string;
  /** ISO code of the picked country; resolves to a dial code via DIAL_CODES. */
  country: string;
  phone: string;
  useCase: string;
};

const EMPTY: Values = {
  name: "",
  email: "",
  jobTitle: "",
  company: "",
  country: "US",
  phone: "",
  useCase: "",
};

const CONSUMER_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "aol.com",
  "protonmail.com",
  "mail.com",
  "ymail.com",
  "live.com",
  "msn.com",
]);

const REQUIRED: (keyof Values)[] = [
  "name",
  "email",
  "jobTitle",
  "company",
];

type Errors = Partial<Record<keyof Values, string>>;

function validateField(name: keyof Values, value: string): string {
  if (REQUIRED.includes(name) && !value) return "Required";
  if (name === "email") {
    if (!value) return "Required";
    const at = value.indexOf("@");
    const dot = value.lastIndexOf(".");
    if (at < 1 || dot < at + 2) return "Enter a valid email";
    const domain = value.split("@")[1]?.toLowerCase() ?? "";
    if (CONSUMER_DOMAINS.has(domain)) return "Please use your business email";
  }
  if (name === "phone" && value) {
    const digits = value.replace(/\D/g, "");
    if (!/^[\d\s()+.-]+$/.test(value) || digits.length < 6 || digits.length > 15)
      return "Enter a valid phone number";
  }
  return "";
}

function validateAll(values: Values): Errors {
  const errors: Errors = {};
  for (const name of [...REQUIRED, "phone" as const]) {
    const msg = validateField(name, String(values[name] ?? "").trim());
    if (msg) errors[name] = msg;
  }
  return errors;
}

/** "+44 7700 900123", or "" when no number was entered. */
function formatPhone(values: Values): string {
  const number = values.phone.trim();
  if (!number) return "";
  const dial = DIAL_CODES.find((c) => c.iso === values.country)?.code ?? "";
  return `${dial} ${number}`.trim();
}

/** Fire-and-forget send to the Apps Script: GET beacon + no-cors POST. */
function sendToSheet(payload: Record<string, string>) {
  const params = Object.entries(payload)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
  try {
    new Image().src = `${SHEETS_URL}?${params}`;
  } catch {
    // Image beacon is best-effort; the fetch below is the primary channel.
  }
  try {
    void fetch(SHEETS_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(payload),
    }).catch(() => {
      // Offline or blocked (e.g. an ad blocker); the GET beacon still tries.
    });
  } catch {
    // no-cors fetch does not surface errors; the GET beacon is the fallback.
  }
}

type Step = 1 | 2 | 3;

/** Segmented progress bar; segments up to the current step are filled. */
const Progress = ({ step, total }: { step: Step; total: number }) => (
  <div className="mb-6 flex gap-2" aria-label={`Step ${step} of ${total}`} role="img">
    {Array.from({ length: total }, (_, i) => (
      <span
        key={i}
        className={`h-1 flex-1 rounded-full transition-colors duration-[var(--duration-normal)] ease-entrance ${
          i < step ? "bg-foreground" : "bg-line"
        }`}
      />
    ))}
  </div>
);

export const TrialForm = () => {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [step, setStep] = useState<Step>(1);
  const [done, setDone] = useState<false | "requested" | "booked">(false);
  const calendlyUrl = siteConfig.calendlyUrl;
  const totalSteps = calendlyUrl ? 3 : 2;

  const onBooked = useCallback(
    (eventUri: string) => {
      sendToSheet({
        email: values.email.trim(),
        stage: "booked",
        calendlyEvent: eventUri,
        source: "demo-page",
        ts: new Date().toISOString(),
      });
      setDone("booked");
    },
    [values.email],
  );

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) {
      const trimmed =
        typeof value === "string" ? value.trim() : String(value ?? "");
      const msg = validateField(key, trimmed);
      setErrors((e) => ({ ...e, [key]: msg || undefined }));
    }
  };

  const blur = (key: keyof Values) => {
    const trimmed = String(values[key] ?? "").trim();
    const msg = validateField(key, trimmed);
    setErrors((e) => ({ ...e, [key]: msg || undefined }));
  };

  const onContinue = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = values.email.trim();
    const msg = validateField("email", email);
    if (msg) {
      setErrors((e) => ({ ...e, email: msg }));
      document.querySelector<HTMLElement>('[data-field="email"]')?.focus();
      return;
    }
    sendToSheet({
      email,
      stage: "email",
      source: "demo-page",
      ts: new Date().toISOString(),
    });
    setStep(2);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errs = validateAll(values);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const first = Object.keys(errs)[0] as keyof Values;
      const el = document.querySelector<HTMLElement>(
        `[data-field="${first}"]`,
      );
      el?.focus();
      return;
    }

    sendToSheet({
      name: values.name.trim(),
      email: values.email.trim(),
      jobTitle: values.jobTitle.trim(),
      company: values.company.trim(),
      phone: formatPhone(values),
      useCase: values.useCase.trim(),
      stage: "details",
      source: "demo-page",
      ts: new Date().toISOString(),
    });

    if (calendlyUrl) setStep(3);
    else setDone("requested");
  };

  if (done) {
    return (
      <div className="rounded-sm border border-line bg-band-mist p-8 text-center">
        <p className="text-3xl" aria-hidden>
          🎉
        </p>
        <p className="mt-3 text-base font-semibold tracking-tight text-duo">
          {done === "booked" ? "You're booked." : "Demo requested."}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {done === "booked"
            ? "The invite is on its way to your inbox."
            : "We'll reach out within one business day to book a time."}
          <br />
          Want to look around before then?
        </p>
        <Link
          href={siteConfig.signupUrl}
          className="pill mt-6 inline-flex"
        >
          Get started for free <span aria-hidden>→</span>
        </Link>
      </div>
    );
  }

  if (step === 3 && calendlyUrl) {
    return (
      <div>
        <Progress step={3} total={totalSteps} />
        <p className="mb-4 text-sm font-medium">Pick a time that suits you</p>
        <CalendlyStep
          url={calendlyUrl}
          name={values.name.trim()}
          email={values.email.trim()}
          onBooked={onBooked}
        />
      </div>
    );
  }

  if (step === 1) {
    return (
      <form onSubmit={onContinue} noValidate>
        <Progress step={1} total={totalSteps} />
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Work email</span>
          <input
            data-field="email"
            type="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@company.com"
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            required
            className="w-full rounded-xl border border-line bg-background px-4 py-3.5 text-sm text-foreground outline-none transition-colors duration-[var(--duration-fast)] ease-entrance placeholder:text-muted focus:border-duo focus:ring-2 focus:ring-duo/25 aria-[invalid=true]:border-red-500"
          />
          {errors.email ? (
            <span className="mt-1 block text-xs text-red-600">{errors.email}</span>
          ) : null}
        </label>
        <button type="submit" className="pill mt-4 w-full justify-center py-3.5 text-sm font-semibold">
          Continue <span aria-hidden>→</span>
        </button>
        <p className="mt-4 text-center text-xs text-muted">
          Takes under a minute. We&apos;ll never share your email.
        </p>
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      <Progress step={2} total={totalSteps} />
      <p className="-mt-2 flex items-center justify-between gap-3 rounded-xl bg-band-mist px-4 py-2.5 text-sm">
        <span className="truncate">{values.email}</span>
        <button
          type="button"
          onClick={() => setStep(1)}
          className="shrink-0 text-xs font-semibold underline underline-offset-4"
        >
          Change
        </button>
      </p>
      <Field
        name="name"
        label="Full name"
        value={values.name}
        onChange={(v) => set("name", v)}
        onBlur={() => blur("name")}
        error={errors.name}
        autoComplete="name"
        required
      />
      <Field
        name="jobTitle"
        label="Job title"
        value={values.jobTitle}
        onChange={(v) => set("jobTitle", v)}
        onBlur={() => blur("jobTitle")}
        error={errors.jobTitle}
        autoComplete="organization-title"
        required
      />
      <Field
        name="company"
        label="Company name"
        value={values.company}
        onChange={(v) => set("company", v)}
        onBlur={() => blur("company")}
        error={errors.company}
        autoComplete="organization"
        required
      />

      <div>
        <div className="flex gap-2">
          <label className="shrink-0">
            <span className="sr-only">Country code</span>
            <select
              data-field="country"
              value={values.country}
              onChange={(e) => set("country", e.target.value)}
              autoComplete="tel-country-code"
              className="h-full w-28 rounded-xl border border-line bg-background px-3 py-3 text-sm text-foreground outline-none transition-colors duration-[var(--duration-fast)] ease-entrance focus:border-duo focus:ring-2 focus:ring-duo/25"
            >
              {DIAL_CODES.map((c) => (
                <option key={c.iso} value={c.iso}>
                  {c.iso} {c.code}
                </option>
              ))}
            </select>
          </label>
          <label className="min-w-0 flex-1">
            <span className="sr-only">Mobile number (optional)</span>
            <input
              data-field="phone"
              type="tel"
              inputMode="tel"
              value={values.phone}
              onChange={(e) => set("phone", e.target.value)}
              onBlur={() => blur("phone")}
              placeholder="Mobile number (optional)"
              autoComplete="tel-national"
              aria-invalid={errors.phone ? true : undefined}
              className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors duration-[var(--duration-fast)] ease-entrance placeholder:text-muted focus:border-duo focus:ring-2 focus:ring-duo/25 aria-[invalid=true]:border-red-500"
            />
          </label>
        </div>
        {errors.phone ? (
          <span className="mt-1 block text-xs text-red-600">{errors.phone}</span>
        ) : null}
      </div>

      <Field
        name="useCase"
        label="Primary use case"
        value={values.useCase}
        onChange={(v) => set("useCase", v)}
        placeholder="Primary use case (e.g. Pipeline intelligence, Account research)"
      />

      <button
        type="submit"
        className="pill mt-2 justify-center py-3.5 text-sm font-semibold"
      >
        {calendlyUrl ? "Pick a time" : "Book my demo"} <span aria-hidden>→</span>
      </button>
    </form>
  );
};

type FieldProps = {
  name: keyof Values;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
};

const Field = ({
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
  placeholder,
  autoComplete,
  required,
}: FieldProps) => (
  <label className="block">
    <span className="sr-only">{label}</span>
    <input
      data-field={name}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      placeholder={placeholder ?? `${label}${required ? " *" : ""}`}
      autoComplete={autoComplete}
      aria-invalid={error ? true : undefined}
      required={required}
      className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors duration-[var(--duration-fast)] ease-entrance placeholder:text-muted focus:border-duo focus:ring-2 focus:ring-duo/25 aria-[invalid=true]:border-red-500"
    />
    {error ? (
      <span className="mt-1 block text-xs text-red-600">{error}</span>
    ) : null}
  </label>
);
