import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [schoolId, setSchoolId] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [parentChildren, setParentChildren] = useState([]); // Для родителей
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedSchoolId = localStorage.getItem("school_id");
    const storedChildren = localStorage.getItem("parent_children");

    if (storedToken && storedRole) {
      setToken(storedToken);
      setRole(storedRole);
      setSchoolId(storedSchoolId);
      setIsAuthenticated(true);

      if (storedChildren && storedRole === 'parent') {
        setParentChildren(JSON.parse(storedChildren));
      }
    }
  }, []);

  const login = async ({ email, password }) => {
    const response = await fetch("https://openschoolbackend-production.up.railway.app/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Ошибка входа");
    }

    const data = await response.json();

    localStorage.setItem("token", data.access_token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("school_id", data.school_id);

    setToken(data.access_token);
    setRole(data.role);
    setSchoolId(data.school_id);
    setUserInfo({
      email: data.email,
      full_name: data.full_name,
    });
    setIsAuthenticated(true);

    // Для родителей - сохранить список детей
    if (data.role === 'parent' && data.children) {
      localStorage.setItem("parent_children", JSON.stringify(data.children));
      setParentChildren(data.children);
    }

    return { role: data.role, school_id: data.school_id };
  };

  const setAuthData = (data) => {
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("school_id", data.school_id || null);

    setToken(data.access_token);
    setRole(data.role);
    setSchoolId(data.school_id || null);
    setUserInfo({
      email: data.email,
      full_name: data.full_name,
    });
    setIsAuthenticated(true);

    // Для родителей
    if (data.role === 'parent' && data.children) {
      localStorage.setItem("parent_children", JSON.stringify(data.children));
      setParentChildren(data.children);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("school_id");
    localStorage.removeItem("parent_children");
    setToken(null);
    setRole(null);
    setSchoolId(null);
    setUserInfo({});
    setParentChildren([]);
    setIsAuthenticated(false);
  };

  const user = token && role ? { token, role } : null;

  return (
    <AuthContext.Provider value={{
      token,
      role,
      schoolId,
      isAuthenticated,
      userInfo,
      parentChildren, // Список детей для родителей
      user, // <-- вот это использует PrivateRoute
      login,
      logout,
      setAuthData  // ← ДОБАВЛЕНО!
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
