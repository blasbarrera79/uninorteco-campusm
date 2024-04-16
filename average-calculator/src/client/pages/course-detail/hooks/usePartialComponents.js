import { useEffect, useState } from "react";
import { AppLogger } from "../../../core/config/logger";
import { Course, PartialComponent } from "../../../core/entities/course";

const myLogger = AppLogger.getAppLogger().createContextLogger(
  "partial-components-hook"
);

/**
 * Props for the usePartialComponents hook
 * @typedef {object} UsePartialComponentHook
 * @property {Course} course - The course containing partial components
 */

/**
 * Custom hook for managing partial components of a course
 * @param {UsePartialComponentHook} props - Props for the usePartialComponents hook
 * @returns {object} - Object containing partial component information and functions to manipulate them
 * @property {PartialComponent[]} components - The partial components of the course
 * @property {function} onGradeChange - Function to handle grade changes for a partial component
 * @property {function} setComponents - Function to set the partial components
 * @property {number} evaluatedPercentage - The evaluated percentage of the course based on completed components
 */
export function usePartialComponents({ course }) {
  const [components, setComponents] = useState([]);

  /**
   * Function to handle grade changes for a partial component
   * @param {string} id - The ID of the partial component
   * @param {number} grade - The new grade for the partial component
   */
  const onGradeChange = (id, grade) => {
    myLogger.debug("grade changed", { id, grade });
    const newComponents = components.map((component) => {
      if (component.id === id) {
        return { ...component, grade };
      }
      return component;
    });
    setComponents(newComponents);
  };

  /**
   * The evaluated percentage of the course based on completed components
   * @type {number}
   */
  const evaluatedPercentage = components.reduce(
    (acc, component) => acc + +component.wasEvaluated * component.weight,
    0
  );

  useEffect(() => {
    setComponents(course.components);
  }, [course]);

  return {
    components,
    onGradeChange,
    setComponents,
    evaluatedPercentage,
  };
}
