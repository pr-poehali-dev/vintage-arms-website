
CREATE TABLE t_p66635637_vintage_arms_website.consultations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  interest TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE t_p66635637_vintage_arms_website.blog_posts (
  id SERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  read_time TEXT NOT NULL DEFAULT '5 мин',
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE t_p66635637_vintage_arms_website.site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO t_p66635637_vintage_arms_website.site_settings (key, value) VALUES
  ('address', 'г. Москва, Большая Никитская ул., 15'),
  ('phone', '+7 (495) 123-45-67'),
  ('email', 'info@arma-antique.ru'),
  ('hours_weekdays', 'Пн–Пт: 10:00 – 19:00'),
  ('hours_saturday', 'Сб: 11:00 – 17:00');

INSERT INTO t_p66635637_vintage_arms_website.blog_posts (category, title, excerpt, content, read_time) VALUES
  ('История', 'Дуэльные пистолеты эпохи Наполеона', 'Изящество и смертоносность в одном предмете — как парижские оружейники создавали шедевры для высшего света.', 'Полный текст статьи о дуэльных пистолетах...', '8 мин'),
  ('Экспертиза', 'Как отличить оригинал от копии', 'Методы профессиональной верификации: от клейм мастера до анализа металла.', 'Полный текст статьи об экспертизе...', '12 мин'),
  ('Коллекции', 'Восточное оружие: сабли Османской империи', 'Редкие образцы XVI–XVIII веков — история завоеваний, выкованная в стали.', 'Полный текст статьи о восточном оружии...', '10 мин');
