import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const navLinks = [
  { path: "/", label: "Главная" },
  { path: "/about", label: "О магазине" },
  { path: "/history", label: "История и экспертиза" },
  { path: "/blog", label: "Блог" },
  { path: "/contacts", label: "Контакты" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0e0b08]/95 backdrop-blur-md border-b border-[rgba(201,168,76,0.2)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
        <Link to="/" className="flex flex-col leading-none group">
          <span className="font-cormorant text-2xl font-light tracking-[0.15em] text-gold-light group-hover:text-gold transition-colors">
            ARMA
          </span>
          <span className="font-montserrat text-[9px] tracking-[0.35em] uppercase text-cream-muted mt-0.5">
            Антикварное оружие
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-montserrat text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 relative group ${
                location.pathname === link.path
                  ? "text-gold"
                  : "text-cream-muted hover:text-cream"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                  location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </nav>

        <Link
          to="/contacts"
          className="hidden lg:flex items-center gap-2 border border-[rgba(201,168,76,0.5)] text-gold font-montserrat text-[10px] tracking-[0.25em] uppercase px-5 py-2.5 hover:bg-gold hover:text-[#0e0b08] transition-all duration-300"
        >
          Консультация
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-cream-muted hover:text-gold transition-colors"
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-[#0e0b08]/98 backdrop-blur-md border-t border-[rgba(201,168,76,0.15)] px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-montserrat text-[12px] tracking-[0.2em] uppercase ${
                location.pathname === link.path ? "text-gold" : "text-cream-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contacts"
            className="mt-2 border border-[rgba(201,168,76,0.5)] text-gold font-montserrat text-[10px] tracking-[0.25em] uppercase px-5 py-3 text-center hover:bg-gold hover:text-[#0e0b08] transition-all duration-300"
          >
            Консультация
          </Link>
        </div>
      )}
    </header>
  );
}
