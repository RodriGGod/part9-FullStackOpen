// src/utils.ts
import { Gender, NewPatient } from './types';

/** Type guards */
const isString = (text: unknown): text is string =>
  typeof text === 'string' || text instanceof String;

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const isGender = (param: string): param is Gender =>
  Object.values(Gender).map(String).includes(param);

/** Parsers campo a campo */
const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDateOfBirth = (dob: unknown): string => {
  if (!dob || !isString(dob) || !isDate(dob)) {
    throw new Error('Incorrect or missing dateOfBirth: ' + dob);
  }
  return dob;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  // Si quieres, aquí podrías meter regex de SSN finlandés, etc.
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

/** Constructor seguro desde req.body (unknown) → NewPatient */
const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  const o = object as {
    name: unknown;
    dateOfBirth: unknown;
    ssn: unknown;
    gender: unknown;
    occupation: unknown;
  };

  return {
    name: parseName(o.name),
    dateOfBirth: parseDateOfBirth(o.dateOfBirth),
    ssn: parseSsn(o.ssn),
    gender: parseGender(o.gender),
    occupation: parseOccupation(o.occupation)
  };
};

export default toNewPatient;
