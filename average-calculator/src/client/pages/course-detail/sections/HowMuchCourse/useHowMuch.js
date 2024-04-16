import { useEffect, useState } from "react";
import { usePartialComponents } from "../../hooks/usePartialComponents";
import { useErrorSnackbar } from "../../../../pages/current-semester/hooks/useErrorSnackbar";
import { InvalidInputError } from "../../../../../common/errors";
import { calculatorFacade } from "../../../../../domain-logic/facade";

export function useHowMuchCourse({ course }) {
  const [finalCourseGrade, setFinalCourseGrade] = useState(0);
  const { components, onGradeChange, evaluatedPercentage, setComponents } =
    usePartialComponents({
      course,
    });

  const { errorSnackbarOptions, onCloseSnackbar, onError } = useErrorSnackbar();

  const onComputeNeededGrade = () => {
    try {
      const { neededGrade, newComponents } = calculatorFacade.courseHowMuch(
        components,
        finalCourseGrade
      );
      setComponents(newComponents);
    } catch (error) {
      if (error instanceof InvalidInputError) {
        onError(error.userMessage);
      }
    }
  };

  const onLockIconPress = (id) => {
    const newComponents = components.map((component) => {
      if (component.id === id) {
        return { ...component, isLocked: !component.isLocked };
      }
      return component;
    });
    setComponents(newComponents);
  };

  const onFinalGradeChange = (grade) => {
    setFinalCourseGrade(grade);
  };

  useEffect(() => {
    const finalGrade = calculatorFacade.courseFinalGrade(course.components);
    setFinalCourseGrade(finalGrade);
  }, [course]);

  return {
    components,
    onGradeChange,
    evaluatedPercentage,
    onComputeNeededGrade,
    onLockIconPress,
    onFinalGradeChange,
    finalCourseGrade,
    errorSnackbarOptions,
    onCloseSnackbar,
  };
}
