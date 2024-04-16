import { InvalidInputError } from "../common/errors";
import { containOnlyValidGrades } from "./course-utils";
import {
  computeNeededGrade,
  computeWeightedAverage,
  computeWeightedAverageGivenTotalWeight,
  computeMaximumGrade,
} from "./utils";

/**
 * Computes the final grade of a semester.
 * @param {AcademicSemester} semester - The academic semester.
 * @returns {number} The final grade of the semester.
 */
export function computeFinalGradeOfSemester(semester) {
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

/**
 * Computes the needed grade for a semester to achieve the desired grade.
 * @param {AcademicSemester} semester - The academic semester.
 * @param {number} desiredGrade - The desired grade.
 * @returns {number} The needed grade for the semester.
 * @throws {InvalidInputError} If all courses are locked.
 */
export function computeNeededGradeForSemester(semester, desiredGrade) {
  const normalCourses = semester.courses.filter(containOnlyValidGrades);

  // compute average for locked courses
  const lockedComponents = normalCourses.filter((component) => component.isLocked);

  if (lockedComponents.length === normalCourses.length) {
    throw new InvalidInputError(
      "Lo sentimos, debes tener al menos un curso desbloqueado para realizar el cálculo"
    );
  }

  const lockedGrades = lockedComponents.map((component) => component.grade);
  const lockedCredits = lockedComponents.map((component) => component.credits);
  const totalCredits = normalCourses.reduce((a, b) => a + b.credits, 0);

  // this is the current grade
  const currentGrade = computeWeightedAverageGivenTotalWeight(
    lockedGrades,
    lockedCredits,
    totalCredits
  );
  const currentGradeRounded = Math.floor(currentGrade * 100) / 100;

  const unlockedCredits = normalCourses
    .filter((component) => !component.isLocked)
    .map((component) => component.credits);
  const maxPossibleGrade = computeMaximumGrade(
    lockedGrades,
    lockedCredits,
    unlockedCredits
  );
  const roundedMaxPossibleGrade = Math.floor(maxPossibleGrade * 100) / 100;

  // Compute the remaining weight
  const remainingWeightAsCredits =
    totalCredits - lockedCredits.reduce((a, b) => a + b, 0);
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

/**
 * Replaces the grade of unlocked courses with a given grade.
 * @param {SemesterCourse[]} courses - The semester courses.
 * @param {number} grade - The new grade.
 * @returns {SemesterCourse[]} The courses with replaced grades.
 */
export function replaceGradeOfUnLockedCourses(courses, grade) {
  const newCourses = courses.map((course) => {
    if (!course.isLocked) {
      return { ...course, grade };
    }
    return course;
  });
  return newCourses;
}
