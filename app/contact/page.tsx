import ContactSection from "../components/ContactSection";
import FAQSection from "../components/FAQSection";

const INFO_PILLS = [
  { icon: "🕙", text: "Mon–Sat, 10 AM – 6 PM", bg: "bg-pastel-blue" },
  { icon: "📍", text: "Sahiwal, Pakistan", bg: "bg-pastel-mint" },
  { icon: "📅", text: "Book online anytime", bg: "bg-pastel-yellow" },
];

export default function ContactPage() {
  return (
    <main className="flex-1">
      {/* Page hero */}
      <section className="relative overflow-hidden bg-brand-off py-20 px-6 text-center">
        <div className="animate-blob absolute -top-24 -left-20 w-80 h-80 bg-pastel-mint opacity-70 pointer-events-none" />
        <div className="animate-blob absolute -bottom-28 -right-20 w-96 h-96 bg-pastel-pink opacity-70 pointer-events-none" />
        <span
          aria-hidden="true"
          className="animate-float absolute top-[20%] right-[16%] text-3xl font-bold text-brand-red/30 select-none"
        >
          +
        </span>
        <span
          aria-hidden="true"
          className="animate-float-slow absolute bottom-[22%] left-[12%] text-2xl font-bold text-brand-red/30 select-none"
        >
          +
        </span>

        <div className="relative z-10 animate-fade-in">
          <span className="inline-block bg-pastel-pink text-brand-red font-semibold tracking-widest uppercase text-xs px-4 py-1.5 rounded-full">
            Contact Us
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-ink mt-5">
            We&apos;re Here to{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #C8102E, #E8538F)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Help
            </span>
          </h1>
          <p className="text-brand-muted mt-4 max-w-xl mx-auto">
            Whether you have a question or want to schedule a visit, reach
            out anytime — our team is happy to assist.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {INFO_PILLS.map((p) => (
              <span
                key={p.text}
                className={`chip ${p.bg} text-brand-ink text-sm font-medium px-5 py-2 rounded-full`}
              >
                {p.icon} {p.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
      <FAQSection />
    </main>
  );
}