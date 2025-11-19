import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Dashboard.module.css';

function Dashboard() {
    const { t } = useTranslation();
    const scheduleData = [
        {
            time: '08:30-09:15',
            subject: 'Математика',
            teacher: 'Преп. Сидорова А.В.',
            room: 'Каб. 215',
            status: 'completed',
            statusText: 'Завершен'
        },
        {
            time: '09:30-10:15',
            subject: 'Физика',
            teacher: 'Преп. Козлов И.П.',
            room: 'Каб. 301',
            status: 'ongoing',
            statusText: 'Идёт'
        },
        {
            time: '10:30-11:15',
            subject: 'Английский язык',
            teacher: 'Преп. Иванова М.С.',
            room: 'Онлайн',
            status: 'upcoming',
            statusText: 'Предстоит'
        },
        {
            time: '11:30-12:15',
            subject: 'История',
            teacher: 'Преп. Петров Д.А.',
            room: 'Каб. 105',
            status: 'upcoming',
            statusText: 'Предстоит'
        }
    ];

    const weakAreas = [
        { subject: 'Физика: Механика' },
        { subject: 'Математика: Интегралы' },
        { subject: 'Химия: Органика' }
    ];

    const recommendations = [
        {
            title: 'Олимпиада по математике',
            subtitle: 'Регистрация до 15 августа',
            gradient: 'linear-gradient(135deg, #667eea, #764ba2)'
        },
        {
            title: 'Курс: Python для начинающих',
            subtitle: 'Начало 12 августа',
            gradient: 'linear-gradient(135deg, #f093fb, #f5576c)'
        },
        {
            title: 'Вебинар: Подготовка к ЕГЭ',
            subtitle: 'Сегодня в 18:00',
            gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)'
        }
    ];

    const deadlines = [
        {
            title: 'Контрольная по математике',
            date: 'Завтра, 10 августа • 09:00',
            days: '1 день',
            urgency: 'urgent'
        },
        {
            title: 'Лабораторная по физике',
            date: '12 августа • 18:00',
            days: '3 дня',
            urgency: 'warning'
        },
        {
            title: 'Эссе по английскому',
            date: '14 августа • 23:59',
            days: '5 дней',
            urgency: 'normal'
        },
        {
            title: 'Проект по истории',
            date: '18 августа • 12:00',
            days: '9 дней',
            urgency: 'safe'
        }
    ];

    return (
        <div className={styles.dashboardGrid}>
            {/* Быстрые действия */}
            <div className={`${styles.card} ${styles.quickActionsCard}`}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>
                        <span className={styles.cardIcon}>⚡</span>
                        {t('student.dashboard.quickActions.title')}
                    </h2>
                </div>

                <div className={styles.quickActions}>
                    <h3>📝 {t('student.dashboard.quickActions.planningTitle')}</h3>
                    <p>{t('student.dashboard.quickActions.planningDescription')}</p>
                    
                    <div className={styles.quickStats}>
                        <div className={styles.quickStat}>
                            <div className={styles.quickStatValue}>4</div>
                            <div className={styles.quickStatLabel}>{t('student.dashboard.quickActions.todayAssignments')}</div>
                        </div>
                        <div className={styles.quickStat}>
                            <div className={styles.quickStatValue}>2.5ч</div>
                            <div className={styles.quickStatLabel}>{t('student.dashboard.quickActions.studyTime')}</div>
                        </div>
                    </div>

                    <button className={`${styles.btn} ${styles.btnPrimary} ${styles.btnFull}`}>
                        🚀 {t('student.dashboard.quickActions.createPlan')}
                    </button>

                    <div className={styles.quickButtons}>
                        <button className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSmall}`}>
                            📚 {t('student.dashboard.quickActions.review')}
                        </button>
                        <button className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSmall}`}>
                            ⚠️ {t('student.dashboard.quickActions.tests')}
                        </button>
                        <button className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSmall}`}>
                            🎯 {t('student.dashboard.quickActions.goals')}
                        </button>
                    </div>
                </div>
            </div>

            {/* Прогресс */}
            <div className={styles.progressCard}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>
                        <span className={styles.cardIcon}>📊</span>
                        {t('student.dashboard.progress.title')}
                    </h2>
                </div>

                <div className={styles.statsGrid}>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>78%</div>
                        <div className={styles.statLabel}>{t('student.dashboard.progress.completed')}</div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>4.3</div>
                        <div className={styles.statLabel}>{t('student.dashboard.progress.averageGrade')}</div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>92%</div>
                        <div className={styles.statLabel}>{t('student.dashboard.progress.attendance')}</div>
                    </div>
                </div>
                
                <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{width: '78%'}}></div>
                </div>

                <div className={styles.progressChart}>
                    <h4>{t('student.dashboard.progress.progressTitle')}</h4>
                    <div className={styles.chartBars}>
                        {[65, 72, 68, 75, 78].map((value, index) => (
                            <div key={index} className={styles.chartBar}>
                                <div className={styles.chartBarFill} style={{height: `${value}%`}}></div>
                                <span className={styles.chartLabel}>
                                    {[
                                        t('student.dashboard.progress.weekDays.mon'),
                                        t('student.dashboard.progress.weekDays.tue'),
                                        t('student.dashboard.progress.weekDays.wed'),
                                        t('student.dashboard.progress.weekDays.thu'),
                                        t('student.dashboard.progress.weekDays.fri')
                                    ][index]}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className={styles.chartStats}>
                        <div>
                            <span className={styles.chartValue}>+13%</span>
                            <span className={styles.chartText}>{t('student.dashboard.progress.weekGrowth')}</span>
                        </div>
                        <div>
                            <span className={styles.chartValue}>12</span>
                            <span className={styles.chartText}>{t('student.dashboard.progress.assignments')}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Слабые места */}
            <div className={`${styles.card} ${styles.weakCard}`}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>
                        <span className={styles.cardIcon}>⚠️</span>
                        {t('student.dashboard.weakAreas.title')}
                    </h2>
                </div>

                <div className={styles.weaknessList}>
                    {weakAreas.map((item, index) => (
                        <div key={index} className={styles.weaknessItem}>
                            <span className={styles.weaknessSubject}>{item.subject}</span>
                            <div className={styles.weaknessActions}>
                                <button className={`${styles.btn} ${styles.btnSecondary}`}>
                                    {t('student.dashboard.weakAreas.review')}
                                </button>
                                <button className={`${styles.btn} ${styles.btnPrimary}`}>
                                    {t('student.dashboard.weakAreas.requestAssignment')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Рекомендации */}
            <div className={`${styles.card} ${styles.recommendationsCard}`}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>
                        <span className={styles.cardIcon}>💡</span>
                        {t('student.dashboard.recommendations.title')}
                    </h2>
                </div>
                
                <div className={styles.recommendationsGrid}>
                    {recommendations.map((item, index) => (
                        <div 
                            key={index} 
                            className={styles.recommendationItem}
                            style={{background: item.gradient}}
                        >
                            <div className={styles.recommendationTitle}>{item.title}</div>
                            <div className={styles.recommendationSubtitle}>{item.subtitle}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Предстоящие дедлайны */}
            <div className={`${styles.card} ${styles.deadlinesCard}`}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>
                        <span className={styles.cardIcon}>📅</span>
                        {t('student.dashboard.deadlines.title')}
                    </h2>
                </div>
                
                <div className={styles.deadlinesList}>
                    {deadlines.map((item, index) => (
                        <div key={index} className={`${styles.deadlineItem} ${styles[item.urgency]}`}>
                            <div className={styles.deadlineContent}>
                                <div className={styles.deadlineTitle}>{item.title}</div>
                                <div className={styles.deadlineDate}>{item.date}</div>
                            </div>
                            <div className={styles.deadlineBadge}>{item.days}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Расписание на сегодня */}
            <div className={`${styles.card} ${styles.scheduleCard}`}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>
                        <span className={styles.cardIcon}>📅</span>
                        {t('student.dashboard.schedule.title')}
                    </h2>
                    <span className={styles.dateText}>09.08.2025</span>
                </div>

                <div className={styles.scheduleList}>
                    {scheduleData.map((item, index) => (
                        <div key={index} className={styles.scheduleItem}>
                            <div className={styles.scheduleTime}>{item.time}</div>
                            <div className={styles.scheduleDetails}>
                                <div className={styles.scheduleSubject}>{item.subject}</div>
                                <div className={styles.scheduleInfo}>{item.teacher} • {item.room}</div>
                            </div>
                            <span className={`${styles.scheduleStatus} ${styles[`status${item.status.charAt(0).toUpperCase() + item.status.slice(1)}`]}`}>
                                {t(`student.dashboard.schedule.status.${item.status}`)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;