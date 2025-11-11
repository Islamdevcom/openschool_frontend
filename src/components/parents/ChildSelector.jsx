import React from 'react';
import styles from './ChildSelector.module.css';

const ChildSelector = ({ children, currentChild, onChildSelect }) => {
  return (
    <div className={styles.childSelector}>
      {children.map((child, index) => (
        <div
          key={index}
          className={`${styles.childCard} ${currentChild === index ? styles.active : ''}`}
          onClick={() => onChildSelect(index)}
        >
          <div className={styles.childAvatar}>{child.avatar}</div>
          <div>{child.name}</div>
          <small>{child.grade}</small>
        </div>
      ))}
    </div>
  );
};

export default ChildSelector;