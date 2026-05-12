import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationForm from "@/components/ConsultationForm";
import Icon from "@/components/ui/icon";

const contactInfo = [
  {
    icon: "MapPin",
    label: "Адрес",
    value: "г. Москва, Большая Никитская ул., 15",
    sub: "Исторический центр Москвы",
  },
  {
    icon: "Phone",
    label: "Телефон",
    value: "+7 (495) 123-45-67",
    sub: "Пн–Сб: 10:00 – 19:00",
  },
  {
    icon: "Mail",
    label: "Электронная почта",
    value: "info@arma-antique.ru",
    sub: "Ответим в течение 24 часов",
  },
  {
    icon: "Clock",
    label: "Часы работы",
    value: "Пн–Пт: 10:00 – 19:00",
    sub: "Сб: 11:00 – 17:00, Вс: выходной",
  },
];

export default function Contacts() {
  return (
    <div className="bg-[#0e0b08] min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 text-center px-6">
        <p className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-gold mb-4">
          Свяжитесь с нами
        </p>
        <h1 className="font-cormorant text-5xl md:text-6xl font-light text-cream mb-4">
          Контакты
        </h1>
        <div className="section-divider mb-6" />
        <p className="font-montserrat text-[12px] text-cream-muted max-w-xl mx-auto leading-relaxed tracking-wide">
          Мы готовы ответить на все ваши вопросы и помочь найти именно тот предмет, который вы ищете
        </p>
      </section>

      {/* Contact Cards */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item) => (
            <div
              key={item.label}
              className="border border-[rgba(201,168,76,0.15)] p-8 hover:border-[rgba(201,168,76,0.4)] transition-all duration-300"
            >
              <div className="w-10 h-10 border border-[rgba(201,168,76,0.3)] flex items-center justify-center mb-6">
                <Icon name={item.icon as "MapPin"} size={16} className="text-gold" />
              </div>
              <div className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-gold mb-2">
                {item.label}
              </div>
              <div className="font-cormorant text-lg text-cream mb-1 font-light">
                {item.value}
              </div>
              <div className="font-montserrat text-[10px] text-cream-muted/60">
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Consultation Form */}
      <section className="py-20 bg-[#0a0805]">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <p className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-gold mb-4">
              Экспертная помощь
            </p>
            <h2 className="font-cormorant text-4xl font-light text-cream mb-4">
              Запросить консультацию
            </h2>
            <div className="section-divider mt-4 mb-6" />
            <p className="font-montserrat text-[12px] text-cream-muted leading-relaxed">
              Расскажите нам о предмете вашего интереса — наш эксперт свяжется с вами лично
            </p>
          </div>
          <ConsultationForm />
        </div>
      </section>

      {/* Visit us */}
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-montserrat text-[10px] tracking-[0.4em] uppercase text-gold mb-4">
              Личный визит
            </p>
            <h2 className="font-cormorant text-4xl font-light text-cream mb-6">
              Приглашаем в салон
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent mb-8" />
            <p className="font-montserrat text-[12px] text-cream-muted leading-loose mb-5 tracking-wide">
              Наш салон расположен в историческом здании в центре Москвы. Атмосфера соответствует духу наших коллекций — спокойная, элегантная и располагающая к вдумчивому диалогу.
            </p>
            <p className="font-montserrat text-[12px] text-cream-muted leading-loose tracking-wide">
              Предварительная запись желательна, но не обязательна. Мы уделим вам столько времени, сколько необходимо.
            </p>
          </div>
          <div className="bg-[#0a0805] border border-[rgba(201,168,76,0.15)] p-10">
            <div className="space-y-6">
              <div>
                <div className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-gold mb-2">
                  Как добраться
                </div>
                <p className="font-montserrat text-[12px] text-cream-muted leading-relaxed">
                  Метро «Арбатская» или «Библиотека им. Ленина», 5 минут пешком. Парковка — на Большой Никитской улице.
                </p>
              </div>
              <div className="w-full h-px bg-[rgba(201,168,76,0.1)]" />
              <div>
                <div className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-gold mb-2">
                  Визит по предварительной записи
                </div>
                <p className="font-montserrat text-[12px] text-cream-muted leading-relaxed">
                  Для просмотра редких или закрытых экспонатов рекомендуем записаться заранее. Позвоните нам или заполните форму выше.
                </p>
              </div>
              <div className="w-full h-px bg-[rgba(201,168,76,0.1)]" />
              <div>
                <div className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-gold mb-2">
                  Конфиденциальность
                </div>
                <p className="font-montserrat text-[12px] text-cream-muted leading-relaxed">
                  Все встречи проходят в приватной обстановке. Мы никогда не раскрываем информацию о наших клиентах.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
