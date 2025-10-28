import React from 'react';
import './ProfileIcon.css';

function ProfileIcon({ onClick }) {
    const handleClick = (e) => {
        e.stopPropagation();
        onClick();
    };

    return (
        <div className="profile-icon" onClick={handleClick}>
            👤
        </div>
    );
}

export default ProfileIcon;