"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { familia } from "@/lib/fonts";
import { readHeroProgress } from "@/lib/scroll";
import LogoFallback from "./LogoFallback";

const loadLogoMark = () => import("./LogoMark");

if (typeof window !== "undefined") {
  void loadLogoMark();
}

const LogoMark = dynamic(loadLogoMark, { ssr: false });

const GAP = 16;

export default function SiteHeader() {
  const leftShift = useRef<HTMLDivElement>(null);
  const rightShift = useRef<HTMLDivElement>(null);
  const leftLabel = useRef<HTMLSpanElement>(null);
  const rightLabel = useRef<HTMLDivElement>(null);
  const logoSlot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const apply = () => {
      const progress = readHeroProgress();
      const scale = 1 - 0.58 * progress;
      const left = leftShift.current;
      const right = rightShift.current;
      const logo = logoSlot.current;
      const leftText = leftLabel.current;
      const rightText = rightLabel.current;

      if (left && right && logo && leftText && rightText) {
        const letterW = logo.offsetHeight * 0.94 * scale;
        const slotCenter = logo.offsetLeft + logo.offsetWidth / 2;
        const letterLeft = slotCenter - letterW / 2;
        const letterRight = slotCenter + letterW / 2;
        const brandRight = left.offsetLeft + left.offsetWidth;
        const menuLeft = right.offsetLeft;
        const leftTravel = Math.max(0, letterLeft - GAP - brandRight);
        const rightTravel = Math.max(0, menuLeft - (letterRight + GAP));

        left.style.transform = `translateX(${progress * leftTravel}px)`;
        right.style.transform = `translateX(${-progress * rightTravel}px)`;
        leftText.style.transform = `scale(${scale})`;
        rightText.style.transform = `scale(${scale})`;
      }

      frame = requestAnimationFrame(apply);
    };

    frame = requestAnimationFrame(apply);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <header className="site-header">
      <div className="nav-row">
        <div className="nav-side nav-side--left">
          <div className="nav-shift" ref={leftShift}>
            <span className={`nav-label ${familia.className}`} ref={leftLabel}>
              ESTUDIO BORDÓ
            </span>
          </div>
        </div>
        <div className="logo-slot" ref={logoSlot}>
          <LogoFallback />
          <LogoMark />
        </div>
        <nav className="nav-side nav-side--right" aria-label="Secciones">
          <div className="nav-shift" ref={rightShift}>
            <div className={`nav-label nav-menu ${familia.className}`} ref={rightLabel}>
              <a href="#projects">PROJECTS</a>
              <a href="#studio">STUDIO</a>
              <a href="#contact">CONTACT</a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
