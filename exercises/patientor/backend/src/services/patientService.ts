import { v1 as uuid } from 'uuid';
import patientsData from '../data/patientsData';
import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  NewEntry,
  Entry
} from '../types';

const patients: Patient[] = [...patientsData];

const getAllNonSensitive = (): NonSensitivePatient[] =>
  patients.map(({ ssn, entries, ...rest }) => rest);

const getPatients = (): Patient[] => patients;

const getPatientById = (id: string): Patient | undefined =>
  patients.find(p => p.id === id);

const addPatient = (newPatient: NewPatient): Patient => {
  const patientToAdd: Patient = {
    id: uuid(),
    entries: [],
    ...newPatient
  };
  patients.push(patientToAdd);
  return patientToAdd;
};

const addEntry = (patientId: string, newEntry: NewEntry): Entry => {
  const patient = getPatientById(patientId);
  if (!patient) throw new Error('Patient not found');

  const entry: Entry = { id: uuid(), ...newEntry };
  patient.entries.push(entry);
  return entry;
};

export default {
  getAllNonSensitive,
  getPatients,
  getPatientById,
  addPatient,
  addEntry
};
