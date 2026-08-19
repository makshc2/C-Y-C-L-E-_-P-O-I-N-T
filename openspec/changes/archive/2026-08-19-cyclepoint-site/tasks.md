## 1. Ассети, токени, глобальні стилі

- [x] 1.1 Скопіювати ассети сайту в `src/assets/site/`
  Files: new file: src/assets/site/logo-cyclepoint-header.png, new file: src/assets/site/logo-danish.png, new file: src/assets/site/icon-instagram.svg, new file: src/assets/site/icon-workshop.png, new file: src/assets/site/icon-rental.png, new file: src/assets/site/icon-artifacts.svg, new file: src/assets/site/deco-glasses.svg, new file: src/assets/site/home-events-photo.png, new file: src/assets/site/home-projects-photo.png, new file: src/assets/site/map.png, new file: src/assets/site/gs-thumb.png, new file: src/assets/site/army-thumb.png, new file: src/assets/site/gs-detail-photo.png, new file: src/assets/site/charity-qr.png, new file: src/assets/site/rental-trek.png, new file: src/assets/site/rental-cannondale.png, new file: src/assets/site/rental-vanmoof.png, new file: src/assets/site/rental-cyclepoint-bike.png, new file: src/assets/site/rental-cuda-atom.png, new file: src/assets/site/artifact-01-crest.png, new file: src/assets/site/artifact-02-colossi.png, new file: src/assets/site/artifact-03-colnago.png, new file: src/assets/site/artifact-04-harry-hall.png, new file: src/assets/site/artifact-05-danylo.png, new file: src/assets/site/artifact-06-kokkedal.png, new file: src/assets/site/artifact-07-bag.png, new file: src/assets/site/artifact-08-gemu.png, new file: src/assets/site/artifact-09-helmets.png, new file: src/assets/site/artifact-10-lucas.png
  Do: Скопіюй однойменні файли з `openspec/changes/cyclepoint-site/assets/` у `src/assets/site/`. Не копіюй QA-скріни (`home-desktop.png` тощо), `_home_raw/`, `*-original.jpeg`, `artifact-shared-original.jpeg`.
  Done-when: Усі перелічені файли існують у `src/assets/site/` і збігаються за іменами з джерелом.

- [x] 1.2 Додати CSS-токени з brief
  Files: new file: src/styles/tokens.css
  Do: Оголоси змінні з таблиць Color/Typography/Spacing у `openspec/changes/cyclepoint-site/design-brief.md` (розділ Design tokens): `--color-bg` `#ffffff`, `--color-fg` `#1e1e1e`, `--color-tiffany` `#b7f1d8`, `--color-green` `#e7fc84`, `--color-violet` `rgba(46,11,100,0.5)`, `--color-accent-lime` `#d5f252`, `--color-charity-bg` `#90dcbc`, `--color-section-title` `rgba(30,30,30,0.4)`, `--header-h` `78px`, `--font-sans` `"Helvetica Neue", Helvetica, Arial, sans-serif`.
  Done-when: Файл містить усі токени з таблиць Color, Typography, Spacing, Radii brief без значень «на око».

- [x] 1.3 Скинути глобальні стилі Vite й підключити токени
  Files: src/style.css, src/main.ts
  Do: Заміни темний центрований шаблон у `src/style.css` на світлий reset: `body` margin 0, фон `#ffffff`, шрифт `var(--font-sans)`, `#app` на всю ширину без `max-width: 1280px`. У `src/main.ts` додай імпорти `./styles/tokens.css` і `./style.css` (після Quasar CSS).
  Done-when: `src/main.ts` імпортує обидва CSS; у `src/style.css` немає `place-items: center` і обмеження `#app { max-width: 1280px }`.

- [x] 1.4 Оновити title документа
  Files: index.html
  Do: Постав `<title>Cycle Point</title>` замість `Cycle Point App`. `lang="uk"` лиши.
  Done-when: У `index.html` title дорівнює `Cycle Point`.

## 2. Константи та копі

- [x] 2.1 Константа Instagram і заголовки секцій
  Files: new file: src/constants/site.ts
  Do: Експортуй `INSTAGRAM_URL = 'https://www.instagram.com/cyclepoint_workshop/'` і мапу заголовків секцій: `/projects` і `/projects/golden-sprints` і `/projects/army-support` → «Проєкти»; `/charity` → «Допомогти Велоточці»; `/workshop` → «Майстерня»; `/rental` → «Прокат»; `/artifacts` → «Артефакти велоточки». Головна `/` — порожній рядок.
  Done-when: Файл експортує URL і мапу; інших Instagram URL у проєкті для хедера/контактів немає.

- [x] 2.2 Копі сторінок з brief
  Files: new file: src/content/home.ts, new file: src/content/projects.ts, new file: src/content/workshop.ts, new file: src/content/rental.ts, new file: src/content/artifacts.ts
  Do: Перенеси тексти буквально з `openspec/changes/cyclepoint-site/design-brief.md`: Home (Intro 121:66, Community 121:75, контакти з «Cб»), Projects list + GS detail (включно з «Жіночий велоклуб»), Workshop («ексель та опис»), Rental intro і 5 велосипедів (Cannondale без трансмісії, Cuda Atom розмір `???`), Artifacts 10 рядків з орфографією макета.
  Done-when: Кожен файл експортує рядки, що збігаються з відповідним розділом brief, без виправлення копіпасту чи «прстору»/«сиділ».

## 3. Site chrome

- [x] 3.1 Логотип хедера
  Files: new file: src/components/site/SiteLogo.vue
  Do: Vue 3 `<script setup lang="ts">`: зображення `src/assets/site/logo-cyclepoint-header.png` розміром 385×56, `RouterLink` на `/`. Без Options API.
  Done-when: Клік по логотипу веде на `/`; використано header-кроп, не `logo-cyclepoint.png`.

- [x] 3.2 Навігація хедера
  Files: new file: src/components/site/SiteNav.vue, src/constants/site.ts
  Do: Пункти: Контакти → `{ path: '/', hash: '#contacts' }`; Проєкти → `/projects`; Майстерня → `/workshop`; Події → зовнішнє `<a :href="INSTAGRAM_URL" target="_blank" rel="noopener noreferrer">`. Текст 16px Helvetica Neue Medium `#1e1e1e`. Hover-стиль не вигадуй; додай лише `:focus-visible` ring.
  Done-when: Чотири пункти на місці; Події відкривають Instagram з `rel="noopener noreferrer"`; окремої сторінки `/contacts` немає.

- [x] 3.3 Кнопка Благодійність
  Files: new file: src/components/site/SiteCharityButton.vue
  Do: `RouterLink` на `/charity`, пігулка 152×40, `border-radius: 60px`, тло `#90dcbc`, текст «Благодійність» 16px Helvetica Bold `#e7fc84`. Hover не вигадуй; `:focus-visible` ring обов’язковий.
  Done-when: Кнопка веде на `/charity` і має розмір/кольори з brief.

- [x] 3.4 Візуальний UA|ENG
  Files: new file: src/components/site/SiteLangToggle.vue
  Do: Покажи «UA» Regular 16px і «|ENG» Thin 16px. Клік не змінює контент і не перемикає i18n.
  Done-when: Перемикач видимий; після кліку ENG тексти сторінки лишаються українськими.

- [x] 3.5 Збірка хедера
  Files: new file: src/components/site/SiteHeader.vue
  Do: Білий хедер висотою 78px: логотип x-відступ 36px, опційний сірий заголовок секції 36px Light `rgba(30,30,30,0.4)` з пропа `sectionTitle`, справа SiteNav + SiteCharityButton + SiteLangToggle. На головній `sectionTitle` порожній — заголовок не рендериться.
  Done-when: Висота хедера 78px; внутрішні сторінки показують заголовок секції; головна — ні.

- [x] 3.6 Футер
  Files: new file: src/components/site/SiteFooter.vue
  Do: Смуга `#b7f1d8` висотою 160–163px, по центру `logo-danish.png` 175×85 і рядок «За підтримки Українсько - Данського молодіжного дому». Проп `showCopyrightSymbol: boolean` додає `©` лише коли true (головна і charity — з ©; GS detail, army, workshop, artifacts — без).
  Done-when: Футер містить danish-лого і copyright; символ © керується пропом.

- [x] 3.7 Site layout
  Files: new file: src/layouts/SiteLayout.vue
  Do: Обгортка: SiteHeader (sectionTitle з маршруту через `src/constants/site.ts`), `<slot />` / `<router-view />`, SiteFooter. Без `q-header` «Cycle Point App».
  Done-when: Маркетингові сторінки рендеряться всередині цього лейауту з хедером і футером.

## 4. Роутер і оболонка застосунку

- [x] 4.1 Лейаут тахометра/архіву
  Files: new file: src/layouts/GsAppLayout.vue, src/App.vue
  Do: Перенеси поточний `q-layout`/`q-header` з `src/App.vue` сюди: кнопки «Тахометр» → `/projects/golden-sprints/app`, «Архів» → `/projects/golden-sprints/archive`. Логотип — `src/assets/site/logo-cyclepoint-header.png` (замість відсутнього `@/assets/img/cycle_point.jpg`). Кнопки «назад на сайт» не додавай.
  Done-when: App-chrome має лише Тахометр/Архів на нових шляхах; посилання на `@/assets/img/cycle_point.jpg` немає.

- [x] 4.2 Маршрути hash-router
  Files: src/router/index.ts
  Do: Залиш `createWebHashHistory(import.meta.env.BASE_URL)`. Зареєструй `/` HomePage (`meta.chrome: 'site'`), `/projects`, `/projects/golden-sprints`, `/projects/golden-sprints/app` → `TachometerPage` (`chrome: 'app'`), `/projects/golden-sprints/archive` → `ResultsArchivePage` (`chrome: 'app'`), `/projects/army-support`, `/workshop`, `/rental`, `/artifacts`, `/charity` (усі site). Додай `{ path: '/archive', redirect: '/projects/golden-sprints/archive' }`. Кореневий `/` більше не вантажить `TachometerPage`.
  Done-when: `src/router/index.ts` містить усі шляхи з Do; `/` не імпортує `TachometerPage`; `/archive` редіректить.

- [x] 4.3 Перемикання chrome в App
  Files: src/App.vue
  Do: За `route.meta.chrome` рендерь `SiteLayout` або `GsAppLayout` навколо `<router-view />`. Прибери з App старий toolbar «Тахометр»/«Архів».
  Done-when: На `/` видно site-хедер; на `/projects/golden-sprints/app` — GsAppLayout без пунктів Контакти/Проєкти.

- [x] 4.4 Скрол до контактів
  Files: src/router/index.ts
  Do: Додай `scrollBehavior`: якщо `to.hash === '#contacts'` (або `'contacts'`), поверни `{ el: '#contacts' }`; після навігації на `/` з цим hash секція з `id="contacts"` у в’юпорті. Окремого route `/contacts` не створюй.
  Done-when: З внутрішньої site-сторінки пункт Контакти відкриває головну і скролить до `#contacts`.

## 5. Головна

- [x] 5.1 Капсула подій
  Files: new file: src/components/home/HomeCapsuleEvents.vue, src/constants/site.ts
  Do: Фото `home-events-photo.png`, декор `deco-glasses.svg`, підпис «Актуальні події». Default: блюр 698×120 opacity 0.60 backdrop-blur 10px. Hover-in: пігулка 440×112 radius 100px border `1.5px solid rgba(255,255,255,0.2)` opacity 0.15 blur 10.35px, підпис 40px Bold `#d5f252`. Mouseleave → default (не фрейм 145:63). Клік — Instagram `INSTAGRAM_URL` з `rel="noopener noreferrer"`. При `prefers-reduced-motion: reduce` без анімації ширини.
  Done-when: Три стани (default / hover-in / mouseleave=default) і зовнішнє посилання відповідають Do.

- [x] 5.2 Капсула проєктів
  Files: new file: src/components/home/HomeCapsuleProjects.vue
  Do: Фото `home-projects-photo.png`, підпис «Проєкти». Default: блюр 699×120 opacity 0.20 blur 3.85px. Hover-in: пігулка 440×120 як у фреймі 145:118. Mouseleave: сховати блюр (фото повністю відкрите, підпис лишається) як фрейм 145:63. Клік → `/projects`. Reduced-motion — миттєвий стан.
  Done-when: Hover-out ховає overlay; клік відкриває `/projects`.

- [x] 5.3 Плитки сервісів
  Files: new file: src/components/home/HomeServiceTile.vue
  Do: Проп `to` + іконка + підпис 36px Bold `#1e1e1e`. Три інстанси на головній: Веломайстерня / `icon-workshop.png` → `/workshop`; Прокат / `icon-rental.png` → `/rental`; Артефакти / `icon-artifacts.svg` → `/artifacts`. Hover-стан не вигадуй.
  Done-when: Три плитки ведуть на відповідні маршрути з підписами з Do.

- [x] 5.4 Сторінка головної
  Files: new file: src/pages/HomePage.vue, src/content/home.ts
  Do: Desktop 1728: tiffany 480px (текст intro + капсула подій), green 480px (капсула проєктів + community), біла зона плиток, violet 480px з `id="contacts"` (мапа `map.png` 596×374, години/адреса/телефон/email з `src/content/home.ts`, іконка Instagram 50×50 без текстового URL). Копі буквальне, «Cб» латиницею.
  Done-when: На `/` є всі п’ять регіонів; `#contacts` існує; тексти збігаються з `src/content/home.ts`.

## 6. Проєкти

- [x] 6.1 Ряд проєкту
  Files: new file: src/components/projects/ProjectRow.vue
  Do: Горизонтальний ряд: фото, title 36px Light, body 20px, лінк «Читати далі...» (три крапки `.`, 24px Light `#1e1e1e`) на `to`. Фон ряду `#e7fc84`.
  Done-when: Компонент рендерить фото, заголовок, опис і «Читати далі...» як RouterLink.

- [x] 6.2 Перелік проєктів
  Files: new file: src/pages/ProjectsPage.vue, src/content/projects.ts
  Do: Дві зелені смуги: Golden sprints (`gs-thumb.png`, маркований список з content, «Читати далі...» → `/projects/golden-sprints`); Допомога армії (`army-thumb.png`, абзац з content, «Читати далі...» → `/projects/army-support`). Заголовок хедера «Проєкти».
  Done-when: Обидва ряди на `/projects` ведуть на вказані маршрути; текст «Читати далі...» з трьома крапками `.`.

- [x] 6.3 Деталка Golden Sprints
  Files: new file: src/pages/GoldenSprintsPage.vue, src/content/projects.ts
  Do: Фон violet `rgba(46,11,100,0.5)`, фото `gs-detail-photo.png` 516×682 зліва, H1 «Golden sprints» 96px Light `#e7fc84`, абзац 20px `#e7fc84` з content (фраза про Жіночий велоклуб без правок). Під абзацом документований лінк «Читати далі...» 24px Light `#e7fc84` → `/projects/golden-sprints/app`. Інших CTA на archive/app не додавай. Футер без ©.
  Done-when: Сторінка `/projects/golden-sprints` має копі з content і єдине вигадане посилання на app кольором `#e7fc84`.

- [x] 6.4 Порожня допомога армії
  Files: new file: src/pages/ArmySupportPage.vue
  Do: Site chrome із заголовком «Проєкти», зелена смуга 1728×480 без тексту, фото й карток. Placeholder-контент не додавай. Футер без ©.
  Done-when: `/projects/army-support` не містить абзаців і зображень проєкту під хедером.

## 7. Майстерня, прокат, артефакти, благодійність

- [x] 7.1 Майстерня
  Files: new file: src/pages/WorkshopPage.vue, src/content/workshop.ts, src/constants/site.ts
  Do: Зелена смуга, заголовок «Майстерня». Виведи копі з content: «Послуги майстерні», клікабельний `INSTAGRAM_URL` (`target="_blank"` `rel="noopener noreferrer"`), речення про послуги, рядки «записатися можна зателефонувавши, через інст і тд» та «ексель та опис». Прайс/таблицю/форму не додавай. Футер без ©.
  Done-when: На `/workshop` є «ексель та опис» і клікабельний Instagram URL; таблиці послуг немає.

- [x] 7.2 Прокат
  Files: new file: src/components/rental/RentalBike.vue, new file: src/pages/RentalPage.vue, src/content/rental.ts
  Do: Intro «Послуги прокату» з content (згадка Діректу). П’ять рядів з фото `rental-*.png` і specs: Trek MultiTrack; Cannondale H400 без рядка передач; VanMoof; Cycle Point bike; Cuda Atom розмір `???`. Назви 48px Light `#e7fc84`, specs 36px Light `#e7fc84`. Форми бронювання не додавай.
  Done-when: `/rental` показує 5 велосипедів у цьому порядку; форми заявки немає; у Cannondale немає рядка трансмісії.

- [x] 7.3 Артефакти
  Files: new file: src/components/artifacts/ArtifactRow.vue, new file: src/pages/ArtifactsPage.vue, src/content/artifacts.ts
  Do: Десять рядів, що чергують green/tiffany, фото `artifact-01-crest.png` … `artifact-10-lucas.png` (~400×392), текст 24px `#1e1e1e` з content. Заголовок «Артефакти велоточки». Не підміняй фото іншими знімками. Футер без ©.
  Done-when: `/artifacts` має 10 рядів з локальних png і текстом, що містить «прстору» у рядку Данила.

- [x] 7.4 Благодійність
  Files: new file: src/pages/CharityPage.vue
  Do: Заголовок «Допомогти Велоточці», green 1440px з QR `charity-qr.png` по центру, порожня violet 480px без контактів. Тексту в body, кнопок оплати й форм немає. Футер з ©.
  Done-when: `/charity` показує лише QR у зеленій смузі; violet порожня; платіжних елементів немає.

## 8. Адаптив (inferred)

- [x] 8.1 Мобільний stacking без окремого sitemap
  Files: src/style.css, src/layouts/SiteLayout.vue, src/pages/HomePage.vue, src/pages/ProjectsPage.vue, src/pages/GoldenSprintsPage.vue, src/pages/RentalPage.vue, src/pages/ArtifactsPage.vue
  Do: Нижче 1728px складай колонки стопкою (текст під фото, капсули на повну ширину, nav хедера з переносом або стеком), зберігай порядок регіонів desktop. Нових маршрутів і вигаданих мобільних екранів не створюй.
  Done-when: На ширині ~390px регіони головної йдуть у тому ж порядку, що на desktop; кількість маршрутів у `src/router/index.ts` не збільшилась.

## 9. Перевірки

- [x] 9.1 Typecheck
  Files: src/router/index.ts, src/App.vue, src/main.ts
  Do: Запусти `npm run typecheck`. Виправ лише помилки типів, що блокують цю зміну (імпорти сторінок, meta chrome, ассети).
  Done-when: `npm run typecheck` завершується з кодом 0.

- [x] 9.2 Production build
  Files: src/router/index.ts, src/App.vue, vite.config.ts
  Do: Запусти `npm run build`. `base` у `vite.config.ts` лишається `/C-Y-C-L-E-_-P-O-I-N-T/`.
  Done-when: `npm run build` завершується з кодом 0.
