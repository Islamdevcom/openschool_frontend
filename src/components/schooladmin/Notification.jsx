import React, { useState, useEffect } from 'react';
import styles from './Notification.module.css';

const Notification = ({ show, message, type = 'success' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayMessage, setDisplayMessage] = useState('');

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      typeWriter(message);
    } else {
      setIsVisible(false);
      setDisplayMessage('');
    }
  }, [show, message]);

  const typeWriter = (text) => {
    setDisplayMessage('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayMessage(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 30);
  };

  if (!isVisible) return null;

  return (
    <div className={`${styles.notification} ${styles[`notification${type.charAt(0).toUpperCase() + type.slice(1)}`]}`}>
      {displayMessage}
    </div>
  );
};

export default Notification;