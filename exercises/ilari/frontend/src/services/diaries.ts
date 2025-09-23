import { DiaryEntry, NewDiaryEntry } from "../types";

// Usa la que tengas: "/api/diaries" si hiciste proxy; si no, la absoluta.
const BASE_URL = "http://localhost:3000/api/diaries";

export async function getAll(): Promise<DiaryEntry[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GET failed: ${res.status} ${text}`);
  }
  return (await res.json()) as DiaryEntry[];
}

export async function create(entry: NewDiaryEntry): Promise<DiaryEntry> {
  console.log("POST body:", entry); // 👈 para ver lo que envías
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  });

  if (!res.ok) {
    // lee el mensaje que devuelve el backend
    const text = await res.text();
    throw new Error(`POST failed: ${res.status} ${text}`);
  }
  return (await res.json()) as DiaryEntry;
}
