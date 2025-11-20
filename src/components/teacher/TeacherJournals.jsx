import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './TeacherJournals.module.css';

const TeacherJournals = () => {
  const { token } = useAuth();
  
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filters, setFilters] = useState({
    date: new Date().toISOString().split('T')[0],
    topic: '',
    group: '',
    aiMode: true,
    period: 'last_month',
    quarter: '1', // Добавлен выбор четверти
    gradeType: 'all' // Тип оценки: all, fo, sor, soch
  });

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [topics, setTopics] = useState([]);
  const [groups, setGroups] = useState(['Все группы']);
  const [showQuarterlySummary, setShowQuarterlySummary] = useState(false);

  // Модальные окна
  const [showAiExplanation, setShowAiExplanation] = useState(false);
  const [selectedAiExplanation, setSelectedAiExplanation] = useState(null);
  const [showTopicFromAI, setShowTopicFromAI] = useState(false);
  const [pendingAITopic, setPendingAITopic] = useState(null);

  // Настройки формулы (загружаются из настроек школы)
  const [gradingFormula, setGradingFormula] = useState({
    type: 'bilimland', // bilimland, mon2025, custom
    percentages: { fo: 25, sor: 25, soch: 50 } // для bilimland это будет (fo+sor)=50, soch=50
  });

  const API_BASE = 'https://openschoolbackend-production.up.railway.app';

  // Слушаем события от AI-инструментов
  useEffect(() => {
    const handleAITopicGenerated = (event) => {
      const { topic, content, tool_type } = event.detail;
      setPendingAITopic({ topic, content, tool_type });
      setShowTopicFromAI(true);
    };

    window.addEventListener('aiTopicGenerated', handleAITopicGenerated);
    return () => window.removeEventListener('aiTopicGenerated', handleAITopicGenerated);
  }, []);

  useEffect(() => {
    if (token) {
      loadStudents();
      loadGroups();
      loadTopics();
    }
  }, [token, filters.date, filters.group, filters.period]);

  // Загрузка студентов
  const loadStudents = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (filters.date) params.append('date', filters.date);
      if (filters.group && filters.group !== 'Все группы') params.append('group', filters.group);
      if (filters.period) params.append('period', filters.period);

      const response = await fetch(`${API_BASE}/api/students?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setStudents(data);

    } catch (err) {
      console.error('Ошибка загрузки студентов:', err);
      setError(err.message);
      
      // Fallback к тестовым данным
      setStudents([
        {
          id: 1,
          name: 'Анна Иванова',
          email: 'anna@example.com',
          tasksCompleted: 4,
          totalTasks: 5,
          lastActive: '3 дн. назад',
          aiScore: 85,
          aiExplanation: 'Хорошее понимание темы, небольшие недочеты в оформлении.',
          manualScore: '',
          gradeType: 'fo', // Тип оценки: fo, sor, soch
          maxScore: 10, // Максимальный балл
          attendance: 'present', // present, absent, late
          comment: '',
          group: '10А'
        },
        {
          id: 2,
          name: 'Петр Сидоров',
          email: 'petr@example.com',
          tasksCompleted: 2,
          totalTasks: 5,
          lastActive: '1 неделя назад',
          aiScore: 62,
          aiExplanation: 'Базовое понимание темы, нужна дополнительная работа.',
          manualScore: '',
          gradeType: 'fo',
          maxScore: 10,
          attendance: 'absent',
          comment: '',
          group: '10А'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Загрузка групп и тем
  const loadGroups = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/groups`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setGroups(data);
      }
    } catch (err) {
      console.error('Ошибка загрузки групп:', err);
    }
  };

  const loadTopics = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.group && filters.group !== 'Все группы') {
        params.append('group', filters.group);
      }

      const response = await fetch(`${API_BASE}/api/topics?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setTopics(data);
      }
    } catch (err) {
      console.error('Ошибка загрузки тем:', err);
    }
  };

  // Добавить тему из AI-инструмента в журнал
  const addTopicFromAI = async (selectedStudentIds) => {
    try {
      const response = await fetch(`${API_BASE}/api/ai-tools/create-journal-entries`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          topic: pendingAITopic.topic,
          student_ids: selectedStudentIds,
          generated_content: pendingAITopic.content,
          tool_type: pendingAITopic.tool_type,
          lesson_date: filters.date
        })
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        
        // Обновляем список тем и студентов
        await loadTopics();
        await loadStudents();
        
        // Автоматически выбираем новую тему в фильтре
        setFilters(prev => ({ ...prev, topic: pendingAITopic.topic }));
      } else {
        throw new Error('Ошибка добавления темы в журнал');
      }
    } catch (err) {
      console.error('Ошибка:', err);
      alert('Ошибка при добавлении темы в журнал');
    } finally {
      setShowTopicFromAI(false);
      setPendingAITopic(null);
    }
  };

  // Отклонить добавление темы
  const rejectTopicFromAI = () => {
    setShowTopicFromAI(false);
    setPendingAITopic(null);
  };

  // Изменение оценки студента
  const handleGradeChange = async (studentId, grade) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, manualScore: grade }
        : student
    ));

    try {
      await fetch(`${API_BASE}/api/students/${studentId}/grade`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          grade: parseInt(grade),
          date: filters.date,
          topic: filters.topic 
        })
      });
    } catch (err) {
      console.error('Ошибка сохранения оценки:', err);
      alert('Ошибка при сохранении оценки');
    }
  };

  // Изменение комментария с debounce
  const handleCommentChange = async (studentId, comment) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, comment: comment }
        : student
    ));

    clearTimeout(window.commentTimeout);
    window.commentTimeout = setTimeout(async () => {
      try {
        await fetch(`${API_BASE}/api/students/${studentId}/comment`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ comment, date: filters.date })
        });
      } catch (err) {
        console.error('Ошибка сохранения комментария:', err);
      }
    }, 1000);
  };

  // Показать AI-объяснение
  const showAiExplanationModal = async (student) => {
    const aiSuggestion = calculateAISuggestion(student);
    setSelectedAiExplanation({
      studentName: student.name,
      aiScore: aiSuggestion.score,
      maxScore: aiSuggestion.maxScore,
      percentage: aiSuggestion.percentage,
      gradeType: student.gradeType,
      explanation: student.aiExplanation || aiSuggestion.explanation,
      topic: filters.topic || 'Общая оценка'
    });
    setShowAiExplanation(true);
  };

  // Принять AI-оценку
  const acceptAiGrade = async (studentId) => {
    const student = students.find(s => s.id === studentId);
    if (student && student.aiScore) {
      await handleGradeChange(studentId, student.aiScore);
      // Показываем уведомление
      const notification = document.createElement('div');
      notification.className = styles.notification;
      notification.textContent = `AI-оценка ${student.aiScore} принята для ${student.name}`;
      document.body.appendChild(notification);
      setTimeout(() => document.body.removeChild(notification), 3000);
    }
  };

  // Применить AI-оценки для выбранных
  const applyAIGrades = async () => {
    if (selectedStudents.length === 0) {
      alert('Выберите студентов для применения AI-оценок');
      return;
    }

    if (!window.confirm(`Применить AI-оценки для ${selectedStudents.length} студентов?`)) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/students/apply-ai-grades`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          student_ids: selectedStudents,
          date: filters.date,
          topic: filters.topic
        })
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        await loadStudents();
        setSelectedStudents([]);
      } else {
        throw new Error('Ошибка применения AI-оценок');
      }
    } catch (err) {
      console.error('Ошибка применения AI-оценок:', err);
      alert('Ошибка при применении AI-оценок');
    }
  };

  // Сохранить все изменения
  const saveGrades = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/students/save-grades`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          students: students.filter(s => s.manualScore || s.comment),
          date: filters.date,
          topic: filters.topic
        })
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
      }
    } catch (err) {
      console.error('Ошибка сохранения:', err);
      alert('Ошибка при сохранении оценок');
    }
  };

  // Вспомогательные функции
  const handleSelectStudent = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    const filteredIds = getFilteredStudents().map(s => s.id);
    if (selectedStudents.length === filteredIds.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredIds);
    }
  };

  const getFilteredStudents = () => {
    return students.filter(student => {
      const matchesGroup = !filters.group || filters.group === 'Все группы' || student.group === filters.group;
      return matchesGroup;
    });
  };

  const getGradeColor = (grade) => {
    if (grade >= 90) return '#10B981';
    if (grade >= 75) return '#F59E0B';
    if (grade >= 60) return '#EF4444';
    return '#6B7280';
  };

  const getActivityColor = (lastActive) => {
    if (lastActive === 'сегодня' || lastActive.includes('1 дн.')) return '#10B981';
    if (lastActive.includes('дн.') && parseInt(lastActive) <= 3) return '#F59E0B';
    return '#EF4444';
  };

  // Расчет AI-подсказки на основе типа оценки и максимального балла
  const calculateAISuggestion = (student) => {
    const maxScore = student.maxScore || (student.gradeType === 'fo' ? 10 : 20);
    const basePercentage = student.aiScore || 0; // Процент выполнения (0-100)

    // Пересчитываем в оценку от 0 до maxScore
    const suggestedScore = Math.round((basePercentage / 100) * maxScore);

    return {
      score: suggestedScore,
      maxScore: maxScore,
      percentage: basePercentage,
      explanation: student.aiExplanation || `Рекомендуемая оценка: ${suggestedScore}/${maxScore} (${basePercentage}%)`
    };
  };

  // Расчет четвертной оценки по формуле
  const calculateQuarterlyGrade = (studentId) => {
    const studentGrades = students
      .filter(s => s.id === studentId)
      .map(s => ({
        type: s.gradeType,
        score: s.manualScore || 0,
        maxScore: s.maxScore || 10
      }));

    // Группируем по типам
    const foGrades = studentGrades.filter(g => g.type === 'fo');
    const sorGrades = studentGrades.filter(g => g.type === 'sor');
    const sochGrades = studentGrades.filter(g => g.type === 'soch');

    // Считаем средние проценты
    const foPercent = foGrades.length > 0
      ? (foGrades.reduce((sum, g) => sum + (g.score / g.maxScore), 0) / foGrades.length) * 100
      : 0;

    const sorPercent = sorGrades.length > 0
      ? (sorGrades.reduce((sum, g) => sum + (g.score / g.maxScore), 0) / sorGrades.length) * 100
      : 0;

    const sochPercent = sochGrades.length > 0
      ? (sochGrades.reduce((sum, g) => sum + (g.score / g.maxScore), 0) / sochGrades.length) * 100
      : 0;

    // Применяем формулу
    let finalPercent = 0;

    if (gradingFormula.type === 'bilimland') {
      // Билимланд: (ФО+СОР) = 50%, СОЧ = 50%
      const foSorAverage = (foPercent + sorPercent) / 2;
      finalPercent = (foSorAverage * 0.5) + (sochPercent * 0.5);
    } else if (gradingFormula.type === 'mon2025') {
      // МОН РК 2025: ФО = 25%, СОР = 25%, СОЧ = 50%
      finalPercent = (foPercent * 0.25) + (sorPercent * 0.25) + (sochPercent * 0.5);
    } else {
      // Кастомная формула
      const { fo, sor, soch } = gradingFormula.percentages;
      finalPercent = (foPercent * fo / 100) + (sorPercent * sor / 100) + (sochPercent * soch / 100);
    }

    // Переводим в оценку 2-5
    let grade = 2;
    if (finalPercent >= 85) grade = 5;
    else if (finalPercent >= 65) grade = 4;
    else if (finalPercent >= 40) grade = 3;

    return {
      foPercent: foPercent.toFixed(1),
      sorPercent: sorPercent.toFixed(1),
      sochPercent: sochPercent.toFixed(1),
      finalPercent: finalPercent.toFixed(1),
      grade,
      foCount: foGrades.length,
      sorCount: sorGrades.length,
      sochCount: sochGrades.length
    };
  };

  // Получить сводку по всем оценкам для выбранной четверти
  const getQuarterlySummary = () => {
    const summary = {};

    filteredStudents.forEach(student => {
      const calc = calculateQuarterlyGrade(student.id);
      summary[student.id] = {
        name: student.name,
        ...calc
      };
    });

    return summary;
  };

  const filteredStudents = getFilteredStudents();

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Загрузка данных журнала...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {error && (
        <div className={styles.errorBanner}>
          ⚠️ Ошибка подключения к серверу: {error}. Используются тестовые данные.
        </div>
      )}

      {/* Модальное окно для добавления темы из AI */}
      {showTopicFromAI && pendingAITopic && (
        <div className={styles.modal} onClick={(e) => e.target === e.currentTarget && rejectTopicFromAI()}>
          <div className={styles.modalContent}>
            <h3>Добавить тему в журнал</h3>
            <div className={styles.topicInfo}>
              <p><strong>Тема:</strong> {pendingAITopic.topic}</p>
              <p><strong>Источник:</strong> {pendingAITopic.tool_type}</p>
              <div className={styles.topicContent}>
                <strong>Содержание:</strong>
                <div className={styles.contentPreview}>
                  {pendingAITopic.content.substring(0, 200)}...
                </div>
              </div>
            </div>
            
            <div className={styles.studentSelection}>
              <h4>Выберите студентов для добавления темы:</h4>
              <div className={styles.studentCheckboxes}>
                {students.map(student => (
                  <label key={student.id} className={styles.studentCheckbox}>
                    <input 
                      type="checkbox" 
                      defaultChecked={true}
                      id={`student-${student.id}`}
                    />
                    <span>{student.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.modalActions}>
              <button 
                className={styles.rejectBtn}
                onClick={rejectTopicFromAI}
              >
                Отмена
              </button>
              <button 
                className={styles.acceptBtn}
                onClick={() => {
                  const selectedIds = students
                    .filter((_, index) => document.getElementById(`student-${students[index].id}`).checked)
                    .map(s => s.id);
                  addTopicFromAI(selectedIds);
                }}
              >
                Добавить в журнал
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно AI-объяснения */}
      {showAiExplanation && selectedAiExplanation && (
        <div className={styles.modal} onClick={() => setShowAiExplanation(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>🤖 AI-объяснение оценки</h3>
            <div className={styles.explanationContent}>
              <p><strong>Студент:</strong> {selectedAiExplanation.studentName}</p>
              <p><strong>Тема:</strong> {selectedAiExplanation.topic}</p>
              <p><strong>Тип оценки:</strong> {
                selectedAiExplanation.gradeType === 'fo' ? 'ФО (Формативная)' :
                selectedAiExplanation.gradeType === 'sor' ? 'СОР (За раздел)' :
                'СОЧ (За четверть)'
              }</p>
              <p><strong>AI предлагает:</strong>
                <span style={{
                  color: getGradeColor(selectedAiExplanation.percentage),
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginLeft: '8px'
                }}>
                  {selectedAiExplanation.aiScore}/{selectedAiExplanation.maxScore}
                </span>
                <span style={{ color: '#6B7280', marginLeft: '8px' }}>
                  ({selectedAiExplanation.percentage}%)
                </span>
              </p>
              <div className={styles.explanation}>
                <strong>Объяснение:</strong>
                <p>{selectedAiExplanation.explanation}</p>
              </div>
            </div>
            <button
              className={styles.closeBtn}
              onClick={() => setShowAiExplanation(false)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}

      {/* Панель фильтров */}
      <div className={styles.filtersPanel}>
        <div className={styles.filtersRow}>
          <div className={styles.filterGroup}>
            <label>📅 Дата урока</label>
            <input
              type="date"
              value={filters.date}
              onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
              className={styles.dateInput}
            />
          </div>

          <div className={styles.filterGroup}>
            <label>📊 Четверть</label>
            <select
              value={filters.quarter}
              onChange={(e) => setFilters(prev => ({ ...prev, quarter: e.target.value }))}
              className={styles.quarterSelect}
            >
              <option value="1">1 четверть</option>
              <option value="2">2 четверть</option>
              <option value="3">3 четверть</option>
              <option value="4">4 четверть</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>📝 Тип оценки</label>
            <select
              value={filters.gradeType}
              onChange={(e) => setFilters(prev => ({ ...prev, gradeType: e.target.value }))}
              className={styles.gradeTypeSelect}
            >
              <option value="all">Все типы</option>
              <option value="fo">ФО (Формативная)</option>
              <option value="sor">СОР (За раздел)</option>
              <option value="soch">СОЧ (За четверть)</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>📘 Тема</label>
            <select
              value={filters.topic}
              onChange={(e) => setFilters(prev => ({ ...prev, topic: e.target.value }))}
              className={styles.topicSelect}
            >
              <option value="">Все темы</option>
              {topics.map(topic => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>👥 Класс</label>
            <select
              value={filters.group}
              onChange={(e) => setFilters(prev => ({ ...prev, group: e.target.value }))}
              className={styles.groupSelect}
            >
              {groups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>🧠 AI режим</label>
            <label className={styles.aiToggle}>
              <input
                type="checkbox"
                checked={filters.aiMode}
                onChange={(e) => setFilters(prev => ({ ...prev, aiMode: e.target.checked }))}
              />
              <span className={styles.toggleSlider}></span>
              <span className={styles.toggleText}>{filters.aiMode ? 'ON' : 'OFF'}</span>
            </label>
          </div>

          <div className={styles.filterGroup}>
            <label>📊 Сводка</label>
            <button
              className={styles.summaryBtn}
              onClick={() => setShowQuarterlySummary(!showQuarterlySummary)}
            >
              {showQuarterlySummary ? 'Скрыть' : 'Показать'}
            </button>
          </div>
        </div>
      </div>

      {/* Четвертная сводка */}
      {showQuarterlySummary && (
        <div className={styles.quarterlySummaryCard}>
          <div className={styles.summaryHeader}>
            <h3>Сводка по {filters.quarter} четверти</h3>
            <div className={styles.formulaInfo}>
              Формула: {
                gradingFormula.type === 'bilimland' ? 'Билимланд (ФО+СОР=50%, СОЧ=50%)' :
                gradingFormula.type === 'mon2025' ? 'МОН РК 2025 (ФО=25%, СОР=25%, СОЧ=50%)' :
                'Кастомная формула'
              }
            </div>
          </div>

          <div className={styles.summaryTable}>
            <table>
              <thead>
                <tr>
                  <th>Ученик</th>
                  <th>ФО</th>
                  <th>СОР</th>
                  <th>СОЧ</th>
                  <th>Итоговый %</th>
                  <th>Оценка</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(getQuarterlySummary()).map(([studentId, summary]) => (
                  <tr key={studentId}>
                    <td>{summary.name}</td>
                    <td>
                      <div className={styles.gradeCell}>
                        {summary.foPercent}%
                        <span className={styles.gradeCount}>({summary.foCount})</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.gradeCell}>
                        {summary.sorPercent}%
                        <span className={styles.gradeCount}>({summary.sorCount})</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.gradeCell}>
                        {summary.sochPercent}%
                        <span className={styles.gradeCount}>({summary.sochCount})</span>
                      </div>
                    </td>
                    <td>
                      <strong>{summary.finalPercent}%</strong>
                    </td>
                    <td>
                      <div
                        className={styles.finalGrade}
                        style={{
                          backgroundColor:
                            summary.grade === 5 ? '#10B981' :
                            summary.grade === 4 ? '#3B82F6' :
                            summary.grade === 3 ? '#F59E0B' :
                            '#EF4444',
                          color: 'white'
                        }}
                      >
                        {summary.grade}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.summaryLegend}>
            <div className={styles.legendItem}>
              <span className={styles.legendIcon} style={{backgroundColor: '#10B981'}}>5</span>
              <span>85-100% - Отлично</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendIcon} style={{backgroundColor: '#3B82F6'}}>4</span>
              <span>65-84% - Хорошо</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendIcon} style={{backgroundColor: '#F59E0B'}}>3</span>
              <span>40-64% - Удовлетворительно</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendIcon} style={{backgroundColor: '#EF4444'}}>2</span>
              <span>0-39% - Неудовлетворительно</span>
            </div>
          </div>
        </div>
      )}

      {/* Основная таблица журнала */}
      <div className={styles.journalTable}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Ученик</th>
              <th>Посещаемость</th>
              <th>Тип оценки</th>
              <th>Макс. балл</th>
              <th>Оценка</th>
              <th>Комментарий</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.id} className={styles.tableRow}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleSelectStudent(student.id)}
                  />
                </td>
                <td>
                  <div className={styles.studentInfo}>
                    <div className={styles.avatar}>👨‍🎓</div>
                    <div>
                      <span className={styles.studentName}>{student.name}</span>
                      <div className={styles.studentEmail}>{student.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <select
                    value={student.attendance || 'present'}
                    onChange={(e) => setStudents(prev => prev.map(s =>
                      s.id === student.id ? { ...s, attendance: e.target.value } : s
                    ))}
                    className={styles.attendanceSelect}
                    style={{
                      backgroundColor:
                        student.attendance === 'present' ? '#10B981' :
                        student.attendance === 'late' ? '#F59E0B' :
                        '#EF4444',
                      color: 'white'
                    }}
                  >
                    <option value="present">✓ Был</option>
                    <option value="late">⏰ Опоздал</option>
                    <option value="absent">✗ Не был</option>
                  </select>
                </td>
                <td>
                  <select
                    value={student.gradeType || 'fo'}
                    onChange={(e) => setStudents(prev => prev.map(s =>
                      s.id === student.id ? { ...s, gradeType: e.target.value } : s
                    ))}
                    className={styles.gradeTypeSelect}
                  >
                    <option value="fo">ФО</option>
                    <option value="sor">СОР</option>
                    <option value="soch">СОЧ</option>
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={student.maxScore || (student.gradeType === 'fo' ? 10 : 20)}
                    onChange={(e) => setStudents(prev => prev.map(s =>
                      s.id === student.id ? { ...s, maxScore: parseInt(e.target.value) } : s
                    ))}
                    className={styles.maxScoreInput}
                    placeholder="Макс"
                  />
                </td>
                <td>
                  <div className={styles.gradeCell}>
                    <div className={styles.gradeInputWrapper}>
                      <input
                        type="number"
                        min="0"
                        max={student.maxScore || 100}
                        value={student.manualScore}
                        onChange={(e) => handleGradeChange(student.id, e.target.value)}
                        placeholder={filters.aiMode && student.aiScore ? (() => {
                          const aiSuggestion = calculateAISuggestion(student);
                          return `AI: ${aiSuggestion.score}`;
                        })() : '0'}
                        className={styles.gradeInput}
                        style={filters.aiMode && student.aiScore && !student.manualScore ? {
                          borderColor: '#B799FF',
                          backgroundColor: '#F9FAFB'
                        } : {}}
                      />
                      {filters.aiMode && student.aiScore && (
                        <span className={styles.aiIndicator} title={`AI предлагает: ${calculateAISuggestion(student).score}`}>
                          🤖
                        </span>
                      )}
                    </div>
                    {filters.aiMode && student.aiScore && (
                      <div className={styles.aiActions}>
                        <button
                          className={styles.explainBtn}
                          onClick={() => showAiExplanationModal(student)}
                          title="Посмотреть объяснение AI"
                        >
                          💡 Почему?
                        </button>
                        <button
                          className={styles.acceptBtn}
                          onClick={() => {
                            const aiSuggestion = calculateAISuggestion(student);
                            handleGradeChange(student.id, aiSuggestion.score);
                          }}
                          title="Принять AI-оценку"
                        >
                          ✓ Принять AI
                        </button>
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <input
                    type="text"
                    value={student.comment}
                    onChange={(e) => handleCommentChange(student.id, e.target.value)}
                    placeholder="Добавить комментарий..."
                    className={styles.commentInput}
                  />
                </td>
                <td>
                  <div className={styles.statusIcon}>
                    {student.manualScore ? (
                      <span className={styles.statusSaved} title="Оценка выставлена">✅</span>
                    ) : filters.aiMode && student.aiScore ? (
                      <span className={styles.statusAI} title="AI-рекомендация">🤖</span>
                    ) : (
                      <span className={styles.statusPending} title="Ожидает оценки">⏳</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredStudents.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📚</div>
            <h3>Нет студентов для отображения</h3>
            <p>Выберите группу или измените фильтры</p>
          </div>
        )}
      </div>

      {/* Панель действий */}
      <div className={styles.actionsPanel}>
        <div className={styles.actionsLeft}>
          <span className={styles.selectionInfo}>
            Выбрано: {selectedStudents.length} из {filteredStudents.length}
          </span>
          {filters.aiMode && selectedStudents.length > 0 && (() => {
            const selectedWithAI = filteredStudents.filter(s =>
              selectedStudents.includes(s.id) && s.aiScore
            ).length;
            return (
              <span className={styles.aiAvailableInfo}>
                🤖 AI доступен для: {selectedWithAI} из {selectedStudents.length}
              </span>
            );
          })()}
          {filters.topic && (
            <span className={styles.currentTopic}>
              Тема: {filters.topic}
            </span>
          )}
        </div>

        <div className={styles.actionsRight}>
          {filters.aiMode && selectedStudents.length > 0 && (() => {
            const selectedWithAI = filteredStudents.filter(s =>
              selectedStudents.includes(s.id) && s.aiScore
            ).length;
            return selectedWithAI > 0 && (
              <button
                className={styles.aiApplyBtn}
                onClick={applyAIGrades}
                title={`Применить AI-оценки для ${selectedWithAI} студентов`}
              >
                🤖 Применить AI для выбранных ({selectedWithAI})
              </button>
            );
          })()}

          <button className={styles.saveBtn} onClick={saveGrades}>
            💾 Сохранить
          </button>

          <button className={styles.refreshBtn} onClick={loadStudents}>
            🔄 Обновить
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherJournals;
