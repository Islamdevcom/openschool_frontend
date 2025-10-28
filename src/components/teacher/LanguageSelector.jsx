import React from 'react';
import './LanguageSelector.css';

function LanguageSelector({ selectedLanguage, setSelectedLanguage }) {
    const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.value);
        console.log('Language changed to:', e.target.value);
    };

    return (
        <div className="language-selector">
            <select
                className="language-select"
                value={selectedLanguage}
                onChange={handleLanguageChange}
            >
                <option value="ru">RU</option>
                <option value="en">EN</option>
                <option value="kz">KZ</option>
            </select>
        </div>
    );
}

export default LanguageSelector;