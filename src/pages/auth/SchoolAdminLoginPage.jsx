import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginSchoolAdmin } from '../../auth/authService';
import './SchoolAdminLoginPage.css';

const SchoolAdminLoginPage = () => {
  const [activeTab, setActiveTab] = useState('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const auth = useAuth();

  // Forgot password state
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetValue, setResetValue] = useState('');
  const [resetSent, setResetSent] = useState(false);

  // Форматирование телефона (универсальный для +7)
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
      value = '+7 (' +
        (value.slice(1, 4) || '') +
        (value.length >= 4 ? ') ' : '') +
        (value.slice(4, 7) || '') +
        (value.length >= 7 ? '-' : '') +
        (value.slice(7, 9) || '') +
        (value.length >= 9 ? '-' : '') +
        (value.slice(9, 11) || '');
    }
    setPhone(value);
  };

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const handleTabClick = (tab) => setActiveTab(tab);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Используем email для входа (телефон пока не поддерживается бэкендом)
      const loginEmail = activeTab === 'email' ? email : phone;

      // API запрос к бэкенду
      const data = await loginSchoolAdmin(loginEmail, password);

      console.log('✅ Вход school admin успешен:', data);

      // Сохраняем данные в AuthContext
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('email', data.email);
      if (data.school_id) localStorage.setItem('school_id', data.school_id);
      if (data.full_name) localStorage.setItem('full_name', data.full_name);

      // Обновляем состояние AuthContext (если нужно)
      // auth можно обновить через специальный метод

      // Перенаправляем в панель администратора
      navigate('/schooladmin');

    } catch (err) {
      console.error('❌ Ошибка входа school admin:', err);
      setError(err.message || 'Ошибка входа. Проверьте данные и попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  // Forgot password handlers
  const handleShowReset = () => {
    setShowResetModal(true);
    setResetSent(false);
    setResetValue('');
  };
  const handleResetInput = (e) => setResetValue(e.target.value);

  const handleResetSubmit = (e) => {
    e.preventDefault();
    setResetSent(true);
    // Здесь будет отправка на backend — пока просто имитация
  };

  const handleCloseReset = () => {
    setShowResetModal(false);
    setResetSent(false);
    setResetValue('');
  };

  return (
    <div className="login-container-schooladmin">
      <div className="logo-section">
        <div className="logo-schooladmin"></div>
        <h1 className="brand-title">OpenSchool AI</h1>
        <p className="brand-subtitle">Панель администратора школы</p>
      </div>

      <div className="login-tabs">
        <button
          className={`tab-button${activeTab === 'email' ? ' active' : ''}`}
          type="button"
          onClick={() => handleTabClick('email')}
        >
          Email
        </button>
        <button
          className={`tab-button${activeTab === 'phone' ? ' active' : ''}`}
          type="button"
          onClick={() => handleTabClick('phone')}
        >
          Телефон
        </button>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        {activeTab === 'email' && (
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email адрес</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="admin@school.edu"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required={activeTab === 'email'}
              autoComplete="username"
            />
          </div>
        )}

        {activeTab === 'phone' && (
          <div className="form-group">
            <label className="form-label" htmlFor="phone">Номер телефона</label>
            <input
              type="tel"
              id="phone"
              className="form-input"
              placeholder="+7 (XXX) XXX-XX-XX"
              value={phone}
              onChange={handlePhoneChange}
              required={activeTab === 'phone'}
              autoComplete="tel"
            />
          </div>
        )}

        <div className="form-group">
          <label className="form-label" htmlFor="password">Пароль</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="form-input"
              placeholder="Введите пароль"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={handleTogglePassword}
              tabIndex={-1}
              aria-label="Показать пароль"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          <div className="forgot-password">
            <a href="#" onClick={e => { e.preventDefault(); handleShowReset(); }}>
              Забыли пароль?
            </a>
          </div>
        </div>

        {error && (
          <div className="error-message" style={{
            color: '#dc2626',
            backgroundColor: '#fee2e2',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '14px',
            border: '1px solid #fecaca'
          }}>
            ❌ {error}
          </div>
        )}

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Вход...' : 'Войти в систему'}
        </button>
      </form>

      <div className="footer-text">
        Защищено системой безопасности OpenSchool AI<br />
        Версия 2.1.0 | © 2024 OpenSchool AI
      </div>

      {/* Reset Password Modal */}
      {showResetModal && (
        <div className="reset-modal-backdrop" onClick={handleCloseReset}>
          <div className="reset-modal" onClick={e => e.stopPropagation()}>
            {!resetSent ? (
              <form onSubmit={handleResetSubmit}>
                <div className="reset-title">Восстановление пароля</div>
                <div className="reset-desc">
                  Введите {activeTab === 'email' ? 'email' : 'номер телефона'}, на который придёт инструкция для сброса пароля.
                </div>
                <input
                  className="form-input"
                  type={activeTab === 'email' ? 'email' : 'tel'}
                  placeholder={activeTab === 'email' ? 'Введите email' : '+7 (XXX) XXX-XX-XX'}
                  value={resetValue}
                  onChange={handleResetInput}
                  required
                  autoFocus
                />
                <div className="reset-actions">
                  <button type="submit" className="login-button small">Отправить</button>
                  <button type="button" className="cancel-btn" onClick={handleCloseReset}>Отмена</button>
                </div>
              </form>
            ) : (
              <div className="reset-success">
                Инструкция по сбросу пароля отправлена на ваш {activeTab === 'email' ? 'email' : 'номер телефона'}!
                <br /><br />
                <button className="login-button small" onClick={handleCloseReset}>Ок</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolAdminLoginPage;
