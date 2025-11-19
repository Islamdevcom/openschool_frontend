import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './QuickQuestions.module.css';

const QuickQuestions = ({ onQuestionClick }) => {
  const { t } = useTranslation();

  const questions = [
    t('parent.quickQuestions.questions.status'),
    t('parent.quickQuestions.questions.grades'),
    t('parent.quickQuestions.questions.remarks'),
    t('parent.quickQuestions.questions.homework'),
    t('parent.quickQuestions.questions.meeting'),
    t('parent.quickQuestions.questions.help')
  ];

  const shortQuestions = [
    t('parent.quickQuestions.shortQuestions.status'),
    t('parent.quickQuestions.shortQuestions.grades'),
    t('parent.quickQuestions.shortQuestions.remarks'),
    t('parent.quickQuestions.shortQuestions.homework'),
    t('parent.quickQuestions.shortQuestions.meeting'),
    t('parent.quickQuestions.shortQuestions.help')
  ];

  return (
    <div className={styles.quickQuestionsBottom}>
      <h4 className={styles.title}>💬 {t('parent.quickQuestions.title')}</h4>
      <div className={styles.quickQuestionsGrid}>
        {questions.map((question, index) => (
          <button
            key={index}
            className={styles.quickQuestionChip}
            onClick={() => onQuestionClick(question)}
          >
            {shortQuestions[index]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickQuestions;