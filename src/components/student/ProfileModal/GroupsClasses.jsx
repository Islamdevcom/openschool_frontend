import React, { useState } from 'react';
import styles from './GroupsClasses.module.css';

function GroupsClasses() {
    const [activeTab, setActiveTab] = useState('current');
    
    // Моковые данные
    const currentGroups = [
        {
            id: 1,
            name: 'Математика 10А',
            teacher: 'Иванова М.В.',
            subject: 'Математика',
            students: 24,
            nextLesson: '2025-08-19 09:00',
            progress: 78,
            status: 'active',
            avatar: 'ИМ'
        },
        {
            id: 2,
            name: 'Физика - Углубленный уровень',
            teacher: 'Петров А.С.',
            subject: 'Физика',
            students: 18,
            nextLesson: '2025-08-20 10:30',
            progress: 65,
            status: 'active',
            avatar: 'ПА'
        },
        {
            id: 3,
            name: 'Подготовка к ЕГЭ по химии',
            teacher: 'Смирнова О.И.',
            subject: 'Химия',
            students: 12,
            nextLesson: '2025-08-21 14:00',
            progress: 82,
            status: 'active',
            avatar: 'СО'
        }
    ];

    const archivedGroups = [
        {
            id: 4,
            name: 'Биология 9 класс',
            teacher: 'Козлова Е.В.',
            subject: 'Биология',
            students: 20,
            completedDate: '2025-06-15',
            finalGrade: 'Отлично',
            status: 'completed',
            avatar: 'КЕ'
        },
        {
            id: 5,
            name: 'История России',
            teacher: 'Николаев В.П.',
            subject: 'История',
            students: 16,
            completedDate: '2025-07-20',
            finalGrade: 'Хорошо',
            status: 'completed',
            avatar: 'НВ'
        }
    ];

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        if (date.toDateString() === now.toDateString()) {
            return `Сегодня в ${date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return `Завтра в ${date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;
        } else {
            return date.toLocaleDateString('ru-RU', { 
                day: 'numeric', 
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    };

    const getSubjectColor = (subject) => {
        const colors = {
            'Математика': '#3B82F6',
            'Физика': '#8B5CF6',
            'Химия': '#06B6D4',
            'Биология': '#10B981',
            'История': '#F59E0B'
        };
        return colors[subject] || '#6B7280';
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Мои группы и классы</h2>
                <p className={styles.subtitle}>Управляйте участием в группах и отслеживайте прогресс</p>
            </div>

            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'current' ? styles.active : ''}`}
                    onClick={() => setActiveTab('current')}
                >
                    <span className={styles.tabIcon}>📚</span>
                    <span>Текущие группы</span>
                    <span className={styles.badge}>{currentGroups.length}</span>
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'archived' ? styles.active : ''}`}
                    onClick={() => setActiveTab('archived')}
                >
                    <span className={styles.tabIcon}>📋</span>
                    <span>Архив</span>
                    <span className={styles.badge}>{archivedGroups.length}</span>
                </button>
            </div>

            <div className={styles.content}>
                {activeTab === 'current' && (
                    <div className={styles.groupsList}>
                        {currentGroups.map(group => (
                            <div key={group.id} className={styles.groupCard}>
                                <div className={styles.groupHeader}>
                                    <div className={styles.groupInfo}>
                                        <div 
                                            className={styles.groupAvatar}
                                            style={{ background: getSubjectColor(group.subject) }}
                                        >
                                            {group.avatar}
                                        </div>
                                        <div className={styles.groupDetails}>
                                            <h3 className={styles.groupName}>{group.name}</h3>
                                            <p className={styles.teacherName}>{group.teacher}</p>
                                        </div>
                                    </div>
                                    <div className={styles.groupStatus}>
                                        <span className={styles.statusBadge}>Активная</span>
                                    </div>
                                </div>

                                <div className={styles.groupStats}>
                                    <div className={styles.stat}>
                                        <span className={styles.statIcon}>👥</span>
                                        <span className={styles.statText}>{group.students} учеников</span>
                                    </div>
                                    <div className={styles.stat}>
                                        <span className={styles.statIcon}>⏰</span>
                                        <span className={styles.statText}>{formatDate(group.nextLesson)}</span>
                                    </div>
                                </div>

                                <div className={styles.progressSection}>
                                    <div className={styles.progressHeader}>
                                        <span className={styles.progressLabel}>Прогресс изучения</span>
                                        <span className={styles.progressValue}>{group.progress}%</span>
                                    </div>
                                    <div className={styles.progressBar}>
                                        <div 
                                            className={styles.progressFill}
                                            style={{ 
                                                width: `${group.progress}%`,
                                                background: getSubjectColor(group.subject)
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                <div className={styles.groupActions}>
                                    <button className={styles.actionBtn}>
                                        <span>📝</span>
                                        Домашние задания
                                    </button>
                                    <button className={styles.actionBtn}>
                                        <span>📊</span>
                                        Оценки
                                    </button>
                                    <button className={styles.actionBtn}>
                                        <span>💬</span>
                                        Чат группы
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'archived' && (
                    <div className={styles.groupsList}>
                        {archivedGroups.map(group => (
                            <div key={group.id} className={`${styles.groupCard} ${styles.archivedCard}`}>
                                <div className={styles.groupHeader}>
                                    <div className={styles.groupInfo}>
                                        <div 
                                            className={styles.groupAvatar}
                                            style={{ background: getSubjectColor(group.subject) }}
                                        >
                                            {group.avatar}
                                        </div>
                                        <div className={styles.groupDetails}>
                                            <h3 className={styles.groupName}>{group.name}</h3>
                                            <p className={styles.teacherName}>{group.teacher}</p>
                                        </div>
                                    </div>
                                    <div className={styles.groupStatus}>
                                        <span className={`${styles.statusBadge} ${styles.completedBadge}`}>
                                            Завершена
                                        </span>
                                    </div>
                                </div>

                                <div className={styles.groupStats}>
                                    <div className={styles.stat}>
                                        <span className={styles.statIcon}>📅</span>
                                        <span className={styles.statText}>
                                            Завершена {new Date(group.completedDate).toLocaleDateString('ru-RU')}
                                        </span>
                                    </div>
                                    <div className={styles.stat}>
                                        <span className={styles.statIcon}>🎯</span>
                                        <span className={styles.statText}>Итоговая оценка: {group.finalGrade}</span>
                                    </div>
                                </div>

                                <div className={styles.groupActions}>
                                    <button className={styles.actionBtn}>
                                        <span>📜</span>
                                        Сертификат
                                    </button>
                                    <button className={styles.actionBtn}>
                                        <span>📊</span>
                                        Итоговый отчет
                                    </button>
                                    <button className={styles.actionBtn}>
                                        <span>💾</span>
                                        Скачать материалы
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {activeTab === 'current' && (
                <div className={styles.quickActions}>
                    <h3 className={styles.quickActionsTitle}>Быстрые действия</h3>
                    <div className={styles.quickActionsList}>
                        <button className={styles.quickAction}>
                            <span className={styles.quickActionIcon}>➕</span>
                            <span>Присоединиться к новой группе</span>
                        </button>
                        <button className={styles.quickAction}>
                            <span className={styles.quickActionIcon}>🔔</span>
                            <span>Настроить уведомления</span>
                        </button>
                        <button className={styles.quickAction}>
                            <span className={styles.quickActionIcon}>📋</span>
                            <span>Расписание всех групп</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GroupsClasses;