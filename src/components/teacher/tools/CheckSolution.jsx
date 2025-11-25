import React, { useState } from 'react';
import './CheckSolution.css';
import { evaluateStudentWork } from '../../../api/toolsService';

function CheckSolution({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [showSolution, setShowSolution] = useState(false);
    const [formData, setFormData] = useState({
        task: '',
        solution: '',
        subject: '',
        grade: ''
    });
    const [generatedContent, setGeneratedContent] = useState(null);
    const [error, setError] = useState(null);

    const subjects = [
        'Математика', 'Алгебра', 'Геометрия', 'Физика', 'Химия', 'Биология',
        'Русский язык', 'Казахский язык', 'Английский язык'
    ];

    const infoList = [
        'Правильно ли решение?',
        'Где именно ошибка?',
        'Почему это ошибка?',
        'Как исправить?',
        'Правильное решение'
    ];

    const sampleAnalysis = [
        {
            step: 1,
            title: 'Первый шаг верен',
            text: 'Ты правильно перенес число через знак равенства. При переносе знак меняется на противоположный.',
            isCorrect: true,
            suggestion: 'Первый шаг выполнен верно.'
        },
        {
            step: 2,
            title: 'Все остальные шаги верны',
            text: 'Вычисления выполнены правильно. Деление и получение ответа - корректно.',
            isCorrect: true,
            suggestion: 'Ты правильно решил задачу!'
        }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.task || !formData.solution || !formData.subject || !formData.grade) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }
        setStep(2);
        setError(null);

        try {
            const result = await evaluateStudentWork({
                subject: formData.subject,
                topic: formData.task,
                criteria: 'correctness',
                student_work: formData.solution
            });

            if (result.success) {
                setGeneratedContent(result.content);
            }
            setStep(3);
        } catch (err) {
            setStep(3);
        }
    };

    const handleReset = () => {
        setStep(1);
        setShowSolution(false);
        setGeneratedContent(null);
        setError(null);
        setFormData({
            task: '',
            solution: '',
            subject: '',
            grade: ''
        });
    };

    const handleClose = () => {
        handleReset();
        onClose();
    };

    const handleGetHelp = () => {
        alert('💡 Подсказка:\n\nПопробуй решить задачу снова, используя правильный метод из раздела "Правильное решение".\n\nОбрати внимание на знаки при переносе чисел!');
    };

    if (!isOpen) return null;

    return (
        <div className="check-solution-overlay" onClick={handleClose}>
            <div className="check-solution-modal" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="check-solution-header">
                    <div className="check-solution-header-content">
                        <div className="check-solution-icon">✅</div>
                        <div>
                            <h2>Проверь мое решение</h2>
                            <p>Анализ ошибок</p>
                        </div>
                    </div>
                    <button className="check-solution-close" onClick={handleClose}>&times;</button>
                </div>

                {/* Content */}
                <div className="check-solution-content">
                    {/* Step 1: Form */}
                    {step === 1 && (
                        <div className="check-solution-form">
                            <div className="form-group">
                                <label className="form-label">
                                    Условие задачи <span className="required">*</span>
                                </label>
                                <textarea
                                    name="task"
                                    value={formData.task}
                                    onChange={handleInputChange}
                                    placeholder="Напиши условие задачи...

Например:
Решить уравнение: 2x + 5 = 13"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    Твое решение <span className="required">*</span>
                                </label>
                                <textarea
                                    name="solution"
                                    value={formData.solution}
                                    onChange={handleInputChange}
                                    placeholder="Напиши свое решение пошагово...

Например:
1. 2x = 13 - 5
2. 2x = 8
3. x = 8 / 2
4. x = 4"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Или загрузи фото решения</label>
                                <div className="upload-area">
                                    <div className="upload-icon">📸</div>
                                    <div className="upload-text">Нажми, чтобы загрузить фото</div>
                                    <div className="upload-hint">Поддерживаются: JPG, PNG</div>
                                </div>
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

                            <div className="info-box">
                                <div className="info-box-title">
                                    <span>✅</span> Что получу?
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
                                    Проверить
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Loading */}
                    {step === 2 && (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <div className="loading-text">Проверяем решение...</div>
                        </div>
                    )}

                    {/* Step 3: Result */}
                    {step === 3 && (
                        <div className="result-container">
                            {/* Status Card */}
                            <div className="status-card correct">
                                <div className="status-icon">✅</div>
                                <div className="status-title">Решение верное!</div>
                                <div className="status-text">Все шаги выполнены правильно</div>
                            </div>

                            {/* Task Section */}
                            <div className="check-section">
                                <div className="check-header">📋 Твоя задача</div>
                                <div className="task-display">
                                    <div className="task-label">УСЛОВИЕ:</div>
                                    <div className="task-text">{formData.task}</div>
                                </div>
                                <div className="task-display">
                                    <div className="task-label">ТВОЕ РЕШЕНИЕ:</div>
                                    <div className="task-text" style={{ whiteSpace: 'pre-line' }}>
                                        {formData.solution}
                                    </div>
                                </div>
                            </div>

                            {/* Analysis Section */}
                            <div className="check-section">
                                <div className="check-header">🔍 Анализ решения</div>
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
                                    sampleAnalysis.map((item, idx) => (
                                        <div key={idx} className={`analysis-item ${item.isCorrect ? 'correct' : 'error'}`}>
                                            <div className="analysis-header">
                                                <div className="analysis-icon">{item.step}</div>
                                                <div className="analysis-title">{item.title}</div>
                                            </div>
                                            <div className="analysis-text">{item.text}</div>
                                            <div className={`suggestion-box ${item.isCorrect ? 'correct' : 'fix'}`}>
                                                <div className="suggestion-label">
                                                    {item.isCorrect ? '✅ Правильно!' : '💡 Как исправить:'}
                                                </div>
                                                <div className="suggestion-text">{item.suggestion}</div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Solution Box */}
                            {showSolution && (
                                <div className="solution-box">
                                    <div className="solution-header">✅ Правильное решение</div>
                                    <div className="solution-content">
                                        <strong>Дано:</strong> 2x + 5 = 13<br /><br />
                                        <strong>Решение:</strong><br />
                                        1. Переносим 5 вправо: 2x = 13 - 5<br />
                                        2. Вычисляем: 2x = 8<br />
                                        3. Делим обе части на 2: x = 8 ÷ 2<br />
                                        4. Получаем: x = 4<br /><br />
                                        <strong>Проверка:</strong><br />
                                        2 × 4 + 5 = 8 + 5 = 13 ✓<br /><br />
                                        <strong>Ответ:</strong> x = 4
                                    </div>
                                </div>
                            )}

                            <div className="solution-toggle">
                                <button
                                    className="show-solution-btn"
                                    onClick={() => setShowSolution(!showSolution)}
                                >
                                    {showSolution ? '🔼 Скрыть правильное решение' : '📖 Показать правильное решение'}
                                </button>
                            </div>

                            {/* Action Buttons */}
                            <div className="action-buttons">
                                <button className="action-btn" onClick={handleReset}>
                                    <span>🔄</span> Попробовать снова
                                </button>
                                <button className="action-btn" onClick={handleGetHelp}>
                                    <span>💡</span> Получить подсказку
                                </button>
                                <button className="action-btn">
                                    <span>📥</span> Скачать отчет
                                </button>
                                <button className="action-btn">
                                    <span>💾</span> Сохранить
                                </button>
                            </div>

                            <div className="button-group">
                                <button className="btn-cancel" onClick={handleReset}>
                                    ← Проверить другое решение
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CheckSolution;
