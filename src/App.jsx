import { Routes, Route } from "react-router-dom";
import React from "react";

import TeacherApp from "./pages/teacher/TeacherApp";
import StudentApp from "./pages/student/StudentApp";
import SchoolAdminApp from "./pages/schooladmin/SchoolAdminApp";
import SuperAdminApp from "./pages/superadmin/SuperAdminApp";

import LoginPage from "./pages/auth/LoginPage";
import SchoolAdminLoginPage from "./pages/auth/SchoolAdminLoginPage";
import SuperAdminLoginPage from "./pages/auth/SuperAdminLoginPage";

import PrivateRoute from "./utils/PrivateRoute";

import RegisterPage from './pages/registration/RegisterPage';
import EnterSchoolCode from './components/registration/EnterSchoolCode';
import StatusPage from './components/registration/StatusPage';

function App() {
  return (
    <Routes>
      {/* Обычный вход (ученик/преподаватель) */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Вход для школьного админа */}
      <Route path="/schooladmin/login" element={<SchoolAdminLoginPage />} />
      {/* Вход для супер-админа */}
      <Route path="/superadmin/login" element={<SuperAdminLoginPage />} />

      {/* Регистрация через код школы */}
      <Route path="/enter-code" element={<EnterSchoolCode />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/registration-status" element={<StatusPage />} />

      {/* Кабинеты по ролям, защищённые PrivateRoute */}
      <Route
        path="/teacher"
        element={
          <PrivateRoute role="teacher">
            <TeacherApp />
          </PrivateRoute>
        }
      />
      <Route
        path="/student"
        element={
          <PrivateRoute role="student">
            <StudentApp />
          </PrivateRoute>
        }
      />
      <Route
        path="/schooladmin"
        element={
          <PrivateRoute role="schooladmin">
            <SchoolAdminApp />
          </PrivateRoute>
        }
      />
      <Route
        path="/superadmin"
        element={
          <PrivateRoute role="superadmin">
            <SuperAdminApp />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
