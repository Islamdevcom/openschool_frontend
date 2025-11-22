import React, { useState } from 'react';
import './ExitTicket.css';

function ExitTicket({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        format: '3questions',
        topic: '',
        subject: '',
        grade: '',
        date: '',
        keyPoints: ''
    });
    const [loadingStep, setLoadingStep] = useState(0);

    const ticketFormats = [
        { id: '3questions', icon: '❓', name: '3 вопроса', desc: 'Что понял? Что не понял? Что хочешь узнать?' },
        { id: 'quick', icon: '⚡', name: 'Быстрая проверка', desc: '3-5 коротких вопросов по теме' },
        { id: 'reflection', icon: '💭', name: 'Рефлексия', desc: 'Что узнал? Как применю?' },
        { id: 'custom', icon: '✏️', name: 'Свои вопросы', desc: 'Укажите свои вопросы' }
    ];

    const subjects = [
        'Математика', 'Физика', 'Химия', 'Биология',
        'История', 'География', 'Русский язык',
        'Казахский язык', 'Английский язык', 'Информатика'
    ];

    const loadingSteps = [
        { icon: '⏳', text: 'Анализируем тему урока...' },
        { icon: '📥', text: 'Подбираем вопросы...' },
        { icon: '✨', text: 'Создаем карточки...' },
        { icon: '📝', text: 'Готовим для печати...' }
    ];

    const infoList = [
        'Быстрая проверка в конце урока (3-5 минут)',
        'Помогает понять, что усвоили ученики',
        'Выявляет пробелы для следующего урока',
        'Готовые карточки для печати',
        'Можно использовать каждый урок'
    ];

    const sampleQuestions = {
        '3questions': [
            '1. Что я понял на уроке?',
            '2. Что мне было непонятно?',
            '3. Что я хочу узнать больше?'
        ],
        'quick': [
            '1. Назовите основное понятие урока',
            '2. Приведите пример',
            '3. Где это применяется?'
        ],
        'reflection': [
            '1. Что нового я узнал?',
            '2. Как я могу это применить?',
            '3. Какие вопросы остались?'
        ],
        'custom': [
            '1. Ваш вопрос',
            '2. Ваш вопрос',
            '3. Ваш вопрос'
        ]
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const selectFormat = (formatId) => {
        setFormData(prev => ({ ...prev, format: formatId }));
    };

    const handleSubmit = () => {
        if (!formData.topic || !formData.subject || !formData.grade) {
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
            format: '3questions',
            topic: '',
            subject: '',
            grade: '',
            date: '',
            keyPoints: ''
        });
    };

    const handleClose = () => {
        handleReset();
        onClose();
    };

    const getFormatName = (formatId) => {
        const format = ticketFormats.find(f => f.id === formatId);
        return format ? format.name : '';
    };

    if (!isOpen) return null;

    return (
        <div className="exit-ticket-overlay" onClick={handleClose}>
            <div className="exit-ticket-modal" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="exit-ticket-header">
                    <div className="exit-ticket-header-content">
                        <div className="exit-ticket-icon">🎫</div>
                        <div>
                            <h2>Выходной билет</h2>
                            <p>Проверка понимания в конце урока</p>
                        </div>
                    </div>
                    <button className="exit-ticket-close" onClick={handleClose}>&times;</button>
                </div>

                {/* Progress Bar */}
                <div className="exit-ticket-progress">
                    <div className="progress-info">
                        <span className="progress-title">
                            {step === 1 && 'Настройка билета'}
                            {step === 2 && 'Генерация билетов...'}
                            {step === 3 && 'Билеты готовы!'}
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
                <div className="exit-ticket-content">
                    {/* Step 1: Form */}
                    {step === 1 && (
                        <div className="exit-ticket-form">
                            <div className="form-section">
                                <h3 className="section-title">Формат билета</h3>
                                <div className="ticket-formats-grid">
                                    {ticketFormats.map(format => (
                                        <div
                                            key={format.id}
                                            className={`ticket-format-card ${formData.format === format.id ? 'selected' : ''}`}
                                            onClick={() => selectFormat(format.id)}
                                        >
                                            <div className="ticket-format-icon">{format.icon}</div>
                                            <div className="ticket-format-name">{format.name}</div>
                                            <div className="ticket-format-desc">{format.desc}</div>
                                        </div>
                                    ))}
                                </div>

                                <h3 className="section-title" style={{ marginTop: '30px' }}>Основная информация</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Тема урока <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="topic"
                                            value={formData.topic}
                                            onChange={handleInputChange}
                                            placeholder="Например: Квадратные уравнения"
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
                                        <label>Дата урока</label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-grid full-width" style={{ marginTop: '20px' }}>
                                    <div className="form-group">
                                        <label>Ключевые моменты урока</label>
                                        <textarea
                                            name="keyPoints"
                                            value={formData.keyPoints}
                                            onChange={handleInputChange}
                                            placeholder="Основные темы, которые были изучены на уроке..."
                                        />
                                    </div>
                                </div>

                                <div className="info-box">
                                    <div className="info-box-title">
                                        <span>🎫</span> Что такое выходной билет:
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
                                    Создать билеты
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Loading */}
                    {step === 2 && (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <h3 className="loading-title">Создаем выходные билеты</h3>
                            <p className="loading-subtitle">Генерируем вопросы...</p>

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
                                <h3>Выходные билеты готовы!</h3>
                                <div className="result-badges">
                                    <span className="badge badge-success">Готово</span>
                                </div>
                            </div>

                            <div className="result-info">
                                <div className="result-info-item">
                                    <span>🎫</span> {getFormatName(formData.format)}
                                </div>
                                <div className="result-info-item">
                                    <span>📊</span> {formData.topic}
                                </div>
                                <div className="result-info-item">
                                    <span>📚</span> {formData.subject}
                                </div>
                            </div>

                            <div className="tickets-grid">
                                {[1, 2].map(ticketNum => (
                                    <div key={ticketNum} className="ticket-card">
                                        <div className="ticket-card-header">
                                            <div className="ticket-card-title">Выходной билет: {formData.topic}</div>
                                            <div className="ticket-card-subtitle">{formData.subject} • {formData.grade} класс</div>
                                        </div>
                                        {sampleQuestions[formData.format].map((question, idx) => (
                                            <div key={idx} className="ticket-question">
                                                <div className="question-label">{question}</div>
                                                <div className="answer-space"></div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            <p className="tickets-hint">
                                Готово для печати - распечатайте столько билетов, сколько учеников в классе
                            </p>

                            <div className="button-group result-buttons">
                                <button className="btn-cancel" onClick={handleReset}>
                                    Создать новые
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

export default ExitTicket;
