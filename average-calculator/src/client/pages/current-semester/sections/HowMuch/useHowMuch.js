import { useEffect, useState } from "react";
import { useSemesterCourses } from "../../hooks/useSemesterCourses";
import { calculatorFacade } from  "../../../../../domain-logic/facade";
import { useErrorSnackbar } from "../../../../pages/current-semester/hooks/useErrorSnackbar";
import { InvalidInputError } from "../../../../../common/errors";

export function useHowMuchSemester({ academicSemester }) {
  const [semesterAverage, setSemesterAverage] = useState(0);
  const { courses, onGradeChange, setCourses } = useSemesterCourses({
    academicSemester,
  });
  const { errorSnackbarOptions, onCloseSnackbar, onError } = useErrorSnackbar();

  const onComputeNeededGrade = () => {
    try {
     const { neededGrade, newCourses } = calculatorFacade.semesterHowMuch(
        courses,
        semesterAverage
      );
      setCourses(newCourses);
    } catch (error) {
      if (error instanceof InvalidInputError) {
        onError(error.userMessage);
      }
    }
  };

  const onFinalGradeChange = (grade) => {
    setSemesterAverage(grade);
  };

  const onLockIconPress = (id) => {
    const newCourses = courses.map((course) => {
      if (course.id === id) {
        return { ...course, isLocked: !course.isLocked };
      }
      return course;
    });
    setCourses(newCourses);
  };

  useEffect(() => {
    const avg = calculatorFacade.semesterFinalGrade(academicSemester.courses);
    setSemesterAverage(avg);
  }, [academicSemester]);

  return {
    courses,
    onLockIconPress,
    onGradeChange,
    semesterAverage,
    onFinalGradeChange,
    onComputeNeededGrade,
    errorSnackbarOptions,
    onCloseSnackbar,
  };
}
