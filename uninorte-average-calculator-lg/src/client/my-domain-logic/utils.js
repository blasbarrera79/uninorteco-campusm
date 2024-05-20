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
    newValue = "0"
  }
  if (/^-?\d*(\.\d{0,2})?$/.test(newValue) && newValue >= 0 && newValue <= 5) {
    if (newValue.endsWith(".00")) {
      newValue = newValue.replace(".00", "")
    }
    return parseFloat(newValue)
  }
  return null // Indica que la validación falló
}
