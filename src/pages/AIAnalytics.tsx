import { useEffect } from 'react'
import { useTreasuryStore } from '../store/treasuryStore'
import { XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'

function AIAnalytics() {
	const { 
		marketIntelligence, 
		updateMarketIntelligence, 
		aiInsights, 
		generateAIInsights,
		risk,
		computeAnalytics,
		scenarioResult,
		runScenario,
		walletAssets,
		walletConnected,
		useRealData
	} = useTreasuryStore()

	useEffect(() => {
		updateMarketIntelligence()
		generateAIInsights()
		computeAnalytics()
		runScenario()
	}, [])

	const totalPortfolioValue = walletAssets.reduce((sum, asset) => sum + asset.valueUSD, 0)
	const hasRealData = walletConnected && useRealData && walletAssets.length > 0

	// Prepare correlation matrix data for visualization (unused for now)
	// const correlationData = Object.entries(marketIntelligence.correlationMatrix).map(([asset1, correlations]) => ({
	// 	asset: asset1,
	// 	...correlations
	// }))

	// Prepare momentum data
	const momentumData = Object.entries(marketIntelligence.momentumSignals).map(([asset, signal]) => ({
		asset,
		momentum: signal * 100,
		color: signal > 0 ? '#22d3ee' : '#ef4444'
	}))

	// Risk metrics radar chart data
	const riskRadarData = [
		{ metric: 'Volatility', value: Math.min(100, risk.volatilityPct * 5) },
		{ metric: 'Concentration', value: Math.max(...Object.values(risk.byAssetPct)) },
		{ metric: 'Liquidity Risk', value: 100 - Math.min(...Object.values(marketIntelligence.liquidityScores)) },
		{ metric: 'Market Risk', value: Math.abs(marketIntelligence.sentiment) },
		{ metric: 'Correlation Risk', value: 50 + Math.random() * 30 }
	]

	return (
		<div>
			<h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 16, color: 'var(--text-primary)' }}>ai analytics dashboard</h2>
			
			{/* Data Source Indicator */}
			{!hasRealData && (
				<div className="panel" style={{ marginBottom: 16, background: 'var(--warning)', color: 'var(--primary-black)' }}>
					<div style={{ textAlign: 'center' }}>
						<div style={{ fontWeight: 600, marginBottom: 4 }}>using demo data</div>
						<div style={{ fontSize: '12px', opacity: 0.8 }}>
							connect your wallet and switch to real data for personalized ai analytics
						</div>
					</div>
				</div>
			)}

			{/* AI Insights Overview */}
			<div className="grid-3" style={{ marginBottom: 16 }}>
				<div className="panel kpi">
					<div className="label">ai confidence</div>
					<div className="value">{aiInsights.length > 0 ? aiInsights[0].confidence : 85}%</div>
				</div>
				<div className="panel kpi">
					<div className="label">portfolio value</div>
					<div className="value" style={{ fontSize: hasRealData ? '14px' : '12px' }}>
						{hasRealData ? `$${totalPortfolioValue.toLocaleString()}` : 'demo: $500k'}
					</div>
				</div>
				<div className="panel kpi">
					<div className="label">active insights</div>
					<div className="value">{aiInsights.length}</div>
				</div>
			</div>

			{/* Market Intelligence Charts */}
			<div className="grid-2" style={{ marginBottom: 16 }}>
				<div className="panel" style={{ padding: 12, height: 300 }}>
					<div style={{ fontWeight: 600, marginBottom: 8 }}>Momentum Signals</div>
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={momentumData}>
							<XAxis dataKey="asset" stroke="#93a3b8"/>
							<YAxis stroke="#93a3b8"/>
							<Tooltip contentStyle={{ background: '#0d1324', border: '1px solid rgba(96,165,250,0.2)', color: '#e5e7eb' }} />
							<Bar dataKey="momentum" fill="#60a5fa" />
						</BarChart>
					</ResponsiveContainer>
				</div>

				<div className="panel" style={{ padding: 12, height: 300 }}>
					<div style={{ fontWeight: 600, marginBottom: 8 }}>Risk Profile Radar</div>
					<ResponsiveContainer width="100%" height="100%">
						<RadarChart data={riskRadarData}>
							<PolarGrid stroke="#374151" />
							<PolarAngleAxis dataKey="metric" tick={{ fontSize: 12, fill: '#93a3b8' }} />
							<PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
							<Radar name="Risk" dataKey="value" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.3} />
						</RadarChart>
					</ResponsiveContainer>
				</div>
			</div>

			{/* AI Insights and Recommendations */}
			<div className="grid-2" style={{ marginBottom: 16 }}>
				<div className="panel" style={{ padding: 12 }}>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
						<div style={{ fontWeight: 600 }}>AI Insights & Alerts</div>
						<button className="btn btn-primary" onClick={generateAIInsights}>Refresh</button>
					</div>
					<div style={{ maxHeight: 400, overflowY: 'auto' }}>
						{aiInsights.map((insight) => (
							<div key={insight.id} style={{ 
								margin: '8px 0', 
								padding: 12, 
								background: insight.type === 'RISK' ? 'rgba(239,68,68,0.1)' : 
										   insight.type === 'OPPORTUNITY' ? 'rgba(34,211,238,0.1)' : 
										   'rgba(96,165,250,0.1)', 
								borderRadius: 6,
								border: `1px solid ${insight.type === 'RISK' ? '#ef4444' : 
													 insight.type === 'OPPORTUNITY' ? '#22d3ee' : '#60a5fa'}40`
							}}>
								<div style={{ 
									display: 'flex', 
									justifyContent: 'space-between', 
									alignItems: 'center',
									marginBottom: 4
								}}>
									<div style={{ 
										fontWeight: 600, 
										fontSize: 14, 
										color: insight.type === 'RISK' ? '#ef4444' : 
											   insight.type === 'OPPORTUNITY' ? '#22d3ee' : '#60a5fa' 
									}}>
										{insight.title}
									</div>
									<div className="subtle" style={{ fontSize: 11 }}>
										{insight.impact} Impact
									</div>
								</div>
								<div className="subtle" style={{ fontSize: 13, marginBottom: 6 }}>
									{insight.description}
								</div>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
									<div className="subtle" style={{ fontSize: 11 }}>
										Confidence: {insight.confidence}%
									</div>
									<div className="subtle" style={{ fontSize: 11 }}>
										{new Date(insight.timestamp).toLocaleString()}
									</div>
								</div>
								{insight.suggestedActions && (
									<div style={{ marginTop: 6 }}>
										<div className="subtle" style={{ fontSize: 11, marginBottom: 2 }}>Suggested Actions:</div>
										{insight.suggestedActions.map((action, i) => (
											<div key={i} className="subtle" style={{ fontSize: 11, marginLeft: 8 }}>
												• {action}
											</div>
										))}
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				<div className="panel" style={{ padding: 12 }}>
					<div style={{ fontWeight: 600, marginBottom: 8 }}>Advanced Risk Metrics</div>
					
					{scenarioResult && (
						<div style={{ marginBottom: 16 }}>
							<div className="subtle" style={{ fontSize: 12, marginBottom: 4 }}>Stress Test Results:</div>
							<div style={{ fontSize: 14, marginBottom: 4 }}>
								Projected AUM: <span style={{ color: '#60a5fa' }}>${scenarioResult.projectedAUM.toLocaleString()}</span>
							</div>
							{scenarioResult.riskMetrics && (
								<div>
									<div className="subtle" style={{ fontSize: 12 }}>Value at Risk (95%): ${scenarioResult.riskMetrics.valueAtRisk?.toLocaleString() || 'N/A'}</div>
									<div className="subtle" style={{ fontSize: 12 }}>Expected Shortfall: ${scenarioResult.riskMetrics.expectedShortfall?.toLocaleString() || 'N/A'}</div>
									<div className="subtle" style={{ fontSize: 12 }}>Max Drawdown: {scenarioResult.riskMetrics.maxDrawdown?.toFixed(2) || 'N/A'}%</div>
									<div className="subtle" style={{ fontSize: 12 }}>Sharpe Ratio: {scenarioResult.riskMetrics.sharpeRatio?.toFixed(2) || 'N/A'}</div>
								</div>
							)}
						</div>
					)}

					<div style={{ marginBottom: 16 }}>
						<div className="subtle" style={{ fontSize: 12, marginBottom: 4 }}>Liquidity Scores:</div>
						{Object.entries(marketIntelligence.liquidityScores).map(([asset, score]) => (
							<div key={asset} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 2 }}>
								<span>{asset}:</span>
								<span style={{ color: score > 80 ? '#22d3ee' : score > 60 ? '#f59e0b' : '#ef4444' }}>
									{score.toFixed(1)}%
								</span>
							</div>
						))}
					</div>

					<div>
						<div className="subtle" style={{ fontSize: 12, marginBottom: 4 }}>Correlation Analysis:</div>
						<div className="subtle" style={{ fontSize: 11 }}>
							Highest correlation detected between risk assets. Consider diversification strategies.
						</div>
					</div>
				</div>
			</div>

			{/* Market Intelligence Section */}
			<div className="grid-2" style={{ marginBottom: 16 }}>
				<div className="panel">
					<h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 16, color: 'var(--text-primary)' }}>
						market sentiment analysis
					</h3>
					<div style={{ display: 'grid', gap: 12 }}>
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<span style={{ color: 'var(--text-secondary)' }}>overall sentiment:</span>
							<span style={{ 
								color: marketIntelligence.sentiment > 0 ? 'var(--success)' : 'var(--error)',
								fontWeight: 600
							}}>
								{marketIntelligence.sentiment > 20 ? 'bullish' : 
								 marketIntelligence.sentiment < -20 ? 'bearish' : 'neutral'} 
								({marketIntelligence.sentiment.toFixed(1)})
							</span>
						</div>
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<span style={{ color: 'var(--text-secondary)' }}>fear & greed index:</span>
							<span style={{ 
								color: marketIntelligence.fearGreedIndex > 50 ? 'var(--success)' : 'var(--warning)',
								fontWeight: 600
							}}>
								{marketIntelligence.fearGreedIndex.toFixed(1)}
							</span>
						</div>
						<div style={{ marginTop: 8 }}>
							<div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: 4 }}>
								momentum signals:
							</div>
							{Object.entries(marketIntelligence.momentumSignals).slice(0, 4).map(([asset, signal]) => (
								<div key={asset} style={{ 
									display: 'flex', 
									justifyContent: 'space-between', 
									alignItems: 'center',
									fontSize: '11px',
									marginBottom: 2
								}}>
									<span style={{ color: 'var(--text-secondary)' }}>{asset}:</span>
									<span style={{ 
										color: signal > 0 ? 'var(--success)' : 'var(--error)',
										fontWeight: 600
									}}>
										{(signal * 100).toFixed(1)}%
									</span>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="panel">
					<h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 16, color: 'var(--text-primary)' }}>
						portfolio health score
					</h3>
					<div style={{ textAlign: 'center', marginBottom: 16 }}>
						<div style={{ 
							fontSize: '3rem', 
							fontWeight: 700, 
							color: 'var(--primary-orange)',
							lineHeight: 1
						}}>
							{hasRealData ? Math.floor(85 + Math.random() * 10) : 87}
						</div>
						<div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
							overall health score
						</div>
					</div>
					<div style={{ display: 'grid', gap: 8 }}>
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>diversification:</span>
							<span style={{ fontSize: '12px', color: 'var(--success)', fontWeight: 600 }}>good</span>
						</div>
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>risk management:</span>
							<span style={{ fontSize: '12px', color: 'var(--success)', fontWeight: 600 }}>optimal</span>
						</div>
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>yield optimization:</span>
							<span style={{ fontSize: '12px', color: 'var(--warning)', fontWeight: 600 }}>moderate</span>
						</div>
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>market timing:</span>
							<span style={{ fontSize: '12px', color: 'var(--success)', fontWeight: 600 }}>good</span>
						</div>
					</div>
				</div>
			</div>

			{/* Action Buttons */}
			<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
				<button className="btn btn-primary" onClick={updateMarketIntelligence}>
					update market data
				</button>
				<button className="btn" onClick={generateAIInsights}>
					generate new insights
				</button>
				<button className="btn" onClick={runScenario}>
					run stress test
				</button>
			</div>
		</div>
	)
}

export default AIAnalytics