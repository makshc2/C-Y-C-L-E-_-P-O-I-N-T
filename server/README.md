# Бекенд архіву гонок

Node.js + Express + SQLite. Один ендпоінт: `POST /api/races` — збереження результату гонки (тіло як у фронту `RaceRecord`).

## Запуск

```bash
cd server
npm install
npm run dev
```

Сервер слухає порт змінну `PORT` (за замовчуванням 3000). База: `./data/races.db` або шлях з `SQLITE_PATH`.

## Фронт

Щоб відправляти результати на бекенд, задай змінну середовища при збірці/розробці:

- `VITE_ARCHIVE_API_URL=http://localhost:3000` для локальної розробки
- Для продакшену — URL твого хостованого бекенду (наприклад Render, Railway).

Якщо `VITE_ARCHIVE_API_URL` не задано, архів у браузері лишається тільки в localStorage; запити на бекенд не відправляються.

## Деплой на Render (безкоштовно)

1. Зайди на [render.com](https://render.com) і зареєструйся (GitHub).
2. **Dashboard** → **New** → **Blueprint**.
3. Підключи репозиторій GitHub (якщо ще не підключений) і вибери репо `C-Y-C-L-E-_-P-O-I-N-T`.
4. Render підхопить `render.yaml` з кореня репо — з’явиться сервіс **cycle-point-api**. Натисни **Apply**.
5. Після деплою скопіюй URL сервісу (на кшталт `https://cycle-point-api.onrender.com`).
6. У репо на GitHub: **Settings** → **Secrets and variables** → **Actions** → вкладка **Variables** → **New repository variable**. Ім’я: `VITE_ARCHIVE_API_URL`, значення: `https://cycle-point-api.onrender.com` (твій URL з кроку 5).
7. Зроби push у репо або вручну запусти workflow **Deploy to GitHub Pages** (**Actions** → вибери workflow → **Run workflow**), щоб фронт зібрався з цим URL.

**Обмеження безкоштовного Render:** сервіс “засинає” після ~15 хв без запитів; після пробудження перший запит може йти до 30–50 с. Дані SQLite на безкоштовному плані не зберігаються між рестартами — після редеплою або довгого простою архів обнулиться. Для постійного архіву пізніше можна підключити безкоштовну БД (наприклад Neon Postgres).

## Інші варіанти хостингу

- **Railway** — безкоштовний tier, деплой з GitHub.
- **Fly.io** — можна додати персистентний том для SQLite.

Пізніше для авторизації можна буде додати JWT або сесії та захистити ендпоінт.
