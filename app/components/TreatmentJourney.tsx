import Link from "next/link";
import Reveal from "./Reveal";

const STEPS = [
  { title: "Book Online", text: "Pick a service and time in 2 minutes.", icon: "📅", bg: "bg-pastel-blue" },
  { title: "Consultation", text: "The doctor listens and examines you.", icon: "🩺", bg: "bg-pastel-pink" },
  { title: "X-ray & Tests", text: "Scans to find the exact problem.", icon: "🦴", bg: "bg-pastel-mint" },
  { title: "Treatment Plan", text: "A plan made just for your case.", icon: "📝", bg: "bg-pastel-yellow" },
  { title: "Treatment", text: "Medication, therapy or surgery if needed.", icon: "🏥", bg: "bg-pastel-lavender" },
  { title: "Recovery", text: "Follow-ups until you're back on your feet.", icon: "🏃", bg: "bg-pastel-peach" },
];

// Desktop diagram ke coordinates (viewBox 1000 x 560)
// Row 1: left -> right (steps 1,2,3), Row 2: right -> left (steps 4,5,6)
const POINTS = [
  { x: 150, y: 100 },
  { x: 500, y: 100 },
  { x: 850, y: 100 },
  { x: 850, y: 370 },
  { x: 500, y: 370 },
  { x: 150, y: 370 },
];

const FLOAT_CLASSES = ["animate-float", "animate-float-slow", "animate-float-delay"];

const W = 1000;
const H = 560;

export default function TreatmentJourney() {
  return (
    <section className="bg-white py-20 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-ink">
              Your Treatment Journey
            </h2>
            <p className="text-brand-muted mt-3 max-w-xl mx-auto">
              From your first visit to full recovery, here&apos;s how we take care
              of you at every step.
            </p>
          </div>
        </Reveal>

        {/* ---------- Desktop: snake path with animated arrows ---------- */}
        <Reveal className="hidden md:block">
          <div
            className="relative w-full pb-24"
          >
            <div
              className="relative w-full"
              style={{ aspectRatio: `${W} / ${H}` }}
            >
              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="absolute inset-0 w-full h-full"
                fill="none"
                aria-hidden="true"
              >
                {/* halki solid line neeche */}
                <path
                  d="M150 100 H850 C 960 100 960 370 850 370 H150"
                  stroke="#C8102E"
                  strokeOpacity="0.15"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* chalti hui dashed line oopar */}
                <path
                  className="flow-path"
                  d="M150 100 H850 C 960 100 960 370 850 370 H150"
                  stroke="#C8102E"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Arrows: row 1 right ki taraf */}
                {[325, 675].map((x) => (
                  <g key={`r1-${x}`} transform={`translate(${x},100)`}>
                    <polygon
                      className="animate-arrow"
                      points="-8,-9 8,0 -8,9"
                      fill="#C8102E"
                    />
                  </g>
                ))}
                {/* Arrows: row 2 left ki taraf (mirror) */}
                {[675, 325].map((x) => (
                  <g key={`r2-${x}`} transform={`translate(${x},370) scale(-1,1)`}>
                    <polygon
                      className="animate-arrow"
                      points="-8,-9 8,0 -8,9"
                      fill="#C8102E"
                    />
                  </g>
                ))}
              </svg>

              {STEPS.map((step, i) => {
                const p = POINTS[i];
                return (
                  <div key={step.title}>
                    {/* Circle */}
                    <div
                      className="absolute"
                      style={{
                        left: `${(p.x / W) * 100}%`,
                        top: `${(p.y / H) * 100}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <div className={FLOAT_CLASSES[i % FLOAT_CLASSES.length]}>
                        <div
                          className={`relative w-[88px] h-[88px] rounded-full border-[3px] border-brand-red ${step.bg} flex items-center justify-center text-4xl shadow-md`}
                        >
                          {step.icon}
                          <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-brand-red text-white text-xs font-bold flex items-center justify-center">
                            {i + 1}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Label */}
                    <div
                      className="absolute text-center w-[220px]"
                      style={{
                        left: `${(p.x / W) * 100}%`,
                        top: `${(p.y / H) * 100}%`,
                        transform: "translate(-50%, 56px)",
                      }}
                    >
                      <p className="font-bold text-brand-ink text-sm">
                        {step.title}
                      </p>
                      <p className="text-brand-muted text-xs mt-1">
                        {step.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* ---------- Mobile: vertical list ---------- */}
        <ol className="md:hidden relative ml-7 border-l-2 border-dashed border-brand-red/40 space-y-10">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative pl-10">
              <div
                className={`absolute -left-[30px] top-0 w-14 h-14 rounded-full border-[3px] border-brand-red ${step.bg} flex items-center justify-center text-2xl`}
              >
                {step.icon}
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brand-red text-white text-[11px] font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <p className="font-bold text-brand-ink">{step.title}</p>
              <p className="text-brand-muted text-sm mt-1">{step.text}</p>
            </li>
          ))}
        </ol>

        <Reveal>
          <div className="text-center mt-12">
            <Link
              href="/booking"
              className="inline-block bg-brand-red hover:bg-brand-red-dark text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              Start Your Journey
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}