import React from 'react';
import styles from './Sidebar.module.css';
import QuickStats from '../QuickStats/QuickStats';
import TeacherList from '../TeacherList/TeacherList';

const Sidebar = ({ child, onTeacherClick }) => {
  return (
    <div className={styles.sidebar}>
      <QuickStats child={child} />
      <TeacherList onTeacherClick={onTeacherClick} />
    </div>
  );
};

export default Sidebar;