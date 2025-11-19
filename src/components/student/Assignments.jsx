import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Assignments.module.css';

function Assignments() {
    const { t } = useTranslation();
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('deadline');

    const assignments = [
        {
            id: 1,
            subject: 'Математика',
            title: 'Контрольная работа по тригонометрии',
            deadline: '2025-08-10T23:59',
            status: 'pending',
            urgency: 'urgent',
            description: 'Решение тригонометрических уравнений и неравенств',
            type: 'test',
            points: 100
        },
        {
            id: 2,
            subject: 'Физика',
            title: 'Лабораторная работа №5',
            deadline: '2025-08-12T18:00',
            status: 'pending',
            urgency: 'soon',
            description: 'Исследование электромагнитной индукции',
            type: 'lab',
            points: 50
        },
        {
            id: 3,
            subject: 'Английский',
            title: 'Эссе: My Future Career',
            deadline: '2025-08-14T23:59',
            status: 'submitted',
            urgency: 'normal',
            description: 'Эссе на 300-400 слов о будущей карьере',
            type: 'essay',
            points: 75,
            grade: null
        },
        {
            id: 4,
            subject: 'История',
            title: 'Реферат: Петр I',
            deadline: '2025-08-06T12:00',
            status: 'graded',
            urgency: 'completed',
            description: 'Реформы Петра I и их влияние на Россию',
            type: 'project',
            points: 100,
            grade: 5
        },
        {
            id: 5,
            subject: 'Химия',
            title: 'Тест: Органическая химия',
            deadline: '2025-08-15T12:00',
            status: 'pending',
            urgency: 'normal',
            description: 'Основы органической химии, углеводороды',
            type: 'test',
            points: 80
        },
        {
            id: 6,
            subject: 'Литература',
            title: 'Анализ произведения',
            deadline: '2025-08-18T23:59',
            status: 'pending',
            urgency: 'normal',
            description: 'Анализ "Преступления и наказания" Достоевского',
            type: 'essay',
            points: 90
        }
    ];

    const filters = [
        { value: 'all', label: t('student.assignments.filters.all'), count: assignments.length },
        { value: 'pending', label: t('student.assignments.filters.pending'), count: assignments.filter(a => a.status === 'pending').length },
        { value: 'submitted', label: t('student.assignments.filters.submitted'), count: assignments.filter(a => a.status === 'submitted').length },
        { value: 'graded', label: t('student.assignments.filters.graded'), count: assignments.filter(a => a.status === 'graded').length }
    ];

    const getStatusClass = (status) => {
        switch (status) {
            case 'pending': return styles.statusPending;
            case 'submitted': return styles.statusSubmitted;
            case 'graded': return styles.statusGraded;
            default: return styles.statusPending;
        }
    };

    const getUrgencyClass = (urgency) => {
        switch (urgency) {
            case 'urgent': return styles.urgent;
            case 'soon': return styles.soon;
            case 'normal': return styles.normal;
            case 'completed': return styles.completed;
            default: return styles.normal;
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'test': return '📝';
            case 'lab': return '🔬';
            case 'essay': return '📄';
            case 'project': return '📊';
            default: return '📚';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending': return t('student.assignments.status.pending');
            case 'submitted': return t('student.assignments.status.submitted');
            case 'graded': return t('student.assignments.status.graded');
            default: return t('student.assignments.status.unknown');
        }
    };

    const formatDeadline = (deadline) => {
        const date = new Date(deadline);
        const now = new Date();
        const diff = date.getTime() - now.getTime();
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

        if (days < 0) return t('student.assignments.deadline.overdue');
        if (days === 0) return t('student.assignments.deadline.today');
        if (days === 1) return t('student.assignments.deadline.tomorrow');
        return t('student.assignments.deadline.days', { count: days });
    };

    const filteredAssignments = assignments.filter(assignment => {
        if (filter === 'all') return true;
        return assignment.status === filter;
    });

    const generateAIAssignment = () => {
        alert(t('student.assignments.generateDemo'));
    };

    return (
        <div className={styles.assignmentsContainer}>
            <div className={styles.assignmentsHeader}>
                <div className={styles.headerContent}>
                    <h2>📝 {t('student.assignments.title')}</h2>
                    <p>{t('student.assignments.description')}</p>
                </div>
                <button className={styles.generateBtn} onClick={generateAIAssignment}>
                    🤖 {t('student.assignments.generateAi')}
                </button>
            </div>

            <div className={styles.filtersSection}>
                <div className={styles.filterTabs}>
                    {filters.map(filterItem => (
                        <button
                            key={filterItem.value}
                            className={`${styles.filterTab} ${filter === filterItem.value ? styles.active : ''}`}
                            onClick={() => setFilter(filterItem.value)}
                        >
                            {filterItem.label}
                            <span className={styles.filterCount}>{filterItem.count}</span>
                        </button>
                    ))}
                </div>

                <div className={styles.sortSection}>
                    <select
                        className={styles.sortSelect}
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="deadline">{t('student.assignments.sort.deadline')}</option>
                        <option value="subject">{t('student.assignments.sort.subject')}</option>
                        <option value="status">{t('student.assignments.sort.status')}</option>
                        <option value="points">{t('student.assignments.sort.points')}</option>
                    </select>
                </div>
            </div>

            <div className={styles.assignmentsGrid}>
                {filteredAssignments.length > 0 ? (
                    filteredAssignments.map(assignment => (
                        <div key={assignment.id} className={`${styles.assignmentCard} ${getUrgencyClass(assignment.urgency)}`}>
                            <div className={styles.assignmentHeader}>
                                <div className={styles.assignmentSubject}>
                                    <span className={styles.typeIcon}>{getTypeIcon(assignment.type)}</span>
                                    {assignment.subject}
                                </div>
                                <span className={`${styles.assignmentStatus} ${getStatusClass(assignment.status)}`}>
                                    {getStatusText(assignment.status)}
                                </span>
                            </div>

                            <div className={styles.assignmentContent}>
                                <h3 className={styles.assignmentTitle}>{assignment.title}</h3>
                                <p className={styles.assignmentDescription}>{assignment.description}</p>
                                
                                <div className={styles.assignmentMeta}>
                                    <div className={styles.deadline}>
                                        ⏰ {formatDeadline(assignment.deadline)}
                                    </div>
                                    <div className={styles.points}>
                                        💎 {assignment.points} {t('student.assignments.points')}
                                    </div>
                                </div>

                                {assignment.grade && (
                                    <div className={styles.gradeSection}>
                                        <span className={styles.gradeLabel}>{t('student.assignments.grade')}:</span>
                                        <span className={`${styles.grade} ${styles[`grade${assignment.grade}`]}`}>
                                            {assignment.grade}/5
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className={styles.assignmentActions}>
                                {assignment.status === 'pending' && (
                                    <>
                                        <button className={`${styles.actionBtn} ${styles.primaryBtn}`}>
                                            {assignment.type === 'test' ? `▶️ ${t('student.assignments.actions.startTest')}` : `📤 ${t('student.assignments.actions.submitWork')}`}
                                        </button>
                                        <button className={`${styles.actionBtn} ${styles.secondaryBtn}`}>
                                            📋 {t('student.assignments.actions.details')}
                                        </button>
                                    </>
                                )}

                                {assignment.status === 'submitted' && (
                                    <button className={`${styles.actionBtn} ${styles.secondaryBtn}`}>
                                        👁️ {t('student.assignments.actions.viewResult')}
                                    </button>
                                )}

                                {assignment.status === 'graded' && (
                                    <button className={`${styles.actionBtn} ${styles.secondaryBtn}`}>
                                        📊 {t('student.assignments.actions.viewFeedback')}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>📝</div>
                        <h3 className={styles.emptyTitle}>{t('student.assignments.empty.title')}</h3>
                        <p className={styles.emptyText}>
                            {t('student.assignments.empty.description')}
                        </p>
                    </div>
                )}
            </div>

            {filteredAssignments.length > 0 && (
                <div className={styles.summarySection}>
                    <div className={styles.summaryCards}>
                        <div className={styles.summaryCard}>
                            <div className={styles.summaryIcon}>📊</div>
                            <div className={styles.summaryContent}>
                                <div className={styles.summaryValue}>
                                    {assignments.filter(a => a.status === 'pending').length}
                                </div>
                                <div className={styles.summaryLabel}>{t('student.assignments.summary.active')}</div>
                            </div>
                        </div>

                        <div className={styles.summaryCard}>
                            <div className={styles.summaryIcon}>⏰</div>
                            <div className={styles.summaryContent}>
                                <div className={styles.summaryValue}>
                                    {assignments.filter(a => a.urgency === 'urgent').length}
                                </div>
                                <div className={styles.summaryLabel}>{t('student.assignments.summary.urgent')}</div>
                            </div>
                        </div>

                        <div className={styles.summaryCard}>
                            <div className={styles.summaryIcon}>💎</div>
                            <div className={styles.summaryContent}>
                                <div className={styles.summaryValue}>
                                    {assignments.filter(a => a.status === 'pending').reduce((sum, a) => sum + a.points, 0)}
                                </div>
                                <div className={styles.summaryLabel}>{t('student.assignments.summary.possiblePoints')}</div>
                            </div>
                        </div>

                        <div className={styles.summaryCard}>
                            <div className={styles.summaryIcon}>🎯</div>
                            <div className={styles.summaryContent}>
                                <div className={styles.summaryValue}>
                                    {Math.round((assignments.filter(a => a.status === 'graded').length / assignments.length) * 100)}%
                                </div>
                                <div className={styles.summaryLabel}>{t('student.assignments.summary.completed')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Assignments;