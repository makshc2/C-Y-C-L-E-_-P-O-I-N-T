# Tier 2 review — align-pages-with-figma (повторний, раунд 2)

Reviewer: spec-reviewer (LLM semantic review). Tier 1 (`gate-check --review`, `gate-check --tasks`, `openspec validate align-pages-with-figma --strict --type change`) перевірено незалежно в цій сесії — усі три пройшли (exit 0). Це — повторний review після REQUEST CHANGES із попереднього раунду; нижче перевіряється лише, чи точкові правки `spec-architect` дійсно закривають усі 4 знахідки попереднього `review.md`, чи новий текст самодостатній, і чи не порушена межа Q2–Q9 (design.md D1–D7/D-Q9).

## Перевірка по кожній з 5 точок

### 1. Блокуюча знахідка #1 (нижній відступ `.gs`) — ЗАКРИТО

`tasks.md` task 5.2 Do тепер явно наказує замінити `.gs { padding: 34px 148px 0 145px; }` на `padding: 34px 148px var(--section-pad-y) 145px` і видалити рядок `min-height: 1251px` повністю; мобільний `min-height: 0` у `@media (max-width: 767px)` явно позначений «лишається без змін». Done-when перевіряє точний рядок `padding: 34px 148px var(--section-pad-y) 145px` для `.gs` і відсутність рядка `min-height: 1251px`. Звірено з реальним `src/pages/GoldenSprintsPage.vue`: поточний код має саме `padding: 34px 148px 0 145px;` (рядок 38) і `min-height: 1251px;` (рядок 37) на desktop, і окремий `min-height: 0;` (рядок 102) усередині `@media (max-width: 767px)` — точний baseline, з якого стартує задача, збігається дослівно з тим, що описує Do/Done-when. Обґрунтування (D0: `--section-pad-y` уже мав роль «блок→низ секції... другий ряд GS» до цієї ітерації) підтверджено в `design.md` рядок 29 — це не нове рішення.

### 2. Блокуюча знахідка #2 (HTML-тег заголовків) — ЗАКРИТО

Task 5.2 Do явно вимагає `<p class="gs__setup-heading">` для `setup.heading`/`setup.whereHeading` і `<p class="gs__how-heading">` для `howItWorks.heading`, з прямою забороною `<h2>`/`<h3>`/іншого заголовкового тега і забороною власного `font-size`/`font-weight` для цих класів. Done-when перевіряє рівно два `<p class="gs__setup-heading">`, рівно один `<p class="gs__how-heading">`, відсутність `<h2>`/`<h3>`/`<h4>` усередині `.gs__setup`/`.gs__how`, і відсутність окремого `font-size`/`font-weight` для цих класів. Звірено з `design-brief.md` («## Structure», розділ 4 `/projects/golden-sprints`, рядки 209–210): рядки Body-2/Body-3 («Усе, що потрібно…», «Де ганяти?», «Як це працює:») задокументовані як частина суцільного «20px Regular `#E7FC84`» текстового блоку без окремого заголовкового стилю (виняток — лише CTA-рядок 24px, що обробляється окремо) — посилання design.md на «Structure §4, Tokens» коректне й точне.

### 3. `design.md` — абзац «Уточнення після review» біля D5 — ЗАКРИТО, це пояснення, не приховане рішення

Рядок 81: абзац «**Уточнення після review (нижній відступ секції та теги заголовків):**…» присутній рівно один раз у файлі (перевірено `grep`), розташований одразу після наявних абзаців D5 (Q3/Q4/Структура/Grid-механіка/Body-1) і перед абзацом про мобільні брейкпоінти (Q9) — логічне місце, не порушує порядок інших рішень. Зміст — чисте обґрунтування двох виборів (padding замість min-height; `<p>` замість заголовкового тега) з прямим посиланням на вже наявний D0-токен і на `design-brief.md`, без введення нових числових значень чи нової поведінки. `grep -n "Уточнення\|review\|REQUEST\|reviewer"` по `design.md`/`proposal.md` не знайшов жодних інших слідів редагування поза цим абзацом і поза Impact-виправленням у proposal.md (п. 4 нижче) — D1–D4, D6, D7, D-Q9 текстуально не займані.

### 4. Незначна знахідка #3 (`proposal.md` Impact, `ArtifactsPage.vue`) — ЗАКРИТО

`proposal.md` → Impact → «Код» (рядок 28) тепер перелічує лише `src/pages/{WorkshopPage,ProjectsPage,FishkyVelodorizhkyPage,GoldenSprintsPage,ArmySupportPage,CharityPage}.vue` — без `ArtifactsPage`. «Без змін» (рядок 29) і далі містить `ArtifactsPage.vue`. Узгоджено з task 2.1 (Files: лише `src/content/artifacts.ts`).

### 5. Незначна знахідка #4 (task 7.2, механізм charity QR-блоку) — ЗАКРИТО

Task 7.2 Do тепер задає `display:flex; align-items:flex-start; gap:177px` для спільного контейнера QR-блоку й ліда та `max-width: 856px` для ліда, з явним поясненням походження числа (`x=726 ліда мінус правий край QR 549 = 177px`). Done-when перевіряє `gap: 177px` у флекс-контейнері смуги A і `max-width: 856px` для `<p>{{ charityCopy.lead }}</p>`. Значення звірено дослівно з `design-brief.md` рядок 263 («Лід x=726: gap від правого краю QR (549) = **177 px**; w=856») — точний збіг, не вигадане число.

## Межа Q2–Q9 (design.md D1–D7/D-Q9)

**Не порушена.** Єдина текстова зміна в `design.md` — одноразовий абзац-уточнення біля D5 (п. 3 вище), який лише деталізує реалізацію вже прийнятого рішення D5 (використання `--section-pad-y` для ролі «блок→низ секції», задокументованої в D0 ще до цієї ітерації; типографіка «заголовків» другого ряду як частини суцільного 20px-блоку — прямий наслідок design-brief.md, не нова інтерпретація). Жодне з D1, D2, D3, D4, D6, D7, D-Q9 текстуально не змінено. Finding #4 (gap 177px) свідомо не потребував правки D7 — число внесене напряму в task 7.2 з посиланням на design-brief.md, D7 і так вже описує двоколонковий макет смуги A без конкретного значення gap; conductor's `decisions.md` (запис 2026-09-16) підтверджує цю логіку, і я підтверджую її незалежно: сама зміна є деталізацією, не новим рішенням.

## Додаткові незалежні перевірки (не покладаючись на звіт спеціаліста/conductor'а)

- `npx agent-orchestrator-kit gate-check --review align-pages-with-figma` → `✓ Tier 1 review passed`, exit 0.
- `npx agent-orchestrator-kit gate-check --tasks align-pages-with-figma` → `✓ all tasks follow the contract (Files/Do/Done-when)`, exit 0.
- `npx openspec validate align-pages-with-figma --strict --type change` → `Change 'align-pages-with-figma' is valid`.
- Пряме читання `src/pages/GoldenSprintsPage.vue` і `src/pages/CharityPage.vue` — поточний baseline коду точно відповідає тому, що описують Do/Done-when tasks 5.2 і 7.2 (жодних застарілих припущень про стан `src/`).
- Делта-специ `specs/projects/spec.md`, `specs/charity/spec.md` не конфліктують із новим текстом task 5.2/7.2 (жодних числових MUST-вимог, які суперечили б 177px/856px чи `var(--section-pad-y)`/`<p>`-тегам).

## Залишкові неблокуючі спостереження (не знахідки, інформаційно)

- Task 5.2 не згадує явно `grid-row` для нових `.gs__setup`/`.gs__how` (тільки `grid-column`). За правилами CSS Grid auto-placement (forward-only cursor, sparse packing) це коректно авто-розміститься в новий неявний третій рядок, оскільки в DOM-порядку ці блоки йдуть після `.gs__photo`/`.gs__copy` (row 2) — курсор розміщення вже не повернеться до вільної комірки row 1/col 2. Це не помилка і не новий ризик від цієї ітерації (механіка сітки була в D5 ще до попереднього review-раунду й тоді не була заблокована), тому не підіймаю як нову блокуючу знахідку.

## Вердикт

Verdict: APPROVE

**APPROVE**

Усі 4 знахідки попереднього `review.md` (2 блокуючі, 2 незначні) закриті точковими правками виключно в `tasks.md`/`design.md`/`proposal.md`; новий текст task 5.2/7.2 самодостатній (Done-when перевіряє точні рядки/класи/значення без потреби зазирати в design.md); межа Q2–Q9 не порушена — єдине текстове доповнення в design.md є обґрунтуванням, а не новим рішенням. `src/` не торкнутий. Зміна готова до `/opsx:apply`.
