# Trove Portfolio Dashboard

An investment portfolio dashboard built for the Trove frontend assessment. It features a login screen and a single dashboard displaying net worth, sector allocation, per-sector account cards, and tabbed holdings and orders.

[Live Demo](https://trove-portfolio-dashboard.vercel.app/)

## How to run the project locally

You will need Node 20.19 or higher (I developed this using Node 24, and an `.nvmrc` file is included, so running `nvm use` will select the correct version).

1. **Install dependencies:** `npm install`
2. **Start the development server:** `npm run dev` *(Available at `http://localhost:5173`)*

To build and preview a production bundle, run `npm run build` followed by `npm run preview`. There is no backend required, as the portfolio JSON ships directly with the application and is served through a mock API layer.

## Approach and architectural decisions

I built this with Vite, React, and TypeScript for a fast development experience and strong typing when modeling financial data. I used Tailwind CSS v4, mapping the Trove color palette directly to design tokens in `src/index.css`. React Router handles the protected dashboard flow, and Recharts powers the net worth chart to avoid reinventing complex SVG plotting. All other UI components are built from scratch.

Architecturally, data flow is strictly controlled. A Service Layer (`src/services/portfolio.ts`) simulates network latency and errors. A Hook Layer (`src/hooks/usePortfolio.ts`) fetches this data, and the Page Level (`src/pages/portfolioPage.tsx`) owns the state, passing plain props down to presentational components. All derived calculations and data anomaly handling reside in pure functions within the Utility layer (`src/utils/`).

### Key Architectural Highlights

- **Container/presentational split:** `portfolioPage` is the only component that fetches and holds page state (loading/error and the hide-balance toggle); everything under it is presentational and prop-driven, making it easy to test. The toggle lives on the page so one switch masks net worth and the account cards together.
- **Pure functions for the maths:** Holding value, gain/loss, net worth, and allocation are pure functions in `src/utils/`, which is also the single place the data quirks are handled.
- **Small state, no global store:** Server data resides in the hook, auth in a React context (with a protected route and `sessionStorage`), and everything else is local; state is lifted only when shared.
- **One source of truth for shared things:** The palette is Tailwind tokens in `src/index.css`, and one sector-color map feeds the allocation bar, its legend, and the filter pills so they can't drift.
- **Folders by role:** `components/{ui,layout,dashboard}` for what's shown, and `services/hooks/utils/types` for what's known.

## How you handled the data quirks

* **Zero Price (NVDA):** NVDA has a `currentPrice` of 0. I interpreted this as a missing price rather than a stock that is genuinely worthless, avoiding a -100% loss display. It is excluded from the net worth calculation and allocation bar, displaying "Price unavailable" on its card, but it still counts as a held position.
* **Zero Shares (DIS):** This represents a closed position. It adds nothing to net worth or allocation but remains in the holdings list labeled as closed, preserving past ownership history.
* **Summary Total Discrepancy:** The provided summary total ($48,250.75) contradicts the calculated holdings value ($19,134.25). Following the brief to compute net worth from holdings, I display the calculated figure and treat the summary as stale data.
* **Transaction Statuses:** Pending and failed transactions receive distinct badge colors. For failed orders, I drop the mathematical sign and strike through the amount, as displaying a negative number for an unsettled trade would be misleading.
* **Negative Returns:** Losses render in red and gains in green with explicit signs using `Intl.NumberFormat`. TSLA is the only holding currently at a loss, causing the Automotive card to display in red.

## What you would improve or add with more time

- **Lazy-Load the Chart:** Code-splitting Recharts with `React.lazy` would keep the initial load lean since it accounts for most of the bundle size.
- **Unit Testing:** I would add unit tests for the utility files, as the pure functions and quirk handling logic are perfect candidates for testing.
- **Minor Enhancements:** Implement real authentication with session persistence, add keyboard navigation to the search dropdown, and extract shared constants into separate files to optimize React Fast Refresh.
