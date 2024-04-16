import { DomainError, ErrorCode, InvalidInputError } from "../common/errors";

function validateGrade(grade) {
  if (grade < 0 || grade > 5) {
    throw new DomainError(
      "Lo sentimos, pero la nota debe estar entre 0 y 5",
      ErrorCode.INVALID_INPUT
    );
  }
}

function checkGradesAndWeightsGt0(grades, weights) {
  if (grades.length === 0 || weights.length === 0) {
    throw new DomainError(
      "Las notas y los pesos no pueden estar vacíos",
      ErrorCode.INVALID_LOGIC
    );
  }
}

function checkGradesAndWeightsLenght(grades, weights) {
  if (grades.length !== weights.length) {
    throw new DomainError(
      "Las notas y los pesos deben tener la misma longitud",
      ErrorCode.INVALID_LOGIC
    );
  }
}

/**
 * Given a list of grades and a list of weights, compute the weighted average.
 *
 * @param grades the list of grades. grades are between 0 and 5
 * @param weights the list of weights. weigths can be any number, but they must be positive
 * @returns the weighted average
 */
export function computeWeightedAverage(grades, weights) {
  checkGradesAndWeightsLenght(grades, weights);
  checkGradesAndWeightsGt0(grades, weights);

  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);

  const weightedSum = grades.reduce((sum, grade, index) => {
    const weight = weights[index];
    return sum + grade * weight;
  }, 0);

  return weightedSum / totalWeight;
}

/**
 * Given a list of grades and a list of weights, compute the weighted average.
 * This function is different from computeWeightedAverage because it takes the total weight as a parameter. This is useful when you want to compute the weighted average of a subset of components.
 *
 * Both grades and weights can be empty.
 *
 * @param grades the list of grades. grades are between 0 and 5.
 * @param weights the list of weights. weigths can be any number, but they must be positive
 * @param totalWeight the total weight of the components
 * @returns the weighted average
 */
export function computeWeightedAverageGivenTotalWeight(grades, weights, totalWeight) {
  checkGradesAndWeightsLenght(grades, weights);

  if (totalWeight <= 0) {
    throw new DomainError(
      "El peso total debe ser mayor a 0",
      ErrorCode.INVALID_LOGIC
    );
  }

  const weightedSum = grades.reduce((sum, grade, index) => {
    const weight = weights[index];
    return sum + grade * weight;
  }, 0);

  return weightedSum / totalWeight;
}

export function computeNeededGrade(
  desiredGrade,
  currentGrade,
  remainingWeight,
  offset = 0.05,
  options = {}
) {
  if (remainingWeight === 0) {
    throw new DomainError(
      "El peso restante no puede ser 0",
      ErrorCode.INVALID_LOGIC
    );
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

    throw new InvalidInputError(errorMessage, errorFields);
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

    throw new InvalidInputError(errorMessage, errorFields);
  }

  return neededGradePoints / remainingWeight;
}

/**
 * Lost points are the points you lose when you do not obtain the maximum grade in a specific component.
 * */
function computeLostPoints(grades, weights) {
  checkGradesAndWeightsLenght(grades, weights);

  const lostPoints = grades.reduce((sum, grade, index) => {
    const weight = weights[index];
    return sum + (5 - grade) * weight;
  }, 0);

  return lostPoints;
}

export function computeMaximumGrade(lockedGrades, lockedWeights, unlockedWeights) {
  const unlockedGrades = Array(unlockedWeights.length).fill(5);

  const grades = [...lockedGrades, ...unlockedGrades];
  const weights = [...lockedWeights, ...unlockedWeights];

  return computeWeightedAverage(grades, weights);
}
