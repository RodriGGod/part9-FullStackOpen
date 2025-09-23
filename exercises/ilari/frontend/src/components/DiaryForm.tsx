import { useState } from "react";
import { NewDiaryEntry, Visibility, Weather } from "../types";

type Props = {
  onCreate: (entry: NewDiaryEntry) => Promise<void>;

  
};

export default function DiaryForm({ onCreate }: Props) {
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState<string>("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onCreate({
      date,
      visibility,
      weather,
      comment: comment || undefined,
    });
    // limpia el formulario
    setDate("");
    setVisibility(Visibility.Good);
    setWeather(Weather.Sunny);
    setComment("");
  };

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
      <label>
        Fecha
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>

      <fieldset>
        <legend>Visibility</legend>
        {Object.values(Visibility).map((v) => (
          <label key={v} style={{ marginRight: 8 }}>
            <input
              type="radio"
              name="visibility"
              value={v}
              checked={visibility === v}
              onChange={() => setVisibility(v)}
            />
            {v}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Weather</legend>
        {Object.values(Weather).map((w) => (
          <label key={w} style={{ marginRight: 8 }}>
            <input
              type="radio"
              name="weather"
              value={w}
              checked={weather === w}
              onChange={() => setWeather(w)}
            />
            {w}
          </label>
        ))}
      </fieldset>

      <label>
        Comentario (opcional)
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="p.ej. crosswind"
        />
      </label>

      <button type="submit">Añadir</button>
    </form>
  );
}
