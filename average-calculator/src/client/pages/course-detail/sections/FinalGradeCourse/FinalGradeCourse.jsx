import React from "react";
import { useFinalGradeCourse } from "./useFinalGrade";
import { CoursesContainer } from "../../../common/components/CoursesContainer";
import { PartialComponentCard } from "../../components/PartialComponentCard";
import { FinalGradeResultCard } from "../../components/FinalGradeResultCard";

/**
 * Props for the FinalGradeCourse component
 * @typedef {object} FinalGradeCourseProps
 * @property {Course} course - The course for which the final grade is being calculated
 */

/**
 * Component for displaying the final grade of a course
 * @param {FinalGradeCourseProps} props - Props for the FinalGradeCourse component
 * @returns {JSX.Element} - JSX element representing the FinalGradeCourse component
 */
export function FinalGradeCourse({ course }) {
  const { components, finalCourseGrade, evaluatedPercentage, onGradeChange } =
    useFinalGradeCourse({
      course,
    });

  return (
    <>
      <CoursesContainer>
        {components.map((component) => (
          <PartialComponentCard
            key={component.id}
            partialComponent={component}
            onGradeChange={onGradeChange}
          />
        ))}
      </CoursesContainer>
      <CoursesContainer sxProps={{ mt: 16 }}>
        <FinalGradeResultCard
          title="Nota final"
          subtitle={`Porcentaje evaluado: ${evaluatedPercentage}%`}
          result={finalCourseGrade}
          helpMessage="¿Cómo se calcula la nota final?"
        />
      </CoursesContainer>
    </>
  );
}
