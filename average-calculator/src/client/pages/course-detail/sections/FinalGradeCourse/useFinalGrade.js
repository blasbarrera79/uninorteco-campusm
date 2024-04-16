import { useEffect, useState } from "react";
import { usePartialComponents } from "../../hooks/usePartialComponents";
import { calculatorFacade } from  "../../../../../domain-logic/facade";

/**
 * Hook for calculating the final grade of a course
 * @param {object} params - Parameters for the useFinalGradeCourse hook
 * @param {Course} params.course - The course for which the final grade is being calculated
 * @returns {object} - An object containing the final course grade, components, onGradeChange function, and evaluated percentage
 */
export function useFinalGradeCourse({ course }) {
  const [finalCourseGrade, setFinalCourseGrade] = useState(0);

  // Retrieve the partial components and their associated functionality
  const { components, onGradeChange, evaluatedPercentage } = usePartialComponents({
    course,
  });

  useEffect(() => {

    // Calculate the final grade of the course using the calculatorFacade
    const finalGrade = calculatorFacade.courseFinalGrade(components);

    // Update the state with the final grade
    setFinalCourseGrade(finalGrade);
  }, [components]);

  return {
    finalCourseGrade,
    onGradeChange,
    components,
    evaluatedPercentage,
  };
}
