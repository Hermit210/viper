# DAO Management – Advanced AI Agents for Midnight Blockchain

Viper is an advanced AI-powered dao management system built for the DEGA Hackathon on DoraHacks. This sophisticated platform demonstrates cutting-edge AI capabilities for DAO optimization:

##  Advanced AI Features

- **ML-Enhanced Portfolio Optimization**: Machine learning algorithms for dynamic asset allocation
- **Market Sentiment Analysis**: Real-time sentiment scoring and fear/greed index integration
- **Intelligent Risk Management**: AI-driven risk assessment with confidence scoring
- **Predictive Analytics**: Advanced forecasting with volatility bands and correlation analysis
- **Anomaly Detection**: Smart detection of unusual transactions and market movements
- **Explainable AI Decisions**: Transparent reasoning for all AI recommendations
- **Automated Rebalancing**: Threshold-based portfolio rebalancing with ML optimization
- **Stress Testing**: Comprehensive scenario analysis with Value-at-Risk calculations

##  DAO Governance Integration

- **Proposal System**: Create and vote on treasury management proposals
- **Governance Mode**: Full DAO integration for decentralized decision making
- **Voting Mechanisms**: Weighted voting with real-time results
- **Policy Enforcement**: AI-enforced governance policies and constraints

##  Advanced Analytics

- **Risk Metrics Dashboard**: Comprehensive risk profiling and monitoring
- **Correlation Analysis**: Asset correlation matrices and diversification insights
- **Momentum Signals**: ML-generated momentum indicators for each asset
- **Liquidity Scoring**: Real-time liquidity assessment for all holdings
- **Performance Attribution**: Detailed analysis of portfolio performance drivers

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

- **Dashboard**
  - Enhanced KPIs: AUM, 24h PnL, AI confidence, market sentiment
  - NAV chart with advanced forecasting
  - Real-time AI alerts and insights
  - Risk exposure analysis with correlation data
  - On-chain balances (multi-chain support)

- **Intelligent Agents**
  - Advanced AI configuration: ML optimization, sentiment analysis
  - Enhanced policy constraints with risk limits
  - AI-powered decision engine with confidence scoring
  - Market intelligence integration
  - Real-time AI insights generation
  - DAO governance panel with proposal system

- **AI Analytics Dashboard**
  - Comprehensive market intelligence visualization
  - Advanced risk metrics radar charts
  - Momentum signal analysis
  - AI insight management and recommendations
  - Stress testing with Value-at-Risk calculations
  - Correlation matrix visualization

- **Allocation Management**
  - AI-optimized target allocation suggestions
  - Smart rebalancing with ML-enhanced execution
  - Policy execution preview with risk assessment
  - Dynamic threshold management

- **Scenario Analysis**
  - Advanced stress testing with multiple risk metrics
  - Value-at-Risk and Expected Shortfall calculations
  - Maximum drawdown analysis
  - Sharpe ratio optimization
  - AI-generated recommendations based on scenario results

- **Reports & Analytics**
  - Enhanced transaction history with anomaly detection
  - Advanced CSV export with risk metrics
  - Real-time alert system for portfolio events

## Forecasts, Risk, and Anomalies (How it works)
- Forecasts: simple drift from NAV changes with volatility bands for 7/30/90 days
- Risk: exposure by asset from AUM composition; volatility from recent returns
- Anomalies: flags tx >5% of AUM and daily AUM changes >4%

## Auth
Basic demo login with route guard. For production, replace with OAuth or wallet-gated auth.

## Demo Script (5–7 minutes)
1) **Dashboard Overview** → Show enhanced KPIs, AI confidence, market sentiment, real-time alerts
2) **AI Agents Configuration** → Enable ML optimization, sentiment analysis, governance mode
3) **Run AI Policy Engine** → Demonstrate advanced decision making with confidence scores and market analysis
4) **AI Analytics Dashboard** → Show momentum signals, risk radar, correlation analysis, AI insights
5) **DAO Governance** → Create proposal, demonstrate voting mechanism
6) **Advanced Scenario Analysis** → Run stress test with VaR calculations and AI recommendations
7) **Portfolio Optimization** → Use ML-powered optimization and view explainable results
8) **Market Intelligence** → Show real-time sentiment, fear/greed index, liquidity scores
9) **Anomaly Detection** → Demonstrate smart alerts and risk monitoring

## DEGA Hackathon Alignment
- **Advanced AI Agents**: ML-powered portfolio optimization with explainable decisions
- **Market Intelligence**: Real-time sentiment analysis and momentum signals  
- **Risk Management**: Comprehensive risk metrics including VaR and stress testing
- **DAO Integration**: Full governance system with proposal and voting mechanisms
- **Automation**: Smart rebalancing with AI-driven thresholds and execution
- **Analytics**: Advanced forecasting, correlation analysis, and anomaly detection
- **Midnight Blockchain Ready**: Designed for integration with Midnight's privacy features
- **Scalable Architecture**: Built for enterprise-grade DAO management



