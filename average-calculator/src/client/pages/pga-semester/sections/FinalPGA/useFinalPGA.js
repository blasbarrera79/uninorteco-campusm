import { useEffect, useState } from "react";
import { AppLogger } from "../../../../core/config/logger";
import { calculatorFacade } from "../../../../core/domain-logic/facade";

const myLogger = AppLogger.getAppLogger().createContextLogger("final-pga-hook");

export function useFinalPGA({ academicInfo }) {
  const [semesterAverage, setSemesterAverage] = useState(academicInfo.currentSemesterAverage);
  const [finalPGA, setFinalPGA] = useState(0);

  const onGradeChange = (grade) => {
    myLogger.debug("semester average changed", { grade });
    setSemesterAverage(grade);
  };

  useEffect(() => {
    myLogger.debug("computing final pga", {
      currentPGA: academicInfo.currentPGA,
      creditsSoFar: academicInfo.creditsSoFar,
      semesterAverage,
      currentCredits: academicInfo.currentCredits,
    });
    const newPga = calculatorFacade.pgaFinalGrade(semesterAverage, academicInfo);
    myLogger.debug("final pga", { newPga });
    setFinalPGA(newPga);
  }, [academicInfo, semesterAverage]);

  return {
    semesterAverage,
    finalPGA,
    onGradeChange,
  };
}
