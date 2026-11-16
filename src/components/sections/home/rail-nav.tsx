"use client";

/**
 * RailNav — ‹ › buttons that page a horizontal scroll rail (visual
 * reference: wonderful.ai's case-study carousel). Scrolls the element with
 * `targetId` by ~80% of its width using the browser's native smooth
 * scrolling; the rail itself still works by touch, trackpad and keyboard.
 */
export const RailNav = ({ targetId, label }: { targetId: string; label: string }) => {
  const page = (dir: 1 | -1) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const button =
    "flex size-10 items-center justify-center rounded-full border border-line bg-background text-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:border-foreground";

  return (
    <div className="flex gap-2" role="group" aria-label={label}>
      <button type="button" className={button} aria-label="Previous" aria-controls={targetId} onClick={() => page(-1)}>
        <span aria-hidden>‹</span>
      </button>
      <button type="button" className={button} aria-label="Next" aria-controls={targetId} onClick={() => page(1)}>
        <span aria-hidden>›</span>
      </button>
    </div>
  );
};
