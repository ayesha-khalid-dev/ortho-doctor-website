import Link from "next/link";

function Bone({
  fill,
  stroke,
  sw,
}: {
  fill: string;
  stroke: string;
  sw: number;
}) {
  return (
    <g fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round">
      <rect x="120" y="186" width="160" height="28" rx="14" />
      <circle cx="112" cy="178" r="26" />
      <circle cx="112" cy="222" r="26" />
      <circle cx="288" cy="178" r="26" />
      <circle cx="288" cy="222" r="26" />
    </g>
  );
}

const PLUSES = [
  { cls: "top-[12%] left-[6%] animate-float", size: "text-3xl" },
  { cls: "top-[70%] left-[3%] animate-float-slow", size: "text-2xl" },
  { cls: "top-[16%] right-[8%] animate-float-delay", size: "text-2xl" },
  { cls: "bottom-[10%] right-[5%] animate-float", size: "text-3xl" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-off">
      {/* Background blobs */}
      <div className="animate-blob absolute -top-24 -left-24 w-96 h-96 bg-pastel-pink opacity-70 pointer-events-none" />
      <div className="animate-blob absolute -bottom-32 -right-24 w-[28rem] h-[28rem] bg-pastel-blue opacity-70 pointer-events-none" />
      <div className="animate-blob absolute top-1/3 left-1/2 w-56 h-56 bg-pastel-yellow opacity-50 pointer-events-none" />

      {/* Floating medical plus signs */}
      {PLUSES.map((p, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`absolute font-bold text-brand-red/30 pointer-events-none select-none ${p.cls} ${p.size}`}
        >
          +
        </span>
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-20 min-h-[88vh] grid md:grid-cols-2 gap-12 items-center">
        {/* ---------- Left: text ---------- */}
        <div className="animate-fade-in text-center md:text-left">
          <span className="inline-block bg-pastel-pink text-brand-red font-semibold tracking-widest uppercase text-xs px-4 py-1.5 rounded-full">
            Orthopedic Specialist
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-brand-ink mt-6 leading-tight">
            Expert Care for Your{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #C8102E, #E8538F)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Bones, Joints &amp; Muscles
            </span>
          </h1>

          <p className="text-brand-muted text-lg mt-6 max-w-xl mx-auto md:mx-0">
            Trusted orthopedic treatment in Sahiwal — from fracture care to
            joint replacement and sports injury recovery.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start">
            <Link
              href="/booking"
              className="animate-pulse-ring bg-brand-red hover:bg-brand-red-dark text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              Book an Appointment
            </Link>
            <Link
              href="/services"
              className="border border-brand-ink/20 bg-white/70 hover:border-brand-red hover:text-brand-red text-brand-ink px-8 py-3 rounded-full font-medium transition-colors"
            >
              Our Services
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-start text-sm text-brand-ink">
            {[
              "Modern diagnostics",
              "Personalised care",
              "Easy online booking",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-pastel-mint flex items-center justify-center text-xs text-brand-ink">
                  ✓
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- Right: illustration + floating cards ---------- */}
        <div className="relative w-full max-w-[440px] aspect-square mx-auto">
          <svg
            viewBox="0 0 400 400"
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="heroDisc" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#DCEBFA" />
                <stop offset="1" stopColor="#FBD9E8" />
              </linearGradient>
            </defs>

            {/* Main disc */}
            <circle cx="200" cy="200" r="140" fill="url(#heroDisc)" />

            {/* Orbit: dashed ring + dots, slowly rotating */}
            <g>
              <circle
                cx="200"
                cy="200"
                r="175"
                fill="none"
                stroke="#C8102E"
                strokeOpacity="0.25"
                strokeWidth="2"
                strokeDasharray="6 10"
              />
              <circle cx="375" cy="200" r="9" fill="#C8102E" />
              <circle cx="112.5" cy="351.6" r="7" fill="#0FA3B1" />
              <circle cx="112.5" cy="48.4" r="8" fill="#F5B83D" />
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 200 200"
                to="360 200 200"
                dur="30s"
                repeatCount="indefinite"
              />
            </g>

            {/* Bone (float ke liye bahar wala g, rotate ke liye andar wala) */}
            <g className="animate-float">
              <g transform="rotate(-35 200 200)">
                <Bone fill="#C8102E" stroke="#C8102E" sw={10} />
                <Bone fill="#ffffff" stroke="none" sw={0} />
              </g>
            </g>

            {/* Small crosses */}
            <g stroke="#C8102E" strokeWidth="4" strokeLinecap="round" opacity="0.6">
              <path d="M70 120 h16 M78 112 v16" />
              <path d="M320 290 h16 M328 282 v16" />
            </g>
          </svg>

          {/* Floating cards */}
          <div className="animate-float absolute top-[6%] left-[-2%] bg-white rounded-2xl shadow-lg px-4 py-3 text-xs md:text-sm font-semibold text-brand-ink">
            ✅ 5000+ Happy Patients
          </div>
          <div className="animate-float-slow absolute top-[44%] right-[-4%] bg-white rounded-2xl shadow-lg px-4 py-3 text-xs md:text-sm font-semibold text-brand-ink">
            🩺 Free First Consultation
          </div>
          <div className="animate-float-delay absolute bottom-[6%] left-[4%] bg-white rounded-2xl shadow-lg px-4 py-3 text-xs md:text-sm font-semibold text-brand-ink">
            🕙 Mon–Sat, 10 AM – 6 PM
          </div>
        </div>
      </div>
    </section>
  );
}