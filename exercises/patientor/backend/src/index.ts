import express from 'express';
import cors from 'cors';

import patientService from './services/patientService';
import diagnoseService from './services/diagnoseService'; 
import { toNewEntry } from './utils';

const app = express();
app.use(cors());
app.use(express.json());

// Sanity
app.get('/healthz', (_req, res) => res.send('ok'));

// DIAGNOSES
app.get('/api/diagnoses', (_req, res) => {
  return res.json(diagnoseService.getDiagnoses());
});

// PATIENTS - lista no sensible
app.get('/api/patients', (_req, res) => {
  return res.json(patientService.getAllNonSensitive());
});

// PATIENTS - crear nuevo
app.post('/api/patients', (req, res) => {
  try {
    // asumo que ya tienes un toNewPatient; si no, aquí no tocamos nada del 9.26
    const created = patientService.addPatient(req.body);
    return res.status(201).json(created);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Invalid patient';
    return res.status(400).json({ error: msg });
  }
});

// PATIENTS - detalle completo con entries
app.get('/api/patients/:id', (req, res) => {
  const p = patientService.getPatientById(req.params.id);
  if (!p) return res.status(404).json({ error: 'Patient not found' });
  return res.json(p);
});

// 9.26 — añadir ENTRY a un paciente
app.post('/api/patients/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const saved = patientService.addEntry(req.params.id, newEntry);
    return res.status(201).json(saved);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Invalid entry';
    return res.status(400).json({ error: msg });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
