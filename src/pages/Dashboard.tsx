import { useTreasuryStore } from '../store/treasuryStore'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useAccount, useChainId, useBalance } from 'wagmi'
import OnchainBalances from '../components/OnchainBalances'

function Dashboard() {
	const { kpis, navHistory } = useTreasuryStore()
	const { address, isConnected } = useAccount()
	const chainId = useChainId()
	const { data: nativeBalance } = useBalance({ address, chainId, query: { enabled: Boolean(address) } })

	return (
		<div style={{ color: 'white' }}>
			<div className="panel hero" style={{ padding: 16, marginBottom: 16 }}>
				<div className="particles"></div>
				<div className="hero-title gradient-text">Command Your Treasury</div>
				<div className="hero-sub" style={{ marginTop: 6 }}>Intelligent agents, automated allocations, real-time insights.</div>
				<div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
					<a href="/allocation" className="btn btn-primary btn-glow">Automate Allocation</a>
					<a href="/reports" className="btn">View Reports</a>
				</div>
			</div>
			<h2 className="brand" style={{ marginTop: 0 }}>Dashboard</h2>
			<div className="grid-kpis" style={{ marginBottom: 16 }}>
				<div className="panel kpi" style={{ padding: 12 }}>
					<div className="label">Total Treasury</div>
					<div className="value">${kpis.totalAUM.toLocaleString()}</div>
				</div>
				<div className="panel kpi" style={{ padding: 12 }}>
					<div className="label">24h PnL</div>
					<div className="value">${kpis.last24hPnL.toLocaleString()}</div>
				</div>
				<div className="panel kpi" style={{ padding: 12 }}>
					<div className="label">Cash</div>
					<div className="value">${kpis.cashBalance.toLocaleString()}</div>
				</div>
				<div className="panel kpi" style={{ padding: 12 }}>
					<div className="label">Risk</div>
					<div className="value">{kpis.riskLevel}</div>
				</div>
			</div>

			{isConnected && (
				<div className="grid-kpis" style={{ marginBottom: 16 }}>
					<div className="panel kpi" style={{ padding: 12 }}>
						<div className="label">Address</div>
						<div className="value" style={{ fontSize: 14 }}>{address?.slice(0, 6)}…{address?.slice(-4)}</div>
					</div>
					<div className="panel kpi" style={{ padding: 12 }}>
						<div className="label">Chain ID</div>
						<div className="value">{chainId}</div>
					</div>
					<div className="panel kpi" style={{ padding: 12 }}>
						<div className="label">Native Balance</div>
						<div className="value">{nativeBalance ? `${nativeBalance.formatted.slice(0, 8)} ${nativeBalance.symbol}` : '—'}</div>
					</div>
				</div>
			)}

			<div className="panel" style={{ padding: 12, height: 280 }}>
				<div className="subtle" style={{ marginBottom: 8 }}>NAV Over Time</div>
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={navHistory}>
						<XAxis dataKey="date" stroke="#93a3b8"/>
						<YAxis stroke="#93a3b8"/>
						<Tooltip contentStyle={{ background: '#0d1324', border: '1px solid rgba(96,165,250,0.2)', color: '#e5e7eb' }} />
						<Line type="monotone" dataKey="nav" stroke="#60a5fa" strokeWidth={2} dot={false} />
					</LineChart>
				</ResponsiveContainer>
			</div>

			{isConnected && (
				<div style={{ marginTop: 16 }}>
					<OnchainBalances />
				</div>
			)}
		</div>
	)
}

export default Dashboard