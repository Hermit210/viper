import { Outlet, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

function AppLayout() {
	const [open, setOpen] = useState(false)
	const [danger, setDanger] = useState(false)

	useEffect(() => {
		const root = document.documentElement
		if (danger) root.classList.add('danger')
		else root.classList.remove('danger')
	}, [danger])

	return (
		<div className="app-grid" style={{ minHeight: '100vh' }}>
			<aside className={`sidebar ${open ? 'open' : ''}`} style={{ color: 'white', padding: '16px 12px' }}>
				<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
					<img src="/viper-logo.svg" alt="Viper Treasury" width={28} height={28} />
					<div className="brand" style={{ fontSize: 18 }}>Viper Treasury</div>
				</div>
				<nav className="nav" style={{ display: 'grid', gap: 8 }} onClick={() => setOpen(false)}>
					<NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}><span>📊</span><span>Dashboard</span></NavLink>
					<NavLink to="/allocation" className={({ isActive }) => isActive ? 'active' : ''}><span>📈</span><span>Allocation</span></NavLink>
					<NavLink to="/agents" className={({ isActive }) => isActive ? 'active' : ''}><span>🤖</span><span>Agents</span></NavLink>
					<NavLink to="/reports" className={({ isActive }) => isActive ? 'active' : ''}><span>🧾</span><span>Reports</span></NavLink>
					<NavLink to="/scenario" className={({ isActive }) => isActive ? 'active' : ''}><span>🧪</span><span>Scenario</span></NavLink>
				</nav>
			</aside>
			<main>
				<header className="topbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, color: 'white' }}>
					<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
						<button className="btn show-on-mobile" onClick={() => setOpen((v) => !v)}>{open ? '✖' : '☰'}</button>
						<img src="/viper-logo.svg" alt="Viper Treasury" width={22} height={22} className="show-on-mobile" />
						<div className="gradient-text hide-on-mobile" style={{ fontWeight: 700 }}>Viper Treasury Console</div>
					</div>
					<div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
						<button className="btn" onClick={() => setDanger((d) => !d)}>{danger ? 'Calm Mode' : 'Danger Mode'}</button>
						<ConnectButton label="Connect Wallet" showBalance={false} accountStatus={{ smallScreen: 'avatar', largeScreen: 'full' }} />
					</div>
				</header>
				<div className="page" style={{ padding: 16 }}>
					<div className="border-gradient" style={{ borderRadius: 12, padding: 2 }}>
						<div style={{ borderRadius: 10, overflow: 'hidden' }}>
							<Outlet />
						</div>
					</div>
				</div>
				<footer className="footer" style={{ padding: 12, textAlign: 'center' }}>
					Built for DoraHacks AI Treasury Management — Viper Treasury
				</footer>
			</main>
		</div>
	)
}

export default AppLayout