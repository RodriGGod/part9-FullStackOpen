// src/components/DiaryForm.tsx
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

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // comment opcional: no lo envíes si está vacío
    const payload: NewDiaryEntry = {
      date,
      visibility,
      weather,
      ...(comment.trim() ? { comment: comment.trim() } : {}),
    };

    await onCreate(payload);

    // reset
    setDate("");
    setVisibility(Visibility.Good);
    setWeather(Weather.Sunny);
    setComment("");
  };

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
      <label>
        date
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>

      <fieldset style={{ border: "none", padding: 0 }}>
        <legend>visibility</legend>
        {Object.values(Visibility).map((v) => (
          <label key={v} style={{ marginRight: 10 }}>
            <input
              type="radio"
              name="visibility"
              value={v}
              checked={visibility === v}
              onChange={() => setVisibility(v)}
            />
            {" "}{v}
          </label>
        ))}
      </fieldset>

      <fieldset style={{ border: "none", padding: 0 }}>
        <legend>weather</legend>
        {Object.values(Weather).map((w) => (
          <label key={w} style={{ marginRight: 10 }}>
            <input
              type="radio"
              name="weather"
              value={w}
              checked={weather === w}
              onChange={() => setWeather(w)}
            />
            {" "}{w}
          </label>
        ))}
      </fieldset>

      <label>
        comment (optional)
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="e.g. crosswind"
        />
      </label>

      <button type="submit">add</button>
    </form>
  );
}
