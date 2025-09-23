import diaries from '../data/entries'; // o donde tengas los datos
import { DiaryEntry, NewDiaryEntry } from '../types';

let entries: DiaryEntry[] = diaries;

const getEntries = (): DiaryEntry[] => entries;

const getNonSensitiveEntries = (): Omit<DiaryEntry, 'comment'>[] =>
  entries.map(({ id, date, weather, visibility }) => ({
    id, date, weather, visibility
  }));

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newEntry: DiaryEntry = { id: Math.max(0, ...entries.map(e => e.id)) + 1, ...entry };
  entries.push(newEntry);
  return newEntry;
};

export default { getEntries, getNonSensitiveEntries, addDiary };
