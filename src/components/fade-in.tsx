"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef, type ReactNode } from "react";

export function FadeIn({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(root.children);
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.04 },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
