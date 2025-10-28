import React from 'react';
import './DisciplineSelector.css';

function DisciplineSelector({ selectedDiscipline, setSelectedDiscipline }) {
    const handleDisciplineChange = (e) => {
        setSelectedDiscipline(e.target.value);
        console.log('Discipline changed to:', e.target.value);
    };

    return (
        <div className="discipline-selector">
            <select
                className="discipline-select"
                value={selectedDiscipline}
                onChange={handleDisciplineChange}
            >
                <option value="math">Математика</option>
                <option value="physics">Физика</option>
                <option value="chemistry">Химия</option>
                <option value="biology">Биология</option>
                <option value="literature">Литература</option>
                <option value="history">История</option>
                <option value="geography">География</option>
                <option value="english">Английский</option>
            </select>
        </div>
    );
}

export default DisciplineSelector;