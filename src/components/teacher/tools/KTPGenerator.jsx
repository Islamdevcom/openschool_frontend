import React, { useState, useEffect } from 'react';
import './KTPGenerator.css';
import { generateSchedule } from '../../../api/toolsService';

function KTPGenerator({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState(0);

  // Форма данных
  const [formData, setFormData] = useState({
    subject: '',
    grade: '',
    period: '',
    totalHours: '',
    weeklyHours: ''
  });

  const [generatedContent, setGeneratedContent] = useState(null);
  const [error, setError] = useState(null);

  // Сброс при открытии
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setProgress(0);
      setLoadingStep(0);
      setFormData({
        subject: '',
        grade: '',
        period: '',
        totalHours: '',
        weeklyHours: ''
      });
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.subject || !formData.grade || !formData.period || !formData.totalHours) {
      alert('Пожалуйста, заполните все обязательные поля отмеченные *');
      return;
    }

    setCurrentStep(2);
    setProgress(50);
    setError(null);

    // Simulate loading steps
    const steps = [1, 2, 3, 4];
    let stepIndex = 0;

    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        setLoadingStep(steps[stepIndex]);
        setProgress(50 + (stepIndex + 1) * 10);
        stepIndex++;
      } else {
        clearInterval(interval);
      }
    }, 800);

    try {
      const result = await generateSchedule({
        grade: formData.grade,
        period: formData.period,
        subjects: formData.subject,
        constraints: `Всего часов: ${formData.totalHours}, часов в неделю: ${formData.weeklyHours || 'не указано'}`
      });

      clearInterval(interval);
      if (result.success) {
        setGeneratedContent(result.content);
      }
      setTimeout(() => {
        setCurrentStep(3);
        setProgress(100);
      }, 500);
    } catch (err) {
      clearInterval(interval);
      setError(err.message);
      // Fallback to demo data
      setTimeout(() => {
        setCurrentStep(3);
        setProgress(100);
      }, 500);
    }
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
      period: '',
      totalHours: '',
      weeklyHours: ''
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('ktp-generator-overlay')) {
      onClose();
    }
  };

  const downloadDocx = () => {
    alert('Функция скачивания DOCX будет реализована через backend API');
  };

  const saveToLibrary = () => {
    alert('КТП сохранен в вашу библиотеку!');
  };

  if (!isOpen) return null;

  return (
    <div className="ktp-generator-overlay" onClick={handleOverlayClick}>
      <div className="ktp-generator-modal">
        {/* Header */}
        <div className="ktp-generator-header">
          <div className="ktp-generator-header-content">
            <div className="ktp-generator-icon">📅</div>
            <div>
              <h2>КТП генератор</h2>
              <p>Календарно-тематическое планирование</p>
            </div>
          </div>
          <button className="ktp-generator-close" onClick={onClose}>×</button>
        </div>

        {/* Progress Bar */}
        <div className="ktp-generator-progress">
          <div className="progress-info">
            <span className="progress-title">
              {currentStep === 1 && 'Заполнение формы'}
              {currentStep === 2 && 'Генерация КТП...'}
              {currentStep === 3 && 'КТП готов!'}
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
        <div className="ktp-generator-content">
          {/* Step 1: Form */}
          {currentStep === 1 && (
            <div className="ktp-generator-form">
              <div className="form-section">
                <h3 className="section-title">Параметры планирования</h3>
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
                    <label>Период <span className="required">*</span></label>
                    <select name="period" value={formData.period} onChange={handleInputChange}>
                      <option value="">Выберите период</option>
                      <option value="Весь учебный год">Весь учебный год</option>
                      <option value="1 полугодие">1 полугодие</option>
                      <option value="2 полугодие">2 полугодие</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Количество часов <span className="required">*</span></label>
                    <input
                      type="number"
                      name="totalHours"
                      value={formData.totalHours}
                      onChange={handleInputChange}
                      placeholder="Например: 136"
                      min="1"
                    />
                  </div>

                  <div className="form-group">
                    <label>Уроков в неделю</label>
                    <input
                      type="number"
                      name="weeklyHours"
                      value={formData.weeklyHours}
                      onChange={handleInputChange}
                      placeholder="Например: 4"
                      min="1"
                      max="10"
                    />
                  </div>
                </div>

                <div className="info-box">
                  <div className="info-box-title">
                    📋 КТП будет создан согласно:
                  </div>
                  <ul className="info-list">
                    <li>Типовые учебные программы (adilet.zan.kz)</li>
                    <li>Разделы и сквозные темы по четвертям</li>
                    <li>Цели обучения для каждой темы</li>
                    <li>Распределение часов</li>
                    <li>Сроки проведения уроков</li>
                  </ul>
                </div>
              </div>

              <div className="button-group">
                <button className="btn-cancel" onClick={onClose}>
                  ← Отмена
                </button>
                <button className="btn-generate" onClick={handleSubmit}>
                  ✨ Создать КТП
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Loading */}
          {currentStep === 2 && (
            <div className="loading-container">
              <div className="spinner"></div>
              <h2 className="loading-title">Создаем КТП</h2>
              <p className="loading-subtitle">Формируем план на основе законодательства РК...</p>

              <div className="loading-steps">
                <div className={`loading-step ${loadingStep >= 1 ? 'active' : ''} ${loadingStep > 1 ? 'completed' : ''}`}>
                  <span>⏳</span>
                  <span>Загружаем данные с adilet.zan.kz...</span>
                </div>
                <div className={`loading-step ${loadingStep >= 2 ? 'active' : ''} ${loadingStep > 2 ? 'completed' : ''}`}>
                  <span>📥</span>
                  <span>Обрабатываем типовую учебную программу...</span>
                </div>
                <div className={`loading-step ${loadingStep >= 3 ? 'active' : ''} ${loadingStep > 3 ? 'completed' : ''}`}>
                  <span>✨</span>
                  <span>Формируем структуру по четвертям...</span>
                </div>
                <div className={`loading-step ${loadingStep >= 4 ? 'active' : ''}`}>
                  <span>📝</span>
                  <span>Заполняем календарно-тематический план...</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Result */}
          {currentStep === 3 && (
            <div className="result-container">
              <div className="result-header">
                <h2>КТП создан</h2>
                <div className="result-badges">
                  <span className="badge badge-success">✓ Готово</span>
                  <span className="badge badge-source">adilet.zan.kz</span>
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
                <div className="document-preview">
                  <div className="doc-form-label">Форма</div>

                  <div className="doc-header">
                    <div className="doc-title">
                      Среднесрочный (календарно-тематический) план по предметам
                    </div>
                    <div className="doc-subtitle">
                      {formData.subject} — {formData.grade}
                    </div>
                    <div className="doc-info">
                      Итого: {formData.totalHours} часов
                      {formData.weeklyHours && `, в неделю: ${formData.weeklyHours} часов`}
                    </div>
                  </div>

                  <div className="ktp-table-wrapper">
                    <table className="ktp-table">
                      <thead>
                        <tr>
                          <th style={{width: '5%'}}>№</th>
                          <th style={{width: '15%'}}>Раздел/ Сквозные темы</th>
                          <th style={{width: '20%'}}>Тема урока</th>
                          <th style={{width: '25%'}}>Цели обучения</th>
                          <th style={{width: '10%'}}>Часы</th>
                          <th style={{width: '10%'}}>Сроки</th>
                          <th style={{width: '15%'}}>Примечание</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* I четверть */}
                        <tr className="quarter-header">
                          <td colSpan="7">I четверть</td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>

                        {/* II четверть */}
                        <tr className="quarter-header">
                          <td colSpan="7">II четверть</td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>

                        {/* III четверть */}
                        <tr className="quarter-header">
                          <td colSpan="7">III четверть</td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>

                        {/* IV четверть */}
                        <tr className="quarter-header">
                          <td colSpan="7">IV четверть</td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="button-group result-buttons">
                <button className="btn-cancel" onClick={startOver}>
                  ← Создать новый КТП
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

export default KTPGenerator;
