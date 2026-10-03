const MESSAGES = [
  "🩺 Free first consultation for new patients",
  "📅 Book your appointment online in 2 minutes",
  "🦴 Expert care for bones, joints & muscles",
  "🕙 Mon–Sat, 10:00 AM – 6:00 PM",
  "📍 Now serving patients in Sahiwal",
];

export default function AnnouncementBar() {
  // Messages 2 baar repeat hote hain taake marquee beech mein khali na ho
  const items = [...MESSAGES, ...MESSAGES];

  return (
    <div className="bg-brand-red text-white text-sm overflow-hidden py-2">
      <div className="marquee-track">
        {items.map((msg, i) => (
          <span key={i} className="px-10 whitespace-nowrap font-medium">
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}