import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NonSensitivePatient, Gender } from '../types'
import { getAllPatients } from '../services/patients'

function genderIcon(g: Gender) {
  if (g === Gender.Male) return ' ♂'
  if (g === Gender.Female) return ' ♀'
  return ' ⚧'
}

export default function PatientList() {
  const [patients, setPatients] = useState<NonSensitivePatient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllPatients()
        setPatients(data)
      } catch (e: any) {
        setError(e?.message ?? 'Error fetching patients')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: 'crimson' }}>{error}</p>

  return (
    <div>
      <h1>Patientor</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {patients.map(p => (
          <li key={p.id} style={{ marginBottom: 8 }}>
            <Link to={`/patients/${p.id}`}>
              {p.name}
            </Link>
            <span>{genderIcon(p.gender)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
