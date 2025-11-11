import React from 'react';
import styles from './QuickQuestions.module.css';

const QuickQuestions = ({ onQuestionClick }) => {
  const questions = [
    'Как дела у моего ребенка в школе?',
    'Какие оценки получил на этой неделе?',
    'Есть ли замечания от учителей?',
    'Что задали на дом?',
    'Когда родительское собрание?',
    'Нужна ли помощь с учебой?'
  ];

  const shortQuestions = [
    'Как дела в школе?',
    'Оценки за неделю',
    'Есть замечания?',
    'Домашнее задание',
    'Родительское собрание',
    'Нужна помощь?'
  ];

  return (
    <div className={styles.quickQuestionsBottom}>
      <h4 className={styles.title}>💬 Быстрые вопросы:</h4>
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