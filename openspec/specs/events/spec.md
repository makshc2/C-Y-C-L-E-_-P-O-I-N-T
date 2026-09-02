## Purpose

events — requirements merged from change figma-content-sync.

## Requirements

### Requirement: Сторінка подій з Instagram Kyiv
Сторінка `/events` MUST показувати заголовок рівно «Всі актуальні новини та події зібрані у нашому інстаграмі. Запрошуємо підписатись!». Заголовок MUST бути посиланням на `https://www.instagram.com/cyclepoint_kyiv/` з `target="_blank"` і `rel="noopener noreferrer"`. Сторінка MUST вбудовувати існуючий Instagram embed; `src` iframe MUST лишитися `https://www.instagram.com/cyclepoint_kyiv/embed`. Підпис капсули головної «Актуальні події» ця зміна змінювати MUST NOT.

#### Scenario: Новий заголовок-лінк
- **WHEN** користувач відкриває `/events`
- **THEN** видно заголовок «Всі актуальні новини та події зібрані у нашому інстаграмі. Запрошуємо підписатись!» як посилання на Instagram Cycle Point Kyiv у новій вкладці з `rel="noopener noreferrer"`

#### Scenario: Embed без зміни src
- **WHEN** відкрито `/events`
- **THEN** iframe має `src` `https://www.instagram.com/cyclepoint_kyiv/embed`

#### Scenario: Капсула головної не змінена
- **WHEN** відкрито головну `/`
- **THEN** підпис капсули подій лишається «Актуальні події»
