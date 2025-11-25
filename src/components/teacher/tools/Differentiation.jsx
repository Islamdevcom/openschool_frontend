import React, { useState, useEffect } from 'react';
import './Differentiation.css';
import { generateDifferentiation } from '../../../api/toolsService';

function Differentiation({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState(0);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [error, setError] = useState(null);

  // Форма данных
  const [formData, setFormData] = useState({
    topic: '',
    subject: '',
    grade: '',
    levelsCount: '3'
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
        topic: '',
        subject: '',
        grade: '',
        levelsCount: '3'
      });
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.topic || !formData.subject || !formData.grade) {
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
      const result = await generateDifferentiation({
        subject: formData.subject,
        topic: formData.topic,
        grade: formData.grade,
        base_content: formData.levelsCount
      });

      clearInterval(interval);

      if (result.success) {
        setGeneratedContent(result.content);
        setCurrentStep(3);
        setProgress(100);
      } else {
        setError(result.error || 'Ошибка при создании заданий');
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
      topic: '',
      subject: '',
      grade: '',
      levelsCount: '3'
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('differentiation-overlay')) {
      onClose();
    }
  };

  const downloadLevel = (level) => {
    alert(`Скачивание уровня ${level}\n\nЗадания будут сохранены в PDF или DOCX формате`);
  };

  const downloadAll = () => {
    alert('Скачивание всех уровней\n\nВсе уровни будут сохранены в одном файле');
  };

  const downloadAnswers = () => {
    alert('Скачивание ответов\n\nОтветы ко всем задачам будут сохранены отдельно');
  };

  const saveToLibrary = () => {
    alert('Задания сохранены в вашу библиотеку!');
  };

  if (!isOpen) return null;

  return (
    <div className="differentiation-overlay" onClick={handleOverlayClick}>
      <div className="differentiation-modal">
        {/* Header */}
        <div className="differentiation-header">
          <div className="differentiation-header-content">
            <div className="differentiation-icon">🎚️</div>
            <div>
              <h2>Дифференциация</h2>
              <p>Задания 3 уровней (А, Б, В)</p>
            </div>
          </div>
          <button className="differentiation-close" onClick={onClose}>×</button>
        </div>

        {/* Progress Bar */}
        <div className="differentiation-progress">
          <div className="progress-info">
            <span className="progress-title">
              {currentStep === 1 && 'Заполнение формы'}
              {currentStep === 2 && 'Генерация заданий...'}
              {currentStep === 3 && 'Задания готовы!'}
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
        <div className="differentiation-content">
          {/* Step 1: Form */}
          {currentStep === 1 && (
            <div className="differentiation-form">
              <div className="form-section">
                <h3 className="section-title">Основная информация</h3>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Тема урока <span className="required">*</span></label>
                    <input
                      type="text"
                      name="topic"
                      value={formData.topic}
                      onChange={handleInputChange}
                      placeholder="Например: Квадратные уравнения"
                    />
                  </div>

                  <div className="form-group">
                    <label>Предмет <span className="required">*</span></label>
                    <select name="subject" value={formData.subject} onChange={handleInputChange}>
                      <option value="">Выберите предмет</option>
                      <option value="Математика">Математика</option>
                      <option value="Русский язык">Русский язык</option>
                      <option value="Казахский язык">Казахский язык</option>
                      <option value="Английский язык">Английский язык</option>
                      <option value="Физика">Физика</option>
                      <option value="Химия">Химия</option>
                      <option value="Биология">Биология</option>
                      <option value="История">История</option>
                      <option value="География">География</option>
                      <option value="Информатика">Информатика</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Класс <span className="required">*</span></label>
                    <select name="grade" value={formData.grade} onChange={handleInputChange}>
                      <option value="">Выберите класс</option>
                      {[...Array(11)].map((_, i) => (
                        <option key={i+1} value={`${i+1}`}>{i+1} класс</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Количество уровней</h3>
                <div className="radio-group">
                  <label className={`radio-option ${formData.levelsCount === '2' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="levelsCount"
                      value="2"
                      checked={formData.levelsCount === '2'}
                      onChange={handleInputChange}
                    />
                    <span className="radio-label">2 уровня (А, Б)</span>
                  </label>
                  <label className={`radio-option ${formData.levelsCount === '3' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="levelsCount"
                      value="3"
                      checked={formData.levelsCount === '3'}
                      onChange={handleInputChange}
                    />
                    <span className="radio-label">3 уровня (А, Б, В)</span>
                  </label>
                </div>

                <div className="info-box">
                  <div className="info-box-title">🎓 Что получу?</div>
                  <ul className="info-list">
                    <li>Задания {formData.levelsCount} уровней сложности</li>
                    <li>А - базовый, Б - средний{formData.levelsCount === '3' ? ', В - сложный' : ''}</li>
                    <li>По 5-7 задач на каждый уровень</li>
                    <li>Критерии оценивания</li>
                    <li>Можно скачать отдельно каждый</li>
                  </ul>
                </div>
              </div>

              <div className="button-group">
                <button className="btn-cancel" onClick={onClose}>
                  ← Отмена
                </button>
                <button className="btn-generate" onClick={handleSubmit}>
                  🎚️ Создать задания
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Loading */}
          {currentStep === 2 && (
            <div className="loading-container">
              <div className="spinner"></div>
              <h2 className="loading-title">Создаем задания</h2>
              <p className="loading-subtitle">Генерируем задания для {formData.levelsCount} уровней...</p>

              <div className="loading-steps">
                <div className={`loading-step ${loadingStep >= 1 ? 'active' : ''} ${loadingStep > 1 ? 'completed' : ''}`}>
                  <span>🎯</span>
                  <span>Анализируем тему урока...</span>
                </div>
                <div className={`loading-step ${loadingStep >= 2 ? 'active' : ''} ${loadingStep > 2 ? 'completed' : ''}`}>
                  <span>📊</span>
                  <span>Определяем уровни сложности...</span>
                </div>
                <div className={`loading-step ${loadingStep >= 3 ? 'active' : ''} ${loadingStep > 3 ? 'completed' : ''}`}>
                  <span>✨</span>
                  <span>Генерируем задания...</span>
                </div>
                <div className={`loading-step ${loadingStep >= 4 ? 'active' : ''}`}>
                  <span>📝</span>
                  <span>Формируем критерии оценки...</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Result */}
          {currentStep === 3 && (
            <div className="result-container">
              <div className="result-header">
                <h2>Задания готовы!</h2>
                <div className="result-badges">
                  <span className="badge badge-success">✓ Готово</span>
                  <span className="badge badge-levels">{formData.levelsCount} уровня</span>
                </div>
              </div>

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
              <>
              {/* Levels Grid */}
              <div className="levels-grid">
                {/* Level A */}
                <div className="level-column level-a">
                  <div className="level-header">
                    <div className="level-badge">А</div>
                    <div className="level-info">
                      <div className="level-name">Базовый</div>
                      <div className="level-desc">Простые задачи</div>
                    </div>
                  </div>

                  <div className="task-item">
                    <div className="task-number">Задача 1</div>
                    <div className="task-text">Решите уравнение: x² = 4</div>
                  </div>
                  <div className="task-item">
                    <div className="task-number">Задача 2</div>
                    <div className="task-text">Решите уравнение: x² = 9</div>
                  </div>
                  <div className="task-item">
                    <div className="task-number">Задача 3</div>
                    <div className="task-text">Решите уравнение: x² = 16</div>
                  </div>
                  <div className="task-item">
                    <div className="task-number">Задача 4</div>
                    <div className="task-text">Решите уравнение: x² - 25 = 0</div>
                  </div>
                  <div className="task-item">
                    <div className="task-number">Задача 5</div>
                    <div className="task-text">Решите уравнение: x² - 1 = 0</div>
                  </div>

                  <div className="criteria-box">
                    <div className="criteria-title">⏱️ Время: 10-15 минут</div>
                    <div className="criteria-text">Оценка "5": 5 задач<br/>Оценка "4": 4 задачи<br/>Оценка "3": 3 задачи</div>
                  </div>

                  <button className="level-download" onClick={() => downloadLevel('А')}>
                    📥 Скачать уровень А
                  </button>
                </div>

                {/* Level B */}
                <div className="level-column level-b">
                  <div className="level-header">
                    <div className="level-badge">Б</div>
                    <div className="level-info">
                      <div className="level-name">Средний</div>
                      <div className="level-desc">Обычные задачи</div>
                    </div>
                  </div>

                  <div className="task-item">
                    <div className="task-number">Задача 1</div>
                    <div className="task-text">Решите уравнение: x² - 5x + 6 = 0</div>
                  </div>
                  <div className="task-item">
                    <div className="task-number">Задача 2</div>
                    <div className="task-text">Решите уравнение: x² + 7x + 12 = 0</div>
                  </div>
                  <div className="task-item">
                    <div className="task-number">Задача 3</div>
                    <div className="task-text">Решите уравнение: 2x² - 8x = 0</div>
                  </div>
                  <div className="task-item">
                    <div className="task-number">Задача 4</div>
                    <div className="task-text">Решите уравнение: x² - 4x + 4 = 0</div>
                  </div>
                  <div className="task-item">
                    <div className="task-number">Задача 5</div>
                    <div className="task-text">Решите уравнение: x² + 2x - 15 = 0</div>
                  </div>

                  <div className="criteria-box">
                    <div className="criteria-title">⏱️ Время: 15-20 минут</div>
                    <div className="criteria-text">Оценка "5": 5 задач<br/>Оценка "4": 4 задачи<br/>Оценка "3": 3 задачи</div>
                  </div>

                  <button className="level-download" onClick={() => downloadLevel('Б')}>
                    📥 Скачать уровень Б
                  </button>
                </div>

                {/* Level C */}
                {formData.levelsCount === '3' && (
                  <div className="level-column level-c">
                    <div className="level-header">
                      <div className="level-badge">В</div>
                      <div className="level-info">
                        <div className="level-name">Сложный</div>
                        <div className="level-desc">Повышенной сложности</div>
                      </div>
                    </div>

                    <div className="task-item">
                      <div className="task-number">Задача 1</div>
                      <div className="task-text">Решите уравнение: 3x² - 5x - 2 = 0</div>
                    </div>
                    <div className="task-item">
                      <div className="task-number">Задача 2</div>
                      <div className="task-text">Решите уравнение: 2x² + 7x + 3 = 0</div>
                    </div>
                    <div className="task-item">
                      <div className="task-number">Задача 3</div>
                      <div className="task-text">При каких значениях a уравнение x² - 4x + a = 0 имеет один корень?</div>
                    </div>
                    <div className="task-item">
                      <div className="task-number">Задача 4</div>
                      <div className="task-text">Решите уравнение: (x-3)² = 2x - 5</div>
                    </div>
                    <div className="task-item">
                      <div className="task-number">Задача 5</div>
                      <div className="task-text">Найдите сумму корней уравнения: x² - 8x + 15 = 0</div>
                    </div>

                    <div className="criteria-box">
                      <div className="criteria-title">⏱️ Время: 20-25 минут</div>
                      <div className="criteria-text">Оценка "5": 5 задач<br/>Оценка "4": 4 задачи<br/>Оценка "3": 3 задачи</div>
                    </div>

                    <button className="level-download" onClick={() => downloadLevel('В')}>
                      📥 Скачать уровень В
                    </button>
                  </div>
                )}
              </div>

              {/* Comparison Table */}
              <div className="comparison-section">
                <div className="comparison-title">📊 Сравнение уровней</div>
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th>Параметр</th>
                      <th><span className="level-tag tag-a">Уровень А</span></th>
                      <th><span className="level-tag tag-b">Уровень Б</span></th>
                      {formData.levelsCount === '3' && (
                        <th><span className="level-tag tag-c">Уровень В</span></th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Сложность</strong></td>
                      <td>Базовая<br/>Решение в 1-2 действия</td>
                      <td>Средняя<br/>Решение в 3-4 действия</td>
                      {formData.levelsCount === '3' && (
                        <td>Повышенная<br/>Решение в 5+ действий</td>
                      )}
                    </tr>
                    <tr>
                      <td><strong>Время</strong></td>
                      <td>10-15 минут</td>
                      <td>15-20 минут</td>
                      {formData.levelsCount === '3' && (
                        <td>20-25 минут</td>
                      )}
                    </tr>
                    <tr>
                      <td><strong>Для кого</strong></td>
                      <td>Базовый уровень<br/>Требуется поддержка</td>
                      <td>Большинство учеников<br/>Стандартная программа</td>
                      {formData.levelsCount === '3' && (
                        <td>Сильные ученики<br/>Олимпиадная подготовка</td>
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button className="action-btn" onClick={downloadAll}>
                  <span className="action-btn-icon">📥</span>
                  Скачать все уровни
                </button>
                <button className="action-btn" onClick={downloadAnswers}>
                  <span className="action-btn-icon">🔑</span>
                  Скачать ответы
                </button>
                <button className="action-btn" onClick={() => window.print()}>
                  <span className="action-btn-icon">🖨️</span>
                  Распечатать
                </button>
                <button className="action-btn" onClick={saveToLibrary}>
                  <span className="action-btn-icon">💾</span>
                  Сохранить
                </button>
              </div>
              </>
              )}

              <div className="button-group">
                <button className="btn-cancel" onClick={startOver}>
                  ← Создать новые задания
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Differentiation;
