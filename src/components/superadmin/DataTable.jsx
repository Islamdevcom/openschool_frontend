import React from 'react';
import styles from './DataTable.module.css';

const DataTable = ({ data }) => {
  const renderCellContent = (cell) => {
    switch (cell.type) {
      case 'text':
        return (
          <span style={{ color: cell.color || 'inherit' }}>
            {cell.content}
          </span>
        );
      
      case 'code':
        return <code className={styles.tableCode}>{cell.content}</code>;
      
      case 'status':
        return (
          <span 
            className={styles.statusBadge}
            style={{ color: cell.color, fontWeight: 600 }}
          >
            {cell.content}
          </span>
        );
      
      case 'badge':
        return (
          <span 
            className={styles.roleBadge}
            style={{ 
              backgroundColor: cell.color,
              color: cell.color === '#ffc107' ? '#333' : 'white'
            }}
          >
            {cell.content}
          </span>
        );
      
      case 'complex':
        return (
          <div className={styles.complexCell}>
            <div className={styles.cellTitle}>{cell.content.title}</div>
            <div className={styles.cellSubtitle}>{cell.content.subtitle}</div>
          </div>
        );
      
      case 'actions':
        return (
          <div className={styles.actionButtons}>
            {cell.content.map((action, index) => (
              <button 
                key={index}
                className={`${styles.btn} ${styles.actionBtn} ${styles[getActionClass(action)]}`}
                onClick={() => handleAction(action)}
              >
                {getActionIcon(action)}
              </button>
            ))}
          </div>
        );
      
      default:
        return cell.content;
    }
  };

  const getActionClass = (action) => {
    const classes = {
      'edit': 'btnSecondary',
      'toggle': 'btnWarning',
      'delete': 'btnDanger',
      'reset-password': 'btnWarning',
      'demo': 'btnWarning',
      'reply': 'btnPrimary',
      'resolve': 'btnSuccess',
      'view': 'btnSecondary'
    };
    return classes[action] || 'btnSecondary';
  };

  const getActionIcon = (action) => {
    const icons = {
      'edit': '✏️',
      'toggle': '🔄',
      'delete': '❌',
      'reset-password': '🔑',
      'demo': '🧪',
      'reply': '📤',
      'resolve': '✅',
      'view': '👁'
    };
    return icons[action] || '⚙️';
  };

  const handleAction = (action) => {
    console.log(`Action clicked: ${action}`);
    // Здесь можно добавить обработку различных действий
  };

  if (!data || !data.columns || !data.rows) {
    return <div>Нет данных для отображения</div>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {data.columns.map((column, index) => (
              <th key={index} className={styles.th}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row) => (
            <tr key={row.id} className={styles.tr}>
              {row.data.map((cell, cellIndex) => (
                <td key={cellIndex} className={styles.td}>
                  {renderCellContent(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;