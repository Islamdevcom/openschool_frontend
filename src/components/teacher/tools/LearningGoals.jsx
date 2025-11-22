import React, { useState, useEffect } from 'react';
import './LearningGoals.css';

function LearningGoals({ isOpen, onClose }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Форма данных
  const [formData, setFormData] = useState({
    subject: '',
    grade: '',
    topic: '',
    context: ''
  });

  // Сброс при открытии
  useEffect(() => {
    if (isOpen) {
      setIsGenerating(false);
      setShowResult(false);
      setFormData({
        subject: '',
        grade: '',
        topic: '',
        context: ''
      });
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.subject || !formData.grade || !formData.topic) {
      alert('Пожалуйста, заполните все обязательные поля отмеченные *');
      return;
    }

    setIsGenerating(true);

    // Имитация генерации
    setTimeout(() => {
      setIsGenerating(false);
      setShowResult(true);
    }, 2000);
  };

  const startOver = () => {
    setShowResult(false);
    setFormData({
      subject: '',
      grade: '',
      topic: '',
      context: ''
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('learning-goals-overlay')) {
      onClose();
    }
  };

  const bloomLevels = [
    { level: 1, name: 'Знание (Remember)', description: 'Запоминание и воспроизведение фактов, терминов, определений', color: '#f56565' },
    { level: 2, name: 'Понимание (Understand)', description: 'Объяснение идей и концепций своими словами', color: '#ed8936' },
    { level: 3, name: 'Применение (Apply)', description: 'Использование знаний в новых ситуациях', color: '#ecc94b' },
    { level: 4, name: 'Анализ (Analyze)', description: 'Разбор информации на части, выявление связей', color: '#48bb78' },
    { level: 5, name: 'Синтез/Оценка (Evaluate)', description: 'Вынесение обоснованных суждений на основе критериев', color: '#4299e1' },
    { level: 6, name: 'Создание (Create)', description: 'Создание нового продукта или точки зрения', color: '#9f7aea' }
  ];

  // Сгенерированные цели (пример)
  const generatedGoals = [
    { level: 'Знание', goal: `Ученик запоминает основные понятия и термины по теме "${formData.topic}"` },
    { level: 'Понимание', goal: `Ученик объясняет своими словами ключевые идеи темы "${formData.topic}"` },
    { level: 'Применение', goal: `Ученик применяет полученные знания для решения практических задач` },
    { level: 'Анализ', goal: `Ученик анализирует связи между компонентами темы и выявляет закономерности` },
    { level: 'Оценка', goal: `Ученик оценивает значимость изученного материала и аргументирует свою позицию` },
    { level: 'Создание', goal: `Ученик создает собственный продукт/проект на основе полученных знаний` }
  ];

  if (!isOpen) return null;

  return (
    <div className="learning-goals-overlay" onClick={handleOverlayClick}>
      <div className="learning-goals-modal">
        {/* Header */}
        <div className="learning-goals-header">
          <div className="learning-goals-header-content">
            <div className="learning-goals-icon">🎯</div>
            <div>
              <h2>Цели обучения</h2>
              <p>По таксономии Блума</p>
            </div>
          </div>
          <button className="learning-goals-close" onClick={onClose}>×</button>
        </div>

        {/* Content */}
        <div className="learning-goals-content">
          {!showResult ? (
            // Form
            <div className="learning-goals-form">
              <div className="form-section">
                <h3 className="section-title">Информация об уроке</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Предмет <span className="required">*</span></label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Например: Литература"
                    />
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

                <div className="form-grid full">
                  <div className="form-group">
                    <label>Тема урока <span className="required">*</span></label>
                    <input
                      type="text"
                      name="topic"
                      value={formData.topic}
                      onChange={handleInputChange}
                      placeholder="Например: Анализ романа 'Война и мир'"
                    />
                  </div>

                  <div className="form-group">
                    <label>Дополнительный контекст</label>
                    <textarea
                      name="context"
                      value={formData.context}
                      onChange={handleInputChange}
                      placeholder="Опишите особенности урока, уровень подготовки класса, что важно учесть при создании целей обучения..."
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">О таксономии Блума</h3>

                <div className="info-box">
                  <div className="info-box-title">
                    🧠 Уровни таксономии Блума:
                  </div>
                  <div className="bloom-levels">
                    {bloomLevels.map((item) => (
                      <div
                        key={item.level}
                        className="bloom-level"
                        style={{ borderColor: item.color }}
                      >
                        <strong>{item.level}. {item.name}</strong>
                        <span>{item.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="button-group">
                <button className="btn-cancel" onClick={onClose}>
                  ← Отмена
                </button>
                <button
                  className="btn-generate"
                  onClick={handleSubmit}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>⏳ Генерация целей...</>
                  ) : (
                    <>✨ Сгенерировать цели обучения</>
                  )}
                </button>
              </div>
            </div>
          ) : (
            // Result
            <div className="result-container">
              <div className="result-header">
                <h2>Цели обучения сгенерированы</h2>
                <div className="result-badges">
                  <span className="badge badge-success">✓ Готово</span>
                  <span className="badge badge-source">Таксономия Блума</span>
                </div>
              </div>

              <div className="result-info">
                <div className="result-info-item">
                  <strong>Предмет:</strong> {formData.subject}
                </div>
                <div className="result-info-item">
                  <strong>Класс:</strong> {formData.grade}
                </div>
                <div className="result-info-item">
                  <strong>Тема:</strong> {formData.topic}
                </div>
              </div>

              <div className="goals-list">
                {generatedGoals.map((goal, index) => (
                  <div key={index} className="goal-item">
                    <div className="goal-level">{goal.level}</div>
                    <div className="goal-text">{goal.goal}</div>
                  </div>
                ))}
              </div>

              <div className="button-group result-buttons">
                <button className="btn-cancel" onClick={startOver}>
                  ← Создать новые цели
                </button>
                <button className="btn-generate" onClick={() => navigator.clipboard.writeText(generatedGoals.map(g => `${g.level}: ${g.goal}`).join('\n'))}>
                  📋 Копировать
                </button>
                <button className="btn-generate btn-save" onClick={() => alert('Сохранено в библиотеку!')}>
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

export default LearningGoals;
