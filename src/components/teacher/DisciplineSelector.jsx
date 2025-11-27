import React, { useEffect } from 'react';
import { useSubjects } from '../../context/SubjectsContext';
import { useAuth } from '../../context/AuthContext';
import './DisciplineSelector.css';

function DisciplineSelector({ selectedDiscipline, setSelectedDiscipline }) {
    const { teacherDisciplines, loadMyDisciplines, isLoading } = useSubjects();
    const { token, role } = useAuth();

    // Загрузить дисциплины при монтировании
    useEffect(() => {
        if (token && role === 'teacher') {
            loadMyDisciplines();
        }
    }, [token, role, loadMyDisciplines]);

    // Если пользователь не авторизован, не показываем селектор
    if (!token || role !== 'teacher') {
        return (
            <div className="discipline-selector" data-discipline-selector>
                <select className="discipline-select" disabled>
                    <option>Войдите в систему</option>
                </select>
            </div>
        );
    }

    const handleDisciplineChange = (e) => {
        const newDisciplineId = e.target.value;

        // Валидация: проверяем что выбранная дисциплина есть в списке закрепленных
        const isValid = teacherDisciplines.some(d => d.id === newDisciplineId);

        if (isValid) {
            setSelectedDiscipline(newDisciplineId);

            // Находим полную информацию о дисциплине для логирования
            const discipline = teacherDisciplines.find(d => d.id === newDisciplineId);
            console.log('✅ Дисциплина успешно изменена:', discipline);
        } else {
            console.error('❌ Ошибка: недопустимая дисциплина:', newDisciplineId);
        }
    };

    // Показываем загрузку
    if (isLoading) {
        return (
            <div className="discipline-selector" data-discipline-selector>
                <select className="discipline-select" disabled>
                    <option>Загрузка...</option>
                </select>
            </div>
        );
    }

    // Если нет назначенных предметов, показываем заглушку
    if (teacherDisciplines.length === 0) {
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
                {teacherDisciplines.map(discipline => (
                    <option key={discipline.id} value={discipline.id}>
                        {discipline.displayName}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default DisciplineSelector;