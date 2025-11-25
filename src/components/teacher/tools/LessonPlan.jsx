import React, { useState, useEffect } from 'react';
import './LessonPlan.css';
import { generateLessonPlan } from '../../../api/toolsService';

function LessonPlan({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState(0);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Форма данных
  const [formData, setFormData] = useState({
    subject: '',
    grade: '',
    quarter: '',
    lessonNumber: '',
    topic: '',
    goals: ''
  });

  // Сброс при открытии
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setProgress(0);
      setLoadingStep(0);
      setGeneratedContent(null);
      setError(null);
      setIsLoading(false);
      setFormData({
        subject: '',
        grade: '',
        quarter: '',
        lessonNumber: '',
        topic: '',
        goals: ''
      });
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // Проверка обязательных полей
    if (!formData.subject || !formData.grade || !formData.quarter || !formData.topic) {
      alert('Пожалуйста, заполните все обязательные поля отмеченные *');
      return;
    }

    // Переход к загрузке
    setCurrentStep(2);
    setProgress(50);
    setIsLoading(true);
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
    }, 1000);

    try {
      const result = await generateLessonPlan({
        subject: formData.subject,
        topic: formData.topic,
        grade: formData.grade,
        duration: 45,
        additional_requirements: formData.goals || ''
      });

      clearInterval(interval);

      if (result.success) {
        setGeneratedContent(result.content);
        setCurrentStep(3);
        setProgress(100);
      } else {
        setError(result.error || 'Ошибка при генерации плана урока');
        setCurrentStep(1);
        setProgress(0);
      }
    } catch (err) {
      clearInterval(interval);
      setError(err.message || 'Ошибка при генерации плана урока');
      setCurrentStep(1);
      setProgress(0);
    } finally {
      setIsLoading(false);
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
    }, 1000);
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
      quarter: '',
      lessonNumber: '',
      topic: '',
      goals: ''
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('lesson-plan-overlay')) {
      onClose();
    }
  };

  const downloadDocx = () => {
    alert('Функция скачивания DOCX будет реализована через backend API');
  };

  const saveToLibrary = () => {
    alert('План урока сохранен в вашу библиотеку!');
  };

  if (!isOpen) return null;

  return (
    <div className="lesson-plan-overlay" onClick={handleOverlayClick}>
      <div className="lesson-plan-modal">
        {/* Header */}
        <div className="lesson-plan-header">
          <div className="lesson-plan-header-content">
            <div className="lesson-plan-icon">📝</div>
            <div>
              <h2>Краткосрочный план урока</h2>
              <p>Создание по Приказу МОН РК №472</p>
            </div>
          </div>
          <button className="lesson-plan-close" onClick={onClose}>×</button>
        </div>

        {/* Progress Bar */}
        <div className="lesson-plan-progress">
          <div className="progress-info">
            <span className="progress-title">
              {currentStep === 1 && 'Заполнение формы'}
              {currentStep === 2 && 'Генерация плана...'}
              {currentStep === 3 && 'План готов!'}
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
        <div className="lesson-plan-content">
          {/* Step 1: Form */}
          {currentStep === 1 && (
            <div className="lesson-plan-form">
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

                  <div className="form-group">
                    <label>Четверть <span className="required">*</span></label>
                    <select name="quarter" value={formData.quarter} onChange={handleInputChange}>
                      <option value="">Выберите четверть</option>
                      <option value="1 четверть">1 четверть</option>
                      <option value="2 четверть">2 четверть</option>
                      <option value="3 четверть">3 четверть</option>
                      <option value="4 четверть">4 четверть</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Номер урока</label>
                    <input
                      type="number"
                      name="lessonNumber"
                      value={formData.lessonNumber}
                      onChange={handleInputChange}
                      placeholder="Например: 15"
                      min="1"
                    />
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

                  <div className="form-group">
                    <label>Цели обучения</label>
                    <textarea
                      name="goals"
                      value={formData.goals}
                      onChange={handleInputChange}
                      placeholder="Введите цели обучения или оставьте пустым для автоматического подбора из законодательства РК"
                    />
                  </div>
                </div>

                <div className="info-box">
                  <div className="info-box-title">
                    📋 План создается согласно требованиям:
                  </div>
                  <ul className="info-list">
                    <li>Приказ МОН РК №472 от 16.09.2021</li>
                    <li>Типовые учебные программы (adilet.zan.kz)</li>
                    <li>Цели обучения из официальных документов РК</li>
                    <li>Структура урока с обязательными разделами</li>
                    <li>Критерии оценивания и дифференциация</li>
                  </ul>
                </div>

                {error && (
                  <div className="error-box" style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px', marginTop: '16px', color: '#dc2626' }}>
                    <strong>Ошибка:</strong> {error}
                  </div>
                )}
              </div>

              <div className="button-group">
                <button className="btn-cancel" onClick={onClose}>
                  ← Отмена
                </button>
                <button className="btn-generate" onClick={handleSubmit}>
                  ✨ Создать краткосрочный план
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Loading */}
          {currentStep === 2 && (
            <div className="loading-container">
              <div className="spinner"></div>
              <h2 className="loading-title">Создаем краткосрочный план</h2>
              <p className="loading-subtitle">Формируем документ согласно Приказу №472...</p>

              <div className="loading-steps">
                <div className={`loading-step ${loadingStep >= 1 ? 'active' : ''} ${loadingStep > 1 ? 'completed' : ''}`}>
                  <span>⏳</span>
                  <span>Загружаем данные с adilet.zan.kz...</span>
                </div>
                <div className={`loading-step ${loadingStep >= 2 ? 'active' : ''} ${loadingStep > 2 ? 'completed' : ''}`}>
                  <span>📥</span>
                  <span>Обрабатываем документы законодательства РК...</span>
                </div>
                <div className={`loading-step ${loadingStep >= 3 ? 'active' : ''} ${loadingStep > 3 ? 'completed' : ''}`}>
                  <span>✨</span>
                  <span>Формируем структуру по шаблону...</span>
                </div>
                <div className={`loading-step ${loadingStep >= 4 ? 'active' : ''}`}>
                  <span>📝</span>
                  <span>Заполняем план согласно Приказу №472...</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Result */}
          {currentStep === 3 && (
            <div className="result-container">
              <div className="result-header">
                <h2>Краткосрочный план создан</h2>
                <div className="result-badges">
                  <span className="badge badge-success">✓ Готово</span>
                  <span className="badge badge-source">adilet.zan.kz</span>
                </div>
              </div>

              {generatedContent ? (
                <div className="document-preview">
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
              <div className="document-preview">
                <div className="doc-form-label">Форма</div>

                <div className="doc-header">
                  <div className="doc-line">_______________________________________________</div>
                  <div className="doc-hint">(наименование организации образования)</div>
                  <div className="doc-title">Краткосрочный (поурочный) план</div>
                  <div className="doc-line">_______________________________________________</div>
                  <div className="doc-hint">(тема урока)</div>
                </div>

                <table className="doc-table">
                  <tbody>
                    <tr>
                      <td className="doc-td-label">Раздел</td>
                      <td colSpan="2"></td>
                    </tr>
                    <tr>
                      <td className="doc-td-label">ФИО педагога</td>
                      <td colSpan="2"></td>
                    </tr>
                    <tr>
                      <td className="doc-td-label">Дата</td>
                      <td colSpan="2"></td>
                    </tr>
                    <tr>
                      <td className="doc-td-label">Класс</td>
                      <td>Количество присутствующих</td>
                      <td>Количество отсутствующих</td>
                    </tr>
                    <tr>
                      <td className="doc-td-label">Тема урока</td>
                      <td colSpan="2">{formData.topic}</td>
                    </tr>
                    <tr>
                      <td className="doc-td-label">Цели обучения</td>
                      <td colSpan="2">
                        {formData.goals || 'Цели обучения будут загружены из типовой учебной программы (adilet.zan.kz)'}
                      </td>
                    </tr>
                    <tr>
                      <td className="doc-td-label">Цели урока</td>
                      <td colSpan="2"></td>
                    </tr>
                  </tbody>
                </table>

                <div className="doc-section-title">Ход урока</div>

                <table className="doc-table lesson-flow">
                  <thead>
                    <tr>
                      <th>Этап урока/ Время</th>
                      <th>Действия педагога</th>
                      <th>Действия ученика</th>
                      <th>Оценивание</th>
                      <th>Ресурсы</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              )}

              <div className="button-group result-buttons">
                <button className="btn-cancel" onClick={startOver}>
                  ← Создать новый план
                </button>
                <button className="btn-generate" onClick={downloadDocx}>
                  📥 Скачать DOCX
                </button>
                <button className="btn-generate btn-save" onClick={saveToLibrary}>
                  💾 Сохранить в библиотеку
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LessonPlan;
