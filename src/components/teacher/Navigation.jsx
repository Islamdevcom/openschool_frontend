import React from 'react';
import './Navigation.css';

function Navigation({ activeTab, setActiveTab }) {
    const tabs = ['Все', 'Планирование', 'Создание', 'Оценивание', 'Обучение', 'Поддержка'];

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="nav">
            <div className="nav-tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`nav-tab ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => handleTabClick(tab)}
                        data-nav-tab={tab}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Navigation;