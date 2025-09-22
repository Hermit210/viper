# DAO Treasury Management – Intelligent Agents, Automation, Reporting, On-Chain

Viper Treasury is a Vite + React + TypeScript app for the DoraHacks AI Treasury Management track. It demonstrates:

- Intelligent agents with explainable policy decisions (constraints + risk)
- Portfolio automation (targets, execution preview, one-click rebalance)
- Forecasting (7/30/90-day) with confidence bands
- Risk metrics (exposure by asset, volatility)
- Anomaly detection (large tx, AUM jumps) with alerts
- Scenario simulation (what-if asset drawdown, expense rise)
- Reporting (transaction history + CSV)
- Wallet connect + on-chain ERC-20 balances
- Simple auth (login + route guard)

## Getting Started

```bash
npm install
npm run dev
```
Open the URL printed in your terminal. First-time users hit `/login` (any non-empty password for demo).

## Configuration

WalletConnect Cloud project:

```
VITE_WC_PROJECT_ID=your_project_id
```

## Build & Deploy

```bash
npm run build
# deploy dist/ (Vercel/Netlify)
```
- Vercel: `vercel.json` handles SPA fallback
- Netlify: `netlify.toml` builds and redirects SPA routes

## Pages & Features

- Dashboard
  - KPIs: AUM, 24h PnL, cash, risk level; wallet KPIs after connect
  - NAV chart; Risk exposure by asset; volatility
  - Forecasts (7/30/90d) with mean/low/high bands
  - On-chain balances (supported chains)
- Allocation
  - Current vs Target; Simulate Rebalance
  - Policy Execution Preview (from explainable decisions)
- Agents
  - Risk tolerance, Stable Reserve, Momentum toggles
  - Policy constraints: Min stable reserve, Max single-asset weight
  - Run Policy: generates decisions + explainable log
  - Export/Import config (agent/policy/targets)
- Scenario
  - What-if: asset drop %, expense rise % → projected AUM + notes
- Reports
  - Transaction history table; CSV export
  - Anomaly alerts (large tx, AUM jumps)

## Forecasts, Risk, and Anomalies (How it works)
- Forecasts: simple drift from NAV changes with volatility bands for 7/30/90 days
- Risk: exposure by asset from AUM composition; volatility from recent returns
- Anomalies: flags tx >5% of AUM and daily AUM changes >4%

## Auth
Basic demo login with route guard. For production, replace with OAuth or wallet-gated auth.

## Demo Script (3–5 minutes)
1) Connect wallet → Dashboard shows address/chain/balance + on-chain balances
2) Agents → set constraints → Run Policy → view explainable decisions
3) Allocation → see Policy Execution Preview → Simulate Rebalance
4) Dashboard → show Risk Exposure and Forecasts (confidence bands)
5) Scenario → enter asset drop/expense rise → run and review projected AUM
6) Reports → export CSV and view anomaly alerts
7) Toggle Danger Mode and show responsive sidebar on mobile

## Track Alignment
- Intelligent agents: policy engine + explainable decisions
- Automation: target weights, previews, and rebalance
- Risk & analytics: forecasting, exposure, volatility, anomalies
- Reporting: table + CSV
- On-chain readiness: wallets + balances

## Tech Stack
- React + TypeScript + Vite
- React Router
- Zustand (state)
- Recharts (charts)
- PapaParse (CSV export)
- wagmi + RainbowKit (wallet)

## Notes
This is a frontend-focused demo. Replace mock analytics and policy execution with real services or on-chain calls for production.
