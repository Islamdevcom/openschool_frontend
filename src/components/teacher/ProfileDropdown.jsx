import React from 'react';
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
  const menuItems = [
    { icon: '👤', text: 'Мой профиль', action: openProfileModal },
    { icon: '👥', text: 'Управление учениками', action: openStudentModal },
    { icon: '⚙️', text: 'Настройки', action: openSettingsModal },
    { icon: '📊', text: 'Аналитика', action: openAnalyticsModal },
    { icon: '❓', text: 'Помощь', action: openHelpModal }
  ];

  const handleItemClick = (action) => {
    if (typeof action === 'function') {
      action();
    }
    onClose();
  };

  return (
    <div className={`profile-dropdown ${isOpen ? 'active' : ''}`}>
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
