import Link from "next/link";
import Reveal from "./Reveal";

const SYMPTOMS = [
  "Knee pain",
  "Back pain",
  "Neck stiffness",
  "Shoulder pain",
  "Joint swelling",
  "Weak bones",
  "Numbness",
  "Fracture care",
  "Sports injury",
  "Arthritis",
  "Heel pain",
  "Hip pain",
  "Muscle cramps",
  "Sprain",
  "Osteoporosis",
  "Post-surgery rehab",
  "Slip disc",
  "Frozen shoulder",
];

const COLORS = [
  "bg-pastel-blue",
  "bg-pastel-pink",
  "bg-pastel-mint",
  "bg-pastel-lavender",
  "bg-pastel-peach",
  "bg-pastel-yellow",
  "bg-pastel-coral",
];

export default function SymptomChips() {
  return (
    <section className="bg-brand-off py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-ink">
            We&apos;re Here to Help You With
          </h2>
          <p className="text-brand-muted mt-3">
            Tap what you&apos;re feeling and we&apos;ll show you how we can help.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {SYMPTOMS.map((s, i) => (
              <Link
                key={s}
                href="/services"
                className={`chip ${COLORS[i % COLORS.length]} text-brand-ink text-sm font-medium px-5 py-2.5 rounded-full`}
              >
                {s}
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}