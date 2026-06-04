## 1. Звірка race-session spec із кодом

- [x] 1.1 Перевірити `useWebBluetoothSupport.ts` — відповідність вимозі «Secure context enforcement»
- [x] 1.2 Перевірити `useCycplusDevice.ts` — відповідність вимогам підключення, reconnect (MAX 5 спроб), зупинки обробки даних при фінішу
- [x] 1.3 Перевірити `TachometerPage.vue` — вимоги до налаштувань (округлення фінішу, крок лап), запуску, авто-фінішу та правила нічиї (5 мс)
- [x] 1.4 Перевірити `TachometerPage.vue` — відповідність вимозі `persistRace`: UUID, всі поля RaceRecord, виклик `addRace` + `archiveRace`
- [x] 1.5 Перевірити `TachometerPage.vue` — вимогу авто-перезапуску (SHOULD)

## 2. Звірка race-archive spec із кодом

- [x] 2.1 Перевірити `localDb.ts` — ключ `races_db_v1`, порядок запису (`unshift`), обробку відсутнього/пошкодженого значення
- [x] 2.2 Перевірити `raceArchiveApi.ts` — fire-and-forget POST, відсутність сповіщень при помилці, поведінку без `VITE_ARCHIVE_API_URL`
- [x] 2.3 Перевірити `ResultsArchivePage.vue` — fallback на localStorage при помилці API, мітку «З сервера», приховування кнопок видалення в API-режимі
- [x] 2.4 Перевірити `server/index.js` + `server/validate.js` — 201/400/409, повнота валідації полів `RaceRecord`
- [x] 2.5 Перевірити порядок сортування GET `/api/races` у `server/db.js` (новіші першими)

## 3. Перевірка збірки

- [x] 3.1 Запустити `npm run typecheck` — помилок TypeScript немає
- [x] 3.2 Запустити `npm run build` — збірка завершується без помилок

## 4. Архівування change

- [x] 4.1 Виконати `npx openspec validate document-baseline` — всі артефакти валідні
- [x] 4.2 Виконати `/opsx:archive` для переносу `specs/race-session` і `specs/race-archive` у `openspec/specs/`
