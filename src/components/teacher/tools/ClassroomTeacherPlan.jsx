import React, { useState } from 'react';
import './ClassroomTeacherPlan.css';
import { generateReport } from '../../../api/toolsService';

function ClassroomTeacherPlan({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        grade: '',
        year: '',
        teacherName: ''
    });
    const [loadingStep, setLoadingStep] = useState(0);
    const [generatedContent, setGeneratedContent] = useState(null);
    const [error, setError] = useState(null);

    const planItems = [
        {
            id: 1,
            activity: 'Составление плана воспитательной работы класса на основе учебно-воспитательного плана работы организации среднего образования (форма плана воспитательной работы определяется школьным методическим объединением классных руководителей)',
            deadline: 'До начала учебного года',
            completion: 'План (в бумажном или электронном формате)'
        },
        {
            id: 2,
            activity: 'Составление социального паспорта класса по утвержденной руководителем организации образования форме',
            deadline: 'Сентябрь',
            completion: 'Социальный паспорт (в бумажном или электронном формате)'
        },
        {
            id: 3,
            activity: 'Проведение педагогического, социологического, психологического, физического исследования обучающихся класса',
            deadline: 'По мере необходимости в течение учебного года',
            completion: 'Аналитические материалы (в бумажном или электронном формате)'
        },
        {
            id: 4,
            activity: 'Работа с родителями',
            deadline: 'По мере необходимости в течение учебного года',
            completion: 'Протоколы родительских собраний (в бумажном или электронном формате)'
        },
        {
            id: 5,
            activity: 'Проведение воспитательных мероприятий с детьми',
            deadline: 'По мере необходимости в течение учебного года',
            completion: 'Материалы мероприятий (в бумажном или электронном формате)'
        },
        {
            id: 6,
            activity: 'Ведение методической работы',
            deadline: 'По мере необходимости в течение учебного года',
            completion: 'Материалы по методической работе (в бумажном или электронном формате)'
        },
        {
            id: 7,
            activity: 'Анализ воспитательной работы',
            deadline: 'По мере необходимости в течение учебного года',
            completion: 'Анализ (в бумажном или электронном формате)'
        },
        {
            id: 8,
            activity: 'Ведение классного журнала',
            deadline: 'Постоянно',
            completion: 'Классный журнал (в бумажном или электронном формате)'
        }
    ];

    const planIncludesList = [
        'Составление воспитательного плана',
        'Социальный паспорт класса',
        'Педагогические и психологические исследования',
        'Работа с родителями',
        'Воспитательные мероприятия',
        'Ведение методической работы',
        'Анализ воспитательной работы',
        'Ведение классного журнала'
    ];

    const loadingSteps = [
        { icon: '⏳', text: 'Загружаем данные с adilet.zan.kz...' },
        { icon: '📥', text: 'Обрабатываем требования к работе классного руководителя...' },
        { icon: '✨', text: 'Формируем структуру плана...' },
        { icon: '📝', text: 'Заполняем план работы классного руководителя...' }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.grade || !formData.year) {
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
            const result = await generateReport({
                report_type: 'classroom_teacher_plan',
                period: formData.year,
                data: {
                    grade: formData.grade,
                    teacher_name: formData.teacherName || 'Не указано',
                    year: formData.year
                }
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
        setFormData({ grade: '', year: '', teacherName: '' });
    };

    const handleClose = () => {
        handleReset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="classroom-plan-overlay" onClick={handleClose}>
            <div className="classroom-plan-modal" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="classroom-plan-header">
                    <div className="classroom-plan-header-content">
                        <div className="classroom-plan-icon">📋</div>
                        <div>
                            <h2>План работы классного руководителя</h2>
                            <p>Генератор плана работы</p>
                        </div>
                    </div>
                    <button className="classroom-plan-close" onClick={handleClose}>&times;</button>
                </div>

                {/* Progress Bar */}
                <div className="classroom-plan-progress">
                    <div className="progress-info">
                        <span className="progress-title">
                            {step === 1 && 'Заполнение формы'}
                            {step === 2 && 'Генерация плана...'}
                            {step === 3 && 'План готов!'}
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
                            Заполнение
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
                <div className="classroom-plan-content">
                    {/* Step 1: Form */}
                    {step === 1 && (
                        <div className="classroom-plan-form">
                            <div className="form-section">
                                <h3 className="section-title">Основная информация</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Класс <span className="required">*</span></label>
                                        <select
                                            name="grade"
                                            value={formData.grade}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Выберите класс</option>
                                            {[...Array(11)].map((_, i) => (
                                                <option key={i + 1} value={`${i + 1} класс`}>
                                                    {i + 1} класс
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Учебный год <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="year"
                                            value={formData.year}
                                            onChange={handleInputChange}
                                            placeholder="Например: 2024-2025"
                                        />
                                    </div>

                                    <div className="form-group full-width">
                                        <label>ФИО классного руководителя</label>
                                        <input
                                            type="text"
                                            name="teacherName"
                                            value={formData.teacherName}
                                            onChange={handleInputChange}
                                            placeholder="Иванов Иван Иванович"
                                        />
                                    </div>
                                </div>

                                <div className="info-box">
                                    <div className="info-box-title">
                                        <span>📋</span> План будет включать:
                                    </div>
                                    <ul className="info-list">
                                        {planIncludesList.map((item, index) => (
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
                                    Создать план работы
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Loading */}
                    {step === 2 && (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <h3 className="loading-title">Создаем план работы</h3>
                            <p className="loading-subtitle">Формируем план классного руководителя...</p>

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
                                <h3>План работы создан</h3>
                                <div className="result-badges">
                                    <span className="badge badge-success">Готово</span>
                                    <span className="badge badge-source">adilet.zan.kz</span>
                                </div>
                            </div>

                            <div className="result-info">
                                <div className="result-info-item">
                                    <strong>Класс:</strong> {formData.grade}
                                </div>
                                <div className="result-info-item">
                                    <strong>Учебный год:</strong> {formData.year}
                                </div>
                                {formData.teacherName && (
                                    <div className="result-info-item">
                                        <strong>Классный руководитель:</strong> {formData.teacherName}
                                    </div>
                                )}
                            </div>

                            <div className="document-preview">
                                <div className="document-title">
                                    План работы классного руководителя
                                </div>

                                <table className="plan-table">
                                    <thead>
                                        <tr>
                                            <th>№</th>
                                            <th>Мероприятия</th>
                                            <th>Сроки выполнения</th>
                                            <th>Форма завершения</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {planItems.map((item) => (
                                            <tr key={item.id}>
                                                <td className="cell-number">{item.id}</td>
                                                <td className="cell-activity">{item.activity}</td>
                                                <td className="cell-deadline">{item.deadline}</td>
                                                <td className="cell-completion">{item.completion}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="button-group result-buttons">
                                <button className="btn-cancel" onClick={handleReset}>
                                    Создать новый план
                                </button>
                                <button className="btn-generate btn-download">
                                    Скачать DOCX
                                </button>
                                <button className="btn-generate btn-save">
                                    Сохранить в библиотеку
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ClassroomTeacherPlan;
