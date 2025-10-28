import React, { useState } from 'react';
import styles from './Journal.module.css';

function Journal() {
    const [selectedQuarter, setSelectedQuarter] = useState('current');

    const quarterOptions = [
        { value: 'current', label: 'Текущая четверть' },
        { value: 'q1', label: '1 четверть' },
        { value: 'q2', label: '2 четверть' },
        { value: 'q3', label: '3 четверть' },
        { value: 'q4', label: '4 четверть' }
    ];

    const journalData = [
        {
            subject: 'Математика',
            grades: [5, 4, null, 5, 5],
            average: 4.75,
            final: 5
        },
        {
            subject: 'Физика',
            grades: [4, null, 3, 4, 4],
            average: 3.75,
            final: 4
        },
        {
            subject: 'Английский язык',
            grades: [null, 5, 5, null, 4],
            average: 4.67,
            final: 5
        },
        {
            subject: 'История',
            grades: [5, 5, null, 4, 5],
            average: 4.75,
            final: 5
        },
        {
            subject: 'Химия',
            grades: [3, 4, 3, null, 4],
            average: 3.50,
            final: 4
        },
        {
            subject: 'Литература',
            grades: [null, 5, 4, 5, null],
            average: 4.67,
            final: 5
        }
    ];

    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт'];

    const getGradeClass = (grade) => {
        if (grade === null) return '';
        if (grade >= 5) return styles.gradeExcellent;
        if (grade >= 4) return styles.gradeGood;
        if (grade >= 3) return styles.gradeSatisfactory;
        return styles.gradePoor;
    };

    const exportToPDF = () => {
        // Здесь будет логика экспорта в PDF
        alert('Экспорт в PDF (демо)');
    };

    const overallAverage = journalData.reduce((sum, subject) => sum + subject.average, 0) / journalData.length;
    const attendance = 92; // %
    const missedLessons = 2;
    const classRank = 3;

    return (
        <div className={styles.journalContainer}>
            <div className={styles.journalHeader}>
                <h2>📖 Электронный журнал</h2>
                <div className={styles.headerControls}>
                    <select 
                        className={styles.quarterSelect}
                        value={selectedQuarter}
                        onChange={(e) => setSelectedQuarter(e.target.value)}
                    >
                        {quarterOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <button className={styles.exportBtn} onClick={exportToPDF}>
                        📄 Экспорт в PDF
                    </button>
                </div>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.journalTable}>
                    <thead>
                        <tr>
                            <th className={styles.subjectColumn}>Предмет</th>
                            {weekDays.map(day => (
                                <th key={day} className={styles.dayColumn}>{day}</th>
                            ))}
                            <th className={styles.averageColumn}>Средний балл</th>
                            <th className={styles.finalColumn}>Итоговая</th>
                        </tr>
                    </thead>
                    <tbody>
                        {journalData.map((subject, index) => (
                            <tr key={index} className={styles.subjectRow}>
                                <td className={styles.subjectName}>{subject.subject}</td>
                                {subject.grades.map((grade, gradeIndex) => (
                                    <td key={gradeIndex} className={styles.gradeCell}>
                                        {grade !== null && (
                                            <span className={`${styles.grade} ${getGradeClass(grade)}`}>
                                                {grade}
                                            </span>
                                        )}
                                        {grade === null && <span className={styles.noGrade}>-</span>}
                                    </td>
                                ))}
                                <td className={styles.averageCell}>
                                    <span className={styles.averageValue}>
                                        {subject.average.toFixed(2)}
                                    </span>
                                </td>
                                <td className={styles.finalCell}>
                                    <span className={`${styles.finalGrade} ${getGradeClass(subject.final)}`}>
                                        {subject.final}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className={styles.summarySection}>
                <div className={styles.summaryGrid}>
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryIcon}>📊</div>
                        <div className={styles.summaryContent}>
                            <div className={styles.summaryValue}>{overallAverage.toFixed(1)}</div>
                            <div className={styles.summaryLabel}>Общий средний балл</div>
                        </div>
                    </div>
                    
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryIcon}>✅</div>
                        <div className={styles.summaryContent}>
                            <div className={styles.summaryValue}>{attendance}%</div>
                            <div className={styles.summaryLabel}>Посещаемость</div>
                        </div>
                    </div>
                    
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryIcon}>❌</div>
                        <div className={styles.summaryContent}>
                            <div className={styles.summaryValue}>{missedLessons}</div>
                            <div className={styles.summaryLabel}>Пропущено уроков</div>
                        </div>
                    </div>
                    
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryIcon}>🏆</div>
                        <div className={styles.summaryContent}>
                            <div className={styles.summaryValue}>{classRank} место</div>
                            <div className={styles.summaryLabel}>В рейтинге класса</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.detailsSection}>
                <div className={styles.progressChart}>
                    <h3>Динамика успеваемости</h3>
                    <div className={styles.chartContainer}>
                        <div className={styles.chartBars}>
                            {[4.2, 4.1, 4.3, 4.3, 4.3].map((value, index) => (
                                <div key={index} className={styles.chartBar}>
                                    <div 
                                        className={styles.chartBarFill}
                                        style={{ height: `${(value / 5) * 100}%` }}
                                    ></div>
                                    <span className={styles.chartLabel}>
                                        {['Сен', 'Окт', 'Ноя', 'Дек', 'Янв'][index]}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className={styles.chartLegend}>
                            <span>Средний балл по месяцам</span>
                        </div>
                    </div>
                </div>

                <div className={styles.subjectAnalysis}>
                    <h3>Анализ по предметам</h3>
                    <div className={styles.subjectsList}>
                        {journalData.map((subject, index) => (
                            <div key={index} className={styles.subjectAnalysisItem}>
                                <div className={styles.subjectInfo}>
                                    <span className={styles.subjectTitle}>{subject.subject}</span>
                                    <div className={styles.subjectProgress}>
                                        <div 
                                            className={styles.progressBar}
                                            style={{ width: `${(subject.average / 5) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className={styles.subjectMetrics}>
                                    <span className={`${styles.averageBadge} ${getGradeClass(Math.round(subject.average))}`}>
                                        {subject.average.toFixed(1)}
                                    </span>
                                    <span className={styles.trend}>
                                        {subject.average >= 4.5 ? '📈' : subject.average >= 4 ? '➡️' : '📉'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Journal;