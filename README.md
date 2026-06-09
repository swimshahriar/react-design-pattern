# React Design Patterns

A beautiful, interactive guide to essential React design patterns — built for a live session. Each pattern includes concept explanations, live demos, before/after code comparisons, and decision frameworks.

## Patterns Covered

| # | Pattern | Interactive Demo |
|---|---------|-----------------|
| 1 | **Compound Components** | Tabs — shared state via Context |
| 2 | **Higher-Order Components** | Feature flag toggle — swap components live |
| 3 | **Render Props** | FormValidator — live validation with children-as-function |
| 4 | **Custom Hooks** | useLocalStorage (persists refresh) + useDebounce (live delay) |
| 5 | **Container / Presentational** | Dog data cards — fetching vs rendering separation |
| 6 | **Provider / Context** | Theme switcher — dark/light mode + color picker |
| 7 | **Controlled vs Uncontrolled** | Side-by-side form comparison |
| 8 | **Observer Pattern** | Event bus chat — publish/subscribe in React |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Tech Stack

- **Vite** — fast dev server and build
- **React 19** + **TypeScript**
- **Tailwind CSS v4** — utility-first styling
- **React Router** — client-side routing
- **Framer Motion** — page and card animations
- **Prism.js** — syntax-highlighted code blocks
- **Lucide React** — icons

## Project Structure

```
src/
├── main.tsx
├── App.tsx
├── index.css
├── components/          # Shared UI components
│   ├── Layout.tsx       # Sidebar + content wrapper
│   ├── Sidebar.tsx      # Collapsible navigation
│   ├── CodeBlock.tsx    # Syntax-highlighted code
│   ├── LiveExample.tsx  # Interactive demo container
│   ├── BeforeAfter.tsx  # Side-by-side code comparison
│   ├── ProsCons.tsx     # Pros/cons grid
│   ├── PatternCard.tsx  # Home page pattern cards
│   └── Hero.tsx         # Landing page hero
├── pages/               # One page per pattern
│   ├── Home.tsx
│   ├── CompoundPattern.tsx
│   ├── HOCPattern.tsx
│   ├── RenderPropsPattern.tsx
│   ├── HooksPattern.tsx
│   ├── ContainerPresentational.tsx
│   ├── ProviderPattern.tsx
│   ├── ControlledUncontrolled.tsx
│   └── ObserverPattern.tsx
├── patterns/             # Working pattern implementations
│   ├── compound/Tabs.tsx
│   ├── hoc/withAnalytics.tsx
│   ├── render-props/FormValidator.tsx
│   ├── hooks/customHooks.ts
│   ├── container-presentational/DogImages.tsx
│   ├── provider/providers.tsx
│   ├── controlled/Forms.tsx
│   └── observer/EventEmitter.tsx
└── data/
    └── patterns.ts       # Pattern metadata
```

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/my-pattern`
3. Make your changes (follow existing conventions in `src/pages/` and `src/patterns/`)
4. Run `npm run build` to verify no errors
5. Commit and push: `git commit -m "Add my pattern" && git push origin feature/my-pattern`
6. Open a Pull Request

### Adding a New Pattern

- Add the pattern implementation to `src/patterns/<name>/`
- Add a route and page in `src/pages/` (copy an existing page as a template)
- Register the pattern in `src/data/patterns.ts`
- Add the route in `src/App.tsx`

## License

MIT