import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import AppLayout from './layouts/AppLayout'
import Dashboard from './pages/Dashboard'
import Allocation from './pages/Allocation'
import Agents from './pages/Agents'
import Reports from './pages/Reports'
import RequireAuth from './components/RequireAuth'
import Login from './pages/Login'
import Scenario from './pages/Scenario'
import AIAnalytics from './pages/AIAnalytics'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/allocation" element={<Allocation />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/scenario" element={<Scenario />} />
            <Route path="/ai-analytics" element={<AIAnalytics />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
