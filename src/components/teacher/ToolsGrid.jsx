import React, { useState } from 'react';
import './ToolsGrid.css';
import ToolCard from './ToolCard';
import CategoryModal from './tools/CategoryModal';
import HomeworkCheck from './tools/HomeworkCheck';
import LessonPlan from './tools/LessonPlan';
import { allTools } from './tools/toolsData';

function ToolsGrid({ activeTab }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHomeworkCheckOpen, setIsHomeworkCheckOpen] = useState(false);
    const [isLessonPlanOpen, setIsLessonPlanOpen] = useState(false);

    const tools = allTools;

    const filteredTools = tools.filter(tool => {
        const matchesTab = activeTab === 'Все' || tool.category === activeTab;
        return matchesTab;
    });

    const handleToolClick = (tool) => {
        if (tool.isCategory) {
            // Открываем модалку для категории
            setSelectedCategory(tool);
            setIsModalOpen(true);
        } else if (tool.id === 'homework-check') {
            // Открываем Проверку ДЗ
            setIsHomeworkCheckOpen(true);
        } else {
            // Обычный инструмент - старая логика
            console.log(`Tool clicked: ${tool.title}`);
        }
    };

    // Обработчик клика на инструмент внутри категории
    const handleCategoryToolClick = (tool) => {
        // Закрываем модалку категории
        setIsModalOpen(false);

        // Открываем соответствующий инструмент
        if (tool.id === 'lesson-plan') {
            setIsLessonPlanOpen(true);
        } else {
            console.log(`Category tool clicked: ${tool.title}`);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedCategory(null), 300);
    };

    return (
        <>
            <div className="tools-grid">
                {filteredTools.map((tool, index) => (
                    <ToolCard
                        key={tool.id}
                        icon={tool.icon}
                        title={tool.title}
                        description={tool.description}
                        index={index + 1}
                        onClick={() => handleToolClick(tool)}
                        isCategory={tool.isCategory}
                    />
                ))}
            </div>

            <CategoryModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                category={selectedCategory}
                onToolClick={handleCategoryToolClick}
            />

            <HomeworkCheck
                isOpen={isHomeworkCheckOpen}
                onClose={() => setIsHomeworkCheckOpen(false)}
            />

            <LessonPlan
                isOpen={isLessonPlanOpen}
                onClose={() => setIsLessonPlanOpen(false)}
            />
        </>
    );
}

export default ToolsGrid;