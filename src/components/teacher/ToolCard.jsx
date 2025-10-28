import React from 'react';
import './ToolCard.css';

function ToolCard({ icon, title, description, index }) {
    const handleClick = (e) => {
        e.currentTarget.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.currentTarget.style.transform = '';
        }, 150);
        console.log(`Tool clicked: ${title}`);
    };

    return (
        <div
            className="tool-card"
            onClick={handleClick}
            style={{ '--card-index': index }}
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