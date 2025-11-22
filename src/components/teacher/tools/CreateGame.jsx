import React, { useState } from 'react';
import './CreateGame.css';

function CreateGame({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        gameType: '',
        topic: '',
        subject: '',
        grade: '',
        questionCount: '10',
        additional: ''
    });
    const [loadingStep, setLoadingStep] = useState(0);

    const gameTypes = [
        { id: 'quiz', icon: '🧠', name: 'Квиз', desc: 'Вопросы с вариантами ответов' },
        { id: 'crossword', icon: '📝', name: 'Кроссворд', desc: 'Слова по горизонтали и вертикали' },
        { id: 'trivia', icon: '🎯', name: 'Викторина', desc: 'Интерактивные вопросы' }
    ];

    const subjects = [
        'Математика', 'Физика', 'Химия', 'Биология',
        'История', 'География', 'Литература', 'Английский язык',
        'Русский язык', 'Информатика'
    ];

    const loadingSteps = [
        { icon: '⏳', text: 'Анализируем тему...' },
        { icon: '📥', text: 'Подбираем вопросы...' },
        { icon: '✨', text: 'Создаем игру...' },
        { icon: '📝', text: 'Формируем интерфейс...' }
    ];

    const infoList = [
        'Интерактивный формат',
        'Вопросы по выбранной теме',
        'Ответы и объяснения',
        'Готово для использования в классе',
        'Можно скачать HTML или PDF'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const selectGameType = (typeId) => {
        setFormData(prev => ({ ...prev, gameType: typeId }));
    };

    const handleSubmit = () => {
        if (!formData.gameType) {
            alert('Пожалуйста, выберите тип игры');
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
            gameType: '',
            topic: '',
            subject: '',
            grade: '',
            questionCount: '10',
            additional: ''
        });
    };

    const handleClose = () => {
        handleReset();
        onClose();
    };

    const getGameTypeName = (typeId) => {
        const type = gameTypes.find(t => t.id === typeId);
        return type ? type.name : '';
    };

    if (!isOpen) return null;

    return (
        <div className="create-game-overlay" onClick={handleClose}>
            <div className="create-game-modal" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="create-game-header">
                    <div className="create-game-header-content">
                        <div className="create-game-icon">🎮</div>
                        <div>
                            <h2>Создать игру</h2>
                            <p>Квиз, кроссворд, викторина</p>
                        </div>
                    </div>
                    <button className="create-game-close" onClick={handleClose}>&times;</button>
                </div>

                {/* Progress Bar */}
                <div className="create-game-progress">
                    <div className="progress-info">
                        <span className="progress-title">
                            {step === 1 && 'Настройка игры'}
                            {step === 2 && 'Генерация игры...'}
                            {step === 3 && 'Игра готова!'}
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
                <div className="create-game-content">
                    {/* Step 1: Form */}
                    {step === 1 && (
                        <div className="create-game-form">
                            <div className="form-section">
                                <h3 className="section-title">Выберите тип игры</h3>
                                <div className="game-types-grid">
                                    {gameTypes.map(type => (
                                        <div
                                            key={type.id}
                                            className={`game-type-card ${formData.gameType === type.id ? 'selected' : ''}`}
                                            onClick={() => selectGameType(type.id)}
                                        >
                                            <div className="game-type-icon">{type.icon}</div>
                                            <div className="game-type-name">{type.name}</div>
                                            <div className="game-type-desc">{type.desc}</div>
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
                                            placeholder="Например: История Казахстана"
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
                                        <label>Количество вопросов</label>
                                        <input
                                            type="number"
                                            name="questionCount"
                                            value={formData.questionCount}
                                            onChange={handleInputChange}
                                            min="5"
                                            max="50"
                                            placeholder="10"
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
                                            placeholder="Укажите особые требования к игре..."
                                        />
                                    </div>
                                </div>

                                <div className="info-box">
                                    <div className="info-box-title">
                                        <span>🎮</span> Что будет в игре:
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
                                    Создать игру
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Loading */}
                    {step === 2 && (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <h3 className="loading-title">Создаем игру</h3>
                            <p className="loading-subtitle">Генерируем вопросы и ответы...</p>

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
                                <h3>Игра готова!</h3>
                                <div className="result-badges">
                                    <span className="badge badge-success">Готово</span>
                                </div>
                            </div>

                            <div className="result-info">
                                <div className="result-info-item">
                                    <span>🎮</span> {getGameTypeName(formData.gameType)}
                                </div>
                                <div className="result-info-item">
                                    <span>📊</span> {formData.topic}
                                </div>
                                <div className="result-info-item">
                                    <span>📄</span> {formData.questionCount} вопросов
                                </div>
                            </div>

                            <div className="game-preview">
                                <div className="game-preview-title">
                                    {getGameTypeName(formData.gameType)}: {formData.topic}
                                </div>

                                <div className="quiz-question">
                                    <div className="question-number">Вопрос 1 из {formData.questionCount}</div>
                                    <div className="question-text">Пример вопроса по выбранной теме?</div>
                                    <div className="answer-options">
                                        <div className="answer-option">А) Вариант ответа 1</div>
                                        <div className="answer-option">Б) Вариант ответа 2</div>
                                        <div className="answer-option">В) Вариант ответа 3</div>
                                        <div className="answer-option">Г) Вариант ответа 4</div>
                                    </div>
                                </div>

                                <div className="quiz-question">
                                    <div className="question-number">Вопрос 2 из {formData.questionCount}</div>
                                    <div className="question-text">Еще один вопрос по теме?</div>
                                    <div className="answer-options">
                                        <div className="answer-option">А) Вариант ответа 1</div>
                                        <div className="answer-option">Б) Вариант ответа 2</div>
                                        <div className="answer-option">В) Вариант ответа 3</div>
                                        <div className="answer-option">Г) Вариант ответа 4</div>
                                    </div>
                                </div>

                                <div className="more-questions">
                                    ... и еще {parseInt(formData.questionCount) - 2} вопросов
                                </div>
                            </div>

                            <div className="button-group result-buttons">
                                <button className="btn-cancel" onClick={handleReset}>
                                    Создать новую
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

export default CreateGame;
