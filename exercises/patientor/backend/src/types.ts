export interface DiagnoseEntry{
    code: string;
    name: string;
    latin?: string;
}

export type DiagnoseEntryWithoutLatin = Omit<DiagnoseEntry, 'latin'>;

// src/types.ts
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;  // ISO date string
  ssn: string;
  gender: Gender;
  occupation: string;
}

// Lo que recibe el POST (sin id)
export type NewPatient = Omit<Patient, 'id'>;

// Para listar sin datos sensibles
export type NonSensitivePatient = Omit<Patient, 'ssn'>;
