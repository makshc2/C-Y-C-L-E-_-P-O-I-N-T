## Why

Маркетингові сторінки вже зібрані, але копі, унікальні фото артефактів, заголовок допомоги армії, лейаут майстерні й сірі заголовки секції в хедері розходяться з Figma `5SDp4Vg9fHdWGWaOJAhxZ3`. Паралельно активна зміна `responsive-marketing-layout` (лейаут/брейкпоінти); користувач явно наказав окремий `/opsx:propose` для контенту — не зливати в лейаут-зміну.

Design: none. Рекомендовано `/opsx:design figma-content-sync` перед apply: злити PNG-кропи з Figma в `openspec/changes/figma-content-sync/assets/`, бо apply MUST NOT викликати live Figma MCP.

## What Changes

- `/events`: замінити заголовок на «Всі актуальні новини та події зібрані у нашому інстаграмі. Запрошуємо підписатись!»; лишити `<a>` на `EVENTS_INSTAGRAM_URL` і iframe без змін `src`. Капсулу головної «Актуальні події» не чіпати.
- `/projects`: два ряди як зараз; згорнути подвійний пробіл у абзаці армії до одного; замінити байти `army-thumb.png` кропом Figma `303:5`. Не додавати картку «Фішки велодоріжки» і не міняти GS-копі (включно з «івентів.Про команду»).
- `/projects/army-support`: заголовок «Результати допомоги армії з моменту відкриття Велоточки», той самий Google Sheet iframe, посилання «< Назад» на `/projects`. Замінити вимогу «порожня лаймова смуга».
- Нова сторінка `/projects/fishky-velodorizhky` (hash, `meta.chrome: 'site'`): клон лейауту Golden Sprints, чотири абзаци з Figma `260:76`, фото-мапа, «< Назад» на `/projects`. Без пункту SiteNav, без плитки на головній, без картки в переліку — лише прямий URL.
- `/workshop`: заголовок «Послуги майстерні Велоточки»; рядок іконка Instagram 50×50 + «Можна звʼязатися через інстаграм майстерні» як одне посилання на `INSTAGRAM_URL`; прибрати видимі «Instagram» і «Майстерня на Велоточці надає такі послуги з обслуговування:»; iframe без змін `src`.
- `/artifacts`: ті самі десять рядків копі; замінити байти десяти PNG унікальними кропами Figma; сірий заголовок «Артефакти Велоточки».
- «< Назад» на деталках GS, army і Фішки (на GS — додатково до існуючого «Читати далі...»). На переліку `/projects` назад не додавати.
- Сірі заголовки секції в `SiteHeader.vue` для маршрутів цієї зміни; заодно закрити борг головної специ для `/rental` і `/charity` (мапа вже є в `site-chrome`, це не новий sitemap). Головна `/` без заголовка.

## Capabilities

### New Capabilities

- `events`: сторінка `/events` — заголовок-посилання на Instagram Kyiv, незмінний embed, без зміни капсули головної.

### Modified Capabilities

- `site-chrome`: додати лише slug `/projects/fishky-velodorizhky`; рендерити сірі заголовки секції (включно з «Події та новини», «Артефакти Велоточки», плюс існуюча мапа rental/charity/home-none).
- `projects`: деталка army — заголовок + sheet + назад замість порожньої смуги; ADDED деталка Фішки; перелік лишається двома картками.
- `workshop`: копі та Instagram-ряд як у Figma `71:12`, без видимого URL-як-текст і без видимого `servicesIntro`.
- `artifacts`: унікальні локальні фото замість спільного placeholder; регістр заголовка «Артефакти Велоточки».

## Impact

- **Код:** `src/content/{events,projects,armySupport,workshop,artifacts}.ts`; нові `src/content/fishkyVelodorizhky.ts`, `src/pages/FishkyVelodorizhkyPage.vue`; `src/pages/{EventsPage,ProjectsPage,ArmySupportPage,GoldenSprintsPage,WorkshopPage,ArtifactsPage}.vue`; `src/router/index.ts`; `src/components/site/SiteHeader.vue`; ассети під `src/assets/site/` (заміна байтів іменованих PNG + новий `fishky-velodorizhky-photo.png`). Можливий спільний `SiteBackLink.vue`.
- **Перетин з `responsive-marketing-layout`:** ті самі файли padding-тасків (`EventsPage.vue`, `WorkshopPage.vue`, `ProjectsPage.vue`, `ArmySupportPage.vue`, `ArtifactRow.vue`, `SiteHeader.vue`). Apply цієї зміни MUST NOT відкочувати layout CSS (медіа `1279px`/`767px`, padding). Скоуп — копі, ассети, один новий маршрут, заголовки хедера, посилання «Назад».
- **Без змін:** `GsAppLayout`, тахометр, архів, BLE, `server/`, `src/content/home.ts` (капсула), iframe `src` майстерні/подій/army sheet, `SiteNav` (не додавати Прокат/Артефакти/Фішки).
- **Залежності:** нові npm-пакети не потрібні. Стек: Vue 3 `<script setup lang="ts">`, Quasar, hash-router, без Pinia/Axios/Options API.
- **Дизайн-ассети:** джерело Figma `https://www.figma.com/design/5SDp4Vg9fHdWGWaOJAhxZ3/cyclopoint-site--Copy-` (fileKey `5SDp4Vg9fHdWGWaOJAhxZ3`). Apply копіює PNG з `openspec/changes/figma-content-sync/assets/` у `src/assets/site/`; бінарники в репозиторій вигадувати MUST NOT.

## Non-goals

- i18n / реальний ENG.
- Каталог прокату, QR благодійності, GS app/archive/BLE, дані комірок Google Sheet.
- Зміна `src` iframe майстерні, подій і army sheet.
- Hover капсул головної, брейкпоінти, `transform: scale`.
- Пункти SiteNav Прокат / Артефакти / Фішки; плитка чи картка Фішки.
- Коміт роботи `responsive-marketing-layout`.
- Live Figma MCP під час apply.

## Acceptance criteria

- `/events` показує новий заголовок-лінк на `https://www.instagram.com/cyclepoint_kyiv/`; iframe без змін `src`; капсула головної лишається «Актуальні події».
- `/projects` має рівно дві картки; army-абзац з одним пробілом після «Cycle Point»; `army-thumb.png` — унікальний B&W кроп, не той самий файл що `gs-thumb.png`.
- `/projects/army-support` — новий заголовок, той самий sheet `src`, «< Назад» на `/projects`.
- `#/projects/fishky-velodorizhky` відкриває фіолетову деталку з чотирма абзацами, фото-мапою і «< Назад»; немає в нав, на головній і в переліку.
- `/workshop` відповідає Figma `71:12` (заголовок, іконка+текст як лінк, без видимих старих рядків); iframe `src` той самий.
- Десять артефактів мають різні локальні фото; копі зі «прстору»/«сиділ» без змін.
- Хедер: сірі заголовки за мапою; `/` без заголовка.
- Layout CSS overlapping-файлів не відкочений до `1727px`.
- `npm run typecheck` і `npm run build` проходять.

## Risks / Constraints

- `pipeline.max_active_changes: 1`, але ця зміна створюється навмисно поруч із `responsive-marketing-layout` за наказом користувача.
- Apply MUST NOT revert layout CSS; лише копі, ассети, один новий маршрут, заголовки секції, back-лінки.
- Перетин файлів з padding-тасками лейаут-зміни: мердж-конфлікти в Vue SFC можливі — правити лише зазначені блоки.
- Без `/opsx:design` PNG у `assets/` відсутні: apply фото-тасків блокується, бінарники вигадувати не можна.
- `openspec/config.yaml` зараз дає YAMLParseError на рядку контракту тасків (двокрапка в compact mapping); CLI все одно створює зміну, але conductor має знати про парсер.
