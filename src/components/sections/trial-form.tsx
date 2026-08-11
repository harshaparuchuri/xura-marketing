"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * Free-trial form. Mirrors xuralabs.com's current plumbing exactly:
 *
 * - Fields: firstName, lastName, email, jobTitle, company, teamSize, useCase,
 *   dataStack, plus `source` and `ts` stamped at submit time.
 * - Blocks consumer email domains inline (asks for a business address).
 * - Submits twice for durability: an `Image().src` GET beacon (URL-encoded, no
 *   CORS worries) AND a `fetch(..., { mode: "no-cors" })` JSON POST. Either
 *   one lands in the Google Sheet; both is belt-and-braces.
 * - Endpoint is hard-coded below. It is the same public Google Apps Script
 *   Web App URL that xuralabs.com submits to today — public by design
 *   (deployed as *Execute as: Me · Who has access: Anyone*). To point at a
 *   different sheet, deploy your own Apps Script and edit `SHEETS_URL`.
 *   No env vars, no server route (see decisions-log ADR-0020).
 * - Success state renders in-place with a "Setup Now →" CTA to
 *   app.xuralabs.com.
 */
const SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbx8KkFR3QUmLwg7MSKvn-AjJ97PwD1QlurNdiIvyT4QtXop9Cb7Xn0nboaYMm7i58WC/exec";

type Values = {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  company: string;
  teamSize: "" | "1-10" | "11-50" | "51-200" | "201+";
  useCase: string;
  dataStack: string;
};

const EMPTY: Values = {
  firstName: "",
  lastName: "",
  email: "",
  jobTitle: "",
  company: "",
  teamSize: "",
  useCase: "",
  dataStack: "",
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
  "firstName",
  "lastName",
  "email",
  "jobTitle",
  "company",
  "teamSize",
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
  return "";
}

function validateAll(values: Values): Errors {
  const errors: Errors = {};
  for (const name of REQUIRED) {
    const msg = validateField(name, String(values[name] ?? "").trim());
    if (msg) errors[name] = msg;
  }
  return errors;
}

export const TrialForm = () => {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

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

    const payload = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      jobTitle: values.jobTitle.trim(),
      company: values.company.trim(),
      teamSize: values.teamSize,
      useCase: values.useCase.trim(),
      dataStack: values.dataStack.trim(),
      source: "trial-page",
      ts: new Date().toISOString(),
    };

    const params = Object.entries(payload)
      .map(
        ([k, v]) =>
          `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`,
      )
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
      });
    } catch {
      // no-cors fetch does not surface errors; the GET beacon is the fallback.
    }

    setDone(true);
  };

  if (done) {
    return (
      <div className="rounded-sm border border-line bg-band-mist p-8 text-center">
        <p className="text-3xl" aria-hidden>
          🎉
        </p>
        <p className="mt-3 text-base font-semibold tracking-tight text-duo">
          You're in.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          We'll reach out within one business day.
          <br />
          Ready to get started now?
        </p>
        <Link
          href="https://app.xuralabs.com/"
          className="pill mt-6 inline-flex"
        >
          <span aria-hidden>▪</span> Setup now
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field
          name="firstName"
          label="First name"
          value={values.firstName}
          onChange={(v) => set("firstName", v)}
          onBlur={() => blur("firstName")}
          error={errors.firstName}
          autoComplete="given-name"
          required
        />
        <Field
          name="lastName"
          label="Last name"
          value={values.lastName}
          onChange={(v) => set("lastName", v)}
          onBlur={() => blur("lastName")}
          error={errors.lastName}
          autoComplete="family-name"
          required
        />
      </div>
      <Field
        name="email"
        type="email"
        label="Business email"
        value={values.email}
        onChange={(v) => set("email", v)}
        onBlur={() => blur("email")}
        error={errors.email}
        autoComplete="email"
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

      <label className="block">
        <span className="sr-only">Team size</span>
        <select
          data-field="teamSize"
          value={values.teamSize}
          onChange={(e) => set("teamSize", e.target.value as Values["teamSize"])}
          onBlur={() => blur("teamSize")}
          aria-invalid={errors.teamSize ? true : undefined}
          className="w-full appearance-none rounded-sm border border-line bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors duration-[var(--duration-fast)] ease-entrance focus:border-duo focus:ring-2 focus:ring-duo/25 aria-[invalid=true]:border-red-500"
          required
        >
          <option value="" disabled>
            Team size *
          </option>
          <option value="1-10">1 to 10</option>
          <option value="11-50">11 to 50</option>
          <option value="51-200">51 to 200</option>
          <option value="201+">201+</option>
        </select>
        {errors.teamSize ? (
          <span className="mt-1 block text-xs text-red-600">
            {errors.teamSize}
          </span>
        ) : null}
      </label>

      <Field
        name="useCase"
        label="Primary use case"
        value={values.useCase}
        onChange={(v) => set("useCase", v)}
        placeholder="Primary use case (e.g. Pipeline intelligence, Account research)"
      />
      <Field
        name="dataStack"
        label="Current data stack"
        value={values.dataStack}
        onChange={(v) => set("dataStack", v)}
        placeholder="Current data stack (e.g. Salesforce, HubSpot, Snowflake)"
      />

      <button
        type="submit"
        className="pill mt-2 justify-center"
      >
        <span aria-hidden>▪</span> Get started
      </button>
      <p className="meta text-center">No credit card required</p>
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
      className="w-full rounded-sm border border-line bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors duration-[var(--duration-fast)] ease-entrance placeholder:text-muted focus:border-duo focus:ring-2 focus:ring-duo/25 aria-[invalid=true]:border-red-500"
    />
    {error ? (
      <span className="mt-1 block text-xs text-red-600">{error}</span>
    ) : null}
  </label>
);
