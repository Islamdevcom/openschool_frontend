import React, { useState, useEffect } from 'react';
import './Schedule.css';

const predefinedSubjects = [
  'Математика', 'Алгебра', 'Геометрия', 'Физика', 'Химия', 'Биология',
  'География', 'История', 'Обществознание', 'Русский язык', 'Литература',
  'Английский язык', 'Казахский язык', 'Информатика', 'Физкультура',
  'ОБЖ', 'Музыка', 'ИЗО', 'Технология'
];

const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];

function Schedule({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    grade: '',
    lessonsCount: '5',
    startTime: '08:30'
  });
  const [scheduleData, setScheduleData] = useState({});

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setFormData({ grade: '', lessonsCount: '5', startTime: '08:30' });
      setScheduleData({});
    }
  }, [isOpen]);

  const generateTimes = (count, start) => {
    const times = [];
    let [hours, minutes] = start.split(':').map(Number);

    for (let i = 0; i < count; i++) {
      const startStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      let endMinutes = minutes + 45;
      let endHours = hours;
      if (endMinutes >= 60) {
        endMinutes -= 60;
        endHours++;
      }
      const endStr = `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
      times.push({ start: startStr, end: endStr });

      minutes = endMinutes + 15;
      hours = endHours;
      if (minutes >= 60) {
        minutes -= 60;
        hours++;
      }
    }
    return times;
  };

  const times = generateTimes(parseInt(formData.lessonsCount), formData.startTime);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleScheduleChange = (dayIndex, timeIndex, value) => {
    setScheduleData(prev => ({
      ...prev,
      [`${dayIndex}-${timeIndex}`]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.grade) {
      alert('Пожалуйста, выберите класс');
      return;
    }

    const hasLessons = Object.values(scheduleData).some(v => v);
    if (!hasLessons) {
      alert('Заполните хотя бы один урок в расписании');
      return;
    }

    setCurrentStep(2);
    setTimeout(() => setCurrentStep(3), 1500);
  };

  const startOver = () => {
    setCurrentStep(1);
    setFormData({ grade: '', lessonsCount: '5', startTime: '08:30' });
    setScheduleData({});
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('schedule-overlay')) {
      onClose();
    }
  };

  const getSubjectClass = (subject) => {
    if (!subject) return '';
    const map = {
      'Математика': 'math', 'Алгебра': 'math', 'Геометрия': 'math',
      'Физика': 'physics', 'Химия': 'chemistry', 'Биология': 'biology',
      'Русский язык': 'russian', 'Литература': 'russian',
      'Английский язык': 'english', 'Казахский язык': 'kazakh',
      'История': 'history', 'География': 'geography'
    };
    return map[subject] || 'default';
  };

  if (!isOpen) return null;

  return (
    <div className="schedule-overlay" onClick={handleOverlayClick}>
      <div className="schedule-modal">
        {/* Header */}
        <div className="schedule-header">
          <div className="schedule-header-content">
            <div className="schedule-icon">📅</div>
            <div>
              <h2>Расписание уроков</h2>
              <p>Мое расписание</p>
            </div>
          </div>
          <button className="schedule-close" onClick={onClose}>×</button>
        </div>

        {/* Content */}
        <div className="schedule-content">
          {/* Step 1: Form */}
          {currentStep === 1 && (
            <div className="schedule-form">
              <div className="form-section">
                <h3 className="section-title">Параметры расписания</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Класс <span className="required">*</span></label>
                    <select name="grade" value={formData.grade} onChange={handleInputChange}>
                      <option value="">Выберите класс</option>
                      {[...Array(11)].map((_, i) => (
                        <option key={i+1} value={`${i+1}`}>{i+1} класс</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Количество уроков</label>
                    <select name="lessonsCount" value={formData.lessonsCount} onChange={handleInputChange}>
                      <option value="4">4 урока</option>
                      <option value="5">5 уроков</option>
                      <option value="6">6 уроков</option>
                      <option value="7">7 уроков</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Время начала</label>
                    <select name="startTime" value={formData.startTime} onChange={handleInputChange}>
                      <option value="08:00">08:00</option>
                      <option value="08:30">08:30</option>
                      <option value="09:00">09:00</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Заполните расписание на неделю</h3>
                <p className="section-hint">Выберите предмет для каждого урока</p>

                <div className="schedule-builder">
                  <table className="builder-table">
                    <thead>
                      <tr>
                        <th>Время</th>
                        {days.map(day => <th key={day}>{day}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {times.map((time, timeIndex) => (
                        <tr key={timeIndex}>
                          <td className="time-cell">{time.start}<br/>{time.end}</td>
                          {days.map((_, dayIndex) => (
                            <td key={dayIndex}>
                              <select
                                value={scheduleData[`${dayIndex}-${timeIndex}`] || ''}
                                onChange={(e) => handleScheduleChange(dayIndex, timeIndex, e.target.value)}
                              >
                                <option value="">—</option>
                                {predefinedSubjects.map(subj => (
                                  <option key={subj} value={subj}>{subj}</option>
                                ))}
                              </select>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="button-group">
                <button className="btn-cancel" onClick={onClose}>← Отмена</button>
                <button className="btn-generate" onClick={handleSubmit}>📅 Создать расписание</button>
              </div>
            </div>
          )}

          {/* Step 2: Loading */}
          {currentStep === 2 && (
            <div className="loading-container">
              <div className="spinner"></div>
              <h2 className="loading-title">Создаем расписание</h2>
              <p className="loading-subtitle">Формируем таблицу...</p>
            </div>
          )}

          {/* Step 3: Result */}
          {currentStep === 3 && (
            <div className="result-container">
              <div className="result-header-block">
                <div className="result-title">Расписание {formData.grade} класса</div>
                <div className="result-subtitle">На учебную неделю</div>
              </div>

              <div className="schedule-result-table">
                <table className="result-table">
                  <thead>
                    <tr>
                      <th>Время</th>
                      {days.map(day => <th key={day}>{day}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {times.map((time, timeIndex) => (
                      <tr key={timeIndex}>
                        <td className="time-cell">{time.start}<br/>{time.end}</td>
                        {days.map((_, dayIndex) => {
                          const subject = scheduleData[`${dayIndex}-${timeIndex}`];
                          return (
                            <td key={dayIndex} className="lesson-cell">
                              {subject ? (
                                <div className={`lesson-card ${getSubjectClass(subject)}`}>
                                  <div className="lesson-name">{subject}</div>
                                  <div className="lesson-time">{time.start} - {time.end}</div>
                                </div>
                              ) : (
                                <span className="empty-cell">—</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="action-buttons">
                <button className="action-btn" onClick={() => alert('Скачивание PDF')}>
                  <span>📥</span> Скачать PDF
                </button>
                <button className="action-btn" onClick={() => window.print()}>
                  <span>🖨️</span> Распечатать
                </button>
                <button className="action-btn" onClick={() => alert('Отправлено!')}>
                  <span>📱</span> На телефон
                </button>
                <button className="action-btn" onClick={() => alert('Сохранено!')}>
                  <span>💾</span> Сохранить
                </button>
              </div>

              <div className="button-group">
                <button className="btn-cancel" onClick={startOver}>← Создать новое</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Schedule;
