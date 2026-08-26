"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, type RefObject } from "react";

let registered = false;

function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function usePageIntro(rootRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      gsap.set(root.querySelectorAll(".reveal-item, .hero-letter, .reveal-line"), {
        clearProps: "all",
        opacity: 1,
        y: 0,
        scaleX: 1,
      });
      return;
    }

    const ctx = gsap.context(() => {
      const letters = root.querySelectorAll(".hero-letter");
      const intro = root.querySelectorAll("[data-intro]");
      const lines = root.querySelectorAll(".reveal-line");

      gsap.set(letters, { opacity: 0, y: 48, rotateX: -55 });
      gsap.set(intro, { opacity: 0, y: 24 });
      gsap.set(lines, { scaleX: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(letters, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.9,
        stagger: 0.035,
      })
        .to(lines, { scaleX: 1, duration: 0.7, stagger: 0.08 }, "-=0.45")
        .to(intro, { opacity: 1, y: 0, duration: 0.65, stagger: 0.08 }, "-=0.5");
    }, root);

    return () => ctx.revert();
  }, [rootRef]);
}

export function useScrollReveal(rootRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
        const items = group.querySelectorAll(".reveal-item");
        gsap.set(items, { opacity: 0, y: 28 });
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: {
            trigger: group,
            start: "top 82%",
            once: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [rootRef]);
}

export function useMagneticRows(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const rows = Array.from(root.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const cleanups = rows.map((row) => {
      const onMove = (event: PointerEvent) => {
        const rect = row.getBoundingClientRect();
        const offset = (event.clientX - rect.left) / rect.width - 0.5;
        gsap.to(row, {
          x: offset * 10,
          duration: 0.35,
          ease: "power2.out",
          overwrite: true,
        });
      };
      const onLeave = () => {
        gsap.to(row, { x: 0, duration: 0.55, ease: "power3.out", overwrite: true });
      };
      row.addEventListener("pointermove", onMove);
      row.addEventListener("pointerleave", onLeave);
      return () => {
        row.removeEventListener("pointermove", onMove);
        row.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [rootRef]);
}

export function useAmbientSweep(rootRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const sweep = root.querySelector<HTMLElement>("[data-sweep]");
    if (!sweep) return;

    const ctx = gsap.context(() => {
      gsap.to(sweep, {
        xPercent: 120,
        duration: 7,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, root);

    return () => ctx.revert();
  }, [rootRef]);
}
