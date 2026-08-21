"use client";

import { useEffect, useState } from "react";
import { TimelineRow } from "@/components/timeline-row";
import { formatSiteIsoDate } from "@/lib/date";

const MESSAGE = "More soon...";

export function LiveEntry({ date }: { date: string }) {
  const [text, setText] = useState("");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const id = window.setTimeout(() => setText(MESSAGE), 0);
      return () => window.clearTimeout(id);
    }

    let index = 0;
    let direction = 1;
    let timer: number;

    const tick = () => {
      setText(MESSAGE.slice(0, index));
      let delay = 150;

      if (direction === 1) {
        if (index < MESSAGE.length) index += 1;
        if (index === MESSAGE.length) {
          direction = -1;
          delay = 1500;
        }
      } else {
        if (index > 0) index -= 1;
        if (index === 0) {
          direction = 1;
          delay = 1500;
        }
      }

      timer = window.setTimeout(tick, delay);
    };

    timer = window.setTimeout(tick, 150);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <TimelineRow date={date} dateTime={formatSiteIsoDate()} typing>
      {text}
    </TimelineRow>
  );
}
