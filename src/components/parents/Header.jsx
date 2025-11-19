import React from 'react';
import styles from './Header.module.css';
import ChildSelector from './ChildSelector';

const Header = ({ children, currentChild, onChildSelect, onProfileClick }) => {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>🧠</div>
          OpenSchool AI
        </div>
        <div className={styles.headerRight}>
          <div data-child-selector>
            <ChildSelector
              children={children}
              currentChild={currentChild}
              onChildSelect={onChildSelect}
            />
          </div>
          <button className={styles.profileBtn} onClick={onProfileClick} data-profile>
            👤 Профиль
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;