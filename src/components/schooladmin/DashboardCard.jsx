import React from 'react';
import styles from './DashboardCard.module.css';

const DashboardCard = ({ 
  title, 
  icon, 
  iconClass, 
  stats, 
  actions, 
  onClick, 
  onActionClick 
}) => {
  
  const handleActionClick = (e, action) => {
    e.stopPropagation();
    onActionClick(action);
  };

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.cardHeader}>
        <div className={`${styles.cardIcon} ${styles[iconClass]}`}>{icon}</div>
        <div className={styles.cardTitle}>{title}</div>
      </div>
      
      <div className={styles.cardStats}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.stat}>
            <div className={styles.statNumber}>{stat.number}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
      
      <div className={styles.cardActions}>
        {actions.map((action, index) => (
          <div 
            key={index} 
            className={styles.actionBtn}
            onClick={(e) => handleActionClick(e, action)}
          >
            {action}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCard;