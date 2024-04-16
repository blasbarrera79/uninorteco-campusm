import { useEffect, useState } from "react";
import { useSemesterCourses } from "../../hooks/useSemesterCourses";
import { calculatorFacade } from "../../../../../domain-logic/facade";

export function useFinalGradeSemester({ academicSemester }) {
  const [semesterAverage, setSemesterAverage] = useState(0);
  const { courses, onGradeChange, totalCredits } = useSemesterCourses({
    academicSemester,
  });

  useEffect(() => {
    const avg = calculatorFacade.semesterFinalGrade(courses);
    setSemesterAverage(avg);
  }, [courses]);

  return {
    courses,
    semesterAverage,
    onGradeChange,
    totalCredits,
  };
}
