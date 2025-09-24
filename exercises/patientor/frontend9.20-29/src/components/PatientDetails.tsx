import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Patient, Entry } from '../types';

export default function PatientDetails() {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const { data } = await axios.get<Patient>(`http://localhost:3001/api/patients/${id}`);
        setPatient(data);
      } catch (e: any) {
        setError(e?.response?.data?.error ?? e?.message ?? 'Error');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'crimson' }}>{error}</p>;
  if (!patient) return <p>Not found</p>;

  return (
    <div>
      <h1>Patientor</h1>
      <Link to="/"><button>HOME</button></Link>

      <h2 style={{ marginTop: 24 }}>{patient.name}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <p>date of birth: {patient.dateOfBirth}</p>

      <h3>Entries</h3>
      {patient.entries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <ul style={{ paddingLeft: 18 }}>
          {patient.entries.map((e: Entry) => (
            <li key={e.id} style={{ marginBottom: 12 }}>
              <div><b>{e.date}</b> — {e.description}</div>
              {e.diagnosisCodes && e.diagnosisCodes.length > 0 && (
                <ul>
                  {e.diagnosisCodes.map(code => (
                    <li key={code}>{code}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
