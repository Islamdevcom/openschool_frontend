import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const loginPaths = {
  student: '/login',
  teacher: '/login',
  school_admin: '/schooladmin/login',
  superadmin: '/superadmin/login',
};

const PrivateRoute = ({ role, children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Если не авторизован
  if (!user || !user.token) {
    return <Navigate to={loginPaths[role] || '/login'} state={{ from: location }} replace />;
  }

  // Если роль не совпадает (например, студент пытается попасть в кабинет администратора)
  if (role && user.role !== role) {
    return <Navigate to={loginPaths[user.role] || '/login'} replace />;
  }

  // Всё ок, отображаем содержимое
  return children;
};

export default PrivateRoute;
