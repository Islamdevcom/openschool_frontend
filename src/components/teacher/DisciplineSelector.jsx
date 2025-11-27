import React from 'react';
import { useSubjects } from '../../context/SubjectsContext';
import { useAuth } from '../../context/AuthContext';
import './DisciplineSelector.css';

function DisciplineSelector({ selectedDiscipline, setSelectedDiscipline }) {
    const { getTeacherDisciplines } = useSubjects();
    const { user } = useAuth();

    // Получаем предметы учителя из контекста
    // В будущем: user.email будет приходить с бэкенда после авторизации
    const teacherEmail = user?.email || 'ivanova@school.ru'; // моковый email
    const ASSIGNED_DISCIPLINES = getTeacherDisciplines(teacherEmail);

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

    // Если нет назначенных предметов, показываем заглушку
    if (ASSIGNED_DISCIPLINES.length === 0) {
        return (
            <div className="discipline-selector" data-discipline-selector>
                <select className="discipline-select" disabled>
                    <option>Нет назначенных предметов</option>
                </select>
            </div>
        );
    }

    return (
        <div className="discipline-selector" data-discipline-selector>
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