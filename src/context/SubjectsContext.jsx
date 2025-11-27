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
  // Список предметов с классами
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem('schoolSubjects');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: 'Математика',
        grade: 7,
        teachers: [
          { id: 1, name: 'Иванова А.П.', email: 'ivanova@school.ru' }
        ],
        books: []
      },
      {
        id: 2,
        name: 'Математика',
        grade: 8,
        teachers: [
          { id: 1, name: 'Иванова А.П.', email: 'ivanova@school.ru' },
          { id: 2, name: 'Петров С.И.', email: 'petrov@school.ru' }
        ],
        books: ['Алгебра 8 класс.pdf']
      },
      {
        id: 3,
        name: 'Русский язык',
        grade: 7,
        teachers: [
          { id: 3, name: 'Сидорова М.В.', email: 'sidorova@school.ru' }
        ],
        books: []
      },
      {
        id: 4,
        name: 'Физика',
        grade: 8,
        teachers: [
          { id: 4, name: 'Кузнецов И.А.', email: 'kuznetsov@school.ru' }
        ],
        books: ['Физика 8 класс.pdf']
      },
    ];
  });

  // Список всех учителей школы (в будущем с API)
  const [schoolTeachers, setSchoolTeachers] = useState(() => {
    const saved = localStorage.getItem('schoolTeachers');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Иванова А.П.', email: 'ivanova@school.ru', avatar: '👩‍🏫' },
      { id: 2, name: 'Петров С.И.', email: 'petrov@school.ru', avatar: '👨‍🏫' },
      { id: 3, name: 'Сидорова М.В.', email: 'sidorova@school.ru', avatar: '👩‍🏫' },
      { id: 4, name: 'Кузнецов И.А.', email: 'kuznetsov@school.ru', avatar: '👨‍🏫' },
      { id: 5, name: 'Морозова Е.В.', email: 'morozova@school.ru', avatar: '👩‍🏫' },
      { id: 6, name: 'Николаев П.П.', email: 'nikolaev@school.ru', avatar: '👨‍🏫' },
      { id: 7, name: 'Козлова А.С.', email: 'kozlova@school.ru', avatar: '👩‍🏫' },
    ];
  });

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

  const value = {
    subjects,
    schoolTeachers,
    addSubject,
    updateSubject,
    deleteSubject,
    getTeacherSubjects,
    getTeacherDisciplines,
    setSchoolTeachers
  };

  return (
    <SubjectsContext.Provider value={value}>
      {children}
    </SubjectsContext.Provider>
  );
};
