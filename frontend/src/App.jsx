import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NoteView from './pages/NoteView'
import ProtectedRoute from './utils/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/note/:id"
          element={
            <ProtectedRoute>
              <NoteView />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
