import React, { useState } from 'react';
import './SuperAdminLoginPage.css';

const SuperAdminLoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Forgot password
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Здесь логика логина
    setTimeout(() => {
      setLoading(false);
      if (onLogin) onLogin({ email });
    }, 1200);
  };

  // Forgot password
  const handleShowReset = () => {
    setShowResetModal(true);
    setResetSent(false);
    setResetEmail('');
  };
  const handleResetInput = (e) => setResetEmail(e.target.value);
  const handleResetSubmit = (e) => {
    e.preventDefault();
    setResetSent(true);
    // Здесь будет отправка на backend
  };
  const handleCloseReset = () => {
    setShowResetModal(false);
    setResetSent(false);
    setResetEmail('');
  };

  return (
    <div className="login-container-superadmin">
      <div className="logo-section">
        <div className="logo-superadmin"></div>
        <h1 className="brand-title">OpenSchool AI</h1>
        <p className="brand-subtitle">Панель супер-администратора</p>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email адрес</label>
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="superadmin@openschool.ai"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
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
                  Введите email, на который придёт инструкция для сброса пароля.
                </div>
                <input
                  className="form-input"
                  type="email"
                  placeholder="Введите email"
                  value={resetEmail}
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
                Инструкция по сбросу пароля отправлена на ваш email!
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

export default SuperAdminLoginPage;
