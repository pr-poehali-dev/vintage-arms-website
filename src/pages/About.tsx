import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const expertImage = "https://cdn.poehali.dev/projects/576b1575-d2ea-4b26-95ec-fc56c5267e1e/files/23b13d94-3b53-403a-8e84-0fffa23c788e.jpg";
const collectionImage = "https://cdn.poehali.dev/projects/576b1575-d2ea-4b26-95ec-fc56c5267e1e/files/cb1f613f-efd9-48d5-b2e7-458dd679b69b.jpg";

const values = [
  {
    title: "Подлинность",
    desc: "Каждый предмет проходит многоуровневую экспертизу. Мы гарантируем полную аутентичность и предоставляем развёрнутое заключение.",
  },
  {
    title: "Прозрачность",
    desc: "Детальный провенанс, история владения и юридическая чистота — обязательные условия для каждого предмета в нашей коллекции.",
  },
  {
    title: "Конфиденциальность",
    desc: "Мы понимаем ценность приватности. Все сделки осуществляются с полным соблюдением конфиденциальности.",
  },
  {
    title: "Экспертиза",
    desc: "Наша команда — историки, реставраторы и оружейные эксперты с совокупным опытом более 60 лет.",
  },
];

export default function About() {
  return (
    <div className="bg-[#0e0b08] min-h-screen">
      <Navbar />

      {/* Page Hero */}
      <section className="pt-40 pb-20 text-center px-6">
        <p className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-gold mb-4">
          О нас
        </p>
        <h1 className="font-cormorant text-5xl md:text-6xl font-light text-cream mb-6">
          О магазине
        </h1>
        <div className="section-divider" />
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative order-2 lg:order-1">
            <img
              src={collectionImage}
              alt="Коллекция"
              className="w-full aspect-[4/5] object-cover"
            />
            <div className="absolute -top-4 -right-4 border border-[rgba(201,168,76,0.25)] w-full h-full pointer-events-none" />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="font-cormorant text-4xl font-light text-cream mb-6 leading-snug">
              Основанные на страсти
              <br />
              <span className="text-gold-light italic">к истории</span>
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent mb-8" />
            <p className="font-montserrat text-[12px] text-cream-muted leading-loose mb-5 tracking-wide">
              Магазин ARMA был основан в 1999 году коллекционером и историком Андреем Волковым. Начав с небольшой частной коллекции, сегодня мы являемся одним из ведущих специализированных дилеров антикварного оружия в России.
            </p>
            <p className="font-montserrat text-[12px] text-cream-muted leading-loose mb-5 tracking-wide">
              За четверть века мы выстроили обширную сеть коллекционеров, аукционных домов и музеев по всей Европе, что позволяет нам предлагать по-настоящему редкие предметы с безупречной историей.
            </p>
            <p className="font-montserrat text-[12px] text-cream-muted leading-loose tracking-wide">
              Каждая покупка в ARMA — это не просто сделка, это начало отношений. Мы сопровождаем наших клиентов на всём пути: от поиска нужного предмета до его установки и страхования.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#0a0805]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-gold mb-4">
              Наши принципы
            </p>
            <h2 className="font-cormorant text-4xl font-light text-cream">
              Чем мы руководствуемся
            </h2>
            <div className="section-divider mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <div key={v.title} className="border border-[rgba(201,168,76,0.15)] p-10">
                <div className="font-cormorant text-5xl text-gold/20 font-light mb-4 leading-none">
                  0{i + 1}
                </div>
                <h3 className="font-cormorant text-2xl text-cream mb-4 font-light">
                  {v.title}
                </h3>
                <div className="w-10 h-px bg-gold mb-5" />
                <p className="font-montserrat text-[12px] text-cream-muted leading-loose">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-gold mb-4">
              Основатель
            </p>
            <h2 className="font-cormorant text-4xl font-light text-cream mb-4 leading-snug">
              Андрей Волков
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent mb-8" />
            <p className="font-montserrat text-[12px] text-cream-muted leading-loose mb-5 tracking-wide">
              Историк, коллекционер и эксперт-оружиевед с более чем 30-летним стажем. Автор ряда монографий по европейскому антикварному оружию XVIII–XIX веков.
            </p>
            <p className="font-montserrat text-[12px] text-cream-muted leading-loose tracking-wide">
              Консультант ведущих российских музеев и частных коллекций. Постоянный участник международных антикварных выставок в Лондоне, Париже и Вене.
            </p>
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

      {/* CTA */}
      <section className="py-20 bg-[#0a0805] text-center px-6">
        <h2 className="font-cormorant text-4xl font-light text-cream mb-4">
          Готовы начать поиск?
        </h2>
        <p className="font-montserrat text-[12px] text-cream-muted mb-8 tracking-wide max-w-md mx-auto">
          Свяжитесь с нашими экспертами и расскажите, что вы ищете.
        </p>
        <Link
          to="/contacts"
          className="border border-gold text-gold font-montserrat text-[11px] tracking-[0.3em] uppercase px-10 py-4 hover:bg-gold hover:text-[#0e0b08] transition-all duration-300 inline-block"
        >
          Запросить консультацию
        </Link>
      </section>

      <Footer />
    </div>
  );
}
