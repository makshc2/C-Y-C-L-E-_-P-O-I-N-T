## Why

OpenSpec підключено до проєкту, але `openspec/specs/` порожній — немає жодної зафіксованої вимоги. Без baseline будь-яка майбутня зміна не має точки відліку: незрозуміло, що змінюється, а що лишається як є. Baseline фіксує поточну поведінку системи (v0) перед першою специфікованою фічею.

## What Changes

- Створюються два нових spec-файли, що описують **as-is** поведінку системи:
  - `race-session` — гонка на тахометрі (Bluetooth, налаштування, життєвий цикл, фініш, лапи, persist).
  - `race-archive` — збереження та перегляд результатів (localStorage, опційний REST API, відображення).
- Код **не змінюється** — лише документуються існуючі вимоги.
- Після `/opsx:archive` з'являється `openspec/specs/` як source of truth для майбутніх дельта-змін.

## Capabilities

### New Capabilities

- `race-session`: управління велогонкою між двома учасниками через Web Bluetooth CSC-датчики CYCPLUS, включно з підключенням, налаштуванням, запуском, автоматичним фінішем та збереженням результату.
- `race-archive`: зберігання записів гонок локально (localStorage) або через зовнішній REST API, перегляд архіву у вигляді таблиці з лапами.

### Modified Capabilities

*(Порожньо — `openspec/specs/` ще не містить жодного файлу)*

## Impact

- **Нові файли:** `openspec/changes/document-baseline/specs/race-session/spec.md`, `specs/race-archive/spec.md`.
- **Після archive:** `openspec/specs/race-session/spec.md`, `openspec/specs/race-archive/spec.md`.
- **Без змін:** будь-який файл у `src/`, `server/`, `package.json`, конфіги.
