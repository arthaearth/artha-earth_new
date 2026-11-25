---
name: add-component
description: Створити новий базовий компонент дизайн-системи Artha & Earth: компонент зі станами default, hover, focus, disabled та історія Storybook з документацією. Використовуй, коли просять додати чи змінити компонент у src/components.
---

# Додати компонент

1. Перед роботою прочитай розділ «Дизайн-система» у `CLAUDE.md` і перевір, що потрібні токени вже є в блоці `@theme` у `src/app/globals.css`. Немає токена — спершу додай його туди за роллю.
2. Створи `src/components/<Name>/<Name>.tsx`. Лише токени за іменами (`bg-accent`, `text-ink`, `rounded-control`), жодних hex, `rgb()` чи довільних значень на кшталт `p-[13px]`.
3. Стани обов'язкові: default, hover, `focus-visible` (видиме кільце), disabled (`disabled:` і `aria-disabled`). Цільовий розмір дотику ≥ 44px.
4. Межа інтерактивного елемента (поле, кнопка без заливки) — `border-ink-muted`, контраст ≥ 3:1. `line` лише для декоративних ліній.
5. Створи `<Name>.stories.tsx`: окрема історія на кожен стан (`Default`, `Hover`, `Focus`, `Disabled` через `play` з `userEvent`/`parameters.pseudo` або через пропси) і `tags: ["autodocs"]`. У `parameters.docs.description.component` опиши, коли використовувати компонент, і додай 1–2 правила «не роби так».
6. Перевір: `npm run lint` і `npm run build`. Помилки a11y в Storybook вважай збоєм.
7. Додай компонент у розділ «Компоненти» у `CLAUDE.md`.
