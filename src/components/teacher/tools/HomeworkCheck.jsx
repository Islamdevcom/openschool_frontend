import React, { useState, useEffect } from 'react';
import './HomeworkCheck.css';

function HomeworkCheck({ isOpen, onClose }) {
    // State management
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [currentTopic, setCurrentTopic] = useState('');
    const [currentStudentName, setCurrentStudentName] = useState('');
    const [uploadMethod, setUploadMethod] = useState(null);
    const [aiSuggestedGrade, setAiSuggestedGrade] = useState(null);
    const [modifiedGrade, setModifiedGrade] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [topicManual, setTopicManual] = useState('');
    const [topicList, setTopicList] = useState('');
    const [showGradeEditor, setShowGradeEditor] = useState(false);
    const [gradeInput, setGradeInput] = useState('');
    const [selectedNotebook, setSelectedNotebook] = useState(null);
    const [aiResult, setAiResult] = useState('');

    // Classes and students data
    const classesData = [
        {
            id: 1,
            name: '8А',
            students: [
                { id: 1, name: 'Алия Кенжебекова', avatar: '👧' },
                { id: 2, name: 'Арман Бекмуханов', avatar: '👦' },
                { id: 3, name: 'Айгерим Махамбетова', avatar: '👧' },
                { id: 4, name: 'Ерлан Токаев', avatar: '👦' }
            ]
        },
        {
            id: 2,
            name: '7Б',
            students: [
                { id: 5, name: 'Дана Сулейменова', avatar: '👧' },
                { id: 6, name: 'Нурлан Каримов', avatar: '👦' },
                { id: 7, name: 'Сауле Абдуллаева', avatar: '👧' }
            ]
        },
        {
            id: 3,
            name: '9В',
            students: [
                { id: 8, name: 'Темирлан Жумабаев', avatar: '👦' },
                { id: 9, name: 'Камила Нурланова', avatar: '👧' },
                { id: 10, name: 'Асхат Байжанов', avatar: '👦' }
            ]
        },
        {
            id: 4,
            name: '10А',
            students: [
                { id: 11, name: 'Жанна Омарова', avatar: '👧' },
                { id: 12, name: 'Ермек Садыков', avatar: '👦' }
            ]
        }
    ];

    const onlineNotebooks = [
        { id: 1, title: 'Квадратные уравнения', date: '20.10.2025', icon: '📝' },
        { id: 2, title: 'Системы уравнений', date: '18.10.2025', icon: '📐' },
        { id: 3, title: 'Производная', date: '15.10.2025', icon: '📊' },
        { id: 4, title: 'Теорема Пифагора', date: '12.10.2025', icon: '🔺' }
    ];

    const topics = [
        'Квадратные уравнения',
        'Системы линейных уравнений',
        'Производная функции',
        'Теорема Пифагора',
        'Площадь треугольника',
        'Логарифмы'
    ];

    // Reset all state when modal closes
    useEffect(() => {
        if (!isOpen) {
            resetToStart();
        }
    }, [isOpen]);

    const resetToStart = () => {
        setCurrentStep(1);
        setSelectedOption(null);
        setSelectedStudent(null);
        setSelectedClass(null);
        setUploadedFile(null);
        setCurrentTopic('');
        setCurrentStudentName('');
        setUploadMethod(null);
        setAiSuggestedGrade(null);
        setModifiedGrade(null);
        setPreviewUrl('');
        setTopicManual('');
        setTopicList('');
        setShowGradeEditor(false);
        setGradeInput('');
        setSelectedNotebook(null);
        setAiResult('');
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Step 1: Topic selection
    const handleTopicOption = (option) => {
        setSelectedOption(option);
    };

    const isStep1Valid = () => {
        if (selectedOption === 'manual') return topicManual.trim() !== '';
        if (selectedOption === 'list') return topicList !== '';
        return false;
    };

    const goToStep2 = () => {
        const topic = selectedOption === 'manual' ? topicManual : topicList;
        setCurrentTopic(topic);
        setCurrentStep(2);
    };

    // Step 2: Student selection
    const handleClassChange = (e) => {
        const classId = parseInt(e.target.value);
        setSelectedClass(classId || null);
        setSelectedStudent(null);
    };

    const handleStudentSelect = (id, name) => {
        setSelectedStudent(id);
        setCurrentStudentName(name);
    };

    const getCurrentStudents = () => {
        if (!selectedClass) return [];
        const classData = classesData.find(c => c.id === selectedClass);
        return classData ? classData.students : [];
    };

    // Step 3: Upload
    const handleUploadMethod = (method) => {
        setUploadMethod(method);
        setUploadedFile(null);
        setPreviewUrl('');
        setSelectedNotebook(null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setUploadedFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNotebookSelect = (id) => {
        setSelectedNotebook(id);
        setUploadedFile({ type: 'online', id });
    };

    const isStep3Valid = () => {
        return uploadedFile !== null || selectedNotebook !== null;
    };

    // Step 4: Analysis
    const analyzeHomework = () => {
        setCurrentStep('loading');

        setTimeout(() => {
            const results = [
                {
                    analysis: `
                        <div class="result-item"><strong>✓ Правильно:</strong> Все уравнения решены верно, алгоритм применен корректно.</div>
                        <div class="result-item"><strong>⚠ Замечания:</strong> В задаче №3 не указан ход решения дискриминанта. В задаче №5 пропущена проверка корней.</div>
                        <div class="result-item"><strong>📝 Рекомендации:</strong> Добавить промежуточные шаги вычислений для большей наглядности.</div>
                    `,
                    grade: 75
                },
                {
                    analysis: `
                        <div class="result-item"><strong>✓ Правильно:</strong> Метод подстановки применен верно во всех задачах.</div>
                        <div class="result-item"><strong>⚠ Замечания:</strong> В задаче №2 допущена арифметическая ошибка при вычислении. Задача №4 не завершена.</div>
                        <div class="result-item"><strong>📝 Рекомендации:</strong> Проверять вычисления. Доделать задачу №4.</div>
                    `,
                    grade: 68
                }
            ];

            const result = results[Math.floor(Math.random() * results.length)];
            setAiResult(result.analysis);
            setAiSuggestedGrade(result.grade);
            setCurrentStep(4);
        }, 2500);
    };

    // Grade management
    const handleShowGradeEditor = () => {
        setShowGradeEditor(true);
        setGradeInput('');
    };

    const handleHideGradeEditor = () => {
        setShowGradeEditor(false);
        setGradeInput('');
    };

    const handleGradeInputChange = (e) => {
        setGradeInput(e.target.value);
    };

    const isGradeInputValid = () => {
        const value = parseFloat(gradeInput);
        return !isNaN(value) && value >= 0 && value <= 100;
    };

    const acceptModifiedGrade = () => {
        const newGrade = parseFloat(gradeInput);
        if (isNaN(newGrade) || newGrade < 0 || newGrade > 100) {
            alert('Пожалуйста, введите корректную оценку от 0 до 100');
            return;
        }

        const changeInfo = aiSuggestedGrade !== newGrade
            ? ` (изменено с ${aiSuggestedGrade} на ${newGrade})`
            : '';

        alert(`✅ Оценка "${newGrade}" для ученика "${currentStudentName}" успешно выставлена в журнал!${changeInfo}\n\n📊 Статистика будет доступна в разделе "Аналитика"`);
        onClose();
    };

    const acceptGrade = () => {
        alert(`✅ Оценка "${aiSuggestedGrade}" для ученика "${currentStudentName}" успешно выставлена в журнал!\n\n📊 Статистика будет доступна в разделе "Аналитика"`);
        onClose();
    };

    const getStepProgress = () => {
        if (currentStep === 'loading') return 75;
        return ((currentStep - 1) / 3) * 100;
    };

    if (!isOpen) return null;

    return (
        <div className="homework-check-overlay" onClick={handleOverlayClick}>
            <div className="homework-modal">
                <div className="homework-modal-header">
                    <h2>✅ Проверка домашнего задания</h2>
                    <button className="homework-modal-close" onClick={onClose}>✕</button>
                </div>

                <div className="homework-modal-body">
                    {/* Step Indicator */}
                    <div className="homework-step-indicator">
                        <div
                            className="homework-step-progress"
                            style={{ width: `calc(${getStepProgress()}% - ${60 - (getStepProgress() * 0.6)}px)` }}
                        />
                        {[1, 2, 3, 4].map((step) => (
                            <div
                                key={step}
                                className={`homework-step ${
                                    step < currentStep ? 'completed' : ''
                                } ${step === currentStep ? 'active' : ''}`}
                            >
                                <div className="homework-step-circle">{step}</div>
                                <div className="homework-step-label">
                                    {step === 1 && 'Тема'}
                                    {step === 2 && 'Ученик'}
                                    {step === 3 && 'Загрузка'}
                                    {step === 4 && 'Результат'}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Step 1: Topic Selection */}
                    {currentStep === 1 && (
                        <div className="homework-step-content active">
                            <div className="homework-form-group">
                                <label className="homework-form-label">Как вы хотите указать тему?</label>
                                <div className="homework-topic-options">
                                    <div
                                        className={`homework-topic-option ${selectedOption === 'manual' ? 'selected' : ''}`}
                                        onClick={() => handleTopicOption('manual')}
                                    >
                                        <div className="homework-topic-option-icon">✍️</div>
                                        <div className="homework-topic-option-text">Ввести тему</div>
                                    </div>
                                    <div
                                        className={`homework-topic-option ${selectedOption === 'list' ? 'selected' : ''}`}
                                        onClick={() => handleTopicOption('list')}
                                    >
                                        <div className="homework-topic-option-icon">📚</div>
                                        <div className="homework-topic-option-text">Выбрать из списка</div>
                                    </div>
                                </div>
                            </div>

                            {selectedOption === 'manual' && (
                                <div className="homework-form-group">
                                    <label className="homework-form-label">Введите тему домашнего задания</label>
                                    <input
                                        type="text"
                                        className="homework-form-input"
                                        placeholder="Например: Квадратные уравнения"
                                        value={topicManual}
                                        onChange={(e) => setTopicManual(e.target.value)}
                                    />
                                </div>
                            )}

                            {selectedOption === 'list' && (
                                <div className="homework-form-group">
                                    <label className="homework-form-label">Выберите тему из списка</label>
                                    <select
                                        className="homework-form-select"
                                        value={topicList}
                                        onChange={(e) => setTopicList(e.target.value)}
                                    >
                                        <option value="">-- Выберите тему --</option>
                                        {topics.map((topic, idx) => (
                                            <option key={idx} value={topic}>{topic}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div className="homework-modal-actions">
                                <button
                                    className="homework-btn homework-btn-primary"
                                    disabled={!isStep1Valid()}
                                    onClick={goToStep2}
                                >
                                    Далее →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Student Selection */}
                    {currentStep === 2 && (
                        <div className="homework-step-content active">
                            <div className="homework-form-group">
                                <label className="homework-form-label">Выберите класс</label>
                                <select
                                    className="homework-form-select"
                                    value={selectedClass || ''}
                                    onChange={handleClassChange}
                                >
                                    <option value="">-- Выберите класс --</option>
                                    {classesData.map((cls) => (
                                        <option key={cls.id} value={cls.id}>
                                            {cls.name} ({cls.students.length} учеников)
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {selectedClass && (
                                <div className="homework-form-group">
                                    <label className="homework-form-label">Выберите ученика</label>
                                    <div className="homework-student-grid">
                                        {getCurrentStudents().map((student) => (
                                            <div
                                                key={student.id}
                                                className={`homework-student-card ${
                                                    selectedStudent === student.id ? 'selected' : ''
                                                }`}
                                                onClick={() => handleStudentSelect(student.id, student.name)}
                                            >
                                                <div className="homework-student-avatar">{student.avatar}</div>
                                                <div className="homework-student-name">{student.name}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="homework-info-box">
                                <div className="homework-info-icon">💡</div>
                                <div className="homework-info-content">
                                    <h4>Совет: Автоматизация для большого класса</h4>
                                    <p>
                                        Если у вас много учеников, можно загрузить ZIP-архив с фотографиями тетрадей
                                        (название файла = имя ученика). Система автоматически проверит все работы и
                                        выставит оценки одним кликом!
                                    </p>
                                </div>
                            </div>

                            <div className="homework-modal-actions">
                                <button className="homework-btn homework-btn-secondary" onClick={() => setCurrentStep(1)}>
                                    ← Назад
                                </button>
                                <button
                                    className="homework-btn homework-btn-primary"
                                    disabled={!selectedStudent}
                                    onClick={() => setCurrentStep(3)}
                                >
                                    Далее →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Upload */}
                    {currentStep === 3 && (
                        <div className="homework-step-content active">
                            <div className="homework-form-group">
                                <label className="homework-form-label">Выберите способ получения работы</label>
                                <div className="homework-topic-options">
                                    <div
                                        className={`homework-topic-option ${uploadMethod === 'file' ? 'selected' : ''}`}
                                        onClick={() => handleUploadMethod('file')}
                                    >
                                        <div className="homework-topic-option-icon">📁</div>
                                        <div className="homework-topic-option-text">Загрузить фото тетради</div>
                                    </div>
                                    <div
                                        className={`homework-topic-option ${uploadMethod === 'online' ? 'selected' : ''}`}
                                        onClick={() => handleUploadMethod('online')}
                                    >
                                        <div className="homework-topic-option-icon">💻</div>
                                        <div className="homework-topic-option-text">Онлайн тетрадь</div>
                                    </div>
                                </div>
                            </div>

                            {uploadMethod === 'file' && (
                                <div className="homework-form-group">
                                    <label className="homework-form-label">Загрузите фото тетради ученика</label>
                                    <div
                                        className={`homework-upload-zone ${uploadedFile ? 'has-file' : ''}`}
                                        onClick={() => document.getElementById('hwFileInput').click()}
                                    >
                                        <div className="homework-upload-icon">📁</div>
                                        <div className="homework-upload-text">Нажмите для загрузки фото</div>
                                        <div className="homework-upload-subtext">
                                            Поддерживаются JPG, PNG (макс. 10MB)
                                        </div>
                                        <input
                                            type="file"
                                            id="hwFileInput"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                    {previewUrl && (
                                        <img src={previewUrl} className="homework-preview-image" alt="Preview" />
                                    )}
                                </div>
                            )}

                            {uploadMethod === 'online' && (
                                <div className="homework-form-group">
                                    <label className="homework-form-label">Выберите работу из онлайн тетради</label>
                                    <div className="homework-online-notebooks">
                                        {onlineNotebooks.map((nb) => (
                                            <div
                                                key={nb.id}
                                                className={`homework-online-notebook-card ${
                                                    selectedNotebook === nb.id ? 'selected' : ''
                                                }`}
                                                onClick={() => handleNotebookSelect(nb.id)}
                                            >
                                                <div className="homework-notebook-preview">{nb.icon}</div>
                                                <div className="homework-notebook-info">
                                                    <div className="homework-notebook-title">{nb.title}</div>
                                                    <div className="homework-notebook-date">{nb.date}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="homework-modal-actions">
                                <button className="homework-btn homework-btn-secondary" onClick={() => setCurrentStep(2)}>
                                    ← Назад
                                </button>
                                <button
                                    className="homework-btn homework-btn-primary"
                                    disabled={!isStep3Valid()}
                                    onClick={analyzeHomework}
                                >
                                    Проверить работу 🔍
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Loading State */}
                    {currentStep === 'loading' && (
                        <div className="homework-step-content active">
                            <div className="homework-loading">
                                <div className="homework-spinner" />
                                <div className="homework-loading-text">AI анализирует домашнее задание...</div>
                                <div className="homework-loading-subtext">Это может занять несколько секунд</div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Results */}
                    {currentStep === 4 && (
                        <div className="homework-step-content active">
                            <div className="homework-result-box">
                                <div className="homework-result-header">
                                    <div className="homework-result-icon">🤖</div>
                                    <div className="homework-result-title">Результаты проверки</div>
                                </div>
                                <div
                                    className="homework-result-content"
                                    dangerouslySetInnerHTML={{ __html: aiResult }}
                                />
                                <div className="homework-grade-box">
                                    <div className="homework-grade-label">Предварительная оценка AI:</div>
                                    <div className="homework-grade-value">{aiSuggestedGrade}</div>
                                </div>
                            </div>

                            <div className="homework-modal-actions" style={{ gridTemplateColumns: '1fr 1fr 1fr', display: 'grid' }}>
                                <button className="homework-btn homework-btn-danger" onClick={onClose}>
                                    Отклонить
                                </button>
                                <button className="homework-btn homework-btn-warning" onClick={handleShowGradeEditor}>
                                    Изменить оценку
                                </button>
                                <button className="homework-btn homework-btn-success" onClick={acceptGrade}>
                                    ✓ Согласен, выставить
                                </button>
                            </div>

                            {showGradeEditor && (
                                <div className="homework-grade-editor">
                                    <div className="homework-grade-editor-header">
                                        <h4>Введите новую оценку</h4>
                                    </div>
                                    <div className="homework-grade-input-container">
                                        <input
                                            type="number"
                                            className="homework-grade-input"
                                            placeholder="Например: 85"
                                            min="0"
                                            max="100"
                                            value={gradeInput}
                                            onChange={handleGradeInputChange}
                                        />
                                        <div className="homework-grade-input-hint">Введите оценку от 0 до 100</div>
                                    </div>
                                    <div className="homework-modal-actions" style={{ marginTop: '16px' }}>
                                        <button className="homework-btn homework-btn-secondary" onClick={handleHideGradeEditor}>
                                            Отмена
                                        </button>
                                        <button
                                            className="homework-btn homework-btn-success"
                                            disabled={!isGradeInputValid()}
                                            onClick={acceptModifiedGrade}
                                        >
                                            ✓ Выставить новую оценку
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomeworkCheck;
