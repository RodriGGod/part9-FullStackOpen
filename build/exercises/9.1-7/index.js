"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bmiCalculator_1 = require("./bmiCalculator");
const exerciseCalculator_1 = require("./exerciseCalculator");
const app = (0, express_1.default)();
app.use(express_1.default.json());
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
    const bmi = (0, bmiCalculator_1.calculateBmi)(h, w);
    return res.json({
        weight: w,
        height: h,
        bmi,
    });
});
// POST /exercises
app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body;
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
    const result = (0, exerciseCalculator_1.calculateExercises)(hours, Number(target));
    return res.json(result);
});
const PORT = 3003;
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${PORT}`);
});
