import React, { useState } from 'react';
import Modal from './Modal';
import { useSubjects } from '../../context/SubjectsContext';
import styles from './SubjectsModal.module.css';

const SubjectsModal = ({ isOpen, onClose }) => {
  const { subjects, schoolTeachers, addSubject, updateSubject } = useSubjects();

  const [currentView, setCurrentView] = useState('list'); // 'list' or 'detail'
  const [selectedSubject, setSelectedSubject] = useState(null);

  const [subjectName, setSubjectName] = useState('');
  const [subjectGrade, setSubjectGrade] = useState('7');
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [uploadedBooks, setUploadedBooks] = useState([]);
  const [teacherSearch, setTeacherSearch] = useState('');

  const handleAddSubject = () => {
    setSelectedSubject(null);
    setSubjectName('');
    setSubjectGrade('7');
    setSelectedTeachers([]);
    setUploadedBooks([]);
    setTeacherSearch('');
    setCurrentView('detail');
  };

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
    setSubjectName(subject.name);
    setSubjectGrade(subject.grade.toString());
    setSelectedTeachers(subject.teachers);
    setUploadedBooks(subject.books);
    setTeacherSearch('');
    setCurrentView('detail');
  };

  const handleBack = () => {
    setCurrentView('list');
    setSelectedSubject(null);
    setTeacherSearch('');
  };

  const handleToggleTeacher = (teacher) => {
    const isSelected = selectedTeachers.some(t => t.id === teacher.id);
    if (isSelected) {
      setSelectedTeachers(selectedTeachers.filter(t => t.id !== teacher.id));
    } else {
      setSelectedTeachers([...selectedTeachers, teacher]);
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

    if (!subjectGrade) {
      alert('Выберите класс');
      return;
    }

    const subjectData = {
      name: subjectName.trim(),
      grade: parseInt(subjectGrade),
      teachers: selectedTeachers,
      books: uploadedBooks
    };

    if (selectedSubject) {
      updateSubject(selectedSubject.id, subjectData);
    } else {
      addSubject(subjectData);
    }

    setCurrentView('list');
    setSelectedSubject(null);
  };

  // Фильтр учителей по поиску
  const filteredTeachers = schoolTeachers.filter(teacher =>
    teacher.name.toLowerCase().includes(teacherSearch.toLowerCase())
  );

  // Группировка предметов по имени и классу
  const groupedSubjects = subjects.reduce((acc, subject) => {
    const key = `${subject.name}-${subject.grade}`;
    if (!acc[key]) {
      acc[key] = subject;
    }
    return acc;
  }, {});

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
            {Object.values(groupedSubjects).map(subject => (
              <div
                key={subject.id}
                className={styles.subjectCard}
                onClick={() => handleSelectSubject(subject)}
              >
                <div className={styles.subjectHeader}>
                  <div className={styles.subjectIcon}>📖</div>
                  <div className={styles.subjectInfo}>
                    <h3 className={styles.subjectName}>{subject.name} - {subject.grade} класс</h3>
                    <p className={styles.subjectMeta}>
                      {subject.teachers.length} {subject.teachers.length === 1 ? 'преподаватель' : 'преподавателя'}
                      {subject.books.length > 0 && ` • ${subject.books.length} ${subject.books.length === 1 ? 'книга' : 'книг'}`}
                    </p>
                  </div>
                </div>
                {subject.teachers.length > 0 && (
                  <div className={styles.subjectTeachers}>
                    {subject.teachers.map((teacher) => (
                      <span key={teacher.id} className={styles.teacherTag}>
                        {teacher.avatar} {teacher.name}
                      </span>
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
              placeholder="Например: Физика"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Класс</label>
            <select
              className={styles.formSelect}
              value={subjectGrade}
              onChange={(e) => setSubjectGrade(e.target.value)}
            >
              {[5, 6, 7, 8, 9, 10, 11].map(grade => (
                <option key={grade} value={grade}>{grade} класс</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Преподаватели ({schoolTeachers.length} учителей в школе)
            </label>

            {/* Поиск по ФИО */}
            <input
              type="text"
              className={styles.searchInput}
              placeholder="🔍 Поиск по ФИО..."
              value={teacherSearch}
              onChange={(e) => setTeacherSearch(e.target.value)}
            />

            <div className={styles.teachersGrid}>
              {filteredTeachers.length === 0 ? (
                <p className={styles.noResults}>Учителя не найдены</p>
              ) : (
                filteredTeachers.map(teacher => {
                  const isSelected = selectedTeachers.some(t => t.id === teacher.id);
                  return (
                    <label key={teacher.id} className={styles.teacherCheckbox}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleTeacher(teacher)}
                      />
                      <span className={styles.teacherAvatar}>{teacher.avatar}</span>
                      <span>{teacher.name}</span>
                    </label>
                  );
                })
              )}
            </div>

            {selectedTeachers.length > 0 && (
              <div className={styles.selectedTeachersCount}>
                Выбрано: {selectedTeachers.length}
              </div>
            )}
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
