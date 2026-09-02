## Purpose

workshop — requirements merged from change cyclepoint-site.

## Requirements

### Requirement: Сторінка майстерні
Сторінка `/workshop` MUST показувати заголовок секції хедера «Майстерня», зелену смугу і h1 рівно «Послуги майстерні Велоточки» (36px Light `#1e1e1e`). Під заголовком MUST бути один рядок-посилання: іконка Instagram 50×50 з існуючого локального SVG і текст «Можна звʼязатися через інстаграм майстерні» (32px Light); увесь рядок MUST вести на `https://www.instagram.com/cyclepoint_workshop/` з `target="_blank"` і `rel="noopener noreferrer"`. Видимого слова-лейбла «Instagram» і видимого речення «Майстерня на Велоточці надає такі послуги з обслуговування:» бути MUST NOT. Рядок «записатися можна зателефонувавши, через інст і тд» на сторінці рендерити MUST NOT. Тексту «ексель та опис» на сторінці бути MUST NOT. Каталог послуг у коді вигадувати MUST NOT.

#### Scenario: Відкриття `/workshop` показує таблицю, не placeholder
- **WHEN** користувач відкриває `/workshop`
- **THEN** на сторінці немає тексту «ексель та опис»
- **AND** видно вбудований прейскурант з Google Таблиці

#### Scenario: Новий заголовок і контактний рядок
- **WHEN** відкрито `/workshop`
- **THEN** видно h1 «Послуги майстерні Велоточки» і рядок з іконкою Instagram плюс текст «Можна звʼязатися через інстаграм майстерні»

#### Scenario: Весь рядок відкриває Instagram
- **WHEN** користувач активує рядок іконка+текст на сторінці майстерні
- **THEN** відкривається `https://www.instagram.com/cyclepoint_workshop/` у новій вкладці з `rel="noopener noreferrer"`

#### Scenario: Старі рядки прибрані
- **WHEN** відкрито `/workshop`
- **THEN** немає видимого слова «Instagram» як окремого лейбла
- **AND** немає речення «Майстерня на Велоточці надає такі послуги з обслуговування:»
- **AND** немає видимого рядка «записатися можна зателефонувавши, через інст і тд»

#### Scenario: Не вигадувати каталог послуг
- **WHEN** відкрито `/workshop`
- **THEN** немає вигаданих рядків прайса, захардкоджених у застосунку, і немає форми запису в майстерню

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
