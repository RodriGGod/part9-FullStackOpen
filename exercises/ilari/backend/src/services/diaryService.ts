// src/diaryService.ts
import { DiaryEntry, NewDiaryEntry } from '../types';

let diaries: DiaryEntry[] = []; // o tu fuente real

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newEntry: DiaryEntry = {
    id: Math.max(0, ...diaries.map(d => d.id)) + 1, // o UUID
    ...entry,
  };
  diaries.push(newEntry);
  return newEntry;
};

export default { getEntries, addDiary };
