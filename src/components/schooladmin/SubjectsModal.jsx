import React, { useState } from 'react';
import Modal from './Modal';
import styles from './SubjectsModal.module.css';

const SubjectsModal = ({ isOpen, onClose }) => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'detail'
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Математика', teachers: ['Иванова А.П.', 'Петров С.И.'], books: ['Алгебра 8 класс.pdf'] },
    { id: 2, name: 'Русский язык', teachers: ['Сидорова М.В.'], books: [] },
    { id: 3, name: 'Физика', teachers: ['Кузнецов И.А.'], books: ['Физика 8 класс.pdf'] },
  ]);

  const [subjectName, setSubjectName] = useState('');
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [uploadedBooks, setUploadedBooks] = useState([]);

  // Список всех преподавателей (в будущем загружать с API)
  const availableTeachers = [
    { id: 1, name: 'Иванова А.П.' },
    { id: 2, name: 'Петров С.И.' },
    { id: 3, name: 'Сидорова М.В.' },
    { id: 4, name: 'Кузнецов И.А.' },
    { id: 5, name: 'Морозова Е.В.' },
  ];

  const handleAddSubject = () => {
    setSelectedSubject(null);
    setSubjectName('');
    setSelectedTeachers([]);
    setUploadedBooks([]);
    setCurrentView('detail');
  };

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
    setSubjectName(subject.name);
    setSelectedTeachers(subject.teachers);
    setUploadedBooks(subject.books);
    setCurrentView('detail');
  };

  const handleBack = () => {
    setCurrentView('list');
    setSelectedSubject(null);
  };

  const handleToggleTeacher = (teacherName) => {
    if (selectedTeachers.includes(teacherName)) {
      setSelectedTeachers(selectedTeachers.filter(t => t !== teacherName));
    } else {
      setSelectedTeachers([...selectedTeachers, teacherName]);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileNames = files.map(f => f.name);
    setUploadedBooks([...uploadedBooks, ...fileNames]);
  };

  const handleRemoveBook = (bookName) => {
    setUploadedBooks(uploadedBooks.filter(b => b !== bookName));
  };

  const handleSave = () => {
    if (!subjectName.trim()) {
      alert('Введите название предмета');
      return;
    }

    if (selectedSubject) {
      // Редактирование существующего предмета
      setSubjects(subjects.map(s =>
        s.id === selectedSubject.id
          ? { ...s, name: subjectName, teachers: selectedTeachers, books: uploadedBooks }
          : s
      ));
    } else {
      // Добавление нового предмета
      const newSubject = {
        id: subjects.length + 1,
        name: subjectName,
        teachers: selectedTeachers,
        books: uploadedBooks
      };
      setSubjects([...subjects, newSubject]);
    }

    setCurrentView('list');
    setSelectedSubject(null);
  };

  if (!isOpen) return null;

  return (
    <Modal
      title={currentView === 'list' ? '📚 Управление предметами' : (selectedSubject ? '✏️ Редактирование предмета' : '➕ Новый предмет')}
      onClose={onClose}
    >
      {currentView === 'list' ? (
        <div className={styles.subjectsContainer}>
          <button className={styles.addButton} onClick={handleAddSubject}>
            ➕ Добавить предмет
          </button>

          <div className={styles.subjectsList}>
            {subjects.map(subject => (
              <div
                key={subject.id}
                className={styles.subjectCard}
                onClick={() => handleSelectSubject(subject)}
              >
                <div className={styles.subjectHeader}>
                  <div className={styles.subjectIcon}>📖</div>
                  <div className={styles.subjectInfo}>
                    <h3 className={styles.subjectName}>{subject.name}</h3>
                    <p className={styles.subjectMeta}>
                      {subject.teachers.length} {subject.teachers.length === 1 ? 'преподаватель' : 'преподавателя'}
                      {subject.books.length > 0 && ` • ${subject.books.length} ${subject.books.length === 1 ? 'книга' : 'книг'}`}
                    </p>
                  </div>
                </div>
                {subject.teachers.length > 0 && (
                  <div className={styles.subjectTeachers}>
                    {subject.teachers.map((teacher, idx) => (
                      <span key={idx} className={styles.teacherTag}>{teacher}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.detailContainer}>
          <button className={styles.backButton} onClick={handleBack}>
            ← Назад к списку
          </button>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Название предмета</label>
            <input
              type="text"
              className={styles.formInput}
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="Например: Физика 8 класс"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Преподаватели (можно выбрать несколько)</label>
            <div className={styles.teachersGrid}>
              {availableTeachers.map(teacher => (
                <label key={teacher.id} className={styles.teacherCheckbox}>
                  <input
                    type="checkbox"
                    checked={selectedTeachers.includes(teacher.name)}
                    onChange={() => handleToggleTeacher(teacher.name)}
                  />
                  <span>{teacher.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Книги и материалы</label>
            <div className={styles.uploadZone}>
              <input
                type="file"
                id="bookUpload"
                className={styles.fileInput}
                multiple
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                onChange={handleFileUpload}
              />
              <label htmlFor="bookUpload" className={styles.uploadLabel}>
                📁 Загрузить файлы
              </label>
            </div>

            {uploadedBooks.length > 0 && (
              <div className={styles.booksList}>
                {uploadedBooks.map((book, idx) => (
                  <div key={idx} className={styles.bookItem}>
                    <span className={styles.bookIcon}>📄</span>
                    <span className={styles.bookName}>{book}</span>
                    <button
                      className={styles.removeButton}
                      onClick={() => handleRemoveBook(book)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.formActions}>
            <button className={styles.saveButton} onClick={handleSave}>
              💾 Сохранить
            </button>
            <button className={styles.cancelButton} onClick={handleBack}>
              Отмена
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default SubjectsModal;
