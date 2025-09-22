"use strict";
// bmiCalculator.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBmi = void 0;
const calculateBmi = (height, weight) => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    if (bmi < 18.5) {
        return "Underweight (thin)";
    }
    else if (bmi >= 18.5 && bmi < 25) {
        return "Normal (healthy weight)";
    }
    else if (bmi >= 25 && bmi < 30) {
        return "Overweight";
    }
    else {
        return "Obese";
    }
};
exports.calculateBmi = calculateBmi;
// --- Manejo de argumentos desde CLI ---
if (require.main === module) {
    try {
        const [, , arg1, arg2] = process.argv;
        if (!arg1 || !arg2) {
            throw new Error("Please provide height (cm) and weight (kg).");
        }
        const height = Number(arg1);
        const weight = Number(arg2);
        if (isNaN(height) || isNaN(weight)) {
            throw new Error("Height and weight must be numbers.");
        }
        console.log((0, exports.calculateBmi)(height, weight));
    }
    catch (error) {
        let errorMessage = "Something bad happened.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        console.log(errorMessage);
    }
}
