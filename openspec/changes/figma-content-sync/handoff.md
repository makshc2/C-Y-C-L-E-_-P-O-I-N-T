# Session Handoff

## Closed role
Design Intake — ізольований `design-intake` записав `design-brief.md` і PNG dump; conductor перевірив файли на диску

## Change
- name: figma-content-sync
- status: spec-approved
- tasks: 0/19
- review: APPROVE
- last_role: design-intake

## Done
Design intake for change: **figma-content-sync**. Conductor не захоплював Figma сам.

Restore: `npx agent-orchestrator-kit status` + `handoff figma-content-sync --restore` → exit 0. Memory JSON порожній; брифінг з `handoff.md` + `decisions.md`. `session-handoff` restore не спавнився (CLI повний).

Tier 2: [design-intake](7d059296-3a1a-46f5-a8b6-34bc1c484c4d) Status: done. One-pass Figma MCP `fileKey` `5SDp4Vg9fHdWGWaOJAhxZ3` (2026-09-02).

Файли (перевірено conductor): `design-brief.md` існує; 17 валідних PNG (`\x89PNG`), ненульові, унікальні SHA-256.

**Apply dest (12)** — копіювати `assets/<name>` → `src/assets/site/<name>`:
- `army-thumb.png` (`303:5`, 175×235)
- `fishky-velodorizhky-photo.png` (`260:78`, 516×682)
- `artifact-01-crest.png` (`293:7`)
- `artifact-02-colossi.png` (`295:9`)
- `artifact-03-colnago.png` (`293:6`)
- `artifact-04-harry-hall.png` (`295:8`)
- `artifact-05-danylo.png` (`295:15`)
- `artifact-06-kokkedal.png` (`295:14`)
- `artifact-07-bag.png` (`289:132`)
- `artifact-08-gemu.png` (`288:126`, 401×392)
- `artifact-09-helmets.png` (`288:131`)
- `artifact-10-lucas.png` (`293:4`)

**QA-скріни (5)** — не класти в `src/`: `events-page.png`, `projects-list.png`, `army-detail.png`, `fishky-detail.png`, `workshop-page.png`.

`require_spec_review: true` уже задоволено (`review.md` Verdict: APPROVE). `require_design_brief` був false; бриф тепер є — apply читає його, live Figma MCP заборонений.

Memory MCP tools у цій сесії недоступні — CLI persist має upsert абсолютним шляхом.

## Decisions
- PNG dump: 12 іменованих кропів з указаних node id + 5 QA-скрінів екранів; apply копіює лише 12
- Lime back-лінк: Figma `299:63` = `rgba(30,30,30,0.4)`; apply лишає spec `#1e1e1e` / `var(--color-fg)`
- `artifact-06-kokkedal.png`: шар `295:14` (IMG_3978 у ряду Kokkedal), у кадрі Ridley — не підбирати інший node
- `artifact-10-lucas.png`: `293:4` «IMG_3973 2», унікальні байти vs `artifact-09`

## Blocked
none для PNG. Дві активні зміни при `max_active_changes: 1` (`responsive-marketing-layout` + ця) — свідомо. `openspec/config.yaml` YAMLParseError на рядку контракту тасків (поза скоупом).

## Next command
`/opsx:apply figma-content-sync`

## Next role
Implementer (parent-driven apply)

## Attach
- `openspec/changes/figma-content-sync/design-brief.md`
- `openspec/changes/figma-content-sync/assets/`
- `openspec/changes/figma-content-sync/apply-notes.md`
- `openspec/changes/figma-content-sync/review.md`
- `openspec/changes/figma-content-sync/proposal.md`
- `openspec/changes/figma-content-sync/design.md`
- `openspec/changes/figma-content-sync/tasks.md`
- `openspec/changes/figma-content-sync/specs/events/spec.md`
- `openspec/changes/figma-content-sync/specs/site-chrome/spec.md`
- `openspec/changes/figma-content-sync/specs/projects/spec.md`
- `openspec/changes/figma-content-sync/specs/workshop/spec.md`
- `openspec/changes/figma-content-sync/specs/artifacts/spec.md`

## Subagents to spawn
- `design-implementer` — обов’язковий на apply: є `design-brief.md` + PNG (Amp: isolated `subagent-design-implementer`)
- `code-writer` / `test-writer` — optional (≥ 2 незалежні таски або явний запит)
- `code-reviewer` — optional перед PR
- `session-handoff` — restore at start, persist at exit (Amp: isolated `subagent-session-handoff`) — fallback only

## Constraints
- language: uk
- do not mix phases
- apply is parent-driven from `tasks.md` + `apply-notes.md` + `design-brief.md`
- require_spec_review: true — Verdict APPROVE уже в `review.md`
- apply не викликає live Figma MCP
- копіювати PNG лише з `openspec/changes/figma-content-sync/assets/` (імена = `src/assets/site/`)
- QA-скріни (`events-page.png` тощо) у `src/` не класти
- не комітити `openspec/changes/responsive-marketing-layout/` у цій зміні
- не відкочувати layout CSS (`1727px` / `@media (max-width: 1279px)` / `767px`)
- Vue 3 `<script setup lang="ts">` + Quasar, без Pinia/Axios/Options API
- Done-when 4.2: керуватися Do (`SiteBackLink` → `/projects`); CTA GS на app лишити
- status: spec-approved
- tasks: 0/19
- review: APPROVE

## Runtime
- runtime: local
- agent_id: none

## Metrics
- platform: cursor
- model: cursor-grok-4.6-xhigh-fast
- input_tokens: unknown
- output_tokens: unknown
- cost_usd: unknown
- amp_credits: unknown
- spend_source: unknown

## Prompt

```text
/opsx:apply figma-content-sync

Ти — conductor наступної рольової сесії для зміни `figma-content-sync`.
Мова відповіді: українська (`project.agent_language: uk`).
НЕ змішуй фази. НЕ починай наступну роль у цьому ж чаті, доки ця фаза не закрита за HARD STOP.

## Хто ти і що робити
- Команда цієї сесії: `/opsx:apply figma-content-sync`
- Наступна роль / субагент фази: `design-implementer`
- Amp: заспавни isolated skill `subagent-design-implementer` зі свіжим контекстом. Виконувати тіло спеціаліста в головному треді Amp — порушення протоколу.
- Cursor / Claude: заспавни `.cursor/agents/design-implementer.md` / `.claude/agents/design-implementer.md`.
- Батьківська сесія — лише conductor: перевіряє звіт, не виконує роботу спеціаліста.

## Обов'язковий старт (до будь-якої роботи спеціаліста)
1. Виконай pasted-команду `/opsx:apply figma-content-sync` і оголоси роль.
2. `npx agent-orchestrator-kit status`
3. `npx agent-orchestrator-kit handoff figma-content-sync --restore`
4. Прочитай Memory MCP: `Change:figma-content-sync`, `Handoff:figma-content-sync`, `Decision:*`.
5. Якщо Memory порожнє або MCP недоступний — прочитай `openspec/changes/figma-content-sync/handoff.md`. Відсутність Memory НЕ блокує сесію, коли є файл.
6. Заспавни `session-handoff` у режимі restore, якщо брифінг неповний (Amp: isolated `subagent-session-handoff`).
7. Лише після цього заспавни субагента фази. Free-form «продовжуй» / «далі» при одній активній зміні = `Handoff.next_command`.

## Повний контекст попередньої сесії (самодостатній — не покладайся лише на Memory)
- Закрита роль: Design Intake — ізольований `design-intake` записав `design-brief.md` і PNG dump; conductor перевірив файли на диску
- Зміна: - name: figma-content-sync
- status: spec-approved
- tasks: 0/19
- review: APPROVE
- last_role: design-intake
- Зроблено:
Design intake for change: **figma-content-sync**. Conductor не захоплював Figma сам.

Restore: `npx agent-orchestrator-kit status` + `handoff figma-content-sync --restore` → exit 0. Memory JSON порожній; брифінг з `handoff.md` + `decisions.md`. `session-handoff` restore не спавнився (CLI повний).

Tier 2: [design-intake](7d059296-3a1a-46f5-a8b6-34bc1c484c4d) Status: done. One-pass Figma MCP `fileKey` `5SDp4Vg9fHdWGWaOJAhxZ3` (2026-09-02).

Файли (перевірено conductor): `design-brief.md` існує; 17 валідних PNG (`\x89PNG`), ненульові, унікальні SHA-256.

**Apply dest (12)** — копіювати `assets/<name>` → `src/assets/site/<name>`:
- `army-thumb.png` (`303:5`, 175×235)
- `fishky-velodorizhky-photo.png` (`260:78`, 516×682)
- `artifact-01-crest.png` (`293:7`)
- `artifact-02-colossi.png` (`295:9`)
- `artifact-03-colnago.png` (`293:6`)
- `artifact-04-harry-hall.png` (`295:8`)
- `artifact-05-danylo.png` (`295:15`)
- `artifact-06-kokkedal.png` (`295:14`)
- `artifact-07-bag.png` (`289:132`)
- `artifact-08-gemu.png` (`288:126`, 401×392)
- `artifact-09-helmets.png` (`288:131`)
- `artifact-10-lucas.png` (`293:4`)

**QA-скріни (5)** — не класти в `src/`: `events-page.png`, `projects-list.png`, `army-detail.png`, `fishky-detail.png`, `workshop-page.png`.

`require_spec_review: true` уже задоволено (`review.md` Verdict: APPROVE). `require_design_brief` був false; бриф тепер є — apply читає його, live Figma MCP заборонений.

Memory MCP tools у цій сесії недоступні — CLI persist має upsert абсолютним шляхом.
- Рішення:
- PNG dump: 12 іменованих кропів з указаних node id + 5 QA-скрінів екранів; apply копіює лише 12
- Lime back-лінк: Figma `299:63` = `rgba(30,30,30,0.4)`; apply лишає spec `#1e1e1e` / `var(--color-fg)`
- `artifact-06-kokkedal.png`: шар `295:14` (IMG_3978 у ряду Kokkedal), у кадрі Ridley — не підбирати інший node
- `artifact-10-lucas.png`: `293:4` «IMG_3973 2», унікальні байти vs `artifact-09`
- Блокери:
none для PNG. Дві активні зміни при `max_active_changes: 1` (`responsive-marketing-layout` + ця) — свідомо. `openspec/config.yaml` YAMLParseError на рядку контракту тасків (поза скоупом).
- Attach:
- `openspec/changes/figma-content-sync/design-brief.md`
- `openspec/changes/figma-content-sync/assets/`
- `openspec/changes/figma-content-sync/apply-notes.md`
- `openspec/changes/figma-content-sync/review.md`
- `openspec/changes/figma-content-sync/proposal.md`
- `openspec/changes/figma-content-sync/design.md`
- `openspec/changes/figma-content-sync/tasks.md`
- `openspec/changes/figma-content-sync/specs/events/spec.md`
- `openspec/changes/figma-content-sync/specs/site-chrome/spec.md`
- `openspec/changes/figma-content-sync/specs/projects/spec.md`
- `openspec/changes/figma-content-sync/specs/workshop/spec.md`
- `openspec/changes/figma-content-sync/specs/artifacts/spec.md`
- Субагенти цієї сесії:
- `design-implementer` — обов’язковий на apply: є `design-brief.md` + PNG (Amp: isolated `subagent-design-implementer`)
- `code-writer` / `test-writer` — optional (≥ 2 незалежні таски або явний запит)
- `code-reviewer` — optional перед PR
- `session-handoff` — restore at start, persist at exit (Amp: isolated `subagent-session-handoff`) — fallback only
- Обмеження:
- language: uk
- do not mix phases
- apply is parent-driven from `tasks.md` + `apply-notes.md` + `design-brief.md`
- require_spec_review: true — Verdict APPROVE уже в `review.md`
- apply не викликає live Figma MCP
- копіювати PNG лише з `openspec/changes/figma-content-sync/assets/` (імена = `src/assets/site/`)
- QA-скріни (`events-page.png` тощо) у `src/` не класти
- не комітити `openspec/changes/responsive-marketing-layout/` у цій зміні
- не відкочувати layout CSS (`1727px` / `@media (max-width: 1279px)` / `767px`)
- Vue 3 `<script setup lang="ts">` + Quasar, без Pinia/Axios/Options API
- Done-when 4.2: керуватися Do (`SiteBackLink` → `/projects`); CTA GS на app лишити
- status: spec-approved
- tasks: 0/19
- review: APPROVE
- status: spec-approved
- tasks: 0/19
- review: APPROVE

## HARD STOP на виході (ти НЕ закінчив, поки це не виконано)
1. Заспавни `session-handoff` у режимі persist (Amp: isolated `subagent-session-handoff`). Якщо spawn недоступний — зроби persist сам, ніколи не пропускай.
2. Запиши `openspec/changes/figma-content-sync/handoff.md` з усіма секціями шаблону.
3. `npx agent-orchestrator-kit handoff figma-content-sync` — exit 0 обов'язковий. CLI записує Memory JSON абсолютним шляхом і друкує розширений промпт у stdout.
4. Якщо Memory MCP живий — онови `Change:figma-content-sync`, `Handoff:figma-content-sync`, `Decision:*` відповідно до файлу.
5. Встав stdout CLI у чат одним fenced-блоком. Не скорочуй. Без службового ярлика. Перший рядок — `/opsx:…`.
6. Зупинись. Наступна роль починається в НОВОМУ чаті з цим промптом.

OpenSpec-файли — source of truth для вимог і тасків. Memory і handoff.md — індекс фази. Цей промпт — повний операційний бриф наступного треду, навіть якщо Amp проігнорує Memory MCP.
```
