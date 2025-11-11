import React from 'react';
import styles from './ProfileModal.module.css';

const ProfileModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>
            👤 Мой профиль
          </h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.profileSection}>
          <h3>📧 Информация о родителе</h3>
          <div className={styles.profileInfo}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>ФИО</span>
              <span className={styles.infoValue}>Иванов Иван Иванович</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Email</span>
              <span className={styles.infoValue}>ivanov@example.com</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Телефон</span>
              <span className={styles.infoValue}>+7 (777) 123-45-67</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Дата регистрации</span>
              <span className={styles.infoValue}>15 августа 2025</span>
            </div>
          </div>
        </div>

        <div className={styles.profileSection}>
          <h3>👨‍👩‍👧‍👦 Мои дети</h3>
          <div className={styles.childrenList}>
            {children.map((child, index) => (
              <div key={index} className={styles.childItem}>
                <div className={styles.childItemAvatar}>{child.avatar}</div>
                <div className={styles.childItemInfo}>
                  <div className={styles.childItemName}>{child.name}</div>
                  <div className={styles.childItemDetails}>
                    <span>{child.grade}</span>
                    <span>•</span>
                    <span>Средний балл: {child.avgGrade}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            className={styles.addChildBtn}
            onClick={() => alert('Функция добавления ребенка будет доступна после интеграции с базой данных. Администратор школы должен связать вас с учеником через email.')}
          >
            ➕ Привязать ребенка
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;