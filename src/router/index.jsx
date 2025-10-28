import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/landing/LandingPage";
import AuthPage from "../pages/auth/LoginPage";
import TeacherApp from "../pages/teacher/TeacherApp";
import StudentApp from "../pages/student/StudentApp";
import SchoolAdminApp from "./pages/schooladmin/SchoolAdminApp";
import SuperAdminApp from "./pages/superadmin/SuperAdminApp";
import '../styles/index.css';
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<LoginPage />} />
      <Route path="/teacher" element={<TeacherApp />} />
      <Route path="/student" element={<StudentApp />} />
      <Route path="schooladmin" element={<SchoolAdminApp />} />
      <Route path="superadmin" element={<SuperAdminApp/>} />
    </Routes>
  );
}
