# Apply notes — workshop-price-sheet

Константа: `WORKSHOP_PRICE_SHEET_SRC` у `src/constants/site.ts` = `https://docs.google.com/spreadsheets/d/14uzzfjP3ak0qjtX2TAON8NrpXWkyL67amTsg15BW6Gc/preview?gid=0&rm=minimal`. Не `/edit`. ID таблиці лише тут.

Iframe після booking-ноти, як `HomeMap.vue`: `loading="lazy"`, `referrerpolicy="no-referrer-when-downgrade"`, `allowfullscreen`, `title="Прейскурант послуг майстерні Cycle Point"`, без `sandbox`. Обгортка `width: 100%`, `min-height: 70vh`; iframe `border: 0` на всю обгортку (relative + absolute). Не копіювати з мапи `height: 100%` секції, `min-height: 240px` і бежевий фон.

`.workshop`: `height: auto; min-height: var(--section-h-home)`. Padding, типографіка, `--color-green`, Instagram, heading, intro, booking-нота — без змін. Прибрати `excelNote` з `workshop.ts` і шаблону.

Fallback: published HTML `gid=0` лише якщо preview порожній у кадрі. Без Axios, Pinia, Sheets API, Quasar-обгорток, хардкоду рядків прайса.

НЕ чіпати: `GsAppLayout.vue`, роутер, `HomeMap.vue`, інші маркетингові сторінки, `server/`, тахометр, архів.

Перевірка: `npm run typecheck`, потім `npm run build`.
