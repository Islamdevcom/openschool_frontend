import React, { useState } from 'react';
import './ErrorAnalysis.css';

function ErrorAnalysis({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        analysisType: '',
        subject: '',
        grade: '',
        topic: '',
        workType: '',
        errorDescription: ''
    });
    const [loadingStep, setLoadingStep] = useState(0);

    const analysisTypes = [
        { id: 'individual', icon: '👤', name: 'Индивидуальный', desc: 'Анализ работы одного ученика' },
        { id: 'class', icon: '👥', name: 'Классный', desc: 'Анализ типичных ошибок класса' },
        { id: 'topic', icon: '📚', name: 'По теме', desc: 'Частые ошибки по определенной теме' },
        { id: 'test', icon: '📝', name: 'По тесту/СОР', desc: 'Анализ результатов теста' }
    ];

    const subjects = [
        'Математика', 'Алгебра', 'Геометрия', 'Физика', 'Химия', 'Биология',
        'История', 'География', 'Русский язык',
        'Казахский язык', 'Английский язык', 'Информатика'
    ];

    const workTypes = [
        'Контрольная работа', 'СОР', 'СОЧ', 'Домашняя работа',
        'Самостоятельная работа', 'Тест', 'Диктант', 'Сочинение'
    ];

    const loadingSteps = [
        { icon: '⏳', text: 'Анализируем данные...' },
        { icon: '📥', text: 'Выявляем типичные ошибки...' },
        { icon: '✨', text: 'Формируем рекомендации...' },
        { icon: '📝', text: 'Создаем отчет...' }
    ];

    const infoList = [
        'Классификация ошибок по типам',
        'Причины возникновения ошибок',
        'Рекомендации по устранению',
        'Упражнения для отработки',
        'Готовый отчет для родителей'
    ];

    const sampleErrors = [
        {
            type: 'Вычислительные ошибки',
            count: 12,
            percent: 35,
            examples: ['Ошибки в умножении', 'Неправильный порядок действий'],
            recommendation: 'Повторить таблицу умножения, практиковать устный счет'
        },
        {
            type: 'Ошибки в применении формул',
            count: 8,
            percent: 24,
            examples: ['Путают формулы площади', 'Неверная подстановка значений'],
            recommendation: 'Составить справочник формул, решать задачи по образцу'
        },
        {
            type: 'Невнимательность',
            count: 7,
            percent: 21,
            examples: ['Пропуск знаков', 'Неправильное списывание условия'],
            recommendation: 'Проверка решения, работа с черновиком'
        },
        {
            type: 'Непонимание условия',
            count: 7,
            percent: 20,
            examples: ['Неверная интерпретация задачи', 'Пропуск важных данных'],
            recommendation: 'Разбор условия по шагам, выделение ключевых слов'
        }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const selectAnalysisType = (typeId) => {
        setFormData(prev => ({ ...prev, analysisType: typeId }));
    };

    const handleSubmit = () => {
        if (!formData.analysisType) {
            alert('Пожалуйста, выберите тип анализа');
            return;
        }
        if (!formData.subject || !formData.grade || !formData.topic) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }
        setStep(2);
        simulateLoading();
    };

    const simulateLoading = () => {
        let currentStep = 0;
        const interval = setInterval(() => {
            currentStep++;
            setLoadingStep(currentStep);
            if (currentStep >= loadingSteps.length) {
                clearInterval(interval);
                setTimeout(() => setStep(3), 500);
            }
        }, 1000);
    };

    const handleReset = () => {
        setStep(1);
        setLoadingStep(0);
        setFormData({
            analysisType: '',
            subject: '',
            grade: '',
            topic: '',
            workType: '',
            errorDescription: ''
        });
    };

    const handleClose = () => {
        handleReset();
        onClose();
    };

    const getAnalysisTypeName = (typeId) => {
        const type = analysisTypes.find(t => t.id === typeId);
        return type ? type.name : '';
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
                            {step === 1 && 'Настройка анализа'}
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
                            Настройка
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
                                <h3 className="section-title">Тип анализа</h3>
                                <div className="analysis-types-grid">
                                    {analysisTypes.map(type => (
                                        <div
                                            key={type.id}
                                            className={`analysis-type-card ${formData.analysisType === type.id ? 'selected' : ''}`}
                                            onClick={() => selectAnalysisType(type.id)}
                                        >
                                            <div className="analysis-type-icon">{type.icon}</div>
                                            <div className="analysis-type-name">{type.name}</div>
                                            <div className="analysis-type-desc">{type.desc}</div>
                                        </div>
                                    ))}
                                </div>

                                <h3 className="section-title" style={{ marginTop: '30px' }}>Основная информация</h3>
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
                                        <label>Тема <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="topic"
                                            value={formData.topic}
                                            onChange={handleInputChange}
                                            placeholder="Например: Квадратные уравнения"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Тип работы</label>
                                        <select
                                            name="workType"
                                            value={formData.workType}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Выберите тип работы</option>
                                            {workTypes.map(type => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-grid full-width" style={{ marginTop: '20px' }}>
                                    <div className="form-group">
                                        <label>Описание ошибок (необязательно)</label>
                                        <textarea
                                            name="errorDescription"
                                            value={formData.errorDescription}
                                            onChange={handleInputChange}
                                            placeholder="Опишите замеченные ошибки или вставьте примеры работ учеников..."
                                        />
                                    </div>
                                </div>

                                <div className="info-box">
                                    <div className="info-box-title">
                                        <span>🔍</span> Что будет создано:
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
                                    Анализировать ошибки
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Loading */}
                    {step === 2 && (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <h3 className="loading-title">Анализируем ошибки</h3>
                            <p className="loading-subtitle">Выявляем типичные ошибки...</p>

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
                                <h3>Анализ ошибок готов!</h3>
                                <div className="result-badges">
                                    <span className="badge badge-success">Готово</span>
                                </div>
                            </div>

                            <div className="result-info">
                                <div className="result-info-item">
                                    <span>🔍</span> {getAnalysisTypeName(formData.analysisType)} анализ
                                </div>
                                <div className="result-info-item">
                                    <span>📚</span> {formData.subject}
                                </div>
                                <div className="result-info-item">
                                    <span>📊</span> {formData.topic}
                                </div>
                            </div>

                            <div className="errors-summary">
                                <div className="summary-title">
                                    Обнаружено типичных ошибок: <span className="error-count">34</span>
                                </div>
                            </div>

                            <div className="errors-list">
                                {sampleErrors.map((error, idx) => (
                                    <div key={idx} className="error-card">
                                        <div className="error-card-header">
                                            <div className="error-type">{error.type}</div>
                                            <div className="error-stats">
                                                <span className="error-count-badge">{error.count} ошибок</span>
                                                <span className="error-percent-badge">{error.percent}%</span>
                                            </div>
                                        </div>
                                        <div className="error-progress">
                                            <div className="error-progress-fill" style={{ width: `${error.percent}%` }}></div>
                                        </div>
                                        <div className="error-examples">
                                            <strong>Примеры:</strong> {error.examples.join(', ')}
                                        </div>
                                        <div className="error-recommendation">
                                            <span className="recommendation-icon">💡</span>
                                            <span>{error.recommendation}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="button-group result-buttons">
                                <button className="btn-cancel" onClick={handleReset}>
                                    Новый анализ
                                </button>
                                <button className="btn-generate btn-download">
                                    Скачать PDF
                                </button>
                                <button className="btn-generate btn-download">
                                    Скачать DOCX
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
