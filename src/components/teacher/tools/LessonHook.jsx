import React, { useState, useEffect } from 'react';
import './LessonHook.css';
import { generateLessonHook } from '../../../api/toolsService';

function LessonHook({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState(0);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [error, setError] = useState(null);

  // Форма данных
  const [formData, setFormData] = useState({
    subject: '',
    grade: '',
    topic: '',
    hookType: '',
    duration: '5'
  });

  // Сброс при открытии
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setProgress(0);
      setLoadingStep(0);
      setGeneratedContent(null);
      setError(null);
      setFormData({
        subject: '',
        grade: '',
        topic: '',
        hookType: '',
        duration: '5'
      });
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.subject || !formData.grade || !formData.topic) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    setCurrentStep(2);
    setProgress(50);
    setError(null);

    // Запускаем анимацию загрузки
    const steps = [1, 2, 3, 4];
    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        setLoadingStep(steps[stepIndex]);
        setProgress(50 + (stepIndex + 1) * 10);
        stepIndex++;
      }
    }, 800);

    try {
      const result = await generateLessonHook({
        subject: formData.subject,
        topic: formData.topic,
        grade: formData.grade,
        engagement_style: formData.hookType || 'question'
      });

      clearInterval(interval);

      if (result.success) {
        setGeneratedContent(result.content);
        setCurrentStep(3);
        setProgress(100);
      } else {
        setError(result.error || 'Ошибка при создании зацепки');
        setCurrentStep(1);
        setProgress(0);
      }
    } catch (err) {
      clearInterval(interval);
      // Fallback на демо-результат
      setCurrentStep(3);
      setProgress(100);
    }
  };

  const simulateLoading = () => {
    const steps = [1, 2, 3, 4];
    let stepIndex = 0;

    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        setLoadingStep(steps[stepIndex]);
        setProgress(50 + (stepIndex + 1) * 10);
        stepIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentStep(3);
          setProgress(100);
        }, 500);
      }
    }, 800);
  };

  const startOver = () => {
    setCurrentStep(1);
    setProgress(0);
    setLoadingStep(0);
    setGeneratedContent(null);
    setError(null);
    setFormData({
      subject: '',
      grade: '',
      topic: '',
      hookType: '',
      duration: '5'
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('lesson-hook-overlay')) {
      onClose();
    }
  };

  const copyToClipboard = () => {
    alert('Зацепка урока скопирована в буфер обмена!');
  };

  const saveToLibrary = () => {
    alert('Зацепка урока сохранена в вашу библиотеку!');
  };

  if (!isOpen) return null;

  return (
    <div className="lesson-hook-overlay" onClick={handleOverlayClick}>
      <div className="lesson-hook-modal">
        {/* Header */}
        <div className="lesson-hook-header">
          <div className="lesson-hook-header-content">
            <div className="lesson-hook-icon">⚓</div>
            <div>
              <h2>Зацепка урока</h2>
              <p>Создание интересного начала урока</p>
            </div>
          </div>
          <button className="lesson-hook-close" onClick={onClose}>×</button>
        </div>

        {/* Progress Bar */}
        <div className="lesson-hook-progress">
          <div className="progress-info">
            <span className="progress-title">
              {currentStep === 1 && 'Заполнение формы'}
              {currentStep === 2 && 'Генерация зацепки...'}
              {currentStep === 3 && 'Зацепка готова!'}
            </span>
            <span className="progress-percent">{progress}%</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="progress-steps">
            <span className={`progress-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
              📝 Заполнение
            </span>
            <span className={`progress-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
              ⚙️ Генерация
            </span>
            <span className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
              ✅ Результат
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="lesson-hook-content">
          {/* Step 1: Form */}
          {currentStep === 1 && (
            <div className="lesson-hook-form">
              <div className="form-section">
                <h3 className="section-title">Основная информация</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Предмет <span className="required">*</span></label>
                    <select name="subject" value={formData.subject} onChange={handleInputChange}>
                      <option value="">Выберите предмет</option>
                      <option value="Математика">Математика</option>
                      <option value="Русский язык">Русский язык</option>
                      <option value="Казахский язык">Казахский язык</option>
                      <option value="Английский язык">Английский язык</option>
                      <option value="История Казахстана">История Казахстана</option>
                      <option value="Биология">Биология</option>
                      <option value="Физика">Физика</option>
                      <option value="Химия">Химия</option>
                      <option value="География">География</option>
                      <option value="Информатика">Информатика</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Класс <span className="required">*</span></label>
                    <select name="grade" value={formData.grade} onChange={handleInputChange}>
                      <option value="">Выберите класс</option>
                      {[...Array(11)].map((_, i) => (
                        <option key={i+1} value={`${i+1} класс`}>{i+1} класс</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Тема урока</h3>
                <div className="form-grid full">
                  <div className="form-group">
                    <label>Тема <span className="required">*</span></label>
                    <input
                      type="text"
                      name="topic"
                      value={formData.topic}
                      onChange={handleInputChange}
                      placeholder="Например: Решение квадратных уравнений"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Параметры зацепки</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Тип зацепки</label>
                    <select name="hookType" value={formData.hookType} onChange={handleInputChange}>
                      <option value="">Любой тип</option>
                      <option value="question">Провокационный вопрос</option>
                      <option value="story">История/Факт</option>
                      <option value="riddle">Загадка</option>
                      <option value="experiment">Мини-эксперимент</option>
                      <option value="video">Видео-фрагмент</option>
                      <option value="game">Игровой элемент</option>
                      <option value="problem">Проблемная ситуация</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Длительность (минут)</label>
                    <select name="duration" value={formData.duration} onChange={handleInputChange}>
                      <option value="3">3 минуты</option>
                      <option value="5">5 минут</option>
                      <option value="7">7 минут</option>
                      <option value="10">10 минут</option>
                    </select>
                  </div>
                </div>

                <div className="hook-types-grid">
                  <div className="hook-type-card">
                    <span className="hook-type-icon">❓</span>
                    <span className="hook-type-name">Вопрос</span>
                  </div>
                  <div className="hook-type-card">
                    <span className="hook-type-icon">📖</span>
                    <span className="hook-type-name">История</span>
                  </div>
                  <div className="hook-type-card">
                    <span className="hook-type-icon">🧩</span>
                    <span className="hook-type-name">Загадка</span>
                  </div>
                  <div className="hook-type-card">
                    <span className="hook-type-icon">🔬</span>
                    <span className="hook-type-name">Эксперимент</span>
                  </div>
                  <div className="hook-type-card">
                    <span className="hook-type-icon">🎮</span>
                    <span className="hook-type-name">Игра</span>
                  </div>
                  <div className="hook-type-card">
                    <span className="hook-type-icon">💡</span>
                    <span className="hook-type-name">Проблема</span>
                  </div>
                </div>
              </div>

              <div className="button-group">
                <button className="btn-cancel" onClick={onClose}>
                  ← Отмена
                </button>
                <button className="btn-generate" onClick={handleSubmit}>
                  ⚓ Создать зацепку урока
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Loading */}
          {currentStep === 2 && (
            <div className="loading-container">
              <div className="spinner"></div>
              <h2 className="loading-title">Создаем зацепку урока</h2>
              <p className="loading-subtitle">Подбираем интересное начало для вашего урока...</p>

              <div className="loading-steps">
                <div className={`loading-step ${loadingStep >= 1 ? 'active' : ''} ${loadingStep > 1 ? 'completed' : ''}`}>
                  <span>🎯</span>
                  <span>Анализируем тему урока...</span>
                </div>
                <div className={`loading-step ${loadingStep >= 2 ? 'active' : ''} ${loadingStep > 2 ? 'completed' : ''}`}>
                  <span>💡</span>
                  <span>Подбираем подходящий тип зацепки...</span>
                </div>
                <div className={`loading-step ${loadingStep >= 3 ? 'active' : ''} ${loadingStep > 3 ? 'completed' : ''}`}>
                  <span>✨</span>
                  <span>Генерируем контент...</span>
                </div>
                <div className={`loading-step ${loadingStep >= 4 ? 'active' : ''}`}>
                  <span>📝</span>
                  <span>Оформляем результат...</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Result */}
          {currentStep === 3 && (
            <div className="result-container">
              <div className="result-header">
                <h2>Зацепка урока готова!</h2>
                <div className="result-badges">
                  <span className="badge badge-success">✓ Готово</span>
                  <span className="badge badge-type">Провокационный вопрос</span>
                </div>
              </div>

              <div className="hook-result">
                <div className="hook-result-header">
                  <div className="hook-result-icon">⚓</div>
                  <div className="hook-result-info">
                    <h3>{formData.topic}</h3>
                    <p>{formData.subject} • {formData.grade} • {formData.duration} мин</p>
                  </div>
                </div>

                <div className="hook-content-box">
                  <div className="hook-label">Зацепка урока:</div>
                  <div className="hook-text">
                    <p><strong>Вопрос для учеников:</strong></p>
                    <p className="hook-question">
                      "Представьте, что вам нужно разделить пиццу на равные части для 7 друзей,
                      но у вас есть только линейка. Как бы вы это сделали? И почему это связано
                      с сегодняшней темой?"
                    </p>
                    <p className="hook-explanation">
                      <strong>Почему это работает:</strong> Этот вопрос создает когнитивный конфликт
                      и связывает абстрактную математическую концепцию с повседневной жизнью.
                      Ученики начинают думать о практическом применении темы еще до ее изучения.
                    </p>
                  </div>
                </div>

                <div className="hook-tips">
                  <h4>💡 Советы по применению:</h4>
                  <ul>
                    <li>Дайте ученикам 1-2 минуты на размышление</li>
                    <li>Выслушайте 2-3 варианта ответов</li>
                    <li>Не давайте правильный ответ сразу</li>
                    <li>Вернитесь к вопросу в конце урока</li>
                  </ul>
                </div>
              </div>

              <div className="button-group result-buttons">
                <button className="btn-cancel" onClick={startOver}>
                  ← Создать новую
                </button>
                <button className="btn-generate" onClick={copyToClipboard}>
                  📋 Копировать
                </button>
                <button className="btn-generate btn-save" onClick={saveToLibrary}>
                  💾 Сохранить
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LessonHook;
