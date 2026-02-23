# Бекенд архіву гонок

Node.js + Express + SQLite. Один ендпоінт: `POST /api/races` — збереження результату гонки (тіло як у фронту `RaceRecord`).

## Запуск

```bash
cd server
npm install
npm run dev
```

Сервер слухає порт змінну `PORT` (за замовчуванням 3000). База: `./data/races.db` або шлях з `SQLITE_PATH`.