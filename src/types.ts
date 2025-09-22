// src/types.ts
export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export interface NewDiaryEntry {
  date: string;            // p.ej. '2025-09-22'
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export interface DiaryEntry extends NewDiaryEntry {
  id: number;              // o string, como uses en tu servicio
}
