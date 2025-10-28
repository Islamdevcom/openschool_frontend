import React, { useState } from 'react';
import './GroupsTab.css';

function GroupsTab() {
    const [groups, setGroups] = useState([
        { id: 1, name: 'Группа А', level: 'beginner', students: [1, 4] },
        { id: 2, name: 'Группа Б', level: 'intermediate', students: [2, 5] },
        { id: 3, name: 'Группа В', level: 'advanced', students: [3] }
    ]);

    const [students] = useState([
        { id: 1, name: 'Анна Петрова' },
        { id: 2, name: 'Дмитрий Иванов' },
        { id: 3, name: 'Мария Сидорова' },
        { id: 4, name: 'Алексей Козлов' },
        { id: 5, name: 'Елена Морозова' }
    ]);

    const [formData, setFormData] = useState({
        name: '',
        level: 'beginner'
    });

    const getLevelName = (level) => {
        switch(level) {
            case 'beginner': return 'Начинающий';
            case 'intermediate': return 'Средний';
            case 'advanced': return 'Продвинутый';
            default: return 'Неизвестно';
        }
    };

    const getStudentName = (studentId) => {
        const student = students.find(s => s.id === studentId);
        return student ? student.name : 'Неизвестно';
    };

    const addGroup = () => {
        if (formData.name) {
            const newGroup = {
                id: groups.length + 1,
                name: formData.name,
                level: formData.level,
                students: []
            };

            setGroups([...groups, newGroup]);
            setFormData({ name: '', level: 'beginner' });
        }
    };

    const removeGroup = (groupId) => {
        if (window.confirm('Вы уверены, что хотите удалить эту группу?')) {
            setGroups(groups.filter(g => g.id !== groupId));
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="groups-tab">
            <div className="add-form">
                <h3>Создать группу</h3>
                <div className="form-row">
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Название группы"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                    <select
                        className="form-select"
                        value={formData.level}
                        onChange={(e) => handleInputChange('level', e.target.value)}
                    >
                        <option value="beginner">Начинающий</option>
                        <option value="intermediate">Средний</option>
                        <option value="advanced">Продвинутый</option>
                    </select>
                    <button className="add-btn" onClick={addGroup}>Создать</button>
                </div>
            </div>

            <div className="groups-section">
                {groups.map(group => (
                    <div key={group.id} className="group-card">
                        <div className="group-header">
                            <div className="group-name">{group.name}</div>
                            <div className="group-level">{getLevelName(group.level)}</div>
                        </div>
                        <div className="group-students">
                            {group.students.map(studentId => (
                                <div key={studentId} className="student-tag">
                                    {getStudentName(studentId)}
                                </div>
                            ))}
                            {group.students.length === 0 && (
                                <div className="no-students">Нет учеников в группе</div>
                            )}
                        </div>
                        <div className="group-actions">
                            <button
                                className="action-btn remove"
                                onClick={() => removeGroup(group.id)}
                            >
                                Удалить группу
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GroupsTab;