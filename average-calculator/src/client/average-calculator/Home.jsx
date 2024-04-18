import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CurrentSemesterPage from "../pages/current-semester/CurrentSemesterPage";
import CourseDetailPage from "../pages/course-detail/CourseDetailPage";
import PGASemesterPage from "../pages/pga-semester/PGASemesterPage";

export default function Home(props) {

  return (
    <Router>
      <Routes>
        <Route path="/pga" element={<PGASemesterPage {...props} />} />
        <Route path="/courses/:courseId" element={<CourseDetailPage {...props} />} />
        <Route path="/aek/c/average-calculator" element={<CurrentSemesterPage />} />
      </Routes>
    </Router>
  );
}