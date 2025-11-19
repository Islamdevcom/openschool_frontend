import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TeacherList.module.css';

const TeacherList = ({ onTeacherClick }) => {
  const { t } = useTranslation();

  const teachers = [
    { name: 'Петрова А.И.', subject: 'Математика', avatar: 'ПА', unread: 2 },
    { name: 'Сидорова М.П.', subject: 'Русский язык', avatar: 'СМ', unread: 0 },
    { name: 'Козлов В.С.', subject: 'Физика', avatar: 'КВ', unread: 0 },
    { name: 'Федорова Н.А.', subject: 'История', avatar: 'ФН', unread: 1 },
  ];

  return (
    <div className={styles.teacherChatSection}>
      <h3 className={styles.title}>👨‍🏫 {t('parent.teacherList.title')}</h3>
      <div className={styles.teacherList}>
        {teachers.map((teacher, index) => (
          <div
            key={index}
            className={styles.teacherItem}
            onClick={() => onTeacherClick(teacher)}
          >
            <div className={styles.teacherAvatar}>{teacher.avatar}</div>
            <div className={styles.teacherInfo}>
              <div className={styles.teacherName}>{teacher.name}</div>
              <div className={styles.teacherSubject}>{teacher.subject}</div>
            </div>
            {teacher.unread > 0 && (
              <div className={styles.unreadBadge}>{teacher.unread}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherList;