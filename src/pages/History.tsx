import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const pistolsImage = "https://cdn.poehali.dev/projects/576b1575-d2ea-4b26-95ec-fc56c5267e1e/files/3baa000b-0d5d-48df-a253-c1cda165cfff.jpg";
const expertImage = "https://cdn.poehali.dev/projects/576b1575-d2ea-4b26-95ec-fc56c5267e1e/files/23b13d94-3b53-403a-8e84-0fffa23c788e.jpg";

const eras = [
  {
    period: "XVI – XVII века",
    title: "Эпоха колесцовых замков",
    desc: "Первые кремнёвые механизмы открыли новую эру в истории оружия. Колесцовый замок немецкого происхождения позволил создавать элегантные пистолеты — символы власти и статуса аристократии.",
  },
  {
    period: "XVIII век",
    title: "Золотой век огнестрельного оружия",
    desc: "Эпоха Просвещения подарила миру шедевры оружейного искусства. Парижские, лондонские и тульские мастера создавали произведения, сочетавшие смертоносную функциональность с ювелирным изяществом.",
  },
  {
    period: "XIX век",
    title: "Дуэльная культура и капсюльный замок",
    desc: "Дуэли стали неотъемлемой частью аристократического этикета, породив особый тип оружия — дуэльные пары высочайшего качества. Капсюльный замок сделал оружие более надёжным и точным.",
  },
  {
    period: "Восточное оружие",
    title: "Сабли, ятаганы, пистолеты",
    desc: "Оружейные традиции Osmской империи, Персии и Кавказа создали уникальные образцы, украшенные золотой насечкой, слоновой костью и драгоценными камнями.",
  },
];

const expertiseSteps = [
  {
    step: "01",
    title: "Первичная атрибуция",
    desc: "Визуальный осмотр, изучение конструктивных особенностей, клейм и подписей мастера.",
  },
  {
    step: "02",
    title: "Исторический анализ",
    desc: "Сравнение с задокументированными образцами, архивный поиск, изучение провенанса.",
  },
  {
    step: "03",
    title: "Материаловедческая экспертиза",
    desc: "Анализ состава металла, дерева и отделочных материалов неразрушающими методами.",
  },
  {
    step: "04",
    title: "Оформление заключения",
    desc: "Подготовка детального экспертного заключения с фотодокументацией и историческими справками.",
  },
];

export default function History() {
  return (
    <div className="bg-[#0e0b08] min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 text-center px-6">
        <p className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-gold mb-4">
          Знание и традиция
        </p>
        <h1 className="font-cormorant text-5xl md:text-6xl font-light text-cream mb-4 leading-tight">
          История и экспертиза
        </h1>
        <div className="section-divider mb-6" />
        <p className="font-montserrat text-[12px] text-cream-muted max-w-xl mx-auto leading-relaxed tracking-wide">
          Понимание исторического контекста — основа настоящей коллекции. Мы не просто продаём предметы, мы передаём знание.
        </p>
      </section>

      {/* Timeline */}
      <section className="max-w-5xl mx-auto px-6 lg:px-12 pb-28">
        <div className="space-y-0">
          {eras.map((era, i) => (
            <div
              key={era.period}
              className={`grid grid-cols-1 lg:grid-cols-5 gap-8 items-start py-14 border-b border-[rgba(201,168,76,0.12)] last:border-0`}
            >
              <div className="lg:col-span-2">
                <div className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-gold mb-3">
                  {era.period}
                </div>
                <div className="font-cormorant text-5xl text-gold/10 font-light">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="lg:col-span-3">
                <h3 className="font-cormorant text-2xl text-cream mb-4 font-light">
                  {era.title}
                </h3>
                <p className="font-montserrat text-[12px] text-cream-muted leading-loose tracking-wide">
                  {era.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery split */}
      <section className="py-20 bg-[#0a0805]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <img
              src={pistolsImage}
              alt="Антикварные пистолеты"
              className="w-full h-80 lg:h-[500px] object-cover"
            />
            <img
              src={expertImage}
              alt="Эксперт за работой"
              className="w-full h-80 lg:h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Expertise process */}
      <section className="py-28 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-gold mb-4">
            Наш подход
          </p>
          <h2 className="font-cormorant text-4xl font-light text-cream mb-4">
            Процесс экспертизы
          </h2>
          <div className="section-divider mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {expertiseSteps.map((s) => (
            <div key={s.step} className="relative">
              <div className="font-cormorant text-6xl text-gold/15 font-light leading-none mb-4">
                {s.step}
              </div>
              <h3 className="font-cormorant text-xl text-cream mb-3 font-light">
                {s.title}
              </h3>
              <div className="w-8 h-px bg-gold mb-4" />
              <p className="font-montserrat text-[11px] text-cream-muted leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
