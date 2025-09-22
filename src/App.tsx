import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import AppLayout from './layouts/AppLayout'
import Dashboard from './pages/Dashboard'
import Allocation from './pages/Allocation'
import Agents from './pages/Agents'
import Reports from './pages/Reports'
import RequireAuth from './components/RequireAuth'
import Login from './pages/Login'
import Scenario from './pages/Scenario'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/allocation" element={<Allocation />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/scenario" element={<Scenario />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
