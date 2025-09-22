import { create } from 'zustand'

export type Asset = {
	symbol: string
	valueUSD: number
	currentPct: number
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
}

export type PolicyConfig = {
	minStableReservePct: number // e.g., 20
	maxSingleAssetPct: number // e.g., 40
}

export type PolicyDecision = {
	id: string
	date: number
	summary: string
	actions: { type: 'REBALANCE' | 'REDUCE' | 'INCREASE' | 'HOLD'; asset?: string; deltaPct?: number; reason: string }[]
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

	setAgentConfig: (cfg: AgentConfig) => void
	setPolicyConfig: (cfg: PolicyConfig) => void
	setTargetAllocation: (next: Record<string, number>) => void
	exportConfig: () => string
	importConfig: (json: string) => void
	refreshSuggestions: () => void
	simulateRebalance: () => void
	runPolicy: () => void
}

const initialState: Omit<TreasuryState, 'setAgentConfig' | 'setPolicyConfig' | 'setTargetAllocation' | 'exportConfig' | 'importConfig' | 'refreshSuggestions' | 'simulateRebalance' | 'runPolicy'> = {
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
	agentConfig: { riskTolerance: 6, enableStableReserve: true, enableMomentum: false },
	agentSuggestions: [
		'Rebalance 5% from USDC to ETH to reach target 40% ETH',
		'Increase BTC exposure by 3% to align with medium risk',
	],
	policyConfig: { minStableReservePct: 20, maxSingleAssetPct: 40 },
	policyLog: [],
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

		// Constraint 1: Minimum stable reserve
		if (stablePct < state.policyConfig.minStableReservePct && state.agentConfig.enableStableReserve) {
			const needed = state.policyConfig.minStableReservePct - stablePct
			actions.push({ type: 'INCREASE', asset: 'USDC', deltaPct: needed, reason: `Raise stables to ≥${state.policyConfig.minStableReservePct}% (currently ${stablePct.toFixed(2)}%)` })
		}

		// Constraint 2: Max single-asset weight
		for (const a of state.assets) {
			if (a.currentPct > state.policyConfig.maxSingleAssetPct) {
				const reduceBy = a.currentPct - state.policyConfig.maxSingleAssetPct
				actions.push({ type: 'REDUCE', asset: a.symbol, deltaPct: reduceBy, reason: `Cap ${a.symbol} to ≤${state.policyConfig.maxSingleAssetPct}% (currently ${a.currentPct.toFixed(2)}%)` })
			}
		}

		// Risk tuning: nudge risk asset depending on tolerance
		if (state.agentConfig.riskTolerance >= 8) {
			actions.push({ type: 'INCREASE', asset: 'ETH', deltaPct: 2, reason: 'High risk tolerance: add +2% to ETH' })
		} else if (state.agentConfig.riskTolerance <= 3) {
			actions.push({ type: 'REDUCE', asset: 'ALT', deltaPct: 2, reason: 'Low risk tolerance: trim -2% from ALT' })
		}

		const decision: PolicyDecision = {
			id: `pd_${Date.now()}`,
			date: Date.now(),
			summary: actions.length ? 'Policy requires changes' : 'Policy satisfied (no action)'
			,
			actions,
		}

		set({ policyLog: [decision, ...state.policyLog].slice(0, 20) })
		save()
	},
}))

function save() {
	try {
		const { setAgentConfig, setPolicyConfig, setTargetAllocation, exportConfig, importConfig, refreshSuggestions, simulateRebalance, runPolicy, ...data } = useTreasuryStore.getState() as any
		localStorage.setItem(persistKey, JSON.stringify(data))
	} catch {}
}