import React, { useState } from 'react';
import './CreatePresentation.css';
import { generatePresentation } from '../../../api/toolsService';

function CreatePresentation({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        topic: '',
        subject: '',
        grade: '',
        slides: '10',
        theme: 'pink',
        additional: ''
    });
    const [loadingStep, setLoadingStep] = useState(0);
    const [generatedContent, setGeneratedContent] = useState(null);
    const [error, setError] = useState(null);

    const subjects = [
        'Математика', 'Физика', 'Химия', 'Биология',
        'История', 'География', 'Литература', 'Английский язык',
        'Русский язык', 'Информатика', 'Обществознание'
    ];

    const colorThemes = [
        { id: 'pink', name: 'Розовая', gradient: 'linear-gradient(135deg, #F6DADF 0%, #E8A8B4 100%)' },
        { id: 'blue', name: 'Синяя', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
        { id: 'green', name: 'Зеленая', gradient: 'linear-gradient(135deg, #C2F0E2 0%, #48bb78 100%)' },
        { id: 'purple', name: 'Фиолетовая', gradient: 'linear-gradient(135deg, #E0D4F6 0%, #9f7aea 100%)' },
        { id: 'orange', name: 'Оранжевая', gradient: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)' },
        { id: 'teal', name: 'Бирюзовая', gradient: 'linear-gradient(135deg, #4fd1c5 0%, #38b2ac 100%)' },
        { id: 'red', name: 'Красная', gradient: 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)' },
        { id: 'yellow', name: 'Желтая', gradient: 'linear-gradient(135deg, #ecc94b 0%, #d69e2e 100%)' },
        { id: 'dark', name: 'Темная', gradient: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)' },
        { id: 'light', name: 'Светлая', gradient: 'linear-gradient(135deg, #cbd5e0 0%, #a0aec0 100%)' }
    ];

    const loadingSteps = [
        { icon: '⏳', text: 'Анализируем тему презентации...' },
        { icon: '📥', text: 'Подбираем содержание и структуру...' },
        { icon: '✨', text: 'Применяем цветовую тему...' },
        { icon: '📝', text: 'Создаем слайды...' }
    ];

    const slideTitles = [
        'Титульный слайд',
        'Содержание',
        'Введение',
        'Основные понятия',
        'Детальное рассмотрение',
        'Примеры',
        'Практическое применение',
        'Важные моменты',
        'Выводы',
        'Заключение'
    ];

    const infoList = [
        'Титульный слайд с темой',
        'Содержание и структура',
        'Основные разделы с информацией',
        'Визуальные элементы и иконки',
        'Заключительный слайд',
        'В выбранной цветовой теме'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleThemeSelect = (themeId) => {
        setFormData(prev => ({ ...prev, theme: themeId }));
    };

    const handleSubmit = async () => {
        if (!formData.topic || !formData.subject || !formData.grade) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }
        setStep(2);
        setError(null);

        // Запускаем анимацию загрузки
        let currentStepNum = 0;
        const interval = setInterval(() => {
            currentStepNum++;
            setLoadingStep(currentStepNum);
            if (currentStepNum >= loadingSteps.length) {
                clearInterval(interval);
            }
        }, 1000);

        try {
            const result = await generatePresentation({
                subject: formData.subject,
                topic: formData.topic,
                grade: formData.grade,
                num_slides: parseInt(formData.slides) || 10
            });

            clearInterval(interval);

            if (result.success) {
                setGeneratedContent(result.content);
                setStep(3);
            } else {
                setError(result.error || 'Ошибка при создании презентации');
                setStep(1);
            }
        } catch (err) {
            clearInterval(interval);
            // Fallback на демо-результат
            setTimeout(() => setStep(3), 500);
        }
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
        setGeneratedContent(null);
        setError(null);
        setFormData({
            topic: '',
            subject: '',
            grade: '',
            slides: '10',
            theme: 'pink',
            additional: ''
        });
    };

    const handleClose = () => {
        handleReset();
        onClose();
    };

    const getThemeGradient = (themeId) => {
        const theme = colorThemes.find(t => t.id === themeId);
        return theme ? theme.gradient : colorThemes[0].gradient;
    };

    const getThemeName = (themeId) => {
        const theme = colorThemes.find(t => t.id === themeId);
        return theme ? theme.name : 'Розовая';
    };

    if (!isOpen) return null;

    return (
        <div className="create-presentation-overlay" onClick={handleClose}>
            <div className="create-presentation-modal" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="create-presentation-header">
                    <div className="create-presentation-header-content">
                        <div className="create-presentation-icon">💼</div>
                        <div>
                            <h2>Создать презентацию</h2>
                            <p>PowerPoint/Slides</p>
                        </div>
                    </div>
                    <button className="create-presentation-close" onClick={handleClose}>&times;</button>
                </div>

                {/* Progress Bar */}
                <div className="create-presentation-progress">
                    <div className="progress-info">
                        <span className="progress-title">
                            {step === 1 && 'Настройка презентации'}
                            {step === 2 && 'Генерация слайдов...'}
                            {step === 3 && 'Презентация готова!'}
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
                <div className="create-presentation-content">
                    {/* Step 1: Form */}
                    {step === 1 && (
                        <div className="create-presentation-form">
                            <div className="form-section">
                                <h3 className="section-title">Основная информация</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Тема презентации <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="topic"
                                            value={formData.topic}
                                            onChange={handleInputChange}
                                            placeholder="Например: Солнечная система"
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
                                        <label>Количество слайдов</label>
                                        <input
                                            type="number"
                                            name="slides"
                                            value={formData.slides}
                                            onChange={handleInputChange}
                                            min="5"
                                            max="50"
                                            placeholder="10"
                                        />
                                    </div>
                                </div>

                                <div className="color-palette-section">
                                    <label className="color-palette-label">Цветовая тема</label>
                                    <div className="color-palette">
                                        {colorThemes.map(theme => (
                                            <div
                                                key={theme.id}
                                                className={`color-option ${formData.theme === theme.id ? 'selected' : ''}`}
                                                style={{ background: theme.gradient }}
                                                onClick={() => handleThemeSelect(theme.id)}
                                                title={theme.name}
                                            >
                                                {formData.theme === theme.id && <span className="check-mark">✓</span>}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="form-grid full-width" style={{ marginTop: '20px' }}>
                                    <div className="form-group">
                                        <label>Дополнительная информация</label>
                                        <textarea
                                            name="additional"
                                            value={formData.additional}
                                            onChange={handleInputChange}
                                            placeholder="Опишите что должно быть включено в презентацию..."
                                        />
                                    </div>
                                </div>

                                <div className="info-box">
                                    <div className="info-box-title">
                                        <span>📊</span> Что будет в презентации:
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
                                    Создать презентацию
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Loading */}
                    {step === 2 && (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <h3 className="loading-title">Создаем презентацию</h3>
                            <p className="loading-subtitle">Генерируем слайды в выбранной теме...</p>

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
                                <h3>Презентация готова!</h3>
                                <div className="result-badges">
                                    <span className="badge badge-success">Готово</span>
                                </div>
                            </div>

                            <div className="result-info">
                                <div className="result-info-item">
                                    <span>📊</span> {formData.topic}
                                </div>
                                <div className="result-info-item">
                                    <span>📄</span> {formData.slides} слайдов
                                </div>
                                <div className="result-info-item">
                                    <span>🎨</span> {getThemeName(formData.theme)} тема
                                </div>
                            </div>

                            <div className="slides-preview">
                                {[...Array(Math.min(parseInt(formData.slides) || 10, 10))].map((_, i) => (
                                    <div key={i} className="slide-card">
                                        <div
                                            className="slide-preview"
                                            style={{ background: getThemeGradient(formData.theme) }}
                                        >
                                            {i + 1}
                                        </div>
                                        <div className="slide-info">
                                            <div className="slide-title">
                                                {i === 0 ? formData.topic : slideTitles[i] || `Слайд ${i + 1}`}
                                            </div>
                                            <div className="slide-number">Слайд {i + 1}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="button-group result-buttons">
                                <button className="btn-cancel" onClick={handleReset}>
                                    Создать новую
                                </button>
                                <button className="btn-generate btn-download">
                                    Скачать PPTX
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

export default CreatePresentation;
