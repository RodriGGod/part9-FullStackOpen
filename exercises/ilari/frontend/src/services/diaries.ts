import { DiaryEntry } from "../types";

const BASE_URL = "http://localhost:3000/api/diaries";

export async function getAll(): Promise<DiaryEntry[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to load diaries: ${res.status} ${text}`);
  }
  const data = (await res.json()) as DiaryEntry[];
  return data;
}
