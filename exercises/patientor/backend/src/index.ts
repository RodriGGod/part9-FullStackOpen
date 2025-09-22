// src/index.ts
import express from 'express';
import patientsRouter from './routes/patients';
import diagnosesRouter from './routes/diagnoses'; // si ya lo tienes

const app = express();
app.use(express.json()); // ¡importante para leer req.body JSON!

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/patients', patientsRouter);
app.use('/api/diagnoses', diagnosesRouter); // si procede

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
