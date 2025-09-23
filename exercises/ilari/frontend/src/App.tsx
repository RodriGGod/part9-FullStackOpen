import { useEffect, useState } from "react";
import { DiaryEntry, NewDiaryEntry } from "./types";
import * as diaryService from "./services/diaries";
import DiaryList from "./components/DiaryList";
import DiaryForm from "./components/DiaryForm";

export default function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await diaryService.getAll();
        setDiaries(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleCreate = async (entry: NewDiaryEntry) => {
    try {
      setCreating(true);
      const created = await diaryService.create(entry);
      // añade al principio
      setDiaries((prev) => [created, ...prev]);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error creating diary");
    } finally {
      setCreating(false);
    }
  };

  return (
    <main style={{ maxWidth: 720, margin: "32px auto", padding: "0 16px" }}>
      <h1>Flight Diaries</h1>

      <section style={{ margin: "16px 0", padding: 16, border: "1px solid #e5e7eb", borderRadius: 12 }}>
        <h2>Nueva entrada</h2>
        <DiaryForm onCreate={handleCreate} />
        {creating && <p>Creando…</p>}
      </section>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {loading ? <p>Cargando…</p> : <DiaryList diaries={diaries} />}
    </main>
  );
}
