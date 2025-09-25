import { create } from 'zustand'

export type Asset = {
	symbol: string
	valueUSD: number
	currentPct: number
	balance?: number
	isNative?: boolean
}

export type Transaction = {
	id: string
	date: number
	type: 'BUY' | 'SELL' | 'YIELD'
	asset: string
	amount: number
	valueUSD: number
}

export type KPIs = {
	totalAUM: number
	last24hPnL: number
	cashBalance: number
	riskLevel: 'Low' | 'Medium' | 'High'
}

export type AgentConfig = {
	riskTolerance: number // 1-10
	enableStableReserve: boolean
	enableMomentum: boolean
	enableMLOptimization: boolean
	enableMarketSentiment: boolean
	enableGovernanceMode: boolean
	rebalanceThreshold: number // % deviation to trigger rebalance
	maxDrawdownLimit: number // % max acceptable drawdown
}

export type PolicyConfig = {
	minStableReservePct: number // e.g., 20
	maxSingleAssetPct: number // e.g., 40
}

export type PolicyDecision = {
	id: string
	date: number
	summary: string
	confidence: number // 0-100 AI confidence score
	riskScore: number // 0-100 risk assessment
	expectedReturn: number // % expected return
	actions: {
		type: 'REBALANCE' | 'REDUCE' | 'INCREASE' | 'HOLD' | 'HEDGE' | 'LIQUIDATE';
		asset?: string;
		deltaPct?: number;
		reason: string;
		priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
		aiReasoning: string;
	}[]
	marketConditions: {
		sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL'
		volatility: 'LOW' | 'MEDIUM' | 'HIGH'
		liquidityRisk: 'LOW' | 'MEDIUM' | 'HIGH'
	}
}

export type ForecastPoint = { date: string; mean: number; low: number; high: number }
export type RiskMetrics = { byAssetPct: Record<string, number>; volatilityPct: number }
export type Anomaly = { id: string; date: number; kind: 'TX_LARGE' | 'AUM_JUMP'; message: string }
export type ScenarioConfig = { assetDropPct: number; expenseRisePct: number }
export type ScenarioResult = {
	projectedAUM: number;
	notes: string[];
	riskMetrics: {
		valueAtRisk: number; // 95% VaR
		expectedShortfall: number; // Expected loss beyond VaR
		maxDrawdown: number; // Maximum peak-to-trough decline
		sharpeRatio: number; // Risk-adjusted return
	};
	recommendations: string[];
}

export type MarketIntelligence = {
	sentiment: number; // -100 to 100
	fearGreedIndex: number; // 0-100
	correlationMatrix: Record<string, Record<string, number>>;
	momentumSignals: Record<string, number>; // -1 to 1
	liquidityScores: Record<string, number>; // 0-100
}

export type GovernanceProposal = {
	id: string;
	title: string;
	description: string;
	type: 'REBALANCE' | 'POLICY_CHANGE' | 'EMERGENCY_ACTION';
	proposedChanges: any;
	votingPower: number;
	status: 'DRAFT' | 'ACTIVE' | 'PASSED' | 'REJECTED';
	deadline: number;
	votes: { for: number; against: number; abstain: number };
}

export type AIInsight = {
	id: string;
	timestamp: number;
	type: 'OPPORTUNITY' | 'RISK' | 'OPTIMIZATION' | 'ALERT';
	title: string;
	description: string;
	confidence: number;
	impact: 'LOW' | 'MEDIUM' | 'HIGH';
	actionable: boolean;
	suggestedActions?: string[];
}

export type NewsItem = {
	id: string;
	title: string;
	summary: string;
	category: 'MARKET' | 'DEFI' | 'REGULATION' | 'TECH' | 'SECURITY';
	sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
	impact: 'LOW' | 'MEDIUM' | 'HIGH';
	timestamp: number;
	source: string;
	relevantTokens?: string[];
}

export type TokenRecommendation = {
	id: string;
	symbol: string;
	name: string;
	category: 'STABLECOIN' | 'DEFI' | 'L1' | 'L2' | 'MEME' | 'AI' | 'GAMING';
	reason: string;
	aiScore: number; // 0-100
	riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
	expectedReturn: number; // percentage
	timeHorizon: '1W' | '1M' | '3M' | '6M' | '1Y';
	marketCap: number;
	priceChange24h: number;
	volume24h: number;
	pros: string[];
	cons: string[];
	allocation: number; // suggested % of portfolio
}

export type MarketTrend = {
	id: string;
	title: string;
	description: string;
	trend: 'BULLISH' | 'BEARISH' | 'SIDEWAYS';
	strength: number; // 0-100
	timeframe: '1H' | '4H' | '1D' | '1W' | '1M';
	affectedTokens: string[];
	tradingOpportunity?: {
		action: 'BUY' | 'SELL' | 'HOLD';
		confidence: number;
		targetPrice?: number;
		stopLoss?: number;
	};
}

type TreasuryState = {
	assets: Asset[]
	targetAllocation: Record<string, number>
	transactions: Transaction[]
	navHistory: { date: string; nav: number }[]
	kpis: KPIs
	lastRebalance?: number
	agentConfig: AgentConfig
	agentSuggestions: string[]
	policyConfig: PolicyConfig
	policyLog: PolicyDecision[]

	// Analytics
	forecasts: ForecastPoint[]
	risk: RiskMetrics
	anomalies: Anomaly[]
	scenario: ScenarioConfig
	scenarioResult?: ScenarioResult

	// Advanced AI features
	marketIntelligence: MarketIntelligence
	governanceProposals: GovernanceProposal[]
	aiInsights: AIInsight[]

	// News and recommendations
	news: NewsItem[]
	tokenRecommendations: TokenRecommendation[]
	marketTrends: MarketTrend[]

	// Wallet integration
	walletConnected: boolean
	walletAddress?: string
	walletChainId?: number
	walletAssets: Asset[]
	useRealData: boolean

	// Auth (simple demo)
	isAuthenticated: boolean

	setAgentConfig: (cfg: AgentConfig) => void
	setPolicyConfig: (cfg: PolicyConfig) => void
	setTargetAllocation: (next: Record<string, number>) => void
	exportConfig: () => string
	importConfig: (json: string) => void
	refreshSuggestions: () => void
	simulateRebalance: () => void
	runPolicy: () => void
	computeAnalytics: () => void
	runScenario: () => void
	generateAIInsights: () => void
	optimizePortfolio: () => void
	updateMarketIntelligence: () => void
	createGovernanceProposal: (proposal: Omit<GovernanceProposal, 'id' | 'votes' | 'status'>) => void
	voteOnProposal: (id: string, vote: 'for' | 'against' | 'abstain', power: number) => void
	setWalletConnected: (connected: boolean, address?: string, chainId?: number) => void
	updateWalletAssets: (assets: Asset[]) => void
	toggleDataSource: () => void
	generateNews: () => void
	generateTokenRecommendations: () => void
	generateMarketTrends: () => void
	login: (password: string) => boolean
	logout: () => void
}

const initialState: Omit<TreasuryState, 'setAgentConfig' | 'setPolicyConfig' | 'setTargetAllocation' | 'exportConfig' | 'importConfig' | 'refreshSuggestions' | 'simulateRebalance' | 'runPolicy' | 'computeAnalytics' | 'runScenario' | 'generateAIInsights' | 'optimizePortfolio' | 'updateMarketIntelligence' | 'createGovernanceProposal' | 'voteOnProposal' | 'setWalletConnected' | 'updateWalletAssets' | 'toggleDataSource' | 'generateNews' | 'generateTokenRecommendations' | 'generateMarketTrends' | 'login' | 'logout'> = {
	assets: [
		{ symbol: 'USDC', valueUSD: 200000, currentPct: 40 },
		{ symbol: 'ETH', valueUSD: 180000, currentPct: 36 },
		{ symbol: 'BTC', valueUSD: 90000, currentPct: 18 },
		{ symbol: 'ALT', valueUSD: 30000, currentPct: 6 },
	],
	targetAllocation: { USDC: 30, ETH: 40, BTC: 25, ALT: 5 },
	transactions: [
		{ id: 't1', date: Date.now() - 86400000, type: 'BUY', asset: 'ETH', amount: 10, valueUSD: 30000 },
		{ id: 't2', date: Date.now() - 3600000, type: 'YIELD', asset: 'USDC', amount: 0, valueUSD: 500 },
	],
	navHistory: Array.from({ length: 30 }).map((_, i) => ({
		date: new Date(Date.now() - (29 - i) * 86400000).toLocaleDateString(),
		nav: 450000 + Math.sin(i / 5) * 15000 + i * 2000,
	})),
	kpis: { totalAUM: 500000, last24hPnL: 3200, cashBalance: 120000, riskLevel: 'Medium' },
	agentConfig: {
		riskTolerance: 6,
		enableStableReserve: true,
		enableMomentum: false,
		enableMLOptimization: true,
		enableMarketSentiment: true,
		enableGovernanceMode: false,
		rebalanceThreshold: 5,
		maxDrawdownLimit: 15
	},
	agentSuggestions: [
		'Rebalance 5% from USDC to ETH to reach target 40% ETH',
		'Increase BTC exposure by 3% to align with medium risk',
	],
	policyConfig: { minStableReservePct: 20, maxSingleAssetPct: 40 },
	policyLog: [],
	forecasts: [],
	risk: { byAssetPct: {}, volatilityPct: 0 },
	anomalies: [],
	scenario: { assetDropPct: 10, expenseRisePct: 5 },
	marketIntelligence: {
		sentiment: 25,
		fearGreedIndex: 45,
		correlationMatrix: {},
		momentumSignals: {},
		liquidityScores: {}
	},
	governanceProposals: [],
	aiInsights: [],
	news: [],
	tokenRecommendations: [],
	marketTrends: [],
	walletConnected: false,
	walletAddress: undefined,
	walletChainId: undefined,
	walletAssets: [],
	useRealData: false,
	isAuthenticated: true,
}

const persistKey = 'dao_treasury_state_v1'

function loadState(): typeof initialState | null {
	try {
		const raw = localStorage.getItem(persistKey)
		return raw ? JSON.parse(raw) : null
	} catch {
		return null
	}
}

export const useTreasuryStore = create<TreasuryState>((set, get) => ({
	...initialState,
	...(loadState() || {}),

	setAgentConfig: (cfg) => {
		set({ agentConfig: cfg })
		save()
	},

	setPolicyConfig: (cfg) => {
		set({ policyConfig: cfg })
		save()
	},

	setTargetAllocation: (next) => {
		set({ targetAllocation: next })
		save()
	},

	exportConfig: () => {
		const { agentConfig, policyConfig, targetAllocation } = get()
		return JSON.stringify({ agentConfig, policyConfig, targetAllocation }, null, 2)
	},

	importConfig: (json) => {
		try {
			const parsed = JSON.parse(json)
			const { agentConfig, policyConfig, targetAllocation } = parsed
			set((s) => ({
				agentConfig: agentConfig ?? s.agentConfig,
				policyConfig: policyConfig ?? s.policyConfig,
				targetAllocation: targetAllocation ?? s.targetAllocation,
			}))
			save()
		} catch (e) {
			console.error('Invalid config JSON', e)
		}
	},

	refreshSuggestions: () => {
		const { agentConfig } = get()
		const suggestions: string[] = []
		if (agentConfig.enableStableReserve) suggestions.push('Maintain ≥20% in stables as downside protection')
		if (agentConfig.enableMomentum) suggestions.push('Overweight recent outperformers by +2% tilt')
		suggestions.push(`Risk tolerance ${agentConfig.riskTolerance}: adjust VOL target accordingly`)
		set({ agentSuggestions: suggestions })
		save()
	},

	simulateRebalance: () => {
		const state = get()
		const total = state.assets.reduce((s, a) => s + a.valueUSD, 0)
		const newAssets = state.assets.map((a) => {
			const targetValue = (state.targetAllocation[a.symbol] / 100) * total
			return { ...a, valueUSD: Math.round(targetValue), currentPct: (targetValue / total) * 100 }
		})
		set({ assets: newAssets, lastRebalance: Date.now() })
		save()
	},

	runPolicy: () => {
		const state = get()
		const total = state.assets.reduce((s, a) => s + a.valueUSD, 0)
		const stableSymbols = ['USDC', 'USDT', 'DAI']
		const stablePct = state.assets.filter(a => stableSymbols.includes(a.symbol)).reduce((s, a) => s + a.valueUSD, 0) / total * 100
		const actions: PolicyDecision['actions'] = []

		// AI-Enhanced Market Analysis
		const marketSentiment = state.marketIntelligence.sentiment
		const fearGreed = state.marketIntelligence.fearGreedIndex
		const volatility = state.risk.volatilityPct

		// Calculate AI confidence and risk scores
		let confidence = 70 // Base confidence
		let riskScore = 50 // Base risk
		let expectedReturn = 0

		// Market sentiment adjustments
		if (state.agentConfig.enableMarketSentiment) {
			if (marketSentiment < -30) {
				confidence += 15
				riskScore += 20
				actions.push({
					type: 'INCREASE',
					asset: 'USDC',
					deltaPct: 5,
					reason: 'Bearish sentiment detected: increase stable allocation',
					priority: 'HIGH',
					aiReasoning: `Market sentiment at ${marketSentiment}, fear/greed at ${fearGreed}. AI recommends defensive positioning.`
				})
			} else if (marketSentiment > 30) {
				confidence += 10
				riskScore -= 10
				expectedReturn += 3
				actions.push({
					type: 'INCREASE',
					asset: 'ETH',
					deltaPct: 3,
					reason: 'Bullish sentiment: increase risk asset exposure',
					priority: 'MEDIUM',
					aiReasoning: `Positive market sentiment (${marketSentiment}) suggests opportunity for risk-on positioning.`
				})
			}
		}

		// ML-inspired portfolio optimization
		if (state.agentConfig.enableMLOptimization) {
			// Simulate momentum signals
			const ethMomentum = Math.sin(Date.now() / 86400000) * 0.3 + 0.1
			const btcMomentum = Math.cos(Date.now() / 86400000) * 0.2 + 0.05

			if (ethMomentum > 0.2) {
				actions.push({
					type: 'INCREASE',
					asset: 'ETH',
					deltaPct: 2,
					reason: 'ML momentum signal: ETH showing strong momentum',
					priority: 'MEDIUM',
					aiReasoning: `Momentum algorithm detected positive ETH signal (${(ethMomentum * 100).toFixed(1)}%). Risk-adjusted allocation increase recommended.`
				})
			}

			if (btcMomentum < -0.1) {
				actions.push({
					type: 'REDUCE',
					asset: 'BTC',
					deltaPct: 1.5,
					reason: 'ML momentum signal: BTC showing weakness',
					priority: 'LOW',
					aiReasoning: `Momentum algorithm detected negative BTC signal (${(btcMomentum * 100).toFixed(1)}%). Minor position reduction suggested.`
				})
			}
		}

		// Enhanced constraint checking
		if (stablePct < state.policyConfig.minStableReservePct && state.agentConfig.enableStableReserve) {
			const needed = state.policyConfig.minStableReservePct - stablePct
			actions.push({
				type: 'INCREASE',
				asset: 'USDC',
				deltaPct: needed,
				reason: `Raise stables to ≥${state.policyConfig.minStableReservePct}% (currently ${stablePct.toFixed(2)}%)`,
				priority: 'HIGH',
				aiReasoning: 'Risk management protocol requires minimum stable reserve maintenance for downside protection.'
			})
			riskScore += 15
		}

		// Max single-asset weight with AI reasoning
		for (const a of state.assets) {
			if (a.currentPct > state.policyConfig.maxSingleAssetPct) {
				const reduceBy = a.currentPct - state.policyConfig.maxSingleAssetPct
				actions.push({
					type: 'REDUCE',
					asset: a.symbol,
					deltaPct: reduceBy,
					reason: `Cap ${a.symbol} to ≤${state.policyConfig.maxSingleAssetPct}% (currently ${a.currentPct.toFixed(2)}%)`,
					priority: 'CRITICAL',
					aiReasoning: `Concentration risk detected. Asset ${a.symbol} exceeds maximum allocation threshold, creating systemic risk exposure.`
				})
				riskScore += 25
			}
		}

		// Volatility-based adjustments
		if (volatility > 15) {
			actions.push({
				type: 'HEDGE',
				deltaPct: 5,
				reason: 'High volatility detected: implementing hedging strategy',
				priority: 'HIGH',
				aiReasoning: `Portfolio volatility at ${volatility.toFixed(2)}% exceeds comfort zone. Hedging recommended to reduce downside risk.`
			})
			riskScore += 20
		}

		// Risk tolerance adjustments with AI enhancement
		if (state.agentConfig.riskTolerance >= 8) {
			expectedReturn += 5
			actions.push({
				type: 'INCREASE',
				asset: 'ETH',
				deltaPct: 2,
				reason: 'High risk tolerance: opportunistic allocation increase',
				priority: 'MEDIUM',
				aiReasoning: `Risk profile allows for aggressive positioning. Current market conditions favor increased exposure to growth assets.`
			})
		} else if (state.agentConfig.riskTolerance <= 3) {
			riskScore += 10
			actions.push({
				type: 'REDUCE',
				asset: 'ALT',
				deltaPct: 2,
				reason: 'Conservative risk profile: reducing speculative exposure',
				priority: 'MEDIUM',
				aiReasoning: `Low risk tolerance requires defensive positioning. Reducing exposure to high-volatility assets to preserve capital.`
			})
		}

		// Market condition assessment
		const marketConditions = {
			sentiment: marketSentiment > 20 ? 'BULLISH' : marketSentiment < -20 ? 'BEARISH' : 'NEUTRAL',
			volatility: volatility > 20 ? 'HIGH' : volatility > 10 ? 'MEDIUM' : 'LOW',
			liquidityRisk: fearGreed < 25 ? 'HIGH' : fearGreed < 50 ? 'MEDIUM' : 'LOW'
		} as const

		const decision: PolicyDecision = {
			id: `pd_${Date.now()}`,
			date: Date.now(),
			summary: actions.length ? `AI Policy Engine: ${actions.length} actions recommended` : 'AI Analysis: Portfolio optimally positioned',
			confidence: Math.min(100, Math.max(0, confidence)),
			riskScore: Math.min(100, Math.max(0, riskScore)),
			expectedReturn,
			actions,
			marketConditions
		}

		set({ policyLog: [decision, ...state.policyLog].slice(0, 20) })
		save()
	},

	computeAnalytics: () => {
		const state = get()
		// Risk metrics
		const total = state.assets.reduce((s, a) => s + a.valueUSD, 0)
		const byAssetPct: Record<string, number> = {}
		state.assets.forEach(a => { byAssetPct[a.symbol] = (a.valueUSD / total) * 100 })
		// Volatility from navHistory last 14 days
		const nav = state.navHistory.map(n => n.nav)
		const returns: number[] = []
		for (let i = 1; i < nav.length; i++) returns.push((nav[i] - nav[i - 1]) / nav[i - 1])
		const mean = returns.reduce((s, r) => s + r, 0) / Math.max(returns.length, 1)
		const varc = returns.reduce((s, r) => s + (r - mean) * (r - mean), 0) / Math.max(returns.length, 1)
		const volatilityPct = Math.sqrt(varc) * 100

		// Forecasts simple drift + volatility bands for 7/30/90 days (daily)
		const last = nav[nav.length - 1] || total
		const drift = mean // daily drift
		const horizonDays = [7, 30, 90]
		const forecasts: ForecastPoint[] = []
		horizonDays.forEach((d) => {
			const mu = last * Math.pow(1 + drift, d)
			const sigma = volatilityPct / 100
			const low = mu * (1 - 1.96 * sigma)
			const high = mu * (1 + 1.96 * sigma)
			forecasts.push({ date: `${d}d`, mean: Math.max(0, mu), low: Math.max(0, low), high: Math.max(0, high) })
		})

		// Anomalies: large tx > 5% AUM, or AUM daily jump > 4%
		const anomalies: Anomaly[] = []
		const aum = total
		state.transactions.forEach(t => {
			if (t.valueUSD > aum * 0.05) anomalies.push({ id: `tx_${t.id}`, date: t.date, kind: 'TX_LARGE', message: `Large transaction ${t.type} ${t.asset} $${t.valueUSD.toLocaleString()}` })
		})
		for (let i = 1; i < nav.length; i++) {
			const pct = Math.abs((nav[i] - nav[i - 1]) / nav[i - 1])
			if (pct > 0.04) anomalies.push({ id: `aum_${i}`, date: new Date(state.navHistory[i].date).getTime() || Date.now(), kind: 'AUM_JUMP', message: `AUM moved ${(pct * 100).toFixed(1)}% day-over-day` })
		}

		set({ risk: { byAssetPct, volatilityPct }, forecasts, anomalies })
		save()
	},

	runScenario: () => {
		const { scenario, assets, navHistory } = get()
		const notes: string[] = []
		const recommendations: string[] = []
		const total = assets.reduce((s, a) => s + a.valueUSD, 0)
		const dropFactor = Math.max(0, 1 - scenario.assetDropPct / 100)
		const expenseHit = scenario.expenseRisePct / 100 * total * 0.02 // assume 2% monthly burn proxy
		const riskAssets = assets.filter(a => a.symbol !== 'USDC' && a.symbol !== 'USDT' && a.symbol !== 'DAI')
		const riskValue = riskAssets.reduce((s, a) => s + a.valueUSD, 0)
		const projectedAUM = Math.max(0, (riskValue * dropFactor) + (total - riskValue) - expenseHit)

		notes.push(`Risk assets drop ${scenario.assetDropPct}%`)
		notes.push(`Expenses rise ${scenario.expenseRisePct}%`)

		// Calculate advanced risk metrics
		const nav = navHistory.map(n => n.nav)
		const returns: number[] = []
		for (let i = 1; i < nav.length; i++) returns.push((nav[i] - nav[i - 1]) / nav[i - 1])

		const mean = returns.reduce((s, r) => s + r, 0) / Math.max(returns.length, 1)
		const variance = returns.reduce((s, r) => s + (r - mean) * (r - mean), 0) / Math.max(returns.length, 1)
		const volatility = Math.sqrt(variance)

		// Value at Risk (95% confidence)
		const valueAtRisk = total * (mean - 1.645 * volatility)

		// Expected Shortfall (average loss beyond VaR)
		const expectedShortfall = total * (mean - 2.33 * volatility)

		// Maximum Drawdown simulation
		let peak = nav[0]
		let maxDrawdown = 0
		for (const value of nav) {
			if (value > peak) peak = value
			const drawdown = (peak - value) / peak
			if (drawdown > maxDrawdown) maxDrawdown = drawdown
		}

		// Sharpe Ratio (assuming risk-free rate of 2%)
		const riskFreeRate = 0.02 / 365 // daily
		const sharpeRatio = (mean - riskFreeRate) / volatility

		const riskMetrics = {
			valueAtRisk: Math.abs(valueAtRisk),
			expectedShortfall: Math.abs(expectedShortfall),
			maxDrawdown: maxDrawdown * 100,
			sharpeRatio
		}

		// Generate recommendations based on scenario results
		const lossPercent = ((total - projectedAUM) / total) * 100

		if (lossPercent > 20) {
			recommendations.push('CRITICAL: Consider emergency hedging strategies')
			recommendations.push('Increase stable allocation to 40%+ immediately')
			recommendations.push('Implement stop-loss mechanisms for risk assets')
		} else if (lossPercent > 10) {
			recommendations.push('Moderate risk detected: increase stable reserves')
			recommendations.push('Consider partial position hedging')
			recommendations.push('Review and tighten risk management policies')
		} else {
			recommendations.push('Portfolio shows resilience to stress scenario')
			recommendations.push('Current allocation appears well-balanced')
			recommendations.push('Monitor for early warning signals')
		}

		if (riskMetrics.maxDrawdown > 25) {
			recommendations.push('Historical drawdown exceeds comfort zone')
			recommendations.push('Implement dynamic hedging based on volatility')
		}

		if (riskMetrics.sharpeRatio < 0.5) {
			recommendations.push('Risk-adjusted returns below optimal')
			recommendations.push('Consider rebalancing toward higher Sharpe assets')
		}

		set({ scenarioResult: { projectedAUM, notes, riskMetrics, recommendations } })
		save()
	},

	generateAIInsights: () => {
		const state = get()
		const insights: AIInsight[] = []
		const now = Date.now()

		// Only generate insights if wallet is connected and has real data
		if (!state.walletConnected || !state.useRealData || state.walletAssets.length === 0) {
			set({ aiInsights: [] })
			save()
			return
		}

		const totalValue = state.walletAssets.reduce((sum, asset) => sum + asset.valueUSD, 0)
		// const userTokens = state.walletAssets.map(a => a.symbol)

		// Portfolio composition analysis
		const stableValue = state.walletAssets
			.filter(a => ['USDC', 'USDT', 'DAI', 'USDC.e'].includes(a.symbol))
			.reduce((sum, a) => sum + a.valueUSD, 0)
		const stablePct = (stableValue / totalValue) * 100

		// Risk management insights
		if (stablePct < 15) {
			insights.push({
				id: `insight_${now}_low_stable`,
				timestamp: now,
				type: 'RISK',
				title: 'Low Stablecoin Allocation Detected',
				description: `Your portfolio has only ${stablePct.toFixed(1)}% in stablecoins. Consider increasing to 20-30% for better risk management.`,
				confidence: 88,
				impact: 'HIGH',
				actionable: true,
				suggestedActions: ['Add USDC to portfolio', 'Rebalance to increase stable allocation', 'Set up DeFi yield farming with stables']
			})
		}

		// Concentration risk analysis
		const largestHolding = Math.max(...state.walletAssets.map(a => a.currentPct))
		if (largestHolding > 70) {
			const dominantAsset = state.walletAssets.find(a => a.currentPct === largestHolding)
			insights.push({
				id: `insight_${now}_concentration`,
				timestamp: now,
				type: 'RISK',
				title: 'High Concentration Risk',
				description: `${dominantAsset?.symbol} represents ${largestHolding.toFixed(1)}% of your portfolio. This creates significant concentration risk.`,
				confidence: 92,
				impact: 'HIGH',
				actionable: true,
				suggestedActions: ['Diversify into other assets', 'Gradually reduce position size', 'Consider dollar-cost averaging out']
			})
		}

		// Yield optimization opportunities
		if (stablePct > 10) {
			insights.push({
				id: `insight_${now}_yield`,
				timestamp: now,
				type: 'OPPORTUNITY',
				title: 'Yield Optimization Opportunity',
				description: `Your ${stableValue.toLocaleString()} in stablecoins could earn 4-6% APY through DeFi lending protocols.`,
				confidence: 85,
				impact: 'MEDIUM',
				actionable: true,
				suggestedActions: ['Explore Aave lending', 'Consider Compound protocol', 'Research stablecoin yield farms']
			})
		}

		// ETH staking opportunity
		const ethValue = state.walletAssets
			.filter(a => a.symbol === 'ETH' || a.symbol === 'WETH')
			.reduce((sum, a) => sum + a.valueUSD, 0)
		if (ethValue > 100) {
			insights.push({
				id: `insight_${now}_eth_staking`,
				timestamp: now,
				type: 'OPPORTUNITY',
				title: 'ETH Staking Opportunity',
				description: `Your ${ethValue.toLocaleString()} in ETH could earn ~4.2% APY through staking while supporting network security.`,
				confidence: 90,
				impact: 'MEDIUM',
				actionable: true,
				suggestedActions: ['Consider liquid staking with Lido', 'Explore Rocket Pool', 'Research solo staking requirements']
			})
		}

		// Small portfolio guidance
		if (totalValue < 1000) {
			insights.push({
				id: `insight_${now}_small_portfolio`,
				timestamp: now,
				type: 'OPTIMIZATION',
				title: 'Small Portfolio Strategy',
				description: `With a $${totalValue.toLocaleString()} portfolio, focus on 2-3 established assets rather than over-diversification.`,
				confidence: 85,
				impact: 'MEDIUM',
				actionable: true,
				suggestedActions: ['Focus on ETH and BTC', 'Maintain 20% in stables', 'Avoid too many small positions']
			})
		}

		// Chain-specific insights
		if (state.walletChainId === 1 && totalValue > 50) { // Ethereum mainnet
			insights.push({
				id: `insight_${now}_gas_optimization`,
				timestamp: now,
				type: 'OPTIMIZATION',
				title: 'Gas Fee Optimization',
				description: 'You\'re on Ethereum mainnet. Consider Layer 2 solutions for lower transaction costs.',
				confidence: 80,
				impact: 'MEDIUM',
				actionable: true,
				suggestedActions: ['Bridge to Arbitrum', 'Explore Polygon', 'Use Optimism for DeFi']
			})
		}

		// Portfolio growth insights
		if (totalValue > 10000) {
			insights.push({
				id: `insight_${now}_advanced_strategies`,
				timestamp: now,
				type: 'OPPORTUNITY',
				title: 'Advanced Strategy Opportunities',
				description: `With a $${totalValue.toLocaleString()} portfolio, you can explore advanced DeFi strategies and yield optimization.`,
				confidence: 75,
				impact: 'MEDIUM',
				actionable: true,
				suggestedActions: ['Explore liquidity providing', 'Consider yield farming', 'Research options strategies']
			})
		}

		set({ aiInsights: insights.slice(0, 10) })
		save()
	},

	optimizePortfolio: () => {
		const state = get()
		// Simulate ML-based portfolio optimization
		const insights: AIInsight[] = []
		const now = Date.now()

		// Calculate optimal weights using simulated mean-variance optimization

		// Simulate correlation-based optimization
		const optimizedWeights: Record<string, number> = {}
		let remainingWeight = 100

		// Stable allocation based on risk tolerance
		const stableWeight = Math.max(20, 50 - state.agentConfig.riskTolerance * 3)
		optimizedWeights['USDC'] = stableWeight
		remainingWeight -= stableWeight

		// Risk assets allocation
		const riskTolerance = state.agentConfig.riskTolerance / 10
		optimizedWeights['ETH'] = remainingWeight * 0.5 * (1 + riskTolerance * 0.3)
		optimizedWeights['BTC'] = remainingWeight * 0.35 * (1 + riskTolerance * 0.2)
		optimizedWeights['ALT'] = remainingWeight * 0.15 * (1 + riskTolerance * 0.5)

		// Normalize weights
		const totalWeight = Object.values(optimizedWeights).reduce((s, w) => s + w, 0)
		Object.keys(optimizedWeights).forEach(key => {
			optimizedWeights[key] = (optimizedWeights[key] / totalWeight) * 100
		})

		set({ targetAllocation: optimizedWeights })

		insights.push({
			id: `insight_${now}_optimization`,
			timestamp: now,
			type: 'OPTIMIZATION',
			title: 'Portfolio Optimization Complete',
			description: 'AI has calculated optimal portfolio weights based on current market conditions and risk profile.',
			confidence: 88,
			impact: 'HIGH',
			actionable: true,
			suggestedActions: ['Review new target allocations', 'Execute rebalancing', 'Monitor performance']
		})

		set({ aiInsights: [insights[0], ...state.aiInsights].slice(0, 50) })
		save()
	},

	updateMarketIntelligence: () => {
		// Simulate real-time market data updates
		const sentiment = -50 + Math.random() * 100 // -50 to 50
		const fearGreed = Math.random() * 100

		// Simulate correlation matrix
		const correlationMatrix: Record<string, Record<string, number>> = {}
		const assets = ['ETH', 'BTC', 'ALT', 'USDC']
		assets.forEach(a1 => {
			correlationMatrix[a1] = {}
			assets.forEach(a2 => {
				if (a1 === a2) {
					correlationMatrix[a1][a2] = 1
				} else if (a1 === 'USDC' || a2 === 'USDC') {
					correlationMatrix[a1][a2] = -0.1 + Math.random() * 0.3
				} else {
					correlationMatrix[a1][a2] = 0.3 + Math.random() * 0.6
				}
			})
		})

		// Simulate momentum signals
		const momentumSignals: Record<string, number> = {}
		assets.forEach(asset => {
			momentumSignals[asset] = -1 + Math.random() * 2 // -1 to 1
		})

		// Simulate liquidity scores
		const liquidityScores: Record<string, number> = {}
		assets.forEach(asset => {
			liquidityScores[asset] = asset === 'USDC' ? 95 + Math.random() * 5 : 60 + Math.random() * 35
		})

		set({
			marketIntelligence: {
				sentiment,
				fearGreedIndex: fearGreed,
				correlationMatrix,
				momentumSignals,
				liquidityScores
			}
		})
		save()
	},

	createGovernanceProposal: (proposal) => {
		const state = get()
		const newProposal: GovernanceProposal = {
			...proposal,
			id: `prop_${Date.now()}`,
			votes: { for: 0, against: 0, abstain: 0 },
			status: 'ACTIVE'
		}
		set({ governanceProposals: [newProposal, ...state.governanceProposals] })
		save()
	},

	voteOnProposal: (id, vote, power) => {
		const state = get()
		const proposals = state.governanceProposals.map(p => {
			if (p.id === id) {
				const newVotes = { ...p.votes }
				newVotes[vote] += power
				return { ...p, votes: newVotes }
			}
			return p
		})
		set({ governanceProposals: proposals })
		save()
	},

	setWalletConnected: (connected, address, chainId) => {
		set({
			walletConnected: connected,
			walletAddress: address,
			walletChainId: chainId,
			useRealData: connected // Automatically switch to real data when wallet is connected
		})

		// Clear demo data when wallet disconnects
		if (!connected) {
			set({
				walletAssets: [],
				news: [],
				tokenRecommendations: [],
				marketTrends: [],
				aiInsights: []
			})
		}
		save()
	},

	updateWalletAssets: (walletAssets) => {
		const state = get()

		// Always update wallet assets
		set({ walletAssets })

		// If using real data and wallet is connected, update main portfolio
		if (state.useRealData && state.walletConnected && walletAssets.length > 0) {
			const totalValue = walletAssets.reduce((sum, asset) => sum + asset.valueUSD, 0)

			// Calculate 24h PnL (mock for now - in real app would compare with previous day)
			const mockPnL = totalValue * 0.02 // 2% gain for demo

			// Calculate cash balance (stablecoins)
			const cashBalance = walletAssets
				.filter(a => ['USDC', 'USDT', 'DAI', 'USDC.e'].includes(a.symbol))
				.reduce((sum, a) => sum + a.valueUSD, 0)

			// Determine risk level based on portfolio composition
			const stablePct = (cashBalance / totalValue) * 100
			const riskLevel = stablePct > 60 ? 'Low' : stablePct > 30 ? 'Medium' : 'High'

			// Update KPIs with real data
			const newKpis = {
				totalAUM: totalValue,
				last24hPnL: mockPnL,
				cashBalance,
				riskLevel: riskLevel as 'Low' | 'Medium' | 'High'
			}

			// Create target allocation based on current wallet composition
			const newTargetAllocation: Record<string, number> = {}
			walletAssets.forEach(asset => {
				newTargetAllocation[asset.symbol] = asset.currentPct
			})

			// Update NAV history with current value
			const today = new Date().toLocaleDateString()
			const updatedNavHistory = [
				...state.navHistory.slice(1), // Remove oldest entry
				{ date: today, nav: totalValue }
			]

			set({
				assets: walletAssets,
				kpis: newKpis,
				targetAllocation: newTargetAllocation,
				navHistory: updatedNavHistory
			})
		}
		save()
	},

	toggleDataSource: () => {
		const state = get()
		const newUseRealData = !state.useRealData

		if (newUseRealData && state.walletAssets.length > 0) {
			// Switch to real data
			const totalValue = state.walletAssets.reduce((sum, asset) => sum + asset.valueUSD, 0)
			const newKpis = {
				...state.kpis,
				totalAUM: totalValue,
				cashBalance: state.walletAssets
					.filter(a => ['USDC', 'USDT', 'DAI'].includes(a.symbol))
					.reduce((sum, a) => sum + a.valueUSD, 0)
			}

			set({
				useRealData: newUseRealData,
				assets: state.walletAssets,
				kpis: newKpis
			})
		} else {
			// Switch back to demo data
			set({
				useRealData: newUseRealData,
				assets: initialState.assets,
				kpis: initialState.kpis,
				targetAllocation: initialState.targetAllocation
			})
		}
		save()
	},

	generateNews: () => {
		const state = get()
		const now = Date.now()

		// Generate news relevant to user's wallet assets
		const userTokens = state.walletAssets.map(a => a.symbol)
		const hasETH = userTokens.includes('ETH') || userTokens.includes('WETH')
		const hasBTC = userTokens.includes('BTC') || userTokens.includes('WBTC')
		const hasStables = userTokens.some(t => ['USDC', 'USDT', 'DAI', 'USDC.e'].includes(t))

		const newsItems: NewsItem[] = []

		// ETH-related news if user holds ETH
		if (hasETH) {
			newsItems.push({
				id: `news_${now}_eth`,
				title: 'Ethereum Staking Rewards Reach 4.2% APY',
				summary: 'Ethereum staking yields have increased due to higher network activity and MEV rewards. Current validators earning attractive returns.',
				category: 'DEFI',
				sentiment: 'BULLISH',
				impact: 'MEDIUM',
				timestamp: now - 1800000, // 30 min ago
				source: 'Ethereum Foundation',
				relevantTokens: ['ETH']
			})
		}

		// BTC-related news if user holds BTC
		if (hasBTC) {
			newsItems.push({
				id: `news_${now}_btc`,
				title: 'Bitcoin ETF Inflows Continue Strong Momentum',
				summary: 'Institutional Bitcoin ETFs see continued inflows as traditional finance embraces digital assets. Total AUM exceeds $50B.',
				category: 'MARKET',
				sentiment: 'BULLISH',
				impact: 'HIGH',
				timestamp: now - 3600000, // 1 hour ago
				source: 'Bloomberg ETF',
				relevantTokens: ['BTC']
			})
		}

		// Stablecoin news if user holds stables
		if (hasStables) {
			newsItems.push({
				id: `news_${now}_stable`,
				title: 'Stablecoin Yields Rise to 5.2% on DeFi Protocols',
				summary: 'Leading DeFi lending protocols now offer attractive yields on USDC and USDT deposits as borrowing demand increases.',
				category: 'DEFI',
				sentiment: 'BULLISH',
				impact: 'MEDIUM',
				timestamp: now - 7200000, // 2 hours ago
				source: 'DeFi Pulse',
				relevantTokens: userTokens.filter(t => ['USDC', 'USDT', 'DAI', 'USDC.e'].includes(t))
			})
		}

		// General market news
		newsItems.push({
			id: `news_${now}_general1`,
			title: 'Crypto Market Shows Resilience Amid Economic Uncertainty',
			summary: 'Digital assets maintain stability as traditional markets face headwinds. Institutional adoption continues to drive long-term growth.',
			category: 'MARKET',
			sentiment: 'NEUTRAL',
			impact: 'MEDIUM',
			timestamp: now - 10800000, // 3 hours ago
			source: 'CoinDesk',
			relevantTokens: userTokens.slice(0, 3)
		})

		// Add security news if user has DeFi tokens
		const defiTokens = userTokens.filter(t => ['AAVE', 'COMP', 'UNI', 'SUSHI', 'MKR'].includes(t))
		if (defiTokens.length > 0) {
			newsItems.push({
				id: `news_${now}_defi_security`,
				title: 'Enhanced Security Measures Implemented Across DeFi Protocols',
				summary: 'Major DeFi protocols upgrade security infrastructure following recent industry developments. New audit standards being adopted.',
				category: 'SECURITY',
				sentiment: 'NEUTRAL',
				impact: 'MEDIUM',
				timestamp: now - 14400000, // 4 hours ago
				source: 'DeFi Safety',
				relevantTokens: defiTokens
			})
		}

		// Add regulatory news relevant to user's holdings
		if (hasStables || hasETH || hasBTC) {
			newsItems.push({
				id: `news_${now}_regulation`,
				title: 'Regulatory Clarity Improves for Digital Asset Custody',
				summary: 'New guidelines provide clearer framework for institutional custody of digital assets, boosting confidence in the sector.',
				category: 'REGULATION',
				sentiment: 'BULLISH',
				impact: 'MEDIUM',
				timestamp: now - 18000000, // 5 hours ago
				source: 'Financial Times',
				relevantTokens: userTokens.filter(t => ['ETH', 'BTC', 'USDC', 'USDT'].includes(t))
			})
		}

		// Only show news if user has wallet connected
		if (!state.walletConnected || !state.useRealData) {
			set({ news: [] })
		} else {
			set({ news: newsItems.slice(0, 5) }) // Limit to 5 most relevant news items
		}

		set({ news: newsItems })
		save()
	},

	generateTokenRecommendations: () => {
		const state = get()
		const now = Date.now()

		// Only generate recommendations if wallet is connected and has assets
		if (!state.walletConnected || !state.useRealData || state.walletAssets.length === 0) {
			set({ tokenRecommendations: [] })
			save()
			return
		}

		// Analyze current portfolio composition
		const totalValue = state.walletAssets.reduce((sum, asset) => sum + asset.valueUSD, 0)
		// const hasStables = state.walletAssets.some(a => ['USDC', 'USDT', 'DAI', 'USDC.e'].includes(a.symbol))
		const hasETH = state.walletAssets.some(a => a.symbol === 'ETH' || a.symbol === 'WETH')
		const hasBTC = state.walletAssets.some(a => a.symbol === 'BTC' || a.symbol === 'WBTC')

		// Calculate current allocations
		const stableValue = state.walletAssets
			.filter(a => ['USDC', 'USDT', 'DAI', 'USDC.e'].includes(a.symbol))
			.reduce((sum, a) => sum + a.valueUSD, 0)
		const stablePct = (stableValue / totalValue) * 100

		const ethValue = state.walletAssets
			.filter(a => a.symbol === 'ETH' || a.symbol === 'WETH')
			.reduce((sum, a) => sum + a.valueUSD, 0)
		const ethPct = (ethValue / totalValue) * 100

		// const btcValue = state.walletAssets
		//	.filter(a => a.symbol === 'BTC' || a.symbol === 'WBTC')
		//	.reduce((sum, a) => sum + a.valueUSD, 0)
		// const btcPct = (btcValue / totalValue) * 100

		const recommendations: TokenRecommendation[] = []

		// Risk management recommendations based on actual portfolio
		if (stablePct < 20) {
			recommendations.push({
				id: `rec_${now}_usdc`,
				symbol: 'USDC',
				name: 'USD Coin',
				category: 'STABLECOIN',
				reason: `Your portfolio has only ${stablePct.toFixed(1)}% in stablecoins. Consider increasing to 20-30% for better risk management.`,
				aiScore: 95,
				riskLevel: 'LOW',
				expectedReturn: 4.5,
				timeHorizon: '1Y',
				marketCap: 32000000000,
				priceChange24h: 0.01,
				volume24h: 2800000000,
				pros: ['Price stability', 'High liquidity', 'Yield opportunities', 'Risk reduction'],
				cons: ['No price appreciation', 'Inflation risk'],
				allocation: Math.max(5, 25 - stablePct)
			})
		}

		// Diversification recommendations
		if (!hasETH && totalValue > 100) {
			recommendations.push({
				id: `rec_${now}_eth`,
				symbol: 'ETH',
				name: 'Ethereum',
				category: 'L1',
				reason: 'Missing exposure to the leading smart contract platform. ETH provides access to the largest DeFi ecosystem.',
				aiScore: 88,
				riskLevel: 'MEDIUM',
				expectedReturn: 15.2,
				timeHorizon: '6M',
				marketCap: 380000000000,
				priceChange24h: 2.4,
				volume24h: 12000000000,
				pros: ['DeFi ecosystem leader', 'Staking rewards (4-5% APY)', 'Network effects', 'Developer activity'],
				cons: ['High gas fees', 'Scalability challenges', 'Volatility'],
				allocation: 30
			})
		}

		if (!hasBTC && totalValue > 500) {
			recommendations.push({
				id: `rec_${now}_btc`,
				symbol: 'BTC',
				name: 'Bitcoin',
				category: 'L1',
				reason: 'Bitcoin provides portfolio diversification and acts as digital gold. Consider adding for store of value properties.',
				aiScore: 85,
				riskLevel: 'MEDIUM',
				expectedReturn: 12.8,
				timeHorizon: '1Y',
				marketCap: 1200000000000,
				priceChange24h: 1.8,
				volume24h: 15000000000,
				pros: ['Store of value', 'Institutional adoption', 'Limited supply', 'Network security'],
				cons: ['High volatility', 'Limited utility', 'Energy concerns'],
				allocation: 20
			})
		}

		// Over-concentration warnings and rebalancing suggestions
		if (ethPct > 50) {
			recommendations.push({
				id: `rec_${now}_diversify`,
				symbol: 'USDC',
				name: 'Diversification',
				category: 'STABLECOIN',
				reason: `Your ETH allocation is ${ethPct.toFixed(1)}%, which is quite concentrated. Consider rebalancing to reduce risk.`,
				aiScore: 90,
				riskLevel: 'LOW',
				expectedReturn: 4.5,
				timeHorizon: '1M',
				marketCap: 32000000000,
				priceChange24h: 0.01,
				volume24h: 2800000000,
				pros: ['Risk reduction', 'Portfolio stability', 'Liquidity'],
				cons: ['Lower potential returns'],
				allocation: 15
			})
		}

		// Chain-specific recommendations based on current chain
		if (state.walletChainId === 1 && totalValue > 50) { // Ethereum mainnet
			recommendations.push({
				id: `rec_${now}_arb`,
				symbol: 'ARB',
				name: 'Arbitrum',
				category: 'L2',
				reason: 'You\'re on Ethereum mainnet. Arbitrum offers lower fees while maintaining Ethereum compatibility.',
				aiScore: 78,
				riskLevel: 'MEDIUM',
				expectedReturn: 22.8,
				timeHorizon: '3M',
				marketCap: 8500000000,
				priceChange24h: 5.7,
				volume24h: 450000000,
				pros: ['Lower fees than Ethereum', 'Fast transactions', 'Growing ecosystem', 'Ethereum security'],
				cons: ['Centralized sequencer', 'Token unlock schedule', 'Newer technology'],
				allocation: Math.min(10, totalValue / 100)
			})
		}

		// Small portfolio specific recommendations
		if (totalValue < 1000) {
			recommendations.push({
				id: `rec_${now}_small_portfolio`,
				symbol: 'ETH',
				name: 'Ethereum Focus',
				category: 'L1',
				reason: 'For smaller portfolios, focusing on established assets like ETH provides better risk-adjusted returns than over-diversification.',
				aiScore: 92,
				riskLevel: 'MEDIUM',
				expectedReturn: 15.2,
				timeHorizon: '6M',
				marketCap: 380000000000,
				priceChange24h: 2.4,
				volume24h: 12000000000,
				pros: ['Established track record', 'High liquidity', 'Staking rewards', 'Lower fees than BTC'],
				cons: ['Volatility', 'Gas fees'],
				allocation: 60
			})
		}

		// Limit to top 4 most relevant recommendations
		set({ tokenRecommendations: recommendations.slice(0, 4) })
		save()
	},

	generateMarketTrends: () => {
		const state = get()
		const now = Date.now()

		// Only generate trends if wallet is connected
		if (!state.walletConnected || !state.useRealData) {
			set({ marketTrends: [] })
			save()
			return
		}

		const userTokens = state.walletAssets.map(a => a.symbol)
		const trends: MarketTrend[] = []

		// ETH-related trends if user holds ETH
		if (userTokens.includes('ETH') || userTokens.includes('WETH')) {
			trends.push({
				id: `trend_${now}_eth`,
				title: 'Ethereum Staking Adoption Accelerating',
				description: 'Your ETH holdings benefit from increasing staking adoption and network upgrades improving scalability and efficiency',
				trend: 'BULLISH',
				strength: 82,
				timeframe: '1M',
				affectedTokens: ['ETH'],
				tradingOpportunity: {
					action: 'HOLD',
					confidence: 85
				}
			})
		}

		// BTC-related trends if user holds BTC
		if (userTokens.includes('BTC') || userTokens.includes('WBTC')) {
			trends.push({
				id: `trend_${now}_btc`,
				title: 'Bitcoin ETF Institutional Inflows',
				description: 'Your Bitcoin position aligns with institutional accumulation trend as ETFs continue seeing strong inflows',
				trend: 'BULLISH',
				strength: 78,
				timeframe: '1M',
				affectedTokens: ['BTC', 'WBTC'],
				tradingOpportunity: {
					action: 'HOLD',
					confidence: 88
				}
			})
		}

		// Stablecoin trends if user holds stables
		const userStables = userTokens.filter(t => ['USDC', 'USDT', 'DAI', 'USDC.e'].includes(t))
		if (userStables.length > 0) {
			trends.push({
				id: `trend_${now}_stables`,
				title: 'Stablecoin Yield Opportunities Rising',
				description: 'Your stablecoin holdings can earn attractive yields as DeFi lending rates increase due to higher borrowing demand',
				trend: 'BULLISH',
				strength: 65,
				timeframe: '1W',
				affectedTokens: userStables,
				tradingOpportunity: {
					action: 'HOLD',
					confidence: 92
				}
			})
		}

		// L2 trends if user is on Ethereum mainnet
		if (state.walletChainId === 1) {
			trends.push({
				id: `trend_${now}_l2`,
				title: 'Layer 2 Migration Opportunity',
				description: 'Being on Ethereum mainnet, you could benefit from L2 solutions offering lower fees and faster transactions',
				trend: 'BULLISH',
				strength: 75,
				timeframe: '1W',
				affectedTokens: ['ARB', 'OP', 'MATIC'],
				tradingOpportunity: {
					action: 'BUY',
					confidence: 70
				}
			})
		}

		// Portfolio concentration analysis
		const totalValue = state.walletAssets.reduce((sum, asset) => sum + asset.valueUSD, 0)
		const largestHolding = Math.max(...state.walletAssets.map(a => a.currentPct))

		if (largestHolding > 60) {
			const dominantAsset = state.walletAssets.find(a => a.currentPct === largestHolding)
			trends.push({
				id: `trend_${now}_concentration`,
				title: 'Portfolio Concentration Risk',
				description: `Your ${dominantAsset?.symbol} position represents ${largestHolding.toFixed(1)}% of your portfolio. Consider diversification to reduce risk.`,
				trend: 'BEARISH',
				strength: 70,
				timeframe: '1D',
				affectedTokens: [dominantAsset?.symbol || ''],
				tradingOpportunity: {
					action: 'SELL',
					confidence: 75
				}
			})
		}

		// Small portfolio guidance
		if (totalValue < 1000) {
			trends.push({
				id: `trend_${now}_small_portfolio`,
				title: 'Focus Strategy for Small Portfolios',
				description: 'With a smaller portfolio, focusing on 2-3 established assets typically provides better risk-adjusted returns than over-diversification',
				trend: 'SIDEWAYS',
				strength: 60,
				timeframe: '1M',
				affectedTokens: userTokens.slice(0, 3),
				tradingOpportunity: {
					action: 'HOLD',
					confidence: 80
				}
			})
		}

		set({ marketTrends: trends.slice(0, 5) })
		save()
	},

	login: (password) => {
		const ok = password.trim().length > 0
		if (ok) set({ isAuthenticated: true }); save();
		return ok
	},
	logout: () => { set({ isAuthenticated: false }); save() },
}))

function save() {
	try {
		const { setAgentConfig, setPolicyConfig, setTargetAllocation, exportConfig, importConfig, refreshSuggestions, simulateRebalance, runPolicy, computeAnalytics, runScenario, login, logout, ...data } = useTreasuryStore.getState() as any
		localStorage.setItem(persistKey, JSON.stringify(data))
	} catch { }
}