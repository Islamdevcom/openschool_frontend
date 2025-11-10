import React from 'react';
import styles from './HeaderSchooladmin.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.schoolInfo}>
          <h1>🏫 Гимназия №125</h1>
          <p>Код школы: GYM125 • Активных пользователей: 847</p>
        </div>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>ЕН</div>
          <div>
            <div className={styles.userName}>Елена Викторовна Новикова</div>
            <div className={styles.userRole}>Администратор</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;