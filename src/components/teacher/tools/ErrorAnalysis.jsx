import React, { useState } from 'react';
import './ErrorAnalysis.css';
import { evaluateStudentWork } from '../../../api/toolsService';

function ErrorAnalysis({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        subject: '',
        grade: '',
        taskType: '',
        studentCount: '',
        topic: '',
        errors: ''
    });
    const [loadingStep, setLoadingStep] = useState(0);
    const [generatedContent, setGeneratedContent] = useState(null);
    const [error, setError] = useState(null);

    const subjects = [
        'Математика', 'Алгебра', 'Геометрия', 'Физика', 'Химия', 'Биология',
        'История', 'География', 'Русский язык',
        'Казахский язык', 'Английский язык', 'Информатика'
    ];

    const taskTypes = [
        'СОЧ', 'СОР', 'Контрольная работа', 'Самостоятельная работа', 'Домашняя работа'
    ];

    const loadingSteps = [
        { icon: '⏳', text: 'Анализируем описание ошибок...' },
        { icon: '📥', text: 'Классифицируем типы ошибок...' },
        { icon: '✨', text: 'Подготавливаем рекомендации...' },
        { icon: '📝', text: 'Формируем отчет...' }
    ];

    const infoList = [
        'Таблица типичных ошибок',
        'Статистика по частоте ошибок',
        'Рекомендации для исправления',
        'План коррекционной работы',
        'Советы для следующих уроков'
    ];

    const sampleErrors = [
        {
            type: 'Ошибки в вычислениях',
            frequency: 'high',
            frequencyText: 'Высокая (75%)',
            description: 'Большинство учеников допускают арифметические ошибки при работе с отрицательными числами и дробями',
            recommendation: 'Провести дополнительную отработку базовых вычислительных навыков'
        },
        {
            type: 'Неправильное применение формул',
            frequency: 'medium',
            frequencyText: 'Средняя (45%)',
            description: 'Ученики путают формулы или применяют их некорректно',
            recommendation: 'Создать справочник формул с примерами применения'
        },
        {
            type: 'Ошибки в оформлении',
            frequency: 'low',
            frequencyText: 'Низкая (25%)',
            description: 'Небрежное оформление решений, отсутствие пояснений',
            recommendation: 'Показать образцы правильного оформления'
        }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.subject || !formData.grade || !formData.taskType || !formData.topic || !formData.errors) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }
        setStep(2);
        setError(null);

        // Simulate loading steps
        let currentStep = 0;
        const interval = setInterval(() => {
            currentStep++;
            setLoadingStep(currentStep);
            if (currentStep >= loadingSteps.length) {
                clearInterval(interval);
            }
        }, 800);

        try {
            const result = await evaluateStudentWork({
                subject: formData.subject,
                grade: formData.grade,
                topic: formData.topic,
                assignment: `${formData.taskType} - ${formData.topic}`,
                student_work: formData.errors,
                rubric: 'Анализ типичных ошибок'
            });

            clearInterval(interval);
            if (result.success) {
                setGeneratedContent(result.content);
            }
            setTimeout(() => setStep(3), 500);
        } catch (err) {
            clearInterval(interval);
            setError(err.message);
            // Fallback to demo data
            setTimeout(() => setStep(3), 500);
        }
    };

    const handleReset = () => {
        setStep(1);
        setLoadingStep(0);
        setGeneratedContent(null);
        setError(null);
        setFormData({
            subject: '',
            grade: '',
            taskType: '',
            studentCount: '',
            topic: '',
            errors: ''
        });
    };

    const handleClose = () => {
        handleReset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="error-analysis-overlay" onClick={handleClose}>
            <div className="error-analysis-modal" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="error-analysis-header">
                    <div className="error-analysis-header-content">
                        <div className="error-analysis-icon">🔍</div>
                        <div>
                            <h2>Анализ ошибок</h2>
                            <p>Выявление типичных ошибок учеников</p>
                        </div>
                    </div>
                    <button className="error-analysis-close" onClick={handleClose}>&times;</button>
                </div>

                {/* Progress Bar */}
                <div className="error-analysis-progress">
                    <div className="progress-info">
                        <span className="progress-title">
                            {step === 1 && 'Ввод данных'}
                            {step === 2 && 'Анализ ошибок...'}
                            {step === 3 && 'Анализ готов!'}
                        </span>
                        <span className="progress-percent">
                            {step === 1 && '0%'}
                            {step === 2 && '50%'}
                            {step === 3 && '100%'}
                        </span>
                    </div>
                    <div className="progress-bar-bg">
                        <div
                            className="progress-bar-fill"
                            style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
                        ></div>
                    </div>
                    <div className="progress-steps">
                        <span className={`progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                            Ввод данных
                        </span>
                        <span className={`progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                            Анализ
                        </span>
                        <span className={`progress-step ${step >= 3 ? 'active' : ''}`}>
                            Результат
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="error-analysis-content">
                    {/* Step 1: Form */}
                    {step === 1 && (
                        <div className="error-analysis-form">
                            <div className="form-section">
                                <h3 className="section-title">Основная информация</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Предмет <span className="required">*</span></label>
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Выберите предмет</option>
                                            {subjects.map(subj => (
                                                <option key={subj} value={subj}>{subj}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Класс <span className="required">*</span></label>
                                        <select
                                            name="grade"
                                            value={formData.grade}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Выберите класс</option>
                                            {[...Array(11)].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>{i + 1} класс</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Тип задания <span className="required">*</span></label>
                                        <select
                                            name="taskType"
                                            value={formData.taskType}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Выберите тип</option>
                                            {taskTypes.map(type => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Количество учеников</label>
                                        <input
                                            type="number"
                                            name="studentCount"
                                            value={formData.studentCount}
                                            onChange={handleInputChange}
                                            placeholder="25"
                                            min="1"
                                            max="50"
                                        />
                                    </div>
                                </div>

                                <div className="form-grid full-width" style={{ marginTop: '20px' }}>
                                    <div className="form-group">
                                        <label>Тема работы <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="topic"
                                            value={formData.topic}
                                            onChange={handleInputChange}
                                            placeholder="Например: Квадратные уравнения"
                                        />
                                    </div>
                                </div>

                                <div className="form-grid full-width" style={{ marginTop: '20px' }}>
                                    <div className="form-group">
                                        <label>Описание ошибок <span className="required">*</span></label>
                                        <textarea
                                            name="errors"
                                            value={formData.errors}
                                            onChange={handleInputChange}
                                            placeholder="Опишите типичные ошибки, которые допустили ученики:
- Ошибки в вычислениях
- Неправильное применение формул
- Ошибки в оформлении
- И т.д."
                                        />
                                    </div>
                                </div>

                                <div className="info-box">
                                    <div className="info-box-title">
                                        <span>🔍</span> Что будет в анализе:
                                    </div>
                                    <ul className="info-list">
                                        {infoList.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="button-group">
                                <button className="btn-cancel" onClick={handleClose}>
                                    Отмена
                                </button>
                                <button className="btn-generate" onClick={handleSubmit}>
                                    Провести анализ
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Loading */}
                    {step === 2 && (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <h3 className="loading-title">Анализируем ошибки</h3>
                            <p className="loading-subtitle">Обрабатываем данные...</p>

                            <div className="loading-steps-list">
                                {loadingSteps.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`loading-step-item ${
                                            loadingStep > index ? 'completed' :
                                            loadingStep === index ? 'active' : ''
                                        }`}
                                    >
                                        <span>{item.icon}</span>
                                        <span>{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Result */}
                    {step === 3 && (
                        <div className="result-container">
                            <div className="result-header">
                                <h3>Анализ ошибок завершен!</h3>
                                <div className="result-badges">
                                    <span className="badge badge-success">Готово</span>
                                </div>
                            </div>

                            <div className="result-info">
                                <div className="result-info-item">
                                    <span>📚</span> {formData.subject}
                                </div>
                                <div className="result-info-item">
                                    <span>🎓</span> {formData.grade} класс
                                </div>
                                <div className="result-info-item">
                                    <span>📊</span> {formData.topic}
                                </div>
                            </div>

                            {generatedContent ? (
                                <div
                                    className="api-generated-content"
                                    dangerouslySetInnerHTML={{ __html: generatedContent }}
                                    style={{
                                        padding: '20px',
                                        background: '#f9fafb',
                                        borderRadius: '8px',
                                        lineHeight: '1.6'
                                    }}
                                />
                            ) : (
                            <div className="analysis-preview">
                                {/* Статистика */}
                                <div className="analysis-section">
                                    <div className="analysis-section-title">
                                        <span>📊</span> Общая статистика
                                    </div>
                                    <div className="stats-grid">
                                        <div className="stat-card">
                                            <div className="stat-value">8</div>
                                            <div className="stat-label">Типов ошибок</div>
                                        </div>
                                        <div className="stat-card">
                                            <div className="stat-value">3</div>
                                            <div className="stat-label">Критических ошибок</div>
                                        </div>
                                        <div className="stat-card">
                                            <div className="stat-value">65%</div>
                                            <div className="stat-label">Повторяющихся</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Типичные ошибки */}
                                <div className="analysis-section">
                                    <div className="analysis-section-title">
                                        <span>❌</span> Типичные ошибки
                                    </div>

                                    {sampleErrors.map((error, idx) => (
                                        <div key={idx} className="error-item">
                                            <div className="error-item-header">
                                                <div className="error-type">{idx + 1}. {error.type}</div>
                                                <div className={`error-frequency ${error.frequency}`}>
                                                    {error.frequencyText}
                                                </div>
                                            </div>
                                            <div className="error-description">
                                                {error.description}
                                            </div>
                                            <div className="error-recommendation">
                                                <span>💡</span> Рекомендация: {error.recommendation}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* План коррекции */}
                                <div className="analysis-section">
                                    <div className="analysis-section-title">
                                        <span>📝</span> План коррекционной работы
                                    </div>

                                    <div className="correction-plan">
                                        <div className="plan-block">
                                            <strong>1. Краткосрочные меры (1-2 урока):</strong>
                                            <ul>
                                                <li>Разобрать типичные ошибки на следующем уроке</li>
                                                <li>Провести работу над ошибками</li>
                                                <li>Дать дополнительные упражнения</li>
                                            </ul>
                                        </div>
                                        <div className="plan-block">
                                            <strong>2. Среднесрочные меры (1-2 недели):</strong>
                                            <ul>
                                                <li>Включить отработку проблемных тем в каждый урок</li>
                                                <li>Организовать взаимопроверку</li>
                                                <li>Провести консультации для отстающих</li>
                                            </ul>
                                        </div>
                                        <div className="plan-block">
                                            <strong>3. Долгосрочные меры:</strong>
                                            <ul>
                                                <li>Усилить контроль базовых навыков</li>
                                                <li>Разработать индивидуальные задания</li>
                                                <li>Отслеживать прогресс учеников</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )}

                            <div className="button-group result-buttons">
                                <button className="btn-cancel" onClick={handleReset}>
                                    Новый анализ
                                </button>
                                <button className="btn-generate btn-download">
                                    Скачать DOCX
                                </button>
                                <button className="btn-generate btn-download">
                                    Скачать PDF
                                </button>
                                <button className="btn-generate btn-save">
                                    Сохранить
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ErrorAnalysis;
