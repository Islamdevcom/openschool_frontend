import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очистить ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Проверка роли
    if (!formData.role) {
      newErrors.role = 'Выберите роль';
    }

    // Проверка фамилии
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Фамилия обязательна';
    }

    // Проверка имени
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Имя обязательно';
    }

    // Проверка email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Некорректный формат email';
    }

    // Проверка пароля
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

    // Проверка подтверждения пароля
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Подтверждение пароля обязательно';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Здесь будет логика отправки данных на сервер
      console.log('Данные для регистрации:', formData);
      
      // Имитация запроса к серверу
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Регистрация успешно завершена!');
      
      // Очистка формы после успешной отправки
      setFormData({
        lastName: '',
        firstName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
      });
      
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      alert('Произошла ошибка при регистрации. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <h1 className={styles.title}>Регистрация</h1>
          <p className={styles.subtitle}>Создайте новый аккаунт</p>
          
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                Роль <span className={styles.required}>*</span>
              </label>
              <div className={styles.roleSelection}>
                <label className={`${styles.roleOption} ${formData.role === 'student' ? styles.roleSelected : ''}`}>
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={formData.role === 'student'}
                    onChange={handleChange}
                    className={styles.roleInput}
                  />
                  <div className={styles.roleContent}>
                    <div className={styles.roleIcon}>🎓</div>
                    <span>Ученик</span>
                  </div>
                </label>
                <label className={`${styles.roleOption} ${formData.role === 'teacher' ? styles.roleSelected : ''}`}>
                  <input
                    type="radio"
                    name="role"
                    value="teacher"
                    checked={formData.role === 'teacher'}
                    onChange={handleChange}
                    className={styles.roleInput}
                  />
                  <div className={styles.roleContent}>
                    <div className={styles.roleIcon}>👨‍🏫</div>
                    <span>Преподаватель</span>
                  </div>
                </label>
              </div>
              {errors.role && (
                <span className={styles.errorMessage}>{errors.role}</span>
              )}
            </div>

            <div className={styles.rowGroup}>
              <div className={styles.inputGroup}>
                <label htmlFor="lastName" className={styles.label}>
                  Фамилия <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                  placeholder="Введите вашу фамилию"
                />
                {errors.lastName && (
                  <span className={styles.errorMessage}>{errors.lastName}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="firstName" className={styles.label}>
                  Имя <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                  placeholder="Введите ваше имя"
                />
                {errors.firstName && (
                  <span className={styles.errorMessage}>{errors.firstName}</span>
                )}
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email <span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder="Введите ваш email"
              />
              {errors.email && (
                <span className={styles.errorMessage}>{errors.email}</span>
              )}
            </div>

            <div className={styles.rowGroup}>
              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>
                  Пароль <span className={styles.required}>*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                  placeholder="Введите пароль"
                />
                {errors.password && (
                  <span className={styles.errorMessage}>{errors.password}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword" className={styles.label}>
                  Подтверждение пароля <span className={styles.required}>*</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
                  placeholder="Повторите пароль"
                />
                {errors.confirmPassword && (
                  <span className={styles.errorMessage}>{errors.confirmPassword}</span>
                )}
              </div>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Отправка...' : 'Отправить'}
            </button>
          </form>

          <div className={styles.loginLink}>
            <p>Уже есть аккаунт? <a href="/login">Войти</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;