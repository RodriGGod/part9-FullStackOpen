import { v1 as uuid } from 'uuid';
import patientsData from '../data/patientsData';
import { Patient, NonSensitivePatient, NewPatient } from '../types';


const patients: Patient[] = [...patientsData];


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
    entries: [],          
    ...newPatient
  };
  patients.push(patientToAdd);
  return patientToAdd;
};




const getPatientById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const getAllNonSensitive = (): NonSensitivePatient[] =>
  patients.map(({ ssn, entries, ...rest }) => rest);


export default {
  getPatients,
  getNonSensitivePatients,
  getAllNonSensitive,
  addPatient,
  getPatientById
};
