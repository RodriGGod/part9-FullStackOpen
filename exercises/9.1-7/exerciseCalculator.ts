interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (dailyHours: number[], target: number): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(d => d > 0).length;
  const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "great job, you reached your goal!";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "you need to work harder!";
  }

  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  };
};

// --- Manejo de argumentos desde CLI ---
if (require.main === module) {
  try {
    const [, , targetArg, ...restArgs] = process.argv;

    if (!targetArg || restArgs.length === 0) {
      throw new Error("Please provide a target and at least one day of exercises.");
    }

    const target = Number(targetArg);
    const dailyHours = restArgs.map(n => {
      if (isNaN(Number(n))) {
        throw new Error(`Value "${n}" is not a number.`);
      }
      return Number(n);
    });

    if (isNaN(target)) {
      throw new Error("Target must be a number.");
    }

    console.log(calculateExercises(dailyHours, target));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
