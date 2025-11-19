import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.css';
import ChildSelector from './ChildSelector';

const Header = ({ children, currentChild, onChildSelect, onProfileClick }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>🧠</div>
          {t('parent.header.logo')}
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
            👤 {t('parent.header.profile')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;