import React, { createContext, useContext, useState, useEffect } from 'react';

const SubjectsContext = createContext();

export const useSubjects = () => {
  const context = useContext(SubjectsContext);
  if (!context) {
    throw new Error('useSubjects must be used within SubjectsProvider');
  }
  return context;
};

export const SubjectsProvider = ({ children }) => {
  // Список предметов с классами (загружается с API)
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem('schoolSubjects');
    return saved ? JSON.parse(saved) : [];
  });

  // Список всех учителей школы (загружается с API)
  const [schoolTeachers, setSchoolTeachers] = useState(() => {
    const saved = localStorage.getItem('schoolTeachers');
    return saved ? JSON.parse(saved) : [];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Сохранение в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('schoolSubjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('schoolTeachers', JSON.stringify(schoolTeachers));
  }, [schoolTeachers]);

  // Добавить предмет
  const addSubject = (subject) => {
    const newSubject = {
      ...subject,
      id: Date.now(),
    };
    setSubjects([...subjects, newSubject]);
    return newSubject;
  };

  // Обновить предмет
  const updateSubject = (id, updatedData) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, ...updatedData } : s));
  };

  // Удалить предмет
  const deleteSubject = (id) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  // Получить предметы учителя по email
  const getTeacherSubjects = (teacherEmail) => {
    return subjects.filter(subject =>
      subject.teachers.some(t => t.email === teacherEmail)
    );
  };

  // Получить предметы для DisciplineSelector (с displayName)
  const getTeacherDisciplines = (teacherEmail) => {
    return subjects
      .filter(subject => subject.teachers.some(t => t.email === teacherEmail))
      .map(subject => ({
        id: `${subject.name.toLowerCase()}-${subject.grade}`,
        subject: subject.name,
        grade: subject.grade,
        displayName: `${subject.name} - ${subject.grade} класс`,
        subjectId: subject.id
      }));
  };

  // Загрузить предметы с API
  const loadSubjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Заменить на реальный API запрос
      // const response = await fetch('/api/subjects');
      // const data = await response.json();
      // setSubjects(data);
      console.log('📚 loadSubjects: готово к подключению API');
    } catch (err) {
      setError(err.message);
      console.error('❌ Ошибка загрузки предметов:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Загрузить учителей школы с API
  const loadTeachers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Заменить на реальный API запрос
      // const response = await fetch('/api/teachers');
      // const data = await response.json();
      // setSchoolTeachers(data);
      console.log('👥 loadTeachers: готово к подключению API');
    } catch (err) {
      setError(err.message);
      console.error('❌ Ошибка загрузки учителей:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    subjects,
    schoolTeachers,
    isLoading,
    error,
    addSubject,
    updateSubject,
    deleteSubject,
    getTeacherSubjects,
    getTeacherDisciplines,
    setSchoolTeachers,
    loadSubjects,
    loadTeachers
  };

  return (
    <SubjectsContext.Provider value={value}>
      {children}
    </SubjectsContext.Provider>
  );
};
