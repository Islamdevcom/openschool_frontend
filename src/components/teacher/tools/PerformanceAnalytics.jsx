import React, { useState } from 'react';
import './PerformanceAnalytics.css';

const PerformanceAnalytics = ({ isOpen, onClose }) => {
    const [step, setStep] = useState('form'); // form, loading, result
    const [formData, setFormData] = useState({
        period: '',
        student: 'all',
        grade: '',
        subjects: {
            math: true,
            physics: true,
            chemistry: true,
            biology: true,
            russian: true,
            english: true
        }
    });

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubjectChange = (subject) => {
        setFormData(prev => ({
            ...prev,
            subjects: {
                ...prev.subjects,
                [subject]: !prev.subjects[subject]
            }
        }));
    };

    const handleSubmit = () => {
        const hasSelectedSubjects = Object.values(formData.subjects).some(v => v);

        if (!formData.period || !formData.grade || !hasSelectedSubjects) {
            alert('Пожалуйста, заполните все обязательные поля и выберите хотя бы один предмет');
            return;
        }

        setStep('loading');
        setTimeout(() => {
            setStep('result');
        }, 2000);
    };

    const handleClose = () => {
        setStep('form');
        setFormData({
            period: '',
            student: 'all',
            grade: '',
            subjects: {
                math: true,
                physics: true,
                chemistry: true,
                biology: true,
                russian: true,
                english: true
            }
        });
        onClose();
    };

    const startOver = () => {
        setStep('form');
    };

    return (
        <div className="performance-analytics-overlay" onClick={handleClose}>
            <div className="performance-analytics-modal" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="performance-analytics-header">
                    <div className="performance-analytics-header-content">
                        <div className="performance-analytics-icon">📊</div>
                        <div>
                            <h2>Аналитика успеваемости</h2>
                            <p>Графики прогресса учеников</p>
                        </div>
                    </div>
                    <button className="performance-analytics-close" onClick={handleClose}>×</button>
                </div>

                {/* Content */}
                <div className="performance-analytics-content">
                    {/* Form Step */}
                    {step === 'form' && (
                        <div className="performance-analytics-form">
                            <div className="form-group">
                                <label className="form-label">
                                    Период<span className="required">*</span>
                                </label>
                                <select
                                    name="period"
                                    value={formData.period}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Выберите период</option>
                                    <option value="week">За неделю</option>
                                    <option value="month">За месяц</option>
                                    <option value="quarter">За четверть</option>
                                    <option value="year">За год</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Ученик (необязательно)</label>
                                <select
                                    name="student"
                                    value={formData.student}
                                    onChange={handleInputChange}
                                >
                                    <option value="all">Все ученики</option>
                                    <option value="student1">Иванов Иван</option>
                                    <option value="student2">Петрова Мария</option>
                                    <option value="student3">Сидоров Петр</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    Класс<span className="required">*</span>
                                </label>
                                <select
                                    name="grade"
                                    value={formData.grade}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Выберите класс</option>
                                    <option value="5">5 класс</option>
                                    <option value="6">6 класс</option>
                                    <option value="7">7 класс</option>
                                    <option value="8">8 класс</option>
                                    <option value="9">9 класс</option>
                                    <option value="10">10 класс</option>
                                    <option value="11">11 класс</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    Предметы<span className="required">*</span>
                                </label>
                                <div className="checkbox-group">
                                    <div
                                        className={`checkbox-item ${formData.subjects.math ? 'checked' : ''}`}
                                        onClick={() => handleSubjectChange('math')}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={formData.subjects.math}
                                            onChange={() => handleSubjectChange('math')}
                                        />
                                        <label>Математика</label>
                                    </div>
                                    <div
                                        className={`checkbox-item ${formData.subjects.physics ? 'checked' : ''}`}
                                        onClick={() => handleSubjectChange('physics')}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={formData.subjects.physics}
                                            onChange={() => handleSubjectChange('physics')}
                                        />
                                        <label>Физика</label>
                                    </div>
                                    <div
                                        className={`checkbox-item ${formData.subjects.chemistry ? 'checked' : ''}`}
                                        onClick={() => handleSubjectChange('chemistry')}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={formData.subjects.chemistry}
                                            onChange={() => handleSubjectChange('chemistry')}
                                        />
                                        <label>Химия</label>
                                    </div>
                                    <div
                                        className={`checkbox-item ${formData.subjects.biology ? 'checked' : ''}`}
                                        onClick={() => handleSubjectChange('biology')}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={formData.subjects.biology}
                                            onChange={() => handleSubjectChange('biology')}
                                        />
                                        <label>Биология</label>
                                    </div>
                                    <div
                                        className={`checkbox-item ${formData.subjects.russian ? 'checked' : ''}`}
                                        onClick={() => handleSubjectChange('russian')}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={formData.subjects.russian}
                                            onChange={() => handleSubjectChange('russian')}
                                        />
                                        <label>Русский язык</label>
                                    </div>
                                    <div
                                        className={`checkbox-item ${formData.subjects.english ? 'checked' : ''}`}
                                        onClick={() => handleSubjectChange('english')}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={formData.subjects.english}
                                            onChange={() => handleSubjectChange('english')}
                                        />
                                        <label>Английский</label>
                                    </div>
                                </div>
                            </div>

                            <div className="info-box">
                                <div className="info-box-title">📊 Что получу?</div>
                                <ul className="info-list">
                                    <li>График прогресса по дням</li>
                                    <li>Статистика по предметам</li>
                                    <li>Время на обучение</li>
                                    <li>Проблемные темы</li>
                                    <li>Рекомендации для улучшения</li>
                                </ul>
                            </div>

                            <div className="button-group">
                                <button className="btn-cancel" onClick={handleClose}>Отмена</button>
                                <button className="btn-generate" onClick={handleSubmit}>
                                    Показать аналитику
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Loading Step */}
                    {step === 'loading' && (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <div className="loading-text">Анализируем данные...</div>
                        </div>
                    )}

                    {/* Result Step */}
                    {step === 'result' && (
                        <div className="result-container">
                            {/* Статистика в карточках */}
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <div className="stat-icon">📈</div>
                                    <div className="stat-value">4.2</div>
                                    <div className="stat-label">Средний балл</div>
                                    <div className="stat-trend up">↑ +0.3 за месяц</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon">⏱️</div>
                                    <div className="stat-value">24</div>
                                    <div className="stat-label">Часов обучения</div>
                                    <div className="stat-trend up">↑ +5 часов</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon">✅</div>
                                    <div className="stat-value">142</div>
                                    <div className="stat-label">Задач выполнено</div>
                                    <div className="stat-trend up">↑ +28 задач</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon">🎯</div>
                                    <div className="stat-value">87%</div>
                                    <div className="stat-label">Правильных ответов</div>
                                    <div className="stat-trend down">↓ -3%</div>
                                </div>
                            </div>

                            {/* График прогресса */}
                            <div className="chart-card">
                                <div className="chart-header">📈 График прогресса за месяц</div>
                                <div className="chart-placeholder">
                                    📊 Здесь будет интерактивный график<br/>
                                    (Линейный график с баллами по дням)
                                </div>
                            </div>

                            {/* Статистика по предметам */}
                            <div className="subjects-section">
                                <div className="section-header">📚 Статистика по предметам</div>

                                <div className="subject-item">
                                    <div className="subject-header">
                                        <span className="subject-name">Математика</span>
                                        <span className="subject-score">4.8 / 5.0</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill excellent" style={{width: '96%'}}></div>
                                    </div>
                                </div>

                                <div className="subject-item">
                                    <div className="subject-header">
                                        <span className="subject-name">Физика</span>
                                        <span className="subject-score">4.2 / 5.0</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill good" style={{width: '84%'}}></div>
                                    </div>
                                </div>

                                <div className="subject-item">
                                    <div className="subject-header">
                                        <span className="subject-name">Химия</span>
                                        <span className="subject-score">3.5 / 5.0</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill average" style={{width: '70%'}}></div>
                                    </div>
                                </div>

                                <div className="subject-item">
                                    <div className="subject-header">
                                        <span className="subject-name">Биология</span>
                                        <span className="subject-score">4.5 / 5.0</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill excellent" style={{width: '90%'}}></div>
                                    </div>
                                </div>

                                <div className="subject-item">
                                    <div className="subject-header">
                                        <span className="subject-name">Русский язык</span>
                                        <span className="subject-score">3.8 / 5.0</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill average" style={{width: '76%'}}></div>
                                    </div>
                                </div>

                                <div className="subject-item">
                                    <div className="subject-header">
                                        <span className="subject-name">Английский язык</span>
                                        <span className="subject-score">4.6 / 5.0</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill excellent" style={{width: '92%'}}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Проблемные темы */}
                            <div className="problems-section">
                                <div className="section-header">⚠️ Проблемные темы</div>

                                <div className="problem-item">
                                    <div className="problem-icon">📐</div>
                                    <div className="problem-content">
                                        <div className="problem-title">Квадратные уравнения</div>
                                        <div className="problem-desc">Математика • 12 ошибок • Нужна практика</div>
                                    </div>
                                </div>

                                <div className="problem-item">
                                    <div className="problem-icon">⚗️</div>
                                    <div className="problem-content">
                                        <div className="problem-title">Окислительно-восстановительные реакции</div>
                                        <div className="problem-desc">Химия • 8 ошибок • Повторить теорию</div>
                                    </div>
                                </div>

                                <div className="problem-item">
                                    <div className="problem-icon">📝</div>
                                    <div className="problem-content">
                                        <div className="problem-title">Пунктуация в сложных предложениях</div>
                                        <div className="problem-desc">Русский язык • 6 ошибок • Больше примеров</div>
                                    </div>
                                </div>
                            </div>

                            {/* Рекомендации */}
                            <div className="recommendations-section">
                                <div className="section-header">💡 Рекомендации</div>

                                <div className="recommendation-item">
                                    <div className="recommendation-icon">📚</div>
                                    <div className="recommendation-content">
                                        <div className="recommendation-title">Уделить больше внимания химии</div>
                                        <div className="recommendation-desc">
                                            Средний балл по химии ниже остальных предметов.
                                            Рекомендуем дополнительно позаниматься темой "Окислительно-восстановительные реакции"
                                        </div>
                                    </div>
                                </div>

                                <div className="recommendation-item">
                                    <div className="recommendation-icon">⏰</div>
                                    <div className="recommendation-content">
                                        <div className="recommendation-title">Увеличить время на практику</div>
                                        <div className="recommendation-desc">
                                            Больше решайте задач по математике - это поможет закрепить тему квадратных уравнений
                                        </div>
                                    </div>
                                </div>

                                <div className="recommendation-item">
                                    <div className="recommendation-icon">🎯</div>
                                    <div className="recommendation-content">
                                        <div className="recommendation-title">Отличный прогресс!</div>
                                        <div className="recommendation-desc">
                                            Средний балл вырос на 0.3 за месяц. Продолжайте в том же духе!
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Кнопки действий */}
                            <div className="action-buttons">
                                <button className="action-btn" onClick={() => alert('Функция скачивания отчета будет реализована через backend')}>
                                    <span className="action-btn-icon">📥</span>
                                    Скачать отчет
                                </button>
                                <button className="action-btn" onClick={() => alert('Экспорт данных в Excel/CSV')}>
                                    <span className="action-btn-icon">📊</span>
                                    Экспорт данных
                                </button>
                                <button className="action-btn" onClick={() => alert('Ссылка на отчет будет скопирована')}>
                                    <span className="action-btn-icon">📤</span>
                                    Поделиться
                                </button>
                                <button className="action-btn" onClick={() => alert('Аналитика сохранена!')}>
                                    <span className="action-btn-icon">💾</span>
                                    Сохранить
                                </button>
                            </div>

                            <div className="button-group" style={{marginTop: '30px'}}>
                                <button className="btn-cancel" onClick={startOver}>← Новый анализ</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PerformanceAnalytics;
