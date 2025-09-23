import { useEffect, useState } from "react";
import { DiaryEntry, NewDiaryEntry } from "./types";
import * as diaryService from "./services/diaries";
import DiaryList from "./components/DiaryList";
import DiaryForm from "./components/DiaryForm";
import Notification from "./components/Notification";

export default function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [notif, setNotif] = useState<{ msg: string; type?: "error" | "info" } | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await diaryService.getAll();
        setDiaries(data);
      } catch (e) {
        setNotif({ msg: e instanceof Error ? e.message : "Failed to load diaries", type: "error" });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleCreate = async (entry: NewDiaryEntry) => {
    try {
      setCreating(true);
      const created = await diaryService.create(entry);
      setDiaries(prev => [created, ...prev]);
      setNotif({ msg: "Diario creado correctamente" });
    } catch (e) {
      // ⬅️ Mostramos el motivo real que vino del backend
      const msg = e instanceof Error ? e.message : "Failed to create diary";
      setNotif({ msg, type: "error" });
    } finally {
      setCreating(false);
      // auto-ocultar a los 3s
      setTimeout(() => setNotif(null), 3000);
    }
  };

  return (
    <main style={{ maxWidth: 720, margin: "32px auto", padding: "0 16px" }}>
      <h1>Flight Diaries</h1>

      <Notification message={notif?.msg ?? null} type={notif?.type} />

      <section style={{ margin: "16px 0", padding: 16, border: "1px solid #e5e7eb", borderRadius: 12 }}>
        <h2>Nueva entrada</h2>
        <DiaryForm onCreate={handleCreate} />
        {creating && <p>Creando…</p>}
      </section>

      {loading ? <p>Cargando…</p> : <DiaryList diaries={diaries} />}
    </main>
  );
}
