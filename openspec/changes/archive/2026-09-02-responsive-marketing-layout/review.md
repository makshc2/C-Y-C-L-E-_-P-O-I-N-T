# Spec Review

**Change:** responsive-marketing-layout
**Date:** 2026-08-19
**Verdict:** APPROVE

## Checklist summary
- Proposal ↔ design ↔ tasks: ✓
- Конфлікти з `openspec/specs/`: ✓ (навмисні MODIFIED: брейкпоінти, Події → `/events`, капсули, hover плиток)
- Scope vs Non-goals: ✓
- Самодостатність тасків: ✓ (зауваження не блокують; див. apply-notes)
- Шляхи в репозиторії: ✓ (усі Files з `tasks.md` існують; `/events` уже в `src/router/index.ts`)

## Findings (за серйозністю)

### Blockers
Немає.

### Medium (не блокують apply)

1. **Абсолютний лейаут головної на 1280–1727.** Таск 3.1 забороняє літерал `1727px` і каже зібрати intro/community/contacts як flex/grid. Таск 4.2 переносить `position: relative` + колонку `HomeServiceTile` лише на `max-width: 767px`. Сліпе «замінити 1727→767» лишить `left: 1190px` / `position: absolute` на малому ноутбуці й зламає стиснутий склад. Правило apply: на ≥1728 можна лишити absolute (`min-width: 1728px`); на 1280–1727 регіони й плитки — у потоці (flex/grid ряд, не phone-стек). Не `transform: scale()`.

2. **`--gutter: 149px` не в Files.** D2 дозволяє `clamp` замість фіксованих 149px, якщо рядок не вміщається. Окремої таски немає. Робити лише там, де інакше ламається бічний склад; не вигадувати новий ритм відступів.

### Low

3. **`SiteNav.vue` має `@media (max-width: 1727px)` (gap), а таск 1.1 змінює лише лінки.** D3 вимагає прибрати маркетингові `1727px`. Разом із 2.3 перенести gap-медіа нав на `max-width: 1279px`.

4. **Робоче дерево поза 1.x.** У working tree є `SitePagePreloader.vue`, `useEmbedReady.ts`, правки `src/content/home.ts`. Не в скоупі. Таск 5.5 на `EventsPage`/`WorkshopPage` — лише padding `1727`→`1279`; не зрізати вже підключений preloader і не комітити сторонні файли.

5. **Архівний design-brief (Події = Instagram, hover 40px / 112px) — історичний.** Delta свідомо синхронізує продукт: `/events`, пігулка 440×120, без default-блюру. Не повертати Instagram у нав/капсулу.

## Consistency
- Брейкпоінти ≥1280 / 768–1279 / <768, 1728 exact, без page-scale — однакові в proposal, D1–D3, delta `site-chrome`/`home-page`, тасках 2–5.
- Хедер без Прокат/Артефактів; Події й капсула → існуючий `/events`; капсули однакові; hover кільця лише на `.tile`; danish PNG без білого прямокутника; app-chrome поза зміною — без drift.
- Non-goals не розширені: немає нових сторінок/Figma-фреймів, i18n ENG, pixel-QA 1366, hover нав/Благодійність, `GsAppLayout`.
- Delta `Hash-router` додає `/events` до списку слагів і забороняє нові маршрути — не суперечить workshop/rental/artifacts/projects/charity.
- `Design: none` узгоджується з `require_design_brief: false`; `design.md` — технічні D1–D8, не новий brief.
- `openspec/config.yaml` YAMLParseError у `rules.tasks` — поза скоупом.

## Notes
Apply — звірка 1.x, далі медіа та hover плиток. Див. `apply-notes.md`.
