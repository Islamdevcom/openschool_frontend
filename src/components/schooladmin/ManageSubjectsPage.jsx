import React, { useState } from 'react';
import { useSubjects } from '../../context/SubjectsContext';
import CreateDisciplineModal from './CreateDisciplineModal';
import AssignTeacherModal from './AssignTeacherModal';
import Notification from './Notification';
import styles from './ManageSubjectsPage.module.css';

const ManageSubjectsPage = () => {
  const { disciplines, removeDiscipline, isLoading } = useSubjects();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedDiscipline, setSelectedDiscipline] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const handleAssignTeacher = (discipline) => {
    setSelectedDiscipline(discipline);
    setIsAssignModalOpen(true);
  };

  const handleRemoveTeacher = async (discipline, teacherId) => {
    if (!window.confirm(`Удалить назначение учителя?`)) {
      return;
    }

    try {
      await removeDiscipline(teacherId, discipline.id);
      showNotification('Назначение успешно удалено');
    } catch (err) {
      showNotification(err.message || 'Ошибка при удалении назначения', 'error');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>📚 Управление предметами</h1>
        <button
          className={styles.createButton}
          onClick={() => setIsCreateModalOpen(true)}
        >
          ➕ Создать предмет
        </button>
      </div>

      {isLoading && (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Загрузка...</p>
        </div>
      )}

      {!isLoading && disciplines.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📖</div>
          <h3>Нет предметов</h3>
          <p>Создайте первый предмет для начала работы</p>
          <button
            className={styles.createButton}
            onClick={() => setIsCreateModalOpen(true)}
          >
            ➕ Создать предмет
          </button>
        </div>
      )}

      <div className={styles.disciplinesList}>
        {disciplines.map((discipline) => (
          <div key={discipline.id} className={styles.disciplineCard}>
            <div className={styles.disciplineHeader}>
              <div className={styles.disciplineIcon}>📚</div>
              <div className={styles.disciplineInfo}>
                <h3 className={styles.disciplineName}>
                  {discipline.displayName}
                </h3>
                <p className={styles.disciplineMeta}>
                  {discipline.subject} • {discipline.grade} класс
                </p>
              </div>
            </div>

            <div className={styles.teachersSection}>
              <div className={styles.teachersHeader}>
                <span className={styles.teachersLabel}>
                  Учителя ({discipline.assigned_teachers?.length || 0})
                </span>
                <button
                  className={styles.addTeacherButton}
                  onClick={() => handleAssignTeacher(discipline)}
                  title="Назначить учителя"
                >
                  ➕ Назначить
                </button>
              </div>

              {discipline.assigned_teachers && discipline.assigned_teachers.length > 0 ? (
                <div className={styles.teachersList}>
                  {discipline.assigned_teachers.map((teacher) => (
                    <div key={teacher.teacher_id} className={styles.teacherItem}>
                      <span className={styles.teacherName}>
                        👨‍🏫 {teacher.teacher_name}
                      </span>
                      <button
                        className={styles.removeButton}
                        onClick={() => handleRemoveTeacher(discipline, teacher.teacher_id)}
                        title="Удалить назначение"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.noTeachers}>Учителя не назначены</p>
              )}
            </div>

            <div className={styles.disciplineFooter}>
              <span className={styles.createdDate}>
                Создано: {new Date(discipline.created_at).toLocaleDateString('ru-RU')}
              </span>
            </div>
          </div>
        ))}
      </div>

      <CreateDisciplineModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => showNotification('Предмет успешно создан')}
      />

      <AssignTeacherModal
        isOpen={isAssignModalOpen}
        onClose={() => {
          setIsAssignModalOpen(false);
          setSelectedDiscipline(null);
        }}
        discipline={selectedDiscipline}
        onSuccess={() => showNotification('Учитель успешно назначен')}
      />

      <Notification
        show={notification.show}
        message={notification.message}
        type={notification.type}
      />
    </div>
  );
};

export default ManageSubjectsPage;
