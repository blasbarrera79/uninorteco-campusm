/**
 *
 * Partial grades functions
 */

export function calculateCurrentGradeAverage(subject) {
  if (
    subject.length === 1 &&
    (subject[0].NOTAA === "AP" || subject[0].NOTAA === "RP")
  ) {
    return subject[0].NOTAA
  }

  const totalWeightedSum = subject.reduce(
    (acc, partial) => acc + partial.NOTAA * (partial.SHRGCOM_WEIGHT / 100),
    0
  )
  return totalWeightedSum
}

export function calculateNeededGradesWithWeights(partial, desiredGrade) {
  const partialLocked = partial.filter((item) => item.isLocked)
  const totalWeightBlocked = partialLocked.reduce(
    (acc, item) => acc + item.SHRGCOM_WEIGHT / 100,
    0
  )

  const currentGrade = calculateCurrentGradeAverage(partialLocked)
  const totalWeightUpdate = 1 - totalWeightBlocked

  const neededGrade = (desiredGrade - currentGrade) / totalWeightUpdate
  if (neededGrade > 5.0) {
    throw new Error("La nota necesaria es mayor a 5.0")
  }

  if (neededGrade < 0.0) {
    throw new Error("La nota necesaria es menor a 0.0")
  }

  const neededGrades = partial.map((item) => {
    if (item.isLocked) {
      return item
    }
    return { ...item, NOTAA: neededGrade.toFixed(2) }
  })

  return neededGrades
}

export function calculateNewGradeAverage(partial) {
  const totalWeightedSum = partial.reduce(
    (acc, item) => acc + item.NOTAA * (item.SHRGCOM_WEIGHT / 100),
    0
  )
  return totalWeightedSum
}

/**
 * end of partial grades functions
 */
