# Artha & Earth — сайт-портфоліо

Next.js (App Router) + TypeScript + Tailwind 4. План сайту: `docs/artha-earth-plan.docx`.
Перед кодом на Next.js читай `AGENTS.md`: ця версія має зміни відносно звичної.

## Правила роботи
- Уся робота в гілці `main`, інших гілок не створюємо. Кожен пуш у `main` Vercel одразу публікує на https://artha-earth-new.vercel.app.
- Пуш, команди `vercel` і зміни `.claude/settings.json` потребують підтвердження (правила `ask` у `.claude/settings.json`).
- Перед пушем: `npm run lint` і `npm run build`.

## Токени
Правила в скілі `use-tokens`. Значення живуть лише в `@theme` у `src/app/globals.css`, код посилається на імена. `line` — для декоративних ліній, межа інтерактивного елемента — `ink-muted` (≥ 3:1).

## Дизайн-система
_Буде заповнено, коли токени зведено з макета._

## Компоненти
Скіл `add-component`. Кожен компонент має стани default, hover, focus, disabled і історію Storybook.

## Storybook
`npm run storybook` — локально на :6006. `npm run build` збирає Storybook у `public/storybook` і публікується разом із сайтом за адресою `/storybook`.

## Vercel CLI
`npx vercel` (пакет у devDependencies). Потрібен токен або `vercel login`; без підтвердження не запускати.
