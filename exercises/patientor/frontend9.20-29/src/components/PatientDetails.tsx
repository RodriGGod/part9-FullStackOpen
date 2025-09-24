import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Patient, Entry, Diagnosis } from '../types';

export default function PatientDetails() {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar paciente
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const { data } = await axios.get<Patient>(`http://localhost:3001/api/patients/${id}`);
        setPatient(data);
      } catch (e: any) {
        setError(e?.response?.data?.error ?? e?.message ?? 'Error cargando paciente');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // Cargar diagnósticos (solo una vez en este componente)
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<Diagnosis[]>('http://localhost:3001/api/diagnoses');
        setDiagnoses(data);
      } catch {
        // Silenciamos el error en el ejercicio; si quieres, muestra un aviso
      }
    })();
  }, []);

  const nameOf = (code: string) =>
    diagnoses.find(d => d.code === code)?.name ?? '';

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

      <h3>entries</h3>
      {patient.entries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <ul style={{ paddingLeft: 18 }}>
          {patient.entries.map((e: Entry) => (
            <li key={e.id} style={{ marginBottom: 12, border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
              <div><b>{e.date}</b> <em>{e.description}</em></div>

              {e.diagnosisCodes && e.diagnosisCodes.length > 0 && (
                <ul style={{ marginTop: 8 }}>
                  {e.diagnosisCodes.map(code => (
                    <li key={code}>
                      {code} {nameOf(code) ? `— ${nameOf(code)}` : ''}
                    </li>
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
