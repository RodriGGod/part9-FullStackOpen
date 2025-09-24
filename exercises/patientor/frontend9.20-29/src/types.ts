export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

// Lo que suele devolver /api/patients (sin ssn ni entries)
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;


export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

