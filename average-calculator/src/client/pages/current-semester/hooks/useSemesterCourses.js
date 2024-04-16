import { useEffect, useState } from "react";
import { sortSemesterCoursesByCredits } from "../../../../domain-logic/course-utils";

export function useSemesterCourses({ academicSemester }) {
  const [courses, setCourses] = useState([]);

  const onGradeChange = (id, grade) => {
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
