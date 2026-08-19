# Session Handoff

## Closed role
Spec Reviewer — Tier 1 `gate-check --review` зелений; Tier 2 `spec-reviewer` записав `review.md` (Verdict: APPROVE) і `apply-notes.md`; apply не стартував

## Change
- name: responsive-marketing-layout
- status: spec-approved
- tasks: 0/22
- review: APPROVE
- last_role: spec-reviewer

## Done
Review закрито. Conductor не писав вердикт.

Tier 1: `npx agent-orchestrator-kit gate-check --review responsive-marketing-layout` → exit 0 («proceed to spec-reviewer»).

Tier 2: ізольований `spec-reviewer` прочитав proposal/design/delta specs/tasks, main specs `site-chrome` і `home-page`, архівний design-brief, шляхи Files. Вердикт **APPROVE**. Blockers немає.

Записано:
- `openspec/changes/responsive-marketing-layout/review.md` — Verdict: APPROVE; proposal ↔ design ↔ tasks узгоджені; Non-goals не розширені; шляхи існують; `/events` уже в роутері
- `openspec/changes/responsive-marketing-layout/apply-notes.md` — брейкпоінти, absolute vs flex на 1280–1727, що не чіпати, команди typecheck/build

Неблокуючі findings (обов’язкові для apply, не для re-review):
1. На 1280–1727 не лишати `left: 1190px` / absolute; ≥1728 pixel-perfect через `min-width: 1728px` ок; плитки в потоці; колонка трьох лише <768
2. `--gutter: 149px` → `clamp` лише якщо рядок не вміщається
3. `SiteNav` gap `1727px` → `1279px` разом із хедером (таск 1.1 міняє лінки; D3 вимагає прибрати маркетингові 1727px)
4. Working tree поза 1.x: `SitePagePreloader.vue`, `useEmbedReady.ts`, `src/content/home.ts` — не в скоупі, не комітити
5. Архівний design-brief (Instagram, hover 40px/112px) історичний — не повертати

Memory MCP недоступний у сесії; Memory JSON порожній на restore. Брифінг узято з `handoff.md`. `session-handoff` restore не спавнився (CLI restore exit 0 + файл повний).

## Decisions
- Адаптив: inferred-стек на око від 1728, не окремий мобільний макет
- Брейкпоінти: ≥1280 desktop (1728 exact; 1280–1727 стиснутий той самий склад); 768–1279 tablet 2-колонка дозволена; <768 phone-стек
- Не `transform: scale()` на сторінку — пропорційні ширини/gutter; `@media` літерали 1279px / 767px (custom properties у media ненадійні)
- Скоуп: лише SiteLayout / маркетингові сторінки; GsAppLayout / Tachometer / archive поза зміною
- Капсули: default без блюру; hover пігулка 440×120, текст нерухомий 36px; обидві капсули однакові
- Хедер: Контакти · Проєкти · Майстерня · Події · Благодійність · UA|ENG; без Прокат/Артефактів
- Події: пункт нав і капсула ведуть на вже існуючий `/events` (синхронізація spec із продуктом, не новий sitemap; старий main spec мав Instagram)
- Сервісні плитки: hover-кільце лише навколо кнопки, без стрибка іконки/підпису
- Danish logo: PNG без непрозорого білого прямокутника (Figma 121:85)
- Design: none (`require_design_brief: false`)
- Таски 1.x: звірити working tree, не переписувати з нуля
- Review: APPROVE — apply дозволено з `review.md` + `apply-notes.md`; не імпровізувати поза Files/Do/Done-when
- Головна 1280–1727: flex/grid у потоці, не absolute `left: 1190px`; стопка колонок лише `max-width: 767px`

## Blocked
none

## Next command
`/opsx:apply responsive-marketing-layout`

## Next role
Implementer (parent-driven з `tasks.md` + `apply-notes.md`; `design-implementer` не обов’язковий — Design: none)

## Attach
- `openspec/changes/responsive-marketing-layout/review.md`
- `openspec/changes/responsive-marketing-layout/apply-notes.md`
- `openspec/changes/responsive-marketing-layout/proposal.md`
- `openspec/changes/responsive-marketing-layout/design.md`
- `openspec/changes/responsive-marketing-layout/specs/site-chrome/spec.md`
- `openspec/changes/responsive-marketing-layout/specs/home-page/spec.md`
- `openspec/changes/responsive-marketing-layout/tasks.md`
- `openspec/specs/site-chrome/spec.md`
- `openspec/specs/home-page/spec.md`

## Subagents to spawn
- apply parent-driven — implement з `tasks.md` + `apply-notes.md`; субагенти optional (`code-writer` / `test-writer` при ≥2 незалежних тасках; `design-implementer` не потрібен)
- `code-reviewer` — після коду і тестів, перед PR/MR
- `session-handoff` — restore at start, persist at exit (Amp: isolated `subagent-session-handoff`) — fallback only

## Constraints
- language: uk
- do not mix phases
- require_spec_review: true — Verdict APPROVE уже є; не починати apply у review-чаті
- no src/ у review (закрито); apply пише `src/` за тасками
- one active change
- marketing only — не чіпати GsAppLayout / Tachometer / archive / BLE / `src/services/*` / `server/` / SitePagePreloader / useEmbedReady
- не комітити сторонні файли working tree поза 1.x
- не вигадувати новий sitemap
- 1728 pixel-perfect зберігається; 1280–1727 — гумова адаптація без `left: 1190px` і без `scale()`
- таски 1.x: звірка, не rewrite
- після apply: `npm run typecheck`, `npm run build`

## Prompt

```text
/opsx:apply responsive-marketing-layout

Ти — conductor наступної рольової сесії для зміни `responsive-marketing-layout`.
Мова відповіді: українська (`project.agent_language: uk`).
НЕ змішуй фази. НЕ починай наступну роль у цьому ж чаті, доки ця фаза не закрита за HARD STOP.

## Хто ти і що робити
- Команда цієї сесії: `/opsx:apply responsive-marketing-layout`
- Наступна роль / субагент фази: `code-writer`
- Amp: заспавни isolated skill `subagent-code-writer` зі свіжим контекстом. Виконувати тіло спеціаліста в головному треді Amp — порушення протоколу.
- Cursor / Claude: заспавни `.cursor/agents/code-writer.md` / `.claude/agents/code-writer.md`.
- Батьківська сесія — лише conductor: перевіряє звіт, не виконує роботу спеціаліста.

## Обов'язковий старт (до будь-якої роботи спеціаліста)
1. Виконай pasted-команду `/opsx:apply responsive-marketing-layout` і оголоси роль.
2. `npx agent-orchestrator-kit status`
3. `npx agent-orchestrator-kit handoff responsive-marketing-layout --restore`
4. Прочитай Memory MCP: `Change:responsive-marketing-layout`, `Handoff:responsive-marketing-layout`, `Decision:*`.
5. Якщо Memory порожнє або MCP недоступний — прочитай `openspec/changes/responsive-marketing-layout/handoff.md`. Відсутність Memory НЕ блокує сесію, коли є файл.
6. Заспавни `session-handoff` у режимі restore, якщо брифінг неповний (Amp: isolated `subagent-session-handoff`).
7. Лише після цього заспавни субагента фази. Free-form «продовжуй» / «далі» при одній активній зміні = `Handoff.next_command`.

## Повний контекст попередньої сесії (самодостатній — не покладайся лише на Memory)
- Закрита роль: Spec Reviewer — Tier 1 `gate-check --review` зелений; Tier 2 `spec-reviewer` записав `review.md` (Verdict: APPROVE) і `apply-notes.md`; apply не стартував
- Зміна: - name: responsive-marketing-layout
- status: spec-approved
- tasks: 0/22
- review: APPROVE
- last_role: spec-reviewer
- Зроблено:
Review закрито. Conductor не писав вердикт.

Tier 1: `npx agent-orchestrator-kit gate-check --review responsive-marketing-layout` → exit 0 («proceed to spec-reviewer»).

Tier 2: ізольований `spec-reviewer` прочитав proposal/design/delta specs/tasks, main specs `site-chrome` і `home-page`, архівний design-brief, шляхи Files. Вердикт **APPROVE**. Blockers немає.

Записано:
- `openspec/changes/responsive-marketing-layout/review.md` — Verdict: APPROVE; proposal ↔ design ↔ tasks узгоджені; Non-goals не розширені; шляхи існують; `/events` уже в роутері
- `openspec/changes/responsive-marketing-layout/apply-notes.md` — брейкпоінти, absolute vs flex на 1280–1727, що не чіпати, команди typecheck/build

Неблокуючі findings (обов’язкові для apply, не для re-review):
1. На 1280–1727 не лишати `left: 1190px` / absolute; ≥1728 pixel-perfect через `min-width: 1728px` ок; плитки в потоці; колонка трьох лише <768
2. `--gutter: 149px` → `clamp` лише якщо рядок не вміщається
3. `SiteNav` gap `1727px` → `1279px` разом із хедером (таск 1.1 міняє лінки; D3 вимагає прибрати маркетингові 1727px)
4. Working tree поза 1.x: `SitePagePreloader.vue`, `useEmbedReady.ts`, `src/content/home.ts` — не в скоупі, не комітити
5. Архівний design-brief (Instagram, hover 40px/112px) історичний — не повертати

Memory MCP недоступний у сесії; Memory JSON порожній на restore. Брифінг узято з `handoff.md`. `session-handoff` restore не спавнився (CLI restore exit 0 + файл повний).
- Рішення:
- Адаптив: inferred-стек на око від 1728, не окремий мобільний макет
- Брейкпоінти: ≥1280 desktop (1728 exact; 1280–1727 стиснутий той самий склад); 768–1279 tablet 2-колонка дозволена; <768 phone-стек
- Не `transform: scale()` на сторінку — пропорційні ширини/gutter; `@media` літерали 1279px / 767px (custom properties у media ненадійні)
- Скоуп: лише SiteLayout / маркетингові сторінки; GsAppLayout / Tachometer / archive поза зміною
- Капсули: default без блюру; hover пігулка 440×120, текст нерухомий 36px; обидві капсули однакові
- Хедер: Контакти · Проєкти · Майстерня · Події · Благодійність · UA|ENG; без Прокат/Артефактів
- Події: пункт нав і капсула ведуть на вже існуючий `/events` (синхронізація spec із продуктом, не новий sitemap; старий main spec мав Instagram)
- Сервісні плитки: hover-кільце лише навколо кнопки, без стрибка іконки/підпису
- Danish logo: PNG без непрозорого білого прямокутника (Figma 121:85)
- Design: none (`require_design_brief: false`)
- Таски 1.x: звірити working tree, не переписувати з нуля
- Review: APPROVE — apply дозволено з `review.md` + `apply-notes.md`; не імпровізувати поза Files/Do/Done-when
- Головна 1280–1727: flex/grid у потоці, не absolute `left: 1190px`; стопка колонок лише `max-width: 767px`
- Блокери:
none
- Attach:
- `openspec/changes/responsive-marketing-layout/review.md`
- `openspec/changes/responsive-marketing-layout/apply-notes.md`
- `openspec/changes/responsive-marketing-layout/proposal.md`
- `openspec/changes/responsive-marketing-layout/design.md`
- `openspec/changes/responsive-marketing-layout/specs/site-chrome/spec.md`
- `openspec/changes/responsive-marketing-layout/specs/home-page/spec.md`
- `openspec/changes/responsive-marketing-layout/tasks.md`
- `openspec/specs/site-chrome/spec.md`
- `openspec/specs/home-page/spec.md`
- Субагенти цієї сесії:
- apply parent-driven — implement з `tasks.md` + `apply-notes.md`; субагенти optional (`code-writer` / `test-writer` при ≥2 незалежних тасках; `design-implementer` не потрібен)
- `code-reviewer` — після коду і тестів, перед PR/MR
- `session-handoff` — restore at start, persist at exit (Amp: isolated `subagent-session-handoff`) — fallback only
- Обмеження:
- language: uk
- do not mix phases
- require_spec_review: true — Verdict APPROVE уже є; не починати apply у review-чаті
- no src/ у review (закрито); apply пише `src/` за тасками
- one active change
- marketing only — не чіпати GsAppLayout / Tachometer / archive / BLE / `src/services/*` / `server/` / SitePagePreloader / useEmbedReady
- не комітити сторонні файли working tree поза 1.x
- не вигадувати новий sitemap
- 1728 pixel-perfect зберігається; 1280–1727 — гумова адаптація без `left: 1190px` і без `scale()`
- таски 1.x: звірка, не rewrite
- після apply: `npm run typecheck`, `npm run build`
- status: spec-approved
- tasks: 0/22
- review: APPROVE

## HARD STOP на виході (ти НЕ закінчив, поки це не виконано)
1. Заспавни `session-handoff` у режимі persist (Amp: isolated `subagent-session-handoff`). Якщо spawn недоступний — зроби persist сам, ніколи не пропускай.
2. Запиши `openspec/changes/responsive-marketing-layout/handoff.md` з усіма секціями шаблону.
3. `npx agent-orchestrator-kit handoff responsive-marketing-layout` — exit 0 обов'язковий. CLI записує Memory JSON абсолютним шляхом і друкує розширений промпт у stdout.
4. Якщо Memory MCP живий — онови `Change:responsive-marketing-layout`, `Handoff:responsive-marketing-layout`, `Decision:*` відповідно до файлу.
5. Встав stdout CLI у чат одним fenced-блоком. Не скорочуй. Без службового ярлика. Перший рядок — `/opsx:…`.
6. Зупинись. Наступна роль починається в НОВОМУ чаті з цим промптом.

OpenSpec-файли — source of truth для вимог і тасків. Memory і handoff.md — індекс фази. Цей промпт — повний операційний бриф наступного треду, навіть якщо Amp проігнорує Memory MCP.
```
