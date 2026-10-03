import Link from "next/link";
import { SERVICES } from "../lib/services-data";
import Reveal from "../components/Reveal";

const CARD_COLORS = [
  "bg-pastel-blue",
  "bg-pastel-pink",
  "bg-pastel-mint",
  "bg-pastel-yellow",
  "bg-pastel-lavender",
  "bg-pastel-peach",
];

export default function ServicesListPage() {
  return (
    <main className="flex-1">
      {/* Header */}
      <section className="relative overflow-hidden bg-brand-off py-20 px-6 text-center">
        <div className="animate-blob absolute -top-24 -left-20 w-80 h-80 bg-pastel-pink opacity-70 pointer-events-none" />
        <div className="animate-blob absolute -bottom-28 -right-20 w-96 h-96 bg-pastel-blue opacity-70 pointer-events-none" />
        <span
          aria-hidden="true"
          className="animate-float absolute top-[18%] left-[12%] text-3xl font-bold text-brand-red/30 select-none"
        >
          +
        </span>
        <span
          aria-hidden="true"
          className="animate-float-slow absolute bottom-[20%] right-[14%] text-2xl font-bold text-brand-red/30 select-none"
        >
          +
        </span>

        <div className="relative z-10 animate-fade-in">
          <span className="inline-block bg-pastel-pink text-brand-red font-semibold tracking-widest uppercase text-xs px-4 py-1.5 rounded-full">
            What We Treat
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-ink mt-5">
            Our{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #C8102E, #E8538F)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Services
            </span>
          </h1>
          <p className="text-brand-muted mt-4 max-w-xl mx-auto">
            Comprehensive orthopedic care tailored to your needs, using
            modern techniques for faster recovery.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={i * 100} className="h-full">
              <Link
                href={`/services/${service.slug}`}
                className={`group lift-card relative flex flex-col h-full ${
                  CARD_COLORS[i % CARD_COLORS.length]
                } rounded-3xl p-7 overflow-hidden`}
              >
                {/* Bada halka number */}
                <span className="absolute -top-2 right-5 text-7xl font-extrabold text-white/60 select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <span className="relative w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center text-3xl shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  {service.icon}
                </span>

                <h2 className="relative font-bold text-xl text-brand-ink mt-6">
                  {service.title}
                </h2>
                <p className="relative text-brand-ink/70 text-sm leading-relaxed mt-2">
                  {service.shortDescription}
                </p>

                {/* Highlight chips */}
                <div className="relative flex flex-wrap gap-2 mt-5">
                  {service.highlights.slice(0, 3).map((h) => (
                    <span
                      key={h}
                      className="bg-white/80 text-brand-ink text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <span className="relative inline-flex items-center gap-2 mt-auto pt-6 text-brand-red text-sm font-semibold">
                  Learn more
                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* CTA banner */}
        <Reveal>
          <div className="max-w-6xl mx-auto mt-12">
            <div
              className="relative overflow-hidden rounded-3xl px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
              style={{
                background: "linear-gradient(120deg, #C8102E 0%, #E8538F 100%)",
              }}
            >
              <div className="animate-blob absolute -top-16 -left-10 w-56 h-56 bg-white opacity-10 pointer-events-none" />
              <div className="animate-blob absolute -bottom-20 right-20 w-64 h-64 bg-white opacity-10 pointer-events-none" />

              <div className="relative">
                <h3 className="text-white text-xl md:text-2xl font-bold">
                  Not sure which treatment you need?
                </h3>
                <p className="text-white/90 text-sm mt-2 max-w-md">
                  Book a consultation and let our specialist guide you to the
                  right care plan.
                </p>
              </div>
              <Link
                href="/booking"
                className="relative shrink-0 bg-white text-brand-red hover:bg-brand-off px-8 py-3 rounded-full font-medium transition-colors"
              >
                Book an Appointment{" "}
                <span className="inline-block animate-arrow">→</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}