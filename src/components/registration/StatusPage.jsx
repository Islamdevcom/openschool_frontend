import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StatusPage.module.css';

const StatusPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          <svg 
            className={styles.checkIcon} 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" fill="#B799FF"/>
            <path 
              d="M8 12l2 2 4-4" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        <h1 className={styles.title}>
          Ваша заявка отправлена
        </h1>
        
        <p className={styles.subtitle}>
          Ожидайте одобрения
        </p>
        
        <div className={styles.description}>
          <p>Мы рассмотрим вашу заявку в ближайшее время и свяжемся с вами для подтверждения.</p>
        </div>
        
        <button className={styles.button} onClick={() => navigate('/')}>
          Вернуться на главную
        </button>
      </div>
    </div>
  );
};

export default StatusPage;
