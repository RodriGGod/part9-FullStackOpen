import {
  Diagnosis,
  
  NewEntry,
  NewPatient,
  Gender,
  HealthCheckRating
} from './types';

// Helpers genéricos
const isString = (v: unknown): v is string =>
  typeof v === 'string' || v instanceof String;

const parseString = (v: unknown, field: string): string => {
  if (!v || !isString(v)) throw new Error(`Incorrect or missing ${field}`);
  return v;
};

const isDate = (s: string): boolean => Boolean(Date.parse(s));

const parseDate = (v: unknown, field: string): string => {
  const s = parseString(v, field);
  if (!isDate(s)) throw new Error(`Incorrect ${field}: ${s}`);
  return s;
};

// ---------- Patient parsing ----------
const isGender = (v: unknown): v is Gender =>
  v === Gender.Male || v === Gender.Female || v === Gender.Other;

const parseGender = (v: unknown): Gender => {
  if (!isGender(v)) throw new Error('Incorrect or missing gender');
  return v;
};

// Crea un NewPatient desde unknown (estilo curso)
export const toNewPatient = (obj: unknown): NewPatient => {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Invalid patient body');
  }
  const o = obj as Record<string, unknown>;
  return {
    name: parseString(o.name, 'name'),
    dateOfBirth: parseDate(o.dateOfBirth, 'dateOfBirth'),
    ssn: parseString(o.ssn, 'ssn'),
    gender: parseGender(o.gender),
    occupation: parseString(o.occupation, 'occupation'),
  };
};

// ---------- Entry parsing ----------
const isHealthCheckRating = (n: unknown): n is HealthCheckRating =>
  typeof n === 'number' && n in HealthCheckRating;

// Del enunciado (confiamos en el formato si existe diagnosisCodes)
export const parseDiagnosisCodes = (
  object: unknown
): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }
  return (object as { diagnosisCodes: Array<Diagnosis['code']> }).diagnosisCodes;
};

// Crea un NewEntry desde unknown (soporta los 3 tipos)
export const toNewEntry = (obj: unknown): NewEntry => {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Invalid entry body');
  }

  const type = parseString((obj as any).type, 'type');
  const description = parseString((obj as any).description, 'description');
  const date = parseDate((obj as any).date, 'date');
  const specialist = parseString((obj as any).specialist, 'specialist');
  const diagnosisCodes = parseDiagnosisCodes(obj);

  const base = { description, date, specialist, diagnosisCodes };

  switch (type) {
    case 'Hospital': {
      const discharge = (obj as any).discharge;
      if (!discharge || typeof discharge !== 'object') {
        throw new Error('Missing discharge');
      }
      const dc = {
        date: parseDate((discharge as any).date, 'discharge.date'),
        criteria: parseString((discharge as any).criteria, 'discharge.criteria'),
      };
      return { type, ...base, discharge: dc };
    }

    case 'OccupationalHealthcare': {
      const employerName = parseString((obj as any).employerName, 'employerName');
      const sickLeave = (obj as any).sickLeave;
      let sl: { startDate: string; endDate: string } | undefined = undefined;

      if (sickLeave && typeof sickLeave === 'object') {
        sl = {
          startDate: parseDate((sickLeave as any).startDate, 'sickLeave.startDate'),
          endDate: parseDate((sickLeave as any).endDate, 'sickLeave.endDate'),
        };
      }
      return { type, ...base, employerName, ...(sl ? { sickLeave: sl } : {}) };
    }

    case 'HealthCheck': {
      const rating = (obj as any).healthCheckRating;
      if (!isHealthCheckRating(rating)) {
        throw new Error('Invalid healthCheckRating');
      }
      return { type, ...base, healthCheckRating: rating };
    }

    default:
      throw new Error(`Unknown entry type: ${type}`);
  }
};

