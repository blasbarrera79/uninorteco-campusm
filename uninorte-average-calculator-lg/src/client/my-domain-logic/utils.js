// utils.js

export function calculateSemesterAverage(subjects) {
  const totalWeightedSum = subjects.reduce(
    (acc, subject) => acc + subject.NOTAA * subject.CREDITOS,
    0
  )
  const totalCredits = subjects.reduce(
    (acc, subject) => acc + subject.CREDITOS,
    0
  )
  return totalWeightedSum / totalCredits
}

export function calculateNewSemesterAverage(
  currentAverage,
  currentCredits,
  newGrade,
  newCredits
) {
  return (
    (currentAverage * currentCredits + newGrade * newCredits) /
    (currentCredits + newCredits)
  )
}

export function creditsWithGrades(grades) {
  return grades.reduce((acc, materia) => {
    if (materia.isModified) {
      return acc + materia.CREDITOS
    }
    return acc
  }, 0)
}

export function calculateCurrentAverage(subjects) {
  const modifiedSubjects = subjects.filter((subject) => subject.isModified)
  const totalWeightedSum = modifiedSubjects.reduce(
    (acc, subject) => acc + subject.NOTAA * subject.CREDITOS,
    0
  )
  const totalCredits = modifiedSubjects.reduce(
    (acc, subject) => acc + subject.CREDITOS,
    0
  )
  return totalWeightedSum / totalCredits
}

export function validateGrade(newValue) {
  newValue = newValue.trim()
  if (newValue === "") {
    return null
  }
  if (/^-?\d*(\.\d{0,2})?$/.test(newValue) && newValue >= 0 && newValue <= 5) {
    if (newValue.endsWith(".00")) {
      newValue = newValue.replace(".00", "")
    }
    const parsedValue = parseFloat(newValue)
    return Number.isNaN(parsedValue) ? null : parsedValue
  }
  return null
}

export function calculateNeededGrades(subjects, desiredAverage) {
  let totalCredits = 0
  let lockedGradeSum = 0
  let unlockedCredits = 0

  subjects.forEach((subject) => {
    if (subject.isLocked) {
      lockedGradeSum += subject.NOTAA * subject.CREDITOS
    } else {
      unlockedCredits += subject.CREDITOS
    }
    totalCredits += subject.CREDITOS
  })

  const requiredGradeSum = desiredAverage * totalCredits - lockedGradeSum

  if (requiredGradeSum / unlockedCredits > 5.0) {
    throw new Error("La nota necesaria es mayor a 5.0")
  }

  if (requiredGradeSum / unlockedCredits < 0.0) {
    throw new Error("La nota necesaria es menor a 0.0")
  }

  const neededGrades = subjects.map((subject) => {
    if (subject.isLocked) {
      return subject
    }
    const neededGrade = (requiredGradeSum / unlockedCredits).toFixed(2)
    return { ...subject, NOTAA: neededGrade }
  })

  return neededGrades
}
