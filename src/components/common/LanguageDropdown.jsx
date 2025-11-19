import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageDropdown.module.css';

const LanguageDropdown = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className={styles.languageDropdown}>
      <select
        className={styles.languageSelect}
        value={i18n.language}
        onChange={handleLanguageChange}
        aria-label="Select language"
      >
        <option value="kk">Қаз</option>
        <option value="ru">Рус</option>
        <option value="en">Eng</option>
      </select>
    </div>
  );
};

export default LanguageDropdown;
