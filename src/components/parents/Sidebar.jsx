import React from 'react';
import styles from './Sidebar.module.css';
import QuickStats from './QuickStats';
import TeacherList from './TeacherList';

const Sidebar = ({ child, onTeacherClick }) => {
  return (
    <div className={styles.sidebar}>
      <div data-quick-stats>
        <QuickStats child={child} />
      </div>
      <div data-teacher-list>
        <TeacherList onTeacherClick={onTeacherClick} />
      </div>
    </div>
  );
};

export default Sidebar;