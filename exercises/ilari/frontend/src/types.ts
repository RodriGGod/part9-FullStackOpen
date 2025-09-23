export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy"
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor"
}

export interface DiaryEntry {
  id: number;
  date: string;        // "YYYY-MM-DD"
  weather: Weather;
  visibility: Visibility;
  // OJO: normalmente el backend NO lo envía en GET
  comment?: string;
}
