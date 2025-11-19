import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './QuickStats.module.css';

const QuickStats = ({ child }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.quickStats}>
      <h3 className={styles.title}>📊 {t('parent.quickStats.title')}</h3>
      <div className={`${styles.statItem} ${styles.excellent}`}>
        <span>{t('parent.quickStats.avgGrade')}</span>
        <strong>{child.avgGrade}</strong>
      </div>
      <div className={`${styles.statItem} ${styles.good}`}>
        <span>{t('parent.quickStats.attendance')}</span>
        <strong>{child.attendance}%</strong>
      </div>
      <div className={`${styles.statItem} ${styles.warning}`}>
        <span>{t('parent.quickStats.warnings')}</span>
        <strong>{child.warnings}</strong>
      </div>
      <div className={`${styles.statItem} ${styles.excellent}`}>
        <span>{t('parent.quickStats.behavior')}</span>
        <strong>{child.behavior}/10</strong>
      </div>
    </div>
  );
};

export default QuickStats;