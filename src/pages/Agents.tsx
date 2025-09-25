import { useTreasuryStore } from '../store/treasuryStore'
import { useEffect } from 'react'
import GovernancePanel from '../components/GovernancePanel'

function Agents() {
	const { 
		agentConfig, 
		setAgentConfig, 
		agentSuggestions, 
		refreshSuggestions, 
		policyConfig, 
		setPolicyConfig, 
		policyLog, 
		runPolicy, 
		exportConfig, 
		importConfig,
		aiInsights,
		generateAIInsights,
		optimizePortfolio,
		updateMarketIntelligence,
		marketIntelligence
	} = useTreasuryStore()

	useEffect(() => {
		updateMarketIntelligence()
		generateAIInsights()
	}, [])

	function handleExport() {
		const json = exportConfig()
		const blob = new Blob([json], { type: 'application/json' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = 'viper_treasury_config.json'
		a.click()
		URL.revokeObjectURL(url)
	}

	function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0]
		if (!file) return
		const reader = new FileReader()
		reader.onload = () => {
			if (typeof reader.result === 'string') importConfig(reader.result)
		}
		reader.readAsText(file)
		e.currentTarget.value = ''
	}

	return (
		<div>
			<h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 16, color: 'var(--text-primary)' }}>intelligent ai agents</h2>
			<div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
				<button className="btn" onClick={handleExport}>Export Config</button>
				<label className="btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
					<span>Import Config</span>
					<input type="file" accept="application/json" onChange={handleImport} style={{ display: 'none' }} />
				</label>
			</div>

			<div className="grid-2">
				<div className="panel">
					<h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 16, color: 'var(--text-primary)' }}>agent configuration</h3>
					<label>
						<span className="subtle" style={{ display: 'block', fontSize: 12 }}>Risk Tolerance</span>
						<input type="range" min={1} max={10} value={agentConfig.riskTolerance} onChange={(e) => setAgentConfig({ ...agentConfig, riskTolerance: Number(e.target.value) })} />
					</label>
					<label style={{ display: 'block', marginTop: 8 }}>
						<input type="checkbox" checked={agentConfig.enableStableReserve} onChange={(e) => setAgentConfig({ ...agentConfig, enableStableReserve: e.target.checked })} /> Maintain 20% stable reserve
					</label>
					<label style={{ display: 'block', marginTop: 8 }}>
						<input type="checkbox" checked={agentConfig.enableMomentum} onChange={(e) => setAgentConfig({ ...agentConfig, enableMomentum: e.target.checked })} /> Momentum overlay
					</label>
					<label style={{ display: 'block', marginTop: 8 }}>
						<input type="checkbox" checked={agentConfig.enableMLOptimization} onChange={(e) => setAgentConfig({ ...agentConfig, enableMLOptimization: e.target.checked })} /> ML Portfolio Optimization
					</label>
					<label style={{ display: 'block', marginTop: 8 }}>
						<input type="checkbox" checked={agentConfig.enableMarketSentiment} onChange={(e) => setAgentConfig({ ...agentConfig, enableMarketSentiment: e.target.checked })} /> Market Sentiment Analysis
					</label>
					<label style={{ display: 'block', marginTop: 8 }}>
						<input type="checkbox" checked={agentConfig.enableGovernanceMode} onChange={(e) => setAgentConfig({ ...agentConfig, enableGovernanceMode: e.target.checked })} /> DAO Governance Mode
					</label>
					<div style={{ marginTop: 12 }}>
						<label>
							<span className="subtle" style={{ display: 'block', fontSize: 12 }}>Rebalance Threshold (%)</span>
							<input type="number" value={agentConfig.rebalanceThreshold} onChange={(e) => setAgentConfig({ ...agentConfig, rebalanceThreshold: Number(e.target.value) })} />
						</label>
					</div>
					<div style={{ marginTop: 8 }}>
						<label>
							<span className="subtle" style={{ display: 'block', fontSize: 12 }}>Max Drawdown Limit (%)</span>
							<input type="number" value={agentConfig.maxDrawdownLimit} onChange={(e) => setAgentConfig({ ...agentConfig, maxDrawdownLimit: Number(e.target.value) })} />
						</label>
					</div>
				</div>

				<div className="panel">
					<h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 16, color: 'var(--text-primary)' }}>policy constraints</h3>
					<div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
						<label>
							<span className="subtle" style={{ display: 'block', fontSize: 12 }}>Min Stable Reserve (%)</span>
							<input type="number" value={policyConfig.minStableReservePct} onChange={(e) => setPolicyConfig({ ...policyConfig, minStableReservePct: Number(e.target.value) })} />
						</label>
						<label>
							<span className="subtle" style={{ display: 'block', fontSize: 12 }}>Max Single Asset (%)</span>
							<input type="number" value={policyConfig.maxSingleAssetPct} onChange={(e) => setPolicyConfig({ ...policyConfig, maxSingleAssetPct: Number(e.target.value) })} />
						</label>
						<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
							<button className="btn btn-primary" onClick={runPolicy}>Run AI Policy</button>
							<button className="btn" onClick={optimizePortfolio}>Optimize Portfolio</button>
						</div>
					</div>
				</div>
			</div>

			<div className="grid-2" style={{ marginTop: 12 }}>
				<div className="panel" style={{ padding: 12 }}>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<div style={{ fontWeight: 600 }}>Market Intelligence</div>
						<button className="btn" onClick={updateMarketIntelligence}>Update</button>
					</div>
					<div style={{ marginTop: 8 }}>
						<div className="subtle" style={{ fontSize: 12 }}>Market Sentiment: <span style={{ color: marketIntelligence.sentiment > 0 ? '#22d3ee' : '#ef4444' }}>{marketIntelligence.sentiment.toFixed(1)}</span></div>
						<div className="subtle" style={{ fontSize: 12 }}>Fear & Greed Index: {marketIntelligence.fearGreedIndex.toFixed(1)}</div>
						<div className="subtle" style={{ fontSize: 12, marginTop: 4 }}>Momentum Signals:</div>
						{Object.entries(marketIntelligence.momentumSignals).map(([asset, signal]) => (
							<div key={asset} className="subtle" style={{ fontSize: 11, marginLeft: 8 }}>
								{asset}: <span style={{ color: signal > 0 ? '#22d3ee' : '#ef4444' }}>{(signal * 100).toFixed(1)}%</span>
							</div>
						))}
					</div>
				</div>

				<div className="panel" style={{ padding: 12 }}>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<div style={{ fontWeight: 600 }}>AI Insights</div>
						<button className="btn btn-primary" onClick={generateAIInsights}>Generate</button>
					</div>
					<div style={{ maxHeight: 200, overflowY: 'auto' }}>
						{aiInsights.slice(0, 5).map((insight) => (
							<div key={insight.id} style={{ margin: '8px 0', padding: 8, background: 'rgba(96,165,250,0.1)', borderRadius: 4 }}>
								<div style={{ fontWeight: 600, fontSize: 13, color: insight.type === 'RISK' ? '#ef4444' : insight.type === 'OPPORTUNITY' ? '#22d3ee' : '#60a5fa' }}>
									{insight.title}
								</div>
								<div className="subtle" style={{ fontSize: 12, marginTop: 2 }}>{insight.description}</div>
								<div className="subtle" style={{ fontSize: 11, marginTop: 4 }}>
									Confidence: {insight.confidence}% | Impact: {insight.impact}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="grid-2" style={{ marginTop: 12 }}>
				<div className="panel" style={{ padding: 12 }}>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<div style={{ fontWeight: 600 }}>Agent Suggestions</div>
						<button className="btn btn-primary" onClick={refreshSuggestions}>Refresh</button>
					</div>
					<ul>
						{agentSuggestions.map((s, idx) => (
							<li key={idx} style={{ margin: '6px 0', fontSize: 14 }}>
								{s}
							</li>
						))}
					</ul>
				</div>

				<div className="panel" style={{ padding: 12 }}>
					<div style={{ fontWeight: 600, marginBottom: 8 }}>Enhanced Decision Log</div>
					<div style={{ maxHeight: 300, overflowY: 'auto' }}>
						{policyLog.map((d) => (
							<div key={d.id} style={{ margin: '10px 0', padding: 8, background: 'rgba(96,165,250,0.05)', borderRadius: 4 }}>
								<div style={{ fontWeight: 600, fontSize: 13 }}>{new Date(d.date).toLocaleString()} — {d.summary}</div>
								{d.confidence && (
									<div className="subtle" style={{ fontSize: 11 }}>
										Confidence: {d.confidence}% | Risk Score: {d.riskScore}% | Expected Return: {d.expectedReturn.toFixed(1)}%
									</div>
								)}
								{d.marketConditions && (
									<div className="subtle" style={{ fontSize: 11 }}>
										Market: {d.marketConditions.sentiment} | Vol: {d.marketConditions.volatility} | Liquidity Risk: {d.marketConditions.liquidityRisk}
									</div>
								)}
								<ul style={{ marginTop: 4 }}>
									{d.actions.map((a, i) => (
										<li key={i} className="subtle" style={{ fontSize: 12 }}>
											<span style={{ color: a.priority === 'CRITICAL' ? '#ef4444' : a.priority === 'HIGH' ? '#f59e0b' : '#60a5fa' }}>
												[{a.priority}]
											</span> {a.type}{a.asset ? ` ${a.asset}` : ''}{a.deltaPct !== undefined ? ` ${a.deltaPct > 0 ? '+' : ''}${a.deltaPct}%` : ''}: {a.reason}
											{a.aiReasoning && (
												<div className="subtle" style={{ fontSize: 11, marginTop: 2, fontStyle: 'italic' }}>
													AI: {a.aiReasoning}
												</div>
											)}
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* DAO Governance Section */}
			<div style={{ marginTop: 16 }}>
				<GovernancePanel />
			</div>
		</div>
	)
}

export default Agents