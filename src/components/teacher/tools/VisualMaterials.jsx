import React, { useState } from 'react';
import './VisualMaterials.css';
import { generateMaterials } from '../../../api/toolsService';

function VisualMaterials({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        materialType: '',
        topic: '',
        subject: '',
        grade: '',
        size: 'A4',
        content: ''
    });
    const [loadingStep, setLoadingStep] = useState(0);
    const [generatedContent, setGeneratedContent] = useState(null);
    const [error, setError] = useState(null);

    const materialTypes = [
        { id: 'poster', icon: '📊', name: 'Плакат', desc: 'Информационный постер' },
        { id: 'infographic', icon: '📈', name: 'Инфографика', desc: 'Визуализация данных' },
        { id: 'diagram', icon: '🔄', name: 'Схема', desc: 'Диаграммы и схемы' }
    ];

    const subjects = [
        'Математика', 'Физика', 'Химия', 'Биология',
        'История', 'География', 'Литература', 'Информатика',
        'Английский язык', 'Русский язык', 'Казахский язык'
    ];

    const sizes = [
        { value: 'A4', label: 'A4 (210×297 мм)' },
        { value: 'A3', label: 'A3 (297×420 мм)' },
        { value: 'A2', label: 'A2 (420×594 мм)' },
        { value: 'A1', label: 'A1 (594×841 мм)' }
    ];

    const loadingSteps = [
        { icon: '⏳', text: 'Анализируем контент...' },
        { icon: '📥', text: 'Подбираем визуальные элементы...' },
        { icon: '✨', text: 'Создаем дизайн...' },
        { icon: '📝', text: 'Формируем финальный материал...' }
    ];

    const infoList = [
        'Профессиональный дизайн',
        'Визуальные элементы и иконки',
        'Четкая структура информации',
        'Готово для печати',
        'Высокое разрешение (PDF/PNG)'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const selectMaterialType = (typeId) => {
        setFormData(prev => ({ ...prev, materialType: typeId }));
    };

    const handleSubmit = async () => {
        if (!formData.materialType) {
            alert('Пожалуйста, выберите тип материала');
            return;
        }
        if (!formData.topic || !formData.subject || !formData.grade || !formData.content) {
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
            const result = await generateMaterials({
                subject: formData.subject,
                topic: formData.topic,
                grade: formData.grade,
                material_type: formData.materialType,
                description: formData.content
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
            materialType: '',
            topic: '',
            subject: '',
            grade: '',
            size: 'A4',
            content: ''
        });
    };

    const handleClose = () => {
        handleReset();
        onClose();
    };

    const getMaterialTypeName = (typeId) => {
        const type = materialTypes.find(t => t.id === typeId);
        return type ? type.name : '';
    };

    if (!isOpen) return null;

    return (
        <div className="visual-materials-overlay" onClick={handleClose}>
            <div className="visual-materials-modal" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="visual-materials-header">
                    <div className="visual-materials-header-content">
                        <div className="visual-materials-icon">🖼️</div>
                        <div>
                            <h2>Наглядные материалы</h2>
                            <p>Плакаты, инфографика, схемы</p>
                        </div>
                    </div>
                    <button className="visual-materials-close" onClick={handleClose}>&times;</button>
                </div>

                {/* Progress Bar */}
                <div className="visual-materials-progress">
                    <div className="progress-info">
                        <span className="progress-title">
                            {step === 1 && 'Настройка материала'}
                            {step === 2 && 'Генерация материала...'}
                            {step === 3 && 'Материал готов!'}
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
                <div className="visual-materials-content">
                    {/* Step 1: Form */}
                    {step === 1 && (
                        <div className="visual-materials-form">
                            <div className="form-section">
                                <h3 className="section-title">Тип материала</h3>
                                <div className="material-types-grid">
                                    {materialTypes.map(type => (
                                        <div
                                            key={type.id}
                                            className={`material-type-card ${formData.materialType === type.id ? 'selected' : ''}`}
                                            onClick={() => selectMaterialType(type.id)}
                                        >
                                            <div className="material-type-icon">{type.icon}</div>
                                            <div className="material-type-name">{type.name}</div>
                                            <div className="material-type-desc">{type.desc}</div>
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
                                            placeholder="Например: Круговорот воды в природе"
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
                                        <label>Размер</label>
                                        <select
                                            name="size"
                                            value={formData.size}
                                            onChange={handleInputChange}
                                        >
                                            {sizes.map(size => (
                                                <option key={size.value} value={size.value}>{size.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-grid full-width" style={{ marginTop: '20px' }}>
                                    <div className="form-group">
                                        <label>Что должно быть включено <span className="required">*</span></label>
                                        <textarea
                                            name="content"
                                            value={formData.content}
                                            onChange={handleInputChange}
                                            placeholder="Опишите содержание материала: основные элементы, данные, информация..."
                                        />
                                    </div>
                                </div>

                                <div className="info-box">
                                    <div className="info-box-title">
                                        <span>🖼️</span> Что будет создано:
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
                                    Создать материал
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Loading */}
                    {step === 2 && (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <h3 className="loading-title">Создаем наглядный материал</h3>
                            <p className="loading-subtitle">Генерируем дизайн и компоновку...</p>

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
                                <h3>Материал готов!</h3>
                                <div className="result-badges">
                                    <span className="badge badge-success">Готово</span>
                                </div>
                            </div>

                            <div className="result-info">
                                <div className="result-info-item">
                                    <span>🖼️</span> {getMaterialTypeName(formData.materialType)}
                                </div>
                                <div className="result-info-item">
                                    <span>📊</span> {formData.topic}
                                </div>
                                <div className="result-info-item">
                                    <span>📐</span> {formData.size}
                                </div>
                            </div>

                            <div className="material-preview">
                                <div className="size-badge">{formData.size}</div>
                                <div className="preview-placeholder">
                                    <div className="preview-placeholder-icon">🖼️</div>
                                    <div className="preview-placeholder-text">
                                        {getMaterialTypeName(formData.materialType)}: {formData.topic}
                                    </div>
                                    <div className="preview-placeholder-desc">
                                        Готовый материал будет создан в высоком разрешении<br/>
                                        и оптимизирован для печати
                                    </div>
                                </div>
                            </div>

                            <div className="button-group result-buttons">
                                <button className="btn-cancel" onClick={handleReset}>
                                    Создать новый
                                </button>
                                <button className="btn-generate btn-download">
                                    Скачать PDF
                                </button>
                                <button className="btn-generate btn-download">
                                    Скачать PNG
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

export default VisualMaterials;
