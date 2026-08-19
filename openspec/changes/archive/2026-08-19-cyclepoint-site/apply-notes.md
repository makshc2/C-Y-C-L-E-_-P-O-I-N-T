# Apply notes — cyclepoint-site

Пікселі: `design-brief.md` + `assets/`. Live Figma не запитувати. Токени з brief / таск 1.2, не Figma Variables.

НЕ чіпати: `useCycplusDevice.ts`, `useWebBluetoothSupport.ts`, `localDb.ts`, `raceArchiveApi.ts`, `server/`, логіку гонки в `TachometerPage` / `ResultsArchivePage` (лише URL і chrome). `vite.config.ts` `base` лишається `/C-Y-C-L-E-_-P-O-I-N-T/`. Без Pinia, Axios, Options API.

Ассети: лише список 1.1 → `src/assets/site/`. Не QA-скріни, `_home_raw/`, `*-original.jpeg`, `artifact-shared-original.jpeg`.

`App.vue`: `meta.chrome` `site` | `app`; лейаути обгортають `<router-view />` через slot (не другий router-view). GsAppLayout: «Тахометр»/«Архів» на нових шляхах, `isActive` теж; кнопки «назад на сайт» немає. Лого app — `logo-cyclepoint-header.png`, не відсутній jpg.

©: `showCopyrightSymbol` true лише `/` і `/charity`; інше false. Іконка IG у `#contacts` — лінк на `INSTAGRAM_URL` + `rel="noopener noreferrer"`, без текстового URL. Контакти: `{ path: '/', hash: '#contacts' }`. Події = Instagram, не сторінка.

Копі буквально (Cб, прстору, сиділ, ексель, «Жіночий велоклуб»). Єдина вигадана UI — «Читати далі...» на GS → `/projects/golden-sprints/app`, `#e7fc84`.

Перевірка: `npm run typecheck`, `npm run build`.
