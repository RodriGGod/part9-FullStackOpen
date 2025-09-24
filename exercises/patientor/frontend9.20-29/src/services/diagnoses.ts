import axios from 'axios';
import { Diagnosis } from '../types';

const api = axios.create({ baseURL: 'http://localhost:3001/api' });

export async function getDiagnoses(): Promise<Diagnosis[]> {
  const { data } = await api.get<Diagnosis[]>('/diagnoses');
  return data;
}
