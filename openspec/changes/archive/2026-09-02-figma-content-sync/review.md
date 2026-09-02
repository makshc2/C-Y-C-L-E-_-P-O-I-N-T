# Spec Review

**Change:** figma-content-sync
**Date:** 2026-09-02
**Verdict:** APPROVE

## Checklist summary
- Proposal: ✓
- Design: ✓
- Tasks: ✓
- Delta specs: ✓

### Consistency
- proposal ↔ design ↔ tasks — одна історія, без суперечностей: ✓
- Delta specs покривають усю змінену/додану поведінку з design: ✓

### Main specs
- Немає конфліктів з існуючими `openspec/specs/`: ✓

### Scope
- Немає scope creep vs proposal Non-goals: ✓

### Task self-sufficiency
- Сліпий implementer може виконати кожен таск лише з Files/Do/Done-when, без читання design.md: ✓

### Vue 3 / Quasar
- `<script setup>` + Composition API: ✓
- Не вимагає Pinia/Axios: ✓
- Таски з конкретними шляхами під `src/`: ✓
- Немає creep у нерелевантний UI-рефактор: ✓

## Findings

Немає блокувальних issues. Нижче — non-blocking notes (severity: note).

### Note: apply після `/opsx:design`

`Design: none` зараз; каталогу `openspec/changes/figma-content-sync/assets/` немає. Таски 3.2 / 5.2 / 7.1 називають точні dump-шляхи (`army-thumb.png`, `fishky-velodorizhky-photo.png`, `artifact-01-crest.png` … `artifact-10-lucas.png`), node ids і заборону вигадувати байти / викликати Figma MCP. Design-фаза лише постачає байти; implementer не гадає імена. Apply фото-тасків (і build 5.3 / 8.2, бо сторінка Фішок імпортує PNG) стоїть до dump.

### Note: дві активні зміни

`pipeline.max_active_changes: 1` порушено свідомо (наказ користувача). Паралельна `responsive-marketing-layout` теж MODIFIED `site-chrome` Hash-router (додає існуючий `/events`, забороняє нові слагами). Після archive обох треба злити один список слагів **з** `/projects/fishky-velodorizhky`. Не комітити `openspec/changes/responsive-marketing-layout/` у цій зміні.

### Note: Done-when 4.2

Формулювання «є `SiteBackLink` з `tone="violet"` і `to="/projects/golden-sprints/app"`» можна прочитати так, ніби back-лінк веде на app. Do однозначний: `SiteBackLink` → `/projects` (перший у `.gs__copy`); існуючий `RouterLink.gs__more` на app лишити. Перевіряти за Do.

## Перевірка шляхів Files

Існують: `SiteHeader.vue`, `events.ts`, `EventsPage.vue`, `projects.ts`, `army-thumb.png`, `ProjectsPage.vue`, `GoldenSprintsPage.vue`, `armySupport.ts`, `ArmySupportPage.vue`, `router/index.ts`, `workshop.ts`, `WorkshopPage.vue`, десять `artifact-*.png`, `package.json`, overlapping-файли таску 8.1.

Позначені як нові: `SiteBackLink.vue`, `fishkyVelodorizhky.ts`, `fishky-velodorizhky-photo.png`, `FishkyVelodorizhkyPage.vue`.

Поточний код збігається з Do: `eventsCopy.heading` = «Актуальні події»; `armySupportList.body` має подвійний пробіл; `armySupportCopy.heading` = «Результати благодійності»; workshop має `instagramLabel` / `servicesIntro`; хедер не рендерить `sectionTitle`; роут Фішок відсутній; `homeCapsuleLabels.events` = «Актуальні події»; константи Instagram/sheet уже правильні.

## Main specs (семантика)

- Немає головної спеки `events`; delta ADDED узгоджується з `home-page` (капсула «Актуальні події» не змінюється) і з `site-chrome` (додає `/events` + Фішки в Hash-router; сірі titles MODIFIED, регістр «Артефакти Велоточки»).
- `projects`: REMOVED порожня army-смуга → ADDED заголовок+sheet+назад; ADDED Фішки без картки; MODIFIED один пробіл після «Cycle Point». CTA GS на app не знімається.
- `workshop`: MODIFIED копі/контактний рядок; read-only embed Google Sheet лишається немодифікованим.
- `artifacts`: REMOVED спільний placeholder → ADDED унікальні локальні PNG; копі «прстору»/«сиділ» без змін.
- `rental` / `charity`: лише борг сірих заголовків (уже в головній `site-chrome`), не контент сторінок.
- `race-session` / `race-archive`: поза скоупом.

## Scope

Non-goals дотримані: немає i18n, каталогу прокату, QR, GS app/BLE, зміни iframe `src`, hover капсул, брейкпоінтів, пунктів SiteNav Прокат/Артефакти/Фішки, коміту лейаут-зміни, live Figma. Таски не тягнуть Pinia/Axios і не рефакторять нерелевантний UI.

## Notes

- Apply MUST NOT відкочувати layout CSS overlapping-файлів (`1727px` зараз уже немає; лишити `@media (max-width: 1279px)` / `767px`).
- `openspec/config.yaml` YAMLParseError на рядку контракту тасків — поза скоупом цієї зміни.
- Наступна фаза після persist conductor: `/opsx:design figma-content-sync`, потім `/opsx:apply figma-content-sync` (потрібен explicit Approve з цього review).
