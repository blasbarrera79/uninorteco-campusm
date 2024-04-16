import { useEffect, useState } from "react";
import { AppLogger } from "../../../../core/config/logger";
import { useSemesterCourses } from "../../hooks/useSemesterCourses";
import { calculatorFacade } from "../../../../core/domain-logic/facade";

const myLogger =
  AppLogger.getAppLogger().createContextLogger("final-grade-hook");

export function useFinalGradeSemester({ academicSemester }) {
  const [semesterAverage, setSemesterAverage] = useState(0);
  const { courses, onGradeChange, totalCredits } = useSemesterCourses({
    academicSemester,
  });

  useEffect(() => {
    myLogger.debug("computing final grade of semester");
    const avg = calculatorFacade.semesterFinalGrade(courses);
    myLogger.debug("final grade of semester", { avg });
    setSemesterAverage(avg);
  }, [courses]);

  return {
    courses,
    semesterAverage,
    onGradeChange,
    totalCredits,
  };
}
