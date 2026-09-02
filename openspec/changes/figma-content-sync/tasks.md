## 1. Сірі заголовки секції в хедері

- [ ] 1.1 Рендерити заголовок секції біля логотипа
  Files: src/components/site/SiteHeader.vue
  Do: Імпортуй `useRoute` і покажи текст біля `SiteLogo` класом `.site-header__section`: колір `var(--color-section-title)`, кегль `var(--text-section-title)`, `font-weight: var(--font-weight-light)`. Мапа: `/` — не рендерити; будь-який `/projects*` зі site chrome — `Проєкти`; `/events` — `Події та новини`; `/workshop` — `Майстерня`; `/artifacts` — `Артефакти Велоточки`; `/rental` — `Прокат`; `/charity` — `Допомогти Велоточці`. Не міняй `@media (max-width: 1279px)` хедера і не повертай `1727px`.
  Done-when: На `/events` у хедері є «Події та новини»; на `/` елемента `.site-header__section` немає; на `/artifacts` текст рівно «Артефакти Велоточки»; у файлі немає `1727px`.

## 2. Події

- [ ] 2.1 Замінити заголовок сторінки подій
  Files: src/content/events.ts
  Do: Постав `eventsCopy.heading` рівно на `Всі актуальні новини та події зібрані у нашому інстаграмі. Запрошуємо підписатись!`. Не редагуй `src/content/home.ts` і не змінюй `homeCapsuleLabels.events`.
  Done-when: У `events.ts` немає рядка `Актуальні події`; у `src/content/home.ts` лишається `events: 'Актуальні події'`.

- [ ] 2.2 Не чіпати embed і лінк на EventsPage
  Files: src/pages/EventsPage.vue
  Do: Залиш `<a>` з `EVENTS_INSTAGRAM_URL`, `target="_blank"`, `rel="noopener noreferrer"` і iframe з `EVENTS_INSTAGRAM_EMBED_SRC` / `useEmbedReady`. Не змінюй `src` iframe і не міняй `@media (max-width: 1279px)` padding.
  Done-when: У файлі є `EVENTS_INSTAGRAM_URL` і `EVENTS_INSTAGRAM_EMBED_SRC`; немає `1727px`; heading береться з `eventsCopy.heading`.

## 3. Перелік проєктів

- [ ] 3.1 Один пробіл у абзаці допомоги армії
  Files: src/content/projects.ts
  Do: У `armySupportList.body` заміни `Cycle Point  регулярно` (два пробіли) на `Cycle Point регулярно` (один). Не змінюй `goldenSprintsList.items` (склеєне `івентів.Про команду` лишається). Не додавай третій проєкт.
  Done-when: У файлі є `Cycle Point регулярно співпрацює`; немає `Cycle Point  регулярно`; масив `goldenSprintsList.items` має три елементи як зараз.

- [ ] 3.2 Замінити байти `army-thumb.png`
  Files: src/assets/site/army-thumb.png
  Do: Перезапиши файл байтами кропу Figma node `303:5` (чорно-білий чоловік в окулярах, футболка 13/герб/12, мікрофон) з `openspec/changes/figma-content-sync/assets/army-thumb.png`. Якщо dump-файлу немає — не вигадуй PNG і не викликай Figma MCP. Не чіпай `src/assets/site/gs-thumb.png`.
  Done-when: `src/assets/site/army-thumb.png` існує; його SHA256 відрізняється від `gs-thumb.png`; у `.vue` немає URL `figma.com` для цього фото.

- [ ] 3.3 Не додавати картку Фішки в перелік
  Files: src/pages/ProjectsPage.vue
  Do: Залиш рівно два `ProjectRow` (GS і army). Не додавай третій ряд, не імпортуй Фішки, не міняй `@media` padding/`projects__rule`.
  Done-when: У файлі рівно два `<ProjectRow`; немає `fishky`; немає `1727px`.

## 4. «< Назад» і деталка армії

- [ ] 4.1 Додати `SiteBackLink`
  Files: new file: src/components/site/SiteBackLink.vue
  Do: Створи Vue 3 `<script setup lang="ts">` компонент: `RouterLink` на `/projects`, видимий текст рівно `< Назад`, 24px Light (`var(--text-read-more)`, `var(--font-weight-light)`). Prop `tone: 'violet' | 'lime'`: `violet` → `color: rgba(231, 252, 132, 0.5)`; `lime` → `color: var(--color-fg)`. Без коментарів, без Options API.
  Done-when: Файл експортує лінк `to="/projects"` з текстом `< Назад` і двома класами тону.

- [ ] 4.2 Назад на Golden Sprints, CTA лишити
  Files: src/pages/GoldenSprintsPage.vue
  Do: Імпортуй `SiteBackLink` і встав `<SiteBackLink tone="violet" />` першим елементом `.gs__copy` (перед h1). Існуючий `RouterLink.gs__more` на `/projects/golden-sprints/app` з `readMoreLabel` не видаляй. Не міняй `@media (max-width: 767px)` і копі «Жіночий велоклуб».
  Done-when: У шаблоні є `SiteBackLink` з `tone="violet"` і `to="/projects/golden-sprints/app"`; немає `1727px`.

- [ ] 4.3 Новий заголовок army в контенті
  Files: src/content/armySupport.ts
  Do: Постав `armySupportCopy.heading` рівно на `Результати допомоги армії з моменту відкриття Велоточки`.
  Done-when: У файлі немає `Результати благодійності`; є новий рядок заголовка повністю.

- [ ] 4.4 Army: title iframe, назад, той самий sheet src
  Files: src/pages/ArmySupportPage.vue
  Do: Імпортуй `SiteBackLink` і постав `<SiteBackLink tone="lime" />` після `SitePagePreloader`, перед h1. Атрибут `title` iframe постав у `armySupportCopy.heading`. Не змінюй імпорт/`src` `CHARITY_RESULTS_SHEET_SRC` і не міняй `@media (max-width: 1279px)` padding.
  Done-when: Є `SiteBackLink` з `tone="lime"`; `title` iframe прив’язаний до `armySupportCopy.heading`; рядок `CHARITY_RESULTS_SHEET_SRC` лишається; немає `1727px`.

## 5. Фішки велодоріжки

- [ ] 5.1 Модуль копі Фішок
  Files: new file: src/content/fishkyVelodorizhky.ts
  Do: Експортуй `fishkyVelodorizhky` з `title: 'Фішки велодоріжки'` і `paragraphs` з рівно чотирьох рядків (порожній рядок між ними робить сторінка): `«Фішки велодоріжки» — соціально-урбаністичний медіапроєкт незалежного велохабу «Велоточка» про Київ очима жінок-велосипедисток.`; `Ми досліджуємо, наскільки Київ зручний і безпечний для велосипедисток, через їхній щоденний досвід: від запаркованих велосмуг і відсутніх з’їздів до складних перехресть, мостів та обривів велодоріжок. У легкому й іронічному форматі створюємо 10 коротких відео з реальними історіями, коментарями експертів, міжнародним досвідом та поглядом студентської молоді.`; `Результатом стане інтерактивна мапа велоінфраструктури Києва, де глядачі зможуть оцінювати проблемні локації, а також публічна презентація та дискусія в Ukrainian-Danish Youth House.`; `Проєкт має на меті зробити жіночий велорух більш видимим, привернути увагу до безпеки та доступності міста й об’єднати досвід велосипедисток, урбаністів, архітекторів та молоді навколо ідеї безпечного та справедливого міста для всіх.`
  Done-when: Файл експортує `title` і масив `paragraphs.length === 4`; перший абзац починається з `«Фішки велодоріжки»`.

- [ ] 5.2 Фото мапи Фішок
  Files: new file: src/assets/site/fishky-velodorizhky-photo.png
  Do: Скопіюй PNG кропу Figma node `260:78` (ілюстрація мапи Києва) з `openspec/changes/figma-content-sync/assets/fishky-velodorizhky-photo.png` у `src/assets/site/fishky-velodorizhky-photo.png`. Якщо dump немає — не вигадуй байти і не викликай Figma MCP.
  Done-when: Файл `src/assets/site/fishky-velodorizhky-photo.png` існує і не є порожнім.

- [ ] 5.3 Сторінка Фішок за патерном GS
  Files: new file: src/pages/FishkyVelodorizhkyPage.vue
  Do: Збери `<script setup lang="ts">` сторінку як клон сітки `GoldenSprintsPage.vue`: тло `var(--color-violet)`, фото зліва `width="516"` `height="682"` з `@/assets/site/fishky-velodorizhky-photo.png`, h1 `fishkyVelodorizhky.title` 96px Light `#e7fc84` (`var(--text-h1-display)`), чотири `<p>` з `paragraphs` кеглем `var(--text-body)` 24px Regular `#e7fc84` (не `var(--text-project-body)`), `<SiteBackLink tone="violet" />` першим у колонці копі. Не додавай «Читати далі...» на app. Phone-стек лиши на `@media (max-width: 767px)` як у GS.
  Done-when: Сторінка імпортує `fishkyVelodorizhky` і `SiteBackLink`; у стилях абзаців є `--text-body` і немає `--text-project-body`; немає лінка на `/projects/golden-sprints/app`.

- [ ] 5.4 Зареєструвати hash-маршрут
  Files: src/router/index.ts
  Do: Після запису `/projects/army-support` додай `{ path: '/projects/fishky-velodorizhky', component: () => import('../pages/FishkyVelodorizhkyPage.vue'), meta: { chrome: 'site' } }`. Інших нових `path` не додавай. Не чіпай `SiteNav.vue`.
  Done-when: У `routes` є рівно один новий path `/projects/fishky-velodorizhky` з `chrome: 'site'`; у `src/components/site/SiteNav.vue` немає `fishky`.

## 6. Майстерня

- [ ] 6.1 Копі майстерні під Figma 71:12
  Files: src/content/workshop.ts
  Do: Постав `heading` на `Послуги майстерні Велоточки`. Додай `instagramContact: 'Можна звʼязатися через інстаграм майстерні'`. Видали поля `instagramLabel` і `servicesIntro`. Поле `bookingNote` залиш у об’єкті без змін.
  Done-when: Є `heading` і `instagramContact`; немає `instagramLabel` і `servicesIntro`; `bookingNote` лишається.

- [ ] 6.2 Рядок іконка+текст замість URL-лейбла
  Files: src/pages/WorkshopPage.vue
  Do: Залиш h1 з `workshopCopy.heading`. Заміни лінк `.workshop__url` на один `<a>` (`INSTAGRAM_URL`, `target="_blank"`, `rel="noopener noreferrer"`) з `<img>` `@/assets/site/icon-instagram.svg` 50×50 і `<span>` `workshopCopy.instagramContact` 32px Light (`var(--text-contact-title)`). Прибери рендер `instagramLabel` і `servicesIntro`. `bookingNote` не рендерь. Не змінюй `WORKSHOP_PRICE_SHEET_SRC` і `@media (max-width: 1279px)` / `767px` padding секції.
  Done-when: У шаблоні є іконка 50×50 і `instagramContact`; немає `workshopCopy.instagramLabel` і `workshopCopy.servicesIntro`; iframe `src` лишається з `WORKSHOP_PRICE_SHEET_SRC`; немає `1727px`.

## 7. Унікальні фото артефактів

- [ ] 7.1 Замінити байти десяти PNG
  Files: src/assets/site/artifact-01-crest.png, src/assets/site/artifact-02-colossi.png, src/assets/site/artifact-03-colnago.png, src/assets/site/artifact-04-harry-hall.png, src/assets/site/artifact-05-danylo.png, src/assets/site/artifact-06-kokkedal.png, src/assets/site/artifact-07-bag.png, src/assets/site/artifact-08-gemu.png, src/assets/site/artifact-09-helmets.png, src/assets/site/artifact-10-lucas.png
  Do: Перезапиши кожен файл відповідним dump з `openspec/changes/figma-content-sync/assets/` (ті самі імена). Джерела Figma: `01` ← ~293:7 IMG_3987 герб/номерки; `02` ← ~295:9 IMG_3977 Colossi; `03` ← ~293:6 IMG_3974 Colnago; `04` ← ~295:8 IMG_3975 Harry Hall; `05` ← ~295:15 IMG_3976 Danylo; `06` ← ~295:14 IMG_3978 Kokkedal; `07` ← ~289:132 IMG_3979 сумка; `08` ← ~288:126 IMG_3984 GEMU; `09` ← ~288:131 IMG_3973 шоломи; `10` ← ~293:4 IMG_3973 2 Lucas. Якщо dump немає — не вигадуй PNG і не став MCP URL. Не редагуй `src/content/artifacts.ts` і `src/pages/ArtifactsPage.vue` імпорти.
  Done-when: SHA256 усіх десяти файлів не всі однакові (не спільний placeholder); у `src/content/artifacts.ts` лишаються «прстору» і «сиділ»; у `ArtifactsPage.vue` немає `figma.com`.

## 8. Скоуп і збірка

- [ ] 8.1 Не відкочувати layout CSS і non-goals
  Files: src/pages/EventsPage.vue, src/pages/WorkshopPage.vue, src/pages/ProjectsPage.vue, src/pages/ArmySupportPage.vue, src/components/artifacts/ArtifactRow.vue, src/components/site/SiteHeader.vue, src/content/home.ts, src/components/site/SiteNav.vue
  Do: Перевір diff: немає повернення `1727px`; `ArtifactRow.vue` не змінений цією зміною; `home.ts` капсула `Актуальні події` на місці; `SiteNav.vue` без Прокат/Артефакти/Фішки. Не коміть файли `openspec/changes/responsive-marketing-layout/`.
  Done-when: `git diff -- src/components/artifacts/ArtifactRow.vue src/content/home.ts src/components/site/SiteNav.vue` порожній відносно початку apply (або лише невід’ємні зміни, яких немає); у перелічених page/header файлах немає `1727px`.

- [ ] 8.2 Typecheck і build
  Files: package.json
  Do: Запусти `npm run typecheck`, після успіху — `npm run build`.
  Done-when: Обидві команди завершуються з кодом 0.
