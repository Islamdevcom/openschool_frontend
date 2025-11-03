import React from 'react';
import './DisciplineSelector.css';

// Список допустимых дисциплин (синхронизирован с TeacherApp.jsx)
const VALID_DISCIPLINES = ['math', 'russian', 'physics', 'chemistry', 'biology', 'history', 'geography', 'english', 'informatics', 'literature'];

function DisciplineSelector({ selectedDiscipline, setSelectedDiscipline }) {
    const handleDisciplineChange = (e) => {
        const newDiscipline = e.target.value;

        // Валидация выбранной дисциплины
        if (VALID_DISCIPLINES.includes(newDiscipline)) {
            setSelectedDiscipline(newDiscipline);
            console.log('✅ Дисциплина успешно изменена:', newDiscipline);
        } else {
            console.error('❌ Ошибка: недопустимая дисциплина:', newDiscipline);
        }
    };

    return (
        <div className="discipline-selector">
            <select
                className="discipline-select"
                value={selectedDiscipline}
                onChange={handleDisciplineChange}
            >
                <option value="math">Математика</option>
                <option value="russian">Русский язык</option>
                <option value="physics">Физика</option>
                <option value="chemistry">Химия</option>
                <option value="biology">Биология</option>
                <option value="literature">Литература</option>
                <option value="history">История</option>
                <option value="geography">География</option>
                <option value="english">Английский язык</option>
                <option value="informatics">Информатика</option>
            </select>
        </div>
    );
}

export default DisciplineSelector;