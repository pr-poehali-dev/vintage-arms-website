import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const collectionImage = "https://cdn.poehali.dev/projects/576b1575-d2ea-4b26-95ec-fc56c5267e1e/files/cb1f613f-efd9-48d5-b2e7-458dd679b69b.jpg";
const expertImage = "https://cdn.poehali.dev/projects/576b1575-d2ea-4b26-95ec-fc56c5267e1e/files/23b13d94-3b53-403a-8e84-0fffa23c788e.jpg";
const pistolsImage = "https://cdn.poehali.dev/projects/576b1575-d2ea-4b26-95ec-fc56c5267e1e/files/3baa000b-0d5d-48df-a253-c1cda165cfff.jpg";

const articles = [
  {
    id: 1,
    category: "История",
    title: "Дуэльные пистолеты эпохи Наполеона",
    excerpt: "Изящество и смертоносность в одном предмете — как парижские оружейники создавали шедевры для высшего света. Пара дуэльных пистолетов работы Лепажа стала символом эпохи.",
    date: "15 марта 2024",
    readTime: "8 мин",
    image: pistolsImage,
  },
  {
    id: 2,
    category: "Экспертиза",
    title: "Как отличить оригинал от копии",
    excerpt: "Методы профессиональной верификации: от клейм мастера до анализа металла. Рассказываем о том, на что обращают внимание эксперты при первичной атрибуции.",
    date: "28 февраля 2024",
    readTime: "12 мин",
    image: expertImage,
  },
  {
    id: 3,
    category: "Коллекции",
    title: "Восточное оружие: сабли Османской империи",
    excerpt: "Редкие образцы XVI–XVIII веков — история завоеваний, выкованная в стали. Золотая насечка, дамасская сталь и ювелирная работа по рукояти.",
    date: "10 февраля 2024",
    readTime: "10 мин",
    image: collectionImage,
  },
  {
    id: 4,
    category: "История",
    title: "Тульское оружейное производство: от Петра до наших дней",
    excerpt: "Как небольшой город в центре России стал одним из главных оружейных центров Европы. История тульских мастеров и их уникальные технологии.",
    date: "25 января 2024",
    readTime: "15 мин",
    image: collectionImage,
  },
  {
    id: 5,
    category: "Инвестиции",
    title: "Антикварное оружие как инвестиция",
    excerpt: "Редкие предметы вооружения стабильно растут в цене. Разбираем, на что обращать внимание при формировании инвестиционной коллекции.",
    date: "12 января 2024",
    readTime: "7 мин",
    image: expertImage,
  },
  {
    id: 6,
    category: "Реставрация",
    title: "Искусство реставрации: сохранить, не навредив",
    excerpt: "Тонкая грань между реставрацией и уничтожением ценности. Как профессиональные реставраторы возвращают предметам их первоначальный облик.",
    date: "3 января 2024",
    readTime: "11 мин",
    image: pistolsImage,
  },
];

const categories = ["Все", "История", "Экспертиза", "Коллекции", "Инвестиции", "Реставрация"];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("Все");

  const filtered = activeCategory === "Все"
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  return (
    <div className="bg-[#0e0b08] min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 text-center px-6">
        <p className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-gold mb-4">
          Знания и история
        </p>
        <h1 className="font-cormorant text-5xl md:text-6xl font-light text-cream mb-4">
          Блог
        </h1>
        <div className="section-divider mb-6" />
        <p className="font-montserrat text-[12px] text-cream-muted max-w-xl mx-auto leading-relaxed tracking-wide">
          Статьи об истории оружия, экспертизе и коллекционировании от ведущих специалистов
        </p>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-4">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-montserrat text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 border transition-all duration-300 ${
                activeCategory === cat
                  ? "border-gold bg-gold text-[#0e0b08]"
                  : "border-[rgba(201,168,76,0.25)] text-cream-muted hover:border-gold hover:text-cream"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((article) => (
            <article key={article.id} className="group cursor-pointer">
              <div className="overflow-hidden mb-5">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="border-l border-[rgba(201,168,76,0.25)] pl-5 group-hover:border-gold transition-colors duration-300">
                <div className="flex items-center gap-4 mb-3">
                  <span className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-gold">
                    {article.category}
                  </span>
                  <span className="font-montserrat text-[9px] text-cream-muted/50">
                    {article.readTime}
                  </span>
                </div>
                <h2 className="font-cormorant text-xl text-cream mb-3 font-light leading-snug group-hover:text-gold-light transition-colors">
                  {article.title}
                </h2>
                <p className="font-montserrat text-[11px] text-cream-muted leading-relaxed mb-4">
                  {article.excerpt}
                </p>
                <span className="font-montserrat text-[10px] text-cream-muted/40 tracking-wide">
                  {article.date}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
