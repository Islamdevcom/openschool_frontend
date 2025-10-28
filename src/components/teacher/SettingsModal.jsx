import React, { useState } from 'react';
import styles from './SettingsModal.module.css';

const SettingsModal = ({ isOpen, onClose, onLogout, settings = {}, onUpdateSettings }) => {
  const [currentSettings, setCurrentSettings] = useState({
    theme: settings.theme || 'light',
    notifications: settings.notifications ?? true,
    autoSave: settings.autoSave ?? true
  });

  const handleLogout = () => {
    if (window.confirm('Вы уверены, что хотите выйти из аккаунта?')) {
      onLogout();
      onClose();
    }
  };

  const handleSettingChange = (key, value) => {
    const newSettings = {
      ...currentSettings,
      [key]: value
    };
    setCurrentSettings(newSettings);
    onUpdateSettings?.(newSettings);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>⚙️ Настройки</h2>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        <div className={styles.content}>
          {/* 🎨 Внешний вид */}
          <div className={styles.section}>
            <h3>🎨 Внешний вид</h3>
            <div className={styles.setting}>
              <div className={styles.settingInfo}>
                <label>Тема интерфейса</label>
                <small>Выберите светлую или темную тему</small>
              </div>
              <select
                value={currentSettings.theme}
                onChange={(e) => handleSettingChange('theme', e.target.value)}
                className={styles.select}
                disabled
              >
                <option value="light">Светлая</option>
                <option value="dark">Темная</option>
                <option value="auto">Автоматически</option>
              </select>
            </div>
            <small className={styles.disabledNote}>⚠️ Смена темы будет доступна в следующих обновлениях</small>
          </div>

          {/* 🔔 Уведомления */}
          <div className={styles.section}>
            <h3>🔔 Уведомления</h3>
            <div className={styles.setting}>
              <div className={styles.settingInfo}>
                <label>Уведомления о новых заданиях</label>
                <small>Получать уведомления, когда ученики выполняют задания</small>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={currentSettings.notifications}
                  onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                />
                <span className={styles.slider}></span>
              </label>
            </div>
          </div>

          {/* 💾 Автосохранение */}
          <div className={styles.section}>
            <h3>💾 Автосохранение</h3>
            <div className={styles.setting}>
              <div className={styles.settingInfo}>
                <label>Автоматически сохранять изменения</label>
                <small>Сохранять планы уроков и задания автоматически</small>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={currentSettings.autoSave}
                  onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                />
                <span className={styles.slider}></span>
              </label>
            </div>
          </div>

          {/* 🔒 Безопасность */}
          <div className={styles.section}>
            <h3>🔒 Безопасность</h3>
            <div className={styles.setting}>
              <div className={styles.settingInfo}>
                <label>Сменить пароль</label>
                <small>Обновите пароль для повышения безопасности</small>
              </div>
              <button className={styles.passwordBtn} disabled>
                Изменить пароль
              </button>
            </div>
            <small className={styles.disabledNote}>⚠️ Смена пароля будет доступна в следующих обновлениях</small>
          </div>

          {/* 🚨 Опасная зона */}
          <div className={styles.dangerZone}>
            <h3>🚨 Опасная зона</h3>
            <div className={styles.setting}>
              <div className={styles.settingInfo}>
                <label>Выход из аккаунта</label>
                <small>Завершить текущий сеанс работы</small>
              </div>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                🚪 Выйти из аккаунта
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
