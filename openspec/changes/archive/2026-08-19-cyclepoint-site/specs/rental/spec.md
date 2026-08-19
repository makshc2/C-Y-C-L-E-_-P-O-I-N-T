## ADDED Requirements

### Requirement: Сторінка прокату без бронювання
Сторінка `/rental` MUST показувати заголовок секції «Прокат», intro «Послуги прокату» з копі brief і каталог з п’яти велосипедів. Форми бронювання, кошика чи оплати бути MUST NOT.

#### Scenario: Intro згадує Дірект
- **WHEN** користувач відкриває `/rental`
- **THEN** у тексті є заклик писати в Дірект або зайти на Велоточку, без форми заявки

---

### Requirement: Каталог п’яти велосипедів
Система MUST показати рядки в такому порядку з назвами й специфікаціями з brief: Trek MultiTrack; Cannondale H400 без рядка трансмісії; VanMoof; Cycle Point bike; Cuda Atom (розмір «???»). Кожен ряд MUST мати фото, назву 48px Light `#e7fc84` і специфікації 36px Light `#e7fc84`.

#### Scenario: Порядок каталогу
- **WHEN** користувач переглядає каталог
- **THEN** зверху вниз: Trek MultiTrack, Cannondale H400, VanMoof, Cycle Point bike, Cuda Atom

#### Scenario: Cannondale без трансмісії
- **WHEN** видимий ряд Cannondale H400
- **THEN** є розмір M, колеса 28”, 250 грн/год і немає вигаданого рядка передач

#### Scenario: Cuda Atom розмір
- **WHEN** видимий ряд Cuda Atom
- **THEN** розмір відображається як «???» як у макеті
