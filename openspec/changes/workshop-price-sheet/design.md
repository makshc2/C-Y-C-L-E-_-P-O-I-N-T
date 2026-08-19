## Context

`/workshop` (`src/pages/WorkshopPage.vue`) показує статичний копі-блок з `src/content/workshop.ts`: заголовок «Послуги майстерні», Instagram, intro, booking-нота і placeholder `excelNote: 'ексель та опис'`. На desktop секція має `height: var(--section-h-home)` = `480px`; таблиця ~99 рядків туди не вміщається. На ширині ≤1727px висота вже `auto`.

Єдиний iframe у проєкті — `src/components/home/HomeMap.vue`: абсолютний Google `src`, `loading="lazy"`, `referrerpolicy="no-referrer-when-downgrade"`, `allowfullscreen`, `title` українською, без `sandbox`. Hash-router і Vite `base` `/C-Y-C-L-E-_-P-O-I-N-T/` — зовнішній `src` лишається абсолютним, як у мапи. CSP у `index.html` немає. Axios/Pinia немає; fetch лише в `src/services/raceArchiveApi.ts`.

Прейскурант живе в Google Таблиці `14uzzfjP3ak0qjtX2TAON8NrpXWkyL67amTsg15BW6Gc`, вкладка «Прайс» (`gid=0`). Figma немає (`Design: none`).

Стек apply: Vue 3 `<script setup lang="ts">`, Composition API, Quasar уже в застосунку, без коментарів у коді, без Options API, без Pinia, без Axios.

## Goals / Non-Goals

**Goals:**

- Показати live прейскурант на `/workshop` через read-only iframe Google Sheets.
- Прибрати текст «ексель та опис».
- Зберегти heading, Instagram (`rel="noopener noreferrer"`), intro, booking-ноту і зелене тло.
- Дати секції рости вниз; таблиця на повну ширину під копі.
- `src` iframe — preview або published HTML з `gid=0`, ніколи `/edit`.

**Non-Goals:**

- Редагування таблиці зі сайту, Google Sheets API, API keys, OAuth, Hydra.
- Axios, Pinia, парсинг CSV, хардкод рядків прайса в `src/`.
- Форма запису, зміни інших маркетингових сторінок, нові hover/кольори.

## Decisions

**D1: Константа preview-URL у `src/constants/site.ts`**

Експортувати рядок (або функцію-геттер поруч із `getVenueEmbedSrc`) зі значенням:

`https://docs.google.com/spreadsheets/d/14uzzfjP3ak0qjtX2TAON8NrpXWkyL67amTsg15BW6Gc/preview?gid=0&rm=minimal`

Не класти `/edit`-URL у `src/`. Не дублювати ID таблиці в кількох файлах.

Альтернатива (`src/content/workshop.ts`): гірше — це копі, а не зовнішній ресурс, як `INSTAGRAM_URL` і мапа.

**D2: iframe у `WorkshopPage.vue`, патерн HomeMap**

Після booking-ноти, на повну ширину секції. Атрибути як у `HomeMap.vue`: `loading="lazy"`, `referrerpolicy="no-referrer-when-downgrade"`, `allowfullscreen`, `border: 0`. `sandbox` не ставити (preview Google потребує скриптів). `title` українською, наприклад «Прейскурант послуг майстерні Cycle Point». Окремий компонент не обов’язковий — один iframe на одній сторінці.

Альтернатива (окремий `WorkshopPriceSheet.vue`): зайва абстракція для одного використання.

**D3: Ріст сторінки, скрол у iframe за потреби**

У `.workshop` на desktop замінити `height: var(--section-h-home)` на `height: auto` і `min-height: var(--section-h-home)`, щоб коротка копі не стискала зелену смугу, а довгий прейскурант не обрізався 480px. Обгортка iframe: `width: 100%`, явна висота достатня для перегляду (наприклад `min-height: 70vh`); якщо HTML таблиці вищий — внутрішній скрол iframe. Padding, типографіка копі, `--color-green` не міняти. Hover і нові кольори не вигадувати.

Альтернатива (залишити 480px + лише внутрішній скрол): суперечить brief — таблиця «не лізе», сторінка має рости.

**D4: Прибрати `excelNote`**

Видалити поле з `src/content/workshop.ts` і відповідний `<p>` у `WorkshopPage.vue`. Не лишати порожній рядок-заглушку.

**D5: Share Viewer; fallback published HTML**

Операційно таблиця лишається «будь-хто з посиланням» = Viewer. Якщо Google блокує preview у iframe (`X-Frame-Options` / CSP), замінити константу на published HTML тієї ж вкладки (`gid=0`, не `/edit`). Publish to web робить власник таблиці; у коді лише дозволений `src`.

Альтернатива (Sheets API + Axios): non-goal, ключі й парсинг.

**D6: Без рядків прайса в коді**

Каталог послуг не дублювати в TypeScript. Єдина правда — Google Таблиця.

## Risks / Trade-offs

- [Google блокує preview у iframe] → Перемкнути константу на published HTML (`gid=0`); Share лишається Viewer.
- [Власник відкриє таблицю на Editor] → Поза кодом; у `src` ніколи не ставити `/edit`. Відвідувач не повинен бачити Google edit UI.
- [~99 рядків vs фіксована висота iframe] → Секція `height: auto`; iframe з `min-height` і власним скролом.
- [Зовнішній контент недоступний офлайн / мережевий збій] → Прийнятно, як у мапи; локальний каталог не вигадувати.

## Migration Plan

- Деплой як звичайний фронт (GitHub Pages). Міграції даних немає.
- Rollback: відкотити `src/constants/site.ts`, `src/content/workshop.ts`, `src/pages/WorkshopPage.vue`.
- Перед merge: `npm run typecheck` і `npm run build`.

## Open Questions

Немає. Fallback preview → published HTML зафіксовано в D5.
