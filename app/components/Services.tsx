import Link from "next/link";
import { SERVICES } from "../lib/services-data";
import Reveal from "./Reveal";

// Duplicate the list so the scroll loop looks seamless
const LOOPED_SERVICES = [...SERVICES, ...SERVICES];

const PASTELS = [
  "bg-pastel-blue",
  "bg-pastel-pink",
  "bg-pastel-mint",
  "bg-pastel-yellow",
  "bg-pastel-lavender",
  "bg-pastel-peach",
];

export default function Services() {
  return (
    <section className="relative overflow-hidden bg-brand-off pt-20 pb-24">
      <div className="animate-blob absolute -top-24 -left-24 w-80 h-80 bg-pastel-pink opacity-60 pointer-events-none" />
      <div className="animate-blob absolute -bottom-24 -right-24 w-96 h-96 bg-pastel-blue opacity-60 pointer-events-none" />

      {/* Heading */}
      <Reveal>
        <div className="relative max-w-6xl mx-auto px-6 text-center mb-14">
          <span className="inline-block bg-pastel-pink text-brand-red font-semibold tracking-widest uppercase text-xs px-4 py-1.5 rounded-full">
            What We Treat
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-ink mt-4">
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
          </h2>
          <p className="text-brand-muted mt-4 max-w-xl mx-auto">
            Comprehensive orthopedic care tailored to your needs, using
            modern techniques for faster recovery.
          </p>
        </div>
      </Reveal>

      {/* Auto-scrolling row - gradient band */}
      <div
        className="relative py-14 overflow-hidden w-full"
        style={{
          background: "linear-gradient(120deg, #C8102E 0%, #E8538F 100%)",
        }}
      >
        <div className="animate-blob absolute -top-16 left-10 w-56 h-56 bg-white opacity-10 pointer-events-none" />
        <div className="animate-blob absolute -bottom-20 right-20 w-64 h-64 bg-white opacity-10 pointer-events-none" />

        {/* mr-6 on each card (instead of gap) keeps the -50% loop perfectly seamless */}
        <div
          className="relative flex w-max animate-marquee hover:[animation-play-state:paused]"
          style={{ animationDuration: "55s" }}
        >
          {LOOPED_SERVICES.map((service, index) => {
            const color = PASTELS[index % SERVICES.length % PASTELS.length];
            return (
              <Link
                key={`${service.slug}-${index}`}
                href={`/services/${service.slug}`}
                className={`group lift-card ${color} mr-6 w-60 sm:w-64 shrink-0 rounded-3xl p-6 flex flex-col`}
              >
                <span className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  {service.icon}
                </span>
                <h3 className="font-bold text-lg text-brand-ink mt-5 mb-2">
                  {service.title}
                </h3>
                <p className="text-brand-ink/70 text-sm leading-relaxed">
                  {service.shortDescription}
                </p>
                <span className="inline-flex items-center gap-2 mt-auto pt-5 text-brand-red text-sm font-semibold">
                  Learn more
                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* View all */}
      <Reveal>
        <div className="relative text-center mt-12">
          <Link
            href="/services"
            className="inline-block text-white px-8 py-3 rounded-full font-medium transition-transform hover:scale-105"
            style={{ background: "linear-gradient(90deg, #C8102E, #E8538F)" }}
          >
            View All Services →
          </Link>
        </div>
      </Reveal>
    </section>
  );
}