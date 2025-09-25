import { useTreasuryStore } from '../store/treasuryStore'
import { useEffect } from 'react'

function NewsSection() {
	const { news, generateNews } = useTreasuryStore()

	useEffect(() => {
		if (news.length === 0) {
			generateNews()
		}
	}, [news.length, generateNews])

	const getCategoryIcon = (category: string) => {
		switch (category) {
			case 'MARKET': return '📈'
			case 'DEFI': return '🏦'
			case 'REGULATION': return '⚖️'
			case 'TECH': return '🔧'
			case 'SECURITY': return '🛡️'
			default: return '📰'
		}
	}

	const getSentimentColor = (sentiment: string) => {
		switch (sentiment) {
			case 'BULLISH': return 'var(--success)'
			case 'BEARISH': return 'var(--error)'
			case 'NEUTRAL': return 'var(--text-muted)'
			default: return 'var(--text-muted)'
		}
	}

	const getImpactBadge = (impact: string) => {
		const colors = {
			HIGH: 'var(--error)',
			MEDIUM: 'var(--warning)',
			LOW: 'var(--success)'
		}
		return colors[impact as keyof typeof colors] || 'var(--text-muted)'
	}

	const formatTimeAgo = (timestamp: number) => {
		const now = Date.now()
		const diff = now - timestamp
		const hours = Math.floor(diff / (1000 * 60 * 60))
		const minutes = Math.floor(diff / (1000 * 60))
		
		if (hours > 0) return `${hours}h ago`
		if (minutes > 0) return `${minutes}m ago`
		return 'just now'
	}

	return (
		<div className="panel">
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
				<h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
					market news & insights
				</h3>
				<button className="btn" onClick={generateNews} style={{ fontSize: '12px' }}>
					refresh
				</button>
			</div>
			
			<div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 400, overflowY: 'auto' }}>
				{news.map((item) => (
					<div key={item.id} style={{ 
						padding: 12,
						background: 'var(--bg-tertiary)',
						borderRadius: 8,
						border: '1px solid var(--border-primary)',
						transition: 'all 0.3s ease'
					}}>
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
							<div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
								<span style={{ fontSize: '16px' }}>{getCategoryIcon(item.category)}</span>
								<div style={{ flex: 1 }}>
									<h4 style={{ 
										fontSize: '14px', 
										fontWeight: 600, 
										color: 'var(--text-primary)',
										margin: 0,
										lineHeight: 1.3
									}}>
										{item.title}
									</h4>
									<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
										<span style={{ 
											fontSize: '10px', 
											padding: '2px 6px', 
											borderRadius: 4,
											background: getSentimentColor(item.sentiment) + '20',
											color: getSentimentColor(item.sentiment),
											fontWeight: 600,
											textTransform: 'uppercase'
										}}>
											{item.sentiment}
										</span>
										<span style={{ 
											fontSize: '10px', 
											padding: '2px 6px', 
											borderRadius: 4,
											background: getImpactBadge(item.impact) + '20',
											color: getImpactBadge(item.impact),
											fontWeight: 600,
											textTransform: 'uppercase'
										}}>
											{item.impact} impact
										</span>
										<span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
											{item.source}
										</span>
									</div>
								</div>
							</div>
							<span style={{ fontSize: '10px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
								{formatTimeAgo(item.timestamp)}
							</span>
						</div>
						
						<p style={{ 
							fontSize: '12px', 
							color: 'var(--text-secondary)', 
							margin: '0 0 8px 0',
							lineHeight: 1.4
						}}>
							{item.summary}
						</p>
						
						{item.relevantTokens && item.relevantTokens.length > 0 && (
							<div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
								{item.relevantTokens.map((token) => (
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
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default NewsSection