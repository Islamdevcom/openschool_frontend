import React, { useState, useEffect } from 'react';
import './ManagementReport.css';

function ManagementReport({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState(0);

  // Форма данных
  const [formData, setFormData] = useState({
    period: '',
    grade: '',
    allSubjects: true,
    subjects: {
      math: true,
      physics: true,
      chemistry: true,
      biology: true,
      russian: true,
      english: true
    }
  });

  // Сброс при открытии
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setProgress(0);
      setLoadingStep(0);
      setFormData({
        period: '',
        grade: '',
        allSubjects: true,
        subjects: {
          math: true,
          physics: true,
          chemistry: true,
          biology: true,
          russian: true,
          english: true
        }
      });
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAllSubjectsChange = (e) => {
    const checked = e.target.checked;
    setFormData(prev => ({
      ...prev,
      allSubjects: checked,
      subjects: {
        math: checked,
        physics: checked,
        chemistry: checked,
        biology: checked,
        russian: checked,
        english: checked
      }
    }));
  };

  const handleSubjectChange = (subject, checked) => {
    setFormData(prev => {
      const newSubjects = { ...prev.subjects, [subject]: checked };
      const allChecked = Object.values(newSubjects).every(v => v);
      return {
        ...prev,
        subjects: newSubjects,
        allSubjects: allChecked
      };
    });
  };

  const handleSubmit = () => {
    if (!formData.period || !formData.grade) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    const hasSubjects = Object.values(formData.subjects).some(v => v);
    if (!hasSubjects) {
      alert('Выберите хотя бы один предмет');
      return;
    }

    setCurrentStep(2);
    setProgress(50);
    simulateLoading();
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
    setFormData({
      period: '',
      grade: '',
      allSubjects: true,
      subjects: {
        math: true,
        physics: true,
        chemistry: true,
        biology: true,
        russian: true,
        english: true
      }
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('management-report-overlay')) {
      onClose();
    }
  };

  const downloadPDF = () => {
    alert('Скачивание PDF\n\nОтчет будет сохранен в PDF формате для отправки руководству');
  };

  const downloadExcel = () => {
    alert('Экспорт в Excel\n\nДанные будут экспортированы в Excel файл с таблицами и графиками');
  };

  const sendReport = () => {
    alert('Отправка руководству\n\nОтчет будет отправлен на email директора/завуча');
  };

  const saveToLibrary = () => {
    alert('Отчет сохранен в вашу библиотеку!');
  };

  if (!isOpen) return null;

  return (
    <div className="management-report-overlay" onClick={handleOverlayClick}>
      <div className="management-report-modal">
        {/* Header */}
        <div className="management-report-header">
          <div className="management-report-header-content">
            <div className="management-report-icon">📊</div>
            <div>
              <h2>Отчет для руководства</h2>
              <p>Автогенерация отчетов</p>
            </div>
          </div>
          <button className="management-report-close" onClick={onClose}>×</button>
        </div>

        {/* Progress Bar */}
        <div className="management-report-progress">
          <div className="progress-info">
            <span className="progress-title">
              {currentStep === 1 && 'Заполнение формы'}
              {currentStep === 2 && 'Формирование отчета...'}
              {currentStep === 3 && 'Отчет готов!'}
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
        <div className="management-report-content">
          {/* Step 1: Form */}
          {currentStep === 1 && (
            <div className="management-report-form">
              <div className="form-section">
                <h3 className="section-title">Параметры отчета</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Период отчета <span className="required">*</span></label>
                    <select name="period" value={formData.period} onChange={handleInputChange}>
                      <option value="">Выберите период</option>
                      <option value="week">За неделю</option>
                      <option value="month">За месяц</option>
                      <option value="quarter">За четверть</option>
                      <option value="year">За год</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Класс/Параллель <span className="required">*</span></label>
                    <select name="grade" value={formData.grade} onChange={handleInputChange}>
                      <option value="">Выберите</option>
                      <option value="all">Вся школа</option>
                      <option value="5">5 класс</option>
                      <option value="6">6 класс</option>
                      <option value="7">7 класс</option>
                      <option value="8">8 класс</option>
                      <option value="9">9 класс</option>
                      <option value="10">10 класс</option>
                      <option value="11">11 класс</option>
                      <option value="5-9">5-9 классы</option>
                      <option value="10-11">10-11 классы</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Предметы</h3>
                <div className="checkbox-grid">
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="all-subjects"
                      checked={formData.allSubjects}
                      onChange={handleAllSubjectsChange}
                    />
                    <label htmlFor="all-subjects">Все предметы</label>
                  </div>
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.subjects.math}
                      onChange={(e) => handleSubjectChange('math', e.target.checked)}
                    />
                    <label>Математика</label>
                  </div>
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.subjects.physics}
                      onChange={(e) => handleSubjectChange('physics', e.target.checked)}
                    />
                    <label>Физика</label>
                  </div>
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.subjects.chemistry}
                      onChange={(e) => handleSubjectChange('chemistry', e.target.checked)}
                    />
                    <label>Химия</label>
                  </div>
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.subjects.biology}
                      onChange={(e) => handleSubjectChange('biology', e.target.checked)}
                    />
                    <label>Биология</label>
                  </div>
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.subjects.russian}
                      onChange={(e) => handleSubjectChange('russian', e.target.checked)}
                    />
                    <label>Русский язык</label>
                  </div>
                </div>

                <div className="info-box">
                  <div className="info-box-title">📊 Что будет в отчете:</div>
                  <ul className="info-list">
                    <li>Общая статистика</li>
                    <li>Успеваемость по предметам</li>
                    <li>Посещаемость учеников</li>
                    <li>Динамика по классам</li>
                    <li>Рекомендации для улучшения</li>
                  </ul>
                </div>
              </div>

              <div className="button-group">
                <button className="btn-cancel" onClick={onClose}>
                  ← Отмена
                </button>
                <button className="btn-generate" onClick={handleSubmit}>
                  📊 Сформировать отчет
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Loading */}
          {currentStep === 2 && (
            <div className="loading-container">
              <div className="spinner"></div>
              <h2 className="loading-title">Формируем отчет</h2>
              <p className="loading-subtitle">Собираем данные для руководства...</p>

              <div className="loading-steps">
                <div className={`loading-step ${loadingStep >= 1 ? 'active' : ''} ${loadingStep > 1 ? 'completed' : ''}`}>
                  <span>📊</span>
                  <span>Сбор статистики...</span>
                </div>
                <div className={`loading-step ${loadingStep >= 2 ? 'active' : ''} ${loadingStep > 2 ? 'completed' : ''}`}>
                  <span>📈</span>
                  <span>Анализ успеваемости...</span>
                </div>
                <div className={`loading-step ${loadingStep >= 3 ? 'active' : ''} ${loadingStep > 3 ? 'completed' : ''}`}>
                  <span>💡</span>
                  <span>Формирование рекомендаций...</span>
                </div>
                <div className={`loading-step ${loadingStep >= 4 ? 'active' : ''}`}>
                  <span>📝</span>
                  <span>Оформление отчета...</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Result */}
          {currentStep === 3 && (
            <div className="result-container">
              {/* Report Header */}
              <div className="report-header-block">
                <div className="report-title">Отчет об успеваемости</div>
                <div className="report-meta">
                  <div className="report-meta-item">
                    <div className="meta-icon">📅</div>
                    <div>
                      <div className="meta-text">Период</div>
                      <div className="meta-value">
                        {formData.period === 'week' && 'Неделя'}
                        {formData.period === 'month' && 'Месяц'}
                        {formData.period === 'quarter' && 'Четверть'}
                        {formData.period === 'year' && 'Год'}
                      </div>
                    </div>
                  </div>
                  <div className="report-meta-item">
                    <div className="meta-icon">👥</div>
                    <div>
                      <div className="meta-text">Классы</div>
                      <div className="meta-value">
                        {formData.grade === 'all' ? 'Вся школа' : `${formData.grade} класс`}
                      </div>
                    </div>
                  </div>
                  <div className="report-meta-item">
                    <div className="meta-icon">🎓</div>
                    <div>
                      <div className="meta-text">Учеников</div>
                      <div className="meta-value">342 человека</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-header">
                    <div className="stat-icon">📈</div>
                    <div className="stat-trend up">↑ +0.2</div>
                  </div>
                  <div className="stat-value">4.1</div>
                  <div className="stat-label">Средний балл</div>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <div className="stat-icon">✅</div>
                    <div className="stat-trend up">↑ +5%</div>
                  </div>
                  <div className="stat-value">87%</div>
                  <div className="stat-label">Успеваемость</div>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <div className="stat-icon">👥</div>
                    <div className="stat-trend down">↓ -2%</div>
                  </div>
                  <div className="stat-value">92%</div>
                  <div className="stat-label">Посещаемость</div>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <div className="stat-icon">⭐</div>
                    <div className="stat-trend up">↑ +8</div>
                  </div>
                  <div className="stat-value">45</div>
                  <div className="stat-label">Отличников</div>
                </div>
              </div>

              {/* Subject Progress */}
              <div className="report-section">
                <div className="section-header">
                  <div className="section-icon">📚</div>
                  Успеваемость по предметам
                </div>

                <div className="progress-item">
                  <div className="progress-header">
                    <div className="progress-name">Математика</div>
                    <div className="progress-value">92%</div>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '92%' }}></div>
                  </div>
                </div>

                <div className="progress-item">
                  <div className="progress-header">
                    <div className="progress-name">Физика</div>
                    <div className="progress-value">88%</div>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '88%' }}></div>
                  </div>
                </div>

                <div className="progress-item">
                  <div className="progress-header">
                    <div className="progress-name">Химия</div>
                    <div className="progress-value">85%</div>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div className="progress-item">
                  <div className="progress-header">
                    <div className="progress-name">Русский язык</div>
                    <div className="progress-value">90%</div>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>

              {/* Class Table */}
              <div className="report-section">
                <div className="section-header">
                  <div className="section-icon">👥</div>
                  Успеваемость по классам
                </div>

                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Класс</th>
                      <th>Средний балл</th>
                      <th>Успеваемость</th>
                      <th>Отличники</th>
                      <th>Динамика</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>5 класс</strong></td>
                      <td>4.2</td>
                      <td>89%</td>
                      <td>8 чел.</td>
                      <td className="trend-up">↑ +0.3</td>
                    </tr>
                    <tr>
                      <td><strong>6 класс</strong></td>
                      <td>4.1</td>
                      <td>87%</td>
                      <td>6 чел.</td>
                      <td className="trend-up">↑ +0.1</td>
                    </tr>
                    <tr>
                      <td><strong>7 класс</strong></td>
                      <td>4.0</td>
                      <td>85%</td>
                      <td>7 чел.</td>
                      <td className="trend-down">↓ -0.2</td>
                    </tr>
                    <tr>
                      <td><strong>8 класс</strong></td>
                      <td>3.9</td>
                      <td>83%</td>
                      <td>5 чел.</td>
                      <td className="trend-down">↓ -0.1</td>
                    </tr>
                    <tr>
                      <td><strong>9 класс</strong></td>
                      <td>4.2</td>
                      <td>90%</td>
                      <td>9 чел.</td>
                      <td className="trend-up">↑ +0.4</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Recommendations */}
              <div className="report-section">
                <div className="section-header">
                  <div className="section-icon">💡</div>
                  Рекомендации
                </div>

                <div className="recommendation-item">
                  <div className="recommendation-title">Уделить внимание 7-8 классам</div>
                  <div className="recommendation-text">
                    Средний балл в 7-8 классах снизился. Рекомендуется провести дополнительные консультации.
                  </div>
                </div>

                <div className="recommendation-item">
                  <div className="recommendation-title">Улучшить успеваемость по химии</div>
                  <div className="recommendation-text">
                    Химия показывает самую низкую успеваемость (85%). Рекомендуется провести дополнительные занятия.
                  </div>
                </div>

                <div className="recommendation-item">
                  <div className="recommendation-title">Поддержать положительную динамику</div>
                  <div className="recommendation-text">
                    9 класс показывает отличные результаты. Продолжить применяемые методы обучения.
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button className="action-btn" onClick={downloadPDF}>
                  <span className="action-btn-icon">📥</span>
                  Скачать PDF
                </button>
                <button className="action-btn" onClick={downloadExcel}>
                  <span className="action-btn-icon">📊</span>
                  Экспорт в Excel
                </button>
                <button className="action-btn" onClick={sendReport}>
                  <span className="action-btn-icon">📧</span>
                  Отправить руководству
                </button>
                <button className="action-btn" onClick={saveToLibrary}>
                  <span className="action-btn-icon">💾</span>
                  Сохранить
                </button>
              </div>

              <div className="button-group">
                <button className="btn-cancel" onClick={startOver}>
                  ← Создать новый отчет
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManagementReport;
