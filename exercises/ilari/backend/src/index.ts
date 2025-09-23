// src/index.ts
import express from 'express';
import diaryRouter from './routes/diaries'; // o './routes/diaries'
import cors from "cors";


const app = express();
app.use(express.json());             // <── middleware para parsear JSON
app.use(cors({ origin: "http://localhost:5173" }));


const PORT = 3000;

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
