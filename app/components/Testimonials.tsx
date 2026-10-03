import Reveal from "./Reveal";

const TESTIMONIALS = [
  {
    name: "Ahmed R.",
    treatment: "Knee Replacement",
    rating: 5,
    quote:
      "I couldn't walk without pain for years. After my surgery, I feel like I have my life back. The care and follow-up were excellent.",
  },
  {
    name: "Sana K.",
    treatment: "Fracture Care",
    rating: 5,
    quote:
      "Very professional and caring team. My fracture healed perfectly and the recovery guidance made a huge difference.",
  },
  {
    name: "Bilal M.",
    treatment: "Sports Injury Recovery",
    rating: 5,
    quote:
      "As an athlete, getting back to my sport quickly mattered a lot to me. The treatment plan was tailored and effective.",
  },
];

const CARD_COLORS = ["bg-pastel-blue", "bg-pastel-pink", "bg-pastel-mint"];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`w-5 h-5 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12 ${
            i < rating ? "fill-[#F5B83D]" : "fill-brand-ink/15"
          }`}
          style={{ transitionDelay: `${i * 50}ms` }}
        >
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-brand-off py-20 px-6 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="animate-blob absolute -top-24 -right-24 w-96 h-96 bg-pastel-lavender opacity-60 pointer-events-none" />
      <div className="animate-blob absolute -bottom-24 -left-24 w-96 h-96 bg-pastel-peach opacity-60 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <Reveal>
          <div className="text-center mb-14">
            <span className="inline-block bg-pastel-pink text-brand-red font-semibold tracking-widest uppercase text-xs px-4 py-1.5 rounded-full">
              Patient Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-ink mt-4">
              What Our Patients{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #C8102E, #E8538F)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Say
              </span>
            </h2>
            <p className="text-brand-muted mt-4 max-w-xl mx-auto">
              Real experiences from patients who trusted us with their care.
            </p>
          </div>
        </Reveal>

        {/* Mobile: swipeable row. Desktop: 3-column grid */}
        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pt-4 pb-6 -mx-6 px-6 md:mx-0 md:px-0">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 120}
              className="min-w-[85%] sm:min-w-[60%] md:min-w-0 snap-center"
            >
              <div
                className={`group relative h-full ${
                  CARD_COLORS[i % CARD_COLORS.length]
                } rounded-3xl p-7 shadow-md transition-all duration-300 hover:-translate-y-3 hover:rotate-1 hover:shadow-2xl`}
              >
                <div className="flex items-center justify-between mb-4">
                  <StarRating rating={t.rating} />
                  <span
                    className="text-6xl leading-none font-serif select-none transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6"
                    style={{
                      background: "linear-gradient(135deg, #C8102E, #E8538F)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    &ldquo;
                  </span>
                </div>

                <p className="text-brand-ink text-sm leading-relaxed mb-6 min-h-[96px]">
                  {t.quote}
                </p>

                <div className="flex items-center gap-3 border-t border-brand-ink/10 pt-4">
                  <div
                    className="w-11 h-11 rounded-full text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-md transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: "linear-gradient(135deg, #C8102E, #E8538F)",
                    }}
                  >
                    {getInitials(t.name)}
                  </div>
                  <div>
                    <p className="font-bold text-brand-ink text-sm">
                      {t.name}
                    </p>
                    <p className="inline-block bg-white/80 text-brand-ink text-xs font-medium px-2.5 py-0.5 rounded-full mt-1">
                      {t.treatment}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}