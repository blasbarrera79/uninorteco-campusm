function validateGrade(grade) {
  if (grade < 0 || grade > 5) {
    throw new Error("La nota debe estar entre 0 y 5");
  }
}

function checkGradesAndWeightsGt0(grades, weights) {
  if (grades.length === 0 || weights.length === 0) {
    throw new Error("No hay notas o pesos");
  }
}

function checkGradesAndWeightsLenght(grades, weights) {
  if (grades.length !== weights.length) {
    throw new Error("Las notas y los pesos no tienen la misma longitud");
  }
}

function computeWeightedAverage(grades, weights) {
  checkGradesAndWeightsLenght(grades, weights);
  checkGradesAndWeightsGt0(grades, weights);

  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);

  const weightedSum = grades.reduce((sum, grade, index) => {
    const weight = weights[index];
    return sum + grade * weight;
  }, 0);

  return weightedSum / totalWeight;
}

function computeWeightedAverageGivenTotalWeight(grades, weights, totalWeight) {
  checkGradesAndWeightsLenght(grades, weights);

  if (totalWeight <= 0) {
    throw new Error("El peso total debe ser mayor a 0");
  }

  const weightedSum = grades.reduce((sum, grade, index) => {
    const weight = weights[index];
    return sum + grade * weight;
  }, 0);

  return weightedSum / totalWeight;
}

function computeNeededGrade(
  desiredGrade,
  currentGrade,
  remainingWeight,
  offset = 0.05,
  options = {}
) {
  if (remainingWeight === 0) {
    throw new Error("El peso restante no puede ser 0");
  }

  if (desiredGrade < currentGrade) {
    const minGradeDefined = options.minGrade !== undefined;
    const errorFields = {
      fieldName: "desiredGrade",
      ...(minGradeDefined && { minGrade: options.minGrade }),
    };

    const errorMessage = minGradeDefined
      ? `Tu nota actual es ${options.minGrade}. Desear algo menor a esto no tiene sentido`
      : "Lo sentimos, pero la nota deseada causa que tus componentes restantes se vuelvan negativos";

    throw new Error(errorMessage, errorFields);
  }

  const neededGradePoints = desiredGrade - currentGrade;

  if (neededGradePoints > 5 * remainingWeight + offset) {
    const maxGradeDefined = options.maxGrade !== undefined;
    const errorFields = {
      fieldName: "desiredGrade",
      ...(maxGradeDefined && { maxGrade: options.maxGrade }),
    };

    const errorMessage = maxGradeDefined
      ? `Tu máxima nota alcanzable es ${options.maxGrade}. Lo que deseas es imposible`
      : "Lo sentimos, La nota deseada no puede ser alcanzada";

    throw new Error(errorMessage, errorFields);
  }

  return neededGradePoints / remainingWeight;
}

function computeLostPoints(grades, weights) {
  checkGradesAndWeightsLenght(grades, weights);

  const lostPoints = grades.reduce((sum, grade, index) => {
    const weight = weights[index];
    return sum + (5 - grade) * weight;
  }, 0);

  return lostPoints;
}

function computeMaximumGrade(lockedGrades, lockedWeights, unlockedWeights) {
  const unlockedGrades = Array(unlockedWeights.length).fill(5);

  const grades = [...lockedGrades, ...unlockedGrades];
  const weights = [...lockedWeights, ...unlockedWeights];

  return computeWeightedAverage(grades, weights);
}

module.exports = {
  validateGrade,
  computeWeightedAverage,
  computeWeightedAverageGivenTotalWeight,
  computeNeededGrade,
  computeLostPoints,
  computeMaximumGrade,
};
