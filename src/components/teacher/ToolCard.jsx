import React from 'react';
import './ToolCard.css';

function ToolCard({ icon, title, description, index, onClick, isCategory }) {
    const handleClick = (e) => {
        const target = e.currentTarget;
        target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            if (target) {
                target.style.transform = '';
            }
        }, 150);
        if (onClick) {
            onClick();
        }
    };

    return (
        <div
            className={`tool-card ${isCategory ? 'tool-card-category' : ''}`}
            onClick={handleClick}
            style={{ '--card-index': index }}
            data-tool-card
        >
            <div className="tool-icon">
                {icon}
            </div>
            <div className="tool-title">
                {title}
            </div>
            <div className="tool-description">
                {description}
            </div>
        </div>
    );
}

export default ToolCard;