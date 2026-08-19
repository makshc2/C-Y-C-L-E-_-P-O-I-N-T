## ADDED Requirements

### Requirement: Вкладений маршрут тахометра
Тахометр MUST бути доступний за шляхом `/projects/golden-sprints/app` і MUST NOT бути кореневим маршрутом `/`. Поведінка гонки, Web Bluetooth, secure context, лапи, фініш і persist MUST лишитися як у чинному `openspec/specs/race-session/spec.md`.

#### Scenario: Тахометр на вкладеному URL
- **WHEN** користувач відкриває `/projects/golden-sprints/app`
- **THEN** відображається екран гонки з підключенням датчиків і запуском заїзду

#### Scenario: Корінь більше не тахометр
- **WHEN** користувач відкриває `/`
- **THEN** тахометр не є вмістом сторінки

---

### Requirement: Chrome застосунку Golden Sprints
На `/projects/golden-sprints/app` система MUST показувати існуючий toolbar із переходами «Тахометр» (поточний app) і «Архів» (`/projects/golden-sprints/archive`). Маркетинговий хедер сайту на цьому маршруті показувати MUST NOT. Нової кнопки «назад на сайт» додавати MUST NOT.

#### Scenario: Перехід в архів з тахометра
- **GIVEN** користувач на `/projects/golden-sprints/app`
- **WHEN** активує «Архів»
- **THEN** відкривається `/projects/golden-sprints/archive`

#### Scenario: Немає site-навігації
- **WHEN** відкрито тахометр
- **THEN** пунктів Контакти / Проєкти / Майстерня / Події / Благодійність з site-хедера немає
