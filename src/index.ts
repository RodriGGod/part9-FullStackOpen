// src/index.ts
import express from 'express';
import diaryRouter from './routes/diaries'; // o './routes/diaries'

const app = express();
app.use(express.json());             // <── middleware para parsear JSON

const PORT = 3000;

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
