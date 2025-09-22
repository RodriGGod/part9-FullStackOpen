export interface DiagnoseEntry{
    code: string;
    name: string;
    latin?: string;
}

export type DiagnoseEntryWithoutLatin = Omit<DiagnoseEntry, 'latin'>;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;       // en este ejercicio lo dejamos como string
  occupation: string;
  // si ya tienes otros campos (p.ej., entries), añádelos aquí
}

// Tipo que el backend expone al frontend (sin ssn)
export type PublicPatient = Omit<Patient, 'ssn'>;