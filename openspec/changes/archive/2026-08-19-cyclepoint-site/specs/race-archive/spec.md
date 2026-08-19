## ADDED Requirements

### Requirement: Вкладений маршрут архіву
Архів результатів MUST бути доступний за шляхом `/projects/golden-sprints/archive`. Логіка localStorage `races_db_v1`, опційного API, таблиці, лап і видалення MUST лишитися як у чинному `openspec/specs/race-archive/spec.md`.

#### Scenario: Архів на вкладеному URL
- **WHEN** користувач відкриває `/projects/golden-sprints/archive`
- **THEN** відображається таблиця заїздів з тими ж колонками, що зараз

---

### Requirement: Редірект зі старого шляху архіву
Шлях `/archive` MUST перенаправляти на `/projects/golden-sprints/archive`.

#### Scenario: Закладка старого архіву
- **WHEN** користувач відкриває `/archive`
- **THEN** відображається архів за шляхом `/projects/golden-sprints/archive`

---

### Requirement: Chrome архіву Golden Sprints
На `/projects/golden-sprints/archive` система MUST показувати існуючий toolbar «Тахометр» / «Архів» з оновленими шляхами. Маркетинговий site chrome на цьому маршруті показувати MUST NOT.

#### Scenario: Повернення до тахометра
- **GIVEN** користувач на `/projects/golden-sprints/archive`
- **WHEN** активує «Тахометр»
- **THEN** відкривається `/projects/golden-sprints/app`
