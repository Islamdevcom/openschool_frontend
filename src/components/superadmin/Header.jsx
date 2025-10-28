import React from 'react';
import styles from './HeaderSuperadmin.module.css';

const Header = ({ title, user }) => {
  return (
    <div className={styles.header}>
      <h2 className={styles.pageTitle}>{title}</h2>
      <div className={styles.userInfo}>
        <div className={styles.userAvatar}>{user.avatar}</div>
        <div>
          <div className={styles.userName}>{user.name}</div>
          <div className={styles.userEmail}>{user.email}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;