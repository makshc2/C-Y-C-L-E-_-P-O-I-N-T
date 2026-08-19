## Why

Cycle Point (Велоточка) зараз показує лише Bluetooth-тахометр на `#/`. Спільноті потрібен публічний сайт за зафіксованим макетом: головна, проєкти, майстерня, прокат, артефакти, благодійність. Тахометр і архів лишаються, але як вкладений застосунок Golden Sprints.

Джерело дизайну: `openspec/changes/cyclepoint-site/design-brief.md` і локальні файли в `openspec/changes/cyclepoint-site/assets/`. Figma Variables порожні; apply не запитує live Figma.

## What Changes

- Публічний маркетинговий сайт (desktop-first 1728, гумовий inferred-mobile stacking) замість тахометра на корені.
- **BREAKING:** `#/` стає головною спільноти; тахометр переїжджає на `/projects/golden-sprints/app`. `#/archive` переїжджає на `/projects/golden-sprints/archive` (старий шлях редіректить).
- Спільний chrome: хедер 78px (лого → `/`, Контакти, Проєкти, Майстерня, Події → Instagram, кнопка Благодійність, візуальний UA|ENG) і футер Danish Youth House.
- Головна: капсули «Актуальні події» / «Проєкти» як hover-входи; три іконки Майстерня / Прокат / Артефакти; блок контактів з якорем.
- Сторінки: `/projects`, `/projects/golden-sprints`, `/projects/army-support` (порожня як у макеті), `/workshop`, `/rental`, `/artifacts`, `/charity`.
- Єдина вигадана UI (документований розрив): текстове «Читати далі...» з деталки GS на app, колір `#e7fc84` на violet.
- Логіка гонки, Bluetooth і архіву **не** переписується — лише нові URL і вкладеність під site chrome застосунку.

## Capabilities

### New Capabilities

- `site-chrome`: маршрутизація hash-router, спільний хедер/футер маркетингових сторінок, навігація, якір контактів, візуальний UA|ENG, a11y focus ring.
- `home-page`: головна `/` — смуги tiffany/green/violet, hover-капсули, іконки сервісів, контакти з картою та Instagram-іконкою.
- `projects`: перелік проєктів, деталка Golden Sprints (копі з макета), порожня «Допомога армії», CTA на вкладений app.
- `workshop`: сторінка майстерні з копі макета (включно з «ексель та опис»).
- `rental`: каталог прокату без бронювання.
- `artifacts`: десять рядів артефактів зі спільним jpeg-placeholder.
- `charity`: сторінка з QR без платіжного флоу.

### Modified Capabilities

- `race-session`: тахометр доступний лише за `/projects/golden-sprints/app`; поведінка гонки/Bluetooth без змін вимог.
- `race-archive`: архів доступний за `/projects/golden-sprints/archive`; старий `/archive` редіректить сюди; логіка збереження/таблиці без змін.

## Impact

- **Код:** `src/App.vue`, `src/router/index.ts`, `src/main.ts`, `src/style.css`, `index.html`; нові сторінки й компоненти chrome; існуючі `TachometerPage.vue` / `ResultsArchivePage.vue` лишаються, змінюються лише маршрути та посилання «Тахометр»/«Архів».
- **Ассети:** копія з `openspec/changes/cyclepoint-site/assets/` у `src/assets/site/` (не QA-скріни, не `_home_raw`, не original jpeg).
- **Без змін:** `src/composables/useCycplusDevice.ts`, `useWebBluetoothSupport.ts`, `src/services/localDb.ts`, `raceArchiveApi.ts`, `server/`. Без Pinia, Axios, Options API.
- **Розгортання:** GitHub Pages, `base` `/C-Y-C-L-E-_-P-O-I-N-T/`, hash-router.
- **Залежності:** нові npm-пакети не потрібні. Шрифт Helvetica / Helvetica Neue (системний стек).

## Non-goals

- Справжній ENG-контент (перемикач UA|ENG лише візуальний).
- Бронювання прокату, платіжний флоу, CMS.
- Окремий мобільний макет / sitemap (лише inferred stacking).
- Виправлення копіпасту «Жіночий велоклуб» на деталці GS.
- Нова реалізація тахометра чи архіву (лише перенесення маршрутів).
- Повторний запит live Figma під час apply.
- Унікальні фото артефактів (усі слоти — один placeholder).
- Вигадані hover-стани кнопки Благодійність і nav (лише a11y focus ring).

## Acceptance criteria

- Усі маршрути з ІА відкриваються через hash-router з `base` `/C-Y-C-L-E-_-P-O-I-N-T/`.
- Головна, проєкти, GS-деталка, army-support, workshop, rental, artifacts, charity піксельно відповідають `design-brief.md` + QA-скрінам у `assets/` на ширині 1728.
- «Події» і капсула подій ведуть на `https://www.instagram.com/cyclepoint_workshop/` з `rel="noopener noreferrer"`.
- «Контакти» з будь-якої маркетингової сторінки показує головну і скролить до секції контактів.
- Тахометр працює на `/projects/golden-sprints/app` з тією ж логікою, що зараз; архів — на `/projects/golden-sprints/archive`.
- `npm run typecheck` і `npm run build` проходять.
