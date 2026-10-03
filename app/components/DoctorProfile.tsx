const CREDENTIALS = [
  "MBBS, FCPS (Orthopedic Surgery)",
  "Fellowship in Joint Replacement Surgery",
  "10+ Years of Clinical Experience",
  "Member, Pakistan Orthopaedic Association",
];

export default function DoctorProfile() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Photo */}
        <div className="relative">
          <div className="aspect-[4/5] rounded-3xl bg-brand-off border border-brand-ink/10 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80"
              alt="Dr. Agha Khan - Orthopedic Surgeon"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-brand-red text-white rounded-2xl px-6 py-4 shadow-lg hidden sm:block">
            <p className="text-2xl font-bold leading-none">10+</p>
            <p className="text-xs mt-1 opacity-90">Years Experience</p>
          </div>
        </div>

        {/* Bio */}
        <div>
          <span className="text-brand-red font-semibold tracking-wide uppercase text-sm">
            Meet Your Doctor
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-ink mt-3">
            Dr. Agha Khan
          </h2>
          <p className="text-brand-muted mt-2">Orthopedic Surgeon</p>

          <p className="text-brand-muted mt-6 leading-relaxed">
            With over a decade of experience in orthopedic care, Dr.
            Agha Khan is dedicated to helping patients regain mobility
            and live pain-free lives. Specializing in joint replacement,
            fracture management, and sports injury rehabilitation, he
            combines modern surgical techniques with a patient-first
            approach.
          </p>

          <ul className="mt-6 space-y-3">
            {CREDENTIALS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-brand-red shrink-0" />
                <span className="text-brand-ink text-sm">{item}</span>
              </li>
            ))}
          </ul>

          <a
            href="/about"
            className="inline-block mt-8 text-brand-red font-medium hover:underline"
          >
            Read Full Profile →
          </a>
        </div>
      </div>
    </section>
  );
}