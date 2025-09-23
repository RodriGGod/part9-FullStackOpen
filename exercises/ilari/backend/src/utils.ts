// src/utils.ts
import { NewDiaryEntry, Weather, Visibility } from './types';

/**
 * Type guards
 */
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isWeather = (param: string): param is Weather => {
  // Permite que el check esté SIEMPRE sincronizado con el enum
  return Object.values(Weather).map(String).includes(param);
};

const isVisibility = (param: string): param is Visibility => {
  return Object.values(Visibility).map(String).includes(param);
};

/**
 * Parsers
 */
const parseComment = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing comment');
  }
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

/**
 * Constructor seguro desde req.body (unknown) → NewDiaryEntry
 */
const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  // extraemos y validamos campo a campo
  const newEntry: NewDiaryEntry = {
    date: parseDate((object as { date: unknown }).date),
    weather: parseWeather((object as { weather: unknown }).weather),
    visibility: parseVisibility((object as { visibility: unknown }).visibility),
    comment: parseComment((object as { comment: unknown }).comment),
  };

  return newEntry;
};

export default toNewDiaryEntry;
