## Context

Зараз SPA (`Vue 3` + Quasar + Vite + vue-router hash, `base` `/C-Y-C-L-E-_-P-O-I-N-T/`) має два маршрути в `src/router/index.ts`: `/` → `TachometerPage.vue`, `/archive` → `ResultsArchivePage.vue`. `src/App.vue` обгортає все в `q-layout` із кнопками «Тахометр» / «Архів». Bluetooth-логіка живе в `src/composables/useCycplusDevice.ts` і `useWebBluetoothSupport.ts`; архів — `src/services/localDb.ts` і `raceArchiveApi.ts`. `src/style.css` — шаблон Vite, у `main.ts` не імпортується. Каталогу `public/` немає. `@/assets/img/cycle_point.jpg` у хедері посилається на відсутній файл.

Ціль: публічний сайт спільноти за `openspec/changes/cyclepoint-site/design-brief.md` і локальними `assets/`. Піксельна точність desktop 1728. Apply **не** запитує live Figma. Токени exact з brief (Figma Variables порожні). Тахометр і архів вкласти під Golden Sprints без зміни race-логіки. Web Bluetooth лишається лише для вкладеного app (HTTPS / localhost).

Стек без змін: `<script setup lang="ts">`, Composition API, без Pinia, Axios, Options API.

## Goals / Non-Goals

**Goals:**

- Маркетингові сторінки з спільним chrome (хедер 78px, футер Danish) за brief.
- ІА зі англійськими слагами, hash-router, якір контактів з будь-якої маркетингової сторінки.
- Hover-капсули головної, порожня army-support, каталоги rental/artifacts, QR charity.
- Тахометр на `/projects/golden-sprints/app`, архів на `/projects/golden-sprints/archive`; старий `/archive` редіректить.
- Inferred mobile: колонки стопкою, той самий порядок регіонів.

**Non-Goals:**

- ENG-контент, CMS, бронювання, платіжний флоу.
- Окремий мобільний sitemap / вигадані Figma-стани (крім документованого CTA GS → app).
- Нова реалізація тахометра/архіву, виправлення копіпасту «Жіночий велоклуб».
- Повторний Figma MCP під час apply.

## Decisions

**D1: Два chrome за `route.meta.chrome`**

`src/App.vue` рендерить або `SiteLayout` (`chrome: 'site'`), або `GsAppLayout` (`chrome: 'app'`).

- Site: семантичні header/main/footer з макета; без поточного `q-header` «Cycle Point App».
- App: зберегти поточний Quasar toolbar (лого + «Тахометр» + «Архів»), оновити `:to` на нові шляхи. Кнопки «назад на сайт» немає в поточному продукті — не додавати.

Альтернатива (site-хедер на app): суперечить brief («кнопка назад/архів як зараз у продукті, не з цього макета»).

**D2: Маршрути (hash)**

| path | page | chrome |
|------|------|--------|
| `/` | HomePage | site |
| `/projects` | ProjectsPage | site |
| `/projects/golden-sprints` | GoldenSprintsPage | site |
| `/projects/golden-sprints/app` | TachometerPage | app |
| `/projects/golden-sprints/archive` | ResultsArchivePage | app |
| `/projects/army-support` | ArmySupportPage | site |
| `/workshop` | WorkshopPage | site |
| `/rental` | RentalPage | site |
| `/artifacts` | ArtifactsPage | site |
| `/charity` | CharityPage | site |
| `/archive` | redirect → `/projects/golden-sprints/archive` | — |

`createWebHashHistory(import.meta.env.BASE_URL)` і `base` у `vite.config.ts` не змінювати.

**D3: Якір контактів на hash-router**

ІА `/#contacts` = головна + секція з `id="contacts"`. Hash уже зайнятий роутером, тому address bar буде `{base}#/` + fragment `#contacts` (типово `{base}#/#contacts`). Посилання «Контакти»: `router.push({ path: '/', hash: '#contacts' })`. `scrollBehavior` скролить до `#contacts`. Якщо вже на `/` — лише скрол. Окремого маршруту `/contacts` немає.

Альтернатива (`?section=contacts`): гірше відповідає ІА.

**D4: Токени й ассети — brief, не Figma live**

CSS-змінні з таблиць brief у `src/styles/tokens.css` (імпорт у `src/main.ts`). Шрифт: `"Helvetica Neue", Helvetica, Arial, sans-serif`. Ассети копіювати з `openspec/changes/cyclepoint-site/assets/` у `src/assets/site/` (імпорт у компонентах). Не копіювати QA-скріни, `_home_raw/`, `*-original.jpeg`, `artifact-shared-original.jpeg`. Не hotlink MCP URL.

**D5: Капсули головної — три стани, без зайвих фреймів**

- Default: як `121:55` (події: blur 698×120 opacity 0.60 blur 10px; проєкти: 699×120 opacity 0.20 blur 3.85px).
- Hover-in: події як `129:159` (пігулка 440×112, підпис 40px); проєкти як `145:118` (пігулка 440×120).
- Mouseleave Проєкти: як `145:63` (блюр проєктів hidden, підпис лишається).
- Mouseleave Події: повернути default `121:55` (окремого фрейма немає).
- Клік події → Instagram; клік проєктів → `/projects`.
- `prefers-reduced-motion: reduce` — миттєва зміна стану, без анімації ширини.

**D6: Єдина вигадана UI**

На `/projects/golden-sprints` під абзацом — текстове «Читати далі...» (Helvetica Light 24px, `#e7fc84`) → `/projects/golden-sprints/app`. Позначити в розмітці як документований розрив. Інших CTA на app/archive немає.

**D7: Контент у `src/content/*.ts`**

Довгі тексти (home, projects, workshop, rental, artifacts) — константи TypeScript, сторінки лише розкладають. Копі пастити з brief буквально (подвійні пробіли, «Cб», «прстору», «сиділ», «ексель та опис», копіпаст «Жіночий велоклуб»).

**D8: Компоненти (мапа з brief)**

| Brief | Файл |
|-------|------|
| AppLogo | `src/components/site/SiteLogo.vue` |
| AppNav | `src/components/site/SiteNav.vue` |
| AppCharityButton | `src/components/site/SiteCharityButton.vue` |
| AppLangToggle | `src/components/site/SiteLangToggle.vue` |
| header збірка | `src/components/site/SiteHeader.vue` |
| AppFooter / AppDanishLogo | `src/components/site/SiteFooter.vue` |
| HomeCapsuleEvents / Projects / ServiceTile | `src/components/home/*.vue` |
| ProjectRow | `src/components/projects/ProjectRow.vue` |
| RentalBike | `src/components/rental/RentalBike.vue` |
| ArtifactRow | `src/components/artifacts/ArtifactRow.vue` |
| layouts | `src/layouts/SiteLayout.vue`, `src/layouts/GsAppLayout.vue` |

Instagram URL один: `https://www.instagram.com/cyclepoint_workshop/` у `src/constants/site.ts`. Зовнішні лінки: `target="_blank"` + `rel="noopener noreferrer"`.

Кнопка Благодійність і пункти nav: hover у макеті немає — лише `:focus-visible` ring. UA|ENG не змінює контент.

**D9: Inferred mobile**

Немає мобільного фрейма. Нижче `--bp-desktop` (1728): смуги на повну ширину, текст під фото, капсули на повну ширину, nav у вертикальний стек або рядок з переносом; порядок регіонів як на desktop. Не вигадувати окремі екрани.

**D10: Без змін у BLE-шарі**

Не чіпати `useCycplusDevice.ts`, `useWebBluetoothSupport.ts`, `localDb.ts`, `raceArchiveApi.ts`, `server/`. Обмеження secure context лишаються для app.

## Risks / Trade-offs

**[Hash + якір контактів]** → URL не буде буквальним `/#contacts`, бо `#` зайнятий роутером. Mitigation: spec вимагає поведінку (головна + скрол), не точний рядок у address bar.

**[Немає унікальних фото артефактів]** → усі 10 слотів візуально однакові. Mitigation: різні файли `artifact-0N-*.png` з brief (кроп), не вигадувати інші знімки.

**[Hover-out Події без фрейма]** → лише default. Mitigation: D5, не вигадувати третій вигляд.

**[GS app без макета]** → тахометр виглядає як зараз, не як сайт. Mitigation: окремий `chrome: 'app'`.

**[Шрифт Helvetica без вебліцензії]** → fallback Arial. Mitigation: системний стек з brief, не підміняти display-font.

**[Гумовий mobile inferred]** → QA лише проти desktop-скрінів 1728. Mitigation: не порівнювати мобілку з неіснуючими фреймами.

**[Ломані закладки `#/`]** → користувачі тахометра побачать головну. Mitigation: це навмисний BREAKING; архів редіректить зі старого `/archive`.

## Migration Plan

1. Задеплоїти SPA як зараз (GitHub Pages, той самий `base`).
2. Закладки `#/` відкривають головну; `#/archive` редіректить на новий архів.
3. Rollback: revert коміту зміни; BLE/localStorage схема не змінюється (`races_db_v1`).

## Open Questions

Немає. Рішення з design-intake і conductor зафіксовані в D1–D10.
