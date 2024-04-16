import { computeFinalGradeOfCourse, computeNeededGradeForCourse, replaceGradeOfUnLockedComponents } from "./course-algorithms";
import { computeFinalGradeOfSemester, computeNeededGradeForSemester, replaceGradeOfUnLockedCourses } from "./semester-algorithms";
import { computeNewPGA, computeNeededSemesterAverage } from "./pga";

/**
 * Represents a simplified academic information.
 * @typedef {Object} SimplifiedAcademicInfo
 * @property {number} creditsSoFar - Credits approved so far without considering the current semester.
 * @property {number} currentCredits - Total credits of the current semester.
 * @property {number} currentPGA - Current 'promedio acumulado general' without considering the current semester.
 */

/**
 * A facade to access the algorithms of the average calculator.
 */
export const calculatorFacade = {
  /**
   * Computes the final grade of a course.
   * @param {PartialComponent[]} partialComponents - The partial components of the course.
   * @returns {number} The final grade of the course.
   */
  courseFinalGrade(partialComponents) {
    return computeFinalGradeOfCourse({
      components: partialComponents,
      id: "",
      name: "",
    });
  },

  /**
   * Computes the final grade of a semester.
   * @param {SemesterCourse[]} semesterCourses - The semester courses.
   * @returns {number} The final grade of the semester.
   */
  semesterFinalGrade(semesterCourses) {
    return computeFinalGradeOfSemester({
      courses: semesterCourses,
      name: "",
    });
  },

  /**
   * Computes the PGA final grade.
   * @param {number} semesterAverage - The semester average.
   * @param {SimplifiedAcademicInfo} academicInfo - The simplified academic information.
   * @returns {number} The PGA final grade.
   */
  pgaFinalGrade(semesterAverage, academicInfo) {
    const newPga = computeNewPGA(
      academicInfo.currentPGA,
      academicInfo.creditsSoFar,
      semesterAverage,
      academicInfo.currentCredits
    );
    return newPga;
  },

  /**
   * Computes how much is needed for a course.
   * @param {PartialComponent[]} partialComponents - The partial components of the course.
   * @param {number} desiredGrade - The desired grade.
   * @returns {Object} An object containing the needed grade and new components.
   */
  courseHowMuch(partialComponents, desiredGrade) {
    const neededGrade = computeNeededGradeForCourse(
      { id: "", name: "", components: partialComponents },
      desiredGrade
    );
    const newComponents = replaceGradeOfUnLockedComponents(
      partialComponents,
      neededGrade
    );
    return {
      neededGrade,
      newComponents,
    };
  },

  /**
   * Computes how much is needed for a semester.
   * @param {SemesterCourse[]} semesterCourses - The semester courses.
   * @param {number} desiredGrade - The desired grade.
   * @returns {Object} An object containing the needed grade and new courses.
   */
  semesterHowMuch(semesterCourses, desiredGrade) {
    const neededGrade = computeNeededGradeForSemester(
      { name: "", courses: semesterCourses },
      desiredGrade
    );
    const newCourses = replaceGradeOfUnLockedCourses(semesterCourses, neededGrade);
    return {
      neededGrade,
      newCourses,
    };
  },

  /**
   * Computes how much is needed for PGA.
   * @param {SimplifiedAcademicInfo} academicInfo - The simplified academic information.
   * @param {number} desiredPGA - The desired PGA.
   * @returns {number} The needed semester average.
   */
  pgaHowMuch(academicInfo, desiredPGA) {
    const neededSemesterAverage = computeNeededSemesterAverage(
      academicInfo.currentPGA,
      academicInfo.creditsSoFar,
      desiredPGA,
      academicInfo.currentCredits
    );
    return neededSemesterAverage;
  },
};
