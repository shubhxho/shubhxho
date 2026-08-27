"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type HoverTipContextValue = {
  show: (text: string) => void;
  hide: () => void;
};

const HoverTipContext = createContext<HoverTipContextValue | null>(null);

export function useHoverTip() {
  const ctx = useContext(HoverTipContext);
  if (!ctx) {
    return {
      show: () => undefined,
      hide: () => undefined,
    };
  }
  return ctx;
}

export function HoverTipProvider({ children }: { children: ReactNode }) {
  const [text, setText] = useState<string | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(fine.matches && !reduced.matches);
    sync();
    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled || !text) return;
    const onMove = (event: PointerEvent) => {
      setPos({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, text]);

  const show = useCallback(
    (next: string) => {
      if (!enabled) return;
      setText(next);
    },
    [enabled],
  );

  const hide = useCallback(() => setText(null), []);

  return (
    <HoverTipContext.Provider value={{ show, hide }}>
      {children}
      {enabled && text ? (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed z-50 max-w-[16rem] border border-foreground bg-foreground px-2.5 py-1.5 text-[11px] leading-4 text-inverse"
          style={{
            left: pos.x + 14,
            top: pos.y + 16,
          }}
        >
          {text}
        </div>
      ) : null}
    </HoverTipContext.Provider>
  );
}

export function Tip({
  tip,
  children,
  className = "",
  as: Tag = "span",
}: {
  tip: string;
  children: ReactNode;
  className?: string;
  as?: "span" | "div";
}) {
  const { show, hide } = useHoverTip();

  return (
    <Tag
      className={className}
      onPointerEnter={() => show(tip)}
      onPointerLeave={hide}
      onFocus={() => show(tip)}
      onBlur={hide}
    >
      {children}
    </Tag>
  );
}
