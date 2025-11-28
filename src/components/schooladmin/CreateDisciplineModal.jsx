import React, { useState } from 'react';
import Modal from './Modal';
import { useSubjects } from '../../context/SubjectsContext';
import styles from './SubjectsModal.module.css';

const CreateDisciplineModal = ({ isOpen, onClose, onSuccess }) => {
  const { availableSubjects, addDiscipline, loadAvailableSubjects, isLoading } = useSubjects();

  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState(7);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!subject.trim()) {
      setError('Выберите предмет');
      return;
    }

    try {
      await addDiscipline(subject, grade);
      setSubject('');
      setGrade(7);
      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || 'Ошибка при создании дисциплины');
    }
  };

  if (!isOpen) return null;

  const subjects = availableSubjects?.subjects || [];

  // Отладка
  console.log('📚 availableSubjects:', availableSubjects);
  console.log('📋 subjects list:', subjects);

  return (
    <Modal title="➕ Создать предмет" onClose={onClose}>
      <form onSubmit={handleSubmit} className={styles.detailContainer}>
        {error && (
          <div style={{
            padding: '10px',
            marginBottom: '15px',
            backgroundColor: '#fee',
            color: '#c33',
            borderRadius: '8px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        {subjects.length === 0 && !isLoading && (
          <div style={{
            padding: '12px',
            marginBottom: '15px',
            backgroundColor: '#fff3cd',
            color: '#856404',
            borderRadius: '8px',
            fontSize: '14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>⚠️ Список предметов не загружен. Проверьте подключение к API.</span>
            <button
              type="button"
              onClick={() => loadAvailableSubjects()}
              style={{
                padding: '6px 12px',
                background: '#ffc107',
                color: '#000',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              🔄 Обновить
            </button>
          </div>
        )}

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Предмет * {subjects.length > 0 && `(${subjects.length} доступно)`}
          </label>
          <select
            className={styles.formSelect}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            disabled={isLoading || subjects.length === 0}
          >
            <option value="">
              {isLoading ? 'Загрузка...' : subjects.length === 0 ? 'Нет доступных предметов' : 'Выберите предмет'}
            </option>
            {subjects.map((subj) => (
              <option key={subj} value={subj}>
                {subj}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Класс *</label>
          <select
            className={styles.formSelect}
            value={grade}
            onChange={(e) => setGrade(parseInt(e.target.value))}
            required
            disabled={isLoading}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((g) => (
              <option key={g} value={g}>
                {g} класс
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formActions}>
          <button
            type="submit"
            className={styles.saveButton}
            disabled={isLoading}
          >
            {isLoading ? 'Создание...' : '💾 Создать'}
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
            disabled={isLoading}
          >
            Отмена
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateDisciplineModal;
