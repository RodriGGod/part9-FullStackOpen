import express from 'express';
import cors from 'cors';
import patientsRouter from './routes/patients';

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba para verificar que el server responde
app.get('/healthz', (_req, res) => res.send('ok'));

// Montamos el router de pacientes
app.use('/api/patients', patientsRouter);

// 404 por defecto
app.use((_req, res) => res.status(404).json({ error: 'not found' }));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
