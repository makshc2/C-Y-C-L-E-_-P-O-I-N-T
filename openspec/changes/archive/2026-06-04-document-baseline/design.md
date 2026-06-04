## Context

Додаток складається з двох незалежних частин:

- **Фронт (SPA)** — Vue 3 + Quasar, GitHub Pages, hash router. Дві сторінки: тахометр (гонка) і архів.
- **Сервер (опційно)** — Express + SQLite (Render), `/api/races`. Активується лише якщо задано `VITE_ARCHIVE_API_URL`.

Web Bluetooth API вимагає secure context (HTTPS або `http://localhost`). Це апаратне обмеження платформи, що впливає на всі вимоги до підключення пристрою.

Baseline-зміна **не вносить нового коду** — вона описує поведінку, яка вже існує у `TachometerPage.vue`, `useCycplusDevice.ts`, `localDb.ts`, `raceArchiveApi.ts`, `server/`.

## Goals / Non-Goals

**Goals:**
- Зафіксувати as-is вимоги системи v0 у двох доменах: `race-session` і `race-archive`.
- Створити `openspec/specs/` як source of truth для майбутніх дельта-змін.
- Явно задокументувати ключові бізнес-правила (нічия 5 ms, крок фінішу 50 m, reconnect-логіка).

**Non-Goals:**
- Жодних змін у вихідному коді.
- Не описувати майбутні фічі (Pinia, Axios, авторизацію, мультиплатформеність).
- Не міняти схему localStorage або контракт API.
- Не описувати UI-деталі (розміщення елементів, кольори), лише поведінкові вимоги.

## Decisions

**D1: Два домени — `race-session` та `race-archive`**

Обрано варіант B (два домени) замість одного монолітного `cycle-point/spec.md`.
- `race-session` — усе, що відбувається під час гонки: BLE, налаштування, стартфініш, лапи, persist.
- `race-archive` — зберігання та перегляд записів.

Альтернатива A (один файл): простіше, але довгий документ і важче рев'ю дельта в майбутньому.
Альтернатива C (+ `bluetooth-device`): зайве для поточного розміру проєкту, BLE-деталі залишаються в `race-session`.

**D2: Сервер входить у домен `race-archive`**

Сервер описується як опційна storage-стратегія в `race-archive`, а не окремий домен — бо він реалізує ту ж саму бізнес-сутність (записи гонок) і не має власних вимог поза CRUD.

**D3: `finishRace()` вручну — поза scope baseline**

Кнопка ручного завершення існує в коді як службова можливість (наприклад, при втраті датчика), але не описана як user-facing вимога. Лишається у spec як SHOULD (необов'язкова можливість).

**D4: Точність нічиї 5 ms — бізнес-правило**

Зафіксована буквально: `|t1 − t2| ≤ 5 ms → tie`. Це не технічний хак, а рішення про прийнятну точність датчика.

## Risks / Trade-offs

**[Drift між кодом і spec]** — Якщо код зміниться без `/opsx:propose`, spec застаріє.
→ Митigation: усі зміни поведінки, що торкаються `race-session`/`race-archive`, проходять через OpenSpec change.

**[Web Bluetooth + мобільні браузери]** — Safari/Firefox не підтримують Web Bluetooth. Вимога про secure context не вирішує проблему відсутності API.
→ Mitigation: `useWebBluetoothSupport` показує банер; spec фіксує це як системне обмеження, не баг.

**[API без автентифікації]** — `POST /api/races` відкритий для будь-кого, хто знає URL.
→ Mitigation: не в scope baseline; зафіксувати як known limitation у `race-archive` spec.

## Open Questions

- *(Закрито в explore)* — Pinia/Axios у `config.yaml` згадані як мета стеку, але ще не підключені. Baseline описує фактичний стек.
