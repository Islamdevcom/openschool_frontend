import React, { useState } from 'react';
import './SochSorGenerator.css';

function SochSorGenerator({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        workType: '',
        subject: '',
        grade: '',
        section: '',
        quarter: '',
        goals: ''
    });
    const [loadingStep, setLoadingStep] = useState(0);

    const workTypes = [
        { id: 'SOC', icon: '📝', name: 'СОЧ', desc: 'Суммативное оценивание за четверть' },
        { id: 'SOR', icon: '📄', name: 'СОР', desc: 'Суммативное оценивание за раздел' }
    ];

    const subjects = [
        'Математика', 'Физика', 'Химия', 'Биология',
        'История Казахстана', 'География', 'Русский язык',
        'Казахский язык', 'Английский язык', 'Информатика'
    ];

    const quarters = [
        { value: '1', label: '1 четверть' },
        { value: '2', label: '2 четверть' },
        { value: '3', label: '3 четверть' },
        { value: '4', label: '4 четверть' }
    ];

    const loadingSteps = [
        { icon: '⏳', text: 'Анализируем цели обучения...' },
        { icon: '📥', text: 'Подбираем задания...' },
        { icon: '✨', text: 'Создаем критерии оценивания...' },
        { icon: '📝', text: 'Формируем дескрипторы...' }
    ];

    const infoList = [
        'Задания согласно целям обучения',
        'Критерии оценивания',
        'Дескрипторы для каждого задания',
        'Схема выставления баллов'
    ];

    const sampleTasks = [
        { num: 1, goal: 'X.X.X.X', text: 'Пример задания по указанным целям обучения...', points: 2 },
        { num: 2, goal: 'X.X.X.X', text: 'Еще одно задание...', points: 2 },
        { num: 3, goal: 'X.X.X.X', text: 'Третье задание...', points: 2 }
    ];

    const sampleCriteria = [
        { task: 1, criterion: 'Применяет знания...', descriptors: ['выполняет первую часть', 'выполняет вторую часть'], points: [1, 1] },
        { task: 2, criterion: 'Анализирует...', descriptors: ['определяет...', 'объясняет...'], points: [1, 1] }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const selectWorkType = (typeId) => {
        setFormData(prev => ({ ...prev, workType: typeId }));
    };

    const handleSubmit = () => {
        if (!formData.workType) {
            alert('Пожалуйста, выберите тип работы (СОЧ или СОР)');
            return;
        }
        if (!formData.subject || !formData.grade || !formData.section || !formData.goals) {
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
            workType: '',
            subject: '',
            grade: '',
            section: '',
            quarter: '',
            goals: ''
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

    const getWorkTypeFullName = (typeId) => {
        return typeId === 'SOC' ? 'Суммативное оценивание за четверть' : 'Суммативное оценивание за раздел';
    };

    if (!isOpen) return null;

    return (
        <div className="soch-sor-overlay" onClick={handleClose}>
            <div className="soch-sor-modal" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="soch-sor-header">
                    <div className="soch-sor-header-content">
                        <div className="soch-sor-icon">📊</div>
                        <div>
                            <h2>Генератор СОЧ/СОР</h2>
                            <p>Задания, критерии и дескрипторы по стандартам МОН РК</p>
                        </div>
                    </div>
                    <button className="soch-sor-close" onClick={handleClose}>&times;</button>
                </div>

                {/* Progress Bar */}
                <div className="soch-sor-progress">
                    <div className="progress-info">
                        <span className="progress-title">
                            {step === 1 && 'Настройка работы'}
                            {step === 2 && 'Генерация работы...'}
                            {step === 3 && 'Работа готова!'}
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
                <div className="soch-sor-content">
                    {/* Step 1: Form */}
                    {step === 1 && (
                        <div className="soch-sor-form">
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
                                            <div className="work-type-desc">{type.desc}</div>
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
                                        <label>Раздел/Четверть <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="section"
                                            value={formData.section}
                                            onChange={handleInputChange}
                                            placeholder="Например: Раздел 1 - Алгебраические выражения"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Четверть (для СОЧ)</label>
                                        <select
                                            name="quarter"
                                            value={formData.quarter}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Не применимо</option>
                                            {quarters.map(q => (
                                                <option key={q.value} value={q.value}>{q.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-grid full-width" style={{ marginTop: '20px' }}>
                                    <div className="form-group">
                                        <label>Цели обучения <span className="required">*</span></label>
                                        <textarea
                                            name="goals"
                                            value={formData.goals}
                                            onChange={handleInputChange}
                                            placeholder="Укажите цели обучения из учебной программы (например: 5.1.2.3, 5.1.2.4)..."
                                        />
                                    </div>
                                </div>

                                <div className="info-box">
                                    <div className="info-box-title">
                                        <span>📊</span> Что будет создано:
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
                                    Создать работу
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Loading */}
                    {step === 2 && (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <h3 className="loading-title">Создаем суммативную работу</h3>
                            <p className="loading-subtitle">Генерируем согласно стандартам МОН РК...</p>

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
                                <h3>Работа готова!</h3>
                                <div className="result-badges">
                                    <span className="badge badge-success">Готово</span>
                                </div>
                            </div>

                            <div className="result-info">
                                <div className="result-info-item">
                                    <span>📊</span> {getWorkTypeName(formData.workType)}
                                </div>
                                <div className="result-info-item">
                                    <span>📚</span> {formData.subject}
                                </div>
                                <div className="result-info-item">
                                    <span>🎓</span> {formData.grade} класс
                                </div>
                                <div className="result-info-item">
                                    <span>📖</span> {formData.section}
                                </div>
                            </div>

                            <div className="assessment-preview">
                                <div className="assessment-title">
                                    {getWorkTypeFullName(formData.workType)}<br/>
                                    {formData.subject}, {formData.grade} класс<br/>
                                    {formData.section}
                                </div>

                                <div className="assessment-section">
                                    <div className="assessment-section-title">Задания</div>
                                    {sampleTasks.map(task => (
                                        <div key={task.num} className="task-block">
                                            <div className="task-header">
                                                Задание {task.num}. [Цель обучения: {task.goal}]
                                            </div>
                                            <p>{task.text}</p>
                                            <p className="task-points">[{task.points} баллов]</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="assessment-section">
                                    <div className="assessment-section-title">Критерии оценивания и дескрипторы</div>
                                    <table className="criteria-table">
                                        <thead>
                                            <tr>
                                                <th>Задание</th>
                                                <th>Критерий оценивания</th>
                                                <th>Дескриптор</th>
                                                <th>Балл</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sampleCriteria.map((item, idx) => (
                                                <React.Fragment key={idx}>
                                                    {item.descriptors.map((desc, descIdx) => (
                                                        <tr key={`${idx}-${descIdx}`}>
                                                            {descIdx === 0 && (
                                                                <>
                                                                    <td rowSpan={item.descriptors.length}>{item.task}</td>
                                                                    <td rowSpan={item.descriptors.length}>{item.criterion}</td>
                                                                </>
                                                            )}
                                                            <td>- {desc}</td>
                                                            <td>{item.points[descIdx]}</td>
                                                        </tr>
                                                    ))}
                                                </React.Fragment>
                                            ))}
                                            <tr className="total-row">
                                                <td colSpan={3}>Всего баллов:</td>
                                                <td>6</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="button-group result-buttons">
                                <button className="btn-cancel" onClick={handleReset}>
                                    Создать новую
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

export default SochSorGenerator;
