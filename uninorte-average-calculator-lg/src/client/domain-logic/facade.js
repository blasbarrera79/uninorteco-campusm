const {
  computeFinalGradeOfCourse,
  computeNeededGradeForCourse,
  replaceGradeOfUnLockedComponents,
} = require("./course-algorithms");
const {
  computeFinalGradeOfSemester,
  computeNeededGradeForSemester,
  replaceGradeOfUnLockedCourses,
} = require("./semester-algorithms");
const { computeNewPGA, computeNeededSemesterAverage } = require("./pga");

/*  
A convenient facade to access the the algorithms of the average calculator

Almost all the algorithms don't need any special attribute from the 
course/semester object. So we can put 'id' and 'name' as empty strings and use the 
partial components/semester courses to compute the average.

If in the future, we need to use the course/semester object, we can just create another
facade to handle that.
*/
const calculatorFacade = {
  courseFinalGrade(partialComponents) {
    return computeFinalGradeOfCourse({
      components: partialComponents,
      id: "",
      name: "",
    });
  },

  semesterFinalGrade(semesterCourses) {
    return computeFinalGradeOfSemester({
      courses: semesterCourses,
      name: "",
    });
  },

  pgaFinalGrade(semesterAverage, academicInfo) {
    const newPga = computeNewPGA(
      academicInfo.currentPGA,
      academicInfo.creditsSoFar,
      semesterAverage,
      academicInfo.currentCredits
    );
    return newPga;
  },

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

  semesterHowMuch(semesterCourses, desiredGrade) {
    const neededGrade = computeNeededGradeForSemester(
      { name: "", courses: semesterCourses },
      desiredGrade
    );
    const newCourses = replaceGradeOfUnLockedCourses(
      semesterCourses,
      neededGrade
    );
    return {
      neededGrade,
      newCourses,
    };
  },

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

module.exports = {
  calculatorFacade,
};
