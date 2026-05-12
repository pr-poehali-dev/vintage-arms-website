import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationForm from "@/components/ConsultationForm";

const heroImage = "https://cdn.poehali.dev/projects/576b1575-d2ea-4b26-95ec-fc56c5267e1e/files/cb1f613f-efd9-48d5-b2e7-458dd679b69b.jpg";
const expertImage = "https://cdn.poehali.dev/projects/576b1575-d2ea-4b26-95ec-fc56c5267e1e/files/23b13d94-3b53-403a-8e84-0fffa23c788e.jpg";

const features = [
  {
    number: "25+",
    label: "Лет экспертизы",
    desc: "Четверть века в мире антикварного оружия",
  },
  {
    number: "1200+",
    label: "Предметов продано",
    desc: "Из частных коллекций по всему миру",
  },
  {
    number: "100%",
    label: "Подлинность",
    desc: "Каждый предмет проходит экспертную верификацию",
  },
];

const blogPreviews = [
  {
    category: "История",
    title: "Дуэльные пистолеты эпохи Наполеона",
    excerpt: "Изящество и смертоносность в одном предмете — как парижские оружейники создавали шедевры для высшего света.",
    date: "15 марта 2024",
  },
  {
    category: "Экспертиза",
    title: "Как отличить оригинал от копии",
    excerpt: "Методы профессиональной верификации: от клейм мастера до анализа металла.",
    date: "28 февраля 2024",
  },
  {
    category: "Коллекции",
    title: "Восточное оружие: сабли Османской империи",
    excerpt: "Редкие образцы XVI–XVIII веков — история завоеваний, выкованная в стали.",
    date: "10 февраля 2024",
  },
];

export default function Index() {
  return (
    <div className="bg-[#0e0b08] min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0b08]/70 via-[#0e0b08]/50 to-[#0e0b08]" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 animate-fade-in-up">
          <p className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-gold mb-6">
            Антикварное & Историческое оружие
          </p>
          <h1 className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-light text-cream leading-tight mb-6">
            Редкие предметы
            <br />
            <span className="gold-text-gradient italic">для истинных</span>
            <br />
            ценителей
          </h1>
          <div className="section-divider my-8" />
          <p className="font-montserrat text-[12px] tracking-[0.15em] text-cream-muted max-w-xl mx-auto leading-relaxed mb-10">
            Избранная коллекция подлинного антикварного оружия с безупречной провенансом. Каждый предмет — страница живой истории.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contacts"
              className="border border-gold text-gold font-montserrat text-[11px] tracking-[0.3em] uppercase px-10 py-4 hover:bg-gold hover:text-[#0e0b08] transition-all duration-300"
            >
              Запросить консультацию
            </Link>
            <Link
              to="/about"
              className="border border-[rgba(201,168,76,0.3)] text-cream-muted font-montserrat text-[11px] tracking-[0.3em] uppercase px-10 py-4 hover:border-cream-muted hover:text-cream transition-all duration-300"
            >
              О магазине
            </Link>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-gold opacity-60" />
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[rgba(201,168,76,0.15)] py-16 bg-[#0a0805]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[rgba(201,168,76,0.15)]">
            {features.map((f) => (
              <div key={f.number} className="text-center py-8 md:py-4 px-8">
                <div className="font-cormorant text-5xl text-gold font-light mb-1">{f.number}</div>
                <div className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-cream mb-2">
                  {f.label}
                </div>
                <div className="font-montserrat text-[11px] text-cream-muted leading-relaxed">
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="py-28 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-gold mb-4">
              О магазине
            </p>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-cream mb-6 leading-snug">
              Хранители истории
              <br />
              <span className="text-gold-light italic">и традиций</span>
            </h2>
            <div className="section-divider mb-8" style={{ margin: "0 0 2rem 0" }} />
            <p className="font-montserrat text-[12px] text-cream-muted leading-loose mb-6 tracking-wide">
              ARMA — это не просто магазин. Это место, где история обретает материальное воплощение. Каждый предмет в нашей коллекции прошёл строгую экспертизу и несёт свою уникальную историю.
            </p>
            <p className="font-montserrat text-[12px] text-cream-muted leading-loose mb-10 tracking-wide">
              Мы работаем с ведущими коллекционерами Европы и России, обеспечивая полную прозрачность провенанса и юридическую чистоту сделок.
            </p>
            <Link
              to="/about"
              className="font-montserrat text-[11px] tracking-[0.25em] uppercase text-gold border-b border-gold pb-1 hover:text-gold-light hover:border-gold-light transition-colors"
            >
              Узнать больше
            </Link>
          </div>
          <div className="relative">
            <img
              src={expertImage}
              alt="Эксперт"
              className="w-full aspect-[4/5] object-cover"
            />
            <div className="absolute -bottom-4 -left-4 border border-[rgba(201,168,76,0.3)] w-full h-full pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Blog preview */}
      <section className="py-24 bg-[#0a0805]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-gold mb-4">
              Знания и история
            </p>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-cream">
              Последние публикации
            </h2>
            <div className="section-divider mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPreviews.map((post) => (
              <Link to="/blog" key={post.title} className="group block">
                <div className="border border-[rgba(201,168,76,0.15)] p-8 h-full group-hover:border-[rgba(201,168,76,0.4)] transition-all duration-300">
                  <span className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-gold">
                    {post.category}
                  </span>
                  <h3 className="font-cormorant text-2xl font-light text-cream mt-3 mb-4 leading-snug group-hover:text-gold-light transition-colors">
                    {post.title}
                  </h3>
                  <p className="font-montserrat text-[11px] text-cream-muted leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  <span className="font-montserrat text-[10px] text-cream-muted/50 tracking-wide">
                    {post.date}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="font-montserrat text-[11px] tracking-[0.25em] uppercase text-gold border border-[rgba(201,168,76,0.4)] px-10 py-4 hover:bg-gold hover:text-[#0e0b08] transition-all duration-300 inline-block"
            >
              Все статьи
            </Link>
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="py-28 max-w-5xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <p className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-gold mb-4">
            Экспертная помощь
          </p>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-cream mb-4">
            Консультация специалиста
          </h2>
          <div className="section-divider mt-6 mb-6" />
          <p className="font-montserrat text-[12px] text-cream-muted max-w-xl mx-auto leading-relaxed">
            Ищете редкий предмет или хотите оценить имеющийся экспонат? Наши эксперты помогут вам найти именно то, что вы ищете.
          </p>
        </div>
        <ConsultationForm />
      </section>

      <Footer />
    </div>
  );
}
