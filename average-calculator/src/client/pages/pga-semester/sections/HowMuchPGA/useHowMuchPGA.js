import { useEffect, useState } from "react";
import { InvalidInputError } from "../../../../../common/errors";
import { calculatorFacade } from "../../../../../domain-logic/facade";
import { useErrorSnackbar } from "../../../../pages/current-semester/hooks/useErrorSnackbar";

export function useHowMuchPGA({ academicInfo }) {
  const [semesterAverage, setSemesterAverage] = useState(0);
  const [desiredPGA, setDesiredPGA] = useState(academicInfo.currentPGA);

  const { errorSnackbarOptions, onCloseSnackbar, onError } = useErrorSnackbar();

  const onGradeChange = (grade) => {
    setDesiredPGA(grade);
  };

  const onNeededSemesterAverage = () => {
    try {
      const neededSemesterAverage = calculatorFacade.pgaHowMuch(
        academicInfo,
        desiredPGA
      );
      setSemesterAverage(neededSemesterAverage);
    } catch (error) {
      if (error instanceof InvalidInputError) {
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
