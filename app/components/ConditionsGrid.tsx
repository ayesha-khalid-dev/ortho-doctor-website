import Link from "next/link";
import Reveal from "./Reveal";

const CONDITIONS = [
  { label: "Knee Pain", icon: "🦵", bg: "bg-pastel-blue" },
  { label: "Back & Spine", icon: "🧍", bg: "bg-pastel-pink" },
  { label: "Shoulder", icon: "💪", bg: "bg-pastel-coral" },
  { label: "Fractures", icon: "🦴", bg: "bg-pastel-yellow" },
  { label: "Sports Injury", icon: "🏃", bg: "bg-pastel-mint" },
  { label: "Joint Replacement", icon: "🔩", bg: "bg-pastel-lavender" },
  { label: "Hip Pain", icon: "🚶", bg: "bg-pastel-peach" },
  { label: "Arthritis", icon: "🖐️", bg: "bg-pastel-blue" },
];

export default function ConditionsGrid() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-4 mb-12">
            <span className="flex-1 h-px bg-brand-ink/80" />
            <h2 className="text-sm md:text-base font-bold tracking-widest uppercase text-brand-ink text-center">
              Conditions We Treat
            </h2>
            <span className="flex-1 h-px bg-brand-ink/80" />
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {CONDITIONS.map((c, i) => (
            <Reveal key={c.label} delay={i * 70}>
              <Link
                href="/services"
                className={`group lift-card ${c.bg} rounded-3xl p-6 flex flex-col items-center text-center h-full`}
              >
                <span className="text-5xl block transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6">
                  {c.icon}
                </span>
                <span className="mt-4 text-sm font-semibold text-brand-ink">
                  {c.label}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-block bg-brand-ink text-white text-xs font-bold tracking-widest uppercase px-8 py-3 hover:bg-brand-red transition-colors"
            >
              View All Services
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}