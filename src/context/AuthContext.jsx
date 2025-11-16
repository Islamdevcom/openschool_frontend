import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [schoolId, setSchoolId] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [parentChildren, setParentChildren] = useState([]); // Для родителей
  const [energy, setEnergy] = useState(10); // Система энергии (только для teacher и student)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedSchoolId = localStorage.getItem("school_id");
    const storedChildren = localStorage.getItem("parent_children");
    const storedEnergy = localStorage.getItem("user_energy");

    if (storedToken && storedRole) {
      setToken(storedToken);
      setRole(storedRole);
      setSchoolId(storedSchoolId);
      setIsAuthenticated(true);

      if (storedChildren && storedRole === 'parent') {
        setParentChildren(JSON.parse(storedChildren));
      }

      // Загрузить энергию для teacher и student
      if (storedEnergy && (storedRole === 'teacher' || storedRole === 'student')) {
        setEnergy(parseInt(storedEnergy, 10));
      } else if (storedRole === 'teacher' || storedRole === 'student') {
        setEnergy(10); // Начальная энергия
        localStorage.setItem("user_energy", "10");
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

    // Инициализировать энергию для teacher и student
    if (data.role === 'teacher' || data.role === 'student') {
      const initialEnergy = data.energy !== undefined ? data.energy : 10;
      setEnergy(initialEnergy);
      localStorage.setItem("user_energy", initialEnergy.toString());
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

    // Для teacher и student
    if (data.role === 'teacher' || data.role === 'student') {
      const initialEnergy = data.energy !== undefined ? data.energy : 10;
      setEnergy(initialEnergy);
      localStorage.setItem("user_energy", initialEnergy.toString());
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("school_id");
    localStorage.removeItem("parent_children");
    localStorage.removeItem("user_energy");
    setToken(null);
    setRole(null);
    setSchoolId(null);
    setUserInfo({});
    setParentChildren([]);
    setEnergy(10);
    setIsAuthenticated(false);
  };

  // Уменьшить энергию (при использовании ИИ)
  const decreaseEnergy = () => {
    if (role !== 'teacher' && role !== 'student') return;

    setEnergy(prev => {
      const newEnergy = Math.max(0, prev - 1);
      localStorage.setItem("user_energy", newEnergy.toString());
      return newEnergy;
    });
  };

  // Восстановить энергию (при покупке Pro)
  const resetEnergy = (amount = 10) => {
    if (role !== 'teacher' && role !== 'student') return;

    setEnergy(amount);
    localStorage.setItem("user_energy", amount.toString());
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
      energy, // Энергия для teacher и student
      user, // <-- вот это использует PrivateRoute
      login,
      logout,
      setAuthData,
      decreaseEnergy, // Уменьшить энергию
      resetEnergy // Восстановить энергию
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
