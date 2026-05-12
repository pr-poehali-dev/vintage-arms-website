import { useState, useEffect } from "react";
import func2url from "../../backend/func2url.json";

const URLS = func2url as Record<string, string>;

type Tab = "consultations" | "blog" | "settings";

interface Consultation {
  id: number;
  name: string;
  phone: string;
  interest: string;
  message: string;
  status: string;
  created_at: string;
}

interface BlogPost {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  read_time: string;
  published: boolean;
  created_at: string;
}

interface Settings {
  address: string;
  phone: string;
  email: string;
  hours_weekdays: string;
  hours_saturday: string;
}

const INTEREST_MAP: Record<string, string> = {
  pistols: "Пистолеты и дуэльное оружие",
  swords: "Сабли и клинки",
  rifles: "Ружья и карабины",
  eastern: "Восточное оружие",
  european: "Европейское оружие",
  other: "Другое",
};

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  new: { label: "Новая", color: "#C9A84C" },
  processing: { label: "В работе", color: "#6B9FD4" },
  done: { label: "Завершена", color: "#6BAF7A" },
};

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem("admin_token") || "");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [tab, setTab] = useState<Tab>("consultations");
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [settings, setSettings] = useState<Settings>({
    address: "", phone: "", email: "", hours_weekdays: "", hours_saturday: "",
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  const [editPost, setEditPost] = useState<BlogPost | null>(null);
  const [newPost, setNewPost] = useState(false);

  const authHeader = { "Content-Type": "application/json", "X-Admin-Token": token };

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    const res = await fetch(URLS["admin-auth"], {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: loginPassword }),
    });
    setLoginLoading(false);
    if (res.ok) {
      // Store the password as token for simplicity (backend checks it directly)
      localStorage.setItem("admin_token", loginPassword);
      setToken(loginPassword);
    } else {
      setLoginError("Неверный пароль");
    }
  }

  function logout() {
    localStorage.removeItem("admin_token");
    setToken("");
  }

  useEffect(() => {
    if (!token) return;
    if (tab === "consultations") loadConsultations();
    if (tab === "blog") loadPosts();
    if (tab === "settings") loadSettings();
  }, [tab, token]);

  async function loadConsultations() {
    const res = await fetch(URLS["admin-consultations"], { headers: authHeader });
    if (res.ok) setConsultations(await res.json());
  }

  async function updateConsultationStatus(id: number, status: string) {
    await fetch(URLS["admin-consultations"], {
      method: "PUT",
      headers: authHeader,
      body: JSON.stringify({ id, status }),
    });
    loadConsultations();
  }

  async function deleteConsultation(id: number) {
    if (!confirm("Удалить заявку?")) return;
    await fetch(URLS["admin-consultations"] + "?id=" + id, { method: "DELETE", headers: authHeader });
    loadConsultations();
  }

  async function loadPosts() {
    const res = await fetch(URLS["admin-blog"], { headers: authHeader });
    if (res.ok) setPosts(await res.json());
  }

  async function savePost(post: Partial<BlogPost> & { id?: number }) {
    const method = post.id ? "PUT" : "POST";
    await fetch(URLS["admin-blog"], { method, headers: authHeader, body: JSON.stringify(post) });
    setEditPost(null);
    setNewPost(false);
    loadPosts();
  }

  async function deletePost(id: number) {
    if (!confirm("Удалить статью?")) return;
    await fetch(URLS["admin-blog"] + "?id=" + id, { method: "DELETE", headers: authHeader });
    loadPosts();
  }

  async function loadSettings() {
    const res = await fetch(URLS["admin-settings"], { headers: authHeader });
    if (res.ok) setSettings(await res.json());
  }

  async function saveSettings(e: React.FormEvent) {
    e.preventDefault();
    await fetch(URLS["admin-settings"], { method: "PUT", headers: authHeader, body: JSON.stringify(settings) });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  }

  // ── LOGIN ──
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0e0b08]">
        <div className="w-full max-w-sm p-10 border border-[rgba(201,168,76,0.25)]" style={{ backgroundColor: "var(--dark-card)" }}>
          <div className="text-center mb-8">
            <span className="font-cormorant text-2xl tracking-[0.15em] text-gold-light">ARMA</span>
            <div className="font-montserrat text-[9px] tracking-[0.35em] uppercase text-cream-muted mt-1">
              Панель администратора
            </div>
          </div>
          <form onSubmit={login} className="space-y-5">
            <div>
              <label className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-cream-muted block mb-2">
                Пароль
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                className="w-full bg-transparent border border-[rgba(201,168,76,0.25)] text-cream font-montserrat text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
            {loginError && (
              <p className="font-montserrat text-[11px] text-red-400">{loginError}</p>
            )}
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full border border-gold text-gold font-montserrat text-[11px] tracking-[0.3em] uppercase py-3 hover:bg-gold hover:text-[#0e0b08] transition-all duration-300 disabled:opacity-50"
            >
              {loginLoading ? "Вход..." : "Войти"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── POST EDITOR ──
  const PostEditor = ({ post, onSave, onCancel }: {
    post: Partial<BlogPost>;
    onSave: (p: Partial<BlogPost>) => void;
    onCancel: () => void;
  }) => {
    const [form, setForm] = useState({ ...post });
    const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0e0b08]/90 backdrop-blur-sm">
        <div className="w-full max-w-2xl border border-[rgba(201,168,76,0.25)] p-8 max-h-[90vh] overflow-y-auto" style={{ backgroundColor: "var(--dark-card)" }}>
          <h3 className="font-cormorant text-2xl text-cream mb-6 font-light">
            {post.id ? "Редактировать статью" : "Новая статья"}
          </h3>
          <div className="space-y-4">
            {[
              { key: "title", label: "Заголовок" },
              { key: "category", label: "Категория" },
              { key: "read_time", label: "Время чтения" },
              { key: "image_url", label: "URL изображения" },
            ].map(f => (
              <div key={f.key}>
                <label className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-cream-muted block mb-1">{f.label}</label>
                <input
                  value={(form as Record<string, string>)[f.key] || ""}
                  onChange={e => set(f.key, e.target.value)}
                  className="w-full bg-transparent border border-[rgba(201,168,76,0.2)] text-cream font-montserrat text-sm px-3 py-2.5 focus:outline-none focus:border-gold"
                />
              </div>
            ))}
            <div>
              <label className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-cream-muted block mb-1">Краткое описание</label>
              <textarea
                rows={2}
                value={form.excerpt || ""}
                onChange={e => set("excerpt", e.target.value)}
                className="w-full bg-transparent border border-[rgba(201,168,76,0.2)] text-cream font-montserrat text-sm px-3 py-2.5 focus:outline-none focus:border-gold resize-none"
              />
            </div>
            <div>
              <label className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-cream-muted block mb-1">Полный текст</label>
              <textarea
                rows={6}
                value={form.content || ""}
                onChange={e => set("content", e.target.value)}
                className="w-full bg-transparent border border-[rgba(201,168,76,0.2)] text-cream font-montserrat text-sm px-3 py-2.5 focus:outline-none focus:border-gold resize-none"
              />
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={!!form.published}
                onChange={e => set("published", e.target.checked)}
                className="accent-gold"
              />
              <span className="font-montserrat text-[11px] text-cream-muted">Опубликовать</span>
            </label>
          </div>
          <div className="flex gap-4 mt-8">
            <button onClick={() => onSave(form)}
              className="flex-1 border border-gold text-gold font-montserrat text-[11px] tracking-[0.25em] uppercase py-3 hover:bg-gold hover:text-[#0e0b08] transition-all duration-300">
              Сохранить
            </button>
            <button onClick={onCancel}
              className="flex-1 border border-[rgba(201,168,76,0.2)] text-cream-muted font-montserrat text-[11px] tracking-[0.25em] uppercase py-3 hover:border-cream-muted hover:text-cream transition-all duration-300">
              Отмена
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ── MAIN PANEL ──
  return (
    <div className="min-h-screen bg-[#0e0b08]">
      {(editPost || newPost) && (
        <PostEditor
          post={editPost || { published: true }}
          onSave={savePost}
          onCancel={() => { setEditPost(null); setNewPost(false); }}
        />
      )}

      {/* Header */}
      <div className="border-b border-[rgba(201,168,76,0.15)] bg-[#0a0805]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-cormorant text-xl tracking-[0.15em] text-gold-light">ARMA</span>
            <span className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-cream-muted">Администратор</span>
          </div>
          <button onClick={logout} className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-cream-muted hover:text-cream transition-colors">
            Выйти
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-[rgba(201,168,76,0.15)]">
          {([
            { key: "consultations", label: `Заявки (${consultations.length})` },
            { key: "blog", label: "Блог" },
            { key: "settings", label: "Настройки" },
          ] as const).map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`font-montserrat text-[11px] tracking-[0.2em] uppercase px-6 py-3 border-b-2 -mb-px transition-all ${
                tab === t.key
                  ? "border-gold text-gold"
                  : "border-transparent text-cream-muted hover:text-cream"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── CONSULTATIONS ── */}
        {tab === "consultations" && (
          <div className="space-y-4">
            {consultations.length === 0 && (
              <p className="font-montserrat text-[12px] text-cream-muted text-center py-12">
                Заявок пока нет
              </p>
            )}
            {consultations.map(c => (
              <div key={c.id} className="border border-[rgba(201,168,76,0.15)] p-6 hover:border-[rgba(201,168,76,0.3)] transition-colors">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-cormorant text-xl text-cream">{c.name}</span>
                      <span
                        className="font-montserrat text-[9px] tracking-[0.2em] uppercase px-2 py-0.5"
                        style={{
                          color: STATUS_MAP[c.status]?.color || "#fff",
                          border: `1px solid ${STATUS_MAP[c.status]?.color || "#fff"}44`,
                        }}
                      >
                        {STATUS_MAP[c.status]?.label || c.status}
                      </span>
                    </div>
                    <div className="font-montserrat text-[12px] text-cream-muted mb-1">{c.phone}</div>
                    {c.interest && (
                      <div className="font-montserrat text-[11px] text-cream-muted/60 mb-1">
                        {INTEREST_MAP[c.interest] || c.interest}
                      </div>
                    )}
                    {c.message && (
                      <div className="font-montserrat text-[12px] text-cream-muted mt-2 leading-relaxed">{c.message}</div>
                    )}
                    <div className="font-montserrat text-[10px] text-cream-muted/40 mt-3">
                      {new Date(c.created_at).toLocaleString("ru-RU")}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <select
                      value={c.status}
                      onChange={e => updateConsultationStatus(c.id, e.target.value)}
                      className="bg-[#0e0b08] border border-[rgba(201,168,76,0.25)] text-cream-muted font-montserrat text-[10px] tracking-wide px-3 py-1.5 focus:outline-none focus:border-gold"
                    >
                      <option value="new">Новая</option>
                      <option value="processing">В работе</option>
                      <option value="done">Завершена</option>
                    </select>
                    <button
                      onClick={() => deleteConsultation(c.id)}
                      className="font-montserrat text-[10px] tracking-[0.15em] uppercase text-red-400/60 hover:text-red-400 transition-colors border border-red-400/20 hover:border-red-400/40 px-3 py-1.5"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── BLOG ── */}
        {tab === "blog" && (
          <div>
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setNewPost(true)}
                className="border border-gold text-gold font-montserrat text-[11px] tracking-[0.25em] uppercase px-6 py-2.5 hover:bg-gold hover:text-[#0e0b08] transition-all duration-300"
              >
                + Новая статья
              </button>
            </div>
            <div className="space-y-3">
              {posts.map(post => (
                <div key={post.id} className="border border-[rgba(201,168,76,0.15)] p-5 flex items-center justify-between gap-4 hover:border-[rgba(201,168,76,0.3)] transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-montserrat text-[9px] tracking-[0.2em] uppercase text-gold">{post.category}</span>
                      {!post.published && (
                        <span className="font-montserrat text-[9px] tracking-[0.2em] uppercase text-cream-muted/40 border border-cream-muted/20 px-2 py-0.5">
                          Черновик
                        </span>
                      )}
                    </div>
                    <div className="font-cormorant text-lg text-cream truncate">{post.title}</div>
                    <div className="font-montserrat text-[10px] text-cream-muted/40 mt-1">
                      {new Date(post.created_at).toLocaleDateString("ru-RU")} · {post.read_time}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => setEditPost(post)}
                      className="font-montserrat text-[10px] tracking-[0.15em] uppercase text-gold hover:text-gold-light transition-colors border border-[rgba(201,168,76,0.25)] hover:border-gold px-3 py-1.5"
                    >
                      Редактировать
                    </button>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="font-montserrat text-[10px] tracking-[0.15em] uppercase text-red-400/60 hover:text-red-400 transition-colors border border-red-400/20 hover:border-red-400/40 px-3 py-1.5"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SETTINGS ── */}
        {tab === "settings" && (
          <form onSubmit={saveSettings} className="max-w-xl space-y-5">
            {[
              { key: "address", label: "Адрес" },
              { key: "phone", label: "Телефон" },
              { key: "email", label: "Email" },
              { key: "hours_weekdays", label: "Часы работы (будни)" },
              { key: "hours_saturday", label: "Часы работы (суббота)" },
            ].map(f => (
              <div key={f.key}>
                <label className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-cream-muted block mb-2">
                  {f.label}
                </label>
                <input
                  value={(settings as Record<string, string>)[f.key] || ""}
                  onChange={e => setSettings(s => ({ ...s, [f.key]: e.target.value }))}
                  className="w-full bg-transparent border border-[rgba(201,168,76,0.25)] text-cream font-montserrat text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            ))}
            <div className="flex items-center gap-4 pt-2">
              <button
                type="submit"
                className="border border-gold text-gold font-montserrat text-[11px] tracking-[0.3em] uppercase px-8 py-3 hover:bg-gold hover:text-[#0e0b08] transition-all duration-300"
              >
                Сохранить
              </button>
              {settingsSaved && (
                <span className="font-montserrat text-[11px] text-green-400">Сохранено ✓</span>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
