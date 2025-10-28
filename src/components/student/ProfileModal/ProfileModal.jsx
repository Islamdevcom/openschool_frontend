import React, { useState } from 'react';
import ConnectionsActions from './ConnectionsActions';
import GroupsClasses from './GroupsClasses';
import TeachersList from './TeachersList';
import Achievements from './Achievements';
import MaterialsLibrary from './MaterialsLibrary';
import SubscriptionPlans from './SubscriptionPlans';
import ProfileSettings from './ProfileSettings';
import HelpSupport from './HelpSupport';
import styles from './ProfileModal.module.css';

function ProfileModal({ isOpen, onClose }) {
    const [activeSection, setActiveSection] = useState('connections');

    if (!isOpen) return null;

    const menuItems = [
        { id: 'connections', icon: '🤝', label: 'Подключения и действия' },
        { id: 'groups', icon: '👥', label: 'Мои группы/классы' },
        { id: 'teachers', icon: '👨‍🎓', label: 'Список преподавателей' },
        { id: 'achievements', icon: '🎖️', label: 'Достижения и рейтинги' },
        { id: 'library', icon: '📚', label: 'Библиотека материалов' },
        { id: 'subscription', icon: '💰', label: 'Подписка/Тарифы' },
        { id: 'settings', icon: '⚙️', label: 'Настройки' },
        { id: 'help', icon: '❓', label: 'Помощь и поддержка' }
    ];

    const renderActiveSection = () => {
        switch (activeSection) {
            case 'connections':
                return <ConnectionsActions />;
            case 'groups':
                return <GroupsClasses />;
            case 'teachers':
                return <TeachersList />;
            case 'achievements':
                return <Achievements />;
            case 'library':
                return <MaterialsLibrary />;
            case 'subscription':
                return <SubscriptionPlans />;
            case 'settings':
                return <ProfileSettings />;
            case 'help':
                return <HelpSupport />;
            default:
                return <ConnectionsActions />;
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <div className={styles.userInfo}>
                        <div className={styles.userAvatar}>ИП</div>
                        <div className={styles.userDetails}>
                            <h2 className={styles.userName}>Иван Петров</h2>
                            <p className={styles.userRole}>Студент • 10 класс</p>
                        </div>
                    </div>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <span>✕</span>
                    </button>
                </div>

                <div className={styles.modalBody}>
                    <div className={styles.sidebar}>
                        <nav className={styles.sidebarNav}>
                            {menuItems.map(item => (
                                <button
                                    key={item.id}
                                    className={`${styles.navItem} ${activeSection === item.id ? styles.active : ''}`}
                                    onClick={() => setActiveSection(item.id)}
                                >
                                    <span className={styles.navIcon}>{item.icon}</span>
                                    <span className={styles.navLabel}>{item.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className={styles.content}>
                        {renderActiveSection()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileModal;