import { useEffect, useState } from "react";
// import { calculatorRepository } from "../../../core/repositories/repository-factory";
import { ErrorCode, RepositoryError } from "../../../../common/errors";
import { usePageFatalError } from "../../../hooks/usePageFatalError";


/**
 * Props for the useCourse hook
 * @typedef {object} UseCourseHook
 * @property {string} courseId - The ID of the course to fetch
 */

/**
 * Custom hook for fetching course information
 * @param {UseCourseHook} props - Props for the useCourse hook
 * @returns {object} - Object containing the course information
 * @property {Course | null} course - The course information, or null if not loaded yet
 */
export function useCourse({ courseId }) {
  const [course, setCourse] = useState<Course | null>(null);
  const { setFatalError } = usePageFatalError();

  /**
   * Function to load course information
   */
  const loadCourse = async () => {
    setLoadingStatus(true);
    try {
      // const currentCourse = await calculatorRepository.getCourse(courseId);
      setCourse(currentCourse);
    } catch (error) {
      if (error instanceof RepositoryError) {
        if (error.errorCode === ErrorCode.NOT_FOUND) {
          setFatalError({ error, iconColor: "blue", iconName: "info" });
        } else {
          setFatalError({
            error,
            userMessage: "Hubo un error obteniendo la información de la asignatura",
          });
        }
      }
    } finally {
      setLoadingStatus(false);
    }
  };

  useEffect(() => {
    loadCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    course,
  };
}
