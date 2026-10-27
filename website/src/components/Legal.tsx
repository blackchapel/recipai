import type { ReactNode } from "react";
import { site } from "../config";
import { Link } from "../router";

export type LegalSection = { id: string; title: string; body: ReactNode };

/** The shared frame of the policy pages: title, date, contents, numbered sections. */
export function LegalPage({
  title,
  intro,
  sections,
  other,
}: {
  title: string;
  intro: ReactNode;
  sections: LegalSection[];
  other: { to: string; label: string };
}) {
  return (
    <article className="sect legal">
      <div className="wrap legal-in">
        <header className="legal-head">
          <p className="eyebrow">{site.name}</p>
          <h1 className="display">{title}</h1>
          <p className="updated mono">Last updated {site.policyUpdated}</p>
          <div className="lead">{intro}</div>
        </header>
        <nav className="toc" aria-label="On this page">
          <h2>On this page</h2>
          <ol>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.title}</a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="prose">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`}>
              <h2 id={`${s.id}-h`}>
                <span className="mono num">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </h2>
              {s.body}
            </section>
          ))}
          <p className="also">
            Also read: <Link to={other.to}>{other.label}</Link>
          </p>
        </div>
      </div>
    </article>
  );
}

/** How to reach the maintainers: GitHub issues, plus an email if one is configured. */
export function Contact() {
  return (
    <p>
      Questions, or a request about your data? Open an issue at{" "}
      <a href={site.issuesUrl} rel="noopener">{site.issuesUrl.replace("https://", "")}</a>
      {site.contactEmail && (
        <>
          {" "}
          or write to <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
        </>
      )}
      . Please don't post private information in a public issue; ask for a private way to share it and we will arrange
      one.
    </p>
  );
}
