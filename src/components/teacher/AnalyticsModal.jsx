import React, { useState } from 'react';
import styles from './AnalyticsModal.module.css';

const AnalyticsModal = ({ isOpen, onClose, analyticsData = {} }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const {
    totalStudents = 0,
    activeStudents = 0,
    completedTasks = 0,
    totalTasks = 0,
    weeklyActivity = [],
    topPerformers = []
  } = analyticsData;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const activityRate = totalStudents > 0 ? Math.round((activeStudents / totalStudents) * 100) : 0;

  const mockWeeklyData = [
    { day: 'Пн', tasks: 12 },
    { day: 'Вт', tasks: 18 },
    { day: 'Ср', tasks: 15 },
    { day: 'Чт', tasks: 22 },
    { day: 'Пт', tasks: 19 },
    { day: 'Сб', tasks: 8 },
    { day: 'Вс', tasks: 5 }
  ];

  const mockTopStudents = [
    { name: 'Анна Иванова', score: 98, tasks: 15 },
    { name: 'Петр Сидоров', score: 95, tasks: 14 },
    { name: 'Мария Петрова', score: 92, tasks: 13 }
  ];

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>📊 Аналитика</h2>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        <div className={styles.content}>
          {/* Переключатель периода */}
          <div className={styles.toolbar}>
            <div className={styles.periodSelector}>
              {['week', 'month', 'year'].map((period) => (
                <button
                  key={period}
                  className={`${styles.periodBtn} ${selectedPeriod === period ? styles.active : ''}`}
                  onClick={() => setSelectedPeriod(period)}
                >
                  {{
                    week: 'Неделя',
                    month: 'Месяц',
                    year: 'Год'
                  }[period]}
                </button>
              ))}
            </div>
          </div>

          {/* Аналитика (карточки) */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>👥</div>
              <div className={styles.statContent}>
                <h3>{totalStudents}</h3>
                <p>Всего учеников</p>
                <small>{activeStudents} активных</small>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>📝</div>
              <div className={styles.statContent}>
                <h3>{completedTasks}</h3>
                <p>Выполнено заданий</p>
                <small>из {totalTasks} всего</small>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>✅</div>
              <div className={styles.statContent}>
                <h3>{completionRate}%</h3>
                <p>Процент выполнения</p>
                <small>за выбранный период</small>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>🔥</div>
              <div className={styles.statContent}>
                <h3>{activityRate}%</h3>
                <p>Активность учеников</p>
                <small>регулярно выполняют</small>
              </div>
            </div>
          </div>

          {/* Графики и топ-ученики */}
          <div className={styles.chartsSection}>
            <div className={styles.chartCard}>
              <h3>📈 Активность по дням</h3>
              <div className={styles.barChart}>
                {mockWeeklyData.map((item, index) => (
                  <div key={index} className={styles.barWrapper}>
                    <div
                      className={styles.bar}
                      style={{
                        height: `${(item.tasks / 25) * 100}%`,
                        background: `linear-gradient(to top, #B799FF, #9966CC)`
                      }}
                    ></div>
                    <span className={styles.barLabel}>{item.day}</span>
                    <small className={styles.barValue}>{item.tasks}</small>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.chartCard}>
              <h3>🏆 Лучшие ученики</h3>
              <div className={styles.topList}>
                {mockTopStudents.map((student, index) => (
                  <div key={index} className={styles.topStudent}>
                    <div className={styles.rank}>#{index + 1}</div>
                    <div className={styles.studentInfo}>
                      <span className={styles.studentName}>{student.name}</span>
                      <small>{student.tasks} заданий</small>
                    </div>
                    <div className={styles.score}>{student.score}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Инсайты */}
          <div className={styles.insights}>
            <h3>💡 Инсайты</h3>
            <div className={styles.insightsList}>
              <div className={styles.insight}>
                <span className={styles.insightIcon}>📊</span>
                <div>
                  <strong>Лучший день недели:</strong> Четверг - больше всего выполненных заданий
                </div>
              </div>
              <div className={styles.insight}>
                <span className={styles.insightIcon}>⏰</span>
                <div>
                  <strong>Пик активности:</strong> 15:00–17:00 - самое активное время учеников
                </div>
              </div>
              <div className={styles.insight}>
                <span className={styles.insightIcon}>🎯</span>
                <div>
                  <strong>Рекомендация:</strong> Добавьте больше заданий на выходные для повышения активности
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsModal;
