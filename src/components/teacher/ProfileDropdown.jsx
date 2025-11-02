import React, { useEffect, useRef } from 'react';
import './ProfileDropdown.css';

function ProfileDropdown({
  isOpen,
  onClose,
  openProfileModal,
  openStudentModal,
  openSettingsModal,
  openAnalyticsModal,
  openHelpModal
}) {
  const dropdownRef = useRef(null);

  const menuItems = [
    { icon: '👤', text: 'Мой профиль', action: openProfileModal },
    { icon: '🤖', text: 'Управление AI промптами', action: openStudentModal },
    { icon: '⚙️', text: 'Настройки', action: openSettingsModal },
    { icon: '📊', text: 'Аналитика', action: openAnalyticsModal },
    { icon: '❓', text: 'Помощь', action: openHelpModal }
  ];

  // Закрыть dropdown при клике вне его
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleItemClick = (action) => {
    if (typeof action === 'function') {
      action();
    }
    onClose();
  };

  return (
    <div ref={dropdownRef} className={`profile-dropdown ${isOpen ? 'active' : ''}`}>
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="profile-menu-item"
          onClick={() => handleItemClick(item.action)}
        >
          <span>{item.icon}</span>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
}

export default ProfileDropdown;
