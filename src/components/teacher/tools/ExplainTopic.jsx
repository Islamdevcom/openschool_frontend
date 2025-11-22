import React, { useState } from 'react';
import './ExplainTopic.css';

function ExplainTopic({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        topic: '',
        subject: '',
        grade: '',
        level: 'simple'
    });

    const subjects = [
        'Математика', 'Алгебра', 'Геометрия', 'Физика', 'Химия', 'Биология',
        'История', 'География', 'Русский язык',
        'Казахский язык', 'Английский язык', 'Информатика'
    ];

    const levels = [
        { id: 'simple', icon: '😊', name: 'Простыми словами' },
        { id: 'examples', icon: '📚', name: 'С примерами' },
        { id: 'detailed', icon: '🎓', name: 'Подробно' }
    ];

    const infoList = [
        'Простое объяснение темы',
        'Примеры и аналогии',
        'Почему это важно',
        'Как решать задачи',
        'Упражнения для практики'
    ];

    const sampleExplanation = [
        {
            title: 'Главная идея',
            content: 'Квадратное уравнение - это математическое уравнение, где переменная возводится в квадрат (во вторую степень). Самый простой пример: x² = 4. Решение этого уравнения - найти, какое число при возведении в квадрат даст 4.'
        },
        {
            title: 'Подробное объяснение',
            content: 'Квадратное уравнение всегда записывается в виде: ax² + bx + c = 0',
            details: ['a, b, c - это числа (коэффициенты)', 'x - это неизвестное, которое нужно найти', 'x² - означает x умножить на x'],
            example: { label: 'ПРИМЕР:', text: 'x² - 5x + 6 = 0\nЗдесь: a=1, b=-5, c=6' }
        },
        {
            title: 'Почему это важно?',
            content: 'Квадратные уравнения используются в реальной жизни:',
            details: ['Расчет траектории полета мяча', 'Вычисление площади и периметра', 'Решение задач про прибыль и убытки', 'В физике и инженерии']
        },
        {
            title: 'Как решать?',
            content: 'Есть несколько способов:',
            examples: [
                { label: 'СПОСОБ 1: ФОРМУЛА', text: 'x = (-b ± √(b² - 4ac)) / 2a', hint: 'Подставляем числа a, b, c в формулу' },
                { label: 'СПОСОБ 2: РАЗЛОЖЕНИЕ', text: 'Разложить на множители (для простых случаев)' }
            ]
        },
        {
            title: 'Попробуй сам!',
            content: 'Задание для практики:',
            task: 'Реши уравнение: x² - 3x + 2 = 0',
            hint: 'Подсказка: попробуй найти два числа, которые при умножении дают 2, а при сложении дают 3'
        }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!formData.topic || !formData.subject || !formData.grade) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }
        setStep(2);
        setTimeout(() => setStep(3), 2000);
    };

    const handleReset = () => {
        setStep(1);
        setFormData({
            topic: '',
            subject: '',
            grade: '',
            level: 'simple'
        });
    };

    const handleClose = () => {
        handleReset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="explain-topic-overlay" onClick={handleClose}>
            <div className="explain-topic-modal" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="explain-topic-header">
                    <div className="explain-topic-header-content">
                        <div className="explain-topic-icon">💡</div>
                        <div>
                            <h2>Объяснение темы</h2>
                            <p>Простое объяснение сложных концепций</p>
                        </div>
                    </div>
                    <button className="explain-topic-close" onClick={handleClose}>&times;</button>
                </div>

                {/* Content */}
                <div className="explain-topic-content">
                    {/* Step 1: Form */}
                    {step === 1 && (
                        <div className="explain-topic-form">
                            <div className="form-group">
                                <label className="form-label">
                                    Что нужно объяснить? <span className="required">*</span>
                                </label>
                                <textarea
                                    name="topic"
                                    value={formData.topic}
                                    onChange={handleInputChange}
                                    placeholder="Например: Что такое квадратное уравнение? Объясни фотосинтез. Как решать задачи на проценты?"
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
                                <label className="form-label">Уровень сложности</label>
                                <div className="level-options">
                                    {levels.map(level => (
                                        <label
                                            key={level.id}
                                            className={`level-option ${formData.level === level.id ? 'selected' : ''}`}
                                        >
                                            <input
                                                type="radio"
                                                name="level"
                                                value={level.id}
                                                checked={formData.level === level.id}
                                                onChange={handleInputChange}
                                            />
                                            <span className="level-label">{level.icon} {level.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="info-box">
                                <div className="info-box-title">
                                    <span>💡</span> Что получу?
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
                                    Объяснить тему
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
                                <div className="result-icon">✅</div>
                                <h3 className="result-title">{formData.topic}</h3>
                                <p className="result-subtitle">{formData.subject} • {formData.grade} класс</p>
                            </div>

                            <div className="explanation-blocks">
                                {sampleExplanation.map((block, idx) => (
                                    <div key={idx} className="explanation-block">
                                        <span className="block-number">{idx + 1}</span>
                                        <h4 className="block-title">{block.title}</h4>
                                        <div className="block-content">
                                            <p>{block.content}</p>

                                            {block.details && (
                                                <ul className="block-list">
                                                    {block.details.map((detail, i) => (
                                                        <li key={i}>{detail}</li>
                                                    ))}
                                                </ul>
                                            )}

                                            {block.example && (
                                                <div className="example-box">
                                                    <div className="example-label">{block.example.label}</div>
                                                    <p>{block.example.text}</p>
                                                </div>
                                            )}

                                            {block.examples && block.examples.map((ex, i) => (
                                                <div key={i} className="example-box">
                                                    <div className="example-label">{ex.label}</div>
                                                    <p>{ex.text}</p>
                                                    {ex.hint && <p className="example-hint">{ex.hint}</p>}
                                                </div>
                                            ))}

                                            {block.task && (
                                                <>
                                                    <p className="task-text">{block.task}</p>
                                                    {block.hint && <p className="task-hint">{block.hint}</p>}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="action-buttons">
                                <button className="action-btn">
                                    <span>💬</span> Задать вопрос
                                </button>
                                <button className="action-btn">
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

export default ExplainTopic;
