import React from 'react';
import './DisciplineSelector.css';

// Пример закрепленных дисциплин (потом будет приходить с бэкенда)
// В будущем: GET /api/teacher/disciplines
const ASSIGNED_DISCIPLINES = [
    { id: 'physics-7', subject: 'Физика', grade: 7, displayName: 'Физика - 7 класс' },
    { id: 'physics-8', subject: 'Физика', grade: 8, displayName: 'Физика - 8 класс' },
    { id: 'physics-9', subject: 'Физика', grade: 9, displayName: 'Физика - 9 класс' },
    { id: 'math-7', subject: 'Математика', grade: 7, displayName: 'Математика - 7 класс' },
    { id: 'math-8', subject: 'Математика', grade: 8, displayName: 'Математика - 8 класс' },
    { id: 'chemistry-8', subject: 'Химия', grade: 8, displayName: 'Химия - 8 класс' },
    { id: 'chemistry-9', subject: 'Химия', grade: 9, displayName: 'Химия - 9 класс' },
];

function DisciplineSelector({ selectedDiscipline, setSelectedDiscipline }) {
    const handleDisciplineChange = (e) => {
        const newDisciplineId = e.target.value;

        // Валидация: проверяем что выбранная дисциплина есть в списке закрепленных
        const isValid = ASSIGNED_DISCIPLINES.some(d => d.id === newDisciplineId);

        if (isValid) {
            setSelectedDiscipline(newDisciplineId);

            // Находим полную информацию о дисциплине для логирования
            const discipline = ASSIGNED_DISCIPLINES.find(d => d.id === newDisciplineId);
            console.log('✅ Дисциплина успешно изменена:', discipline);
        } else {
            console.error('❌ Ошибка: недопустимая дисциплина:', newDisciplineId);
        }
    };

    return (
        <div className="discipline-selector">
            <select
                className="discipline-select"
                value={selectedDiscipline}
                onChange={handleDisciplineChange}
            >
                {ASSIGNED_DISCIPLINES.map(discipline => (
                    <option key={discipline.id} value={discipline.id}>
                        {discipline.displayName}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default DisciplineSelector;
export { ASSIGNED_DISCIPLINES };