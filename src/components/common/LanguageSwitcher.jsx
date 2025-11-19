import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'ru', label: 'РУС', flag: '🇷🇺' },
    { code: 'kk', label: 'ҚАЗ', flag: '🇰🇿' },
    { code: 'en', label: 'ENG', flag: '🇬🇧' },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={styles.languageSwitcher}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`${styles.langBtn} ${
            i18n.language === lang.code ? styles.active : ''
          }`}
          aria-label={`Switch to ${lang.label}`}
        >
          <span className={styles.flag}>{lang.flag}</span>
          <span className={styles.label}>{lang.label}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
