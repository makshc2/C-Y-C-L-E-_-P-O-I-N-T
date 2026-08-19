# Apply notes — responsive-marketing-layout

1.x: звірити working tree, не переписувати капсули/нав/danish з нуля. Не повертати Instagram, default-блюр, 40px, JS `hovered`, Прокат/Артефакти в хедер.

Брейкпоінти: `--bp-desktop: 1280px`, `--bp-tablet: 768px`, `--page-w: 1728px`. У `@media` лише літерали `1279px` / `767px`, не `var(--bp-*)`. Стос колонок — тільки `max-width: 767px`.

Головна: ≥1728 pixel-perfect (absolute через `min-width: 1728px` ок). 1280–1727 — flex/grid ряд, не `left: 1190px`. Плитки в потоці на цьому діапазоні; колонка трьох — лише <768 (2+1 wrap на tablet ок). Не `scale()`/`zoom` на `.site-layout` / `body` / `#app` / `.home`.

`SiteNav` gap `1727px` → `1279px` разом із хедером. `--gutter: 149px` міняти на `clamp` лише якщо рядок не вміщається.

Hover `.tile`: outline/box-shadow на сам лінк; іконка/підпис без зсуву. 5.5: лише padding; iframe майстерні й preloader подій не чіпати.

НЕ чіпати: `GsAppLayout.vue`, `TachometerPage.vue`, `ResultsArchivePage.vue`, BLE, `src/services/*`, `server/`, `SitePagePreloader.vue`, `useEmbedReady.ts`.

Перевірка: `git diff -- src/layouts/GsAppLayout.vue src/pages/TachometerPage.vue src/pages/ResultsArchivePage.vue` порожній; `npm run typecheck`, потім `npm run build`.
