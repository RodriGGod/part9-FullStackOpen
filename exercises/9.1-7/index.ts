import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

// GET /hello
app.get('/hello', (_req, res) => {
  res.send('Hello, Full Stack!');
});

// GET /bmi
app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  const h = Number(height);
  const w = Number(weight);

  if (isNaN(h) || isNaN(w)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(h, w);

  return res.json({
    weight: w,
    height: h,
    bmi,
  });
});

// POST /exercises
app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as {
    daily_exercises?: unknown;
    target?: unknown;
  };

  if (!daily_exercises || target === undefined) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const hours = daily_exercises.map((d) => Number(d));
  if (hours.some((h) => isNaN(h))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(hours, Number(target));
  return res.json(result);
});

const PORT = 3003;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
