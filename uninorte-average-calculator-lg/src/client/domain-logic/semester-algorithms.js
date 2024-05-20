const { containOnlyValidGrades } = require("./course-utils");
const {
  computeWeightedAverage,
  computeNeededGrade,
  computeWeightedAverageGivenTotalWeight,
  computeMaximumGrade,
} = require("./utils");

function computeFinalGradeOfSemester(semester) {
  const normalCourses = semester.courses.filter(containOnlyValidGrades);

  const grades = normalCourses.map((course) => course.grade);
  const weights = normalCourses.map((course) => course.credits);

  if (grades.length === 0 && weights.length === 0) {
    return 0;
  }

  const average = computeWeightedAverage(grades, weights);
  // floor to 2 decimal places
  const financeSemesterGrade = Math.floor(average * 100) / 100;
  return financeSemesterGrade;
}

function computeNeededGradeForSemester(semester, desiredGrade) {
  const normalCourses = semester.courses.filter(containOnlyValidGrades);

  // compute average for locked courses
  const lockedComponents = normalCourses.filter((course) => course.isLocked);

  if (lockedComponents.length === normalCourses.length) {
    throw new Error("Todos los cursos están bloqueados");
  }

  const lockedGrades = lockedComponents.map((course) => course.grade);
  const lockedCredits = lockedComponents.map((course) => course.credits);
  const totalCredits = normalCourses.reduce(
    (acc, course) => acc + course.credits,
    0
  );

  // this is the current grade
  const currentGrade = computeWeightedAverageGivenTotalWeight(
    lockedGrades,
    lockedCredits,
    totalCredits
  );
  const currentGradeRounded = Math.floor(currentGrade * 100) / 100;

  const unlockedCredits = normalCourses
    .filter((course) => !course.isLocked)
    .map((course) => course.credits);
  const maxPossibleGrade = computeMaximumGrade(
    lockedGrades,
    lockedCredits,
    unlockedCredits
  );
  const roundedMaxPossibleGrade = Math.floor(maxPossibleGrade * 100) / 100;

  // Compute the remaining weight
  const remainingWeightAsCredits = totalCredits - lockedCredits.reduce((acc, credit) => acc + credit, 0);
  const remainingWeight = remainingWeightAsCredits / totalCredits;

  // compute the needed grade
  const neededGrade = computeNeededGrade(
    desiredGrade,
    currentGrade,
    remainingWeight,
    // offset of 0. Computing the needed grade at semester level does not have
    // the same issue as courses have.
    // Here computing a needed grade greater than 5 means that the grade is unreachable
    0,
    { maxGrade: roundedMaxPossibleGrade, minGrade: currentGradeRounded }
  );

  // remember, we are computing the grade for a course, which has a precision of 1 decimal place
  const roundedNeededGrade = Math.ceil(neededGrade * 10) / 10;
  return roundedNeededGrade;
}

function replaceGradeOfUnLockedCourses(courses, grade) {
  const newCourses = courses.map((course) => {
    if (!course.isLocked) {
      return { ...course, grade };
    }
    return course;
  });
  return newCourses;
}

module.exports = {
  computeFinalGradeOfSemester,
  computeNeededGradeForSemester,
  replaceGradeOfUnLockedCourses,
};
