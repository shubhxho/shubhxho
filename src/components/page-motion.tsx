"use client";

import { useRef, type ReactNode } from "react";
import { usePageIntro, useScrollReveal } from "@/components/motion";

export function PageMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLElement>(null);
  usePageIntro(rootRef);
  useScrollReveal(rootRef);

  return (
    <main ref={rootRef} className="site-shell min-h-dvh px-5 pt-12 pb-20 sm:px-8 sm:pt-16 sm:pb-28">
      {children}
    </main>
  );
}
