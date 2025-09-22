import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import AppLayout from './layouts/AppLayout'
import Dashboard from './pages/Dashboard'
import Allocation from './pages/Allocation'
import Agents from './pages/Agents'
import Reports from './pages/Reports'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/allocation" element={<Allocation />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
