import { NewDiaryEntry, Weather, Visibility } from './types';

const isString = (text: unknown): text is string =>
  typeof text === 'string' || text instanceof String;

const isDate = (date: string): boolean => Boolean(Date.parse(date));
const isWeather = (param: string): param is Weather =>
  Object.values(Weather).map(String).includes(param);
const isVisibility = (param: string): param is Visibility =>
  Object.values(Visibility).map(String).includes(param);

const parseComment = (comment: unknown): string | undefined => {
  // 👇 ahora es opcional
  if (comment === undefined) return undefined;
  if (!isString(comment)) throw new Error('Incorrect comment');
  return comment;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseWeather = (weather: unknown): Weather => {
  if (!weather || !isString(weather) || !isWeather(weather)) {
    throw new Error('Incorrect or missing weather: ' + weather);
  }
  return weather;
};

const parseVisibility = (visibility: unknown): Visibility => {
  if (!visibility || !isString(visibility) || !isVisibility(visibility)) {
    throw new Error('Incorrect or missing visibility: ' + visibility);
  }
  return visibility;
};

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  const base: NewDiaryEntry = {
    date: parseDate((object as { date: unknown }).date),
    weather: parseWeather((object as { weather: unknown }).weather),
    visibility: parseVisibility((object as { visibility: unknown }).visibility),
  };

  const comment = parseComment((object as { comment?: unknown }).comment);
  if (comment !== undefined) base.comment = comment;

  return base;
};

export default toNewDiaryEntry;
