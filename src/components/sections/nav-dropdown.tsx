"use client";

import { animated, useSpring } from "@react-spring/web";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * NavDropdown — shared shell for the nav's mega-menus (Platform, Industries;
 * visual reference: wonderful.ai). A trigger button plus a full-width white
 * panel under the header. Opens on hover or click; closes on Escape, outside
 * click or mouse-leave. Opening is a spring: the panel unrolls downward
 * (clip-path), fades in, and its content drops a few pixels into place.
 * `children` receives `close` so links can shut the panel on navigation.
 */
export const NavDropdown = ({
  label,
  id,
  linkClass,
  children,
}: {
  label: string;
  id: string;
  linkClass: string;
  children: (close: () => void) => ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  // Mouse users already opened the menu by hovering, so their click keeps it
  // open; touch and keyboard (no hover) toggle it.
  const pointer = useRef<string>("");
  const close = () => setOpen(false);
  const panel = useSpring({
    reveal: open ? 0 : 100,
    opacity: open ? 1 : 0,
    config: { tension: 340, friction: 32 },
  });
  const content = useSpring({
    y: open ? 0 : -10,
    opacity: open ? 1 : 0,
    delay: open ? 60 : 0,
    config: { tension: 260, friction: 26 },
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div ref={ref} onMouseEnter={() => setOpen(true)} onMouseLeave={close}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onPointerDown={(e) => {
          pointer.current = e.pointerType;
        }}
        onClick={() => {
          if (pointer.current === "mouse") setOpen(true);
          else setOpen((v) => !v);
          pointer.current = "";
        }}
        className={`${linkClass} flex h-[4.5rem] items-center gap-1`}
      >
        {label} <span aria-hidden className="text-[0.7em]">▾</span>
      </button>
      <animated.div
        id={id}
        style={{
          opacity: panel.opacity,
          clipPath: panel.reveal.to((r) => `inset(0 0 ${r}% 0)`),
          visibility: panel.opacity.to((o) => (o < 0.01 ? "hidden" : "visible")),
        }}
        className={`fixed inset-x-0 top-[4.5rem] border-b border-line bg-background shadow-product [--nav-ink:var(--foreground)] ${open ? "" : "pointer-events-none"}`}
      >
        <animated.div style={{ opacity: content.opacity, transform: content.y.to((y) => `translateY(${y}px)`) }}>{children(close)}</animated.div>
      </animated.div>
    </div>
  );
};
