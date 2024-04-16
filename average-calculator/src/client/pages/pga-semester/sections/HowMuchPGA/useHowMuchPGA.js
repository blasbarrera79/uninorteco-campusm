import { useEffect, useState } from "react";
import { AppLogger } from "../../../../core/config/logger";
import { InvalidInputError } from "../../../../core/common/errors";
import { calculatorFacade } from "../../../../core/domain-logic/facade";
import { useErrorSnackbar } from "../../../../hooks/useErrorSnackbar";

const myLogger = AppLogger.getAppLogger().createContextLogger("how-much-pga-hook");

export function useHowMuchPGA({ academicInfo }) {
  const [semesterAverage, setSemesterAverage] = useState(0);
  const [desiredPGA, setDesiredPGA] = useState(academicInfo.currentPGA);

  const { errorSnackbarOptions, onCloseSnackbar, onError } = useErrorSnackbar();

  const onGradeChange = (grade) => {
    myLogger.debug("desired pga changed", { grade });
    setDesiredPGA(grade);
  };

  const onNeededSemesterAverage = () => {
    try {
      myLogger.debug("computing semester average for desired grade", {
        currentPGA: academicInfo.currentPGA,
        creditsSoFar: academicInfo.creditsSoFar,
        desiredPGA,
        currentCredits: academicInfo.currentCredits,
      });
      const neededSemesterAverage = calculatorFacade.pgaHowMuch(
        academicInfo,
        desiredPGA
      );
      myLogger.debug("semester average for desired pga", { neededSemesterAverage });
      setSemesterAverage(neededSemesterAverage);
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

  useEffect(() => {
    // We need to compute the semester average when the component is mounted,
    // otherwise the user will see a 0 as the semester average which is not correct.
    onNeededSemesterAverage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    semesterAverage,
    desiredPGA,
    onGradeChange,
    onNeededSemesterAverage,
    errorSnackbarOptions,
    onCloseSnackbar,
  };
}
