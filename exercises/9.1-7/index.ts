// index.ts
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

// ---------- Helpers de validación ----------


const parseBmiQuery = (q: unknown): { height: number; weight: number } => {
  if (!q || typeof q !== 'object') {
    throw new Error('parameters missing');
  }
  const obj = q as Record<string, unknown>;
  const height = Number(obj.height);
  const weight = Number(obj.weight);

  if (obj.height === undefined || obj.weight === undefined) {
    throw new Error('parameters missing');
  }
  if (Number.isNaN(height) || Number.isNaN(weight)) {
    throw new Error('malformatted parameters');
  }
  return { height, weight };
};


const toNumberArray = (arr: unknown): number[] => {
  if (!Array.isArray(arr)) throw new Error('malformatted parameters');
  const nums = arr.map((v) => Number(v));
  if (nums.some((n) => Number.isNaN(n))) throw new Error('malformatted parameters');
  return nums;
};


const parseExercisesBody = (
  body: unknown
): { daily_exercises: number[]; target: number } => {
  if (!body || typeof body !== 'object') {
    throw new Error('parameters missing');
  }
  const obj = body as Record<string, unknown>;

  if (obj.daily_exercises === undefined || obj.target === undefined) {
    throw new Error('parameters missing');
  }

  const daily_exercises = toNumberArray(obj.daily_exercises);
  const target = Number(obj.target);

  if (Number.isNaN(target)) {
    throw new Error('malformatted parameters');
  }

  return { daily_exercises, target };
};


app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = parseBmiQuery(req.query);
    const bmi = calculateBmi(height, weight);
    return res.json({ weight, height, bmi });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'malformatted parameters';
    const status = msg === 'parameters missing' ? 400 : 400;
    return res.status(status).json({ error: msg });
  }
});


app.post('/exercises', (req, res) => {
  try {
    const { daily_exercises, target } = parseExercisesBody(req.body);
    const result = calculateExercises(daily_exercises, target);
    return res.json(result);
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'malformatted parameters';
    // Solo dos tipos de error según enunciado:
    // "parameters missing" o "malformatted parameters"
    const status = msg === 'parameters missing' ? 400 : 400;
    return res.status(status).json({ error: msg });
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
