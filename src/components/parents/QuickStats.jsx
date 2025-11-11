import React from 'react';
import styles from './QuickStats.module.css';

const QuickStats = ({ child }) => {
  return (
    <div className={styles.quickStats}>
      <h3 className={styles.title}>📊 Быстрая статистика</h3>
      <div className={`${styles.statItem} ${styles.excellent}`}>
        <span>Средний балл</span>
        <strong>{child.avgGrade}</strong>
      </div>
      <div className={`${styles.statItem} ${styles.good}`}>
        <span>Посещаемость</span>
        <strong>{child.attendance}%</strong>
      </div>
      <div className={`${styles.statItem} ${styles.warning}`}>
        <span>Замечания</span>
        <strong>{child.warnings}</strong>
      </div>
      <div className={`${styles.statItem} ${styles.excellent}`}>
        <span>Поведение</span>
        <strong>{child.behavior}/10</strong>
      </div>
    </div>
  );
};

export default QuickStats;