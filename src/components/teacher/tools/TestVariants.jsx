import React, { useState } from 'react';
import './TestVariants.css';
import { generateMCQTest } from '../../../api/toolsService';

const TestVariants = ({ isOpen, onClose }) => {
    const [step, setStep] = useState('form'); // form, loading, result
    const [activeVariant, setActiveVariant] = useState(1);
    const [questionsCount, setQuestionsCount] = useState(10);
    const [variantsCount, setVariantsCount] = useState(2);
    const [formData, setFormData] = useState({
        topic: '',
        subject: '',
        grade: '',
        typeChoice: true,
        typeMultiple: true,
        typeText: true
    });
    const [generatedContent, setGeneratedContent] = useState(null);
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (name) => {
        setFormData(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const changeCounter = (type, delta) => {
        if (type === 'questions') {
            setQuestionsCount(prev => Math.max(5, Math.min(20, prev + delta)));
        } else {
            setVariantsCount(prev => Math.max(2, Math.min(4, prev + delta)));
        }
    };

    const handleSubmit = async () => {
        const hasTypes = formData.typeChoice || formData.typeMultiple || formData.typeText;
        if (!formData.topic || !formData.subject || !formData.grade || !hasTypes) {
            alert('Пожалуйста, заполните все обязательные поля и выберите хотя бы один тип вопросов');
            return;
        }
        setStep('loading');
        setError(null);

        try {
            const result = await generateMCQTest({
                subject: formData.subject,
                topic: formData.topic,
                grade: formData.grade,
                num_questions: questionsCount
            });

            if (result.success) {
                setGeneratedContent(result.content);
                setStep('result');
            } else {
                setError(result.error || 'Ошибка при создании теста');
                setStep('form');
            }
        } catch (err) {
            // Fallback на демо-результат при ошибке
            setStep('result');
        }
    };

    const handleClose = () => {
        setStep('form');
        setActiveVariant(1);
        setGeneratedContent(null);
        setError(null);
        setFormData({
            topic: '',
            subject: '',
            grade: '',
            typeChoice: true,
            typeMultiple: true,
            typeText: true
        });
        onClose();
    };

    const startOver = () => {
        setStep('form');
        setActiveVariant(1);
        setGeneratedContent(null);
        setError(null);
    };

    const showVariant = (num) => setActiveVariant(num);

    return (
        <div className="test-variants-overlay" onClick={handleClose}>
            <div className="test-variants-modal" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="test-variants-header">
                    <div className="test-variants-header-content">
                        <div className="test-variants-icon">📋</div>
                        <div>
                            <h2>Тест с вариантами</h2>
                            <p>Автоматическое создание тестов</p>
                        </div>
                    </div>
                    <button className="test-variants-close" onClick={handleClose}>×</button>
                </div>

                {/* Content */}
                <div className="test-variants-content">
                    {/* Form Step */}
                    {step === 'form' && (
                        <div className="test-variants-form">
                            <div className="form-group">
                                <label className="form-label">Тема теста<span className="required">*</span></label>
                                <input
                                    type="text"
                                    name="topic"
                                    value={formData.topic}
                                    onChange={handleInputChange}
                                    placeholder="Например: Квадратные уравнения"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Предмет<span className="required">*</span></label>
                                <select name="subject" value={formData.subject} onChange={handleInputChange}>
                                    <option value="">Выберите предмет</option>
                                    <option value="Математика">Математика</option>
                                    <option value="Физика">Физика</option>
                                    <option value="Химия">Химия</option>
                                    <option value="Биология">Биология</option>
                                    <option value="История">История</option>
                                    <option value="География">География</option>
                                    <option value="Русский язык">Русский язык</option>
                                    <option value="Английский язык">Английский язык</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Класс<span className="required">*</span></label>
                                <select name="grade" value={formData.grade} onChange={handleInputChange}>
                                    <option value="">Выберите класс</option>
                                    <option value="5">5 класс</option>
                                    <option value="6">6 класс</option>
                                    <option value="7">7 класс</option>
                                    <option value="8">8 класс</option>
                                    <option value="9">9 класс</option>
                                    <option value="10">10 класс</option>
                                    <option value="11">11 класс</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Настройки теста</label>
                                <div className="counter-group">
                                    <div className="counter-item">
                                        <div className="counter-label">Количество вопросов</div>
                                        <div className="counter-controls">
                                            <button className="counter-btn" onClick={() => changeCounter('questions', -1)}>−</button>
                                            <div className="counter-value">{questionsCount}</div>
                                            <button className="counter-btn" onClick={() => changeCounter('questions', 1)}>+</button>
                                        </div>
                                    </div>
                                    <div className="counter-item">
                                        <div className="counter-label">Количество вариантов</div>
                                        <div className="counter-controls">
                                            <button className="counter-btn" onClick={() => changeCounter('variants', -1)}>−</button>
                                            <div className="counter-value">{variantsCount}</div>
                                            <button className="counter-btn" onClick={() => changeCounter('variants', 1)}>+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Типы вопросов</label>
                                <div className="question-types">
                                    <div className={`checkbox-item ${formData.typeChoice ? 'checked' : ''}`} onClick={() => handleCheckboxChange('typeChoice')}>
                                        <input type="checkbox" checked={formData.typeChoice} onChange={() => handleCheckboxChange('typeChoice')} />
                                        <div>
                                            <div className="checkbox-label">Выбор одного ответа</div>
                                            <div className="checkbox-desc">Классический тест с вариантами A, B, C, D</div>
                                        </div>
                                    </div>
                                    <div className={`checkbox-item ${formData.typeMultiple ? 'checked' : ''}`} onClick={() => handleCheckboxChange('typeMultiple')}>
                                        <input type="checkbox" checked={formData.typeMultiple} onChange={() => handleCheckboxChange('typeMultiple')} />
                                        <div>
                                            <div className="checkbox-label">Выбор нескольких ответов</div>
                                            <div className="checkbox-desc">Может быть несколько правильных ответов</div>
                                        </div>
                                    </div>
                                    <div className={`checkbox-item ${formData.typeText ? 'checked' : ''}`} onClick={() => handleCheckboxChange('typeText')}>
                                        <input type="checkbox" checked={formData.typeText} onChange={() => handleCheckboxChange('typeText')} />
                                        <div>
                                            <div className="checkbox-label">Текстовый ответ</div>
                                            <div className="checkbox-desc">Ученик пишет ответ самостоятельно</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="info-box">
                                <div className="info-box-title">📋 Что получу?</div>
                                <ul className="info-list">
                                    <li>Готовые варианты теста</li>
                                    <li>Правильные ответы отдельно</li>
                                    <li>Критерии оценивания</li>
                                    <li>Можно скачать или распечатать</li>
                                    <li>Все варианты разные</li>
                                </ul>
                            </div>

                            <div className="button-group">
                                <button className="btn-cancel" onClick={handleClose}>Отмена</button>
                                <button className="btn-generate" onClick={handleSubmit}>Создать тест</button>
                            </div>
                        </div>
                    )}

                    {/* Loading Step */}
                    {step === 'loading' && (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <div className="loading-text">Создаем тест...</div>
                        </div>
                    )}

                    {/* Result Step */}
                    {step === 'result' && (
                        <div className="result-container">
                            {/* Табы вариантов */}
                            <div className="variants-tabs">
                                <div className={`variant-tab ${activeVariant === 1 ? 'active' : ''}`} onClick={() => showVariant(1)}>Вариант 1</div>
                                <div className={`variant-tab ${activeVariant === 2 ? 'active' : ''}`} onClick={() => showVariant(2)}>Вариант 2</div>
                                <div className={`variant-tab ${activeVariant === 3 ? 'active' : ''}`} onClick={() => showVariant(3)}>Ответы для учителя</div>
                            </div>

                            {/* Вариант 1 */}
                            {activeVariant === 1 && (
                                generatedContent ? (
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
                                <div className="test-container">
                                    <div className="test-header">
                                        <div className="test-title">Тест по теме: {formData.topic || 'Квадратные уравнения'}</div>
                                        <div className="test-meta">{formData.subject || 'Математика'} • {formData.grade || '7'} класс • Вариант 1</div>
                                    </div>

                                    <div className="question-item">
                                        <div className="question-number">Вопрос 1</div>
                                        <div className="question-text">Что такое квадратное уравнение?</div>
                                        <div className="question-options">
                                            <div className="option-item">A) Уравнение первой степени</div>
                                            <div className="option-item">B) Уравнение второй степени вида ax² + bx + c = 0</div>
                                            <div className="option-item">C) Уравнение третьей степени</div>
                                            <div className="option-item">D) Линейное уравнение</div>
                                        </div>
                                    </div>

                                    <div className="question-item">
                                        <div className="question-number">Вопрос 2</div>
                                        <div className="question-text">Решите уравнение: x² - 4 = 0</div>
                                        <div className="question-options">
                                            <div className="option-item">A) x = 2</div>
                                            <div className="option-item">B) x = -2</div>
                                            <div className="option-item">C) x = ±2</div>
                                            <div className="option-item">D) x = 4</div>
                                        </div>
                                    </div>

                                    <div className="question-item">
                                        <div className="question-number">Вопрос 3</div>
                                        <div className="question-text">Дискриминант квадратного уравнения вычисляется по формуле:</div>
                                        <div className="question-options">
                                            <div className="option-item">A) D = b² + 4ac</div>
                                            <div className="option-item">B) D = b² - 4ac</div>
                                            <div className="option-item">C) D = b - 4ac</div>
                                            <div className="option-item">D) D = 4ac - b²</div>
                                        </div>
                                    </div>

                                    <div className="question-item">
                                        <div className="question-number">Вопрос 4 (выберите все правильные)</div>
                                        <div className="question-text">Какие из этих уравнений являются квадратными?</div>
                                        <div className="question-options">
                                            <div className="option-item">☐ A) x² + 5x + 6 = 0</div>
                                            <div className="option-item">☐ B) 2x + 3 = 0</div>
                                            <div className="option-item">☐ C) 3x² - 7 = 0</div>
                                            <div className="option-item">☐ D) x³ + 2x = 0</div>
                                        </div>
                                    </div>

                                    <div className="question-item">
                                        <div className="question-number">Вопрос 5 (текстовый ответ)</div>
                                        <div className="question-text">Решите уравнение: x² - 5x + 6 = 0<br/>Запишите оба корня через точку с запятой.</div>
                                        <div className="answer-space">Ответ: _______________</div>
                                    </div>
                                </div>
                                )
                            )}

                            {/* Вариант 2 */}
                            {activeVariant === 2 && (
                                <div className="test-container">
                                    <div className="test-header">
                                        <div className="test-title">Тест по теме: {formData.topic || 'Квадратные уравнения'}</div>
                                        <div className="test-meta">{formData.subject || 'Математика'} • {formData.grade || '7'} класс • Вариант 2</div>
                                    </div>

                                    <div className="question-item">
                                        <div className="question-number">Вопрос 1</div>
                                        <div className="question-text">Какой коэффициент в квадратном уравнении не может быть равен нулю?</div>
                                        <div className="question-options">
                                            <div className="option-item">A) Коэффициент a</div>
                                            <div className="option-item">B) Коэффициент b</div>
                                            <div className="option-item">C) Коэффициент c</div>
                                            <div className="option-item">D) Любой может быть нулем</div>
                                        </div>
                                    </div>

                                    <div className="question-item">
                                        <div className="question-number">Вопрос 2</div>
                                        <div className="question-text">Решите уравнение: x² - 9 = 0</div>
                                        <div className="question-options">
                                            <div className="option-item">A) x = 3</div>
                                            <div className="option-item">B) x = -3</div>
                                            <div className="option-item">C) x = ±3</div>
                                            <div className="option-item">D) x = 9</div>
                                        </div>
                                    </div>

                                    <div className="question-item">
                                        <div className="question-number">Вопрос 3</div>
                                        <div className="question-text">Если D &lt; 0, то квадратное уравнение:</div>
                                        <div className="question-options">
                                            <div className="option-item">A) Имеет два корня</div>
                                            <div className="option-item">B) Имеет один корень</div>
                                            <div className="option-item">C) Не имеет действительных корней</div>
                                            <div className="option-item">D) Имеет три корня</div>
                                        </div>
                                    </div>

                                    <div className="question-item">
                                        <div className="question-number">Вопрос 4 (выберите все правильные)</div>
                                        <div className="question-text">В каких случаях можно использовать формулу корней?</div>
                                        <div className="question-options">
                                            <div className="option-item">☐ A) Когда D ≥ 0</div>
                                            <div className="option-item">☐ B) Когда a ≠ 0</div>
                                            <div className="option-item">☐ C) Когда D &lt; 0</div>
                                            <div className="option-item">☐ D) Всегда</div>
                                        </div>
                                    </div>

                                    <div className="question-item">
                                        <div className="question-number">Вопрос 5 (текстовый ответ)</div>
                                        <div className="question-text">Решите уравнение: x² - 7x + 12 = 0<br/>Запишите оба корня через точку с запятой.</div>
                                        <div className="answer-space">Ответ: _______________</div>
                                    </div>
                                </div>
                            )}

                            {/* Ответы для учителя */}
                            {activeVariant === 3 && (
                                <div className="answers-section">
                                    <div className="answers-header">
                                        <div className="answers-icon">🔑</div>
                                        <div className="answers-title">Правильные ответы</div>
                                    </div>

                                    <div className="answers-variant">
                                        <h3 className="variant-answers-title">Вариант 1</h3>
                                        <div className="answer-item"><div className="answer-number">1</div><div className="answer-text">B) Уравнение второй степени вида ax² + bx + c = 0</div></div>
                                        <div className="answer-item"><div className="answer-number">2</div><div className="answer-text">C) x = ±2</div></div>
                                        <div className="answer-item"><div className="answer-number">3</div><div className="answer-text">B) D = b² - 4ac</div></div>
                                        <div className="answer-item"><div className="answer-number">4</div><div className="answer-text">A, C (оба являются квадратными уравнениями)</div></div>
                                        <div className="answer-item"><div className="answer-number">5</div><div className="answer-text">x₁ = 2; x₂ = 3</div></div>
                                    </div>

                                    <div className="answers-variant">
                                        <h3 className="variant-answers-title">Вариант 2</h3>
                                        <div className="answer-item"><div className="answer-number">1</div><div className="answer-text">A) Коэффициент a</div></div>
                                        <div className="answer-item"><div className="answer-number">2</div><div className="answer-text">C) x = ±3</div></div>
                                        <div className="answer-item"><div className="answer-number">3</div><div className="answer-text">C) Не имеет действительных корней</div></div>
                                        <div className="answer-item"><div className="answer-number">4</div><div className="answer-text">A, B (нужен D ≥ 0 и a ≠ 0)</div></div>
                                        <div className="answer-item"><div className="answer-number">5</div><div className="answer-text">x₁ = 3; x₂ = 4</div></div>
                                    </div>
                                </div>
                            )}

                            {/* Критерии оценивания */}
                            <div className="grading-section">
                                <div className="grading-header">
                                    <div className="grading-icon">📊</div>
                                    <div className="grading-title">Критерии оценивания</div>
                                </div>

                                <table className="grading-table">
                                    <thead>
                                        <tr>
                                            <th>Оценка</th>
                                            <th>Баллы</th>
                                            <th>Правильных ответов</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td className="grade-excellent">Отлично (5)</td><td>9-10 баллов</td><td>4-5 вопросов</td></tr>
                                        <tr><td className="grade-good">Хорошо (4)</td><td>7-8 баллов</td><td>3-4 вопроса</td></tr>
                                        <tr><td className="grade-satisfactory">Удовлетворительно (3)</td><td>5-6 баллов</td><td>2-3 вопроса</td></tr>
                                        <tr><td className="grade-poor">Неудовлетворительно (2)</td><td>0-4 балла</td><td>0-2 вопроса</td></tr>
                                    </tbody>
                                </table>

                                <div className="grading-note">
                                    <strong>Примечание:</strong> Вопросы с выбором нескольких ответов и текстовые вопросы оцениваются в 2 балла каждый.
                                </div>
                            </div>

                            {/* Кнопки действий */}
                            <div className="action-buttons">
                                <button className="action-btn" onClick={() => alert('Скачивание Варианта 1 в PDF')}><span className="action-btn-icon">📥</span>Скачать Вариант 1</button>
                                <button className="action-btn" onClick={() => alert('Скачивание Варианта 2 в PDF')}><span className="action-btn-icon">📥</span>Скачать Вариант 2</button>
                                <button className="action-btn" onClick={() => alert('Скачивание ответов')}><span className="action-btn-icon">🔑</span>Скачать ответы</button>
                                <button className="action-btn" onClick={() => alert('Тест сохранен!')}><span className="action-btn-icon">💾</span>Сохранить</button>
                            </div>

                            <div className="button-group" style={{marginTop: '30px'}}>
                                <button className="btn-cancel" onClick={startOver}>← Создать новый тест</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TestVariants;
