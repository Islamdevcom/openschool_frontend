import React, { useState } from 'react';
import styles from './Schedule.module.css';

function Schedule() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedSubject, setSelectedSubject] = useState('all');
    const [selectedTeacher, setSelectedTeacher] = useState('all');

    const subjects = [
        'Все предметы',
        'Математика',
        'Физика',
        'Английский язык',
        'История',
        'Химия',
        'Литература'
    ];

    const teachers = [
        'Все преподаватели',
        'Сидорова А.В.',
        'Козлов И.П.',
        'Иванова М.С.',
        'Петров Д.А.'
    ];

    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    
    const calendarDays = [
        { day: 5, hasEvent: false },
        { day: 6, hasEvent: false },
        { day: 7, hasEvent: true },
        { day: 8, hasEvent: true },
        { day: 9, hasEvent: true, isToday: true },
        { day: 10, hasEvent: false },
        { day: 11, hasEvent: false },
        { day: 12, hasEvent: true },
        { day: 13, hasEvent: false },
        { day: 14, hasEvent: true },
        { day: 15, hasEvent: true },
        { day: 16, hasEvent: false },
        { day: 17, hasEvent: false },
        { day: 18, hasEvent: true }
    ];

    const scheduleData = {
        'Понедельник': [
            { time: '08:30-09:15', subject: 'Математика', teacher: 'Сидорова А.В.', room: 'Каб. 215', type: 'lesson' },
            { time: '09:30-10:15', subject: 'Физика', teacher: 'Козлов И.П.', room: 'Каб. 301', type: 'lesson' },
            { time: '10:30-11:15', subject: 'Английский язык', teacher: 'Иванова М.С.', room: 'Онлайн', type: 'online' },
            { time: '11:30-12:15', subject: 'История', teacher: 'Петров Д.А.', room: 'Каб. 105', type: 'lesson' }
        ],
        'Вторник': [
            { time: '08:30-09:15', subject: 'Литература', teacher: 'Петрова Е.М.', room: 'Каб. 220', type: 'lesson' },
            { time: '09:30-10:15', subject: 'Математика', teacher: 'Сидорова А.В.', room: 'Каб. 215', type: 'lesson' },
            { time: '10:30-11:15', subject: 'Химия', teacher: 'Васильев Н.К.', room: 'Каб. 401', type: 'lab' },
            { time: '11:30-12:15', subject: 'Физика', teacher: 'Козлов И.П.', room: 'Каб. 301', type: 'lesson' }
        ],
        'Среда': [
            { time: '08:30-09:15', subject: 'Английский язык', teacher: 'Иванова М.С.', room: 'Каб. 110', type: 'lesson' },
            { time: '09:30-10:15', subject: 'История', teacher: 'Петров Д.А.', room: 'Каб. 105', type: 'lesson' },
            { time: '10:30-11:15', subject: 'Математика', teacher: 'Сидорова А.В.', room: 'Каб. 215', type: 'control' },
            { time: '11:30-12:15', subject: 'Литература', teacher: 'Петрова Е.М.', room: 'Каб. 220', type: 'lesson' }
        ]
    };

    const selectedDay = 'Понедельник';

    const getEventTypeClass = (type) => {
        switch (type) {
            case 'lesson': return styles.eventLesson;
            case 'online': return styles.eventOnline;
            case 'lab': return styles.eventLab;
            case 'control': return styles.eventControl;
            default: return styles.eventLesson;
        }
    };

    const getEventTypeIcon = (type) => {
        switch (type) {
            case 'lesson': return '📚';
            case 'online': return '💻';
            case 'lab': return '🔬';
            case 'control': return '📝';
            default: return '📚';
        }
    };

    return (
        <div className={styles.scheduleContainer}>
            {/* Календарь */}
            <div className={styles.calendarSection}>
                <div className={styles.calendarHeader}>
                    <h2>📅 Расписание на неделю</h2>
                    <div className={styles.calendarNav}>
                        <button className={styles.calendarBtn}>← Предыдущая</button>
                        <button className={styles.calendarBtn}>Сегодня</button>
                        <button className={styles.calendarBtn}>Следующая →</button>
                    </div>
                </div>
                
                <div className={styles.calendarGrid}>
                    {weekDays.map(day => (
                        <div key={day} className={styles.calendarDayHeader}>{day}</div>
                    ))}
                    
                    {calendarDays.map((dayData, index) => (
                        <div 
                            key={index} 
                            className={`${styles.calendarDay} ${dayData.isToday ? styles.today : ''} ${dayData.hasEvent ? styles.hasEvent : ''}`}
                        >
                            {dayData.day}
                        </div>
                    ))}
                </div>
            </div>

            {/* Фильтры */}
            <div className={styles.filtersSection}>
                <h3>Фильтры</h3>
                <div className={styles.filtersWrapper}>
                    <select 
                        className={styles.filterSelect}
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                    >
                        {subjects.map((subject, index) => (
                            <option key={index} value={index === 0 ? 'all' : subject}>
                                {subject}
                            </option>
                        ))}
                    </select>
                    
                    <select 
                        className={styles.filterSelect}
                        value={selectedTeacher}
                        onChange={(e) => setSelectedTeacher(e.target.value)}
                    >
                        {teachers.map((teacher, index) => (
                            <option key={index} value={index === 0 ? 'all' : teacher}>
                                {teacher}
                            </option>
                        ))}
                    </select>
                    
                    <button className={styles.addEventBtn}>
                        📝 Добавить событие
                    </button>
                </div>
            </div>

            {/* Детальное расписание */}
            <div className={styles.detailSchedule}>
                <div className={styles.scheduleHeader}>
                    <h3>Расписание на {selectedDay}</h3>
                    <span className={styles.scheduleDate}>9 августа 2025</span>
                </div>
                
                <div className={styles.eventsList}>
                    {scheduleData[selectedDay]?.map((event, index) => (
                        <div key={index} className={`${styles.eventItem} ${getEventTypeClass(event.type)}`}>
                            <div className={styles.eventTime}>
                                <span className={styles.eventIcon}>{getEventTypeIcon(event.type)}</span>
                                <span>{event.time}</span>
                            </div>
                            
                            <div className={styles.eventDetails}>
                                <h4 className={styles.eventSubject}>{event.subject}</h4>
                                <p className={styles.eventInfo}>
                                    {event.teacher} • {event.room}
                                </p>
                            </div>
                            
                            <div className={styles.eventActions}>
                                <button className={styles.eventActionBtn}>📝</button>
                                <button className={styles.eventActionBtn}>🔗</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Статистика */}
            <div className={styles.statsSection}>
                <h3>Статистика недели</h3>
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>28</div>
                        <div className={styles.statLabel}>Всего уроков</div>
                        <div className={styles.statIcon}>📚</div>
                    </div>
                    
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>6</div>
                        <div className={styles.statLabel}>Онлайн занятий</div>
                        <div className={styles.statIcon}>💻</div>
                    </div>
                    
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>3</div>
                        <div className={styles.statLabel}>Лабораторных</div>
                        <div className={styles.statIcon}>🔬</div>
                    </div>
                    
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>2</div>
                        <div className={styles.statLabel}>Контрольных</div>
                        <div className={styles.statIcon}>📝</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Schedule;