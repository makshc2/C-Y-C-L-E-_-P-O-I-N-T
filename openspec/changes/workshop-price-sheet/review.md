# Spec Review

**Change:** workshop-price-sheet
**Date:** 2026-08-19
**Verdict:** APPROVE

## Checklist summary
- Proposal ↔ design ↔ tasks: ✓
- Конфлікти з `openspec/specs/`: ✓ (навмисна заміна вимоги placeholder)
- Scope vs Non-goals: ✓
- Самодостатність тасків: ✓ (зауваження не блокують)
- Шляхи в репозиторії: ✓ (`WorkshopPage.vue`, `workshop.ts`, `site.ts`, `HomeMap.vue`)

## Findings (за серйозністю)

### Blockers
Немає.

### Medium (не блокують apply)
Немає.

### Low

1. **Fallback published HTML без готового URL.** Таск 1.1 каже замінити preview на published HTML, якщо Google блокує кадр. Точний published-`src` у артефактах немає (його дає Publish to web). Стартувати з указаного preview-URL; fallback лише якщо кадр порожній / X-Frame-Options. Не підставляти `/edit`.

2. **Обгортка iframe vs дослівне копіювання `HomeMap`.** `HomeMap.vue` має `height: 100%`, `min-height: 240px` і бежевий фон батька з відомою висотою. У `.workshop` після `height: auto` копіювати `height: 100%` батька не треба: обгортка `width: 100%` + `min-height: 70vh`, iframe `border: 0` на всю обгортку (relative + absolute `inset: 0`, як у мапи). Без явної висоти iframe звалиться до ~150px.

3. **Поле `excelNote` у двох файлах.** Таск 2.1 прибирає рендер, 3.1 — поле. Робити по порядку 1.1 → 2.1 → 3.1, інакше typecheck впаде на `workshopCopy.excelNote`.

## Consistency
- Intent однаковий: live прейскурант `14uzzfjP3ak0qjtX2TAON8NrpXWkyL67amTsg15BW6Gc`, `gid=0`, preview `.../preview?gid=0&rm=minimal`, ніколи `/edit`; Instagram, heading, intro, booking-нота лишаються; без Axios/Pinia/Sheets API; Design: none.
- Proposal «константа в `site.ts` (або контенті)» звужено design D1 і таском 1.1 до `WORKSHOP_PRICE_SHEET_SRC` у `src/constants/site.ts` — не drift, а рішення.
- Delta `workshop` коректно знімає сценарій «placeholder ексель лишається» і заборону «таблиці послуг» (вигаданої в коді); ADDED embed + ріст секції не суперечать `site-chrome` (заголовок «Майстерня» в хедері) чи `home-page`.
- Non-goals не розширені: немає форми запису, хардкоду рядків прайса, інших маркетингових сторінок, нових hover/кольорів.
- Репозиторій збігається з артефактами: `excelNote: 'ексель та опис'`, desktop `.workshop { height: var(--section-h-home) }`, ≤1727px уже `height: auto`. Патерн iframe у `HomeMap.vue` існує.

## Notes
Заголовок секції «Майстерня» — site chrome, не `h1` сторінки. `src/layouts/GsAppLayout.vue` і роутер не в scope. Див. `apply-notes.md`.
