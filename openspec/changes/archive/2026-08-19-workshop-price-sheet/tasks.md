## 1. Константа URL таблиці

- [x] 1.1 Додати preview-URL прейскуранта
  Files: src/constants/site.ts
  Do: Експортуй `WORKSHOP_PRICE_SHEET_SRC` зі значенням `https://docs.google.com/spreadsheets/d/14uzzfjP3ak0qjtX2TAON8NrpXWkyL67amTsg15BW6Gc/preview?gid=0&rm=minimal`. Якщо Google блокує цей URL у iframe (порожній кадр / X-Frame-Options), заміни значення на published HTML тієї ж таблиці з `gid=0`. Не експортуй і не зберігай `/edit`-URL.
  Done-when: Файл експортує `WORKSHOP_PRICE_SHEET_SRC` з `gid=0`; рядок не містить `/edit`.

## 2. Сторінка майстерні

- [x] 2.1 Вбудувати iframe і дати секції рости
  Files: src/pages/WorkshopPage.vue, src/constants/site.ts
  Do: У `<script setup lang="ts">` імпортуй `WORKSHOP_PRICE_SHEET_SRC`. Прибери рендер `workshopCopy.excelNote`. Після booking-ноти додай iframe з `src` цієї константи, `title="Прейскурант послуг майстерні Cycle Point"`, `loading="lazy"`, `referrerpolicy="no-referrer-when-downgrade"`, `allowfullscreen`, без `sandbox` (як `src/components/home/HomeMap.vue`). У `.workshop` заміни `height: var(--section-h-home)` на `height: auto; min-height: var(--section-h-home)`; обгортка iframe — ширина 100%, `min-height: 70vh`, iframe `border: 0` на всю обгортку. Heading, Instagram, intro, booking-нота, `--color-green` не змінюй; коментарі не додавай.
  Done-when: У шаблоні немає «ексель та опис»; iframe `src` не містить `/edit`; у desktop-правилах `.workshop` немає єдиного `height: var(--section-h-home)` без `auto`/`min-height`.

## 3. Контент

- [x] 3.1 Видалити `excelNote`
  Files: src/content/workshop.ts
  Do: Видали поле `excelNote` з об’єкта `workshopCopy`. Поля `heading`, `instagramUrl`, `servicesIntro`, `bookingNote` залиш без змін.
  Done-when: У файлі немає `excelNote` і рядка `ексель та опис`.

## 4. Перевірка

- [x] 4.1 Typecheck і build
  Files: src/pages/WorkshopPage.vue, src/content/workshop.ts, src/constants/site.ts
  Do: Запусти `npm run typecheck`, потім `npm run build`.
  Done-when: Обидві команди завершуються з кодом 0.
