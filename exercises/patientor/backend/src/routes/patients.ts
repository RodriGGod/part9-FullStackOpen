// src/routes/patients.ts
import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

// Opcional: endpoint sin SSN para el frontend (lista pública)
router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitivePatients());
});

// Si quieres exponer todos (con ssn) para debug:
// router.get('/all', (_req, res) => {
//   res.json(patientService.getPatients());
// });

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);         // parsing/validación segura
    const added = patientService.addPatient(newPatient);
    res.status(201).json(added);
  } catch (e: unknown) {
    let msg = 'Something went wrong.';
    if (e instanceof Error) msg += ' Error: ' + e.message;
    res.status(400).send(msg);
  }
});

export default router;
