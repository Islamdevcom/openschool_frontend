import React, { useState } from 'react';
import './Worksheets.css';
import { generateWorksheet } from '../../../api/toolsService';

function Worksheets({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        topic: '',
        subject: '',
        grade: '',
        taskCount: '10',
        additional: ''
    });
    const [selectedTaskTypes, setSelectedTaskTypes] = useState(new Set());
    const [loadingStep, setLoadingStep] = useState(0);
    const [generatedContent, setGeneratedContent] = useState(null);
    const [error, setError] = useState(null);

    const subjects = [
        'Математика', 'Русский язык', 'Казахский язык', 'Английский язык',
        'Физика', 'Химия', 'Биология', 'История', 'География', 'Информатика'
    ];

    const taskTypes = [
        { id: 'test', label: 'Тесты (выбор ответа)' },
        { id: 'problem', label: 'Задачи (решение)' },
        { id: 'fillblank', label: 'Заполнить пропуски' },
        { id: 'match', label: 'Соединить пары' },
        { id: 'truefalse', label: 'Верно/Неверно' },
        { id: 'shortanswer', label: 'Короткий ответ' }
    ];

    const loadingSteps = [
        { icon: '⏳', text: 'Анализируем тему...' },
        { icon: '📥', text: 'Подбираем задания...' },
        { icon: '✨', text: 'Формируем рабочий лист...' },
        { icon: '📝', text: 'Создаем ответы...' }
    ];

    const infoList = [
        'Заголовок с темой и информацией',
        'Задания выбранных типов',
        'Место для ответов',
        'Отдельный лист с ответами',
        'Готов для печати (PDF/DOCX)'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleTaskType = (typeId) => {
        setSelectedTaskTypes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(typeId)) {
                newSet.delete(typeId);
            } else {
                newSet.add(typeId);
            }
            return newSet;
        });
    };

    const handleSubmit = async () => {
        if (!formData.topic || !formData.subject || !formData.grade) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }
        if (selectedTaskTypes.size === 0) {
            alert('Пожалуйста, выберите хотя бы один тип заданий');
            return;
        }
        setStep(2);
        setError(null);

        let currentStep = 0;
        const interval = setInterval(() => {
            currentStep++;
            setLoadingStep(currentStep);
            if (currentStep >= loadingSteps.length) {
                clearInterval(interval);
            }
        }, 800);

        try {
            const result = await generateWorksheet({
                subject: formData.subject,
                topic: formData.topic,
                grade: formData.grade,
                num_tasks: parseInt(formData.taskCount) || 10,
                difficulty: 'medium'
            });

            clearInterval(interval);
            if (result.success) {
                setGeneratedContent(result.content);
            }
            setStep(3);
        } catch (err) {
            clearInterval(interval);
            setStep(3);
        }
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
        setGeneratedContent(null);
        setError(null);
        setFormData({
            topic: '',
            subject: '',
            grade: '',
            taskCount: '10',
            additional: ''
        });
        setSelectedTaskTypes(new Set());
    };

    const handleClose = () => {
        handleReset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="worksheets-overlay" onClick={handleClose}>
            <div className="worksheets-modal" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="worksheets-header">
                    <div className="worksheets-header-content">
                        <div className="worksheets-icon">📄</div>
                        <div>
                            <h2>Рабочие листы</h2>
                            <p>Упражнения и задания</p>
                        </div>
                    </div>
                    <button className="worksheets-close" onClick={handleClose}>&times;</button>
                </div>

                {/* Progress Bar */}
                <div className="worksheets-progress">
                    <div className="progress-info">
                        <span className="progress-title">
                            {step === 1 && 'Настройка рабочего листа'}
                            {step === 2 && 'Генерация заданий...'}
                            {step === 3 && 'Рабочий лист готов!'}
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
                            Генерация
                        </span>
                        <span className={`progress-step ${step >= 3 ? 'active' : ''}`}>
                            Результат
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="worksheets-content">
                    {/* Step 1: Form */}
                    {step === 1 && (
                        <div className="worksheets-form">
                            <div className="form-section">
                                <h3 className="section-title">Основная информация</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Тема <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="topic"
                                            value={formData.topic}
                                            onChange={handleInputChange}
                                            placeholder="Например: Умножение дробей"
                                        />
                                    </div>

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
                                        <label>Количество заданий</label>
                                        <input
                                            type="number"
                                            name="taskCount"
                                            value={formData.taskCount}
                                            onChange={handleInputChange}
                                            min="5"
                                            max="30"
                                            placeholder="10"
                                        />
                                    </div>
                                </div>

                                <div className="task-types-section">
                                    <label className="task-types-label">Типы заданий <span className="required">*</span></label>
                                    <div className="task-types-grid">
                                        {taskTypes.map(type => (
                                            <div
                                                key={type.id}
                                                className={`task-type-item ${selectedTaskTypes.has(type.id) ? 'selected' : ''}`}
                                                onClick={() => toggleTaskType(type.id)}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedTaskTypes.has(type.id)}
                                                    onChange={() => {}}
                                                />
                                                <span>{type.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="form-grid full-width" style={{ marginTop: '20px' }}>
                                    <div className="form-group">
                                        <label>Дополнительная информация</label>
                                        <textarea
                                            name="additional"
                                            value={formData.additional}
                                            onChange={handleInputChange}
                                            placeholder="Опишите что должно быть включено..."
                                        />
                                    </div>
                                </div>

                                <div className="info-box">
                                    <div className="info-box-title">
                                        <span>📋</span> Что будет в рабочем листе:
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
                                    Создать рабочий лист
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Loading */}
                    {step === 2 && (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <h3 className="loading-title">Создаем рабочий лист</h3>
                            <p className="loading-subtitle">Генерируем задания...</p>

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
                                <h3>Рабочий лист готов!</h3>
                                <div className="result-badges">
                                    <span className="badge badge-success">Готово</span>
                                </div>
                            </div>

                            <div className="result-info">
                                <div className="result-info-item">
                                    <span>📊</span> {formData.topic}
                                </div>
                                <div className="result-info-item">
                                    <span>📄</span> {formData.taskCount} заданий
                                </div>
                                <div className="result-info-item">
                                    <span>📚</span> {formData.subject}
                                </div>
                            </div>

                            <div className="worksheet-preview">
                                <div className="worksheet-title">
                                    Рабочий лист: {formData.topic}
                                </div>

                                <div className="task-section">
                                    <div className="task-section-title">Часть 1: Тестовые вопросы</div>
                                    <div className="task-item">
                                        <strong>1.</strong> Пример тестового вопроса по теме?<br/>
                                        А) Вариант 1<br/>
                                        Б) Вариант 2<br/>
                                        В) Вариант 3<br/>
                                        Г) Вариант 4
                                    </div>
                                    <div className="task-item">
                                        <strong>2.</strong> Еще один тестовый вопрос?<br/>
                                        А) Вариант 1<br/>
                                        Б) Вариант 2<br/>
                                        В) Вариант 3<br/>
                                        Г) Вариант 4
                                    </div>
                                </div>

                                <div className="task-section">
                                    <div className="task-section-title">Часть 2: Задачи</div>
                                    <div className="task-item">
                                        <strong>3.</strong> Пример задачи по теме...<br/>
                                        <div className="solution-area">
                                            Решение: _________________________________
                                        </div>
                                    </div>
                                </div>

                                <div className="task-section">
                                    <div className="task-section-title">Часть 3: Заполнить пропуски</div>
                                    <div className="task-item">
                                        <strong>4.</strong> В предложении: "Это пример ________ задания" нужно заполнить пропуск.
                                    </div>
                                </div>
                            </div>

                            <div className="button-group result-buttons">
                                <button className="btn-cancel" onClick={handleReset}>
                                    Создать новый
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

export default Worksheets;
