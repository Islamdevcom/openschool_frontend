import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSelector.css';

function LanguageSelector() {
    const { i18n } = useTranslation();

    const handleLanguageChange = (e) => {
        i18n.changeLanguage(e.target.value);
        console.log('Language changed to:', e.target.value);
    };

    return (
        <div className="language-selector">
            <select
                className="language-select"
                value={i18n.language}
                onChange={handleLanguageChange}
            >
                <option value="ru">🇷🇺</option>
                <option value="kk">🇰🇿</option>
                <option value="en">🇬🇧</option>
            </select>
        </div>
    );
}

export default LanguageSelector;