import React from 'react';
import './ToolsGrid.css';
import ToolCard from './ToolCard';

function ToolsGrid({ searchTerm, activeTab }) {
    const tools = [
        {
            id: 1,
            icon: '📝',
            title: 'План урока',
            description: 'Создавайте структурированные, подробные планы уроков, адаптированные под вашу учебную программу и потребности студентов.',
            category: 'Планирование'
        },
        {
            id: 2,
            icon: '⚖️',
            title: 'Уровень сложности',
            description: 'Регулируйте сложность текста в соответствии с уровнем учащихся.',
            category: 'Создание'
        },
        {
            id: 3,
            icon: '📄',
            title: 'Разбиение текста',
            description: 'Разбивайте сложные тексты на управляемые части для лучшего понимания студентами.',
            category: 'Создание'
        },
        {
            id: 4,
            icon: '📍',
            title: 'Четкие указания',
            description: 'Генерируйте краткие, легко выполнимые инструкции для заданий и активностей.',
            category: 'Планирование'
        },
        {
            id: 5,
            icon: '🎫',
            title: 'Выходной билет',
            description: 'Создавайте быстрые оценки в конце урока для проверки понимания студентами.',
            category: 'Обучение'
        },
        {
            id: 6,
            icon: '🎯',
            title: 'Цели обучения',
            description: 'Разрабатывайте четкие, измеримые цели обучения для направления обучения.',
            category: 'Планирование'
        },
        {
            id: 7,
            icon: '🌍',
            title: 'Реальный контекст',
            description: 'Связывайте темы урока с увлекательными примерами из реальной жизни.',
            category: 'Создание'
        },
        {
            id: 8,
            icon: '✅',
            title: 'Тест с вариантами',
            description: 'Создавайте тесты с множественным выбором по различным темам.',
            category: 'Обучение'
        },
        {
            id: 9,
            icon: '⚙️',
            title: 'Генератор вопросов',
            description: 'Создавайте вопросы для конкретного содержания.',
            category: 'Создание'
        },
        {
            id: 10,
            icon: '💬',
            title: 'Дискуссионные темы',
            description: 'Создавайте увлекательные темы для стимулирования значимых классных дискуссий.',
            category: 'Обучение'
        },
        {
            id: 11,
            icon: '⚓',
            title: 'Зацепка урока',
            description: 'Планируйте увлекательные начала уроков для вовлечения студентов.',
            category: 'Планирование'
        },
        {
            id: 12,
            icon: '🔗',
            title: 'Сделать актуальным',
            description: 'Связывайте содержание урока с жизнью и интересами студентов для повышения вовлеченности.',
            category: 'Поддержка'
        }
    ];

    const filteredTools = tools.filter(tool => {
        const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tool.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTab = activeTab === 'Все' || tool.category === activeTab;
        return matchesSearch && matchesTab;
    });

    return (
        <div className="tools-grid">
            {filteredTools.map((tool) => (
                <ToolCard
                    key={tool.id}
                    icon={tool.icon}
                    title={tool.title}
                    description={tool.description}
                    index={tool.id}
                />
            ))}
        </div>
    );
}

export default ToolsGrid;