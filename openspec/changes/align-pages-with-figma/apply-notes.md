# Apply notes — align-pages-with-figma

- Task 5.2 — найризикованіший таск: `.gs` padding третє значення shorthand → `var(--section-pad-y)`, `min-height: 1251px` видалити ПОВНІСТЮ (desktop-блок), але мобільний `min-height: 0` у `@media (max-width: 767px)` НЕ чіпати.
- `setup.heading`/`setup.whereHeading`/`howItWorks.heading` — рівно `<p class="gs__setup-heading">`/`<p class="gs__how-heading">`, без окремого `font-size`/`font-weight`; НЕ `<h2>`/`<h3>`. Типографіка успадковується від `.gs__setup p, .gs__how p, .gs__setup li, .gs__how li`.
- Нові `.gs__setup`/`.gs__how` — не задавати `grid-row` вручну (не вимагається): auto-placement коректно поставить їх у неявний row 3, бо в DOM вони йдуть після `.gs__photo`/`.gs__copy` (row 2).
- Task 7.2: флекс-контейнер QR+лід — `display:flex; align-items:flex-start; gap:177px`, ліду `max-width:856px`. Не додавати `<form>`.
- НЕ чіпати: `ArtifactsPage.vue`, `ArtifactRow.vue`, `ProjectRow.vue`, `--gs-photo-w/h`, `GoldenSprintsPage.vue` back-лінк/фото-імпорт, `SiteHeader`/`SiteNav`, `src/router/index.ts`, iframe `src` workshop/army.
- Task 2.1: дослівні одруківки/подвійні пробіли в `artifacts.ts` (`gemu`, «памʼять  про» тощо) відтворювати буквально — не «виправляти».
- Task 5.1/D5: «CyclePоint» (кирилична о), «Cмартфон» (латинська C), пробіл перед «!» — дослівно, не одруківка для правки.
- Перед merge: `npm run typecheck`, `npm run build` (task 8.1); опційно вручну сканувати новий `charity-qr.png`.
- Верифікація після apply: `npx agent-orchestrator-kit gate-check --tasks align-pages-with-figma`, `npx openspec validate align-pages-with-figma --strict --type change`.
