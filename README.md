# Memory Game

A pair-matching card game built with vanilla JavaScript. Flip two cards per move, remember their positions, and find all 8 pairs in as few moves as possible.

**Live demo:** https://alenavp.github.io/memory-game/

RS School task: [Memory Game](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/memory-game/README.md)

## Features

- 16 cards (8 pairs), shuffled with the Fisher–Yates algorithm on every new game
- Move and pair counters
- Mismatched cards close automatically after 1 second; the board is locked meanwhile
- Win dialog with the final number of moves
- Leaderboard with the top 10 results, saved in `localStorage`
- Responsive layout, keyboard navigation, and reduced-motion support

## Tech stack

- HTML, SCSS, and JavaScript (ES modules), with no UI frameworks or libraries
- Vite for the dev server and production build
- ESLint, Prettier, Husky, lint-staged, and commitlint
- GitHub Actions and GitHub Pages for deployment

All markup is created with `document.createElement`. The `<body>` of `index.html` contains only a `<script>` tag.

## Getting started

### Prerequisites

- Node.js 22 LTS or later
- npm

### Run locally

```bash
git clone -b memory-game https://github.com/AlenaVP/memory-game.git
cd memory-game
npm ci
npm run dev
```

Then open the URL printed in the terminal (usually http://localhost:5173).

> The application code lives in the `memory-game` branch. The `main` branch contains only the initial README.

### Scripts

| Command           | Description                               |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload      |
| `npm run build`   | Build the production version into `dist/` |
| `npm run preview` | Preview the production build locally      |
| `npm run lint`    | Check the code with ESLint                |
| `npm run format`  | Format the code with Prettier             |

## Project structure

```
src/
├─ main.js              # entry point
├─ app/                 # root component and header
├─ features/
│  ├─ game/             # board, cards, counters, game rules
│  ├─ leaderboard/      # results storage and leaderboard dialog
│  └─ win-dialog/       # win dialog
├─ shared/
│  ├─ lib/              # DOM helper, shuffle, storage, date formatting
│  └─ ui/               # reusable button and modal
└─ styles/              # design tokens, mixins, global styles
```

Features don't import each other: they are connected only in `src/app/app.js`.

## Credits

- Card images: Unicode emoji rendered by the system font
- Card back: original CSS gradient pattern
