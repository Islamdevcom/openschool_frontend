import React from 'react';
import styles from './HeaderSchooladmin.module.css';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { userInfo } = useAuth();

  // Функция для получения инициалов из полного имени
  const getInitials = (fullName) => {
    if (!fullName) return 'А';
    const names = fullName.trim().split(' ');
    if (names.length >= 2) {
      return names[0][0] + names[1][0];
    }
    return names[0][0];
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.schoolInfo}>
          <h1>🏫 Гимназия №125</h1>
          <p>Код школы: GYM125 • Активных пользователей: 847</p>
        </div>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>{getInitials(userInfo?.full_name)}</div>
          <div>
            <div className={styles.userName}>{userInfo?.full_name || 'Администратор'}</div>
            <div className={styles.userRole}>Администратор</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;