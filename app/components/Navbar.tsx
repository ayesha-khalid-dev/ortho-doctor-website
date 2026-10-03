"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

const MOBILE_COLORS = [
  "bg-pastel-blue",
  "bg-pastel-pink",
  "bg-pastel-mint",
  "bg-pastel-yellow",
];

type SessionUser = { email: string; role: string } | null;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<SessionUser>(null);
  const [checked, setChecked] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Session check
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setChecked(true);
      })
      .catch(() => setChecked(true));
  }, [pathname]);

  // Scroll: navbar shrink + progress bar
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min((y / max) * 100, 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Page badalne pe menus band
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Dropdown ke bahar click karne pe band
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setMenuOpen(false);
    setDropdownOpen(false);
    router.push("/login");
    router.refresh();
  }

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  const dashboardHref = user?.role === "admin" ? "/admin" : "/dashboard";

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-md border-transparent"
          : "bg-white/90 border-brand-ink/10"
      }`}
    >
      <style>{`
        .magic-text {
          background: linear-gradient(90deg, #C8102E, #E8538F, #F5B83D, #0FA3B1, #7B5EA7, #C8102E);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: magic-shift 6s linear infinite;
        }
        @keyframes magic-shift {
          to { background-position: 300% 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .magic-text { animation: none; }
        }
      `}</style>
      <nav
        className={`max-w-6xl mx-auto flex items-center justify-between px-6 transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        {/* Logo / Clinic Name */}
        <Link href="/" className="group flex items-center gap-3">
          {/* Logo mark: gradient dabba + hadi */}
          <span
            className="relative w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
            style={{
              background:
                "linear-gradient(135deg, #C8102E, #E8538F 55%, #F5B83D)",
            }}
          >
            <svg viewBox="0 0 40 40" className="w-7 h-7" aria-hidden="true">
              <g transform="rotate(-45 20 20)" fill="#ffffff">
                <rect x="9" y="18" width="22" height="4" rx="2" />
                <circle cx="9" cy="17" r="4" />
                <circle cx="9" cy="23" r="4" />
                <circle cx="31" cy="17" r="4" />
                <circle cx="31" cy="23" r="4" />
              </g>
            </svg>
            <span className="animate-float absolute -top-2 -right-2 text-xs">
              ✨
            </span>
          </span>

          {/* Naam: rang badalta hua gradient */}
          <span className="flex flex-col leading-tight">
            <span className="magic-text font-extrabold text-xl">
              Dr. Agha Khan
            </span>
            <span
              className={`overflow-hidden text-[10px] tracking-[0.2em] uppercase text-brand-muted transition-all duration-300 ${
                scrolled ? "max-h-0 opacity-0" : "max-h-4 opacity-100"
              }`}
            >
              Orthopedic Specialist
            </span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative font-medium transition-colors ${
                  active
                    ? "text-brand-red"
                    : "text-brand-ink hover:text-brand-red"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-brand-red transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          {checked && user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="flex items-center gap-2 text-brand-ink hover:text-brand-red font-medium transition-colors"
              >
                <span
                  className="w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-semibold"
                  style={{
                    background: "linear-gradient(135deg, #C8102E, #E8538F)",
                  }}
                >
                  {user.email[0].toUpperCase()}
                </span>
                <span className="text-sm max-w-[120px] truncate">
                  {user.email}
                </span>
                <span
                  className={`text-xs transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
              </button>

              {dropdownOpen && (
                <div className="animate-fade-in absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-brand-ink/10 p-4 z-50">
                  <p className="text-xs text-brand-muted uppercase tracking-wide">
                    Signed in as
                  </p>
                  <p className="text-sm font-medium text-brand-ink mt-1 truncate">
                    {user.email}
                  </p>
                  <p className="inline-block bg-pastel-mint text-brand-ink text-xs capitalize mt-2 px-3 py-0.5 rounded-full">
                    {user.role}
                  </p>

                  <Link
                    href={dashboardHref}
                    onClick={() => setDropdownOpen(false)}
                    className="block mt-4 text-sm text-brand-ink hover:text-brand-red font-medium"
                  >
                    {user.role === "admin" ? "Admin Panel" : "My Dashboard"}
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full mt-3 bg-brand-red hover:bg-brand-red-dark hover:scale-[1.02] text-white text-sm font-medium py-2.5 rounded-full transition-all"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white px-5 py-1.5 rounded-full font-medium transition-colors"
            >
              Login
            </Link>
          )}
          <Link
            href="/booking"
            className="text-white px-5 py-2 rounded-full font-medium transition-transform hover:scale-105"
            style={{
              background: "linear-gradient(90deg, #C8102E, #E8538F)",
            }}
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button (hamburger jo X ban jata hai) */}
        <button
          className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-0.5 w-6 bg-brand-ink rounded transition-all duration-300 ${
              menuOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-brand-ink rounded transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-brand-ink rounded transition-all duration-300 ${
              menuOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu (smooth slide) */}
      <div
        className="md:hidden grid transition-all duration-300 bg-white"
        style={{ gridTemplateRows: menuOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-3 px-6 pb-6 pt-2">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`${
                  MOBILE_COLORS[i % MOBILE_COLORS.length]
                } rounded-xl px-4 py-3 font-medium ${
                  isActive(link.href) ? "text-brand-red" : "text-brand-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {checked && user ? (
              <>
                <Link
                  href={dashboardHref}
                  className="text-brand-ink hover:text-brand-red font-medium px-1 truncate"
                  onClick={() => setMenuOpen(false)}
                >
                  {user.email}
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-brand-red hover:bg-brand-red-dark text-white px-5 py-2.5 rounded-full font-medium text-center transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="border-2 border-brand-red text-brand-red px-5 py-2 rounded-full font-medium text-center"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
            <Link
              href="/booking"
              className="text-white px-5 py-2.5 rounded-full font-medium text-center"
              style={{
                background: "linear-gradient(90deg, #C8102E, #E8538F)",
              }}
              onClick={() => setMenuOpen(false)}
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll progress bar */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[3px]"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #C8102E, #E8538F)",
        }}
      />
    </header>
  );
}