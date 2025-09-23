import { DiaryEntry } from "../types";

type Props = { diaries: DiaryEntry[] };

export default function DiaryList({ diaries }: Props) {
  if (diaries.length === 0) return <p>No hay diarios.</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
      {diaries.map((d) => (
        <li key={d.id} style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 12 }}>
          <h3 style={{ margin: "0 0 6px 0" }}>{d.date}</h3>
          <div>visibility: <b>{d.visibility}</b></div>
          <div>weather: <b>{d.weather}</b></div>
          {d.comment && (
            <div style={{ marginTop: 6, fontStyle: "italic" }}>
              “{d.comment}”
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
