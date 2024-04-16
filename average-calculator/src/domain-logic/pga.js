import { InvalidInputError } from "../common/errors";

/**
 * Computes the new PGA (Promedio General Acumulado).
 * @param {number} currentPGA - The current PGA.
 * @param {number} creditsSoFar - Credits approved so far without considering the current semester.
 * @param {number} currentSemesterAverage - Current semester average.
 * @param {number} currentCredits - Total credits of the current semester.
 * @returns {number} The new PGA.
 */
export function computeNewPGA(
  currentPGA,
  creditsSoFar,
  currentSemesterAverage,
  currentCredits
) {
  const newPGA =
    (currentPGA * creditsSoFar + currentCredits * currentSemesterAverage) /
    (creditsSoFar + currentCredits);

  // floor to 2 decimal places
  return Math.floor(newPGA * 100) / 100;
}

/**
 * Computes the needed semester average to achieve the desired PGA.
 * @param {number} currentPGA - The current PGA.
 * @param {number} creditsSoFar - Credits approved so far without considering the current semester.
 * @param {number} desiredPGA - The desired PGA.
 * @param {number} currentCredits - Total credits of the current semester.
 * @returns {number} The needed semester average.
 * @throws {InvalidInputError} If the needed semester average is out of the valid range (0-5).
 */
export function computeNeededSemesterAverage(
  currentPGA,
  creditsSoFar,
  desiredPGA,
  currentCredits
) {
  const neededSemesterAverage =
    (desiredPGA * (creditsSoFar + currentCredits) - currentPGA * creditsSoFar) /
    currentCredits;

  // ceil to 2 decimal places
  const roundedNeededSemesterAverage = Math.ceil(neededSemesterAverage * 100) / 100;

  if (roundedNeededSemesterAverage > 5) {
    throw new InvalidInputError(
      "Lo sentimos, para obtener la nota deseada necesitas un promedio semestral mayor a 5",
      {
        fieldName: "desiredGrade",
      }
    );
  }

  if (roundedNeededSemesterAverage < 0) {
    throw new InvalidInputError(
      "Lo sentimos, para obtener la nota deseada necesitas un promedio semestral menor a 0",
      {
        fieldName: "desiredGrade",
      }
    );
  }

  return roundedNeededSemesterAverage;
}
