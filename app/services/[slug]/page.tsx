import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES, getServiceBySlug } from "../../lib/services-data";
import Reveal from "../../components/Reveal";

// Pre-generate a page for each service at build time
export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

// Services list page wale hi colours, taake card aur detail ka rang match kare
const PASTELS = [
  "bg-pastel-blue",
  "bg-pastel-pink",
  "bg-pastel-mint",
  "bg-pastel-yellow",
  "bg-pastel-lavender",
  "bg-pastel-peach",
];

const EXPECT_STEPS = [
  { icon: "🩺", title: "Consultation", text: "We listen to your story and examine you." },
  { icon: "📋", title: "Diagnosis", text: "Tests and scans only where they are needed." },
  { icon: "✅", title: "Treatment Plan", text: "A clear plan made around your needs." },
];

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const index = SERVICES.findIndex((s) => s.slug === service.slug);
  const headerBg = PASTELS[index % PASTELS.length];

  return (
    <main className="flex-1">
      {/* ---------- Header ---------- */}
      <section className={`relative overflow-hidden ${headerBg} py-16 px-6`}>
        <div className="animate-blob absolute -top-24 -left-20 w-80 h-80 bg-white opacity-40 pointer-events-none" />
        <div className="animate-blob absolute -bottom-28 right-10 w-96 h-96 bg-white opacity-30 pointer-events-none" />
        <span
          aria-hidden="true"
          className="animate-float absolute top-[14%] left-[46%] text-3xl font-bold text-brand-red/30 select-none"
        >
          +
        </span>

        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="animate-fade-in">
            <Link
              href="/services"
              className="text-brand-ink/70 hover:text-brand-red text-sm inline-flex items-center gap-1 mb-6 transition-colors"
            >
              ← All Services
            </Link>

            <div className="flex items-center gap-4">
              <span className="animate-float w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center text-3xl shrink-0">
                {service.icon}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-brand-ink leading-tight">
                {service.title}
              </h1>
            </div>

            <p className="text-brand-ink/75 mt-6 max-w-lg">
              {service.shortDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/booking"
                className="animate-pulse-ring bg-brand-red hover:bg-brand-red-dark text-white px-8 py-3 rounded-full font-medium transition-colors"
              >
                Book an Appointment
              </Link>
              <Link
                href="/services"
                className="bg-white/80 hover:bg-white text-brand-ink px-8 py-3 rounded-full font-medium transition-colors"
              >
                All Services
              </Link>
            </div>
          </div>

          {/* Right: image card */}
          <div className="animate-float-slow relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 left-4 bg-white rounded-2xl shadow-lg px-4 py-2.5 text-sm font-semibold text-brand-ink">
              🩺 Free first consultation
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Content ---------- */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          {/* Overview */}
          <Reveal>
            <div className="bg-white rounded-3xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-brand-ink mb-4">
                Overview
              </h2>
              <p className="text-brand-muted leading-relaxed">
                {service.fullDescription}
              </p>
            </div>
          </Reveal>

          {/* Highlights */}
          <Reveal>
            <h3 className="text-xl font-bold text-brand-ink mt-12 mb-5">
              What This Treatment Covers
            </h3>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.highlights.map((item, i) => (
              <Reveal key={item} delay={i * 100}>
                <div
                  className={`lift-card ${
                    PASTELS[(index + i + 1) % PASTELS.length]
                  } rounded-2xl p-5 flex items-start gap-3 h-full`}
                >
                  <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-brand-red text-sm font-bold shrink-0">
                    ✓
                  </span>
                  <span className="text-brand-ink text-sm font-medium">
                    {item}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* What to expect */}
          <Reveal>
            <h3 className="text-xl font-bold text-brand-ink mt-12 mb-5">
              What to Expect
            </h3>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
            {EXPECT_STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 120}>
                <div className="relative bg-white rounded-2xl shadow-md p-5 h-full text-center">
                  <span className="text-3xl block">{s.icon}</span>
                  <p className="font-bold text-brand-ink mt-3">{s.title}</p>
                  <p className="text-brand-muted text-xs mt-1">{s.text}</p>
                  {i < EXPECT_STEPS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="hidden sm:block animate-arrow absolute top-1/2 -right-4 -translate-y-1/2 text-brand-red font-bold"
                    >
                      →
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ---------- Sidebar ---------- */}
        <div>
          <div className="sticky top-24 space-y-6">
            <div
              className="relative overflow-hidden rounded-3xl p-6 text-white"
              style={{
                background: "linear-gradient(135deg, #C8102E 0%, #E8538F 100%)",
              }}
            >
              <div className="animate-blob absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 pointer-events-none" />
              <h3 className="relative font-bold text-lg mb-2">
                Ready to get started?
              </h3>
              <p className="relative text-white/90 text-sm mb-5">
                Book a consultation to discuss your condition and treatment
                options.
              </p>
              <Link
                href="/booking"
                className="relative block text-center bg-white text-brand-red hover:bg-brand-off px-6 py-3 rounded-full font-medium transition-colors"
              >
                Book an Appointment
              </Link>
            </div>

            <div className="bg-brand-off rounded-3xl p-6">
              <p className="text-xs font-bold text-brand-ink uppercase tracking-widest mb-4">
                Other Services
              </p>
              <ul className="space-y-2">
                {SERVICES.filter((s) => s.slug !== service.slug).map((s) => {
                  const i = SERVICES.findIndex((x) => x.slug === s.slug);
                  return (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className={`${
                          PASTELS[i % PASTELS.length]
                        } group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-brand-ink hover:translate-x-1 transition-transform`}
                      >
                        <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                          {s.icon}
                        </span>
                        {s.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}