import React, { useState } from 'react';
import styles from './Planning.module.css';

function Planning() {
    const [goals, setGoals] = useState([
        { id: 1, text: 'Подготовиться к олимпиаде по математике', completed: true },
        { id: 2, text: 'Улучшить оценку по физике', completed: false },
        { id: 3, text: 'Прочитать 5 книг по программе', completed: false },
        { id: 4, text: 'Сдать TOEFL на 90+ баллов', completed: true }
    ]);

    const [newGoal, setNewGoal] = useState('');

    const modules = [
        {
            id: 1,
            name: 'Математика: Тригонометрия',
            progress: 75,
            deadline: '15 августа',
            status: 'active',
            tasks: 12,
            completedTasks: 9
        },
        {
            id: 2,
            name: 'Физика: Электродинамика',
            progress: 45,
            deadline: '20 августа',
            status: 'active',
            tasks: 15,
            completedTasks: 7
        },
        {
            id: 3,
            name: 'История: Древняя Русь',
            progress: 90,
            deadline: '10 августа',
            status: 'urgent',
            tasks: 8,
            completedTasks: 7
        },
        {
            id: 4,
            name: 'Английский: Present Perfect',
            progress: 60,
            deadline: '12 августа',
            status: 'active',
            tasks: 10,
            completedTasks: 6
        }
    ];

    const studyPlan = [
        {
            time: '08:00-09:00',
            subject: 'Математика',
            topic: 'Повторение тригонометрии',
            type: 'review'
        },
        {
            time: '09:15-10:15',
            subject: 'Физика',
            topic: 'Решение задач по электродинамике',
            type: 'practice'
        },
        {
            time: '10:30-11:30',
            subject: 'Английский',
            topic: 'Грамматические упражнения',
            type: 'homework'
        },
        {
            time: '15:00-16:00',
            subject: 'История',
            topic: 'Подготовка к контрольной',
            type: 'exam'
        }
    ];

    const toggleGoal = (id) => {
        setGoals(goals.map(goal => 
            goal.id === id ? { ...goal, completed: !goal.completed } : goal
        ));
    };

    const addGoal = () => {
        if (newGoal.trim()) {
            const newGoalObj = {
                id: Date.now(),
                text: newGoal,
                completed: false
            };
            setGoals([...goals, newGoalObj]);
            setNewGoal('');
        }
    };

    const getModuleStatusClass = (status) => {
        switch (status) {
            case 'urgent': return styles.moduleUrgent;
            case 'active': return styles.moduleActive;
            case 'completed': return styles.moduleCompleted;
            default: return styles.moduleActive;
        }
    };

    const getTaskTypeIcon = (type) => {
        switch (type) {
            case 'review': return '📚';
            case 'practice': return '✍️';
            case 'homework': return '📝';
            case 'exam': return '🎯';
            default: return '📖';
        }
    };

    const generateAIPlan = () => {
        alert('Генерация плана с помощью ИИ (демо)');
    };

    return (
        <div className={styles.planningContainer}>
            <div className={styles.modulesSection}>
                <div className={styles.sectionHeader}>
                    <div className={styles.headerContent}>
                        <h2>📚 Учебные модули</h2>
                        <p>Отслеживайте прогресс по всем предметам</p>
                    </div>
                    <button className={styles.generateBtn} onClick={generateAIPlan}>
                        🤖 Сгенерировать план ИИ
                    </button>
                </div>
                
                <div className={styles.modulesList}>
                    {modules.map(module => (
                        <div key={module.id} className={`${styles.moduleItem} ${getModuleStatusClass(module.status)}`}>
                            <div className={styles.moduleProgress}>
                                <svg className={styles.progressCircle} viewBox="0 0 36 36">
                                    <path
                                        className={styles.progressCircleBg}
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path
                                        className={styles.progressCircleFill}
                                        strokeDasharray={`${module.progress}, 100`}
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                </svg>
                                <div className={styles.progressText}>{module.progress}%</div>
                            </div>
                            
                            <div className={styles.moduleInfo}>
                                <h3 className={styles.moduleName}>{module.name}</h3>
                                <div className={styles.moduleDetails}>
                                    <span className={styles.moduleDeadline}>📅 Дедлайн: {module.deadline}</span>
                                    <span className={styles.moduleTasks}>
                                        {module.completedTasks}/{module.tasks} заданий
                                    </span>
                                </div>
                            </div>
                            
                            <div className={styles.moduleActions}>
                                <button className={styles.moduleBtn}>📝</button>
                                <button className={styles.moduleBtn}>📊</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.rightPanel}>
                {/* Личные цели */}
                <div className={styles.goalsSection}>
                    <div className={styles.goalsHeader}>
                        <h2>🎯 Личные цели</h2>
                        <span className={styles.goalsProgress}>
                            {goals.filter(g => g.completed).length}/{goals.length}
                        </span>
                    </div>
                    
                    <div className={styles.goalsList}>
                        {goals.map(goal => (
                            <div key={goal.id} className={styles.goalItem}>
                                <div 
                                    className={`${styles.goalCheckbox} ${goal.completed ? styles.checked : ''}`}
                                    onClick={() => toggleGoal(goal.id)}
                                >
                                    {goal.completed && <span className={styles.checkmark}>✓</span>}
                                </div>
                                <span className={`${styles.goalText} ${goal.completed ? styles.completed : ''}`}>
                                    {goal.text}
                                </span>
                            </div>
                        ))}
                    </div>
                    
                    <div className={styles.addGoalSection}>
                        <input
                            type="text"
                            className={styles.goalInput}
                            placeholder="Новая цель..."
                            value={newGoal}
                            onChange={(e) => setNewGoal(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                        />
                        <button className={styles.addGoalBtn} onClick={addGoal}>
                            ➕
                        </button>
                    </div>
                </div>

                {/* План на день */}
                <div className={styles.dailyPlanSection}>
                    <div className={styles.planHeader}>
                        <h3>📅 План на сегодня</h3>
                        <button className={styles.editPlanBtn}>✏️</button>
                    </div>
                    
                    <div className={styles.planList}>
                        {studyPlan.map((item, index) => (
                            <div key={index} className={styles.planItem}>
                                <div className={styles.planTime}>{item.time}</div>
                                <div className={styles.planContent}>
                                    <div className={styles.planSubject}>
                                        <span className={styles.planIcon}>{getTaskTypeIcon(item.type)}</span>
                                        {item.subject}
                                    </div>
                                    <div className={styles.planTopic}>{item.topic}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Статистика недели */}
                <div className={styles.weekStatsSection}>
                    <h3>📊 Статистика недели</h3>
                    <div className={styles.statsGrid}>
                        <div className={styles.statItem}>
                            <div className={styles.statValue}>24</div>
                            <div className={styles.statLabel}>Часов учебы</div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={styles.statValue}>18</div>
                            <div className={styles.statLabel}>Заданий выполнено</div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={styles.statValue}>85%</div>
                            <div className={styles.statLabel}>Эффективность</div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={styles.statValue}>3</div>
                            <div className={styles.statLabel}>Цели достигнуто</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Planning;