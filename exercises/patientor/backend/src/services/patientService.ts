// src/services/patientService.ts
import { v1 as uuid } from 'uuid';
import patientsData from '../data/patientsData'; // tu JSON/TS con pacientes iniciales
import { Patient, NewPatient, NonSensitivePatient } from '../types';

const patients: Patient[] = patientsData as Patient[];

const getPatients = (): Patient[] => patients;

const getNonSensitivePatients = (): NonSensitivePatient[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));

const addPatient = (newPatient: NewPatient): Patient => {
  const patientToAdd: Patient = {
    id: uuid(),
    ...newPatient
  };
  patients.push(patientToAdd);
  return patientToAdd;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
};
