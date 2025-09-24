// src/routes/patients.ts
import express from 'express';
import patientService from '../services/patientService';
import {toNewPatient} from '../utils';

const router = express.Router();


router.get('/', (_req, res) => {
  return res.json(patientService.getAllNonSensitive());
});


router.get('/all', (_req, res) => {
   res.json(patientService.getPatients());
});



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

router.get('/:id', (req, res) => {
  const p = patientService.getPatientById(req.params.id);
  if (!p) return res.status(404).json({ error: 'Patient not found' });
  return res.json(p);
});
export default router;
