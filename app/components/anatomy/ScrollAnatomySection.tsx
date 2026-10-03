"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 3D canvas must load client-side only (WebGL)
const AnatomyScene = dynamic(() => import("./AnatomyScene"), { ssr: false });

export default function ScrollAnatomySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [xrayOpacity, setXrayOpacity] = useState(0);
  const [labelOpacity, setLabelOpacity] = useState(1);

  useEffect(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;
        progressRef.current = p;

        // Intro label fades out as bones start assembling
        setLabelOpacity(p < 0.08 ? 1 : Math.max(0, 1 - (p - 0.08) / 0.1));

        // X-ray flash between 0.78 and 0.86
        const xrayIn = 0.78;
        const xrayPeak = 0.82;
        const xrayOut = 0.86;
        let op = 0;
        if (p > xrayIn && p < xrayOut) {
          op =
            p < xrayPeak
              ? (p - xrayIn) / (xrayPeak - xrayIn)
              : 1 - (p - xrayPeak) / (xrayOut - xrayPeak);
        }
        setXrayOpacity(op);
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[400vh] bg-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Intro label */}
        <div
          className="absolute inset-x-0 top-24 z-10 text-center transition-opacity duration-300 px-6"
          style={{ opacity: labelOpacity }}
        >
          <span className="text-brand-red font-semibold tracking-[0.2em] uppercase text-xs">
            The Human Structure
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-ink mt-3">
            Precision, Built Layer by Layer
          </h2>
        </div>

        {/* 3D Scene */}
        <div className="absolute inset-0">
          <AnatomyScene progressRef={progressRef} />
        </div>

        {/* X-ray transition overlay */}
        <div
          className="pointer-events-none absolute inset-0 bg-[#dce8f5] mix-blend-difference"
          style={{ opacity: xrayOpacity * 0.55 }}
        />

        {/* Scroll hint */}
        <div className="absolute bottom-10 inset-x-0 text-center text-brand-muted text-xs tracking-[0.2em] uppercase">
          Scroll to explore
        </div>
      </div>
    </section>
  );
}