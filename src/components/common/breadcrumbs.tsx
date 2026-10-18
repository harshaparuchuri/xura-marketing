import Link from "next/link";

import { type Crumb, getBreadcrumbStructuredData } from "@/utils/seo/structured-data";

/**
 * Breadcrumbs — a visible "Home › Industries › Pharma" trail plus the
 * matching BreadcrumbList JSON-LD, so search results can show the path.
 * The last crumb is the current page (not a link, `aria-current="page"`).
 */
export const Breadcrumbs = ({
  crumbs,
  className = "",
}: {
  crumbs: Crumb[];
  className?: string;
}) => (
  <nav aria-label="Breadcrumb" className={className}>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbStructuredData(crumbs)) }}
    />
    <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
      {crumbs.map((crumb, i) => {
        const last = i === crumbs.length - 1;
        return (
          <li key={crumb.path} className="flex items-center gap-1.5">
            {last ? (
              <span aria-current="page" className="text-foreground">
                {crumb.name}
              </span>
            ) : (
              <>
                <Link
                  href={crumb.path || "/"}
                  className="-my-2 inline-flex min-h-10 items-center px-1 transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-foreground"
                >
                  {crumb.name}
                </Link>
                <span aria-hidden>›</span>
              </>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);
