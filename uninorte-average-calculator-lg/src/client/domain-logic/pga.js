function computeNewPGA(
  currentPGA,
  creditsSoFar,
  currentSemesterAverage,
  currentCredits
) {
  const newPGA = (currentPGA * creditsSoFar + currentCredits * currentSemesterAverage) / (creditsSoFar + currentCredits);

  // floor to 2 decimal places
  return Math.floor(newPGA * 100) / 100;
}

function computeNeededSemesterAverage(
  currentPGA,
  creditsSoFar,
  desiredPGA,
  currentCredits
) {
  const neededSemesterAverage = (desiredPGA * (creditsSoFar + currentCredits) - currentPGA * creditsSoFar) / currentCredits;

  // ceil to 2 decimal places
  const roundedNeededSemesterAverage = Math.ceil(neededSemesterAverage * 100) / 100;

  if (roundedNeededSemesterAverage > 5) {
    throw new Error("The needed semester average is greater than 5");
  }

  if (roundedNeededSemesterAverage < 0) {
    throw new Error("The needed semester average is less than 0");
  }

  return roundedNeededSemesterAverage;
}

module.exports = {
  computeNewPGA,
  computeNeededSemesterAverage,
};
