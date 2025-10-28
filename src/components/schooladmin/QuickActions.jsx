import React from 'react';
import styles from './QuickActions.module.css';

const QuickActions = ({ actions }) => {
  return (
    <div className={styles.quickActions}>
      {actions.map((action, index) => (
        <div 
          key={index} 
          className={styles.quickAction} 
          onClick={action.action}
        >
          <div className={styles.quickActionIcon}>{action.icon}</div>
          <div className={styles.quickActionTitle}>{action.title}</div>
          <div className={styles.quickActionDesc}>{action.description}</div>
        </div>
      ))}
    </div>
  );
};

export default QuickActions;