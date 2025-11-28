import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  getTeacherApplications,
  approveTeacherApplication,
  rejectTeacherApplication
} from '../../api/teacherApplicationsService';
import styles from './TeacherApplicationsModal.module.css';

/**
 * Модал для отображения заявок преподавателей, поступивших через код школы
 */
const TeacherApplicationsModal = ({ onClose, onApprove, onReject }) => {
  const { token } = useAuth();
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('🔄 Загрузка заявок преподавателей...');
      const result = await getTeacherApplications(token);

      if (result.success) {
        console.log('✅ Заявки загружены:', result.data);
        setApplications(result.data || []);
      } else {
        console.error('❌ Не удалось загрузить заявки:', result.error);
        setError(result.error || 'Не удалось загрузить заявки');
      }

      setIsLoading(false);
    } catch (err) {
      console.error('❌ Ошибка загрузки заявок:', err);
      setError('Не удалось загрузить заявки');
      setIsLoading(false);
    }
  };

  const handleApprove = async (applicationId) => {
    try {
      console.log('✅ Одобрение заявки:', applicationId);

      const result = await approveTeacherApplication(token, applicationId);

      if (result.success) {
        // Удаляем заявку из списка
        setApplications(prev => prev.filter(app => app.id !== applicationId));

        if (onApprove) {
          onApprove(applicationId);
        }
      } else {
        alert(`Не удалось одобрить заявку: ${result.error}`);
      }
    } catch (err) {
      console.error('❌ Ошибка одобрения заявки:', err);
      alert('Не удалось одобрить заявку');
    }
  };

  const handleReject = async (applicationId) => {
    try {
      console.log('❌ Отклонение заявки:', applicationId);

      const result = await rejectTeacherApplication(token, applicationId);

      if (result.success) {
        // Удаляем заявку из списка
        setApplications(prev => prev.filter(app => app.id !== applicationId));

        if (onReject) {
          onReject(applicationId);
        }
      } else {
        alert(`Не удалось отклонить заявку: ${result.error}`);
      }
    } catch (err) {
      console.error('❌ Ошибка отклонения заявки:', err);
      alert('Не удалось отклонить заявку');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 24) {
      return diffHours === 0 ? 'только что' : `${diffHours} ч. назад`;
    } else if (diffDays < 7) {
      return `${diffDays} дн. назад`;
    } else {
      return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>📋 Заявки преподавателей</h2>
          <button className={styles.closeButton} onClick={onClose}>✕</button>
        </div>

        <div className={styles.modalBody}>
          {isLoading && (
            <div className={styles.loadingState}>
              <div className={styles.spinner}></div>
              <p>Загрузка заявок...</p>
            </div>
          )}

          {error && (
            <div className={styles.errorState}>
              <span>⚠️</span>
              <p>{error}</p>
              <button onClick={loadApplications}>🔄 Повторить</button>
            </div>
          )}

          {!isLoading && !error && applications.length === 0 && (
            <div className={styles.emptyState}>
              <span>📭</span>
              <p>Нет новых заявок</p>
              <small>Заявки от преподавателей появятся здесь</small>
            </div>
          )}

          {!isLoading && !error && applications.length > 0 && (
            <div className={styles.applicationsList}>
              {applications.map(app => (
                <div key={app.id} className={styles.applicationCard}>
                  <div className={styles.applicationInfo}>
                    <div className={styles.applicationAvatar}>
                      {app.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className={styles.applicationDetails}>
                      <h3>{app.fullName}</h3>
                      <p className={styles.email}>{app.email}</p>
                      <p className={styles.time}>
                        <span>🕐</span> {formatDate(app.appliedAt)}
                      </p>
                    </div>
                  </div>
                  <div className={styles.applicationActions}>
                    <button
                      className={styles.approveButton}
                      onClick={() => handleApprove(app.id)}
                      title="Одобрить заявку"
                    >
                      ✓ Одобрить
                    </button>
                    <button
                      className={styles.rejectButton}
                      onClick={() => handleReject(app.id)}
                      title="Отклонить заявку"
                    >
                      ✕ Отклонить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.modalFooter}>
          <p className={styles.footerNote}>
            💡 Заявки поступают от преподавателей, которые ввели код вашей школы
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeacherApplicationsModal;
