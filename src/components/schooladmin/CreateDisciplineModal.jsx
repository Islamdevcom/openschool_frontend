import React, { useState } from 'react';
import Modal from './Modal';
import { useSubjects } from '../../context/SubjectsContext';
import styles from './SubjectsModal.module.css';

const CreateDisciplineModal = ({ isOpen, onClose, onSuccess }) => {
  const { availableSubjects, addDiscipline, isLoading } = useSubjects();

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

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Предмет *</label>
          <select
            className={styles.formSelect}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            disabled={isLoading}
          >
            <option value="">Выберите предмет</option>
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
