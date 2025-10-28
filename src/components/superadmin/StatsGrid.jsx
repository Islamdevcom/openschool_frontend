import React from 'react';
import styles from './StatsGrid.module.css';

const StatsGrid = ({ stats }) => {
  return (
    <div className={styles.statsGrid}>
      {stats.map((stat, index) => (
        <div key={index} className={styles.statCard}>
          <div className={styles.statHeader}>
            <div 
              className={styles.statIcon} 
              style={{ background: stat.gradient }}
            >
              {stat.icon}
            </div>
            <div className={styles.statValue}>{stat.value}</div>
          </div>
          <div className={styles.statLabel}>{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;