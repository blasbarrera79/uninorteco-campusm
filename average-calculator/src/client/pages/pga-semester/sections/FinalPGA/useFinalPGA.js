import { useEffect, useState } from "react";
import { calculatorFacade } from  "../../../../../domain-logic/facade";

const myLogger = AppLogger.getAppLogger().createContextLogger("final-pga-hook");

export function useFinalPGA({ academicInfo }) {
  const [semesterAverage, setSemesterAverage] = useState(academicInfo.currentSemesterAverage);
  const [finalPGA, setFinalPGA] = useState(0);

  const onGradeChange = (grade) => {
    setSemesterAverage(grade);
  };

  useEffect(() => {
    const newPga = calculatorFacade.pgaFinalGrade(semesterAverage, academicInfo);
    setFinalPGA(newPga);
  }, [academicInfo, semesterAverage]);

  return {
    semesterAverage,
    finalPGA,
    onGradeChange,
  };
}
