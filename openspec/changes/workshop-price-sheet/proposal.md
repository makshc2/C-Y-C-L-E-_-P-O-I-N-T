## Why

На `/workshop` замість прейскуранта стоїть placeholder «ексель та опис». Відвідувачу потрібен живий перегляд цін майстерні з уже існуючої Google Таблиці, без редагування зі сайту і без вигаданого каталогу в коді.

Design: none

## What Changes

- Замінити рядок «ексель та опис» на read-only iframe Google Sheets (preview або published HTML, вкладка `gid=0` «Прайс»).
- `src` iframe MUST NOT бути `/edit`-URL таблиці; відвідувач не отримує Google edit UI.
- Сторінка `/workshop` росте вниз: копі зверху, таблиця на повну ширину нижче. Desktop більше не обмежений фіксованою висотою `480px`.
- Залишити заголовок «Послуги майстерні», клікабельний Instagram, intro і booking-ноту, зелене тло секції.
- URL таблиці — константа в `src/constants/site.ts` (або контенті workshop), не хардкод рядків прайса в `src/`.

## Capabilities

### New Capabilities

- Немає. Нових capabilities не додаємо.

### Modified Capabilities

- `workshop`: прибрати вимогу placeholder «ексель та опис» і заборону показу таблиці послуг (вона стосувалась вигаданої таблиці в коді). Додати вимогу read-only embed Google Таблиці, ріст сторінки і доступний title iframe.

## Impact

- **Код:** `src/pages/WorkshopPage.vue`, `src/content/workshop.ts`, `src/constants/site.ts`. Патерн iframe як `src/components/home/HomeMap.vue`.
- **Без змін:** інші маркетингові сторінки, хедер/футер, роутер, Hydra/OAuth, `server/`, тахометр, архів.
- **Залежності:** нові npm-пакети не потрібні. Без Axios, Pinia, Google Sheets API, API keys.
- **Розгортання:** hash-router, GitHub Pages `base` `/C-Y-C-L-E-_-P-O-I-N-T/`; `src` iframe — абсолютний URL Google, як у мапи.
- **Операційно:** таблиця лишається Viewer («будь-хто з посиланням»). Якщо preview блокує frame policy — Publish to web і published HTML.

## Non-goals

- Редагування таблиці зі сайту.
- Google Sheets API, API keys, OAuth, Hydra.
- Axios, Pinia, парсинг CSV.
- Хардкод каталогу послуг / рядків прайса в `src/`.
- Форма запису в майстерню.
- Зміна інших маркетингових сторінок.
- Нові hover-стани чи кольори поза існуючими токенами.

## Acceptance criteria

- `/workshop` показує live прейскурант з таблиці `14uzzfjP3ak0qjtX2TAON8NrpXWkyL67amTsg15BW6Gc`, вкладка `gid=0`.
- Тексту «ексель та опис» на сторінці немає.
- `src` iframe не містить `/edit`.
- Відвідувач не бачить Google edit UI.
- Instagram `https://www.instagram.com/cyclepoint_workshop/` (`rel="noopener noreferrer"`) і booking-нота лишаються.
- `npm run typecheck` і `npm run build` проходять.
