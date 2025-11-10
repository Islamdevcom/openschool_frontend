import React, { useState, useEffect } from 'react';
import styles from './TeacherApp.module.css';
import Header from '../../components/teacher/Header';
import Navigation from '../../components/teacher/Navigation';
import ToolsGrid from '../../components/teacher/ToolsGrid';
import Overlay from '../../components/teacher/Overlay';
import TeacherProfileModal from '../../components/teacher/TeacherProfileModal';
import StudentModal from '../../components/teacher/StudentModal';
import SettingsModal from '../../components/teacher/SettingsModal';
import AnalyticsModal from '../../components/teacher/AnalyticsModal';
import HelpModal from '../../components/teacher/HelpModal';
import ManageStudents from '../../components/teacher/ManageStudents';
import TeacherJournals from '../../components/teacher/TeacherJournals';
import { useAuth } from '../../context/AuthContext';
import { ASSIGNED_DISCIPLINES } from '../../components/teacher/DisciplineSelector';
import useDisciplineData from '../../hooks/useDisciplineData';

// Функция для загрузки последней выбранной дисциплины
const loadLastDiscipline = () => {
  try {
    const saved = localStorage.getItem('teacher_selected_discipline');
    // Проверяем что сохраненная дисциплина есть в списке закрепленных
    const isValid = ASSIGNED_DISCIPLINES.some(d => d.id === saved);
    if (saved && isValid) {
      return saved;
    }
  } catch (error) {
    console.error('Error loading discipline from localStorage:', error);
  }
  // Возвращаем первую дисциплину из списка закрепленных
  return ASSIGNED_DISCIPLINES[0]?.id || 'physics-7';
};

// Функция для сохранения дисциплины в localStorage
const saveDiscipline = (disciplineId) => {
  try {
    // Проверяем что дисциплина есть в списке закрепленных
    const isValid = ASSIGNED_DISCIPLINES.some(d => d.id === disciplineId);
    if (isValid) {
      localStorage.setItem('teacher_selected_discipline', disciplineId);

      // Сохранение истории выбора
      const history = loadDisciplineHistory();
      const timestamp = new Date().toISOString();
      const discipline = ASSIGNED_DISCIPLINES.find(d => d.id === disciplineId);
      const newEntry = {
        disciplineId,
        subject: discipline?.subject,
        grade: discipline?.grade,
        timestamp
      };

      // Добавляем новую запись в начало и ограничиваем историю 50 записями
      const updatedHistory = [newEntry, ...history.filter(h => h.disciplineId !== disciplineId)].slice(0, 50);
      localStorage.setItem('teacher_discipline_history', JSON.stringify(updatedHistory));
    }
  } catch (error) {
    console.error('Error saving discipline to localStorage:', error);
  }
};

// Функция для загрузки истории выбора дисциплин
const loadDisciplineHistory = () => {
  try {
    const history = localStorage.getItem('teacher_discipline_history');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error loading discipline history:', error);
    return [];
  }
};

// Функция для получения названия предмета по disciplineId
const getDisciplineName = (disciplineId) => {
  const discipline = ASSIGNED_DISCIPLINES.find(d => d.id === disciplineId);
  return discipline?.displayName || 'Физика - 7 класс';
};

function TeacherApp() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Все');
  const [selectedLanguage, setSelectedLanguage] = useState('ru');
  const [selectedDiscipline, setSelectedDiscipline] = useState(loadLastDiscipline());

  // Главные табы навигации
  const [mainTab, setMainTab] = useState('home');

  // Подключаем хук для управления данными дисциплины
  const {
    disciplineData,
    isLoading,
    updateAIPrompts,
    updateChatSessions,
    updateGroups,
    updateStudents,
    updateJournal,
    clearChatHistory,
    updateFAQCache,
    reloadData
  } = useDisciplineData(selectedDiscipline);

  // Сохранение выбранной дисциплины при изменении
  useEffect(() => {
    saveDiscipline(selectedDiscipline);
    const currentDiscipline = ASSIGNED_DISCIPLINES.find(d => d.id === selectedDiscipline);
    console.log('✅ Дисциплина изменена:', currentDiscipline);
    console.log('📚 История выбора:', loadDisciplineHistory());

    // Показываем уведомление о смене контекста
    console.log(`🔄 Контекст изменен: ${currentDiscipline?.displayName}`);
    console.log('📊 Загруженные данные дисциплины:', disciplineData);
  }, [selectedDiscipline, disciplineData]);

  // Модалки
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const { logout, userInfo } = useAuth();

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const closeAllModals = () => {
    setShowProfileModal(false);
    setShowStudentModal(false);
    setShowSettingsModal(false);
    setShowAnalyticsModal(false);
    setShowHelpModal(false);
    setIsProfileDropdownOpen(false);
  };

  // Функции открытия модальных окон с закрытием dropdown
  const handleOpenProfileModal = () => {
    setIsProfileDropdownOpen(false);
    setShowProfileModal(true);
  };

  const handleOpenStudentModal = () => {
    setIsProfileDropdownOpen(false);
    setShowStudentModal(true);
  };

  const handleOpenSettingsModal = () => {
    setIsProfileDropdownOpen(false);
    setShowSettingsModal(true);
  };

  const handleOpenAnalyticsModal = () => {
    setIsProfileDropdownOpen(false);
    setShowAnalyticsModal(true);
  };

  const handleOpenHelpModal = () => {
    setIsProfileDropdownOpen(false);
    setShowHelpModal(true);
  };

  return (
    <div className={styles.TeacherApp}>
      {/* Overlay только для ProfileDropdown, модалки имеют свой overlay */}
      <Overlay
        isActive={isProfileDropdownOpen}
        onClick={() => setIsProfileDropdownOpen(false)}
      />

      <div className={styles.container}>
        <Header
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          selectedDiscipline={selectedDiscipline}
          setSelectedDiscipline={setSelectedDiscipline}
          isProfileDropdownOpen={isProfileDropdownOpen}
          toggleProfileDropdown={toggleProfileDropdown}
          closeProfileDropdown={() => setIsProfileDropdownOpen(false)}
          openProfileModal={handleOpenProfileModal}
          openStudentModal={handleOpenStudentModal}
          openSettingsModal={handleOpenSettingsModal}
          openAnalyticsModal={handleOpenAnalyticsModal}
          openHelpModal={handleOpenHelpModal}
          // Передаем пропсы для главных табов
          mainTab={mainTab}
          setMainTab={setMainTab}
          // Передаем пропсы для ChatPreview
          teacherSubject={getDisciplineName(selectedDiscipline)}
          disciplineId={selectedDiscipline}
          chatSessions={disciplineData?.chatSessions || {}}
          onUpdateSessions={updateChatSessions}
          faqCache={disciplineData?.faqCache || []}
          onUpdateFAQCache={updateFAQCache}
        />

        {/* Navigation отображается только на главной странице */}
        {mainTab === 'home' && (
          <Navigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}

        {/* Условный рендеринг контента в зависимости от выбранного таба */}
        {mainTab === 'home' && (
          <ToolsGrid searchTerm={searchTerm} activeTab={activeTab} />
        )}
        
        {mainTab === 'students' && (
          <ManageStudents />
        )}
        
        {mainTab === 'journal' && (
          <TeacherJournals />
        )}
      </div>

      {/* Все модалки рендерятся в конце, чтобы быть поверх всего */}
      <TeacherProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        teacherData={{
          name: userInfo?.full_name,
          email: userInfo?.email
        }}
      />
      <StudentModal
        isOpen={showStudentModal}
        onClose={() => setShowStudentModal(false)}
        teacherSubject={getDisciplineName(selectedDiscipline)}
        disciplineId={selectedDiscipline}
        aiPrompts={disciplineData?.aiPrompts || {}}
        onSavePrompts={updateAIPrompts}
      />
      <SettingsModal isOpen={showSettingsModal} onClose={() => setShowSettingsModal(false)} onLogout={logout} />
      <AnalyticsModal isOpen={showAnalyticsModal} onClose={() => setShowAnalyticsModal(false)} />
      <HelpModal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} />
    </div>
  );
}

export default TeacherApp;