import { v1 as uuid } from 'uuid';
import patientsData from '../data/patientsData';
import { Patient, NonSensitivePatient, NewPatient, Entry } from '../types';


const patients: Patient[] = (patientsData as Omit<Patient, 'entries'>[]).map(p => ({
  ...p,
  entries: [] as Entry[],
}))
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
    entries: [],           // siempre empezamos vacío
    ...newPatient
  };
  patients.push(patientToAdd);
  return patientToAdd;
};




const getPatientById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};


export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatientById
};
