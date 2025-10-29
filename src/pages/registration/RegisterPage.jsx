import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './RegisterPage.module.css';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://openschoolbackend-production.up.railway.app';

const RegisterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Определяем тип регистрации по URL или state
  const isIndependent = location.pathname === '/self-register';
  const schoolCode = location.state?.schoolCode || ''; // Код школы из EnterSchoolCode
  
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
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.role) {
      newErrors.role = 'Выберите роль';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Фамилия обязательна';
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Имя обязательно';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Некорректный формат email';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

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
      // Объединяем фамилию и имя в full_name
      const full_name = `${formData.lastName} ${formData.firstName}`.trim();
      
      // Выбираем endpoint и данные в зависимости от типа регистрации
      if (isIndependent) {
        // Самостоятельная регистрация
        const payload = {
          full_name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        };
        
        const response = await axios.post(`${API_URL}/register-request/independent`, payload);
        
        alert('✅ Регистрация успешна! Теперь вы можете войти в систему');
        navigate('/login');
        
      } else {
        // Регистрация через код школы
        if (!schoolCode) {
          alert('❌ Код школы не найден. Пожалуйста, начните с ввода кода школы.');
          navigate('/enter-code');
          return;
        }
        
        const payload = {
          full_name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          school_code: schoolCode
        };
        
        const response = await axios.post(`${API_URL}/register-request/school`, payload);
        
        // Переход на страницу ожидания
        navigate('/registration-status', { 
          state: { 
            email: formData.email,
            school_code: schoolCode 
          } 
        });
      }
      
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      
      // Показываем ошибку от сервера
      const errorMessage = error.response?.data?.detail || 'Произошла ошибка при регистрации. Попробуйте еще раз.';
      alert('❌ ' + errorMessage);
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <h1 className={styles.title}>
            {isIndependent ? 'Самостоятельная регистрация' : 'Регистрация в школе'}
          </h1>
          <p className={styles.subtitle}>
            {isIndependent 
              ? 'Создайте аккаунт для независимого использования' 
              : `Регистрация с кодом школы: ${schoolCode}`
            }
          </p>
          
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
                placeholder="student@example.com"
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
                  placeholder="••••••"
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