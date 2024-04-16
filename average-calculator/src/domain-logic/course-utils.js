/**
 * Represents a course characteristic.
 * @typedef {"no-components" | "zero-credits" | "contain-invalid-grade" | "one-component"} CourseCharacteristic
 */

/**
 * Represents a base course.
 * @typedef {Object} BaseCourse
 * @property {string} id - The id of the course.
 * @property {string} name - The name of the course.
 * @property {Set<CourseCharacteristic>} characteristics - Course's characteristics.
 */

/**
 * Represents a partial component.
 * @typedef {Object} PartialComponent
 * @property {string} id - The id of the component.
 * @property {number} grade - The grade of the component.
 * @property {string} name - The name of the component.
 * @property {number} weight - The weight of the component.
 * @property {boolean} wasEvaluated - Whether the component has been evaluated.
 * @property {boolean} isLocked - Whether the component is locked.
 */

/**
 * Represents a course.
 * @typedef {Object} Course
 * @property {string} id - The id of the course.
 * @property {string} name - The name of the course.
 * @property {PartialComponent[]} components - The components of the course.
 */

/**
 * Represents a semester course.
 * @typedef {BaseCourse} SemesterCourse
 * @property {number} grade - The current grade of the course.
 * @property {number} credits - Course credits.
 * @property {boolean} wasEvaluated - Whether the course has been evaluated.
 * @property {boolean} isLocked - Whether the course is locked.
 */

/**
 * Represents an academic semester.
 * @typedef {Object} AcademicSemester
 * @property {string} name - The name of the semester.
 * @property {SemesterCourse[]} courses - The courses of the semester.
 */

/**
 * Checks if a course was evaluated.
 * @param {PartialComponent[]} components - The components of the course.
 * @returns {boolean} Whether the course was evaluated.
 */
export function wasCourseEvaluated(components) {
  return components.every((component) => component.grade > 0);
}

/**
 * Gets the characteristics of a semester course.
 * @param {SemesterCourse} semesterCourse - The semester course.
 * @param {PartialComponent[]} components - The components of the course.
 * @returns {Set<CourseCharacteristic>} The characteristics of the semester course.
 */
export function getSemesterCourseCharacteristics(semesterCourse, components) {
  const { credits } = semesterCourse;

  const characteristics = new Set();

  if (credits === 0) {
    characteristics.add("zero-credits");
  }

  if (components.length === 0) {
    characteristics.add("no-components");
  }

  if (components.length === 1) {
    characteristics.add("one-component");
  }

  const invalidGradeExits = components.some(
    (component) => component.grade === -1
  );

  if (invalidGradeExits) {
    characteristics.add("contain-invalid-grade");
  }

  return characteristics;
}

/**
 * Checks if a course contains only valid grades.
 * @param {BaseCourse} course - The course.
 * @returns {boolean} Whether the course contains only valid grades.
 */
export function containOnlyValidGrades(course) {
  return !course.characteristics.has("contain-invalid-grade");
}

/**
 * Gets the parcelacion message of a course.
 * @param {BaseCourse} course - The course.
 * @returns {string} The parcelacion message of the course.
 */
export function getCourseParcelacionMessage(course) {
  const { characteristics } = course;

  if (
    characteristics.has("contain-invalid-grade") &&
    characteristics.has("one-component") &&
    characteristics.has("zero-credits")
  ) {
    return "Parcelación irrelevante";
  }

  if (characteristics.has("contain-invalid-grade")) {
    return "Parcelación corrupta";
  }

  return "Ver parcelación";
}

/**
 * Sorts semester courses by credits in descending order.
 * @param {SemesterCourse[]} courses - The semester courses.
 * @returns {SemesterCourse[]} The sorted semester courses.
 */
export function sortSemesterCoursesByCredits(courses) {
  return courses.sort((a, b) => {
    if (a.credits === b.credits) {
      return 0;
    }
    return a.credits > b.credits ? -1 : 1;
  });
}
