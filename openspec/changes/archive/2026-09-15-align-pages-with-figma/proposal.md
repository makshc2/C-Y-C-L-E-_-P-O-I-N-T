## Why

Маркетингові сторінки розійшлися із затвердженим Figma-файлом `PVmxLvwhTXdblnuuAOhqkL` (design-brief.md, capture 2026-09-15): вертикальний ритм і горизонтальні відступи на `/workshop`, `/projects/army-support` не відповідають макету; `/charity` не має контенту взагалі (лише QR по центру); третьої картки «Фішки велодоріжки» немає в переліку `/projects`; деталка Golden Sprints показує старий короткий копірайт замість повного нового; деталка Фішок використовує старе фото 516×682 замість нового 507×810; вісім із десяти текстів `/artifacts` мають неправильні розділювачі абзаців. Фаза design (design-intake) завершена: `design-brief.md`, `decisions.md` і 9 PNG у `assets/` готові. Ця зміна перекладає бриф у зобов'язальні OpenSpec-артефакти.

## What Changes

- `/workshop`: вертикальний ритм 116px (хедер→h1→IG-рядок→таблиця→низ секції), горизонтальний відступ IG-рядка й плейсхолдера таблиці — 120px від gutter відносно h1, ширина таблиці 68% контентної колонки, gap іконка→текст 32px (було 16px). Тексти без змін.
- `/artifacts`: розділювач абзаців → порожній рядок у 8 з 10 текстів (crest, colossi, danylo, kokkedal, bag, gemu, helmets, lucas), розбивка harry-hall на 3 абзаци, точкова правка kokkedal («він»). Фото і тексти colnago — без змін.
- `/projects`: додається третя картка «Фішки велодоріжки» (фото-кроп нового асета, перший абзац деталки, «Читати далі...» → `/projects/fishky-velodorizhky`), повторно використовуючи наявний `ProjectRow` без модифікацій компонента.
- `/projects/fishky-velodorizhky`: нове фото `fishky-card-photo.png` 507×810 (новий токен `--fishky-photo-w/h`), gap фото→текст 138px (було 133px), відступ title→body 63px (було 72px).
- `/projects/golden-sprints`: повністю новий копірайт — body-1 (4 блоки, права колонка першого ряду), новий другий ряд (лівий стовпець 645px зі списком підготовки і CTA, правий 786px зі списком «Як це працює»), CTA «Почни заїзд прямо зараз!» стає лінком на `/projects/golden-sprints/app` (замінює «Читати далі...»), title→body 63px (було 72px).
- `/projects/army-support`: колір `< Назад` → `rgba(30,30,30,0.4)` (токен `--color-section-title`, було `--color-fg`); верхній відступ секції 34px (було 142px), back→h1 54px (було 16px), h1→таблиця 116px (було 16px); таблиця індентована на 120px від gutter, ширина 68% (як на workshop). Текст h1 без змін.
- `/charity`: із порожньої сторінки — три смуги (лайм/violet/лайм), кожна з внутрішнім відступом 116px: h1 + QR (новий асет 255×238) з підписом 8px нижче + лід-абзац; violet-список «Твій донат допомагає:»; нижній контактний блок з лінком на Instagram.
- Спільні нові CSS-токени в `src/styles/tokens.css`: `--content-indent: 120px`, `--section-pad-y: 116px`, `--sheet-w: 68%`, `--fishky-photo-w: 507px`, `--fishky-photo-h: 810px`; оновлення значень `--charity-qr-w`/`--charity-qr-h` → 255px/238px.
- Два асети копіюються байт-у-байт з `openspec/changes/align-pages-with-figma/assets/` у `src/assets/site/`: `fishky-card-photo.png` (новий файл), `charity-qr.png` (заміна байтів існуючого файлу).

## Capabilities

### Modified Capabilities

- `workshop`: ADDED вимога про вертикальний ритм (116px) і горизонтальні відступи (120px, 68%) хедер-секції; наявні вимоги про контент і поведінку iframe («росте вниз») лишаються без змін.
- `artifacts`: MODIFIED «Сторінка артефактів» — дозволені точкові правки розділювачів абзаців (8 з 10 рядків) і слова «він» у kokkedal; заборона на зміну змісту звужена до цього переліку.
- `projects`: MODIFIED «Перелік проєктів» (третя картка), «Документований CTA на вкладений app» (новий текст лінка), «Деталка Golden Sprints» (повний новий копірайт і другий ряд), «Назад на деталці Golden Sprints» (оновлений текст CTA), «Сторінка допомоги армії» (колір back-лінка, ритм, розташування таблиці), «Деталка Фішки велодоріжки» (новий розмір фото, дозвіл на присутність у переліку).
- `charity`: MODIFIED «Сторінка благодійності з QR» — повна заміна вимоги на трисмугову структуру з h1, QR+підписом, лідом, violet-списком і контактним блоком.

## Impact

- **Код:** `src/pages/{WorkshopPage,ProjectsPage,FishkyVelodorizhkyPage,GoldenSprintsPage,ArmySupportPage,CharityPage}.vue`; `src/components/site/SiteBackLink.vue`; `src/content/{artifacts,projects}.ts`; новий `src/content/charity.ts`; `src/styles/tokens.css`; асети `src/assets/site/fishky-card-photo.png` (новий), `src/assets/site/charity-qr.png` (заміна байтів).
- **Без змін:** `SiteHeader.vue`, `SiteNav.vue`, `src/router/index.ts` (усі 7 маршрутів уже зареєстровані), `src/constants/site.ts` (лише читання наявної `EVENTS_INSTAGRAM_URL`), `src/content/fishkyVelodorizhky.ts` (уже містить фінальний title/paragraphs), `src/content/armySupport.ts` (заголовок уже коректний), iframe `src` майстерні й армії, `ArtifactRow.vue`, `ProjectRow.vue`, `ArtifactsPage.vue`, `GoldenSprintsPage.vue`'s фото-токен `--gs-photo-w/h` (лишається 516×682).
- **Дизайн-джерело:** лише `design-brief.md` + `assets/` цієї зміни; live Figma MCP під час apply заборонено.
- **Залежності:** нових npm-пакетів не потрібно. Стек: Vue 3 `<script setup lang="ts">`, Composition API, Quasar, hash-router, без Pinia/Axios/Options API.

## Non-goals

- `SiteHeader`/`SiteNav` і сірий заголовок секції біля логотипа — поза скоупом; рендериться за вже заархівованою спекою `figma-content-sync` (`openspec/changes/archive/2026-09-02-figma-content-sync/`), ця зміна їх не чіпає.
- Вміст Google Таблиць на `/workshop` і `/projects/army-support` — не редагується; змінюється лише розташування/ширина/відступ плейсхолдера iframe, атрибут `src` не чіпається.
- Мобільні макети — у джерелі Figma їх немає (`layout.mode: none`, єдине полотно 1728px); адаптивність лишається на наявних брейкпоінтах проєкту `1279px`/`767px`, нові брейкпоінти не додаються.
- i18n / реальний англійський контент.
- Live Figma MCP під час apply — заборонено; єдине джерело — `design-brief.md` + `assets/` цієї зміни.
- Нові маршрути — усі 7 цільових URL уже зареєстровані в `src/router/index.ts`; ця зміна не редагує роутер.
- Перевірка актуальності QR-посилання на `/charity` (декодування зображення) — недоступна на цій фазі; байти копіюються як затверджений design-intake асет (див. Risks).
- Видалення застарілих файлів/токенів (`src/assets/site/fishky-velodorizhky-photo.png`, `--charity-green-h`, `--army-stripe-h`, `--section-h-home` у контексті charity) — не входить у зміну; лишаються в репозиторії невикористаними.

## Acceptance criteria

- Візуальна відповідність макету на рівні палітри, типографічної шкали (ваги/кеглі з таблиці Tokens брифу) та вертикального/горизонтального ритму (крок 116px, відступ 120px, back-лінк 34/54px) — **не** піксельна точність; відхилення в кілька px прийнятні, невідповідність кольору/ваги шрифту/масштабу відступів — ні.
- Усі 7 сторінок відкриваються за наявними маршрутами; нових або видалених slug немає.
- `/artifacts`: 8 із 10 текстів мають блоки, розділені порожнім рядком, замість одинарного переносу; colnago незмінний; усі 10 фото ідентичні наявним (байти не чіпаються).
- `/projects` показує 3 картки (Golden sprints, Допомога армії, Фішки велодоріжки) з роздільниками між усіма трьома.
- `/projects/golden-sprints` показує новий дворядковий копірайт (body-1 + два стовпці другого ряду) і CTA-лінк «Почни заїзд прямо зараз!» на `/projects/golden-sprints/app`.
- `/projects/fishky-velodorizhky` показує нове фото 507×810.
- `/projects/army-support` показує back-лінк кольором `rgba(30,30,30,0.4)` і таблицю, зсунуту на 120px від h1.
- `/charity` показує три смуги з h1, QR+підписом, лідом, violet-списком і контактним блоком з лінком на Instagram; форми оплати/бронювання немає.
- `npm run typecheck` і `npm run build` проходять (перевіряється під час apply, не в цій фазі).
- `npx openspec validate align-pages-with-figma --strict --type change` проходить без помилок.

## Risks / Constraints

- **QR `/charity`:** новий асет `charity-qr.png` не декодований (design-intake не мав інструменту декодування зображень); байти копіюються як затверджений результат фази design. Рекомендація: власник продукту сканує QR перед merge, щоб підтвердити актуальність donate-посилання.
- **Back-лінк армії:** зміна кольору з `--color-fg` (контраст ≈13:1 на лаймі) на `--color-section-title` `rgba(30,30,30,0.4)` (нижчий контраст) — свідомий відхід від архівного a11y-рішення `figma-content-sync` D3 на користь точності до Figma; узгоджується з уже прийнятою в цьому ж макеті практикою «декоративного» контрасту back-лінків на violet-сторінках (design-brief.md, розділ A11y). Не блокує приймання.
- `content/projects.ts`: форма `goldenSprintsDetail` змінюється з `{title, paragraphs: string[]}` на структурований об'єкт (`body1`, `setup`, `howItWorks`); єдиний споживач — `GoldenSprintsPage.vue`, перевірено, інших імпортерів немає.
- Одна активна зміна (`max_active_changes: 1`) — інших активних changes під час propose не виявлено (`openspec/changes/` містить лише `align-pages-with-figma` і `archive/`).
- Перетину файлів з іншими активними змінами немає (архівні `figma-content-sync` і `responsive-marketing-layout` уже змерджені).
