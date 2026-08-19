# Spec Review

**Change:** cyclepoint-site
**Date:** 2026-08-19
**Verdict:** APPROVE

## Checklist summary
- Proposal ↔ design ↔ tasks: ✓
- Конфлікти з `openspec/specs/`: ✓ (немає)
- Scope vs Non-goals: ✓
- Самодостатність тасків: ✓ (зауваження не блокують)
- Delta specs: ✓ (Tier 1 вже пройшов)

## Findings (за серйозністю)

### Blockers
Немає.

### Medium (не блокують apply)

1. **© футера: проводка не в Files пізніших тасків.** Таск 3.6 задає проп `showCopyrightSymbol` і мапу (головна + charity — з ©; GS / army / workshop / artifacts — без). Таск 3.7 кладе `SiteFooter` у `SiteLayout` без згадки пропа. `/projects` і `/rental` у brief не марковані. Реалізація: мапа в `SiteLayout` за маршрутом; true лише `/` і `/charity`; решта false.

2. **Іконка Instagram у контактах.** Таск 5.4 каже «іконка 50×50 без текстового URL», але не «лінк». Спека `home-page` вимагає той самий `INSTAGRAM_URL` з `rel="noopener noreferrer"`. Не виводити голий `<img>`.

3. **Подвійний `router-view`.** 4.1 переносить `q-layout` у `GsAppLayout`; 4.3 каже обгортати `<router-view />` лейаутом. Лейаути — slot, не внутрішній `<router-view>`. Оновити `isActive` з `/` і `/archive` на нові app-шляхи.

### Low

4. **Попередження Tier 1 (`new file:`).** Шляхи на кшталт `src/constants/site.ts`, `src/content/*.ts`, сторінок у 8.1 створюються раніше (2.1, 2.2, 3.7, 5–7) і далі лише змінюються. Режим `warn` — не матеріальне вгадування.

5. **`--font-sans`.** Таск 1.2 / D4: `"Helvetica Neue", Helvetica, Arial, sans-serif` (як Implementation notes brief). Таблиця Typography brief ставить Helvetica першою — ігнорувати, брати таск 1.2.

6. **Інвентар brief vs D5.** Рядок капсули Події згадує reset `145:63`; Open questions + D5 + таск 5.1: mouseleave Подій → default `121:55`. Правило тасків.

7. **Delta `race-session` / `race-archive` як ADDED.** Чинні main specs URL не фіксують; нові вимоги шляхів не суперечать BLE/persist/`races_db_v1`. Proposal «Modified» — продуктові можливості, не формат секції.

## Consistency
- ІА, hash-router, `base` `/C-Y-C-L-E-_-P-O-I-N-T/`, BREAKING `#/` = головна, редірект `/archive` — однакові в proposal, design D2, specs, tasks 4.2.
- Події = Instagram, army порожня, CTA GS → app `#e7fc84`, два chrome `site`|`app`, без «назад на сайт», копі з brief, ассети в `src/assets/site/` — без drift.
- Non-goals не розширені (немає ENG, CMS, бронювання, live Figma, унікальних фото артефактів, вигаданого hover nav).
- Репозиторій: `src/router/index.ts` зараз `/` → Tachometer, `/archive` → архів; `App.vue` — Quasar toolbar і відсутній `@/assets/img/cycle_point.jpg`. Артефакти це враховують.

## Notes
Піксельне джерело apply — `design-brief.md` + `assets/`, не live Figma. Див. `apply-notes.md`.
