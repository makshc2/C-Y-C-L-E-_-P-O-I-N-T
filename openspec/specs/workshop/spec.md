## Purpose

workshop — requirements merged from change cyclepoint-site.

## Requirements

### Requirement: Сторінка майстерні
Сторінка `/workshop` MUST показувати заголовок секції «Майстерня», зелену смугу і копі з `design-brief.md` (розділ Workshop): «Послуги майстерні», клікабельний URL `https://www.instagram.com/cyclepoint_workshop/` (`rel="noopener noreferrer"`), речення «Майстерня на Велоточці надає такі послуги з обслуговування:» і placeholder-рядки «записатися можна зателефонувавши, через інст і тд» та «ексель та опис».

#### Scenario: Placeholder ексель лишається
- **WHEN** користувач відкриває `/workshop`
- **THEN** на сторінці є текст «ексель та опис» без заміни прайсом чи таблицею послуг

#### Scenario: Instagram URL клікабельний
- **WHEN** користувач активує текстовий URL Instagram на сторінці майстерні
- **THEN** відкривається той самий Instagram у новій вкладці з `rel="noopener noreferrer"`

#### Scenario: Не вигадувати каталог послуг
- **WHEN** відкрито `/workshop`
- **THEN** немає вигаданого прайса, таблиці послуг або форми запису
