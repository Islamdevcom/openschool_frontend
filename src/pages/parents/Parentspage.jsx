import React, { useState } from 'react';
import styles from './ParentsPage.module.css';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import AIChat from '../../components/AIChat/AIChat';
import ProfileModal from '../../components/ProfileModal/ProfileModal';
import TeacherChatModal from '../../components/TeacherChatModal/TeacherChatModal';

const ParentsPage = () => {
  const [children] = useState([
    {
      name: 'Анна Иванова',
      grade: '8 класс',
      avatar: 'АИ',
      avgGrade: 4.3,
      attendance: 95,
      warnings: 2,
      behavior: 8.5
    },
    {
      name: 'Петр Иванов',
      grade: '5 класс',
      avatar: 'ПИ',
      avgGrade: 3.8,
      attendance: 88,
      warnings: 5,
      behavior: 7.2
    }
  ]);

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