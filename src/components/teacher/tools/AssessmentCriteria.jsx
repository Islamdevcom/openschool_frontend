import React, { useState } from 'react';
import './AssessmentCriteria.css';
import { generateRubric } from '../../../api/toolsService';

function AssessmentCriteria({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        workType: '',
        subject: '',
        grade: '',
        topic: '',
        criteriaCount: 4,
        assessmentAreas: ''
    });
    const [loadingStep, setLoadingStep] = useState(0);
    const [generatedContent, setGeneratedContent] = useState(null);
    const [error, setError] = useState(null);

    const workTypes = [
        { id: 'soc', icon: '📝', name: 'СОЧ' },
        { id: 'sor', icon: '📄', name: 'СОР' },
        { id: 'project', icon: '📁', name: 'Проект' },
        { id: 'presentation', icon: '💼', name: 'Презентация' }
    ];

    const subjects = [
        'Математика', 'Физика', 'Химия', 'Биология',
        'История', 'География', 'Русский язык',
        'Казахский язык', 'Английский язык', 'Информатика'
    ];

    const loadingSteps = [
        { icon: '⏳', text: 'Анализируем тему...' },
        { icon: '📥', text: 'Определяем критерии...' },
        { icon: '✨', text: 'Создаем уровни достижения...' },
        { icon: '📝', text: 'Формируем таблицу...' }
    ];

    const infoList = [
        'Таблица критериев оценивания (Rubric)',
        '4 уровня достижения (A/B/C/D)',
        'Описание каждого уровня',
        'Система баллов',
        'Готово для использования'
    ];

    const sampleCriteria = [
        {
            name: 'Знание материала',
            levels: {
                a: 'Демонстрирует глубокое понимание всех концепций',
                b: 'Демонстрирует хорошее понимание большинства концепций',
                c: 'Демонстрирует базовое понимание основных концепций',
                d: 'Демонстрирует ограниченное понимание'
            }
        },
        {
            name: 'Применение навыков',
            levels: {
                a: 'Безошибочно применяет все необходимые навыки',
                b: 'Применяет навыки с незначительными ошибками',
                c: 'Применяет базовые навыки с ошибками',
                d: 'Испытывает трудности с применением навыков'
            }
        },
        {
            name: 'Точность выполнения',
            levels: {
                a: 'Все вычисления точны и правильны',
                b: 'Большинство вычислений точны',
                c: 'Часть вычислений содержит ошибки',
                d: 'Множественные ошибки в вычислениях'
            }
        },
        {
            name: 'Оформление работы',
            levels: {
                a: 'Работа оформлена образцово',
                b: 'Работа оформлена хорошо',
                c: 'Работа оформлена удовлетворительно',
                d: 'Оформление требует улучшения'
            }
        }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const selectWorkType = (typeId) => {
        setFormData(prev => ({ ...prev, workType: typeId }));
    };

    const handleSubmit = async () => {
        if (!formData.workType) {
            alert('Пожалуйста, выберите тип работы');
            return;
        }
        if (!formData.subject || !formData.grade || !formData.topic) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }
        setStep(2);
        setError(null);

        // Simulate loading steps
        let currentStep = 0;
        const interval = setInterval(() => {
            currentStep++;
            setLoadingStep(currentStep);
            if (currentStep >= loadingSteps.length) {
                clearInterval(interval);
            }
        }, 800);

        try {
            const result = await generateRubric({
                subject: formData.subject,
                topic: formData.topic,
                grade: formData.grade,
                assignment_type: formData.workType,
                criteria_count: formData.criteriaCount,
                assessment_areas: formData.assessmentAreas
            });

            clearInterval(interval);
            if (result.success) {
                setGeneratedContent(result.content);
            }
            setTimeout(() => setStep(3), 500);
        } catch (err) {
            clearInterval(interval);
            setError(err.message);
            // Fallback to demo data
            setTimeout(() => setStep(3), 500);
        }
    };

    const handleReset = () => {
        setStep(1);
        setLoadingStep(0);
        setGeneratedContent(null);
        setError(null);
        setFormData({
            workType: '',
            subject: '',
            grade: '',
            topic: '',
            criteriaCount: 4,
            assessmentAreas: ''
        });
    };

    const handleClose = () => {
        handleReset();
        onClose();
    };

    const getWorkTypeName = (typeId) => {
        const type = workTypes.find(t => t.id === typeId);
        return type ? type.name : '';
    };

    if (!isOpen) return null;

    return (
        <div className="assessment-criteria-overlay" onClick={handleClose}>
            <div className="assessment-criteria-modal" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="assessment-criteria-header">
                    <div className="assessment-criteria-header-content">
                        <div className="assessment-criteria-icon">📏</div>
                        <div>
                            <h2>Критерии оценивания</h2>
                            <p>Рубрики для СОЧ/СОР</p>
                        </div>
                    </div>
                    <button className="assessment-criteria-close" onClick={handleClose}>&times;</button>
                </div>

                {/* Progress Bar */}
                <div className="assessment-criteria-progress">
                    <div className="progress-info">
                        <span className="progress-title">
                            {step === 1 && 'Настройка критериев'}
                            {step === 2 && 'Генерация критериев...'}
                            {step === 3 && 'Критерии готовы!'}
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
                <div className="assessment-criteria-content">
                    {/* Step 1: Form */}
                    {step === 1 && (
                        <div className="assessment-criteria-form">
                            <div className="form-section">
                                <h3 className="section-title">Тип работы</h3>
                                <div className="work-types-grid">
                                    {workTypes.map(type => (
                                        <div
                                            key={type.id}
                                            className={`work-type-card ${formData.workType === type.id ? 'selected' : ''}`}
                                            onClick={() => selectWorkType(type.id)}
                                        >
                                            <div className="work-type-icon">{type.icon}</div>
                                            <div className="work-type-name">{type.name}</div>
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
                                        <label>Тема работы <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="topic"
                                            value={formData.topic}
                                            onChange={handleInputChange}
                                            placeholder="Например: Алгебраические выражения"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Количество критериев</label>
                                        <input
                                            type="number"
                                            name="criteriaCount"
                                            value={formData.criteriaCount}
                                            onChange={handleInputChange}
                                            min="2"
                                            max="10"
                                            placeholder="4"
                                        />
                                    </div>
                                </div>

                                <div className="form-grid full-width" style={{ marginTop: '20px' }}>
                                    <div className="form-group">
                                        <label>Что оценивается</label>
                                        <textarea
                                            name="assessmentAreas"
                                            value={formData.assessmentAreas}
                                            onChange={handleInputChange}
                                            placeholder="Опишите основные аспекты, которые нужно оценить (например: знание формул, умение применять, точность вычислений...)"
                                        />
                                    </div>
                                </div>

                                <div className="info-box">
                                    <div className="info-box-title">
                                        <span>📏</span> Что будет создано:
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
                                    Создать критерии
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Loading */}
                    {step === 2 && (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <h3 className="loading-title">Создаем критерии оценивания</h3>
                            <p className="loading-subtitle">Генерируем рубрику...</p>

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
                                <h3>Критерии оценивания готовы!</h3>
                                <div className="result-badges">
                                    <span className="badge badge-success">Готово</span>
                                </div>
                            </div>

                            <div className="result-info">
                                <div className="result-info-item">
                                    <span>📏</span> {getWorkTypeName(formData.workType)}
                                </div>
                                <div className="result-info-item">
                                    <span>📚</span> {formData.subject}
                                </div>
                                <div className="result-info-item">
                                    <span>📊</span> {formData.topic}
                                </div>
                            </div>

                            {generatedContent ? (
                                <div className="rubric-preview">
                                    <div className="rubric-title">
                                        Критерии оценивания: {formData.topic}<br/>
                                        {formData.subject}, {formData.grade} класс
                                    </div>
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
                                </div>
                            ) : (
                            <div className="rubric-preview">
                                <div className="rubric-title">
                                    Критерии оценивания: {formData.topic}<br/>
                                    {formData.subject}, {formData.grade} класс
                                </div>

                                <table className="rubric-table">
                                    <thead>
                                        <tr>
                                            <th>Критерий</th>
                                            <th>Уровень A<br/>(Отлично)</th>
                                            <th>Уровень B<br/>(Хорошо)</th>
                                            <th>Уровень C<br/>(Удовл.)</th>
                                            <th>Уровень D<br/>(Треб. улучш.)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sampleCriteria.map((criterion, idx) => (
                                            <tr key={idx}>
                                                <td className="criterion-name">{criterion.name}</td>
                                                <td className="level-a">
                                                    <span className="level-badge a">A</span>
                                                    {criterion.levels.a}
                                                </td>
                                                <td className="level-b">
                                                    <span className="level-badge b">B</span>
                                                    {criterion.levels.b}
                                                </td>
                                                <td className="level-c">
                                                    <span className="level-badge c">C</span>
                                                    {criterion.levels.c}
                                                </td>
                                                <td className="level-d">
                                                    <span className="level-badge d">D</span>
                                                    {criterion.levels.d}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="scoring-system">
                                    <strong>Система баллов:</strong><br/>
                                    Уровень A (Отлично): 90-100%<br/>
                                    Уровень B (Хорошо): 75-89%<br/>
                                    Уровень C (Удовлетворительно): 50-74%<br/>
                                    Уровень D (Требует улучшения): 0-49%
                                </div>
                            </div>
                            )}

                            <div className="button-group result-buttons">
                                <button className="btn-cancel" onClick={handleReset}>
                                    Создать новые
                                </button>
                                <button className="btn-generate btn-download">
                                    Скачать DOCX
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

export default AssessmentCriteria;
