// src/routes/patients.ts
import express from 'express';
import { getPublicPatients } from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(getPublicPatients());
});

export default router;
