import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import ru from './locales/ru/translation.json';
import en from './locales/en/translation.json';
import kk from './locales/kk/translation.json';

i18n
  .use(LanguageDetector) // Автоматическое определение языка
  .use(initReactI18next) // Интеграция с React
  .init({
    resources: {
      ru: { translation: ru },
      en: { translation: en },
      kk: { translation: kk },
    },
    fallbackLng: 'ru', // Язык по умолчанию
    debug: false,
    interpolation: {
      escapeValue: false, // React уже защищает от XSS
    },
    detection: {
      // Порядок определения языка
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'], // Сохранять выбор в localStorage
    },
  });

export default i18n;
