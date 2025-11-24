import React, { useState } from 'react';
import './Tutor.css';
import { generateTeachingStrategy } from '../../../api/toolsService';

function Tutor({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        topic: '',
        subject: '',
        grade: '',
        format: 'text'
    });
    const [generatedContent, setGeneratedContent] = useState(null);
    const [error, setError] = useState(null);

    const subjects = [
        'Математика', 'Алгебра', 'Геометрия', 'Физика', 'Химия', 'Биология',
        'История', 'География', 'Русский язык', 'Казахский язык', 'Английский язык', 'Информатика'
    ];

    const formats = [
        { value: 'text', label: '📝 Текстовое объяснение' },
        { value: 'steps', label: '📋 Пошаговая инструкция' },
        { value: 'examples', label: '📚 С примерами задач' }
    ];

    const infoList = [
        'Объяснение как от тьютора',
        'Разбивка темы на шаги',
        'Примеры на каждом шаге',
        'Карточки для запоминания',
        'Можно задать вопросы'
    ];

    const sampleSteps = [
        {
            title: 'Что такое квадратное уравнение?',
            content: 'Квадратное уравнение - это уравнение вида ax² + bx + c = 0, где a ≠ 0.\n\nГлавная особенность: переменная x возводится в квадрат (во вторую степень).',
            example: {
                label: 'ПРИМЕР:',
                text: 'x² - 5x + 6 = 0',
                note: 'Здесь: a = 1, b = -5, c = 6'
            }
        },
        {
            title: 'Способы решения',
            content: 'Способ 1: По формуле\n\nx = (-b ± √(b² - 4ac)) / 2a',
            example: {
                label: 'ПРИМЕР:',
                text: 'Решим x² - 5x + 6 = 0\n\n1. Находим дискриминант: D = b² - 4ac = 25 - 24 = 1\n2. x₁ = (5 + 1) / 2 = 3\n3. x₂ = (5 - 1) / 2 = 2',
                answer: 'Ответ: x₁ = 3, x₂ = 2'
            }
        },
        {
            title: 'Попробуй сам!',
            content: 'Задача для практики:\n\nРеши уравнение: x² - 7x + 12 = 0',
            note: 'Используй формулу из предыдущего шага'
        }
    ];

    const flashcards = [
        { front: 'Формула', back: 'x = (-b ± √D) / 2a' },
        { front: 'Дискриминант', back: 'D = b² - 4ac' },
        { front: 'Условие', back: 'a ≠ 0' }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.topic || !formData.subject || !formData.grade) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }
        setStep(2);
        setError(null);

        try {
            const result = await generateTeachingStrategy({
                subject: formData.subject,
                topic: formData.topic,
                grade: formData.grade,
                student_level: 'intermediate',
                learning_style: formData.format
            });

            if (result.success) {
                setGeneratedContent(result.content);
            }
            setTimeout(() => setStep(3), 500);
        } catch (err) {
            setError(err.message);
            // Fallback to demo data
            setTimeout(() => setStep(3), 500);
        }
    };

    const handleReset = () => {
        setStep(1);
        setGeneratedContent(null);
        setError(null);
        setFormData({
            topic: '',
            subject: '',
            grade: '',
            format: 'text'
        });
    };

    const handleClose = () => {
        handleReset();
        onClose();
    };

    const handleAskQuestion = () => {
        const question = prompt('Какой у тебя вопрос по этой теме?');
        if (question) {
            alert('Отличный вопрос! Ответ будет добавлен в следующей версии.');
        }
    };

    const handleGetPractice = () => {
        alert('Задачи для практики:\n\n1. x² - 8x + 15 = 0\n2. 2x² - 11x + 5 = 0\n3. x² + 6x + 9 = 0\n\nРеши эти уравнения самостоятельно!');
    };

    if (!isOpen) return null;

    return (
        <div className="tutor-overlay" onClick={handleClose}>
            <div className="tutor-modal" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="tutor-header">
                    <div className="tutor-header-content">
                        <div className="tutor-icon">🎓</div>
                        <div>
                            <h2>Объясни тему</h2>
                            <p>Персональный тьютор</p>
                        </div>
                    </div>
                    <button className="tutor-close" onClick={handleClose}>&times;</button>
                </div>

                {/* Content */}
                <div className="tutor-content">
                    {/* Step 1: Form */}
                    {step === 1 && (
                        <div className="tutor-form">
                            <div className="form-group">
                                <label className="form-label">
                                    Что нужно объяснить? <span className="required">*</span>
                                </label>
                                <textarea
                                    name="topic"
                                    value={formData.topic}
                                    onChange={handleInputChange}
                                    placeholder="Напиши тему, которую нужно объяснить...

Например:
• Как решать квадратные уравнения?
• Что такое фотосинтез?
• Объясни Present Perfect в английском"
                                />
                            </div>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">
                                        Предмет <span className="required">*</span>
                                    </label>
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
                                    <label className="form-label">
                                        Класс <span className="required">*</span>
                                    </label>
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
                            </div>

                            <div className="form-group">
                                <label className="form-label">Формат объяснения</label>
                                <div className="radio-group">
                                    {formats.map(fmt => (
                                        <label key={fmt.value} className={`radio-option ${formData.format === fmt.value ? 'selected' : ''}`}>
                                            <input
                                                type="radio"
                                                name="format"
                                                value={fmt.value}
                                                checked={formData.format === fmt.value}
                                                onChange={handleInputChange}
                                            />
                                            <span className="radio-label">{fmt.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="info-box">
                                <div className="info-box-title">
                                    <span>🎓</span> Что получу?
                                </div>
                                <ul className="info-list">
                                    {infoList.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="button-group">
                                <button className="btn-cancel" onClick={handleClose}>
                                    Отмена
                                </button>
                                <button className="btn-generate" onClick={handleSubmit}>
                                    Объяснить
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Loading */}
                    {step === 2 && (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <div className="loading-text">Готовим объяснение...</div>
                        </div>
                    )}

                    {/* Step 3: Result */}
                    {step === 3 && (
                        <div className="result-container">
                            <div className="result-header">
                                <div className="result-icon">👨‍🏫</div>
                                <h3 className="result-title">{formData.topic}</h3>
                                <p className="result-subtitle">Пошаговое объяснение</p>
                            </div>

                            {/* Steps */}
                            <div className="steps-container">
                                {sampleSteps.map((stepItem, idx) => (
                                    <div key={idx} className="step-card">
                                        <div className="step-header">
                                            <div className="step-number">{idx + 1}</div>
                                            <div className="step-title">{stepItem.title}</div>
                                        </div>
                                        <div className="step-content">
                                            <p style={{ whiteSpace: 'pre-line' }}>{stepItem.content}</p>
                                            {stepItem.example && (
                                                <div className="example-box">
                                                    <div className="example-label">{stepItem.example.label}</div>
                                                    <p style={{ whiteSpace: 'pre-line' }}>{stepItem.example.text}</p>
                                                    {stepItem.example.note && (
                                                        <p className="example-note">{stepItem.example.note}</p>
                                                    )}
                                                    {stepItem.example.answer && (
                                                        <p className="example-answer">{stepItem.example.answer}</p>
                                                    )}
                                                </div>
                                            )}
                                            {stepItem.note && (
                                                <p className="step-note">{stepItem.note}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Interactive Section */}
                            <div className="interactive-section">
                                <div className="interactive-title">💬 Есть вопросы?</div>
                                <div className="interactive-content">
                                    Не понятен какой-то шаг? Нажми "Задать вопрос" ниже,<br />
                                    и я объясню подробнее!
                                </div>
                            </div>

                            {/* Flashcards */}
                            <div className="flashcards-section">
                                <h3 className="flashcards-title">🎴 Карточки для запоминания</h3>
                                <div className="flashcards">
                                    {flashcards.map((card, idx) => (
                                        <div key={idx} className="flashcard">
                                            <div className="flashcard-front">{card.front}</div>
                                            <div className="flashcard-back">{card.back}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="action-buttons">
                                <button className="action-btn" onClick={handleAskQuestion}>
                                    <span>💬</span> Задать вопрос
                                </button>
                                <button className="action-btn" onClick={handleGetPractice}>
                                    <span>✏️</span> Дай задачи
                                </button>
                                <button className="action-btn">
                                    <span>📥</span> Скачать PDF
                                </button>
                                <button className="action-btn">
                                    <span>💾</span> Сохранить
                                </button>
                            </div>

                            <div className="button-group">
                                <button className="btn-cancel" onClick={handleReset}>
                                    ← Объяснить другую тему
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Tutor;
