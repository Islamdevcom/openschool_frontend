import React from 'react';
import styles from './SearchInput.module.css';

const SearchInput = ({ value, onChange, placeholder = 'Поиск...' }) => {
  return (
    <div className={styles.searchContainer}>
      <input 
        type="text"
        className={styles.searchInput}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className={styles.searchIcon}>🔍</span>
    </div>
  );
};

export default SearchInput;