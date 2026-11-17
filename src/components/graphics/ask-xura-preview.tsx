import Image from "next/image";

/**
 * AskXuraPreview — a coded replica of the Ask Xura chat panel: a question in
 * plain language, Xura's answer with the numbers it used, a source chip and a
 * follow-up composer. Figures match `HiringAppPreview` (11 applied → 7
 * screened → 2 offers → 1 hired) so the two previews tell one story.
 * Decorative illustration (aria-hidden); used as the first "What they
 * produce" card on the home page.
 */
export const AskXuraPreview = ({ className = "" }: { className?: string }) => (
  <div aria-hidden className={`flex h-full flex-col gap-3 bg-line-soft p-4 text-foreground ${className}`}>
    <div className="flex items-center gap-2 text-xs">
      <span className="font-semibold text-app-brand">✦ Ask Xura</span>
      <span className="text-muted">· Hiring pipeline</span>
    </div>

    <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-foreground px-3.5 py-2 text-xs leading-snug text-background">
      Where are candidates dropping off this month?
    </p>

    <div className="flex gap-2.5">
      <Image src="/assets/xura-logo.png" alt="" width={64} height={64} className="size-6 shrink-0 rounded-md" />
      <div className="min-w-0 rounded-2xl rounded-tl-md bg-background p-3 text-xs leading-relaxed shadow-sm">
        <p>
          Most candidates drop off <span className="font-semibold">between offer and hire</span>: 2 offers out, 1 accepted (50%).
          Screening keeps 7 of 11 applicants (64%).
        </p>
        <p className="mt-2 flex flex-wrap gap-1.5">
          <span className="rounded-full border border-line px-2 py-0.5 text-[0.625rem] text-muted">Source: Hiring pipeline</span>
          <span className="rounded-full border border-app-brand-soft px-2 py-0.5 text-[0.625rem] text-app-brand">Show the funnel</span>
        </p>
      </div>
    </div>

    <div className="mt-auto flex items-center gap-2 rounded-full bg-background px-3.5 py-2 text-xs text-muted ring-1 ring-line">
      Ask a follow-up…
      <span className="ml-auto grid size-5 place-items-center rounded-full bg-foreground text-[0.625rem] text-background">↑</span>
    </div>
  </div>
);
