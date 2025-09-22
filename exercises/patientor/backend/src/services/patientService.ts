// src/services/patientService.ts
import patientsData from '../data/patientsData';
import { Patient, PublicPatient } from '../types';

const patients: Patient[] = patientsData;

export const getPublicPatients = (): PublicPatient[] => {
  // quita ssn con destructuring y devuelve tipo seguro
  return patients.map(({ ssn, ...publicData }) => publicData);
};
