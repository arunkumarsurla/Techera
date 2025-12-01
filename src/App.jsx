import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/course-details/:id" element={<CourseDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
