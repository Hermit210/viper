import { useTreasuryStore } from '../store/treasuryStore'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

function RequireAuth() {
	const { isAuthenticated } = useTreasuryStore()
	const location = useLocation()
	if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location.pathname }} />
	return <Outlet />
}

export default RequireAuth