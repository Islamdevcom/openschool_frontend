import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = ({ items, activeItem, onItemClick }) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <h1>OpenSchool</h1>
        <p>Панель суперадмина</p>
      </div>
      
      <ul className={styles.navMenu}>
        {items.map((item) => (
          <li key={item.id} className={styles.navItem}>
            <a 
              href="#" 
              className={`${styles.navLink} ${activeItem === item.id ? styles.active : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onItemClick(item.id);
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;