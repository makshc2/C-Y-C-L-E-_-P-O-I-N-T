## Purpose

artifacts — requirements merged from change cyclepoint-site.

## Requirements

### Requirement: Сторінка артефактів
Сторінка `/artifacts` MUST показувати заголовок секції «Артефакти велоточки» і десять рядів, що чергують смуги green `#e7fc84` і tiffany `#b7f1d8`. Кожен ряд MUST мати фото ~400×392 і текст 24px Regular `#1e1e1e` з копі відповідного рядка в `design-brief.md` (розділ Artifacts), зі збереженням орфографії макета («прстору», «сиділ»).

#### Scenario: Десять рядів
- **WHEN** користувач відкриває `/artifacts`
- **THEN** видно десять блоків артефактів у порядку brief від герба до шолома Лукаса

#### Scenario: Орфографія макета
- **WHEN** видимий рядок про раму Данила
- **THEN** у тексті є слово «прстору» як у Figma

---

### Requirement: Спільний placeholder фото
Усі десять фото-слотів MUST використовувати локальні кропи `artifact-01` … `artifact-10` з `assets/` (візуально той самий jpeg-placeholder). Вигадувати унікальні фото MUST NOT.

#### Scenario: Слоти з локальних файлів
- **WHEN** відкрито `/artifacts`
- **THEN** кожен ряд має зображення з відповідного локального файлу артефакта, без зовнішніх Figma MCP URL
