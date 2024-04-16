import { useEffect, useState } from "react";
// import { calculatorRepository } from "../../../core/repositories/repository-factory";
import { RepositoryError } from "../../../../common/errors";
import { usePageFatalError } from "../../../hooks/usePageFatalError";

export function useAcademicSemester() {
  const [academicSemester, setAcademicSemester] = useState(null);
  const { setFatalError } = usePageFatalError();

  const loadCurrentSemester = async () => {
    setLoadingStatus(true);
    try {
      // const currentAcademicSemester = await calculatorRepository.getCurrentAcademicSemester();
      if (currentAcademicSemester.courses.length === 0) {
        setFatalError({
          userMessage:
            "No se pudo acceder a las asignaturas matriculadas. Es posible que no hayas realizado la evaluación docente",
        });
      } else {
        setAcademicSemester(currentAcademicSemester);
      }
    } catch (error) {
      if (error instanceof RepositoryError) {
        setFatalError({
          error,
          userMessage:
            "Hubo un error obteniendo las asignaturas matriculadas. Es posible que no hayas realizado la evaluación docente",
        });
      }
    } finally {
      setLoadingStatus(false);
    }
  };

  useEffect(() => {
    loadCurrentSemester();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    academicSemester,
  };
}
