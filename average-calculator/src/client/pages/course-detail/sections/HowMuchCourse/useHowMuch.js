import { useEffect, useState } from "react";
import { AppLogger } from "../../../../core/config/logger";
import { usePartialComponents } from "../../hooks/usePartialComponents";
import { useErrorSnackbar } from "../../../../hooks/useErrorSnackbar";
import { InvalidInputError } from "../../../../core/common/errors";
import { calculatorFacade } from "../../../../core/domain-logic/facade";

const myLogger = AppLogger.getAppLogger().createContextLogger("how-much-course-hook");

export function useHowMuchCourse({ course }) {
  const [finalCourseGrade, setFinalCourseGrade] = useState(0);
  const { components, onGradeChange, evaluatedPercentage, setComponents } =
    usePartialComponents({
      course,
    });

  const { errorSnackbarOptions, onCloseSnackbar, onError } = useErrorSnackbar();

  const onComputeNeededGrade = () => {
    myLogger.debug("computing needed grade", { finalCourseGrade });
    try {
      const { neededGrade, newComponents } = calculatorFacade.courseHowMuch(
        components,
        finalCourseGrade
      );
      myLogger.debug("needed grade computed", { neededGrade });
      setComponents(newComponents);
    } catch (error) {
      if (error instanceof InvalidInputError) {
        myLogger.debug("error computing needed grade", {
          errorMessage: error.message,
          errorCode: error.errorCode,
        });
        onError(error.userMessage);
      }
    }
  };

  const onLockIconPress = (id) => {
    myLogger.debug("lock icon pressed", { courseId: id });
    const newComponents = components.map((component) => {
      if (component.id === id) {
        return { ...component, isLocked: !component.isLocked };
      }
      return component;
    });
    setComponents(newComponents);
  };

  const onFinalGradeChange = (grade) => {
    myLogger.debug("final grade changed", { grade });
    setFinalCourseGrade(grade);
  };

  useEffect(() => {
    myLogger.debug("computing final grade of course");
    const finalGrade = calculatorFacade.courseFinalGrade(course.components);
    myLogger.debug("final grade of course", { finalGrade });
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
