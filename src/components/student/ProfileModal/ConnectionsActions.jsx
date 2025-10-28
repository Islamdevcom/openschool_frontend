import React, { useState } from "react";
import styles from "./ConnectionsActions.module.css";
import { useAuth } from "../../../context/AuthContext";
import { useInviteCode } from "../../../api/student";

function ConnectionsActions() {
    const { token } = useAuth();

    const [activeTab, setActiveTab] = useState('teacher');
    const [teacherCode, setTeacherCode] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [friendCode, setFriendCode] = useState('STUD7X2K');
    const [friendName, setFriendName] = useState('');

    const [joinLoading, setJoinLoading] = useState(false);
    const [joinError, setJoinError] = useState('');

    const tabs = [
        { id: 'teacher', icon: '👨‍🎓', label: 'Присоединиться к преподавателю' },
        { id: 'friend', icon: '👫', label: 'Пригласить друга' },
        { id: 'actions', icon: '⚡', label: 'Быстрые действия' }
    ];

    const quickActions = [
        { id: 'plan', icon: '📝', label: 'Создать план на день', color: '#7C3AED' },
        { id: 'test', icon: '📊', label: 'Пройти тест', color: '#F59E0B' },
        { id: 'goals', icon: '🎯', label: 'Поставить цели', color: '#EF4444' },
        { id: 'review', icon: '📚', label: 'Повторить материал', color: '#10B981' }
    ];

    const handleJoinTeacher = async () => {
        if (!teacherCode.trim() || !token) {
            setJoinError("Не указан токен или код");
            return;
        }

        setJoinLoading(true);
        setJoinError('');
        try {
            await useInviteCode({ code: teacherCode.trim(), token }); // ⬅ исправлено
            setTeacherCode('');
            window.dispatchEvent(new CustomEvent('teachers:refresh'));
            alert('Вы успешно присоединились к преподавателю!');
        } catch (e) {
            setJoinError(e.message);
        } finally {
            setJoinLoading(false);
        }
    };

    const copyFriendCode = () => {
        navigator.clipboard.writeText(friendCode);
        alert('Код скопирован в буфер обмена!');
    };

    const generateNewCode = () => {
        const newCode = 'STUD' + Math.random().toString(36).substr(2, 4).toUpperCase();
        setFriendCode(newCode);
    };

    const handleQuickAction = (actionId) => {
        alert(`Выполнение действия: ${actionId}`);
    };

    const renderTeacherTab = () => (
        <div className={styles.tabContent}>
            <div className={styles.headerSection}>
                <h3>Присоединиться к преподавателю</h3>
                <p>Введите код приглашения от преподавателя. После ввода вы автоматически присоединитесь к его классу.</p>
            </div>

            <div className={styles.codeSection}>
                <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Код приглашения:</label>
                    <input
                        type="text"
                        value={teacherCode}
                        onChange={(e) => setTeacherCode(e.target.value.toUpperCase())}
                        placeholder="Введите код (например SUE8GL)"
                        className={styles.codeInput}
                        maxLength={8}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Добавить в группу (опционально):</label>
                    <select 
                        value={selectedGroup}
                        onChange={(e) => setSelectedGroup(e.target.value)}
                        className={styles.groupSelect}
                    >
                        <option value="">Без группы</option>
                        <option value="10a">10А класс</option>
                        <option value="math">Математический кружок</option>
                        <option value="ege">Подготовка к ЕГЭ</option>
                    </select>
                </div>

                <button 
                    onClick={handleJoinTeacher}
                    disabled={!teacherCode.trim() || joinLoading}
                    className={`${styles.primaryBtn} ${(!teacherCode.trim() || joinLoading) ? styles.disabled : ''}`}
                >
                    {joinLoading ? "⏳ Подключение..." : "📚 Присоединиться"}
                </button>
            </div>

            {joinError && (
                <div className={styles.infoBox} style={{ color: '#B91C1C', backgroundColor: '#FEE2E2' }}>
                    ⚠️ {joinError}
                </div>
            )}

            <div className={styles.infoBox}>
                ⚠️ Код действителен в течение 7 дней. После привязки ученика код станет недействительным.
            </div>
        </div>
    );

    const renderFriendTab = () => (
        <div className={styles.tabContent}>
            <div className={styles.headerSection}>
                <h3>Пригласить друга</h3>
                <p>Отправьте этот код другу. После входа в систему он сможет присоединиться к вам как учебный партнер.</p>
            </div>

            <div className={styles.codeSection}>
                <div className={styles.codeDisplay}>
                    <div className={styles.codeValue}>{friendCode}</div>
                    <div className={styles.codeActions}>
                        <button onClick={copyFriendCode} className={styles.copyBtn}>
                            📋 Копировать код
                        </button>
                        <button onClick={generateNewCode} className={styles.generateBtn}>
                            🔄 Новый код
                        </button>
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Имя друга (опционально):</label>
                    <input
                        type="text"
                        value={friendName}
                        onChange={(e) => setFriendName(e.target.value)}
                        placeholder="Введите имя друга"
                        className={styles.textInput}
                    />
                </div>

                <button className={styles.shareBtn}>
                    🔗 Скопировать ссылку-приглашение
                </button>
            </div>

            <div className={styles.infoBox}>
                💡 Или отправьте ссылку-приглашение: ваш друг сможет сразу перейти по ней и ввести код автоматически.
            </div>
        </div>
    );

    const renderActionsTab = () => (
        <div className={styles.tabContent}>
            <div className={styles.headerSection}>
                <h3>Быстрые действия</h3>
                <p>Популярные действия для эффективного обучения и планирования.</p>
            </div>

            <div className={styles.actionsGrid}>
                {quickActions.map(action => (
                    <div 
                        key={action.id}
                        className={styles.actionCard}
                        onClick={() => handleQuickAction(action.id)}
                        style={{ borderLeftColor: action.color }}
                    >
                        <div className={styles.actionIcon}>{action.icon}</div>
                        <div className={styles.actionLabel}>{action.label}</div>
                        <div className={styles.actionArrow}>→</div>
                    </div>
                ))}
            </div>

            <div className={styles.recentActions}>
                <h4>Недавние действия:</h4>
                <div className={styles.recentList}>
                    <div className={styles.recentItem}>📝 Создан план на сегодня</div>
                    <div className={styles.recentItem}>📊 Пройден тест по математике</div>
                    <div className={styles.recentItem}>🎯 Поставлена цель: улучшить физику</div>
                </div>
            </div>
        </div>
    );

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>🤝 Подключения и действия</h2>
                <p>Присоединяйтесь к преподавателям, приглашайте друзей и выполняйте быстрые действия</p>
            </div>

            <div className={styles.tabs}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <span className={styles.tabIcon}>{tab.icon}</span>
                        <span className={styles.tabLabel}>{tab.label}</span>
                    </button>
                ))}
            </div>

            <div className={styles.content}>
                {activeTab === 'teacher' && renderTeacherTab()}
                {activeTab === 'friend' && renderFriendTab()}
                {activeTab === 'actions' && renderActionsTab()}
            </div>
        </div>
    );
}

export default ConnectionsActions;
