import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import {
  getSchoolDisciplines,
  getSchoolTeachers,
  createDiscipline,
  assignDisciplineToTeacher,
  removeDisciplineFromTeacher,
  getMyDisciplines,
  getAvailableSubjects
} from '../api/disciplinesService';

const SubjectsContext = createContext();

export const useSubjects = () => {
  const context = useContext(SubjectsContext);
  if (!context) {
    throw new Error('useSubjects must be used within SubjectsProvider');
  }
  return context;
};

export const SubjectsProvider = ({ children }) => {
  const { token, role } = useAuth();

  // Для админа: все дисциплины школы
  const [disciplines, setDisciplines] = useState([]);

  // Для учителя: назначенные дисциплины
  const [teacherDisciplines, setTeacherDisciplines] = useState([]);

  // Список всех учителей школы (для админа)
  const [schoolTeachers, setSchoolTeachers] = useState([]);

  // Список доступных предметов для создания (для админа)
  const [availableSubjects, setAvailableSubjects] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Загрузить все дисциплины школы (для админа)
  const loadDisciplines = useCallback(async () => {
    if (!token || role !== 'admin') return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await getSchoolDisciplines(token);
      if (response.success) {
        setDisciplines(response.data);
        console.log('✅ Загружены дисциплины школы:', response.data);
      }
    } catch (err) {
      setError(err.message);
      console.error('❌ Ошибка загрузки дисциплин:', err);
    } finally {
      setIsLoading(false);
    }
  }, [token, role]);

  // Загрузить учителей школы (для админа)
  const loadTeachers = useCallback(async () => {
    if (!token || role !== 'admin') return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await getSchoolTeachers(token);
      if (response.success) {
        setSchoolTeachers(response.data);
        console.log('✅ Загружены учителя школы:', response.data);
      }
    } catch (err) {
      setError(err.message);
      console.error('❌ Ошибка загрузки учителей:', err);
    } finally {
      setIsLoading(false);
    }
  }, [token, role]);

  // Загрузить доступные предметы (для админа)
  const loadAvailableSubjects = useCallback(async () => {
    if (!token || role !== 'admin') return;

    try {
      const response = await getAvailableSubjects(token);
      if (response.success) {
        setAvailableSubjects(response.data);
        console.log('✅ Загружены доступные предметы:', response.data);
      }
    } catch (err) {
      console.error('❌ Ошибка загрузки доступных предметов:', err);
    }
  }, [token, role]);

  // Загрузить мои дисциплины (для учителя)
  const loadMyDisciplines = useCallback(async () => {
    if (!token || role !== 'teacher') return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await getMyDisciplines(token);
      if (response.success) {
        setTeacherDisciplines(response.data);
        console.log('✅ Загружены мои дисциплины:', response.data);
      }
    } catch (err) {
      setError(err.message);
      console.error('❌ Ошибка загрузки моих дисциплин:', err);
    } finally {
      setIsLoading(false);
    }
  }, [token, role]);

  // Создать новую дисциплину (для админа)
  const addDiscipline = async (subject, grade) => {
    if (!token || role !== 'admin') {
      throw new Error('Только администратор может создавать дисциплины');
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await createDiscipline(token, { subject, grade });
      if (response.success) {
        console.log('✅ Дисциплина создана:', response.data);
        await loadDisciplines(); // Перезагрузить список
        return response.data;
      }
    } catch (err) {
      setError(err.message);
      console.error('❌ Ошибка создания дисциплины:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Назначить дисциплину учителю (для админа)
  const assignDiscipline = async (teacherId, disciplineId) => {
    if (!token || role !== 'admin') {
      throw new Error('Только администратор может назначать дисциплины');
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await assignDisciplineToTeacher(token, teacherId, disciplineId);
      if (response.success) {
        console.log('✅ Дисциплина назначена:', response.data);
        await loadDisciplines(); // Перезагрузить список
        return response.data;
      }
    } catch (err) {
      setError(err.message);
      console.error('❌ Ошибка назначения дисциплины:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Удалить назначение дисциплины (для админа)
  const removeDiscipline = async (teacherId, disciplineId) => {
    if (!token || role !== 'admin') {
      throw new Error('Только администратор может удалять назначения');
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await removeDisciplineFromTeacher(token, teacherId, disciplineId);
      if (response.success) {
        console.log('✅ Назначение удалено:', response.data);
        await loadDisciplines(); // Перезагрузить список
        return response.data;
      }
    } catch (err) {
      setError(err.message);
      console.error('❌ Ошибка удаления назначения:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Автоматическая загрузка при авторизации
  useEffect(() => {
    if (token && role === 'admin') {
      loadDisciplines();
      loadTeachers();
      loadAvailableSubjects();
    } else if (token && role === 'teacher') {
      loadMyDisciplines();
    }
  }, [token, role, loadDisciplines, loadTeachers, loadAvailableSubjects, loadMyDisciplines]);

  const value = {
    // Данные
    disciplines,
    teacherDisciplines,
    schoolTeachers,
    availableSubjects,
    isLoading,
    error,

    // Методы для админа
    loadDisciplines,
    loadTeachers,
    loadAvailableSubjects,
    addDiscipline,
    assignDiscipline,
    removeDiscipline,

    // Методы для учителя
    loadMyDisciplines,

    // Обратная совместимость
    setSchoolTeachers
  };

  return (
    <SubjectsContext.Provider value={value}>
      {children}
    </SubjectsContext.Provider>
  );
};
