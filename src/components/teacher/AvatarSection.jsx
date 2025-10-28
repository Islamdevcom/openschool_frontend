import React from 'react';
import styles from './AvatarSection.module.css';

const AvatarSection = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', label: '🏫 Главная' },
    { id: 'students', label: '🧑‍🎓 Обучающиеся' },
    { id: 'journal', label: '📖 Журнал' }
  ];

  return (
    <div className={styles.tabNavigation}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={() => setActiveTab(tab.id)}
          data-tab={tab.id}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default AvatarSection;