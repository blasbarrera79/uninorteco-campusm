export function validateGradeType(grade) {
  let gradeContent

  if (typeof grade === "number") {
    gradeContent = grade > 0 ? grade.toFixed(2) : "-"
  } else if (grade === "AP" || grade === "RP") {
    gradeContent = grade
  } else if (grade.length > 0) {
    gradeContent = parseFloat(grade).toFixed(2)
  } else {
    gradeContent = "-"
  }

  return gradeContent
}
