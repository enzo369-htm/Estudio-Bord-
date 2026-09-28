"use client";

import { useEffect, useRef } from "react";
import { writeHeroProgress } from "@/lib/scroll";

type Props = {
  src?: string;
  phrase?: string;
};

export default function HomeHero({
  src = "/images/hero.jpg",
  phrase = "",
}: Props) {
  const stage = useRef<HTMLElement>(null);

  useEffect(() => {
    const stageEl = stage.current;
    if (!stageEl) return;

    let raf = 0;

    const measure = () => {
      raf = 0;
      const header = window.innerHeight * 0.18;
      const total = Math.max(stageEl.offsetHeight - header, 1);
      const scrolled = Math.min(Math.max(-stageEl.getBoundingClientRect().top, 0), total);
      writeHeroProgress(scrolled / total);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero-stage" ref={stage}>
      <div className="hero-frame">
        <img
          src={src}
          alt="Comedor con mesa ovalada, ventana alta y banco de madera"
        />
        {phrase ? <p className="hero-phrase">{phrase}</p> : null}
      </div>
    </section>
  );
}
