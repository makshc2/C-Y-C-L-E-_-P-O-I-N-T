# Session Handoff

## Closed role
Implementer (`/opsx:apply`) — 4/4 tasks complete; `npm run typecheck` exit 0; `npm run build` exit 0

## Change
- name: workshop-price-sheet
- status: applying
- tasks: 4/4
- review: APPROVE
- last_role: implementer

## Done
Apply parent-driven (не `design-implementer`: Design: none, `brief: no`). Restore CLI exit 0; Memory MCP недоступний; `session-handoff` restore не спавнився.

Реалізовано 1.1 → 2.1 → 3.1 → 4.1:

- `src/constants/site.ts` — експорт `WORKSHOP_PRICE_SHEET_SRC` = preview `https://docs.google.com/spreadsheets/d/14uzzfjP3ak0qjtX2TAON8NrpXWkyL67amTsg15BW6Gc/preview?gid=0&rm=minimal`. Немає `/edit`. Fallback published HTML не вмикався (кадр не перевірявся в браузері; стартували з preview за apply-notes).
- `src/pages/WorkshopPage.vue` — прибрано `workshopCopy.excelNote`; після booking-ноти iframe з константою, `title="Прейскурант послуг майстерні Cycle Point"`, `loading="lazy"`, `referrerpolicy="no-referrer-when-downgrade"`, `allowfullscreen`, без `sandbox`. Обгортка `.workshop__sheet`: `width: 100%`, `min-height: 70vh`, relative; iframe absolute inset, `border: 0`. `.workshop`: `height: auto; min-height: var(--section-h-home)`. Heading, Instagram, intro, booking-нота, `--color-green` без змін. Не скопійовано з HomeMap `height: 100%` секції, `min-height: 240px`, бежевий фон.
- `src/content/workshop.ts` — поле `excelNote` і рядок «ексель та опис» видалені.
- `npm run typecheck` — exit 0; `npm run build` — exit 0 (vite 7.1.12, ~2.16s). `npx agent-orchestrator-kit gate-check workshop-price-sheet` — review gate passed. `npx agent-orchestrator-kit status` — 4/4, APPROVE, ready to archive.

НЕ чіпали: `GsAppLayout.vue` (лишився dirty поза scope — не комітити з цією зміною), роутер, `HomeMap.vue`, інші маркетингові сторінки, `server/`, тахометр, архів. Без Axios/Pinia/Sheets API. Коміт і PR у цій сесії не робили.

## Decisions
- iframe preview / published HTML, не `/edit` — відвідувач без Google edit UI
- константа `WORKSHOP_PRICE_SHEET_SRC` у `src/constants/site.ts` — preview `gid=0&rm=minimal`; fallback published HTML лише якщо кадр порожній
- сторінка росте вниз (`height: auto` + `min-height: var(--section-h-home)`), не фіксовані 480px
- iframe-патерн як HomeMap (absolute inset, без sandbox), без копіювання висоти/фону мапи
- без хардкоду рядків прайса, без Axios/Pinia
- Design: none (немає Figma) — apply parent-driven, `design-implementer` не спавнився
- Verdict: APPROVE — артефакти узгоджені, таски самодостатні, шляхи існують

## Blocked
none

## Next command
`/opsx:archive workshop-price-sheet`

## Next role
Archiver (CLI `npx agent-orchestrator-kit archive workshop-price-sheet [--sync]` — після merge + CI green; фазовий субагент заборонений)

## Attach
- `openspec/changes/workshop-price-sheet/proposal.md`
- `openspec/changes/workshop-price-sheet/design.md`
- `openspec/changes/workshop-price-sheet/specs/workshop/spec.md`
- `openspec/changes/workshop-price-sheet/tasks.md`
- `openspec/changes/workshop-price-sheet/review.md`
- `openspec/changes/workshop-price-sheet/apply-notes.md`
- `src/constants/site.ts`
- `src/pages/WorkshopPage.vue`
- `src/content/workshop.ts`

## Subagents to spawn
- archive — CLI only; `spec-archiver` лише якщо `npx agent-orchestrator-kit archive` недоступний
- `session-handoff` — restore at start only if CLI restore failed
- `design-implementer` / `code-writer` / `test-writer` / `code-reviewer` — не потрібні (apply закрито, 4/4)

## Constraints
- language: uk
- do not mix phases
- do not start archive in the apply chat
- archive after PR merge + CI green
- НЕ чіпати dirty `GsAppLayout.vue` у коміті цієї зміни
- require_spec_review: true — Verdict: APPROVE already in `review.md`

## Prompt

```text
/opsx:archive workshop-price-sheet

Ти — conductor наступної рольової сесії для зміни `workshop-price-sheet`.
Мова відповіді: українська (`project.agent_language: uk`).
НЕ змішуй фази. НЕ починай наступну роль у цьому ж чаті, доки ця фаза не закрита за HARD STOP.

## Хто ти і що робити
- Команда цієї сесії: `/opsx:archive workshop-price-sheet`
- Наступна роль / субагент фази: `spec-archiver`
- Amp: заспавни isolated skill `subagent-spec-archiver` зі свіжим контекстом. Виконувати тіло спеціаліста в головному треді Amp — порушення протоколу.
- Cursor / Claude: заспавни `.cursor/agents/spec-archiver.md` / `.claude/agents/spec-archiver.md`.
- Батьківська сесія — лише conductor: перевіряє звіт, не виконує роботу спеціаліста.

## Обов'язковий старт (до будь-якої роботи спеціаліста)
1. Виконай pasted-команду `/opsx:archive workshop-price-sheet` і оголоси роль.
2. `npx agent-orchestrator-kit status`
3. `npx agent-orchestrator-kit handoff workshop-price-sheet --restore`
4. Прочитай Memory MCP: `Change:workshop-price-sheet`, `Handoff:workshop-price-sheet`, `Decision:*`.
5. Якщо Memory порожнє або MCP недоступний — прочитай `openspec/changes/workshop-price-sheet/handoff.md`. Відсутність Memory НЕ блокує сесію, коли є файл.
6. Заспавни `session-handoff` у режимі restore, якщо брифінг неповний (Amp: isolated `subagent-session-handoff`).
7. Лише після цього заспавни субагента фази. Free-form «продовжуй» / «далі» при одній активній зміні = `Handoff.next_command`.

## Повний контекст попередньої сесії (самодостатній — не покладайся лише на Memory)
- Закрита роль: Implementer (`/opsx:apply`) — 4/4 tasks complete; `npm run typecheck` exit 0; `npm run build` exit 0
- Зміна: - name: workshop-price-sheet
- status: applying
- tasks: 4/4
- review: APPROVE
- last_role: implementer
- Зроблено:
Apply parent-driven (не `design-implementer`: Design: none, `brief: no`). Restore CLI exit 0; Memory MCP недоступний; `session-handoff` restore не спавнився.

Реалізовано 1.1 → 2.1 → 3.1 → 4.1:

- `src/constants/site.ts` — експорт `WORKSHOP_PRICE_SHEET_SRC` = preview `https://docs.google.com/spreadsheets/d/14uzzfjP3ak0qjtX2TAON8NrpXWkyL67amTsg15BW6Gc/preview?gid=0&rm=minimal`. Немає `/edit`. Fallback published HTML не вмикався (кадр не перевірявся в браузері; стартували з preview за apply-notes).
- `src/pages/WorkshopPage.vue` — прибрано `workshopCopy.excelNote`; після booking-ноти iframe з константою, `title="Прейскурант послуг майстерні Cycle Point"`, `loading="lazy"`, `referrerpolicy="no-referrer-when-downgrade"`, `allowfullscreen`, без `sandbox`. Обгортка `.workshop__sheet`: `width: 100%`, `min-height: 70vh`, relative; iframe absolute inset, `border: 0`. `.workshop`: `height: auto; min-height: var(--section-h-home)`. Heading, Instagram, intro, booking-нота, `--color-green` без змін. Не скопійовано з HomeMap `height: 100%` секції, `min-height: 240px`, бежевий фон.
- `src/content/workshop.ts` — поле `excelNote` і рядок «ексель та опис» видалені.
- `npm run typecheck` — exit 0; `npm run build` — exit 0 (vite 7.1.12, ~2.16s). `npx agent-orchestrator-kit gate-check workshop-price-sheet` — review gate passed. `npx agent-orchestrator-kit status` — 4/4, APPROVE, ready to archive.

НЕ чіпали: `GsAppLayout.vue` (лишився dirty поза scope — не комітити з цією зміною), роутер, `HomeMap.vue`, інші маркетингові сторінки, `server/`, тахометр, архів. Без Axios/Pinia/Sheets API. Коміт і PR у цій сесії не робили.
- Рішення:
- iframe preview / published HTML, не `/edit` — відвідувач без Google edit UI
- константа `WORKSHOP_PRICE_SHEET_SRC` у `src/constants/site.ts` — preview `gid=0&rm=minimal`; fallback published HTML лише якщо кадр порожній
- сторінка росте вниз (`height: auto` + `min-height: var(--section-h-home)`), не фіксовані 480px
- iframe-патерн як HomeMap (absolute inset, без sandbox), без копіювання висоти/фону мапи
- без хардкоду рядків прайса, без Axios/Pinia
- Design: none (немає Figma) — apply parent-driven, `design-implementer` не спавнився
- Verdict: APPROVE — артефакти узгоджені, таски самодостатні, шляхи існують
- Блокери:
none
- Attach:
- `openspec/changes/workshop-price-sheet/proposal.md`
- `openspec/changes/workshop-price-sheet/design.md`
- `openspec/changes/workshop-price-sheet/specs/workshop/spec.md`
- `openspec/changes/workshop-price-sheet/tasks.md`
- `openspec/changes/workshop-price-sheet/review.md`
- `openspec/changes/workshop-price-sheet/apply-notes.md`
- `src/constants/site.ts`
- `src/pages/WorkshopPage.vue`
- `src/content/workshop.ts`
- Субагенти цієї сесії:
- archive — CLI only; `spec-archiver` лише якщо `npx agent-orchestrator-kit archive` недоступний
- `session-handoff` — restore at start only if CLI restore failed
- `design-implementer` / `code-writer` / `test-writer` / `code-reviewer` — не потрібні (apply закрито, 4/4)
- Обмеження:
- language: uk
- do not mix phases
- do not start archive in the apply chat
- archive after PR merge + CI green
- НЕ чіпати dirty `GsAppLayout.vue` у коміті цієї зміни
- require_spec_review: true — Verdict: APPROVE already in `review.md`
- status: spec-approved
- tasks: 4/4
- review: APPROVE

## HARD STOP на виході (ти НЕ закінчив, поки це не виконано)
1. Заспавни `session-handoff` у режимі persist (Amp: isolated `subagent-session-handoff`). Якщо spawn недоступний — зроби persist сам, ніколи не пропускай.
2. Запиши `openspec/changes/workshop-price-sheet/handoff.md` з усіма секціями шаблону.
3. `npx agent-orchestrator-kit handoff workshop-price-sheet` — exit 0 обов'язковий. CLI записує Memory JSON абсолютним шляхом і друкує розширений промпт у stdout.
4. Якщо Memory MCP живий — онови `Change:workshop-price-sheet`, `Handoff:workshop-price-sheet`, `Decision:*` відповідно до файлу.
5. Встав stdout CLI у чат одним fenced-блоком. Не скорочуй. Без службового ярлика. Перший рядок — `/opsx:…`.
6. Зупинись. Наступна роль починається в НОВОМУ чаті з цим промптом.

OpenSpec-файли — source of truth для вимог і тасків. Memory і handoff.md — індекс фази. Цей промпт — повний операційний бриф наступного треду, навіть якщо Amp проігнорує Memory MCP.
```
