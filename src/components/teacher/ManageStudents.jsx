import React, { useState, useMemo, useEffect } from 'react';
import styles from './ManageStudents.module.css';

const ManageStudents = () => {
  // ❌ Убираем статичные данные и заменяем на пустой массив
  const [students, setStudents] = useState([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  
  const [groups, setGroups] = useState([
    { id: 1, name: '1 группа', color: '#A7F3D0' },
    { id: 2, name: '2 группа', color: '#3B82F6' },
    { id: 3, name: 'Продвинутые', color: '#F59E0B' },
    { id: 4, name: 'Олимпиадники', color: '#EF4444' }
  ]);
  
  // Внутренние табы
  const [activeSubTab, setActiveSubTab] = useState('groups');
  
  const [filters, setFilters] = useState({
    search: '',
    grade: '',
    group: '',
    activity: '',
    progress: ''
  });
  
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [showGroupManager, setShowGroupManager] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  
  // Состояние для инвайт-кода (убираем генерацию при инициализации)
  const [inviteCode, setInviteCode] = useState('');
  const [isLoadingCode, setIsLoadingCode] = useState(false);
  const [selectedGroupForInvite, setSelectedGroupForInvite] = useState('');
  
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    grade: '',
    groups: []
  });

  const [newGroup, setNewGroup] = useState({
    name: '',
    color: '#B799FF'
  });

  // ✅ Функция загрузки реальных студентов из API
  const loadMyStudents = async () => {
    try {
      setIsLoadingStudents(true);
      const response = await fetch('http://localhost:8000/invites/students', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const studentsData = await response.json();
        console.log('Загружены студенты:', studentsData);
        
        // Преобразуем данные в нужный формат для таблицы
        const formattedStudents = studentsData.map(student => ({
          id: student.id,
          name: student.name,
          email: student.email,
          grade: 'Не указан',
          groups: [],
          lastActive: new Date().toISOString().split('T')[0],
          progress: 0,
          tasksCompleted: 0
        }));
        
        setStudents(formattedStudents);
      } else {
        console.error('Ошибка загрузки студентов:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Ошибка подключения при загрузке студентов:', error);
    } finally {
      setIsLoadingStudents(false);
    }
  };

  // ✅ Загружаем студентов при монтировании компонента
  useEffect(() => {
    console.log('Компонент загружен, загружаем студентов...');
    loadMyStudents();
  }, []);
  const loadExistingInviteCodes = async () => {
    try {
      setIsLoadingCode(true);
      
      // Получаем только существующие коды
      const existingResponse = await fetch('http://localhost:8000/invites/mine', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (existingResponse.ok) {
        const existingCodes = await existingResponse.json();
        
        // Ищем неиспользованный код
        const activeCode = existingCodes.find(code => !code.used);
        
        if (activeCode) {
          // Используем существующий код
          setInviteCode(activeCode.code);
        } else {
          // НЕ создаем код автоматически, оставляем пустым
          setInviteCode('');
        }
      } else {
        setInviteCode('');
      }
    } catch (error) {
      console.error('Ошибка загрузки кодов:', error);
      setInviteCode('');
    } finally {
      setIsLoadingCode(false);
    }
  };

  // Загружаем существующие коды при открытии модала (БЕЗ автоматического создания)
  useEffect(() => {
    if (showInviteModal) {
      loadExistingInviteCodes();
    }
  }, [showInviteModal]);

  // Функция для создания нового кода (только при клике кнопки)
  const handleGenerateNewCode = async () => {
    try {
      setIsLoadingCode(true);
      const response = await fetch('http://localhost:8000/invites/create', { 
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const newCode = await response.json();
        setInviteCode(newCode.code);
      } else {
        console.error('Ошибка создания кода:', response.status, response.statusText);
        alert(`Ошибка создания кода: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Ошибка создания кода:', error);
      alert('Ошибка подключения к серверу');
    } finally {
      setIsLoadingCode(false);
    }
  };

  // Получение уникальных значений для фильтров
  const uniqueGrades = [...new Set(students.map(s => s.grade))];
  const uniqueGroups = groups.map(g => g.name);

  // Фильтрация и сортировка студентов
  const filteredStudents = useMemo(() => {
    let filtered = students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                           student.email.toLowerCase().includes(filters.search.toLowerCase());
      const matchesGrade = !filters.grade || student.grade === filters.grade;
      const matchesGroup = !filters.group || student.groups.includes(filters.group);
      const matchesActivity = !filters.activity || checkActivityFilter(student, filters.activity);
      const matchesProgress = !filters.progress || checkProgressFilter(student, filters.progress);
      
      return matchesSearch && matchesGrade && matchesGroup && matchesActivity && matchesProgress;
    });

    // Сортировка
    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  }, [students, filters, sortField, sortDirection]);

  const checkActivityFilter = (student, filter) => {
    const today = new Date();
    const lastActive = new Date(student.lastActive);
    const daysDiff = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));
    
    switch(filter) {
      case 'today': return daysDiff <= 1;
      case 'week': return daysDiff <= 7;
      case 'month': return daysDiff <= 30;
      case 'inactive': return daysDiff > 7;
      default: return true;
    }
  };

  const checkProgressFilter = (student, filter) => {
    switch(filter) {
      case 'excellent': return student.progress >= 90;
      case 'good': return student.progress >= 70 && student.progress < 90;
      case 'average': return student.progress >= 50 && student.progress < 70;
      case 'poor': return student.progress < 50;
      default: return true;
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectStudent = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(s => s.id));
    }
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    const student = {
      id: Date.now(),
      ...newStudent,
      lastActive: new Date().toISOString().split('T')[0],
      progress: 0,
      tasksCompleted: 0
    };
    setStudents(prev => [...prev, student]);
    setNewStudent({ name: '', email: '', grade: '', groups: [] });
    setShowAddForm(false);
  };

  const handleAddGroup = (e) => {
    e.preventDefault();
    const group = {
      id: Date.now(),
      ...newGroup
    };
    setGroups(prev => [...prev, group]);
    setNewGroup({ name: '', color: '#B799FF' });
    setShowGroupForm(false);
  };

  const handleDeleteGroup = (groupId) => {
    const groupName = groups.find(g => g.id === groupId)?.name;
    if (window.confirm(`Удалить группу "${groupName}"? Студенты останутся, но будут исключены из группы.`)) {
      setGroups(prev => prev.filter(g => g.id !== groupId));
      // Удаляем группу у всех студентов
      setStudents(prev => prev.map(student => ({
        ...student,
        groups: student.groups.filter(g => g !== groupName)
      })));
    }
  };

  const handleDeleteSelected = () => {
    if (window.confirm(`Удалить выбранных обучающихся (${selectedStudents.length})?`)) {
      setStudents(prev => prev.filter(s => !selectedStudents.includes(s.id)));
      setSelectedStudents([]);
    }
  };
  
  const handleCopyCode = () => {
    if (inviteCode) {
      navigator.clipboard.writeText(inviteCode);
      alert('Код скопирован в буфер обмена!');
    }
  };
  
  const handleCopyLink = () => {
    if (inviteCode) {
      const link = `https://yourplatform.com/join?code=${inviteCode}`;
      navigator.clipboard.writeText(link);
      alert('Ссылка скопирована в буфер обмена!');
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 90) return '#10B981';
    if (progress >= 70) return '#F59E0B';
    if (progress >= 50) return '#EF4444';
    return '#6B7280';
  };

  const getActivityStatus = (lastActive) => {
    const today = new Date();
    const lastActiveDate = new Date(lastActive);
    const daysDiff = Math.floor((today - lastActiveDate) / (1000 * 60 * 60 * 24));
    
    if (daysDiff <= 1) return { text: 'Сегодня', color: '#10B981' };
    if (daysDiff <= 7) return { text: `${daysDiff} дн. назад`, color: '#F59E0B' };
    return { text: `${daysDiff} дн. назад`, color: '#EF4444' };
  };

  const getGroupColor = (groupName) => {
    const group = groups.find(g => g.name === groupName);
    return group?.color || '#B799FF';
  };

  return (
    <div className={styles.container}>
      {/* Внутренние табы */}
      <div className={styles.subTabNavigation}>
        <button
          className={`${styles.subTabButton} ${activeSubTab === 'groups' ? styles.active : ''}`}
          onClick={() => setActiveSubTab('groups')}
          data-tab="groups"
        >
          👥 Группы
        </button>
        <button
          className={`${styles.subTabButton} ${activeSubTab === 'students' ? styles.active : ''}`}
          onClick={() => setActiveSubTab('students')}
          data-tab="students"
        >
          📊 Общий список
        </button>
      </div>

      {/* Модальное окно приглашения */}
      {showInviteModal && (
        <div className={styles.inviteModal}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalHeader}>Пригласить ученика</h2>
            <p className={styles.modalDescription}>
              Отправьте этот код ученику. После входа в систему ученик сможет ввести код и автоматически привязаться к вам как преподавателю.
            </p>
            
            <div className={styles.codeSection}>
              <div className={styles.codeDisplay}>
                {inviteCode ? (
                  inviteCode
                ) : (
                  <div className={styles.noCodeMessage}>
                    <p style={{ color: '#666', marginBottom: '10px' }}>Нет активного кода приглашения</p>
                    <button 
                      className={styles.newCodeBtn}
                      onClick={handleGenerateNewCode}
                      disabled={isLoadingCode}
                      style={{ marginBottom: '0' }}
                    >
                      {isLoadingCode ? 'Создание...' : 'Создать код'}
                    </button>
                  </div>
                )}
              </div>
              {inviteCode && (
                <div className={styles.codeActions}>
                  <button
                    className={styles.copyCodeBtn}
                    onClick={handleCopyCode}
                    disabled={!inviteCode || isLoadingCode}
                  >
                    Копировать код
                  </button>
                  <button
                    className={styles.newCodeBtn}
                    onClick={handleGenerateNewCode}
                    disabled={isLoadingCode}
                  >
                    {isLoadingCode ? 'Создание...' : 'Новый код'}
                  </button>
                </div>
              )}
            </div>
            
            <div className={styles.groupSelectWrapper}>
              <label className={styles.groupSelectLabel}>
                Добавить в группу (опционально):
              </label>
              <select
                className={styles.groupSelectDropdown}
                value={selectedGroupForInvite}
                onChange={(e) => setSelectedGroupForInvite(e.target.value)}
              >
                <option value="">Без группы</option>
                {uniqueGroups.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
            
            <div className={styles.linkSection}>
              <p className={styles.linkHint}>
                💡 Или отправьте ссылку-приглашение:
              </p>
              <button
                className={styles.copyLinkBtn}
                onClick={handleCopyLink}
                disabled={!inviteCode || isLoadingCode}
              >
                🔗 Скопировать ссылку
              </button>
            </div>
            
            <div className={styles.warningBox}>
              <p>
                ⚠️ Код действителен в течение 7 дней. После привязки ученика код станет недействительным.
              </p>
            </div>
            
            <div className={styles.modalActions}>
              <button
                className={styles.closeModalBtn}
                onClick={() => setShowInviteModal(false)}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Контент в зависимости от активного таба */}
      {activeSubTab === 'groups' && (
        <div className={styles.groupsTab}>
          {/* Управление группами */}
          <div className={styles.groupsSection}>
            <div className={styles.groupsHeader}>
              <h2>Управление группами</h2>
              <div className={styles.groupActions}>
                <button 
                  className={styles.manageGroupsBtn} 
                  onClick={() => setShowGroupManager(!showGroupManager)}
                >
                  {showGroupManager ? 'Готово' : 'Редактировать'}
                </button>
                <button 
                  className={styles.addGroupBtn}
                  onClick={() => setShowGroupForm(!showGroupForm)}
                >
                  ➕ Создать группу
                </button>
              </div>
            </div>
            
            {/* Сетка групп */}
            <div className={styles.groupsGrid}>
              {groups.map(group => {
                const studentCount = students.filter(s => s.groups.includes(group.name)).length;
                return (
                  <div key={group.id} className={styles.groupCard} style={{ borderColor: group.color }}>
                    <div className={styles.groupIcon} style={{ backgroundColor: group.color }}>
                      👥
                    </div>
                    <div className={styles.groupInfo}>
                      <div className={styles.groupName}>{group.name}</div>
                      <div className={styles.groupCount}>{studentCount} студентов</div>
                    </div>
                    {showGroupManager && (
                      <button 
                        className={styles.deleteGroupBtn}
                        onClick={() => handleDeleteGroup(group.id)}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Форма создания группы */}
            {showGroupForm && (
              <div className={styles.groupForm}>
                <h3>Создать новую группу</h3>
                <form onSubmit={handleAddGroup} className={styles.form}>
                  <div className={styles.formRow}>
                    <input
                      type="text"
                      placeholder="Название группы"
                      value={newGroup.name}
                      onChange={(e) => setNewGroup(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                    <div className={styles.colorPicker}>
                      <label>Цвет:</label>
                      <input
                        type="color"
                        value={newGroup.color}
                        onChange={(e) => setNewGroup(prev => ({ ...prev, color: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className={styles.formActions}>
                    <button type="button" onClick={() => setShowGroupForm(false)} className={styles.cancelBtn}>
                      Отмена
                    </button>
                    <button type="submit" className={styles.saveBtn}>
                      Создать
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {activeSubTab === 'students' && (
        <div className={styles.studentsTab}>
          {/* Фильтры и действия */}
          <div className={styles.filtersSection}>
            <div className={styles.filtersRow}>
              <div className={styles.searchBox}>
                <input
                  type="text"
                  placeholder="🔍 Поиск по имени или email..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className={styles.searchInput}
                />
              </div>
              
              <select
                value={filters.grade}
                onChange={(e) => setFilters(prev => ({ ...prev, grade: e.target.value }))}
                className={styles.filterSelect}
              >
                <option value="">Все классы</option>
                {uniqueGrades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>

              <select
                value={filters.group}
                onChange={(e) => setFilters(prev => ({ ...prev, group: e.target.value }))}
                className={styles.filterSelect}
              >
                <option value="">Все группы</option>
                {uniqueGroups.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>

              <select
                value={filters.activity}
                onChange={(e) => setFilters(prev => ({ ...prev, activity: e.target.value }))}
                className={styles.filterSelect}
              >
                <option value="">Вся активность</option>
                <option value="today">Сегодня</option>
                <option value="week">На этой неделе</option>
                <option value="month">В этом месяце</option>
                <option value="inactive">Неактивные</option>
              </select>

              <select
                value={filters.progress}
                onChange={(e) => setFilters(prev => ({ ...prev, progress: e.target.value }))}
                className={styles.filterSelect}
              >
                <option value="">Весь прогресс</option>
                <option value="excellent">Отлично (90%+)</option>
                <option value="good">Хорошо (70-89%)</option>
                <option value="average">Средне (50-69%)</option>
                <option value="poor">Плохо (&lt;50%)</option>
              </select>
            </div>

            <div className={styles.actionsRow}>
              <button 
                className={styles.inviteBtn}
                onClick={() => setShowInviteModal(true)}
              >
                ✉️ Пригласить ученика
              </button>
              
              <button 
                className={styles.addBtn}
                onClick={() => setShowAddForm(!showAddForm)}
              >
                ➕ Добавить вручную
              </button>
              
              {selectedStudents.length > 0 && (
                <>
                  <button className={styles.deleteBtn} onClick={handleDeleteSelected}>
                    🗑 Удалить ({selectedStudents.length})
                  </button>
                  <button className={styles.exportBtn}>
                    📤 Экспорт
                  </button>
                </>
              )}
              
              <button className={styles.importBtn}>
                📥 Импорт
              </button>
            </div>
          </div>

          {/* Компактная форма добавления студента */}
          {showAddForm && (
            <div className={styles.addForm}>
              <h3>Добавить нового ученика</h3>
              <form onSubmit={handleAddStudent} className={styles.compactForm}>
                <div className={styles.inputsRow}>
                  <input
                    type="text"
                    placeholder="Имя ученика"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className={styles.compactInput}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className={styles.compactInput}
                  />
                  <input
                    type="text"
                    placeholder="Класс (10А)"
                    value={newStudent.grade}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, grade: e.target.value }))}
                    required
                    className={styles.compactInput}
                  />
                  <select
                    multiple
                    value={newStudent.groups}
                    onChange={(e) => setNewStudent(prev => ({ 
                      ...prev, 
                      groups: Array.from(e.target.selectedOptions, option => option.value)
                    }))}
                    className={styles.compactSelect}
                    title="Удерживайте Ctrl для выбора нескольких групп"
                  >
                    {uniqueGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                  <div className={styles.compactActions}>
                    <button type="button" onClick={() => setShowAddForm(false)} className={styles.compactCancelBtn}>
                      Отмена
                    </button>
                    <button type="submit" className={styles.compactSaveBtn}>
                      Добавить
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Таблица студентов */}
          <div className={styles.tableContainer}>
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
                  <th onClick={() => handleSort('name')} className={styles.sortable}>
                    Имя {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('email')} className={styles.sortable}>
                    Email {sortField === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('grade')} className={styles.sortable}>
                    Класс {sortField === 'grade' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th>Группы</th>
                  <th onClick={() => handleSort('progress')} className={styles.sortable}>
                    Прогресс {sortField === 'progress' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('tasksCompleted')} className={styles.sortable}>
                    Задания {sortField === 'tasksCompleted' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('lastActive')} className={styles.sortable}>
                    Активность {sortField === 'lastActive' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(student => {
                  const activityStatus = getActivityStatus(student.lastActive);
                  return (
                    <tr key={student.id} className={styles.tableRow}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => handleSelectStudent(student.id)}
                        />
                      </td>
                      <td>
                        <div className={styles.studentName}>
                          <div className={styles.avatar}>👨‍🎓</div>
                          <span>{student.name}</span>
                        </div>
                      </td>
                      <td className={styles.email}>{student.email}</td>
                      <td>
                        <span className={styles.gradeBadge}>{student.grade}</span>
                      </td>
                      <td>
                        <div className={styles.groupsBadges}>
                          {student.groups.map((group, index) => (
                            <span 
                              key={index} 
                              className={styles.groupBadge}
                              style={{ backgroundColor: getGroupColor(group) }}
                            >
                              {group}
                            </span>
                          ))}
                          {student.groups.length === 0 && (
                            <span className={styles.noGroup}>Без группы</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className={styles.progressContainer}>
                          <div className={styles.progressBar}>
                            <div 
                              className={styles.progressFill}
                              style={{ 
                                width: `${student.progress}%`,
                                backgroundColor: getProgressColor(student.progress)
                              }}
                            />
                          </div>
                          <span className={styles.progressText}>{student.progress}%</span>
                        </div>
                      </td>
                      <td>
                        <span className={styles.tasksCount}>{student.tasksCompleted}</span>
                      </td>
                      <td>
                        <span 
                          className={styles.activityStatus}
                          style={{ color: activityStatus.color }}
                        >
                          {activityStatus.text}
                        </span>
                      </td>
                      <td>
                        <div className={styles.actions}>
                          <button className={styles.viewBtn} title="Посмотреть профиль">
                            👁
                          </button>
                          <button className={styles.editBtn} title="Редактировать">
                            ✏️
                          </button>
                          <button className={styles.deleteBtn} title="Удалить">
                            🗑
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredStudents.length === 0 && (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>👨‍🎓</div>
                <h3>Ученики не найдены</h3>
                <p>Измените фильтры или добавьте новых учеников</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudents;