# Apply notes — figma-content-sync

- Спочатку `/opsx:design figma-content-sync`: PNG у `openspec/changes/figma-content-sync/assets/` з тими самими іменами, що в `src/assets/site/`. Без dump таски 3.2 / 5.2 / 7.1 (і build 5.3) стоять. Live Figma MCP і вигадані байти — заборонені.
- Не чіпати: `home.ts` (капсула «Актуальні події»), iframe `src` (`EVENTS_INSTAGRAM_EMBED_SRC`, `WORKSHOP_PRICE_SHEET_SRC`, `CHARITY_RESULTS_SHEET_SRC`), `SiteNav.vue`, `ArtifactRow.vue`, `gs-thumb.png`, `icon-instagram.svg`, GS-копі «Жіночий велоклуб» і «івентів.Про команду».
- Overlap з `responsive-marketing-layout`: у спільних SFC лише копі/template цієї зміни; не повертати `1727px`, не знімати `@media (max-width: 1279px)` / `767px`. Не комітити `openspec/changes/responsive-marketing-layout/`.
- Один новий path: `/projects/fishky-velodorizhky` одразу після army-support, `chrome: 'site'`, без картки/наву/плитки. `SiteBackLink`: GS і Фішки `tone="violet"` першим у колонці копі; army `tone="lime"` після preloader. CTA GS на app лишити.
- Vue 3 `<script setup lang="ts">`, без Pinia/Axios/Options API/коментарів.
- Перевірка: `npm run typecheck`, потім `npm run build`.
