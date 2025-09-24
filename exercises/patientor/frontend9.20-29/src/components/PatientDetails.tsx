import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Patient,
  Entry,
  Diagnosis,
  NewEntryFormValues,
} from '../types';
import { addEntry } from '../services/patients';
import AddEntryForm from './AddEntryForm';
import EntryDetails from './EntryDetails';

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
        setError(e?.response?.data?.error ?? e?.message ?? 'Error loading patient');
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
        // opcional: manejar error silencioso
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

  // Handler para crear cualquier tipo de Entry
  const handleAdd = async (values: NewEntryFormValues) => {
    const created: Entry = await addEntry(id, values);
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

      
      <AddEntryForm diagnoses={diagnoses} onSubmit={handleAdd} />

      <h3>entries</h3>
      {patient.entries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <ul style={{ paddingLeft: 18 }}>
          {patient.entries.map((e: Entry) => (
            <EntryDetails key={e.id} entry={e} diagMap={diagMap} />
          ))}
        </ul>
      )}
    </div>
  );
}
