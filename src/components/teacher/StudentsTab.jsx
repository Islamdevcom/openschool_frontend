import React, { useState } from 'react';
import './StudentsTab.css';

function StudentsTab() {
    const [students, setStudents] = useState([
        { id: 1, name: 'Анна Петрова', email: 'anna@example.com', group: 'beginner', active: true },
        { id: 2, name: 'Дмитрий Иванов', email: 'dmitry@example.com', group: 'intermediate', active: true },
        { id: 3, name: 'Мария Сидорова', email: 'maria@example.com', group: 'advanced', active: false },
        { id: 4, name: 'Алексей Козлов', email: 'alexey@example.com', group: 'beginner', active: true },
        { id: 5, name: 'Елена Морозова', email: 'elena@example.com', group: 'intermediate', active: true }
    ]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        group: ''
    });

    const getGroupName = (groupLevel) => {
        switch(groupLevel) {
            case 'beginner': return 'Начинающий';
            case 'intermediate': return 'Средний';
            case 'advanced': return 'Продвинутый';
            default: return 'Неизвестно';
        }
    };

    const addStudent = () => {
        if (formData.name && formData.email) {
            const newStudent = {
                id: students.length + 1,
                name: formData.name,
                email: formData.email,
                group: formData.group || 'beginner',
                active: true
            };

            setStudents([...students, newStudent]);
            setFormData({ name: '', email: '', group: '' });
        }
    };

    const toggleStudentAccess = (studentId) => {
        setStudents(students.map(student =>
            student.id === studentId
                ? { ...student, active: !student.active }
                : student
        ));
    };

    const removeStudent = (studentId) => {
        if (window.confirm('Вы уверены, что хотите удалить этого ученика?')) {
            setStudents(students.filter(s => s.id !== studentId));
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="students-tab">
            <div className="add-form">
                <h3>Добавить ученика</h3>
                <div className="form-row">
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Имя ученика"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                    <input
                        type="email"
                        className="form-input"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                    <select
                        className="form-select"
                        value={formData.group}
                        onChange={(e) => handleInputChange('group', e.target.value)}
                    >
                        <option value="">Выберите группу</option>
                        <option value="beginner">Начинающий</option>
                        <option value="intermediate">Средний</option>
                        <option value="advanced">Продвинутый</option>
                    </select>
                    <button className="add-btn" onClick={addStudent}>Добавить</button>
                </div>
            </div>

            <div className="students-grid">
                {students.map(student => (
                    <div key={student.id} className="student-card">
                        <div className="student-info">
                            <div className="student-name">{student.name}</div>
                            <div className={`student-status ${student.active ? 'active' : 'inactive'}`}>
                                {student.active ? 'Активен' : 'Неактивен'}
                            </div>
                        </div>
                        <div className="student-email">{student.email}</div>
                        <div className="student-group">
                            Группа: {getGroupName(student.group)}
                        </div>
                        <div className="student-actions">
                            <button
                                className="action-btn toggle"
                                onClick={() => toggleStudentAccess(student.id)}
                            >
                                {student.active ? 'Закрыть доступ' : 'Открыть доступ'}
                            </button>
                            <button
                                className="action-btn remove"
                                onClick={() => removeStudent(student.id)}
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StudentsTab;