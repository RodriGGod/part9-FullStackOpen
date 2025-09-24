import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Patient, Gender } from '../types'
import { getPatient } from '../services/patients'

function genderIcon(g: Gender) {
  if (g === Gender.Male) return ' ♂'
  if (g === Gender.Female) return ' ♀'
  return ' ⚧'
}

export default function PatientDetails() {
  const { id } = useParams<{ id: string }>()
  const [patient, setPatient] = useState<Patient | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    (async () => {
      try {
        const data = await getPatient(id)
        setPatient(data)
      } catch (e: any) {
        setError(e?.response?.data?.error ?? e?.message ?? 'Error')
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: 'crimson' }}>{error}</p>
  if (!patient) return <p>Not found</p>

  return (
    <div>
      <h1>Patientor</h1>
      <Link to="/"><button>HOME</button></Link>

      <h2 style={{ marginTop: 24 }}>
        {patient.name}{genderIcon(patient.gender)}
      </h2>

      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <p>date of birth: {patient.dateOfBirth}</p>

      <h3>Entries</h3>
      {patient.entries?.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <ul>
          {patient.entries.map((_, i) => (
            <li key={i}>Entry #{i + 1}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
