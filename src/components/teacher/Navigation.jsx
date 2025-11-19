import React from 'react';
import './Navigation.css';

function Navigation({ activeTab, setActiveTab, searchTerm, setSearchTerm }) {
    const tabs = ['Все', 'Планирование', 'Создание', 'Поддержка', 'Обучение', 'Студенты'];

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
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
            <input
                type="text"
                className="search-bar"
                placeholder="🔍 Поиск"
                value={searchTerm}
                onChange={handleSearchChange}
            />
        </div>
    );
}

export default Navigation;