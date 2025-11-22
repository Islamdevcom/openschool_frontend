import React, { useState } from 'react';
import './CardGenerator.css';

function CardGenerator({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        cardType: '',
        topic: '',
        subject: '',
        grade: '',
        cardCount: '20',
        additional: ''
    });
    const [loadingStep, setLoadingStep] = useState(0);

    const cardTypes = [
        { id: 'words', icon: '📚', name: 'Слова' },
        { id: 'formulas', icon: '🔢', name: 'Формулы' },
        { id: 'dates', icon: '📅', name: 'Даты' },
        { id: 'definitions', icon: '📖', name: 'Определения' },
        { id: 'questions', icon: '❓', name: 'Вопросы' }
    ];

    const subjects = [
        'Математика', 'Физика', 'Химия', 'Биология', 'История',
        'География', 'Английский язык', 'Русский язык', 'Казахский язык', 'Информатика'
    ];

    const loadingSteps = [
        { icon: '⏳', text: 'Анализируем тему...' },
        { icon: '📥', text: 'Подбираем содержание...' },
        { icon: '✨', text: 'Создаем карточки...' },
        { icon: '📝', text: 'Формируем макет...' }
    ];

    const infoList = [
        'Лицевая сторона - вопрос/термин',
        'Обратная сторона - ответ/определение',
        'Интерактивные (можно переворачивать)',
        'Готовы для печати',
        'HTML для онлайн использования'
    ];

    const sampleCards = [
        { front: 'Вопрос или термин', back: 'Ответ или определение' },
        { front: 'Еще один вопрос', back: 'Ответ на вопрос' },
        { front: 'Третий вопрос', back: 'Ответ на третий вопрос' },
        { front: 'Четвертый вопрос', back: 'Ответ на четвертый вопрос' },
        { front: 'Пятый вопрос', back: 'Ответ на пятый вопрос' },
        { front: 'Шестой вопрос', back: 'Ответ на шестой вопрос' }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const selectCardType = (typeId) => {
        setFormData(prev => ({ ...prev, cardType: typeId }));
    };

    const handleSubmit = () => {
        if (!formData.cardType) {
            alert('Пожалуйста, выберите тип карточек');
            return;
        }
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
            cardType: '',
            topic: '',
            subject: '',
            grade: '',
            cardCount: '20',
            additional: ''
        });
    };

    const handleClose = () => {
        handleReset();
        onClose();
    };

    const getCardTypeName = (typeId) => {
        const type = cardTypes.find(t => t.id === typeId);
        return type ? type.name : '';
    };

    if (!isOpen) return null;

    return (
        <div className="card-generator-overlay" onClick={handleClose}>
            <div className="card-generator-modal" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="card-generator-header">
                    <div className="card-generator-header-content">
                        <div className="card-generator-icon">🎴</div>
                        <div>
                            <h2>Генератор карточек</h2>
                            <p>Карточки и мини-задания</p>
                        </div>
                    </div>
                    <button className="card-generator-close" onClick={handleClose}>&times;</button>
                </div>

                {/* Progress Bar */}
                <div className="card-generator-progress">
                    <div className="progress-info">
                        <span className="progress-title">
                            {step === 1 && 'Настройка карточек'}
                            {step === 2 && 'Генерация карточек...'}
                            {step === 3 && 'Карточки готовы!'}
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
                <div className="card-generator-content">
                    {/* Step 1: Form */}
                    {step === 1 && (
                        <div className="card-generator-form">
                            <div className="form-section">
                                <h3 className="section-title">Тип карточек</h3>
                                <div className="card-types-grid">
                                    {cardTypes.map(type => (
                                        <div
                                            key={type.id}
                                            className={`card-type-item ${formData.cardType === type.id ? 'selected' : ''}`}
                                            onClick={() => selectCardType(type.id)}
                                        >
                                            <div className="card-type-icon">{type.icon}</div>
                                            <div className="card-type-name">{type.name}</div>
                                        </div>
                                    ))}
                                </div>

                                <h3 className="section-title" style={{ marginTop: '30px' }}>Основная информация</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Тема <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="topic"
                                            value={formData.topic}
                                            onChange={handleInputChange}
                                            placeholder="Например: Неправильные глаголы"
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
                                        <label>Количество карточек</label>
                                        <input
                                            type="number"
                                            name="cardCount"
                                            value={formData.cardCount}
                                            onChange={handleInputChange}
                                            min="5"
                                            max="100"
                                            placeholder="20"
                                        />
                                    </div>
                                </div>

                                <div className="form-grid full-width" style={{ marginTop: '20px' }}>
                                    <div className="form-group">
                                        <label>Дополнительная информация</label>
                                        <textarea
                                            name="additional"
                                            value={formData.additional}
                                            onChange={handleInputChange}
                                            placeholder="Укажите особые требования к карточкам..."
                                        />
                                    </div>
                                </div>

                                <div className="info-box">
                                    <div className="info-box-title">
                                        <span>🎴</span> Что будет в карточках:
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
                                    Создать карточки
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Loading */}
                    {step === 2 && (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <h3 className="loading-title">Создаем карточки</h3>
                            <p className="loading-subtitle">Генерируем содержание...</p>

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
                                <h3>Карточки готовы!</h3>
                                <div className="result-badges">
                                    <span className="badge badge-success">Готово</span>
                                </div>
                            </div>

                            <div className="result-info">
                                <div className="result-info-item">
                                    <span>🎴</span> {getCardTypeName(formData.cardType)}
                                </div>
                                <div className="result-info-item">
                                    <span>📊</span> {formData.topic}
                                </div>
                                <div className="result-info-item">
                                    <span>📄</span> {formData.cardCount} карточек
                                </div>
                            </div>

                            <p className="cards-hint">Наведите на карточку, чтобы увидеть ответ</p>

                            <div className="cards-grid">
                                {sampleCards.map((card, index) => (
                                    <div key={index} className="flashcard">
                                        <div className="flashcard-inner">
                                            <div className="flashcard-front">
                                                <span className="card-number">{index + 1}/{formData.cardCount}</span>
                                                <div>{card.front}</div>
                                            </div>
                                            <div className="flashcard-back">
                                                <div>{card.back}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="more-cards">
                                ... и еще {parseInt(formData.cardCount) - 6} карточек
                            </div>

                            <div className="button-group result-buttons">
                                <button className="btn-cancel" onClick={handleReset}>
                                    Создать новые
                                </button>
                                <button className="btn-generate btn-download">
                                    Скачать HTML
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

export default CardGenerator;
