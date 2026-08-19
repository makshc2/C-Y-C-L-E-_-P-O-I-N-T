## Purpose

projects — requirements merged from change cyclepoint-site.

## Requirements

### Requirement: Перелік проєктів
Сторінка `/projects` MUST показувати два ряди на зелених смугах `#e7fc84`: Golden sprints і Допомога армії. Кожен ряд MUST містити фото-прев’ю, заголовок, опис з brief і текст «Читати далі...» (три крапки `.`, не символ `…`).

#### Scenario: Два проєкти
- **WHEN** користувач відкриває `/projects`
- **THEN** видно ряд Golden sprints і ряд Допомога армії з «Читати далі...»

---

### Requirement: Навігація з переліку
Клік по ряду Golden sprints або його «Читати далі...» MUST вести на `/projects/golden-sprints`. Клік по ряду Допомога армії або його «Читати далі...» MUST вести на `/projects/army-support`.

#### Scenario: Перехід до деталки GS
- **WHEN** користувач активує «Читати далі...» у ряду Golden sprints
- **THEN** відкривається `/projects/golden-sprints`

#### Scenario: Перехід до допомоги армії
- **WHEN** користувач активує «Читати далі...» у ряду Допомога армії
- **THEN** відкривається `/projects/army-support`

---

### Requirement: Копі переліку як у макеті
Описи на `/projects` MUST збігатися з `design-brief.md` (розділ Projects list): маркований список Golden sprints і абзац про співпрацю з військовими.

#### Scenario: Текст допомоги армії
- **WHEN** видимий ряд Допомога армії
- **THEN** абзац починається з «Cycle Point  регулярно співпрацює з військовими підрозділами»

---

### Requirement: Деталка Golden Sprints
Сторінка `/projects/golden-sprints` MUST мати фіолетовий фон `rgba(46,11,100,0.5)`, фото зліва, заголовок «Golden sprints» 96px Light `#e7fc84` і абзац 20px Regular `#e7fc84` з копі макета, включно з реченням про «Жіночий велоклуб». Виправляти цей копіпаст MUST NOT.

#### Scenario: Копіпаст лишається
- **WHEN** відкрито `/projects/golden-sprints`
- **THEN** у тексті є фраза «усе це про Жіночий велоклуб»

#### Scenario: Фон сторінки
- **WHEN** відкрито деталку GS
- **THEN** тіло під хедером має violet-фон, а не окремий екран

---

### Requirement: Документований CTA на вкладений app
Під абзацом деталки GS система MUST показати текстове посилання «Читати далі...» (Helvetica Light 24px, колір `#e7fc84`) на `/projects/golden-sprints/app`. Це єдина дозволена UI, якої немає у Figma. Інших вигаданих кнопок на app чи archive на цій сторінці бути MUST NOT.

#### Scenario: Перехід у тахометр
- **WHEN** користувач активує «Читати далі...» на деталці GS
- **THEN** відкривається `/projects/golden-sprints/app`

#### Scenario: Немає зайвих CTA
- **WHEN** відкрито деталку GS
- **THEN** немає окремої кнопки «Архів» або інших вигаданих елементів, яких немає в brief

---

### Requirement: Порожня сторінка допомоги армії
Сторінка `/projects/army-support` MUST бути порожньою як фрейм `71:93`: зелена смуга без тексту й фото, site chrome із заголовком «Проєкти». Placeholder-контент додавати MUST NOT.

#### Scenario: Немає тіла сторінки
- **WHEN** користувач відкриває `/projects/army-support`
- **THEN** під хедером видно суцільну лаймову смугу без абзаців, карток і зображень проєкту
