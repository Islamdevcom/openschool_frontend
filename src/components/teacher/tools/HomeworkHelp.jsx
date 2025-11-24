import React, { useState } from 'react';
import './HomeworkHelp.css';
import { generateHomework } from '../../../api/toolsService';

function HomeworkHelp({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        task: '',
        subject: '',
        grade: '',
        attempted: ''
    });
    const [unlockedHints, setUnlockedHints] = useState([0]);
    const [generatedContent, setGeneratedContent] = useState(null);
    const [error, setError] = useState(null);

    const subjects = [
        'Математика', 'Алгебра', 'Геометрия', 'Физика', 'Химия', 'Биология',
        'История', 'География', 'Русский язык',
        'Казахский язык', 'Английский язык', 'Информатика'
    ];

    const infoList = [
        'Пошаговые подсказки',
        'Без готовых ответов',
        'Объяснение метода решения',
        'Примеры похожих задач',
        'Проверка понимания'
    ];

    const sampleHints = [
        {
            title: 'Подсказка 1: Понимание задачи',
            content: 'Прочитай задачу еще раз. Выдели ключевые слова: "производительность", "время", "вместе". Это задача на совместную работу.',
            isLocked: false
        },
        {
            title: 'Подсказка 2: Что нужно найти?',
            content: 'Обозначь время работы первого рабочего за x часов. Тогда второй работает за (x + 2) часа. Производительность = 1/время.',
            isLocked: true
        },
        {
            title: 'Подсказка 3: Составление уравнения',
            content: 'При совместной работе производительности складываются: 1/x + 1/(x+2) = 1/4. Теперь реши это уравнение.',
            isLocked: true
        },
        {
            title: 'Подсказка 4: Финальный шаг',
            content: 'Приведи к общему знаменателю и реши квадратное уравнение. Не забудь проверить, что ответ имеет смысл (время не может быть отрицательным).',
            isLocked: true
        }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.task || !formData.subject || !formData.grade) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }
        setStep(2);
        setError(null);

        try {
            const result = await generateHomework({
                subject: formData.subject,
                topic: formData.task,
                grade: formData.grade,
                homework_type: 'hints',
                difficulty: 'medium'
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

    const handleUnlockHint = (index) => {
        if (!unlockedHints.includes(index)) {
            setUnlockedHints(prev => [...prev, index]);
        }
    };

    const handleReset = () => {
        setStep(1);
        setUnlockedHints([0]);
        setGeneratedContent(null);
        setError(null);
        setFormData({
            task: '',
            subject: '',
            grade: '',
            attempted: ''
        });
    };

    const handleClose = () => {
        handleReset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="homework-help-overlay" onClick={handleClose}>
            <div className="homework-help-modal" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="homework-help-header">
                    <div className="homework-help-header-content">
                        <div className="homework-help-icon">✏️</div>
                        <div>
                            <h2>Помощь с домашкой</h2>
                            <p>Подсказки без готовых ответов</p>
                        </div>
                    </div>
                    <button className="homework-help-close" onClick={handleClose}>&times;</button>
                </div>

                {/* Content */}
                <div className="homework-help-content">
                    {/* Step 1: Form */}
                    {step === 1 && (
                        <div className="homework-help-form">
                            <div className="form-group">
                                <label className="form-label">
                                    Введите задание <span className="required">*</span>
                                </label>
                                <textarea
                                    name="task"
                                    value={formData.task}
                                    onChange={handleInputChange}
                                    placeholder="Введите или сфотографируйте задание из домашней работы..."
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
                                <label className="form-label">Что уже пробовал(а)?</label>
                                <textarea
                                    name="attempted"
                                    value={formData.attempted}
                                    onChange={handleInputChange}
                                    placeholder="Опиши, что уже пробовал(а) сделать (необязательно)"
                                    className="small-textarea"
                                />
                            </div>

                            <div className="info-box">
                                <div className="info-box-title">
                                    <span>💡</span> Как это работает?
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
                                    Получить подсказки
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Loading */}
                    {step === 2 && (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <div className="loading-text">Анализируем задание...</div>
                        </div>
                    )}

                    {/* Step 3: Result */}
                    {step === 3 && (
                        <div className="result-container">
                            <div className="result-header">
                                <div className="result-icon">✅</div>
                                <h3 className="result-title">Подсказки готовы!</h3>
                                <p className="result-subtitle">{formData.subject} • {formData.grade} класс</p>
                            </div>

                            <div className="task-block">
                                <div className="task-label">Твое задание:</div>
                                <div className="task-text">{formData.task}</div>
                            </div>

                            <div className="hints-container">
                                {sampleHints.map((hint, idx) => (
                                    <div
                                        key={idx}
                                        className={`hint-card ${unlockedHints.includes(idx) ? 'unlocked' : 'locked'}`}
                                    >
                                        <div className="hint-header">
                                            <span className="hint-number">{idx + 1}</span>
                                            <span className="hint-title">{hint.title}</span>
                                            {!unlockedHints.includes(idx) && (
                                                <span className="hint-lock">🔒</span>
                                            )}
                                        </div>
                                        {unlockedHints.includes(idx) ? (
                                            <div className="hint-content">
                                                {hint.content}
                                            </div>
                                        ) : (
                                            <div className="hint-locked-content">
                                                <button
                                                    className="btn-unlock"
                                                    onClick={() => handleUnlockHint(idx)}
                                                >
                                                    Открыть подсказку
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="warning-box">
                                <div className="warning-icon">⚠️</div>
                                <div className="warning-text">
                                    <strong>Помни!</strong> Мы не даем готовых ответов.
                                    Используй подсказки, чтобы понять, как решать задачу самостоятельно.
                                </div>
                            </div>

                            <div className="action-buttons">
                                <button className="action-btn">
                                    <span>💬</span> Задать вопрос
                                </button>
                                <button className="action-btn">
                                    <span>📚</span> Похожие примеры
                                </button>
                                <button className="action-btn">
                                    <span>🎯</span> Проверить решение
                                </button>
                            </div>

                            <div className="button-group">
                                <button className="btn-cancel" onClick={handleReset}>
                                    ← Новое задание
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomeworkHelp;
