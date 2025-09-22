import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTreasuryStore } from '../store/treasuryStore'

function Login() {
	const [password, setPassword] = useState('')
	const { login } = useTreasuryStore()
	const navigate = useNavigate()
	const location = useLocation() as any
	const from = location.state?.from || '/dashboard'

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (login(password)) navigate(from, { replace: true })
	}

	return (
		<div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', color: 'white' }}>
			<form onSubmit={handleSubmit} className="panel" style={{ padding: 16, width: 340 }}>
				<div className="brand" style={{ fontSize: 18, marginBottom: 8 }}>Viper Treasury</div>
				<div className="subtle" style={{ marginBottom: 8 }}>Sign in to continue</div>
				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={{ width: '100%', padding: 10, marginBottom: 8, borderRadius: 8, border: '1px solid var(--border)', background: '#0d1324', color: 'white' }} />
				<button className="btn btn-primary" type="submit" style={{ width: '100%' }}>Login</button>
			</form>
		</div>
	)
}

export default Login