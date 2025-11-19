import React, { useState } from 'react';
import styles from './Header.module.css';
import ProfileModal from './ProfileModal/ProfileModal';
import EnergyCircle from '../common/EnergyCircle';
import ProUpgradeModal from '../common/ProUpgradeModal';
import { useAuth } from '../../context/AuthContext';

function Header({ activeSection, setActiveSection }) {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isProModalOpen, setIsProModalOpen] = useState(false);
    const { userInfo, energy } = useAuth();

    // Функция для получения инициалов из полного имени
    const getInitials = (fullName) => {
        if (!fullName) return 'У';
        const names = fullName.trim().split(' ');
        if (names.length >= 2) {
            return names[0][0] + names[1][0];
        }
        return names[0][0];
    };

    const handleEnergyClick = () => {
        if (energy === 0) {
            setIsProModalOpen(true);
        }
    };

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
                            data-section={item.id}
                        >
                            <span className={styles.navTabIcon}>{item.icon}</span>
                            <span className={styles.navTabLabel}>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div data-energy-circle>
                    <EnergyCircle
                        energy={energy}
                        maxEnergy={10}
                        onClick={handleEnergyClick}
                    />
                </div>

                {/* Кликабельный блок профиля */}
                <div
                    className={`${styles.userInfo} ${styles.clickable}`}
                    onClick={() => setIsProfileModalOpen(true)}
                    title="Открыть настройки профиля"
                    data-profile
                >
                    <div className={styles.userDetails}>
                        <div className={styles.userName}>{userInfo?.full_name || 'Пользователь'}</div>
                        <div className={styles.userRole}>Студент • 10 класс</div>
                    </div>
                    <div className={styles.userAvatar}>{getInitials(userInfo?.full_name)}</div>
                </div>
            </header>
            
            {/* Модалка профиля */}
            <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
            />

            {/* Модалка Pro версии */}
            <ProUpgradeModal
                isOpen={isProModalOpen}
                onClose={() => setIsProModalOpen(false)}
            />
        </>
    );
}

export default Header;