const STORIES = [
  {
    name: "Ahmed Raza",
    treatment: "Knee Replacement",
    thumbnail:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
  },
  {
    name: "Sana Khan",
    treatment: "Fracture Recovery",
    thumbnail:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=80",
  },
  {
    name: "Bilal Mahmood",
    treatment: "Sports Injury",
    thumbnail:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80",
  },
];

export default function PatientStories() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-brand-red font-semibold tracking-wide uppercase text-sm">
            In Their Own Words
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-ink mt-3">
            Real Stories, Real Results
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STORIES.map((story) => (
            <button
              key={story.name}
              type="button"
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] text-left"
            >
              <img
                src={story.thumbnail}
                alt={story.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Dark gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 fill-brand-red ml-1"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Name + treatment */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white font-semibold">{story.name}</p>
                <p className="text-white/80 text-xs mt-0.5">
                  {story.treatment}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}