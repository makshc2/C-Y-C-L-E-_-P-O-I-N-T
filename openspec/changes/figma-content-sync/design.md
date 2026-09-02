## Context

Маркетинговий сайт уже на hash-router (`src/router/index.ts`, `meta.chrome: 'site'`). Копі живе в `src/content/*.ts`, сторінки — `src/pages/*Page.vue`, chrome — `src/components/site/SiteHeader.vue` (зараз **не** рендерить `sectionTitle`, хоча токен `--color-section-title: rgba(30,30,30,0.4)` є). Instagram і sheet URL — `src/constants/site.ts`.

Паралельно активна `responsive-marketing-layout` (padding/брейкпоінти; overlapping: `EventsPage.vue`, `WorkshopPage.vue`, `ProjectsPage.vue`, `ArmySupportPage.vue`, `ArtifactRow.vue`, `SiteHeader.vue`). Ця зміна — лише копі, ассети, один slug, заголовки хедера, «< Назад». CSS лейауту не відкочувати (`1727px` не повертати).

Design: none на диску. Джерело Figma fileKey `5SDp4Vg9fHdWGWaOJAhxZ3`. Apply MUST NOT ходити в live Figma MCP: PNG мають лежати в `openspec/changes/figma-content-sync/assets/` після `/opsx:design figma-content-sync`.

Стек apply: Vue 3 `<script setup lang="ts">`, Composition API, без Options API, без Pinia, без Axios, без коментарів у коді.

## Goals / Non-Goals

**Goals:**

- Звести копі й унікальні фото з Figma на `/events`, `/projects`, `/projects/army-support`, `/workshop`, `/artifacts`.
- Додати прямий маршрут `/projects/fishky-velodorizhky` за патерном `GoldenSprintsPage.vue`.
- Показати сірі заголовки секції в хедері (мапа головної специ + Події + Фішки + регістр «Артефакти Велоточки»).
- Додати «< Назад» на трьох деталках проєктів.

**Non-Goals:**

- Брейкпоінти, `transform: scale`, hover капсул, SiteNav (Прокат/Артефакти/Фішки), i18n, rental/charity контент, GS app/archive/BLE, зміна iframe `src`, коміт лейаут-зміни, live Figma під час apply.

## Decisions

**D1: Контент лишається в `src/content/*.ts`**

Рядки заголовків і абзаців міняти в існуючих модулях (`eventsCopy.heading`, `armySupportList.body`, `armySupportCopy.heading`, `workshopCopy`). Нова сторінка — `src/content/fishkyVelodorizhky.ts` (`title` + `paragraphs: readonly string[]` з чотирьох елементів).

Альтернатива (хардкод у `.vue`): гірше — ламає патерн проєкту.

**D2: Словник заголовків секції в хедері (повна мапа site-chrome)**

У `SiteHeader.vue` через `useRoute()` показати текст біля `SiteLogo`, якщо маршрут має заголовок. Колір `var(--color-section-title)`, кегль `var(--text-section-title)` (36px), `font-weight: var(--font-weight-light)`. Головна `/` — не рендерити елемент.

Мапа (борг головної специ + ця зміна):

| path | title |
|---|---|
| `/` | (немає) |
| `/events` | Події та новини |
| `/projects` і всі `/projects/*` з `chrome: 'site'` | Проєкти |
| `/workshop` | Майстерня |
| `/artifacts` | Артефакти Велоточки |
| `/rental` | Прокат |
| `/charity` | Допомогти Велоточці |

`/projects/golden-sprints/app` і `/archive` не використовують `SiteHeader`. Префікс `/projects` для site-chrome безпечний. Rental/charity — закриття боргу головної специ, не новий sitemap.

Альтернатива (лише маршрути цієї зміни): часткова мапа лишає `/rental` і `/charity` без заголовка всупереч головній специ.

**D3: Спільний `SiteBackLink.vue`**

Новий `src/components/site/SiteBackLink.vue`: текст рівно `< Назад`, `RouterLink` на `/projects`, 24px Light (`var(--text-read-more)`, `var(--font-weight-light)`). Prop `tone: 'violet' | 'lime'`: violet → `color: rgba(231, 252, 132, 0.5)`; lime → `color: var(--color-fg)` (`#1e1e1e`, Figma 299:63 на лаймі). Підключити в `GoldenSprintsPage.vue` (перший елемент колонки копі, **перед** h1; існуючий «Читати далі...» на app **залишити**), `ArmySupportPage.vue` (після preloader, перед h1), `FishkyVelodorizhkyPage.vue` (як GS). На `ProjectsPage.vue` не ставити.

Альтернатива (три інлайнові лінки): дублює колір/типографіку.

**D4: Фішки — клон GS, не картка переліку**

Роут у `src/router/index.ts` одразу після `/projects/army-support`: `path: '/projects/fishky-velodorizhky'`, lazy `FishkyVelodorizhkyPage.vue`, `meta: { chrome: 'site' }`. Сторінка копіює сітку GS (violet `var(--color-violet)`, фото 516×682 зліва, title 96px Light `#e7fc84`). Абзаци 24px Regular `#e7fc84` — `var(--text-body)`, **не** `var(--text-project-body)` (20px у GS). Чотири `<p>` з `fishkyVelodorizhky.paragraphs`. Фото: `src/assets/site/fishky-velodorizhky-photo.png`. Не додавати рядок у `ProjectsPage.vue`, `SiteNav.vue`, `home.ts`.

**D5: PNG лише з dump зміни, ніколи MCP URL у рантаймі**

Apply копіює файл `openspec/changes/figma-content-sync/assets/<filename>` → `src/assets/site/<filename>` (заміна байтів існуючих імен; новий файл лише для Фішок). Якщо PNG немає — таск заблокований, пікселі не вигадувати.

| dest у `src/assets/site/` | Figma node |
|---|---|
| `army-thumb.png` | `303:5` (B&W чоловік, окуляри, футболка 13/герб/12, мікрофон) |
| `fishky-velodorizhky-photo.png` | `260:78` (ілюстрація мапи Києва) |
| `artifact-01-crest.png` | ~`293:7` IMG_3987 герб/номерки |
| `artifact-02-colossi.png` | ~`295:9` IMG_3977 Colossi |
| `artifact-03-colnago.png` | ~`293:6` IMG_3974 Colnago |
| `artifact-04-harry-hall.png` | ~`295:8` IMG_3975 Harry Hall |
| `artifact-05-danylo.png` | ~`295:15` IMG_3976 Danylo |
| `artifact-06-kokkedal.png` | ~`295:14` IMG_3978 Kokkedal |
| `artifact-07-bag.png` | ~`289:132` IMG_3979 сумка |
| `artifact-08-gemu.png` | ~`288:126` IMG_3984 GEMU |
| `artifact-09-helmets.png` | ~`288:131` IMG_3973 шоломи |
| `artifact-10-lucas.png` | ~`293:4` IMG_3973 2 Lucas |

`gs-thumb.png` не чіпати (вже відповідає `121:49`). `ArtifactsPage.vue` імпорти шляхів не міняти — лише байти файлів. `icon-instagram.svg` не замінювати.

**D6: Майстерня — рядок-лінк, не swap рядка URL**

У `workshop.ts`: `heading` → `Послуги майстерні Велоточки`; додати `instagramContact: 'Можна звʼязатися через інстаграм майстерні'`; поля `instagramLabel` і `servicesIntro` видалити (вони більше не рендеряться). `bookingNote` лишити в модулі, у шаблоні не показувати.

У `WorkshopPage.vue`: h1 36px Light `#1e1e1e` (вже `--text-section-title` / `--font-weight-light`). Замість `.workshop__url` з текстом «Instagram» — один `<a class="workshop__contact">` на `INSTAGRAM_URL` (`target="_blank"` `rel="noopener noreferrer"`): `img` `icon-instagram.svg` 50×50 + span 32px Light (`--text-contact-title`). Прибрати `<p class="workshop__intro">`. Iframe: не змінювати `WORKSHOP_PRICE_SHEET_SRC` і атрибути крім того, що вже є. Не чіпати `@media (max-width: 1279px)` / `767px` padding.

**D7: Події — лише рядок heading**

`eventsCopy.heading` → `Всі актуальні новини та події зібрані у нашому інстаграмі. Запрошуємо підписатись!`. `EventsPage.vue` лишає `<a>` на `EVENTS_INSTAGRAM_URL`. `EVENTS_INSTAGRAM_EMBED_SRC` і `homeCapsuleLabels.events` не змінювати. Padding-медіа не чіпати.

**D8: Перелік проєктів — два ряди, один пробіл, новий thumb**

У `armySupportList.body` замінити `Cycle Point  регулярно` на `Cycle Point регулярно`. `goldenSprintsList.items[0]` з «івентів.Про команду» не чіпати. Третій `ProjectRow` не додавати. Замінити байти `army-thumb.png`.

**D9: Army detail — копі + title iframe + назад**

`armySupportCopy.heading` → `Результати допомоги армії з моменту відкриття Велоточки`. `title` iframe = цей самий рядок. `CHARITY_RESULTS_SHEET_SRC` не змінювати.

**D10: Не чіпати layout CSS overlapping-файлів**

У файлах спільного скоупу з лейаут-зміною правити лише `<script>` / `<template>` / контент-рядки, потрібні цій зміні. Не повертати `1727px`, не прибирати `max-width: 1279px` / `767px`. `ArtifactRow.vue` у цій зміні не редагувати (фото йдуть через імпорти сторінки + байти PNG).

## Risks / Trade-offs

- [Немає PNG у `assets/`] → Apply фото-тасків стоїть до `/opsx:design`; пікселі не генерувати.
- [Дві активні зміни, `max_active_changes: 1`] → Прийнято наказом користувача; не мерджити в лейаут-зміну.
- [Конфлікт у спільних Vue SFC] → Вузький diff; не відкочувати padding-таски.
- [Обидві зміни MODIFIED `site-chrome` Hash-router] → Ця зміна фіксує повний список слагів продукту + Фішки; після archive обох спек треба звірити один список.
- [YAMLParseError у `openspec/config.yaml`] → Поза скоупом цієї зміни; CLI все одно пише артефакти.

## Migration Plan

- Деплой як звичайний фронт (GitHub Pages, hash). Міграції даних немає.
- Rollback: відкотити файли під `openspec/changes/figma-content-sync/tasks.md` (контент, сторінки, роут, хедер, PNG).
- Перед merge: `npm run typecheck` і `npm run build`.

## Open Questions

Немає. Продуктові рішення зафіксовані в propose-бріфі; `/opsx:design` лише зливає PNG.
