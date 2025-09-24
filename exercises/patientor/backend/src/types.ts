// Diagnoses
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface DiagnoseEntry{
  
}

// Base para todas las entradas
export interface BaseEntry {
  id: string;
  description: string;
  date: string;        // ISO yyyy-mm-dd
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

// Tipos específicos de entrada
export interface Discharge {
  date: string;
  criteria: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeave;
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: Discharge;
}

// Unión discriminada
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

// Pacientes
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type NewPatient = Omit<Patient, 'id' | 'entries'>;


// Para listar sin datos sensibles
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
