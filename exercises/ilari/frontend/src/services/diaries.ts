import { DiaryEntry, NewDiaryEntry } from "../types";

const BASE_URL = "http://localhost:3000/api/diaries"; // o "/api/diaries" si usas proxy

export async function getAll(): Promise<DiaryEntry[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GET failed: ${res.status} ${text}`);
  }
  return (await res.json()) as DiaryEntry[];
}

export async function create(entry: NewDiaryEntry): Promise<DiaryEntry> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  });

  if (!res.ok) {
    // Intentamos extraer el motivo del backend
    let reason = `${res.status} ${res.statusText}`;
    try {
      const { error } = (await res.json()) as { error?: string };
      if (error) reason = error;
    } catch {
      const text = await res.text().catch(() => "");
      if (text) reason = text;
    }
    throw new Error(reason);
  }

  return (await res.json()) as DiaryEntry;
}
