# Decisions — figma-content-sync

<!-- append-only; пише npx agent-orchestrator-kit handoff <name> з handoff.md ## Decisions -->

- 2026-09-02 Ім’я зміни: `figma-content-sync` — окремо від `responsive-marketing-layout` за наказом користувача, попри `max_active_changes: 1`
- 2026-09-02 Design: none зараз; `/opsx:design` перед apply для PNG (MCP URL живуть ~7 днів)
- 2026-09-02 Події: новий довгий заголовок лишається лінком на `cyclepoint_kyiv`; капсула головної без змін
- 2026-09-02 Проєкти: два ряди; `army-thumb` з Figma `303:5`; без картки Фішки; один пробіл після Cycle Point
- 2026-09-02 Army: заголовок «Результати допомоги армії з моменту відкриття Велоточки» + той самий sheet + «< Назад»
- 2026-09-02 Фішки: slug `/projects/fishky-velodorizhky`, патерн GS, без переходів з нав/лістингу
- 2026-09-02 Майстерня: Figma 71:12 (заголовок + іконка IG + фраза), без старого intro
- 2026-09-02 Артефакти: копі як є; 10 унікальних фото; заголовок «Артефакти Велоточки»
- 2026-09-02 «< Назад»: GS (violet) + army (lime) + Фішки (violet); CTA GS на app лишається
- 2026-09-02 Сірі titles: повна мапа site-chrome включно з `/rental` і `/charity` як борг головної специ
- 2026-09-02 Apply MUST NOT revert `1727px` / брейкпоінти лейаут-зміни
- 2026-09-02 Spec review: APPROVE — Tier 1 `gate-check --review` + Tier 2 `spec-reviewer`; `apply-notes.md` записано
- 2026-09-02 Наступна фаза: `/opsx:design figma-content-sync` перед apply — PNG dump обов’язковий; live Figma MCP в apply заборонений
- 2026-09-02 Done-when 4.2: керуватися Do (`SiteBackLink` → `/projects`) — формулювання Done-when можна прочитати так, ніби back веде на app
- 2026-09-02 PNG dump: 12 іменованих кропів з указаних node id + 5 QA-скрінів екранів; apply копіює лише 12
- 2026-09-02 Lime back-лінк: Figma `299:63` = `rgba(30,30,30,0.4)`; apply лишає spec `#1e1e1e` / `var(--color-fg)`
- 2026-09-02 `artifact-06-kokkedal.png`: шар `295:14` (IMG_3978 у ряду Kokkedal), у кадрі Ridley — не підбирати інший node
- 2026-09-02 `artifact-10-lucas.png`: `293:4` «IMG_3973 2», унікальні байти vs `artifact-09`
