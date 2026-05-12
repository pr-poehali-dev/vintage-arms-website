import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0a0805] border-t border-[rgba(201,168,76,0.15)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="mb-5">
              <span className="font-cormorant text-2xl font-light tracking-[0.15em] text-gold-light block">
                ARMA
              </span>
              <span className="font-montserrat text-[9px] tracking-[0.35em] uppercase text-cream-muted">
                Антикварное оружие
              </span>
            </div>
            <p className="font-montserrat text-[12px] text-cream-muted leading-relaxed tracking-wide">
              Избранная коллекция антикварного и исторического оружия. Более 25 лет экспертизы и безупречной репутации.
            </p>
          </div>

          <div>
            <h4 className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-gold mb-5">
              Навигация
            </h4>
            <ul className="space-y-3">
              {[
                { path: "/", label: "Главная" },
                { path: "/about", label: "О магазине" },
                { path: "/history", label: "История и экспертиза" },
                { path: "/blog", label: "Блог" },
                { path: "/contacts", label: "Контакты" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-montserrat text-[11px] tracking-[0.1em] text-cream-muted hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-gold mb-5">
              Контакты
            </h4>
            <div className="space-y-3">
              <p className="font-montserrat text-[11px] text-cream-muted tracking-wide">
                г. Москва, Большая Никитская, 15
              </p>
              <p className="font-montserrat text-[11px] text-cream-muted tracking-wide">
                +7 (495) 123-45-67
              </p>
              <p className="font-montserrat text-[11px] text-cream-muted tracking-wide">
                info@arma-antique.ru
              </p>
              <p className="font-montserrat text-[11px] text-cream-muted tracking-wide">
                Пн–Сб: 10:00 – 19:00
              </p>
            </div>
          </div>
        </div>

        <div className="section-divider mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-montserrat text-[10px] tracking-[0.15em] text-cream-muted/50">
            © 2024 ARMA. Все права защищены.
          </p>
          <p className="font-montserrat text-[10px] tracking-[0.1em] text-cream-muted/40">
            Деятельность осуществляется в соответствии с законодательством РФ
          </p>
        </div>
      </div>
    </footer>
  );
}
