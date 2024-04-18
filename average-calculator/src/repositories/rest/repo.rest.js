const { RepositoryError, ErrorCode } = require("../../common/errors");
const {
  AEResponseToSimplifiedAcademicInfo,
  AEResponseToSemesterCourses,
  PGResponseToPartialComponents,
} = require("./adapters/basic");
const { calculatorFacade } = require("../../domain-logic/facade");
const { EnrollmentAPI } = require("./enrollment-api");
const {
  getSemesterCourseCharacteristics,
  wasCourseEvaluated,
} = require("../../domain-logic/course-utils");
const { getSemesterName } = require("../../common/utils");


class RestCalculatorRepository {
  constructor(enrollmentAPI) {
    this.enrollmentAPI = enrollmentAPI;
    this.period = undefined;
  }

  async addGradeRelatedInfoToSemesterCourses(semesterCourses, listOfPartialComponents) {
    return semesterCourses.map((sc, index) => {
      const pcs = listOfPartialComponents[index];
      const wasEvaluated = wasCourseEvaluated(pcs);
      const characteristics = getSemesterCourseCharacteristics(sc, pcs);
      const currentGrade = calculatorFacade.courseFinalGrade(pcs);

      return {
        ...sc,
        wasEvaluated,
        isLocked: wasEvaluated,
        grade: currentGrade,
        characteristics,
      };
    });
  }

  async getPartialComponentsOfAllNrc(nrc) {
    const listOfPartialComponents = [];

    for (const n of nrc) {
      try {
        const partialGradeResponse = await this.enrollmentAPI.getPartialGradeResponseOfNrc(n);
        const partialComponent = PGResponseToPartialComponents(partialGradeResponse);
        listOfPartialComponents.push(partialComponent);
      } catch (error) {
        listOfPartialComponents.push([]);
      }
    }

    return listOfPartialComponents;
  }

  async getCurrentAcademicSemester() {
    const academicEnrollment = await this.enrollmentAPI.getAcademicEnrollment();
    const semesterCourses = AEResponseToSemesterCourses(academicEnrollment);
    const nrcs = semesterCourses.map((sc) => sc.id);
    const listOfPartialComponents = await this.getPartialComponentsOfAllNrc(nrcs);
    const semesterCoursesWithGradeInfo = await this.addGradeRelatedInfoToSemesterCourses(
      semesterCourses,
      listOfPartialComponents
    );

    const semesterName = getSemesterName(this.period);

    return {
      name: semesterName,
      courses: semesterCoursesWithGradeInfo,
    };
  }

  async getCourse(courseIdentifier) {
    const academicEnrollment = await this.enrollmentAPI.getAcademicEnrollment();
    const semesterCourses = AEResponseToSemesterCourses(academicEnrollment);
    const semesterCourse = semesterCourses.find((sc) => sc.id === courseIdentifier);

    if (!semesterCourse) {
      throw new RepositoryError("El curso no fue encontrado", ErrorCode.NOT_FOUND);
    }
    const courseName = semesterCourse.name;

    const partialGradeResponse = await this.enrollmentAPI.getPartialGradeResponseOfNrc(
      courseIdentifier
    );
    const partialComponents = PGResponseToPartialComponents(partialGradeResponse);

    if (partialComponents.length === 0) {
      throw new RepositoryError(
        "No se pudo obtener las notas parciales del curso",
        ErrorCode.NOT_FOUND,
        { nrc: courseIdentifier }
      );
    }

    return {
      id: courseIdentifier,
      name: courseName,
      components: partialComponents,
    };
  }

  async getAcademicInfo() {
    const academicEnrollment = await this.enrollmentAPI.getAcademicEnrollment();
    const simplifiedAcademicInfo = AEResponseToSimplifiedAcademicInfo(academicEnrollment);

    const academicSemester = await this.getCurrentAcademicSemester();
    const currentSemesterAverage = calculatorFacade.semesterFinalGrade(
      academicSemester.courses
    );

    return {
      ...simplifiedAcademicInfo,
      currentSemesterAverage,
    };
  }

  setUserName(username) {
    this.enrollmentAPI.setUserName(username);
  }

  setPeriod(period) {
    this.period = period;
    this.enrollmentAPI.setPeriod(period);
  }
}

module.exports = { RestCalculatorRepository };
