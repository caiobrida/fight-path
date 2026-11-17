import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "quiet" | "danger";

export function ActionLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: Variant }) {
  return (
    <a {...props} className={`fp-button fp-button--${variant} ${className}`} />
  );
}

export function Button({
  variant = "primary",
  className = "",
  busy,
  children,
  ...props
}: ComponentProps<"button"> & { variant?: Variant; busy?: boolean }) {
  return (
    <button
      type="button"
      {...props}
      disabled={props.disabled || busy}
      aria-busy={busy || undefined}
      className={`fp-button fp-button--${variant} ${className}`}
    >
      {busy && <span className="fp-spinner" aria-hidden="true" />}
      {children}
    </button>
  );
}

export function Card({
  children,
  className = "",
  ...props
}: ComponentProps<"article">) {
  return (
    <article {...props} className={`fp-card ${className}`}>
      {children}
    </article>
  );
}

export function Badge({
  children,
  tone = "accent",
}: {
  children: ReactNode;
  tone?: "accent" | "muted" | "success";
}) {
  return <span className={`fp-badge fp-badge--${tone}`}>{children}</span>;
}

export function Notice({
  children,
  error = false,
}: {
  children: ReactNode;
  error?: boolean;
}) {
  return (
    <div
      className={`fp-notice ${error ? "fp-notice--error" : ""}`}
      role={error ? "alert" : "status"}
    >
      {children}
    </div>
  );
}

export function Notation({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <span className="fp-notation" aria-label={label}>
      {children}
    </span>
  );
}

export function Progress({
  label,
  value,
  max,
}: {
  label: string;
  value: number;
  max: number;
}) {
  return (
    <label className="fp-progress">
      <span>
        {label}{" "}
        <strong>
          {value}/{max}
        </strong>
      </span>
      <progress value={value} max={max} />
    </label>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="fp-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

export function EmptyState({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="fp-empty">
      <h2>{title}</h2>
      <p>{children}</p>
    </section>
  );
}
