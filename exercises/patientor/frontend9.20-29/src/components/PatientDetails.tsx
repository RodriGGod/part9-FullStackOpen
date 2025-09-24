import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Patient,
  Entry,
  Diagnosis,
  HealthCheckEntry,
  HealthCheckRating,
} from '../types';
import { addHealthCheckEntry } from '../services/patients';
import AddHealthCheckForm from './AddHealthCheckForm';
import EntryDetails from './EntryDetails'; // si ya lo tienes del 9.25

export default function PatientDetails() {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<Diagnosis[]>('http://localhost:3001/api/diagnoses');
        setDiagnoses(data);
      } catch {
        // opcional: mostrar aviso
      }
    })();
  }, []);

  const diagMap = useMemo(
    () => Object.fromEntries(diagnoses.map(d => [d.code, d])),
    [diagnoses]
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'crimson' }}>{error}</p>;
  if (!patient || !id) return <p>Not found</p>;

  const handleAdd = async (form: {
    description: string;
    date: string;
    specialist: string;
    healthCheckRating: HealthCheckRating;
    diagnosisCodes?: string[];
  }) => {
    const created: HealthCheckEntry = await addHealthCheckEntry(id, form);
    setPatient(prev => (prev ? { ...prev, entries: [created, ...prev.entries] } : prev));
  };

  return (
    <div>
      <h1>Patientor</h1>
      <Link to="/"><button>HOME</button></Link>

      <h2 style={{ marginTop: 24 }}>{patient.name}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <p>date of birth: {patient.dateOfBirth}</p>

      {/* 9.27 — Formulario para añadir HealthCheck */}
      <AddHealthCheckForm onSubmit={handleAdd} />

      <h3>entries</h3>
      {patient.entries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <ul style={{ paddingLeft: 18 }}>
          {patient.entries.map((e: Entry) =>
            <EntryDetails key={e.id} entry={e} diagMap={diagMap} />
          )}
        </ul>
      )}
    </div>
  );
}
