import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import { getAll } from "./services/diaries";
import DiaryList from "./components/DiaryList";

export default function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAll();
        setDiaries(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main style={{ maxWidth: 720, margin: "32px auto", padding: "0 16px" }}>
      <h1>Flight Diaries</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {loading ? <p>Cargando…</p> : <DiaryList diaries={diaries} />}
    </main>
  );
}
