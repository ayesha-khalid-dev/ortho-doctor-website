"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";

// 3D particle canvas must load client-side only (WebGL)
const KneeParticles = dynamic(() => import("./KneeParticles"), { ssr: false });

type Progress = {
  reconstruct: number;
  dissolve: number;
};

export default function PostLoginAnimation({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const ring3Ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const skipped = useRef(false);

  // Drives the particle reconstruction (read every frame inside the R3F canvas)
  const progressRef = useRef<Progress>({ reconstruct: 0, dissolve: 0 });
  const progressState = useRef({ reconstruct: 0, dissolve: 0 });

  useEffect(() => {
    const setStatus = (text: string) => {
      if (statusRef.current) statusRef.current.textContent = text;
    };

    const tl = gsap.timeline({
      onComplete: () => {
        if (!skipped.current) onComplete();
      },
    });

    // Dramatic background shift: off-white -> near-black
    tl.to(
      containerRef.current,
      { backgroundColor: "#121212", duration: 0.6, ease: "power2.inOut" },
      0
    );

    // Soft pink-red glow behind the particles
    tl.fromTo(
      glowRef.current,
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
      0.2
    ).to(glowRef.current, { opacity: 0, duration: 0.25 }, 2.05);

    // Loader (status text + progress bar) during the dark phase
    tl.to(loaderRef.current, { opacity: 1, duration: 0.3 }, 0.15)
      .fromTo(
        barRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.9, ease: "none" },
        0.15
      )
      .call(() => setStatus("Scanning bone structure…"), undefined, 0.2)
      .call(() => setStatus("Rebuilding the joint…"), undefined, 0.9)
      .call(() => setStatus("Almost ready…"), undefined, 1.6)
      .to(loaderRef.current, { opacity: 0, duration: 0.2 }, 2.0);

    // Particle reconstruction: scan -> bone assembles -> muscle wraps -> hold
    tl.to(
      progressState.current,
      {
        reconstruct: 1,
        duration: 1.9,
        ease: "power2.out",
        onUpdate: () => {
          progressRef.current.reconstruct = progressState.current.reconstruct;
        },
      },
      0.15
    );

    // Impact: white flash + 3 colourful rings + screen shake
    tl.to(flashRef.current, { opacity: 1, duration: 0.07 }, 2.05)
      .to(flashRef.current, { opacity: 0, duration: 0.45 }, 2.12)
      .fromTo(
        ringRef.current,
        { scale: 0.3, opacity: 1 },
        { scale: 2.4, opacity: 0, duration: 0.75, ease: "power2.out" },
        2.05
      )
      .fromTo(
        ring2Ref.current,
        { scale: 0.3, opacity: 1 },
        { scale: 3.0, opacity: 0, duration: 0.85, ease: "power2.out" },
        2.12
      )
      .fromTo(
        ring3Ref.current,
        { scale: 0.3, opacity: 1 },
        { scale: 3.6, opacity: 0, duration: 0.95, ease: "power2.out" },
        2.2
      )
      .to(
        containerRef.current,
        { x: 8, duration: 0.045, yoyo: true, repeat: 7, ease: "power1.inOut" },
        2.05
      );

    // Background: flash to brand red, then settle to clean off-white
    tl.to(
      containerRef.current,
      { backgroundColor: "#C8102E", duration: 0.35, ease: "power2.inOut" },
      2.15
    ).to(
      containerRef.current,
      { backgroundColor: "#FAFAFA", duration: 0.65, ease: "power2.inOut" },
      2.7
    );

    // Branded reveal: logo pops, then welcome text and name
    if (revealRef.current) {
      tl.fromTo(
        Array.from(revealRef.current.children),
        { opacity: 0, y: 22, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.6)",
          stagger: 0.12,
        },
        2.95
      );
    }

    // Hero hold, then particles dissolve outward
    tl.to(
      progressState.current,
      {
        dissolve: 1,
        duration: 0.6,
        ease: "power2.in",
        onUpdate: () => {
          progressRef.current.dissolve = progressState.current.dissolve;
        },
      },
      3.5
    );

    // Fade whole overlay out to reveal dashboard
    tl.to(
      containerRef.current,
      { opacity: 0, duration: 0.5, ease: "power2.inOut" },
      4.0
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  function handleSkip() {
    skipped.current = true;
    onComplete();
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#FAFAFA" }}
    >
      <style>{`
        .pla-magic {
          background: linear-gradient(90deg, #C8102E, #E8538F, #F5B83D, #0FA3B1, #7B5EA7, #C8102E);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: pla-shift 4s linear infinite;
        }
        @keyframes pla-shift {
          to { background-position: 300% 0; }
        }
      `}</style>

      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 text-white mix-blend-difference text-sm font-medium z-10"
      >
        Skip →
      </button>

      {/* Soft glow behind the particles */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0"
      >
        <div
          className="w-[34rem] h-[34rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(232,83,143,0.35) 0%, rgba(200,16,46,0.15) 40%, transparent 70%)",
          }}
        />
      </div>

      {/* Particle-based anatomical reconstruction */}
      <div className="relative w-full h-full max-w-xl max-h-xl">
        <KneeParticles progressRef={progressRef} />
      </div>

      {/* Impact flash */}
      <div
        ref={flashRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="w-72 h-72 bg-white rounded-full opacity-0 blur-xl" />
      </div>

      {/* Impact shockwave rings (white, pink, yellow) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          ref={ringRef}
          className="absolute w-24 h-24 rounded-full border-2 border-white opacity-0"
        />
        <div
          ref={ring2Ref}
          className="absolute w-24 h-24 rounded-full border-2 border-[#E8538F] opacity-0"
        />
        <div
          ref={ring3Ref}
          className="absolute w-24 h-24 rounded-full border-2 border-[#F5B83D] opacity-0"
        />
      </div>

      {/* Loader: status text + progress bar (dark phase only) */}
      <div
        ref={loaderRef}
        className="pointer-events-none absolute bottom-16 left-0 right-0 flex flex-col items-center gap-3 opacity-0"
      >
        <p
          ref={statusRef}
          className="text-white/70 text-xs tracking-[0.25em] uppercase"
        >
          Scanning bone structure…
        </p>
        <div className="w-48 h-1 rounded-full bg-white/20 overflow-hidden">
          <div
            ref={barRef}
            className="h-full w-full origin-left rounded-full"
            style={{
              background: "linear-gradient(90deg, #C8102E, #E8538F, #F5B83D)",
            }}
          />
        </div>
      </div>

      {/* Branded reveal (off-white phase) */}
      <div
        ref={revealRef}
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 text-center"
      >
        <span
          className="opacity-0 w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl"
          style={{
            background:
              "linear-gradient(135deg, #C8102E, #E8538F 55%, #F5B83D)",
          }}
        >
          <svg viewBox="0 0 40 40" className="w-12 h-12" aria-hidden="true">
            <g transform="rotate(-45 20 20)" fill="#ffffff">
              <rect x="9" y="18" width="22" height="4" rx="2" />
              <circle cx="9" cy="17" r="4" />
              <circle cx="9" cy="23" r="4" />
              <circle cx="31" cy="17" r="4" />
              <circle cx="31" cy="23" r="4" />
            </g>
          </svg>
        </span>
        <p className="opacity-0 text-brand-ink text-sm tracking-[0.3em] uppercase font-medium mt-2">
          Welcome back
        </p>
        <h2 className="opacity-0 pla-magic text-4xl md:text-5xl font-extrabold">
          Dr. Agha Khan
        </h2>
        <p className="opacity-0 text-brand-muted text-xs tracking-[0.25em] uppercase">
          Orthopedic Specialist
        </p>
      </div>
    </div>
  );
}