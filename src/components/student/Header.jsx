import React, { useState } from 'react';
import styles from './Header.module.css';
import ProfileModal from './ProfileModal/ProfileModal';

function Header({ activeSection, setActiveSection }) {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    
    const navItems = [
        { id: 'dashboard', label: 'Дашборд', icon: '📊' },
        { id: 'chat', label: 'Чат с ИИ', icon: '💬' },
        { id: 'schedule', label: 'Расписание', icon: '📅' },
        { id: 'journal', label: 'Журнал', icon: '📖' },
        { id: 'planning', label: 'Планирование', icon: '📋' },
        { id: 'assignments', label: 'Задания', icon: '📝' }
    ];

    return (
        <>
            <header className={styles.header}>
                <div className={styles.logo}>
                    {/* Заменяем эмодзи на ваш логотип */}
                <div className={`${styles.logoIcon} ${styles.withImage}`}>
                <img 
                src="/logo.png" 
                alt="Logo" 
                className={styles.logoImage}
            />
                </div>
                    <span>OpenSchool AI</span>
                </div>

                <nav className={styles.navTabs}>
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            className={`${styles.navTab} ${activeSection === item.id ? styles.active : ''}`}
                            onClick={() => setActiveSection(item.id)}
                        >
                            <span className={styles.navTabIcon}>{item.icon}</span>
                            <span className={styles.navTabLabel}>{item.label}</span>
                        </button>
                    ))}
                </nav>
                
                {/* Кликабельный блок профиля */}
                <div 
                    className={`${styles.userInfo} ${styles.clickable}`}
                    onClick={() => setIsProfileModalOpen(true)}
                    title="Открыть настройки профиля"
                >
                    <div className={styles.userDetails}>
                        <div className={styles.userName}>Алексей Соколов</div>
                        <div className={styles.userRole}>Студент • 10 класс</div>
                    </div>
                    <div className={styles.userAvatar}>АС</div>
                </div>
            </header>
            
            {/* Модалка профиля */}
            <ProfileModal 
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
            />
        </>
    );
}

export default Header;