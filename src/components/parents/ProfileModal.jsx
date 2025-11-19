import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ProfileModal.module.css';

const ProfileModal = ({ isOpen, onClose, children }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>
            👤 {t('parent.profileModal.title')}
          </h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.profileSection}>
          <h3>📧 {t('parent.profileModal.parentInfo')}</h3>
          <div className={styles.profileInfo}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>{t('parent.profileModal.fullName')}</span>
              <span className={styles.infoValue}>Иванов Иван Иванович</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>{t('parent.profileModal.email')}</span>
              <span className={styles.infoValue}>ivanov@example.com</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>{t('parent.profileModal.phone')}</span>
              <span className={styles.infoValue}>+7 (777) 123-45-67</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>{t('parent.profileModal.registrationDate')}</span>
              <span className={styles.infoValue}>15 августа 2025</span>
            </div>
          </div>
        </div>

        <div className={styles.profileSection}>
          <h3>👨‍👩‍👧‍👦 {t('parent.profileModal.myChildren')}</h3>
          <div className={styles.childrenList}>
            {children.map((child, index) => (
              <div key={index} className={styles.childItem}>
                <div className={styles.childItemAvatar}>{child.avatar}</div>
                <div className={styles.childItemInfo}>
                  <div className={styles.childItemName}>{child.name}</div>
                  <div className={styles.childItemDetails}>
                    <span>{child.grade}</span>
                    <span>•</span>
                    <span>{t('parent.profileModal.avgGrade')}: {child.avgGrade}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            className={styles.addChildBtn}
            onClick={() => alert(t('parent.profileModal.addChildMessage'))}
          >
            ➕ {t('parent.profileModal.addChild')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;