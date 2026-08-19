## Context

Маркетинговий сайт уже живе в `src/layouts/SiteLayout.vue` (хедер / `<main>` / футер). Desktop 1728 зібраний абсолютними координатами під кадр Figma `121:55` (`MvXJfIcOGrrsT82JxAMpDL`). У CSS зараз `--bp-desktop: 1728px` і майже всюди `@media (max-width: 1727px)` вмикає один phone-стек (`flex-direction: column`, `position: static`). На 1280–1727 і планшеті це ламає бічний склад.

Окремих tablet/mobile фреймів немає. Архівний `openspec/changes/archive/2026-08-19-cyclepoint-site/design-brief.md` — історичний 1728 exact, не новий brief.

Частина поведінки вже в незакоміченому working tree: `SiteNav.vue` без Прокат/Артефактів, капсули без default-блюру з пігулкою 440×120 і нерухомим підписом, токени капсул, прозорий `logo-danish.png`. Hover сервісних плиток ще немає.

Стек без змін: Vue 3 `<script setup lang="ts">`, Quasar, Vite, vue-router. Без Pinia, Axios, Options API.

## Goals / Non-Goals

**Goals:**

- Три брейкпоінти для всього `SiteLayout`: desktop ≥1280, tablet 768–1279, phone <768.
- 1728 лишається pixel-perfect джерелом правди; 1280–1727 — стиснутий той самий склад, не phone-стек.
- Зафіксувати хедер, капсули, danish-логотип (working tree) і додати hover хіт-зон трьох сервісів.
- Внутрішні маркетингові двоколонки (проєкти, GS, прокат, артефакти, контакти) підкорити тим самим порогам.

**Non-Goals:**

- Нові Figma-фрейми, мобільний sitemap, нові сторінки.
- `GsAppLayout`, тахометр, архів, BLE, `server/`.
- `transform: scale()` на `.site-layout` / `body` / `#app`.
- Pixel-QA 1366.
- Реальний i18n ENG.
- Повернення Прокат/Артефактів у хедер.

## Decisions

**D1: Токени брейкпоінтів у `src/styles/tokens.css`**

| Токен | Значення | Роль |
|-------|----------|------|
| `--page-w` | `1728px` | ширина кадру 121:55; pixel-perfect при `min-width: 1728px` |
| `--bp-desktop` | `1280px` | поріг десктопного складу (замінює поточні 1728) |
| `--bp-tablet` | `768px` | нижня межа tablet |

`@media` **не** читає custom properties надійно — у файлах компонентів писати літерали `1279px` і `767px`, що збігаються з токенами. Не вимагати pixel-perfect на 1366.

Альтернатива (лишити `--bp-desktop: 1728px`): саме поточна помилка.

**D2: Три склади, без page-scale**

- **≥1280:** той самий бічний склад, що на 1728. На 1280–1727 — гумові ширини (`min(100%, var(--page-w))`, `fr` / `%`, `clamp` для gutter замість фіксованих 149px там, де рядок інакше ламається). Абсолютні `left`/`top` з 1728 на цьому діапазоні замінити на flex/grid з тим самим порядком регіонів.
- **768–1279:** 2-колонка **дозволена**, де на desktop уже є колонки (intro текст+капсула, community, контакти карта+інфо, `ProjectRow`, `RentalBike`, `ArtifactRow`, деталка GS). Три сервісні плитки можуть стиснутися в ряд або перенестись у 2+1; не обов’язково складати їх у стопку.
- **<768:** одна колонка. Порядок регіонів як на desktop (зліва направо → зверху вниз). Смуги головної: intro → community → сервіси → контакти → футер.

Заборонено: `transform: scale()` / `zoom` на `.site-layout`, `body`, `#app`, `.home`.

Альтернатива (scale всієї сторінки від 1728): ламає кліки, скрол, focus і hit-зони.

**D3: Замінити всі marketing `max-width: 1727px`**

Поточний phone-стек на `<1728` живе в:

| Шар | Файли |
|-----|--------|
| Chrome | `SiteLayout.vue`, `SiteHeader.vue`, `SiteNav.vue`, `SiteLogo.vue` |
| Головна | `HomePage.vue`, `HomeCapsuleEvents.vue`, `HomeCapsuleProjects.vue`, `HomeServiceTile.vue` |
| Внутрішні | `ProjectsPage.vue`, `ProjectRow.vue`, `GoldenSprintsPage.vue`, `ArmySupportPage.vue`, `WorkshopPage.vue`, `RentalPage.vue`, `RentalBike.vue`, `ArtifactsPage.vue`, `ArtifactRow.vue`, `CharityPage.vue`, `EventsPage.vue` |
| Глобально | `src/style.css` (`.site-stack`) |

Правило для apply: стос колонок — лише `@media (max-width: 767px)`. Між 768 і 1279 лишати grid/flex з 2 колонками (або стиснутий 3-ряд сервісів). `GsAppLayout.vue` і сторінки тахометра/архіву не чіпати, навіть якщо там є інші медіа.

**D4: Хедер**

`SiteNav.vue` (working tree): Контакти (`/` + `#contacts`), Проєкти (`/projects`), Майстерня (`/workshop`), Події (`/events`). Без `/rental` і `/artifacts`. `SiteCharityButton` і `SiteLangToggle` лишаються в `SiteHeader.vue`.

На ≥1280 хедер тримає один ряд (логотип зліва, нав+благодійність+мова справа), як 121:55. На tablet/phone дозволений перенос рядка нав, без появи Прокат/Артефактів. Hover пунктів нав і кнопки Благодійність не вигадувати — лише `:focus-visible` (чинна вимога).

`/events` уже в `src/router/index.ts` — не нова сторінка.

**D5: Капсули — CSS `:hover`, спільна поведінка**

Working tree вже збігається з новою вимогою. Не повертати JS `hovered`/`left`, default full-width blur, 40px на hover чи різну висоту пігулки подій (112px).

Спільне для `HomeCapsuleEvents.vue` і `HomeCapsuleProjects.vue`:

- Default: підпис 36px на фото (координати desktop 1728 як зараз: події `left: 208px; top: 395px`, проєкти `left: 273px; top: 395px`); `.capsule__blur` `opacity: 0` / `visibility: hidden`.
- Hover (`@media (hover: hover)`) і `:focus-visible`: пігулка 440×120, обводка `1.5px solid rgba(255,255,255,0.2)`, прозора; підпис не змінює координати й `font-size`.
- Mouseleave / втрата hover: знову лише текст.
- `prefers-reduced-motion: reduce`: `transition: none` (миттєва поява/зникнення пігулки).

Клік: події → `/events`; проєкти → `/projects`. Implementer звіряє working tree і править лише розбіжності.

**D6: Сервісні плитки — нова робота**

У `HomeServiceTile.vue` зараз немає hover. Додати кільце/обводку **на сам `RouterLink.tile`** (це і є хіт-зона/кнопка з `HomePage.vue`: 530×415 / 552×428 / 490×416 на 1728). Не вішати hover на `.home-services` чи інші обгортки.

Іконка й підпис: `position`/`transform`/`margin`/`font-size` на `:hover` не змінювати. Кільце — `outline` або `box-shadow`, без зміни `padding`/`width`/`height` плитки. `:focus-visible` лишається. На пристроях без hover кільце не показувати (крім focus).

**D7: Логотип Danish**

`src/assets/site/logo-danish.png` у working tree — прозорий кроп з Figma 121:85. `SiteFooter.vue` лишає `object-fit: contain` на tiffany-тлі. Не додавати білий `background` на `<img>`. Implementer перевіряє альфа-канал PNG; якщо знову з’явиться білий прямокутник — повернути прозорий асет.

**D8: Без змін app-chrome**

Не редагувати `src/layouts/GsAppLayout.vue`, `src/pages/TachometerPage.vue`, `src/pages/ResultsArchivePage.vue`, composables Bluetooth, `src/services/*`, `server/`.

## Risks / Trade-offs

**[Немає tablet/mobile Figma]** → «на око» від 1728, без pixel-QA 1366. Mitigation: 1728 лишається єдиним exact; нижчі ширини перевіряти складом колонок, не пікселями.

**[Абсолютний лейаут HomePage на 1728]** → на 1280–1727 `left: 1190px` вилізе за в’юпорт. Mitigation: D2 — flex/grid на `<1728` зі збереженням ряду, стос лише `<768`.

**[Working tree уже змінений]** → apply може перезаписати правильні капсули/нав. Mitigation: перші таски — звірка, не «переписати з нуля».

**[Події: spec Instagram vs продукт `/events`]** → головний spec застарів. Mitigation: delta фіксує `/events` як існуючий маршрут, без нового sitemap.

**[Три плитки на tablet]** → 3-колонка може не вміститися. Mitigation: дозволено 2+1 wrap, не обов’язкова стопка до `<768`.

## Migration Plan

1. Звірити working tree з D4–D7; не комітити відкат правильної поведінки.
2. Змінити токени й медіа SiteLayout / внутрішніх сторінок (D1–D3).
3. Додати hover `HomeServiceTile.vue` (D6).
4. `npm run typecheck` і `npm run build`.
5. Rollback: revert коміту зміни; app-chrome і дані архіву не зачіпаються.

## Open Questions

Немає. Продуктові рішення затверджені в explore / `handoff.md`.
