## MODIFIED Requirements

### Requirement: Сторінка майстерні
Сторінка `/workshop` MUST показувати заголовок секції «Майстерня», зелену смугу і копі: «Послуги майстерні», клікабельний URL `https://www.instagram.com/cyclepoint_workshop/` (`rel="noopener noreferrer"`), речення «Майстерня на Велоточці надає такі послуги з обслуговування:» і рядок «записатися можна зателефонувавши, через інст і тд». Тексту «ексель та опис» на сторінці бути MUST NOT.

#### Scenario: Відкриття `/workshop` показує таблицю, не placeholder
- **WHEN** користувач відкриває `/workshop`
- **THEN** на сторінці немає тексту «ексель та опис»
- **AND** видно вбудований прейскурант з Google Таблиці

#### Scenario: Instagram URL клікабельний
- **WHEN** користувач активує текстовий URL Instagram на сторінці майстерні
- **THEN** відкривається той самий Instagram у новій вкладці з `rel="noopener noreferrer"`

#### Scenario: Не вигадувати каталог послуг
- **WHEN** відкрито `/workshop`
- **THEN** немає вигаданих рядків прайса, захардкоджених у застосунку, і немає форми запису в майстерню

---

## ADDED Requirements

### Requirement: Read-only embed Google Таблиці
Сторінка `/workshop` MUST вбудовувати прейскурант з Google Таблиці `14uzzfjP3ak0qjtX2TAON8NrpXWkyL67amTsg15BW6Gc` через iframe. `src` iframe MUST бути preview або published HTML з `gid=0` (вкладка «Прайс»). `src` MUST NOT містити `/edit` і MUST NOT бути URL `https://docs.google.com/spreadsheets/d/14uzzfjP3ak0qjtX2TAON8NrpXWkyL67amTsg15BW6Gc/edit?gid=0#gid=0`. Відвідувач MUST NOT отримувати Google edit UI. Iframe MUST мати доступний `title` українською.

#### Scenario: Відвідувач не редагує таблицю
- **GIVEN** відкрито `/workshop`
- **WHEN** перевіряється `src` iframe прейскуранта
- **THEN** `src` не містить `/edit`
- **AND** відвідувач не бачить інтерфейс редагування Google Таблиці

#### Scenario: Вкладка «Прайс»
- **WHEN** користувач відкриває `/workshop`
- **THEN** `src` iframe вказує на вкладку з `gid=0`

#### Scenario: Доступний title iframe
- **WHEN** відкрито `/workshop`
- **THEN** iframe прейскуранта має непорожній `title` українською

---

### Requirement: Сторінка майстерні росте вниз
Секція `/workshop` MUST не обрізати прейскурант фіксованою висотою 480px на desktop. Сторінка MUST рости вниз (`min-height` або `height: auto`): копі зверху, таблиця нижче на повну ширину. Якщо HTML таблиці вищий за область iframe, внутрішній скрол iframe MUST бути доступний. Зелене тло секції MUST лишитися.

#### Scenario: Довгий прейскурант не обрізається 480px
- **GIVEN** прейскурант має багато рядків
- **WHEN** користувач відкриває `/workshop` на desktop
- **THEN** секція не обмежена фіксованою висотою 480px
- **AND** таблиця займає повну ширину під копі, а надлишок рядків доступний через ріст сторінки або скрол у iframe
