import React, { useState } from 'react';
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

function TeacherApp() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Все');
  const [selectedLanguage, setSelectedLanguage] = useState('ru');
  const [selectedDiscipline, setSelectedDiscipline] = useState('math');

  // Главные табы навигации
  const [mainTab, setMainTab] = useState('home');

  // Маппинг кодов предметов в полные названия
  const disciplineNames = {
    math: 'Математика',
    russian: 'Русский язык',
    physics: 'Физика',
    chemistry: 'Химия',
    biology: 'Биология',
    history: 'История',
    geography: 'География',
    english: 'Английский язык',
    informatics: 'Информатика'
  };

  // Модалки
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const { logout } = useAuth();

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
      <TeacherProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />
      <StudentModal
        isOpen={showStudentModal}
        onClose={() => setShowStudentModal(false)}
        teacherSubject={disciplineNames[selectedDiscipline] || 'Математика'}
      />
      <SettingsModal isOpen={showSettingsModal} onClose={() => setShowSettingsModal(false)} onLogout={logout} />
      <AnalyticsModal isOpen={showAnalyticsModal} onClose={() => setShowAnalyticsModal(false)} />
      <HelpModal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} />
    </div>
  );
}

export default TeacherApp;