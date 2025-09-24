import axios from 'axios'
import { NonSensitivePatient, Patient } from '../types'


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
