import { Routes, Route, Link } from 'react-router-dom'
import PatientList from './components/PatientList'
import PatientDetails from './components/PatientDetails'

export default function App() {
  return (
    <div style={{ padding: 24 }}>
      <header style={{ marginBottom: 24 }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button>HOME</button>
        </Link>
      </header>

      <Routes>
        <Route path="/" element={<PatientList />} />
        <Route path="/patients/:id" element={<PatientDetails />} />
      </Routes>
    </div>
  )
}
