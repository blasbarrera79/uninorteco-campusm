/**
 *
 * Partial grades functions
 */

export function calculateCurrentGradeAverage(subjects) {
  if (
    subjects.length === 1 &&
    (subjects[0].NOTAA === "AP" || subjects[0].NOTAA === "RP") &&
    subjects[0].NOTAA !== "---"
  ) {
    return subjects[0].NOTAA;
  }

  const validSubjects = subjects.filter((subject) => {
    const grade = parseFloat(subject.NOTAA);
    return !Number.isNaN(grade) && Number.isFinite(grade);
  });

  if (validSubjects.length === 0) {
    return 0;
  }

  const totalWeightedSum = validSubjects.reduce(
    (acc, subject) => acc + parseFloat(subject.NOTAA) * (subject.SHRGCOM_WEIGHT / 100),
    0
  );

  const totalWeight = validSubjects.reduce(
    (acc, subject) => acc + (subject.SHRGCOM_WEIGHT / 100),
    0
  );

  const average = totalWeight > 0 ? totalWeightedSum / totalWeight : 0;
  return Math.round(average * 10) / 10;
}

export function calculateNeededGradesWithWeights(partial, desiredGrade) {
  const partialLocked = partial.filter((item) => item.isLocked);
  const totalWeightBlocked = partialLocked.reduce(
    (acc, item) => acc + item.SHRGCOM_WEIGHT / 100,
    0
  );

  const currentGrade = calculateCurrentGradeAverage(partialLocked);
  const totalWeightUpdate = 1 - totalWeightBlocked;

  const neededGrade = (desiredGrade - currentGrade * totalWeightBlocked) / totalWeightUpdate;
  if (neededGrade > 5.0) {
    throw new Error("La nota necesaria es mayor a 5.0");
  }

  if (neededGrade < 0.0) {
    throw new Error("La nota necesaria es menor a 0.0");
  }

  const neededGrades = partial.map((item) => {
    if (item.isLocked) {
      return item;
    }
    return { ...item, NOTAA: neededGrade.toFixed(2) };
  });

  return neededGrades;
}

export function calculateNewGradeAverage(partial) {
  const validSubjects = partial.filter((subject) => {
    const grade = parseFloat(subject.NOTAA);
    return !Number.isNaN(grade) && Number.isFinite(grade);
  });

  const totalWeightedSum = validSubjects.reduce(
    (acc, item) => acc + parseFloat(item.NOTAA) * (item.SHRGCOM_WEIGHT / 100),
    0
  );

  const totalWeight = validSubjects.reduce(
    (acc, item) => acc + (item.SHRGCOM_WEIGHT / 100),
    0
  );

  const average = totalWeight > 0 ? totalWeightedSum / totalWeight : 0;
  return Math.round(average * 10) / 10;
}
