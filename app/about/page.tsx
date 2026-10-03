import Link from "next/link";
import StatCounter from "../components/StatCounter";
import Reveal from "../components/Reveal";

const EDUCATION = [
  { year: "2010", title: "MBBS", place: "King Edward Medical University, Lahore" },
  { year: "2015", title: "FCPS (Orthopedic Surgery)", place: "College of Physicians & Surgeons Pakistan" },
  { year: "2017", title: "Fellowship in Joint Replacement Surgery", place: "Singapore General Hospital" },
];

const EDU_STYLES = [
  { icon: "🎓", bg: "bg-pastel-blue" },
  { icon: "📜", bg: "bg-pastel-pink" },
  { icon: "🌏", bg: "bg-pastel-mint" },
];

const ACHIEVEMENTS = [
  "Performed 1,500+ successful joint replacement surgeries",
  "Speaker at Pakistan Orthopaedic Association Annual Conference",
  "Published research on minimally invasive fracture fixation",
  "Recognized for excellence in patient care, 2022",
];

const ACH_COLORS = [
  "bg-pastel-yellow",
  "bg-pastel-lavender",
  "bg-pastel-peach",
  "bg-pastel-mint",
];

const SPECIALTIES = [
  { label: "Joint Replacement", bg: "bg-pastel-blue" },
  { label: "Fracture Care", bg: "bg-pastel-pink" },
  { label: "Sports Injuries", bg: "bg-pastel-mint" },
  { label: "Spine Care", bg: "bg-pastel-yellow" },
];

const STATS = [
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 5000, suffix: "+", label: "Patients Treated" },
  { value: 1500, suffix: "+", label: "Surgeries Performed" },
  { value: 4.9, suffix: "/5", decimals: 1, label: "Patient Rating" },
];

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-brand-off py-20 px-6">
        <div className="animate-blob absolute -top-24 -left-24 w-96 h-96 bg-pastel-blue opacity-70 pointer-events-none" />
        <div className="animate-blob absolute -bottom-28 -right-20 w-96 h-96 bg-pastel-pink opacity-70 pointer-events-none" />
        <span
          aria-hidden="true"
          className="animate-float absolute top-[12%] right-[10%] text-3xl font-bold text-brand-red/30 select-none"
        >
          +
        </span>

        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* Photo */}
          <div className="relative max-w-md mx-auto w-full">
            <div className="animate-blob absolute -bottom-6 -left-6 w-full h-full bg-pastel-yellow opacity-80 pointer-events-none" />
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] border-4 border-white shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80"
                alt="Dr. Agha Khan"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="animate-float absolute top-8 -left-4 bg-white rounded-2xl shadow-lg px-4 py-2.5 text-xs md:text-sm font-semibold text-brand-ink">
              🎓 FCPS Orthopedic Surgery
            </div>
            <div className="animate-float-slow absolute bottom-10 -right-4 bg-white rounded-2xl shadow-lg px-4 py-2.5 text-xs md:text-sm font-semibold text-brand-ink">
              🏆 1,500+ Surgeries
            </div>
          </div>

          {/* Text */}
          <div className="animate-fade-in">
            <span className="inline-block bg-pastel-pink text-brand-red font-semibold tracking-widest uppercase text-xs px-4 py-1.5 rounded-full">
              About the Doctor
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-5">
              <span
                style={{
                  background: "linear-gradient(90deg, #C8102E, #E8538F)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Dr. Agha Khan
              </span>
            </h1>
            <p className="text-brand-muted mt-2 font-medium">
              Orthopedic Surgeon
            </p>
            <p className="text-brand-muted mt-6 leading-relaxed">
              Dr. Agha Khan is a fellowship-trained orthopedic surgeon
              based in Sahiwal, specializing in joint replacement, fracture
              care, sports injury management, and spine care. With a
              patient-first philosophy and a commitment to modern surgical
              techniques, he has helped thousands of patients regain
              mobility and return to pain-free living.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {SPECIALTIES.map((s) => (
                <span
                  key={s.label}
                  className={`chip ${s.bg} text-brand-ink text-sm font-medium px-4 py-1.5 rounded-full`}
                >
                  {s.label}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/booking"
                className="animate-pulse-ring bg-brand-red hover:bg-brand-red-dark text-white px-8 py-3 rounded-full font-medium transition-colors"
              >
                Book a Consultation
              </Link>
              <Link
                href="/services"
                className="border border-brand-ink/20 bg-white/70 hover:border-brand-red hover:text-brand-red text-brand-ink px-8 py-3 rounded-full font-medium transition-colors"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Stats ---------- */}
      <section
        className="relative overflow-hidden py-14 px-6"
        style={{
          background: "linear-gradient(120deg, #C8102E 0%, #E8538F 100%)",
        }}
      >
        <div className="animate-blob absolute -top-16 left-10 w-56 h-56 bg-white opacity-10 pointer-events-none" />
        <div className="animate-blob absolute -bottom-20 right-16 w-64 h-64 bg-white opacity-10 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-3xl md:text-4xl font-bold text-white">
                <StatCounter
                  target={s.value}
                  suffix={s.suffix}
                  decimals={s.decimals || 0}
                />
              </p>
              <p className="text-white/85 text-xs md:text-sm mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Education Timeline ---------- */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <span className="inline-block bg-pastel-blue text-brand-ink font-semibold tracking-widest uppercase text-xs px-4 py-1.5 rounded-full">
                Education &amp; Training
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-ink mt-4">
                Qualifications
              </h2>
            </div>
          </Reveal>

          <div className="relative space-y-8">
            {/* Dashed vertical line */}
            <div
              aria-hidden="true"
              className="absolute left-5 top-4 bottom-4 border-l-2 border-dashed border-brand-red/30"
            />

            {EDUCATION.map((item, i) => {
              const style = EDU_STYLES[i % EDU_STYLES.length];
              return (
                <Reveal key={item.title} delay={i * 120}>
                  <div className="relative pl-16">
                    <span
                      className={`absolute left-0 top-2 w-10 h-10 rounded-full ${style.bg} border-2 border-brand-red flex items-center justify-center text-lg`}
                    >
                      {style.icon}
                    </span>
                    <div className="lift-card bg-white rounded-2xl shadow-md p-5">
                      <span className="inline-block bg-pastel-pink text-brand-red text-xs font-bold px-3 py-0.5 rounded-full">
                        {item.year}
                      </span>
                      <p className="font-bold text-brand-ink mt-2">
                        {item.title}
                      </p>
                      <p className="text-brand-muted text-sm mt-0.5">
                        {item.place}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Achievements ---------- */}
      <section className="bg-brand-off py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <span className="inline-block bg-pastel-yellow text-brand-ink font-semibold tracking-widest uppercase text-xs px-4 py-1.5 rounded-full">
                Recognition
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-ink mt-4">
                Achievements
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ACHIEVEMENTS.map((item, i) => (
              <Reveal key={item} delay={i * 100} className="h-full">
                <div
                  className={`group lift-card ${
                    ACH_COLORS[i % ACH_COLORS.length]
                  } rounded-2xl p-5 flex items-start gap-4 h-full`}
                >
                  <span className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-xl shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    🏆
                  </span>
                  <p className="text-brand-ink text-sm leading-relaxed font-medium">
                    {item}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-white py-16 px-6">
        <Reveal>
          <div
            className="relative overflow-hidden max-w-6xl mx-auto rounded-3xl px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
            style={{
              background: "linear-gradient(120deg, #C8102E 0%, #E8538F 100%)",
            }}
          >
            <div className="animate-blob absolute -top-16 -left-10 w-56 h-56 bg-white opacity-10 pointer-events-none" />
            <div className="relative">
              <h3 className="text-white text-xl md:text-2xl font-bold">
                Ready to take the first step?
              </h3>
              <p className="text-white/90 text-sm mt-2 max-w-md">
                Book a consultation and get a clear plan for your recovery.
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
        </Reveal>
      </section>
    </main>
  );
}