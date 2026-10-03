"use client";

import { useEffect, useRef, useState } from "react";

function Eye({ size = 44, blink }: { size?: number; blink: boolean }) {
  const socketRef = useRef<HTMLDivElement>(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      if (!socketRef.current) return;
      const rect = socketRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const angle = Math.atan2(dy, dx);
      const maxDist = size * 0.19;
      const dist = Math.min(maxDist, Math.hypot(dx, dy) / 7);
      setPupil({ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist });
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [size]);

  return (
    <div
      ref={socketRef}
      className="relative rounded-full bg-white shadow-inner overflow-hidden"
      style={{ width: size, height: size }}
    >
      {/* Pupil - bouncy spring-like easing */}
      <div
        className="absolute rounded-full bg-brand-ink top-1/2 left-1/2"
        style={{
          width: size * 0.42,
          height: size * 0.42,
          transform: `translate(-50%, -50%) translate(${pupil.x}px, ${pupil.y}px)`,
          transition: "transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      />
      {/* Eyelid - blinks periodically */}
      <div
        className="absolute inset-x-0 top-0 bg-[#F2ECE0]"
        style={{
          height: blink ? "100%" : "0%",
          transition: "height 90ms ease-in-out",
        }}
      />
    </div>
  );
}

export default function EyeTrackingCharacter() {
  const [blink, setBlink] = useState(false);
  const [tilt, setTilt] = useState(0);

  // Periodic blinking
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    function scheduleBlink() {
      const delay = 2200 + Math.random() * 2600;
      timeout = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 130);
        scheduleBlink();
      }, delay);
    }
    scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  // Subtle head tilt toward cursor
  useEffect(() => {
    function handleMove(e: MouseEvent) {
      const ratio = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      setTilt(ratio * 6); // max ~6 degrees
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="relative w-64 h-80 mx-auto select-none">
      <div
        className="absolute inset-x-0 top-0 animate-[skullBob_4s_ease-in-out_infinite]"
        style={{
          transform: `rotate(${tilt}deg)`,
          transition: "transform 300ms ease-out",
        }}
      >
        {/* Stylized skull shape */}
        <svg viewBox="0 0 200 220" className="w-64 h-[220px] drop-shadow-md">
          <path
            d="M100 10 C50 10 20 50 20 100 C20 130 30 150 45 165 L45 190 C45 200 55 208 65 208 L75 195 L85 208 L100 200 L115 208 L125 195 L135 208 C145 208 155 200 155 190 L155 165 C170 150 180 130 180 100 C180 50 150 10 100 10 Z"
            fill="#F2ECE0"
            stroke="#D8CFBA"
            strokeWidth="2"
          />
          {/* Brow ridges */}
          <path d="M60 92 Q75 82 92 90" fill="none" stroke="#D8CFBA" strokeWidth="3" strokeLinecap="round" />
          <path d="M108 90 Q125 82 140 92" fill="none" stroke="#D8CFBA" strokeWidth="3" strokeLinecap="round" />
          {/* Nasal cavity */}
          <path d="M92 128 L100 152 L108 128 Z" fill="#D8CFBA" />
          {/* Teeth line */}
          <line x1="55" y1="184" x2="145" y2="184" stroke="#D8CFBA" strokeWidth="2" />
          <line x1="70" y1="184" x2="70" y2="200" stroke="#D8CFBA" strokeWidth="1.5" />
          <line x1="85" y1="184" x2="85" y2="203" stroke="#D8CFBA" strokeWidth="1.5" />
          <line x1="100" y1="184" x2="100" y2="205" stroke="#D8CFBA" strokeWidth="1.5" />
          <line x1="115" y1="184" x2="115" y2="203" stroke="#D8CFBA" strokeWidth="1.5" />
          <line x1="130" y1="184" x2="130" y2="200" stroke="#D8CFBA" strokeWidth="1.5" />
        </svg>

        {/* Eyes overlaid on the skull's eye sockets */}
        <div className="absolute inset-0 flex items-start justify-center gap-8 pt-16">
          <Eye size={44} blink={blink} />
          <Eye size={44} blink={blink} />
        </div>
      </div>

      {/* Neck - cervical vertebrae, subtle independent sway */}
      <svg viewBox="0 0 200 100" className="absolute left-0 top-[210px] w-64 h-[100px]">
        {[0, 1, 2, 3].map((i) => (
          <g key={i} style={{ transformOrigin: `100px ${14 + i * 20}px` }} className={`animate-[vertebraSway_3.4s_ease-in-out_infinite]`}>
            <ellipse
              cx="100"
              cy={16 + i * 19}
              rx={26 - i * 2}
              ry="9"
              fill="#F2ECE0"
              stroke="#D8CFBA"
              strokeWidth="2"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          </g>
        ))}
        {/* Shoulder hint - clavicle line */}
        <path d="M20 92 Q100 75 180 92" fill="none" stroke="#D8CFBA" strokeWidth="3" strokeLinecap="round" />
      </svg>

      <style>{`
        @keyframes skullBob {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -6px; }
        }
        @keyframes vertebraSway {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(2deg); }
        }
      `}</style>
    </div>
  );
}