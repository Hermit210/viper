import { useTreasuryStore } from '../store/treasuryStore'
import { useEffect } from 'react'

function TokenRecommendations() {
	const { tokenRecommendations, generateTokenRecommendations, walletAssets } = useTreasuryStore()

	useEffect(() => {
		generateTokenRecommendations()
	}, [walletAssets, generateTokenRecommendations])

	const getCategoryIcon = (category: string) => {
		switch (category) {
			case 'STABLECOIN': return '💰'
			case 'DEFI': return '🏦'
			case 'L1': return '🔗'
			case 'L2': return '⚡'
			case 'MEME': return '🐕'
			case 'AI': return '🤖'
			case 'GAMING': return '🎮'
			default: return '🪙'
		}
	}

	const getRiskColor = (risk: string) => {
		switch (risk) {
			case 'LOW': return 'var(--success)'
			case 'MEDIUM': return 'var(--warning)'
			case 'HIGH': return 'var(--error)'
			default: return 'var(--text-muted)'
		}
	}

	const formatMarketCap = (marketCap: number) => {
		if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(1)}B`
		if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(1)}M`
		return `$${marketCap.toLocaleString()}`
	}

	const formatVolume = (volume: number) => {
		if (volume >= 1e9) return `$${(volume / 1e9).toFixed(1)}B`
		if (volume >= 1e6) return `$${(volume / 1e6).toFixed(1)}M`
		return `$${volume.toLocaleString()}`
	}

	return (
		<div className="panel">
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
				<h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
					ai token recommendations
				</h3>
				<button className="btn" onClick={generateTokenRecommendations} style={{ fontSize: '12px' }}>
					refresh
				</button>
			</div>
			
			<div style={{ display: 'grid', gap: 12 }}>
				{tokenRecommendations.slice(0, 4).map((rec) => (
					<div key={rec.id} style={{ 
						padding: 16,
						background: 'var(--bg-tertiary)',
						borderRadius: 12,
						border: '1px solid var(--border-primary)',
						transition: 'all 0.3s ease'
					}}>
						{/* Header */}
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
							<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
								<span style={{ fontSize: '24px' }}>{getCategoryIcon(rec.category)}</span>
								<div>
									<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
										<h4 style={{ 
											fontSize: '16px', 
											fontWeight: 700, 
											color: 'var(--text-primary)',
											margin: 0
										}}>
											{rec.symbol}
										</h4>
										<span style={{ 
											fontSize: '12px', 
											color: 'var(--text-secondary)'
										}}>
											{rec.name}
										</span>
									</div>
									<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
										<span style={{ 
											fontSize: '10px', 
											padding: '2px 6px', 
											borderRadius: 4,
											background: 'var(--primary-orange)20',
											color: 'var(--primary-orange)',
											fontWeight: 600,
											textTransform: 'uppercase'
										}}>
											{rec.category}
										</span>
										<span style={{ 
											fontSize: '10px', 
											padding: '2px 6px', 
											borderRadius: 4,
											background: getRiskColor(rec.riskLevel) + '20',
											color: getRiskColor(rec.riskLevel),
											fontWeight: 600
										}}>
											{rec.riskLevel} risk
										</span>
									</div>
								</div>
							</div>
							<div style={{ textAlign: 'right' }}>
								<div style={{ 
									fontSize: '18px', 
									fontWeight: 700, 
									color: 'var(--primary-orange)'
								}}>
									{rec.aiScore}/100
								</div>
								<div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
									ai score
								</div>
							</div>
						</div>

						{/* Metrics */}
						<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 12 }}>
							<div style={{ textAlign: 'center', padding: 8, background: 'var(--bg-secondary)', borderRadius: 6 }}>
								<div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--success)' }}>
									+{rec.expectedReturn.toFixed(1)}%
								</div>
								<div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
									expected return
								</div>
							</div>
							<div style={{ textAlign: 'center', padding: 8, background: 'var(--bg-secondary)', borderRadius: 6 }}>
								<div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
									{rec.allocation}%
								</div>
								<div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
									suggested
								</div>
							</div>
							<div style={{ textAlign: 'center', padding: 8, background: 'var(--bg-secondary)', borderRadius: 6 }}>
								<div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
									{formatMarketCap(rec.marketCap)}
								</div>
								<div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
									market cap
								</div>
							</div>
							<div style={{ textAlign: 'center', padding: 8, background: 'var(--bg-secondary)', borderRadius: 6 }}>
								<div style={{ 
									fontSize: '12px', 
									fontWeight: 600, 
									color: rec.priceChange24h >= 0 ? 'var(--success)' : 'var(--error)'
								}}>
									{rec.priceChange24h >= 0 ? '+' : ''}{rec.priceChange24h.toFixed(1)}%
								</div>
								<div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
									24h change
								</div>
							</div>
						</div>

						{/* Reason */}
						<p style={{ 
							fontSize: '13px', 
							color: 'var(--text-secondary)', 
							margin: '0 0 12px 0',
							lineHeight: 1.4,
							fontStyle: 'italic'
						}}>
							{rec.reason}
						</p>

						{/* Pros and Cons */}
						<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
							<div>
								<div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--success)', marginBottom: 4 }}>
									✓ pros
								</div>
								<ul style={{ margin: 0, paddingLeft: 12, fontSize: '11px', color: 'var(--text-secondary)' }}>
									{rec.pros.slice(0, 2).map((pro, i) => (
										<li key={i} style={{ marginBottom: 2 }}>{pro}</li>
									))}
								</ul>
							</div>
							<div>
								<div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--error)', marginBottom: 4 }}>
									⚠ considerations
								</div>
								<ul style={{ margin: 0, paddingLeft: 12, fontSize: '11px', color: 'var(--text-secondary)' }}>
									{rec.cons.slice(0, 2).map((con, i) => (
										<li key={i} style={{ marginBottom: 2 }}>{con}</li>
									))}
								</ul>
							</div>
						</div>

						{/* Action Button */}
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
								timeframe: {rec.timeHorizon} • volume: {formatVolume(rec.volume24h)}
							</div>
							<button className="btn btn-primary" style={{ fontSize: '11px', padding: '6px 12px' }}>
								add to watchlist
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default TokenRecommendations