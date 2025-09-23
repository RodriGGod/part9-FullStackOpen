import express from 'express';
import cors from 'cors';
import diaryService from './services/diaryService';
import toNewDiaryEntry from './utils';

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json()); // 👈 imprescindible

app.get('/api/diaries', (_req, res) => {
  res.json(diaryService.getNonSensitiveEntries()); // o getEntries() si quieres comment
});

app.post('/api/diaries', (req, res) => {
  try {
    const newEntry = toNewDiaryEntry(req.body);
    const added = diaryService.addDiary(newEntry);
    res.json(added);
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    res.status(400).send({ error: msg });
  }
});

app.listen(3000, () => console.log('Server on 3000'));
