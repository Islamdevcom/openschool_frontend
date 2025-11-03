import React, { useState } from 'react';
import styles from './ProfileSettings.module.css';

function ProfileSettings() {
    const [activeSection, setActiveSection] = useState('profile');
    
    // Состояние для настроек профиля
    const [profileData, setProfileData] = useState({
        firstName: 'Иван',
        lastName: 'Петров',
        email: 'ivan.petrov@example.com',
        phone: '+7 (999) 123-45-67',
        birthDate: '2007-03-15',
        grade: '10',
        school: 'МБОУ "Гимназия №1"',
        city: 'Москва',
        bio: 'Увлекаюсь математикой и физикой. Готовлюсь к поступлению в технический университет.',
        avatar: null
    });

    // Состояние для настроек уведомлений
    const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        newMessages: true,
        homeworkReminders: true,
        lessonsReminders: true,
        achievementNotifications: true,
        weeklyReport: true,
        marketingEmails: false
    });

    // Состояние для настроек приватности
    const [privacySettings, setPrivacySettings] = useState({
        profileVisibility: 'students', // 'public', 'students', 'teachers', 'private'
        showEmail: false,
        showPhone: false,
        showBirthDate: false,
        allowTeacherContact: true,
        allowStudentContact: true,
        showInLeaderboard: true,
        dataCollection: true
    });

    // Состояние для настроек безопасности
    const [securitySettings, setSecuritySettings] = useState({
        twoFactorAuth: false,
        sessionTimeout: '30', // в минутах
        loginNotifications: true,
        deviceManagement: true
    });

    const sections = [
        { id: 'profile', icon: '👤', label: 'Профиль' },
        { id: 'notifications', icon: '🔔', label: 'Уведомления' },
        { id: 'privacy', icon: '🔒', label: 'Приватность' },
        { id: 'security', icon: '🛡️', label: 'Безопасность' },
        { id: 'appearance', icon: '🎨', label: 'Внешний вид' },
        { id: 'data', icon: '📊', label: 'Данные' }
    ];

    const handleProfileChange = (field, value) => {
        setProfileData(prev => ({ ...prev, [field]: value }));
    };

    const handleNotificationChange = (field, value) => {
        setNotificationSettings(prev => ({ ...prev, [field]: value }));
    };

    const handlePrivacyChange = (field, value) => {
        setPrivacySettings(prev => ({ ...prev, [field]: value }));
    };

    const handleSecurityChange = (field, value) => {
        setSecuritySettings(prev => ({ ...prev, [field]: value }));
    };

    const saveSettings = () => {
        // Здесь будет логика сохранения настроек
        alert('Настройки сохранены!');
    };

    const resetSettings = () => {
        if (confirm('Вы уверены, что хотите сбросить все настройки?')) {
            // Логика сброса настроек
            alert('Настройки сброшены!');
        }
    };

    const exportData = () => {
        // Логика экспорта данных
        alert('Экспорт данных начат. Файл будет отправлен на вашу почту.');
    };

    const deleteAccount = () => {
        if (confirm('ВНИМАНИЕ! Это действие необратимо. Все ваши данные будут удалены. Продолжить?')) {
            alert('Запрос на удаление аккаунта отправлен.');
        }
    };

    const handleLogout = () => {
        if (confirm('Вы уверены, что хотите выйти из аккаунта?')) {
            // Очистка данных пользователя
            localStorage.clear();
            sessionStorage.clear();
            // Перенаправление на страницу входа
            window.location.href = '/';
        }
    };

    const renderProfileSection = () => (
        <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Основная информация</h3>
            
            <div className={styles.avatarSection}>
                <div className={styles.avatarContainer}>
                    <div className={styles.avatar}>
                        {profileData.avatar ? (
                            <img src={profileData.avatar} alt="Avatar" />
                        ) : (
                            <span className={styles.avatarText}>
                                {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                            </span>
                        )}
                    </div>
                    <div className={styles.avatarActions}>
                        <button className={styles.avatarBtn}>📸 Изменить фото</button>
                        <button className={styles.avatarBtn}>🗑️ Удалить</button>
                    </div>
                </div>
            </div>

            <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Имя</label>
                    <input
                        type="text"
                        value={profileData.firstName}
                        onChange={(e) => handleProfileChange('firstName', e.target.value)}
                        className={styles.input}
                    />
                </div>
                
                <div className={styles.formGroup}>
                    <label className={styles.label}>Фамилия</label>
                    <input
                        type="text"
                        value={profileData.lastName}
                        onChange={(e) => handleProfileChange('lastName', e.target.value)}
                        className={styles.input}
                    />
                </div>
                
                <div className={styles.formGroup}>
                    <label className={styles.label}>Email</label>
                    <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                        className={styles.input}
                    />
                </div>
                
                <div className={styles.formGroup}>
                    <label className={styles.label}>Телефон</label>
                    <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleProfileChange('phone', e.target.value)}
                        className={styles.input}
                    />
                </div>
                
                <div className={styles.formGroup}>
                    <label className={styles.label}>Дата рождения</label>
                    <input
                        type="date"
                        value={profileData.birthDate}
                        onChange={(e) => handleProfileChange('birthDate', e.target.value)}
                        className={styles.input}
                    />
                </div>
                
                <div className={styles.formGroup}>
                    <label className={styles.label}>Класс</label>
                    <select
                        value={profileData.grade}
                        onChange={(e) => handleProfileChange('grade', e.target.value)}
                        className={styles.select}
                    >
                        {Array.from({ length: 11 }, (_, i) => i + 1).map(grade => (
                            <option key={grade} value={grade}>{grade} класс</option>
                        ))}
                    </select>
                </div>
                
                <div className={styles.formGroupFull}>
                    <label className={styles.label}>Школа</label>
                    <input
                        type="text"
                        value={profileData.school}
                        onChange={(e) => handleProfileChange('school', e.target.value)}
                        className={styles.input}
                    />
                </div>
                
                <div className={styles.formGroupFull}>
                    <label className={styles.label}>Город</label>
                    <input
                        type="text"
                        value={profileData.city}
                        onChange={(e) => handleProfileChange('city', e.target.value)}
                        className={styles.input}
                    />
                </div>
                
                <div className={styles.formGroupFull}>
                    <label className={styles.label}>О себе</label>
                    <textarea
                        value={profileData.bio}
                        onChange={(e) => handleProfileChange('bio', e.target.value)}
                        className={styles.textarea}
                        rows="4"
                        placeholder="Расскажите о своих интересах и целях..."
                    />
                </div>
            </div>
        </div>
    );

    const renderNotificationsSection = () => (
        <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Настройки уведомлений</h3>
            
            <div className={styles.settingsGroup}>
                <h4 className={styles.groupTitle}>Способы доставки</h4>
                <div className={styles.settingsList}>
                    <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                            <span className={styles.settingLabel}>📧 Email уведомления</span>
                            <span className={styles.settingDescription}>Получать уведомления на почту</span>
                        </div>
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                checked={notificationSettings.emailNotifications}
                                onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                    
                    <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                            <span className={styles.settingLabel}>📱 Push уведомления</span>
                            <span className={styles.settingDescription}>Уведомления в браузере</span>
                        </div>
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                checked={notificationSettings.pushNotifications}
                                onChange={(e) => handleNotificationChange('pushNotifications', e.target.checked)}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                    
                    <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                            <span className={styles.settingLabel}>💬 SMS уведомления</span>
                            <span className={styles.settingDescription}>Важные уведомления по SMS</span>
                        </div>
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                checked={notificationSettings.smsNotifications}
                                onChange={(e) => handleNotificationChange('smsNotifications', e.target.checked)}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                </div>
            </div>

            <div className={styles.settingsGroup}>
                <h4 className={styles.groupTitle}>Типы уведомлений</h4>
                <div className={styles.settingsList}>
                    <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                            <span className={styles.settingLabel}>💬 Новые сообщения</span>
                            <span className={styles.settingDescription}>Сообщения от преподавателей и студентов</span>
                        </div>
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                checked={notificationSettings.newMessages}
                                onChange={(e) => handleNotificationChange('newMessages', e.target.checked)}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                    
                    <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                            <span className={styles.settingLabel}>📝 Напоминания о ДЗ</span>
                            <span className={styles.settingDescription}>Уведомления о домашних заданиях</span>
                        </div>
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                checked={notificationSettings.homeworkReminders}
                                onChange={(e) => handleNotificationChange('homeworkReminders', e.target.checked)}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                    
                    <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                            <span className={styles.settingLabel}>⏰ Напоминания об уроках</span>
                            <span className={styles.settingDescription}>Уведомления о предстоящих занятиях</span>
                        </div>
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                checked={notificationSettings.lessonsReminders}
                                onChange={(e) => handleNotificationChange('lessonsReminders', e.target.checked)}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                    
                    <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                            <span className={styles.settingLabel}>🏆 Достижения</span>
                            <span className={styles.settingDescription}>Уведомления о новых достижениях</span>
                        </div>
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                checked={notificationSettings.achievementNotifications}
                                onChange={(e) => handleNotificationChange('achievementNotifications', e.target.checked)}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                    
                    <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                            <span className={styles.settingLabel}>📊 Еженедельные отчеты</span>
                            <span className={styles.settingDescription}>Сводка прогресса за неделю</span>
                        </div>
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                checked={notificationSettings.weeklyReport}
                                onChange={(e) => handleNotificationChange('weeklyReport', e.target.checked)}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderPrivacySection = () => (
        <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Настройки приватности</h3>
            
            <div className={styles.settingsGroup}>
                <h4 className={styles.groupTitle}>Видимость профиля</h4>
                <div className={styles.radioGroup}>
                    <label className={styles.radioItem}>
                        <input
                            type="radio"
                            name="profileVisibility"
                            value="public"
                            checked={privacySettings.profileVisibility === 'public'}
                            onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                        />
                        <span className={styles.radioLabel}>
                            <span className={styles.radioTitle}>🌍 Публичный</span>
                            <span className={styles.radioDescription}>Профиль виден всем пользователям</span>
                        </span>
                    </label>
                    
                    <label className={styles.radioItem}>
                        <input
                            type="radio"
                            name="profileVisibility"
                            value="students"
                            checked={privacySettings.profileVisibility === 'students'}
                            onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                        />
                        <span className={styles.radioLabel}>
                            <span className={styles.radioTitle}>👥 Только студенты</span>
                            <span className={styles.radioDescription}>Видно только другим студентам</span>
                        </span>
                    </label>
                    
                    <label className={styles.radioItem}>
                        <input
                            type="radio"
                            name="profileVisibility"
                            value="teachers"
                            checked={privacySettings.profileVisibility === 'teachers'}
                            onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                        />
                        <span className={styles.radioLabel}>
                            <span className={styles.radioTitle}>👨‍🎓 Только преподаватели</span>
                            <span className={styles.radioDescription}>Видно только преподавателям</span>
                        </span>
                    </label>
                    
                    <label className={styles.radioItem}>
                        <input
                            type="radio"
                            name="profileVisibility"
                            value="private"
                            checked={privacySettings.profileVisibility === 'private'}
                            onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                        />
                        <span className={styles.radioLabel}>
                            <span className={styles.radioTitle}>🔒 Приватный</span>
                            <span className={styles.radioDescription}>Профиль скрыт от всех</span>
                        </span>
                    </label>
                </div>
            </div>

            <div className={styles.settingsGroup}>
                <h4 className={styles.groupTitle}>Отображение данных</h4>
                <div className={styles.settingsList}>
                    <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                            <span className={styles.settingLabel}>📧 Показывать email</span>
                            <span className={styles.settingDescription}>Email будет виден в профиле</span>
                        </div>
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                checked={privacySettings.showEmail}
                                onChange={(e) => handlePrivacyChange('showEmail', e.target.checked)}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                    
                    <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                            <span className={styles.settingLabel}>📱 Показывать телефон</span>
                            <span className={styles.settingDescription}>Номер телефона будет виден в профиле</span>
                        </div>
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                checked={privacySettings.showPhone}
                                onChange={(e) => handlePrivacyChange('showPhone', e.target.checked)}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                    
                    <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                            <span className={styles.settingLabel}>🏆 Участие в рейтингах</span>
                            <span className={styles.settingDescription}>Отображение в таблицах лидеров</span>
                        </div>
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                checked={privacySettings.showInLeaderboard}
                                onChange={(e) => handlePrivacyChange('showInLeaderboard', e.target.checked)}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSecuritySection = () => (
        <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Безопасность аккаунта</h3>
            
            <div className={styles.settingsGroup}>
                <h4 className={styles.groupTitle}>Аутентификация</h4>
                <div className={styles.settingsList}>
                    <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                            <span className={styles.settingLabel}>🔐 Двухфакторная аутентификация</span>
                            <span className={styles.settingDescription}>Дополнительная защита вашего аккаунта</span>
                        </div>
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                checked={securitySettings.twoFactorAuth}
                                onChange={(e) => handleSecurityChange('twoFactorAuth', e.target.checked)}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                </div>
            </div>

            <div className={styles.settingsGroup}>
                <h4 className={styles.groupTitle}>Управление сессиями</h4>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Автоматический выход (минуты)</label>
                    <select
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
                        className={styles.select}
                    >
                        <option value="15">15 минут</option>
                        <option value="30">30 минут</option>
                        <option value="60">1 час</option>
                        <option value="120">2 часа</option>
                        <option value="never">Никогда</option>
                    </select>
                </div>
            </div>

            <div className={styles.dangerZone}>
                <h4 className={styles.dangerTitle}>🚨 Опасные действия</h4>
                <div className={styles.dangerActions}>
                    <button className={styles.dangerBtn} onClick={() => alert('Функция смены пароля')}>
                        🔑 Изменить пароль
                    </button>
                    <button className={styles.dangerBtn} onClick={handleLogout}>
                        🚪 Выйти из аккаунта
                    </button>
                </div>
            </div>
        </div>
    );

    const renderAppearanceSection = () => (
        <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Внешний вид</h3>
            <div className={styles.comingSoon}>
                <div className={styles.comingSoonIcon}>🎨</div>
                <h4 className={styles.comingSoonTitle}>Скоро будет доступно</h4>
                <p className={styles.comingSoonText}>
                    Настройки темы, цветовой схемы и интерфейса находятся в разработке
                </p>
            </div>
        </div>
    );

    const renderDataSection = () => (
        <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Управление данными</h3>
            
            <div className={styles.dataActions}>
                <div className={styles.dataAction}>
                    <div className={styles.dataActionInfo}>
                        <h4 className={styles.dataActionTitle}>📥 Экспорт данных</h4>
                        <p className={styles.dataActionDescription}>
                            Скачать архив со всеми вашими данными: профиль, оценки, сообщения
                        </p>
                    </div>
                    <button className={styles.dataActionBtn} onClick={exportData}>
                        Экспортировать
                    </button>
                </div>
                
                <div className={styles.dataAction}>
                    <div className={styles.dataActionInfo}>
                        <h4 className={styles.dataActionTitle}>🗑️ Удаление аккаунта</h4>
                        <p className={styles.dataActionDescription}>
                            Полное удаление аккаунта и всех связанных данных. Это действие необратимо.
                        </p>
                    </div>
                    <button className={styles.deleteBtn} onClick={deleteAccount}>
                        Удалить аккаунт
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Настройки</h2>
                <p className={styles.subtitle}>Управляйте своим профилем и предпочтениями</p>
            </div>

            <div className={styles.settingsLayout}>
                <div className={styles.sidebar}>
                    <nav className={styles.nav}>
                        {sections.map(section => (
                            <button
                                key={section.id}
                                className={`${styles.navItem} ${activeSection === section.id ? styles.active : ''}`}
                                onClick={() => setActiveSection(section.id)}
                            >
                                <span className={styles.navIcon}>{section.icon}</span>
                                <span className={styles.navLabel}>{section.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                <div className={styles.content}>
                    {activeSection === 'profile' && renderProfileSection()}
                    {activeSection === 'notifications' && renderNotificationsSection()}
                    {activeSection === 'privacy' && renderPrivacySection()}
                    {activeSection === 'security' && renderSecuritySection()}
                    {activeSection === 'appearance' && renderAppearanceSection()}
                    {activeSection === 'data' && renderDataSection()}

                    <div className={styles.actions}>
                        <button className={styles.saveBtn} onClick={saveSettings}>
                            <span>💾</span>
                            Сохранить изменения
                        </button>
                        <button className={styles.resetBtn} onClick={resetSettings}>
                            <span>🔄</span>
                            Сбросить настройки
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileSettings;