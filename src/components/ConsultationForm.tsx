import { useState } from "react";
import func2url from "../../backend/func2url.json";

const SUBMIT_URL = (func2url as Record<string, string>)["consultation-submit"];

export default function ConsultationForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch(SUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="section-divider mb-8" />
        <h3 className="font-cormorant text-3xl text-gold-light mb-4 font-light">
          Заявка принята
        </h3>
        <p className="font-montserrat text-[12px] text-cream-muted tracking-widest uppercase mb-2">
          Наш эксперт свяжется с вами в течение 24 часов
        </p>
        <div className="section-divider mt-8" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-cream-muted block mb-2">
            Имя *
          </label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full bg-transparent border border-[rgba(201,168,76,0.25)] text-cream font-montserrat text-[12px] tracking-wide px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder:text-cream-muted/30"
            placeholder="Ваше имя"
          />
        </div>
        <div>
          <label className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-cream-muted block mb-2">
            Телефон *
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={form.phone}
            onChange={handleChange}
            className="w-full bg-transparent border border-[rgba(201,168,76,0.25)] text-cream font-montserrat text-[12px] tracking-wide px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder:text-cream-muted/30"
            placeholder="+7 (___) ___-__-__"
          />
        </div>
      </div>

      <div>
        <label className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-cream-muted block mb-2">
          Область интереса
        </label>
        <select
          name="interest"
          value={form.interest}
          onChange={handleChange}
          className="w-full bg-[#0e0b08] border border-[rgba(201,168,76,0.25)] text-cream font-montserrat text-[12px] tracking-wide px-4 py-3 focus:outline-none focus:border-gold transition-colors"
        >
          <option value="">Выберите категорию</option>
          <option value="pistols">Пистолеты и дуэльное оружие</option>
          <option value="swords">Сабли и клинки</option>
          <option value="rifles">Ружья и карабины</option>
          <option value="eastern">Восточное оружие</option>
          <option value="european">Европейское оружие</option>
          <option value="other">Другое / не определился</option>
        </select>
      </div>

      <div>
        <label className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-cream-muted block mb-2">
          Сообщение
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          className="w-full bg-transparent border border-[rgba(201,168,76,0.25)] text-cream font-montserrat text-[12px] tracking-wide px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder:text-cream-muted/30 resize-none"
          placeholder="Опишите предмет, период или конкретный запрос..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full border border-gold text-gold font-montserrat text-[11px] tracking-[0.3em] uppercase py-4 hover:bg-gold hover:text-[#0e0b08] transition-all duration-300 disabled:opacity-50"
      >
        {loading ? "Отправка..." : "Запросить консультацию"}
      </button>

      <p className="font-montserrat text-[10px] text-cream-muted/40 text-center tracking-wide">
        Нажимая кнопку, вы соглашаетесь на обработку персональных данных
      </p>
    </form>
  );
}