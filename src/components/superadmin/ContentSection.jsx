import React from 'react';
import SearchInput from './SearchInput';
import styles from './ContentSection.module.css';

const ContentSection = ({ 
  title, 
  children, 
  showAddButton = false, 
  addButtonText = '➕ Добавить',
  onAddClick,
  showSearch = false,
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Поиск...'
}) => {
  return (
    <div className={styles.contentSection}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>{title}</h3>
        {showAddButton && (
          <button className={styles.btnPrimary} onClick={onAddClick}>
            {addButtonText}
          </button>
        )}
      </div>
      
      {showSearch && (
        <SearchInput 
          value={searchValue}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
        />
      )}
      
      <div className={styles.sectionContent}>
        {children}
      </div>
    </div>
  );
};

export default ContentSection;