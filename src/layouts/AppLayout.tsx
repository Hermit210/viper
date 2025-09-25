import { Outlet, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useTreasuryStore } from '../store/treasuryStore'

function AppLayout() {
	const [open, setOpen] = useState(false)
	const [danger, setDanger] = useState(false)
	const { useRealData, walletConnected } = useTreasuryStore()

	useEffect(() => {
		const root = document.documentElement
		if (danger) root.classList.add('danger')
		else root.classList.remove('danger')
	}, [danger])

	return (
		<div className="app-grid">
			<aside className={`sidebar ${open ? 'open' : ''}`}>
				<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
					<img src="/viper-logo.svg" alt="Viper" width={28} height={28} />
					<div className="brand">viper</div>
				</div>
				<nav className="nav" onClick={() => setOpen(false)}>
					<NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}><span>📊</span><span>dashboard</span></NavLink>
					<NavLink to="/allocation" className={({ isActive }) => isActive ? 'active' : ''}><span>📈</span><span>allocation</span></NavLink>
					<NavLink to="/agents" className={({ isActive }) => isActive ? 'active' : ''}><span>🤖</span><span>ai agents</span></NavLink>
					<NavLink to="/reports" className={({ isActive }) => isActive ? 'active' : ''}><span>🧾</span><span>reports</span></NavLink>
					<NavLink to="/scenario" className={({ isActive }) => isActive ? 'active' : ''}><span>🧪</span><span>scenarios</span></NavLink>
					<NavLink to="/ai-analytics" className={({ isActive }) => isActive ? 'active' : ''}><span>🧠</span><span>ai analytics</span></NavLink>
				</nav>
			</aside>
			<main>
				<header className="topbar">
					<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
						<button className="btn show-on-mobile" onClick={() => setOpen((v) => !v)}>{open ? '✖' : '☰'}</button>
						<img src="/viper-logo.svg" alt="Viper" width={22} height={22} className="show-on-mobile" />
						<div className="gradient-text hide-on-mobile" style={{ fontWeight: 700, fontSize: '18px' }}>viper console</div>
					</div>
					<div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
						{walletConnected && (
							<div style={{ 
								fontSize: '11px', 
								padding: '4px 8px', 
								borderRadius: '12px',
								background: useRealData ? 'var(--success)' : 'var(--warning)',
								color: 'var(--primary-black)',
								fontWeight: 600
							}}>
								{useRealData ? 'real data' : 'demo data'}
							</div>
						)}
						<button className="btn" onClick={() => setDanger((d) => !d)}>{danger ? 'calm mode' : 'danger mode'}</button>
						<ConnectButton label="connect wallet" showBalance={false} accountStatus={{ smallScreen: 'avatar', largeScreen: 'full' }} />
					</div>
				</header>
				<div className="page">
					<Outlet />
				</div>

			</main>
		</div>
	)
}

export default AppLayout