function wasCourseEvaluated(components) {
  return components.every((component) => component.grade > 0);
}

function getSemesterCourseCharacteristics(semesterCourse, components) {
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

function containOnlyValidGrades(course) {
  return !course.characteristics.has("contain-invalid-grade");
}

function getCourseParcelacionMessage(course) {
  const { characteristics } = course;

  if (
    characteristics.has("contain-invalid-grade") && characteristics.has("one-component") && characteristics.has("zero-credits")
  ) {
    return "Parcelación irrelevante";
  }

  if (characteristics.has("contain-invalid-grade")) {
    return "Parcelación corrupta";
  }

  return "Ver parcelación";
}

function sortSemesterCoursesByCredits(courses) {
  return courses.sort((a, b) => {
    if (a.credits === b.credits) {
      return 0;
    }
    return a.credits > b.credits ? -1 : 1;
  });
}

module.exports = {
  wasCourseEvaluated,
  getSemesterCourseCharacteristics,
  containOnlyValidGrades,
  getCourseParcelacionMessage,
  sortSemesterCoursesByCredits,
};
