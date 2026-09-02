# Design Brief

**Change:** figma-content-sync
**Captured:** 2026-09-02

## Source metadata

| Field | Value |
|-------|-------|
| Source type | figma-mcp |
| Origin | https://www.figma.com/design/5SDp4Vg9fHdWGWaOJAhxZ3/cyclopoint-site--Copy- |
| File key / ID | `5SDp4Vg9fHdWGWaOJAhxZ3` |
| File name | cyclopoint-site (Copy) |
| Page | `0:1` Page 1 |
| Capture date | 2026-09-02 |
| Captured by | design-intake (Figma MCP `plugin-figma-figma`, authenticated) |
| Related intake skill | figma-intake |
| Figma variables | `get_variable_defs` на `71:12` повернув порожній об’єкт — токени з fills/type у `get_design_context` |

### Node IDs used

**Іменовані PNG-кропи (apply копіює ці файли):**

| dest filename | Figma nodeId (факт) | Figma name | Розмір експорту |
|---|---|---|---|
| `army-thumb.png` | `303:5` | R1-02188-0050 1 | 175×235 |
| `fishky-velodorizhky-photo.png` | `260:78` | голден спрінтс фото | 516×682 |
| `artifact-01-crest.png` | `293:7` | IMG_3987 2 | 400×392 |
| `artifact-02-colossi.png` | `295:9` | IMG_3977 1 | 400×392 |
| `artifact-03-colnago.png` | `293:6` | IMG_3974 1 | 400×392 |
| `artifact-04-harry-hall.png` | `295:8` | IMG_3975 1 | 400×392 |
| `artifact-05-danylo.png` | `295:15` | IMG_3976 1 | 400×392 |
| `artifact-06-kokkedal.png` | `295:14` | IMG_3978 1 | 400×392 |
| `artifact-07-bag.png` | `289:132` | IMG_3979 1 | 400×392 |
| `artifact-08-gemu.png` | `288:126` | IMG_3984 1 | 401×392 |
| `artifact-09-helmets.png` | `288:131` | IMG_3973 1 | 400×392 |
| `artifact-10-lucas.png` | `293:4` | IMG_3973 2 | 400×392 |

Усі 12 id зі спеки/tasks збіглися з іменованими шарами. Дубль герба `293:5` (IMG_3987 1) не експортовано — джерело apply: `293:7`. `gs-thumb.png` / `121:49` не чіпати. `icon-instagram.svg` не замінювати.

**Екрани / копі / хедер (контекст apply, не заміна іменованих PNG):**

| Призначення | Node | Ім’я |
|---|---|---|
| Події | `299:70` | Події та новини (1728×1231) |
| Заголовок-лінк подій | `299:73` | текст Instagram-запрошення |
| Embed-плейсхолдер подій | `299:74` | image 2 (1178×764) |
| Перелік проєктів | `71:208` | Проєкти (1728×1044) |
| Army thumb у переліку | `303:5` | (той самий кроп) |
| GS thumb у переліку | `121:49` | голден спрінтс фото — **не дампати** |
| Деталка армії | `71:93` | допомога армії (1728×1231) |
| Заголовок армії | `260:99` | Результати допомоги… |
| Sheet-плейсхолдер армії | `260:110` | image 2 |
| Back-лінк армії (лайм) | `299:63` | `< Назад` |
| Фішки | `260:71` | Фішки велодоріжки (1728×1130) |
| Заголовок Фішок | `260:77` | Фішки велодоріжки |
| Чотири абзаци | `260:76` | один TEXT з порожніми рядками |
| Фото-мапа | `260:78` | 516×682 |
| Back-лінк Фішок (violet) | `299:68` | `< Назад` |
| Golden Sprints (клон-патерн) | `93:154` | Golden sprints |
| Back-лінк GS (violet) | `299:64` | `< Назад` |
| Майстерня | `71:12` | Майстерня (1728×1397) |
| h1 майстерні | `104:3` | Послуги майстерні Велоточки |
| Фраза IG | `297:18` | Можна звʼязатися через інстаграм майстерні |
| Іконка IG 50×50 | `297:16` | instqr icon |
| Артефакти | `213:2` | Артефакти (1728×6314) |
| Сірий заголовок артефактів | `213:39` | Артефакти Велоточки |
| Сірий заголовок подій | `299:77` | Події та новини |
| Сірий заголовок проєктів | `76:233` / `71:107` / `260:81` / `93:177` | Проєкти |
| Сірий заголовок майстерні | `76:232` | Майстерня |
| Сірий заголовок прокату | `127:137` | Прокат (фрейм `127:118`) |
| Сірий заголовок благодійності | `186:114` | Допомогти Велоточці (фрейм `186:43`) |

## Structure

### Layout hierarchy (екрани цієї зміни)

Десктопні фрейми в Figma — **1728 px** завширшки, білий хедер 78 px + кольорова смуга. **Не відкочувати** існуючий layout CSS до `1727px`; медіа `1279px` / `767px` не чіпати. Лейаут — поза скоупом apply.

1. **Хедер (усі внутрішні сторінки)** — біла смуга 78 px: логотип 385×60 (`лого-60 1`) зліва; сірий заголовок секції 36px Light `rgba(30,30,30,0.4)` біля лого; нав справа: Контакти / Проєкти / Майстерня / Події (16px Helvetica Neue Medium `#1e1e1e`); кнопка Благодійність 152×40 `#90dcbc` rounded 60px; `UA|ENG`. **У нав немає** Прокат / Артефакти / Фішки.

2. **`/events` (`299:70`)** — лайм `#e7fc84`; h1-лінк `299:73` 36px Light `#1e1e1e` рівно: «Всі актуальні новини та події зібрані у нашому інстаграмі. Запрошуємо підписатись!». У Figma це **звичайний текст**, не прототип-лінк — apply все одно обгортає в `<a>` на `https://www.instagram.com/cyclepoint_kyiv/`. Нижче iframe 1178×764; **`src` iframe не змінювати**.

3. **`/projects` (`71:208`)** — лайм; **два** ряди (GS + Допомога армії). Третя лаймова смуга `303:4` (y=939) у макеті порожня — **не** картка Фішок. Кожен ряд: фото зліва, title 36px Light `#1e1e1e`, тіло 20px Regular чорний, «Читати далі...» 24px Light `#1e1e1e` (три крапки `.`). GS-копі лишає склеєне «івентів.Про команду». Абзац армії в Figma має **два** пробіли після «Cycle Point» (`79:77`); apply **згортає до одного** за спекою.

4. **`/projects/army-support` (`71:93`)** — лайм `#e7fc84` (поверх застарілого tiffany `71:100`); «`< Назад`» `299:63` 24px Light; h1 `260:99` 36px Light `#1e1e1e`: «Результати допомоги армії з моменту відкриття Велоточки»; той самий Google Sheet iframe (`src` не змінювати), `title` = цей самий рядок.

5. **`/projects/fishky-velodorizhky` (`260:71`)** — клон GS (`93:154`): violet `rgba(46,11,100,0.5)`; фото зліва **516×682**; title 96px Light `#e7fc84`; чотири `<p>` 24px Regular `#e7fc84` з порожнім рядком між ними (у Figma `260:76` — один TEXT з blank paragraphs); «`< Назад`» `299:68` 24px Light `rgba(231,252,132,0.5)`. Немає картки в переліку, пункту SiteNav, плитки на головній.

6. **`/workshop` (`71:12`)** — лайм; h1 `104:3` 36px Light `#1e1e1e`: «Послуги майстерні Велоточки»; один рядок-лінк: іконка `297:16` **50×50** + span `297:18` 32px Light `#1e1e1e` «Можна звʼязатися через інстаграм майстерні» (апостроф U+02BC) на `INSTAGRAM_URL`. Немає видимого лейбла «Instagram», `servicesIntro`, `bookingNote` у шаблоні. Iframe прейскуранту — `src` не змінювати. Іконку **не** експортувати з Figma — лишається існуючий `icon-instagram.svg`.

7. **`/artifacts` (`213:2`)** — чергування green `#e7fc84` / tiffany `#b7f1d8` смуг ~624 px; 10 рядів фото 400×392 зліва + копі справа. Копі в `src/content/artifacts.ts` **не змінювати** (включно з «прстору» / «сиділ»). Лише байти PNG.

### Мапа сірих заголовків хедера

| path | Текст у Figma | Node |
|---|---|---|
| `/` | у макеті головної є «Велоточка» (`260:91`) | **продукт: не рендерити** заголовок секції |
| `/events` | Події та новини | `299:77` |
| `/projects` і всі `/projects/*` з `chrome: 'site'` | Проєкти (у Фішках/GS у Figma хвіст пробілу «Проєкти ») | `76:233` / `71:107` / `260:81` / `93:177` |
| `/workshop` | Майстерня | `76:232` |
| `/artifacts` | Артефакти Велоточки | `213:39` |
| `/rental` | Прокат | `127:137` |
| `/charity` | Допомогти Велоточці | `186:114` |

Колір заголовка секції: `rgba(30,30,30,0.4)`, 36px Helvetica Light. Мапінг на існуючі `--color-section-title` / `--text-section-title` / `--font-weight-light`.

### Back-лінки

Текст рівно `< Назад` (символ `<` + пробіл + Назад). 24px Helvetica Light. На переліку `/projects` **немає**.

| Екран | Node | Figma fill (виміряно) | Тон apply (spec / design.md) |
|---|---|---|---|
| GS `93:154` | `299:64` | `rgba(231,252,132,0.5)` | violet |
| Фішки `260:71` | `299:68` | `rgba(231,252,132,0.5)` | violet |
| Армія `71:93` | `299:63` | `rgba(30,30,30,0.4)` | lime → **`#1e1e1e`** (`var(--color-fg)`), не секційний 0.4 |

На GS «`< Назад`» **додатково** до існуючого «Читати далі...» на app.

### Чотири абзаци Фішок (`260:76`, exact)

1. «Фішки велодоріжки» — соціально-урбаністичний медіапроєкт незалежного велохабу «Велоточка» про Київ очима жінок-велосипедисток.
2. Ми досліджуємо, наскільки Київ зручний і безпечний для велосипедисток, через їхній щоденний досвід: від запаркованих велосмуг і відсутніх з’їздів до складних перехресть, мостів та обривів велодоріжок. У легкому й іронічному форматі створюємо 10 коротких відео з реальними історіями, коментарями експертів, міжнародним досвідом та поглядом студентської молоді.
3. Результатом стане інтерактивна мапа велоінфраструктури Києва, де глядачі зможуть оцінювати проблемні локації, а також публічна презентація та дискусія в Ukrainian-Danish Youth House.
4. Проєкт має на меті зробити жіночий велорух більш видимим, привернути увагу до безпеки та доступності міста й об’єднати досвід велосипедисток, урбаністів, архітекторів та молоді навколо ідеї безпечного та справедливого міста для всіх.

### Breakpoints

| Name | Width | Notes |
|------|-------|-------|
| Figma desktop | 1728 | усі захоплені фрейми |
| Продукт | існуючі `@media (max-width: 1279px)` / `767px` | **не змінювати** у цій зміні |

### Component inventory

| Name in design | Maps to | Variants / states |
|----------------|---------|-------------------|
| Сірий заголовок секції | `SiteHeader` + `useRoute()` | одна мапа path→title; `/` без елемента |
| `< Назад` | `SiteBackLink.vue` | `tone: 'violet' \| 'lime'` |
| Ряд проєкту | існуючий `ProjectRow` | рівно два ряди |
| Фішки деталка | клон `GoldenSprintsPage` | фото 516×682, body 24px (не 20px GS) |
| Рядок IG майстерні | `<a class="workshop__contact">` | img 50×50 + span 32px Light |
| Артефакт | існуючий `ArtifactRow` | лише нові байти PNG; SFC не чіпати |
| Instagram events heading | `<a>` на `EVENTS_INSTAGRAM_URL` | iframe src без змін |

## Tokens

Існуючі CSS-змінні сайту. Нових layout-токенів не вигадувати.

### Color

| Token / роль | Value | Role | Confidence |
|-------|-------|------|------------|
| лайм / green back | `#e7fc84` | фон events, projects, army, workshop, зелені смуги артефактів | exact (MCP) |
| violet back | `rgba(46,11,100,0.5)` | фон GS і Фішок | exact |
| `--color-fg` / текст на лаймі | `#1e1e1e` | h1 events/workshop/army, body на лаймі, lime back-лінк (spec) | exact fill; back-лінк армії — див. Confidence |
| текст на violet | `#e7fc84` | title 96px + body Фішок/GS | exact |
| violet back-лінк | `rgba(231,252,132,0.5)` | `< Назад` на GS і Фішках | exact |
| `--color-section-title` | `rgba(30,30,30,0.4)` | сірий заголовок хедера | exact |
| tiffany back | `#b7f1d8` | парні смуги артефактів | exact |
| кнопка благодійність | `#90dcbc` фон, текст `#e7fc84` | хедер; **поза скоупом** цієї зміни | exact |
| хедер фон | `#ffffff` | 78 px | exact |

### Typography

Helvetica / Helvetica Neue в Figma. У продукті — існуючі font tokens, не підключати нові файли шрифтів у цій зміні.

| Usage | Figma | Продуктовий токен (орієнтир) |
|-------|-------|------------------------------|
| Заголовок секції хедера | 36px Light, `rgba(30,30,30,0.4)` | `--text-section-title` + `--font-weight-light` |
| h1 events / workshop / army | 36px Light `#1e1e1e` | `--text-section-title` |
| Title Фішок / GS | 96px Light `#e7fc84` | `--text-h1-display` |
| Body Фішок | **24px Regular `#e7fc84`** | `--text-body` (**не** `--text-project-body` 20px) |
| Body GS | 20px Regular `#e7fc84` | існуючий GS (цю зміну не переписувати) |
| Body переліку проєктів | 20px Regular `#000000` | як є |
| «Читати далі...» / `< Назад` | 24px Light | `--text-read-more` + `--font-weight-light` |
| Фраза IG майстерні | 32px Light `#1e1e1e` | `--text-contact-title` |
| Нав хедера | 16px Helvetica Neue Medium `#1e1e1e` | існуючий SiteNav |

### Spacing / radii / shadows

- Хедер 78 px; контентний лівий край у макеті ~149 px від краю 1728-фрейма.
- Фото Фішок: 516×682, top 194 (як GS).
- Іконка IG майстерні: 50×50, top 351; текст контакту x=332.
- Кнопка благодійність: radius 60 px — **не чіпати** у цій зміні.
- Тіней на цих екранах немає.
- **Не вигадувати** padding/media, які відкотять `responsive-marketing-layout`.

## Reference images

Усі файли лежать у `openspec/changes/figma-content-sync/assets/`. Apply копіює **лише іменовані кропи** (перша таблиця) → `src/assets/site/<filename>`. Скріни екранів — QA-референс, не runtime.

| File | State / breakpoint | Notes |
|------|--------------------|-------|
| `assets/army-thumb.png` | apply dest | B&W чоловік, окуляри, футболка 13/герб/12, мікрофон. Node `303:5`, 175×235. |
| `assets/fishky-velodorizhky-photo.png` | apply dest | Ілюстрація мапи Києва (метро-лінії + орієнтири). Node `260:78`, 516×682. |
| `assets/artifact-01-crest.png` | apply dest | Герб/номерки (IMG_3987 2). Node `293:7`, 400×392. |
| `assets/artifact-02-colossi.png` | apply dest | Сира/нефарбована рама в майстерні (IMG_3977, ряд Colossi). Node `295:9`. |
| `assets/artifact-03-colnago.png` | apply dest | Червона рама COLNAGO + конюшина (IMG_3974). Node `293:6`. |
| `assets/artifact-04-harry-hall.png` | apply dest | Червона рама HARRY HALL (IMG_3975). Node `295:8`. |
| `assets/artifact-05-danylo.png` | apply dest | Металева рама в майстерні (IMG_3976, ряд Данила). Node `295:15`. |
| `assets/artifact-06-kokkedal.png` | apply dest | Жовто-помаранчева рама у кадрі (IMG_3978, ряд Kokkedal). Node `295:14`. |
| `assets/artifact-07-bag.png` | apply dest | Чорна сумка Chicago Drive / Kentwood (IMG_3979). Node `289:132`. |
| `assets/artifact-08-gemu.png` | apply dest | Олива + патч «ПАНЧ» / монстр (IMG_3984 GEMU). Node `288:126`, 401×392. |
| `assets/artifact-09-helmets.png` | apply dest | Стос шоломів UVEX/SCOTT (IMG_3973 1). Node `288:131`. |
| `assets/artifact-10-lucas.png` | apply dest | Кроп шолома (IMG_3973 2, ряд Лукаса). Node `293:4`. Унікальні байти vs 09. |
| `assets/events-page.png` | QA / desktop | Фрейм `299:70`: заголовок + IG embed `@cyclepoint_kyiv`. |
| `assets/projects-list.png` | QA / desktop | Фрейм `71:208`: два ряди, без картки Фішок. |
| `assets/army-detail.png` | QA / desktop | Фрейм `71:93`: `< Назад` + заголовок + таблиця. |
| `assets/fishky-detail.png` | QA / desktop | Фрейм `260:71`: мапа + 96px title + 4 абзаци + `< Назад`. |
| `assets/workshop-page.png` | QA / desktop | Фрейм `71:12`: h1 + IG 50×50 + фраза + sheet. |

Усі 17 файлів — валідні PNG (сигнатура `\x89PNG`), ненульові, унікальні SHA-256.

## Constraints

**Стек apply:** Vue 3 `<script setup lang="ts">` + Quasar, hash-router, без Pinia, без Axios, без Options API, без коментарів у коді.

**Must match:**

- Apply копіює `openspec/changes/figma-content-sync/assets/<filename>` → `src/assets/site/<filename>` для 12 іменованих PNG. Без live Figma MCP під час apply. Пікселі не вигадувати.
- Копі: events heading; army heading + iframe title; workshop heading + `instagramContact`; Fishky `title` + 4 абзаци; один пробіл у army list body.
- Back-лінк: violet `rgba(231,252,132,0.5)` на GS і Фішках; lime `#1e1e1e` на army (spec), навіть якщо Figma `299:63` світліший.
- Хедер: повна мапа сірих заголовків вище; `/` без заголовка.
- Іконка майстерні: існуючий `src/assets/site/icon-instagram.svg`, розмір 50×50.

**Out of scope / approximate OK:**

- Layout CSS overlapping-файлів (`1727px` не повертати; `max-width: 1279px` / `767px` не прибирати).
- SiteNav: не додавати Прокат / Артефакти / Фішки.
- Не змінювати iframe `src` (events embed, workshop sheet, army sheet).
- Не чіпати `gs-thumb.png`, GS-копі (включно з «івентів.Про команду»), `home.ts` капсулу «Актуальні події», rental/charity контент сторінок, `ArtifactRow.vue`, i18n.
- Третя порожня лаймова смуга `303:4` на `71:208` — не імплементувати як третій проєкт.
- Ховер капсул, `transform: scale`, GS app/archive/BLE.

## Confidence notes

**Measured / from Figma MCP (`get_metadata` + `get_design_context` + `download_assets` export PNG):**

- Усі 12 node id кропів, розміри шарів, fills `#e7fc84`, `rgba(46,11,100,0.5)`, `#e7fc84` текст Фішок, 96px / 24px / 36px / 32px / 24px / 50×50.
- Violet back-лінк `299:64` і `299:68`: `rgba(231,252,132,0.5)`.
- Тексти заголовків і чотирьох абзаців Фішок — з імен/контенту TEXT-нод.
- PNG-кропи = export вузла (не raw JPEG/PNG fill), щоб зберегти crop, а не повний оригінал.

**Розбіжність Figma vs spec (apply йде за spec):**

- `299:63` у MCP: `rgba(30,30,30,0.4)` (як секційний title). Spec/design.md D3: lime back-лінк `#1e1e1e`. **Apply: `#1e1e1e`.**
- `79:77` у Figma: два пробіли після «Cycle Point». **Apply: один пробіл.**
- `299:73` у Figma не є лінком. **Apply: `<a>` на cyclepoint_kyiv.**
- `260:81` / `93:177`: «Проєкти » з хвостовим пробілом. **Apply: «Проєкти».**

**Візуальна ідентифікація кропів (впевненість висока для 01, 03, 04, 07, 08, 09, army, fishky map):**

- `artifact-06-kokkedal.png` (`295:14`): у кадрі видно брендинг Ridley / HIGHTECH BIKEPOWER — це **той шар**, який Figma ставить у ряд Kokkedal (IMG_3978). Інший node не підбирали.
- `artifact-02-colossi.png` (`295:9`): сира рама в майстерні; у фоні інші рами. Відповідає шару IMG_3977 у ряду Colossi.
- `artifact-10-lucas.png` (`293:4`): Figma name «IMG_3973 2» (той самий IMG-stem, що шоломи). Кроп унікальний vs `artifact-09`. Це шар ряду Лукаса в `213:2`.

## Open questions

- [x] Усі 12 обов’язкових PNG експортовано з указаних node id.
- [ ] Lime back-лінк: Figma 0.4 vs spec `#1e1e1e` — зафіксовано на користь spec; дизайнерський follow-up не блокує apply.
- Немає невідомих node, які не вдалося експортувати.

## Implementation notes

- Джерело apply: цей бриф + `assets/*.png`. Live Figma MCP заборонено.
- Копіювати лише іменовані 12 PNG у `src/assets/site/`. QA-скріни (`events-page.png` тощо) у `src/` не класти.
- Існуючі компоненти: `SiteHeader`, `GoldenSprintsPage` як шаблон Фішок, майбутній `SiteBackLink`, `ArtifactRow` без правок SFC.
- Forbidden: новий iframe src; пункти SiteNav; картка/плитка Фішок; генерація PNG; відкат layout CSS.
