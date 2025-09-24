import express from 'express';
import cors from 'cors';
import patientsRouter from './routes/patients';
import { NonSensitivePatient } from './types';
import patients from './data/patientsData';

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba para verificar que el server responde
app.get('/healthz', (_req, res) => res.send('ok'));

// Montamos el router de pacientes
app.use('/api/patients', patientsRouter);


app.get('/api/patients', (_req, res) => {
  const nonSensitive: NonSensitivePatient[] = patients.map(({ ssn, entries, ...rest }) => rest);
  res.json(nonSensitive);
});

app.get('/api/patients/:id', (req, res) => {
  const p = patients.find(x => x.id === req.params.id);
  if (!p) return res.status(404).json({ error: 'Patient not found' });
  return res.json(p);
});


// 404 por defecto
app.use((_req, res) => res.status(404).json({ error: 'not found' }));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
