import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EnterSchoolCode.module.css';

const EnterSchoolCode = () => {
  const [code, setCode] = useState(['', '', '', '', '', '', '']);
  const [error, setError] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    const allFilled = code.every(digit => digit.length === 1);
    setIsComplete(allFilled);
  }, [code]);

  const handleInputChange = (index, value) => {
    if (!/^[a-zA-Z0-9]$/.test(value) && value !== '') {
      return;
    }

    const newCode = [...code];
    newCode[index] = value.toUpperCase();
    setCode(newCode);

    if (value && index < 6) {
      inputRefs.current[index + 1]?.focus();
    }

    hideError();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 6) {
      inputRefs.current[index + 1]?.focus();
    }

    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handlePaste = (index, e) => {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData('text').toUpperCase();
    const newCode = [...code];

    for (let i = 0; i < Math.min(paste.length, 7 - index); i++) {
      if (/^[a-zA-Z0-9]$/.test(paste[i])) {
        newCode[index + i] = paste[i];
      }
    }

    setCode(newCode);
    hideError();
  };

  const handleSubmit = async () => {
    const fullCode = code.join('');

    if (fullCode.length !== 7) {
      showError();
      return;
    }

    try {
      const res = await fetch('https://openschoolbackend-production.up.railway.app/schools/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: fullCode })
      });

      const data = await res.json();

      if (!res.ok) {
        showError();
        setTimeout(() => {
          setCode(['', '', '', '', '', '', '']);
          inputRefs.current[0]?.focus();
        }, 1000);
        return;
      }

      navigate('/register', { state: { schoolId: data.school_id } });

    } catch (err) {
      showError();
    }
  };

  const showError = () => {
    setError(true);
  };

  const hideError = () => {
    setError(false);
  };

  return (
    <div className={styles.enterSchoolCodePage}>
      <div className={`${styles.particle} ${styles.particle1}`}></div>
      <div className={`${styles.particle} ${styles.particle2}`}></div>
      <div className={`${styles.particle} ${styles.particle3}`}></div>
      <div className={`${styles.particle} ${styles.particle4}`}></div>

      <div className={styles.container}>
        <div className={styles.logo}>OpenSchool AI</div>
        <div className={styles.subtitle}>Введите 7-значный код доступа</div>

        <div className={styles.codeInputContainer}>
          {code.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              className={`${styles.codeInput} ${error ? styles.error : ''}`}
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={(e) => handlePaste(index, e)}
              data-index={index}
            />
          ))}
        </div>

        <button 
          className={`${styles.submitBtn} ${isComplete ? styles.active : ''}`}
          onClick={handleSubmit}
        >
          Войти
        </button>

        <div className={`${styles.errorMessage} ${error ? styles.show : ''}`}>
          Неверный код. Попробуйте еще раз.
        </div>
      </div>
    </div>
  );
};

export default EnterSchoolCode;
