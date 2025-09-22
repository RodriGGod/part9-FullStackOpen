// src/diaries.ts  (o src/routes/diaries.ts)
import express from 'express';
import diaryService from '../services/diaryService';      // ajusta la ruta si estás en /routes
import toNewDiaryEntry from '../utils';          // idem

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(diaryService.getEntries());          // si ya lo tienes, perfecto
});

router.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);
    const addedEntry = diaryService.addDiary(newDiaryEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
