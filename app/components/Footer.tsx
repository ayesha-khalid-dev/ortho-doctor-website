import Link from "next/link";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "Book Appointment", href: "/booking" },
];

const CONTACT = [
  { icon: "📍", text: "[Clinic Address], Sahiwal, Pakistan" },
  { icon: "📞", text: "[Phone Number]" },
  { icon: "✉️", text: "[Email Address]" },
];

export default function Footer() {
  return (
    <footer
      className="relative mt-auto text-white"
      style={{
        background: "linear-gradient(180deg, #3a0a18 0%, #1f1f2e 100%)",
      }}
    >
      {/* Wave kinara: footer ke apne rang ka, taake upar wale section ka rang koi bhi ho */}
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="absolute bottom-full left-0 w-full h-8 md:h-12 block"
        aria-hidden="true"
      >
        <path
          d="M0,30 C120,5 240,5 360,30 C480,55 600,55 720,30 C840,5 960,5 1080,30 C1200,55 1320,55 1440,30 L1440,60 L0,60 Z"
          fill="#3a0a18"
        />
      </svg>

      {/* Soft blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animate-blob absolute top-20 -left-20 w-72 h-72 bg-brand-red opacity-10" />
        <div className="animate-blob absolute -bottom-24 right-0 w-80 h-80 bg-pastel-lavender opacity-10" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-14 pb-10">
        {/* CTA banner */}
        <div
          className="relative overflow-hidden rounded-3xl px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left"
          style={{
            background: "linear-gradient(120deg, #C8102E 0%, #E8538F 100%)",
          }}
        >
          <div className="animate-blob absolute -top-12 -left-8 w-44 h-44 bg-white opacity-10 pointer-events-none" />
          <div className="relative">
            <h3 className="text-xl md:text-2xl font-bold">
              Ready to move without pain?
            </h3>
            <p className="text-white/90 text-sm mt-1">
              Book your consultation today.
            </p>
          </div>
          <Link
            href="/booking"
            className="relative shrink-0 bg-white text-brand-red hover:bg-brand-off px-7 py-3 rounded-full font-medium transition-colors"
          >
            Book Appointment{" "}
            <span className="inline-block animate-arrow">→</span>
          </Link>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-14">
          {/* Clinic Info */}
          <div>
            <h3 className="text-xl font-semibold mb-3">
              Dr. <span className="text-pastel-pink">Agha Khan</span>
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Orthopedic Specialist — Joint Replacement, Fracture Care, Sports
              Injuries &amp; Spine Care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                  >
                    <span className="text-brand-red transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              {CONTACT.map((c) => (
                <li key={c.text} className="flex items-start gap-3 text-white/70">
                  <span className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    {c.icon}
                  </span>
                  <span className="pt-1.5">{c.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Timings */}
          <div>
            <h4 className="font-semibold mb-4">Clinic Timings</h4>
            <div className="bg-white/10 rounded-2xl p-4">
              <p className="text-white/70 text-xs">Mon – Sat</p>
              <p className="font-semibold mt-1">10:00 AM – 6:00 PM</p>
            </div>
            <Link
              href="/contact"
              className="inline-block mt-4 border border-white/30 hover:border-white hover:bg-white/10 text-white text-sm px-5 py-2 rounded-full transition-colors"
            >
              Get Directions
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4 text-white/50 text-xs">
          <p>
            © {new Date().getFullYear()} Dr. Agha Khan. All rights
            reserved.
          </p>
          <a
            href="#"
            aria-label="Back to top"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-red text-white flex items-center justify-center text-base transition-colors"
          >
            ↑
          </a>
        </div>
      </div>
    </footer>
  );
}