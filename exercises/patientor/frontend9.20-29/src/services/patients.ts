import axios from 'axios'
import { NonSensitivePatient, Patient, HealthCheckEntry, HealthCheckRating, NewEntryFormValues, Entry} from '../types'


const api = axios.create({
  baseURL: 'http://localhost:3001/api'
})

export async function getAllPatients(): Promise<NonSensitivePatient[]> {
  const { data } = await api.get<NonSensitivePatient[]>('/patients')
  return data
}

export async function getPatient(id: string): Promise<Patient> {
  const { data } = await api.get<Patient>(`/patients/${id}`)
  return data
}


export async function addHealthCheckEntry(
  patientId: string,
  payload: {
    description: string;
    date: string;               // yyyy-mm-dd
    specialist: string;
    healthCheckRating: HealthCheckRating; // 0–3
    diagnosisCodes?: string[];  // opcional
  }
): Promise<HealthCheckEntry> {
  const { data } = await api.post<HealthCheckEntry>(
    `/patients/${patientId}/entries`,
    { type: 'HealthCheck', ...payload }
  );
  return data;
}

export async function addEntry(
  patientId: string,
  payload: NewEntryFormValues
): Promise<Entry> {
  const { data } = await api.post<Entry>(`/patients/${patientId}/entries`, payload);
  return data;
}