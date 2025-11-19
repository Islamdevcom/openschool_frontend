import React, { useState, useEffect } from 'react';
import styles from './ParentsPage.module.css';
import Header from '../../components/parents/Header';
import Sidebar from '../../components/parents/Sidebar';
import AIChat from '../../components/parents/AIChat';
import ProfileModal from '../../components/parents/ProfileModal';
import TeacherChatModal from '../../components/parents/TeacherChatModal';
import OnboardingTour from '../../components/onboarding/OnboardingTour';
import { useOnboarding } from '../../components/onboarding/hooks/useOnboarding';
import { parentTourSteps } from '../../components/onboarding/tours/parentTour.jsx';
import { useAuth } from '../../context/AuthContext';

const ParentsPage = () => {
  const { parentChildren } = useAuth();
  const { runTour, handleTourCallback } = useOnboarding('parent');

  // Функция для генерации аватара из имени
  const getAvatar = (name) => {
    if (!name) return 'У';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return parts[0][0] + parts[1][0];
    }
    return parts[0][0];
  };

  // Используем данные из бэкенда если есть, иначе тестовые
  const mockChildren = [
    {
      id: 1,
      name: 'Анна Иванова',
      grade: '8 класс',
      avatar: 'АИ',
      avgGrade: 4.3,
      attendance: 95,
      warnings: 2,
      behavior: 8.5
    },
    {
      id: 2,
      name: 'Петр Иванов',
      grade: '5 класс',
      avatar: 'ПИ',
      avgGrade: 3.8,
      attendance: 88,
      warnings: 5,
      behavior: 7.2
    }
  ];

  const [children] = useState(() => {
    if (parentChildren && parentChildren.length > 0) {
      // Преобразовать данные из бэкенда в формат компонента
      return parentChildren.map(child => ({
        id: child.id,
        name: child.name,
        grade: child.grade || 'Не указан',
        avatar: getAvatar(child.name),
        avgGrade: child.avgGrade || 0,
        attendance: child.attendance || 0,
        warnings: child.warnings || 0,
        behavior: child.behavior || 0
      }));
    }
    return mockChildren;
  });

  const [currentChild, setCurrentChild] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isTeacherChatOpen, setIsTeacherChatOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const handleChildSelect = (index) => {
    setCurrentChild(index);
  };

  const handleTeacherClick = (teacher) => {
    setSelectedTeacher(teacher);
    setIsTeacherChatOpen(true);
  };

  return (
    <div className={styles.parentsPage}>
      <OnboardingTour
        steps={parentTourSteps}
        run={runTour}
        callback={handleTourCallback}
      />

      <div className={styles.container}>
        <Header
          children={children}
          currentChild={currentChild}
          onChildSelect={handleChildSelect}
          onProfileClick={() => setIsProfileOpen(true)}
        />

        <div className={styles.mainContent}>
          <Sidebar
            child={children[currentChild]}
            onTeacherClick={handleTeacherClick}
          />
          <AIChat childName={children[currentChild].name} />
        </div>
      </div>

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        children={children}
      />

      <TeacherChatModal
        isOpen={isTeacherChatOpen}
        onClose={() => setIsTeacherChatOpen(false)}
        teacher={selectedTeacher}
      />
    </div>
  );
};

export default ParentsPage;