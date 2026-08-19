## 1. Звірити working tree з новими вимогами

- [ ] 1.1 Звірити нав хедера без Прокат/Артефактів
  Files: src/components/site/SiteNav.vue
  Do: Звір шаблон: пункти Контакти (`/` + hash `#contacts`), Проєкти (`/projects`), Майстерня (`/workshop`), Події (`/events`). Якщо є `RouterLink` на `/rental` або `/artifacts` — видали їх. Не додавай нові пункти.
  Done-when: У `SiteNav.vue` немає `to="/rental"` і `to="/artifacts"`; є рівно чотири лінки, серед них `to="/events"`.

- [ ] 1.2 Звірити токени капсул у working tree
  Files: src/styles/tokens.css
  Do: Звір: `--capsule-hover-w: 440px`, `--capsule-projects-hover-h: 120px`, `--blur-capsule-hover-opacity: 0.15`. Не повертай `--capsule-events-hover-h`, `--blur-events`, `--blur-events-opacity`, `--blur-events-hover`.
  Done-when: У файлі є 440px і 120px для hover-пігулки; `rg --capsule-events-hover-h|--blur-events src/styles/tokens.css` нічого не знаходить.

- [ ] 1.3 Звірити капсулу «Актуальні події»
  Files: src/components/home/HomeCapsuleEvents.vue
  Do: Звір поведінку working tree: default — `.capsule__blur` прихований (`opacity: 0`), підпис `var(--text-capsule)` на `left: 208px; top: 395px` без зміни розміру на hover; hover/`focus-visible` показує пігулку 440×120; `prefers-reduced-motion: reduce` має `transition: none`; клік веде на `/events`. Віднови цю поведінку, якщо файл відкотився до default-блюру, 40px на hover або JS `hovered`.
  Done-when: Немає класу `is-hovered` і немає `font-size: 40px` на hover; default-пігулка прихована; `to="/events"`.

- [ ] 1.4 Звірити капсулу «Проєкти»
  Files: src/components/home/HomeCapsuleProjects.vue
  Do: Звір ту саму поведінку, що в 1.3: немає default-блюру, підпис нерухомий 36px на `left: 273px; top: 395px`, пігулка 440×120 на hover, reduced motion миттєвий, клік на `/projects`. Прибери JS `hovered`/`left` і клас `is-left`, якщо вони повернулись.
  Done-when: Немає `is-hovered`/`is-left`; default-пігулка прихована; підпис не змінює `font-size` на hover; `to="/projects"`.

- [ ] 1.5 Звірити прозорий логотип Danish
  Files: src/assets/site/logo-danish.png, src/components/site/SiteFooter.vue
  Do: Звір PNG: краї знака прозорі, без непрозорого білого прямокутника. У футері не став `background` білого кольору на `.site-footer__logo`. Якщо асет знову з білим фоном — заміни його прозорим кропом (Figma 121:85).
  Done-when: У `SiteFooter.vue` логотип без `background: #fff` / `background: white`; PNG має альфа (не суцільний білий прямокутник 175×85).

## 2. Токени брейкпоінтів і site chrome

- [ ] 2.1 Оголосити токени 1280 / 768
  Files: src/styles/tokens.css
  Do: Постав `--bp-desktop: 1280px` (замість `1728px`). Додай `--bp-tablet: 768px`. Залиш `--page-w: 1728px`. У `@media` компонентів не підставляй `var(--bp-desktop)` — лише літерали `1279px` і `767px`.
  Done-when: У `tokens.css` є `--bp-desktop: 1280px`, `--bp-tablet: 768px`, `--page-w: 1728px`.

- [ ] 2.2 SiteLayout без phone-стеку до 768
  Files: src/layouts/SiteLayout.vue
  Do: Заміни `@media (max-width: 1727px)` на `@media (max-width: 767px)` для `overflow-x: hidden`. Не додавай `transform: scale()` / `zoom` на `.site-layout`. Не імпортуй і не змінюй `GsAppLayout`.
  Done-when: У файлі немає `1727px` і немає `transform: scale`; `max-width: 767px` є.

- [ ] 2.3 Хедер: один ряд від 1280
  Files: src/components/site/SiteHeader.vue
  Do: Заміни `@media (max-width: 1727px)` на `@media (max-width: 1279px)` для `flex-wrap` і переносу `.site-header__right`. На ≥1280 лиши висоту `var(--header-h)` і один ряд (логотип зліва, нав + Благодійність + UA|ENG справа).
  Done-when: У файлі немає `1727px`; перенос хедера лише в `@media (max-width: 1279px)`; немає `transform: scale`.

- [ ] 2.4 Логотип хедера на вузьких екранах
  Files: src/components/site/SiteLogo.vue
  Do: Заміни `@media (max-width: 1727px)` на `@media (max-width: 1279px)` для `width: min(var(--logo-w), 70vw)`. На ≥1280 лиши `385×56` (`--logo-w` / `--logo-h`).
  Done-when: У файлі немає `1727px`; зменшення логотипа лише при `max-width: 1279px`.

- [ ] 2.5 Глобальний `.site-stack` лише на phone
  Files: src/style.css
  Do: Заміни `@media (max-width: 1727px)` у блоці `.site-stack { flex-direction: column }` на `@media (max-width: 767px)`. Не став `transform: scale()` на `body` або `#app`.
  Done-when: У `src/style.css` немає `1727px`; `.site-stack` стає колонкою лише під `max-width: 767px`.

## 3. Головна: склад колонок

- [ ] 3.1 HomePage: 1280 ряд, 768 2-колонки, <768 стопка
  Files: src/pages/HomePage.vue
  Do: Прибери `@media (max-width: 1727px)`, що ставить усі блоки `position: static` і `flex-direction: column`. З 1280 до 1727 зібери intro/community/contacts як flex або grid у два стовпці (той самий порядок, що абсолютний 1728). На `max-width: 1279px` лиши 2 колонки там, де вони є. На `max-width: 767px` склади стопкою зліва-направо → зверху вниз (intro: текст, потім капсула; community: капсула, потім текст). Не використовуй `transform: scale` на `.home`.
  Done-when: У `HomePage.vue` немає `1727px`; є `@media (max-width: 767px)` зі стопкою; на правилах для ≥1280 intro і community не `flex-direction: column`.

- [ ] 3.2 Медіа капсули подій під 768
  Files: src/components/home/HomeCapsuleEvents.vue
  Do: Заміни `@media (max-width: 1727px)` (width 100%, підпис по центру знизу) на `@media (max-width: 767px)`. На ≥768 не розтягуй капсулу на всю ширину в’юпорта і не центруй підпис. Поведінку hover з 1.3 не ламай.
  Done-when: У файлі немає `1727px`; адаптив підпису/ширини лише в `max-width: 767px`; default-пігулка лишається прихованою.

- [ ] 3.3 Медіа капсули проєктів під 768
  Files: src/components/home/HomeCapsuleProjects.vue
  Do: Заміни `@media (max-width: 1727px)` на `@media (max-width: 767px)` так само, як у 3.2. Поведінку hover з 1.4 не ламай.
  Done-when: У файлі немає `1727px`; адаптив підпису/ширини лише в `max-width: 767px`.

## 4. Hover сервісних плиток

- [ ] 4.1 Кільце hover на хіт-зоні плитки
  Files: src/components/home/HomeServiceTile.vue
  Do: Додай `@media (hover: hover)`: на `.tile:hover` покажи кільце через `outline` або `box-shadow` навколо самого `RouterLink.tile`. Не змінюй `padding`, `width`, `height`, `transform`, `margin`, `top`/`left` іконки `.tile__icon` і підпису `.tile__label` на hover. Не додавай hover на батьківську секцію в `HomePage.vue`. Лиши `:focus-visible`.
  Done-when: Є `.tile:hover` з outline або box-shadow; у правилі hover немає зміни `padding`/`transform`/`margin` для `.tile__icon` і `.tile__label`.

- [ ] 4.2 Стек плиток лише на phone
  Files: src/components/home/HomeServiceTile.vue, src/pages/HomePage.vue
  Do: У `HomeServiceTile.vue` заміни `@media (max-width: 1727px)` (relative + column) на `@media (max-width: 767px)`. У `HomePage.vue` на 768–1279 три плитки лиши в одному ряді або wrap 2+1; у стопку всі три — лише при `max-width: 767px`.
  Done-when: У `HomeServiceTile.vue` немає `1727px`; три плитки стають колонкою лише під `max-width: 767px`.

## 5. Внутрішні маркетингові сторінки

- [ ] 5.1 Ряди проєктів: 2 колонки до 768
  Files: src/components/projects/ProjectRow.vue, src/pages/ProjectsPage.vue
  Do: У `ProjectRow.vue` заміни `@media (max-width: 1727px)` з `grid-template-columns: 1fr` на `@media (max-width: 767px)`. На 768–1279 лиши дві колонки (фото | текст). У `ProjectsPage.vue` медіа для `.projects__rule` постав на `max-width: 1279px` (зменшений margin), не на 1727.
  Done-when: У обох файлах немає `1727px`; `grid-template-columns: 1fr` у `ProjectRow` лише під `max-width: 767px`.

- [ ] 5.2 Деталка Golden Sprints
  Files: src/pages/GoldenSprintsPage.vue
  Do: Заміни `@media (max-width: 1727px)` зі `flex-direction: column` на `@media (max-width: 767px)`. На ≥768 лиши дві колонки (фото зліва, копі справа). Не чіпай текст «Жіночий велоклуб» і CTA «Читати далі...».
  Done-when: У файлі немає `1727px`; колонка вмикається лише при `max-width: 767px`.

- [ ] 5.3 Прокат: фото і спеки
  Files: src/components/rental/RentalBike.vue, src/pages/RentalPage.vue
  Do: У `RentalBike.vue` заміни стос `grid-template-columns: 1fr` з `1727px` на `max-width: 767px`; на 768–1279 лиши дві колонки. У `RentalPage.vue` зменшений padding intro постав на `max-width: 1279px`, не на 1727.
  Done-when: У обох файлах немає `1727px`; одноколонковий grid велосипеда лише під `max-width: 767px`.

- [ ] 5.4 Артефакти: фото і текст
  Files: src/components/artifacts/ArtifactRow.vue
  Do: Заміни `@media (max-width: 1727px)` з `grid-template-columns: 1fr` на `@media (max-width: 767px)`. На 768–1279 лиши дві колонки фото | текст.
  Done-when: У файлі немає `1727px`; стопка ряду лише при `max-width: 767px`.

- [ ] 5.5 Майстерня, army-support, події, благодійність — padding без порогу 1727
  Files: src/pages/WorkshopPage.vue, src/pages/ArmySupportPage.vue, src/pages/EventsPage.vue, src/pages/CharityPage.vue
  Do: У кожному файлі заміни `@media (max-width: 1727px)` на `@media (max-width: 1279px)` для зменшеного padding / гумового QR. Не вмикай `flex-direction: column` там, де лейаут уже колонка. Не редагуй iframe `src` майстерні.
  Done-when: У чотирьох файлах немає `1727px`; є `max-width: 1279px` для вузького padding.

## 6. Перевірка скоупу і збірка

- [ ] 6.1 Не чіпати app-chrome
  Files: src/layouts/GsAppLayout.vue, src/pages/TachometerPage.vue, src/pages/ResultsArchivePage.vue
  Do: Не змінюй ці три файли в цій зміні. Якщо вони вже брудні в working tree — відкоти їх до HEAD.
  Done-when: `git diff -- src/layouts/GsAppLayout.vue src/pages/TachometerPage.vue src/pages/ResultsArchivePage.vue` порожній.

- [ ] 6.2 Typecheck і build
  Files: package.json
  Do: Запусти `npm run typecheck`, після успіху — `npm run build`.
  Done-when: Обидві команди завершуються з кодом 0.
