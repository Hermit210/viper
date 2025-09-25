import { useTreasuryStore } from '../store/treasuryStore'
import { useEffect } from 'react'

function MarketTrends() {
	const { marketTrends, generateMarketTrends } = useTreasuryStore()

	useEffect(() => {
		if (marketTrends.length === 0) {
			generateMarketTrends()
		}
	}, [marketTrends.length, generateMarketTrends])

	const getTrendIcon = (trend: string) => {
		switch (trend) {
			case 'BULLISH': return '📈'
			case 'BEARISH': return '📉'
			case 'SIDEWAYS': return '➡️'
			default: return '📊'
		}
	}

	const getTrendColor = (trend: string) => {
		switch (trend) {
			case 'BULLISH': return 'var(--success)'
			case 'BEARISH': return 'var(--error)'
			case 'SIDEWAYS': return 'var(--warning)'
			default: return 'var(--text-muted)'
		}
	}

	const getActionColor = (action: string) => {
		switch (action) {
			case 'BUY': return 'var(--success)'
			case 'SELL': return 'var(--error)'
			case 'HOLD': return 'var(--warning)'
			default: return 'var(--text-muted)'
		}
	}

	const getStrengthBar = (strength: number) => {
		const width = Math.max(10, strength)
		const color = strength >= 70 ? 'var(--success)' : 
					  strength >= 40 ? 'var(--warning)' : 'var(--error)'
		
		return (
			<div style={{ 
				width: '100%', 
				height: 4, 
				background: 'var(--bg-secondary)', 
				borderRadius: 2,
				overflow: 'hidden'
			}}>
				<div style={{ 
					width: `${width}%`, 
					height: '100%', 
					background: color,
					transition: 'width 0.3s ease'
				}} />
			</div>
		)
	}

	return (
		<div className="panel">
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
				<h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
					market trends analysis
				</h3>
				<button className="btn" onClick={generateMarketTrends} style={{ fontSize: '12px' }}>
					refresh
				</button>
			</div>
			
			<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
				{marketTrends.map((trend) => (
					<div key={trend.id} style={{ 
						padding: 14,
						background: 'var(--bg-tertiary)',
						borderRadius: 10,
						border: '1px solid var(--border-primary)',
						transition: 'all 0.3s ease'
					}}>
						{/* Header */}
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
							<div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
								<span style={{ fontSize: '20px' }}>{getTrendIcon(trend.trend)}</span>
								<div style={{ flex: 1 }}>
									<h4 style={{ 
										fontSize: '14px', 
										fontWeight: 600, 
										color: 'var(--text-primary)',
										margin: 0,
										lineHeight: 1.3
									}}>
										{trend.title}
									</h4>
									<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
										<span style={{ 
											fontSize: '10px', 
											padding: '2px 6px', 
											borderRadius: 4,
											background: getTrendColor(trend.trend) + '20',
											color: getTrendColor(trend.trend),
											fontWeight: 600,
											textTransform: 'uppercase'
										}}>
											{trend.trend}
										</span>
										<span style={{ 
											fontSize: '10px', 
											padding: '2px 6px', 
											borderRadius: 4,
											background: 'var(--bg-secondary)',
											color: 'var(--text-muted)',
											fontWeight: 600
										}}>
											{trend.timeframe}
										</span>
									</div>
								</div>
							</div>
							<div style={{ textAlign: 'right', minWidth: 60 }}>
								<div style={{ 
									fontSize: '14px', 
									fontWeight: 700, 
									color: getTrendColor(trend.trend)
								}}>
									{trend.strength}%
								</div>
								<div style={{ fontSize: '9px', color: 'var(--text-muted)', marginBottom: 4 }}>
									strength
								</div>
								{getStrengthBar(trend.strength)}
							</div>
						</div>
						
						{/* Description */}
						<p style={{ 
							fontSize: '12px', 
							color: 'var(--text-secondary)', 
							margin: '0 0 10px 0',
							lineHeight: 1.4
						}}>
							{trend.description}
						</p>
						
						{/* Affected Tokens */}
						<div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 10 }}>
							{trend.affectedTokens.map((token) => (
								<span key={token} style={{ 
									fontSize: '10px',
									padding: '2px 6px',
									background: 'var(--primary-orange)20',
									color: 'var(--primary-orange)',
									borderRadius: 4,
									fontWeight: 600
								}}>
									{token}
								</span>
							))}
						</div>
						
						{/* Trading Opportunity */}
						{trend.tradingOpportunity && (
							<div style={{ 
								padding: 10,
								background: 'var(--bg-secondary)',
								borderRadius: 6,
								border: `1px solid ${getActionColor(trend.tradingOpportunity.action)}40`
							}}>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
									<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
										<span style={{ 
											fontSize: '11px', 
											padding: '3px 8px', 
											borderRadius: 4,
											background: getActionColor(trend.tradingOpportunity.action) + '20',
											color: getActionColor(trend.tradingOpportunity.action),
											fontWeight: 700,
											textTransform: 'uppercase'
										}}>
											{trend.tradingOpportunity.action}
										</span>
										<span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
											confidence: {trend.tradingOpportunity.confidence}%
										</span>
									</div>
									{trend.tradingOpportunity.targetPrice && (
										<div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
											target: ${trend.tradingOpportunity.targetPrice.toLocaleString()}
											{trend.tradingOpportunity.stopLoss && (
												<> • stop: ${trend.tradingOpportunity.stopLoss.toLocaleString()}</>
											)}
										</div>
									)}
								</div>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default MarketTrends