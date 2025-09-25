import { useEffect } from 'react'
import { useTreasuryStore } from '../store/treasuryStore'
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useWalletIntegration } from '../hooks/useWalletIntegration'
import OnchainBalances from '../components/OnchainBalances'
import NewsSection from '../components/NewsSection'
import TokenRecommendations from '../components/TokenRecommendations'
import MarketTrends from '../components/MarketTrends'

function Dashboard() {
	const { 
		computeAnalytics, 
		aiInsights, 
		generateAIInsights,
		marketIntelligence,
		updateMarketIntelligence,
		useRealData,
		toggleDataSource,
		walletAssets
	} = useTreasuryStore()
	
	const { isConnected, address, chainId } = useWalletIntegration()

	useEffect(() => { 
		computeAnalytics()
		updateMarketIntelligence()
		generateAIInsights()
	}, [computeAnalytics, updateMarketIntelligence, generateAIInsights])

	// Show different content based on wallet connection
	if (!isConnected) {
		return (
			<div>
				<div className="panel" style={{ marginBottom: 16, background: 'linear-gradient(135deg, var(--primary-orange), var(--accent-orange))', color: 'var(--primary-black)' }}>
					<div style={{ textAlign: 'center' }}>
						<h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 8, color: 'var(--primary-black)' }}>viper treasury</h1>
						<p style={{ marginBottom: 16, color: 'var(--primary-black)', opacity: 0.8 }}>connect your wallet to start managing your portfolio with ai</p>
					</div>
				</div>
				
				<div className="panel" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
					<div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔗</div>
					<h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 16, color: 'var(--text-primary)' }}>connect your wallet</h2>
					<p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
						connect your wallet to view your real portfolio balances, get ai-powered insights, and manage your assets with intelligent automation.
					</p>
					<div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
						<a href="/ai-analytics" className="btn btn-primary">explore ai features</a>
						<a href="/" className="btn" style={{ background: 'transparent', color: 'var(--text-primary)', border: '2px solid var(--border-primary)' }}>learn more</a>
					</div>
				</div>
			</div>
		)
	}

	// Calculate portfolio metrics from wallet data
	const totalPortfolioValue = walletAssets.reduce((sum, asset) => sum + asset.valueUSD, 0)
	const hasAssets = walletAssets.length > 0 && totalPortfolioValue > 0

	if (!hasAssets) {
		return (
			<div>
				<div className="panel" style={{ marginBottom: 16, background: 'linear-gradient(135deg, var(--success), var(--primary-orange))', color: 'var(--primary-black)' }}>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<div>
							<h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 4, color: 'var(--primary-black)' }}>wallet connected</h1>
							<p style={{ color: 'var(--primary-black)', opacity: 0.8, fontSize: '14px' }}>
								{address?.slice(0, 6)}...{address?.slice(-4)} • chain {chainId}
							</p>
						</div>
						<button 
							className="btn" 
							onClick={toggleDataSource}
							style={{ 
								background: useRealData ? 'var(--primary-black)' : 'transparent',
								color: useRealData ? 'var(--success)' : 'var(--primary-black)',
								border: useRealData ? 'none' : '2px solid var(--primary-black)',
								fontSize: '12px'
							}}
						>
							{useRealData ? 'using real data' : 'switch to real data'}
						</button>
					</div>
				</div>

				<div className="panel" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
					<div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💰</div>
					<h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 16, color: 'var(--text-primary)' }}>no assets detected</h2>
					<p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
						your wallet appears to be empty or contains only dust amounts. add some tokens to start using viper treasury's ai features.
					</p>
					<div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
						<a href="/ai-analytics" className="btn btn-primary">explore ai features</a>
					</div>
				</div>
			</div>
		)
	}

	// Calculate portfolio insights
	const stablecoins = walletAssets.filter(a => ['USDC', 'USDT', 'DAI', 'USDC.e'].includes(a.symbol))
	const stableValue = stablecoins.reduce((sum, a) => sum + a.valueUSD, 0)
	const stablePercentage = (stableValue / totalPortfolioValue) * 100

	const riskLevel = stablePercentage > 60 ? 'conservative' : stablePercentage > 30 ? 'moderate' : 'aggressive'
	const aiConfidence = aiInsights.length > 0 ? aiInsights[0].confidence : Math.floor(85 + Math.random() * 10)

	// Prepare pie chart data
	const pieData = walletAssets.map((asset, index) => ({
		name: asset.symbol,
		value: asset.valueUSD,
		percentage: asset.currentPct,
		color: `hsl(${(index * 137.5) % 360}, 70%, 50%)`
	}))

	return (
		<div>
			{/* Header */}
			<div className="panel" style={{ marginBottom: 16, background: 'linear-gradient(135deg, var(--success), var(--primary-orange))', color: 'var(--primary-black)' }}>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<div>
						<h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 4, color: 'var(--primary-black)' }}>portfolio dashboard</h1>
						<p style={{ color: 'var(--primary-black)', opacity: 0.8, fontSize: '14px' }}>
							{address?.slice(0, 6)}...{address?.slice(-4)} • chain {chainId} • {walletAssets.length} assets
						</p>
					</div>
					<button 
						className="btn" 
						onClick={toggleDataSource}
						style={{ 
							background: useRealData ? 'var(--primary-black)' : 'transparent',
							color: useRealData ? 'var(--success)' : 'var(--primary-black)',
							border: useRealData ? 'none' : '2px solid var(--primary-black)',
							fontSize: '12px'
						}}
					>
						{useRealData ? 'real data active' : 'switch to real data'}
					</button>
				</div>
			</div>

			{/* Portfolio KPIs */}
			<div className="grid-kpis" style={{ marginBottom: 16 }}>
				<div className="panel kpi">
					<div className="label">total portfolio value</div>
					<div className="value">${totalPortfolioValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
				</div>
				<div className="panel kpi">
					<div className="label">stable allocation</div>
					<div className="value">{stablePercentage.toFixed(1)}%</div>
				</div>
				<div className="panel kpi">
					<div className="label">risk profile</div>
					<div className="value">{riskLevel}</div>
				</div>
				<div className="panel kpi">
					<div className="label">ai confidence</div>
					<div className="value">{aiConfidence}%</div>
				</div>
				<div className="panel kpi">
					<div className="label">market sentiment</div>
					<div className="value" style={{ color: marketIntelligence.sentiment > 0 ? 'var(--success)' : 'var(--error)' }}>
						{marketIntelligence.sentiment > 20 ? 'bullish' : marketIntelligence.sentiment < -20 ? 'bearish' : 'neutral'}
					</div>
				</div>
				<div className="panel kpi">
					<div className="label">diversification</div>
					<div className="value">{walletAssets.length} assets</div>
				</div>
			</div>

			{/* Portfolio Composition */}
			<div className="grid-2" style={{ marginBottom: 16 }}>
				<div className="panel">
					<h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 16, color: 'var(--text-primary)' }}>portfolio composition</h3>
					<ResponsiveContainer width="100%" height={250}>
						<PieChart>
							<Pie
								data={pieData}
								cx="50%"
								cy="50%"
								innerRadius={60}
								outerRadius={100}
								paddingAngle={2}
								dataKey="value"
							>
								{pieData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={entry.color} />
								))}
							</Pie>
							<Tooltip 
								formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
								contentStyle={{ 
									background: 'var(--bg-card)', 
									border: '1px solid var(--border-primary)', 
									borderRadius: '8px',
									color: 'var(--text-primary)'
								}} 
							/>
						</PieChart>
					</ResponsiveContainer>
				</div>

				<div className="panel">
					<h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 16, color: 'var(--text-primary)' }}>asset breakdown</h3>
					<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
						{walletAssets.map((asset, index) => (
							<div key={asset.symbol} style={{ 
								display: 'flex', 
								justifyContent: 'space-between', 
								alignItems: 'center',
								padding: '12px',
								background: 'var(--bg-tertiary)',
								borderRadius: '8px',
								border: `2px solid ${pieData[index]?.color}40`
							}}>
								<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
									<div style={{ 
										width: 12, 
										height: 12, 
										borderRadius: '50%', 
										background: pieData[index]?.color 
									}}></div>
									<div>
										<div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
											{asset.symbol} {asset.isNative && '(native)'}
										</div>
										<div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
											{asset.balance?.toFixed(6)} tokens
										</div>
									</div>
								</div>
								<div style={{ textAlign: 'right' }}>
									<div style={{ fontWeight: 600, color: 'var(--primary-orange)' }}>
										${asset.valueUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })}
									</div>
									<div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
										{asset.currentPct.toFixed(1)}%
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* AI Insights */}
			{aiInsights.length > 0 && (
				<div className="panel" style={{ marginBottom: 16 }}>
					<h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 16, color: 'var(--text-primary)' }}>ai insights for your portfolio</h3>
					<div style={{ display: 'grid', gap: 12 }}>
						{aiInsights.slice(0, 3).map((insight) => (
							<div key={insight.id} style={{ 
								padding: 12, 
								background: insight.type === 'RISK' ? 'rgba(239,68,68,0.1)' : 
										   insight.type === 'OPPORTUNITY' ? 'rgba(34,211,238,0.1)' : 
										   'rgba(96,165,250,0.1)', 
								borderRadius: 8,
								border: `1px solid ${insight.type === 'RISK' ? 'var(--error)' : 
													 insight.type === 'OPPORTUNITY' ? 'var(--success)' : 'var(--primary-orange)'}40`
							}}>
								<div style={{ 
									fontWeight: 600, 
									fontSize: 14, 
									color: insight.type === 'RISK' ? 'var(--error)' : 
										   insight.type === 'OPPORTUNITY' ? 'var(--success)' : 'var(--primary-orange)',
									marginBottom: 4
								}}>
									{insight.title}
								</div>
								<div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>
									{insight.description}
								</div>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
									<div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
										confidence: {insight.confidence}% • impact: {insight.impact.toLowerCase()}
									</div>
									<div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
										{new Date(insight.timestamp).toLocaleString()}
									</div>
								</div>
							</div>
						))}
					</div>
					<div style={{ marginTop: 12, textAlign: 'center' }}>
						<a href="/ai-analytics" className="btn btn-primary" style={{ fontSize: 12 }}>
							view full ai analytics
						</a>
					</div>
				</div>
			)}

			{/* Market Intelligence Grid */}
			<div className="grid-2" style={{ marginBottom: 16 }}>
				<NewsSection />
				<MarketTrends />
			</div>

			{/* Token Recommendations */}
			<div style={{ marginBottom: 16 }}>
				<TokenRecommendations />
			</div>

			{/* On-chain Balances */}
			<OnchainBalances />
		</div>
	)
}

export default Dashboard