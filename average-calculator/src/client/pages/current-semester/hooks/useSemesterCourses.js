import { useEffect, useState } from "react";
import { AppLogger } from "../../../core/config/logger";
import { sortSemesterCoursesByCredits } from "../../../core/domain-logic/course-utils";

const myLogger = AppLogger.getAppLogger().createContextLogger(
  "semester-courses-hook"
);

export function useSemesterCourses({ academicSemester }) {
  const [courses, setCourses] = useState([]);

  const onGradeChange = (id, grade) => {
    myLogger.debug("grade changed", { id, grade });
    const newCourses = courses.map((course) => {
      if (course.id === id) {
        return { ...course, grade };
      }
      return course;
    });
    setCourses(sortSemesterCoursesByCredits(newCourses));
  };

  const totalCredits = academicSemester.courses.reduce(
    (acc, course) => acc + course.credits,
    0
  );

  useEffect(() => {
    setCourses(sortSemesterCoursesByCredits(academicSemester.courses));
  }, [academicSemester]);

  return {
    courses,
    onGradeChange,
    totalCredits,
    setCourses,
  };
}
