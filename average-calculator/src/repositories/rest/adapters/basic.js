/**
 * Transforms an AECourse into a SemesterCourse without considering
 * grade related attributes
 */
function AECourseToSemesterCourse(aeCourse) {
  return {
    id: aeCourse.SFRSTCR_CRN,
    name: aeCourse.SSBSECT_CRSE_TITLE,
    credits: aeCourse.SFRSTCR_CREDIT_HR,
    isLocked: false,
    wasEvaluated: false,
    grade: 0,
    // in this adapter we consider that there are no characteristics for the course
    characteristics: new Set(),
  };
}

function AEResponseToSemesterCourses(aeResponse) {
  if (aeResponse.resultado.length === 0) {
    console.log("no courses found in academic enrollment response");
  }

  const semesterCourses = aeResponse.resultado.map(AECourseToSemesterCourse);

  return semesterCourses;
}

function PGComponentToPartialComponent(pgComponent) {
  let grade = pgComponent.NOTA;
  const gradeAsStr = pgComponent.NOTAA;

  const wasEvaluated = gradeAsStr !== "---";
  const isLocked = wasEvaluated;

  if (grade < 0 || grade > 5) {
    grade = -1;
  }

  // if grade is not a number, we use -1 as a representation of an invalid grade
  // special case of PA, NA, etc.
  if (gradeAsStr !== "---" && Number.isNaN(Number(gradeAsStr))) {
    grade = -1;
  }

  return {
    id: `${pgComponent.SHRGCOM_SEQ_NO}`,
    name: pgComponent.SHRGCOM_DESCRIPTION,
    weight: pgComponent.SHRGCOM_WEIGHT,
    grade,
    wasEvaluated,
    isLocked,
  };
}

function PGResponseToPartialComponents(pgResponse) {
  if (pgResponse.resultado.length === 0) {
    console.log("no partial components found in partial grades response");
  }

  const partialComponents = pgResponse.resultado.map(
    PGComponentToPartialComponent
  );

  return partialComponents;
}

function getPGAFromAECourse(aeCourse) {
  const { PUNTOS, CREDITOS } = aeCourse;
  return Math.floor((PUNTOS / CREDITOS) * 100) / 100;
}

function AEResponseToSimplifiedAcademicInfo(aeResponse) {
  const { resultado } = aeResponse;
  if (resultado.length === 0) {
    console.log("no courses found in academic enrollment response");
  }
  // at least one course is present
  const aeCourse = resultado[0];

  const { CREDITOS: creditsSoFar } = aeCourse;
  const pga = getPGAFromAECourse(aeCourse);
  const totalCredits = resultado.reduce(
    (acc, acourse) => acc + acourse.SFRSTCR_CREDIT_HR,
    0
  );
  return {
    creditsSoFar,
    currentCredits: totalCredits,
    currentPGA: pga,
  };
}

module.exports = {
  AEResponseToSemesterCourses,
  PGResponseToPartialComponents,
  AEResponseToSimplifiedAcademicInfo,
};
