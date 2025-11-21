import React from 'react';
import './CategoryModal.css';

function CategoryModal({ isOpen, onClose, category }) {
    if (!isOpen || !category) return null;

    const handleToolClick = (tool) => {
        console.log(`Tool clicked: ${tool.title}`);
        // Здесь будет логика открытия конкретного инструмента
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="category-modal-overlay" onClick={handleOverlayClick}>
            <div className="category-modal" data-category={category.id}>
                {/* Заголовок категории */}
                <div className="category-modal-header">
                    <div className="category-modal-icon">{category.icon}</div>
                    <div className="category-modal-title-section">
                        <h2 className="category-modal-title">{category.title}</h2>
                        <p className="category-modal-description">{category.description}</p>
                    </div>
                    <button className="category-modal-close" onClick={onClose}>
                        ✕
                    </button>
                </div>

                {/* Список инструментов */}
                <div className="category-modal-tools">
                    {category.tools && category.tools.map((tool, index) => (
                        <div
                            key={tool.id}
                            className="category-tool-item"
                            onClick={() => handleToolClick(tool)}
                            style={{ '--tool-index': index }}
                        >
                            <div className="category-tool-icon">{tool.icon}</div>
                            <div className="category-tool-content">
                                <h3 className="category-tool-title">{tool.title}</h3>
                                <p className="category-tool-description">{tool.description}</p>
                            </div>
                            <div className="category-tool-arrow">→</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CategoryModal;
