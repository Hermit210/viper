<<<<<<< HEAD
# DAO Treasury Management – Intelligent Agents, Allocation Automation, Reporting

A Vite + React + TypeScript frontend built for DoraHacks AI Treasury Management hackathon tracks. It demonstrates:

- Intelligent agent configuration and suggestions
- Portfolio allocation targets and one-click rebalance simulation
- Dashboard KPIs and NAV charting
- Reporting with transaction history and CSV export

## Getting Started

```bash
npm install
npm run dev
```
Open the URL printed in your terminal.

## Pages

- Dashboard: Total AUM, PnL, cash, risk indicator, and NAV-over-time chart.
- Allocation: Current vs target weights and a "Simulate Rebalance" action.
- Agents: Configure risk tolerance and strategy toggles, view agent suggestions.
- Reports: Browse transactions and export CSV.

## State and Persistence

Zustand store in `src/store/treasuryStore.ts` holds mock assets, KPIs, target allocations, transactions, and agent config. It persists non-function state to `localStorage`.

## Notes for Hackathon Judges

- This is a frontend-only demo focusing on UX and agent-driven workflows.
- "Simulate Rebalance" snaps allocation to targets to illustrate automation flow.
- Agent suggestions are generated based on toggles/risk level; in production these would come from on-chain analytics or ML services.

## Tech Stack

- React + TypeScript + Vite
- React Router
- Zustand (state)
- Recharts (charts)
- PapaParse (CSV export)
- wagmi + RainbowKit (wallet connect)

## WalletConnect setup

Create a WalletConnect Cloud project and add to `.env`:

```
VITE_WC_PROJECT_ID=your_project_id
```

## Build

```bash
npm run build
# deploy the dist/ folder (Vercel/Netlify recommended)
```

## Demo script (3–5 minutes)
- Connect: Click "Connect Wallet"; confirm address/chain/balance KPIs appear on Dashboard.
- Theme & responsiveness: toggle Danger Mode; open ☰ on mobile size.
- Agents: tweak risk and toggles; Refresh suggestions.
- Policy: set Min Stable Reserve & Max Single Asset; Run Policy; view explainable decisions.
- Allocation: verify Current vs Target; see Policy Execution Preview; Simulate Rebalance.
- Reports: Export CSV.

## Screenshots checklist
- Dashboard hero + KPIs (Default & Danger Mode)
- Wallet KPIs + On-chain Balances table
- Agents settings + suggestions
- Policy constraints + Decision Log
- Allocation with Preview + after Simulate Rebalance
- Reports table + Export button
- Mobile view with sidebar open

## Track alignment
- Intelligent agents: constraints/decisions with logs
- Automation: targets, preview, rebalance
- Reporting: table + CSV
- On-chain: wallet connect, chain KPIs, ERC‑20 balances
=======
# viper
DAO Treasury management
>>>>>>> 499391fa9505e043bbe07fa528600d0877506db5
