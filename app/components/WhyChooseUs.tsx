import Reveal from "./Reveal";
import CountUp from "./CountUp";

// Yahan numbers apne hisaab se badal sakte ho (abhi sample hain)
const STATS = [
  { end: 15, suffix: "+", label: "Years of Experience", bg: "bg-pastel-blue" },
  { end: 5000, suffix: "+", label: "Happy Patients", bg: "bg-pastel-pink" },
  { end: 2000, suffix: "+", label: "Successful Procedures", bg: "bg-pastel-mint" },
  { end: 98, suffix: "%", label: "Patient Satisfaction", bg: "bg-pastel-yellow" },
];

const FEATURES = [
  {
    icon: "🎓",
    title: "Experienced Specialist",
    text: "Years of hands-on care for bones, joints and muscles.",
    bg: "bg-pastel-lavender",
  },
  {
    icon: "🔬",
    title: "Modern Diagnostics",
    text: "Accurate tests so your treatment is based on facts.",
    bg: "bg-pastel-peach",
  },
  {
    icon: "💙",
    title: "Personal Care",
    text: "Every plan is made around you, not a one-size template.",
    bg: "bg-pastel-coral",
  },
  {
    icon: "📱",
    title: "Easy Online Booking",
    text: "Choose your service and time from your phone in minutes.",
    bg: "bg-pastel-mint",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="relative overflow-hidden py-24 px-6"
      style={{
        background:
          "linear-gradient(to bottom, #ffffff 0%, #f5f0fc 50%, #ffffff 100%)",
      }}
    >
      {/* Peeche halke colourful blobs */}
      <div className="animate-blob absolute -top-20 -right-20 w-80 h-80 bg-pastel-pink opacity-60 pointer-events-none" />
      <div className="animate-blob absolute -bottom-24 -left-20 w-96 h-96 bg-pastel-blue opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <span className="text-brand-red font-semibold tracking-widest uppercase text-xs">
              Why Choose Us
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-ink mt-3">
              Care You Can Trust
            </h2>
            <p className="text-brand-muted mt-3 max-w-xl mx-auto">
              Thousands of patients have walked in with pain and walked out
              moving freely again.
            </p>
          </div>
        </Reveal>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <div
                className={`lift-card ${s.bg} rounded-3xl p-6 text-center h-full`}
              >
                <p className="text-4xl md:text-5xl font-extrabold text-brand-red">
                  <CountUp end={s.end} suffix={s.suffix} />
                </p>
                <p className="text-sm font-medium text-brand-ink mt-2">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 100}>
              <div className="group lift-card bg-white rounded-3xl p-6 shadow-md h-full">
                <div
                  className={`${f.bg} w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}
                >
                  {f.icon}
                </div>
                <h3 className="font-bold text-brand-ink mt-5">{f.title}</h3>
                <p className="text-brand-muted text-sm mt-2">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}