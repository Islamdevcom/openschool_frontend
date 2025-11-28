import React, { useState } from 'react';
import Modal from './Modal';
import { useSubjects } from '../../context/SubjectsContext';
import styles from './SubjectsModal.module.css';

const AssignTeacherModal = ({ isOpen, onClose, discipline, onSuccess }) => {
  const { schoolTeachers, assignDiscipline, loadTeachers, isLoading } = useSubjects();

  const [selectedTeacherId, setSelectedTeacherId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!selectedTeacherId) {
      setError('Выберите учителя');
      return;
    }

    if (!discipline) {
      setError('Дисциплина не указана');
      return;
    }

    try {
      await assignDiscipline(parseInt(selectedTeacherId), discipline.id);
      setSelectedTeacherId('');
      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || 'Ошибка при назначении учителя');
    }
  };

  if (!isOpen || !discipline) return null;

  // Отладка
  console.log('👥 schoolTeachers:', schoolTeachers);
  console.log('📊 Количество учителей:', schoolTeachers.length);

  // Фильтруем учителей, которые уже назначены на эту дисциплину
  const assignedTeacherIds = discipline.assigned_teachers?.map(t => t.teacher_id) || [];
  const availableTeachers = schoolTeachers.filter(t => !assignedTeacherIds.includes(t.id));

  console.log('✅ availableTeachers:', availableTeachers);

  return (
    <Modal
      title={`Назначить учителя`}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className={styles.detailContainer}>
        <div style={{
          padding: '12px',
          marginBottom: '20px',
          backgroundColor: '#f0f4ff',
          borderRadius: '8px',
          fontSize: '14px'
        }}>
          <strong>Предмет:</strong> {discipline.displayName}
        </div>

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

        {schoolTeachers.length === 0 && !isLoading && (
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
            <span>⚠️ Список учителей не загружен. Проверьте подключение к API.</span>
            <button
              type="button"
              onClick={() => loadTeachers()}
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
            Выберите учителя * ({availableTeachers.length} доступно)
          </label>
          <select
            className={styles.formSelect}
            value={selectedTeacherId}
            onChange={(e) => setSelectedTeacherId(e.target.value)}
            required
            disabled={isLoading || schoolTeachers.length === 0}
          >
            <option value="">
              {isLoading
                ? 'Загрузка...'
                : schoolTeachers.length === 0
                  ? 'Нет учителей в базе'
                  : availableTeachers.length === 0
                    ? 'Все учителя назначены'
                    : '-- Выберите учителя --'
              }
            </option>
            {availableTeachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name} ({teacher.disciplines_count} предметов)
              </option>
            ))}
          </select>

          {availableTeachers.length === 0 && schoolTeachers.length > 0 && (
            <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
              Все учителя ({schoolTeachers.length}) уже назначены на эту дисциплину
            </p>
          )}
        </div>

        {discipline.assigned_teachers && discipline.assigned_teachers.length > 0 && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px'
          }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>
              Уже назначены:
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {discipline.assigned_teachers.map((teacher) => (
                <span
                  key={teacher.teacher_id}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#e8f0fe',
                    borderRadius: '16px',
                    fontSize: '13px',
                    color: '#1967d2'
                  }}
                >
                  {teacher.teacher_name}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className={styles.formActions}>
          <button
            type="submit"
            className={styles.saveButton}
            disabled={isLoading || availableTeachers.length === 0}
          >
            {isLoading ? 'Назначение...' : '✓ Назначить'}
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

export default AssignTeacherModal;
