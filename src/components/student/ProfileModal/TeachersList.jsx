import React, { useState, useEffect } from 'react';
import styles from './TeachersList.module.css';

function TeachersList() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    
    // ✅ Заменяем статичные данные на состояние для загрузки из API
    const [teachers, setTeachers] = useState([]);
    const [myTeachers, setMyTeachers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    // ✅ Функция для загрузки моих преподавателей
    const loadMyTeachers = async () => {
        try {
            const response = await fetch('http://localhost:8000/invites/my-teachers', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const teachersData = await response.json();
                console.log('Загружены мои преподаватели:', teachersData);
                
                // Преобразуем данные из API в формат компонента
                const formattedTeachers = teachersData.map(teacher => ({
                    id: teacher.id,
                    name: teacher.name,
                    avatar: teacher.name.split(' ').map(n => n[0]).join(''), // Инициалы
                    subject: teacher.subject || 'Не указан',
                    specialization: [],
                    rating: 5.0, // пока статично
                    studentsCount: 0, // пока статично
                    experience: 0, // пока статично
                    education: 'Не указано',
                    achievements: [],
                    isMyTeacher: true,
                    nextLesson: null,
                    status: 'online'
                }));
                
                setMyTeachers(formattedTeachers);
            } else {
                console.error('Ошибка загрузки преподавателей:', response.status);
            }
        } catch (error) {
            console.error('Ошибка подключения:', error);
        }
    };
    
    // ✅ Загружаем данные при монтировании компонента
    useEffect(() => {
        setIsLoading(true);
        loadMyTeachers().finally(() => setIsLoading(false));
    }, []);

    const subjects = ['all', 'Математика', 'Физика', 'Химия', 'Биология', 'История'];
    
    // ✅ Используем реальных преподавателей вместо статичных
    const allTeachers = [...myTeachers, ...teachers];
    
    const filteredTeachers = allTeachers
        .filter(teacher => {
            const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                teacher.subject.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesSubject = selectedSubject === 'all' || teacher.subject === selectedSubject;
            return matchesSearch && matchesSubject;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'rating':
                    return b.rating - a.rating;
                case 'students':
                    return b.studentsCount - a.studentsCount;
                case 'experience':
                    return b.experience - a.experience;
                default:
                    return a.name.localeCompare(b.name);
            }
        });

    const myTeachersFiltered = filteredTeachers.filter(teacher => teacher.isMyTeacher);
    const availableTeachers = filteredTeachers.filter(teacher => !teacher.isMyTeacher);

    const getSubjectColor = (subject) => {
        const colors = {
            'Математика': '#3B82F6',
            'Физика': '#8B5CF6',
            'Химия': '#06B6D4',
            'Биология': '#10B981',
            'История': '#F59E0B',
            'Не указан': '#6B7280'
        };
        return colors[subject] || '#6B7280';
    };

    const getStatusColor = (status) => {
        const colors = {
            'online': '#10B981',
            'busy': '#F59E0B',
            'offline': '#6B7280'
        };
        return colors[status] || '#6B7280';
    };

    const getStatusText = (status) => {
        const texts = {
            'online': 'В сети',
            'busy': 'Занят',
            'offline': 'Не в сети'
        };
        return texts[status] || 'Неизвестно';
    };

    const formatNextLesson = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        if (date.toDateString() === now.toDateString()) {
            return `Сегодня в ${date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return `Завтра в ${date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;
        } else {
            return date.toLocaleDateString('ru-RU', { 
                day: 'numeric', 
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    };

    // ✅ Показываем загрузку
    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.loadingState}>
                    <div className={styles.loadingSpinner}>Загрузка...</div>
                    <p>Загружаем список преподавателей...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Список преподавателей</h2>
                <p className={styles.subtitle}>Ваши текущие преподаватели и доступные специалисты</p>
            </div>

            {/* Фильтры и поиск */}
            <div className={styles.controls}>
                <div className={styles.searchContainer}>
                    <span className={styles.searchIcon}>🔍</span>
                    <input
                        type="text"
                        placeholder="Поиск по имени или предмету..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
                
                <div className={styles.filters}>
                    <select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className={styles.select}
                    >
                        <option value="all">Все предметы</option>
                        {subjects.slice(1).map(subject => (
                            <option key={subject} value={subject}>{subject}</option>
                        ))}
                    </select>
                    
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className={styles.select}
                    >
                        <option value="name">По имени</option>
                        <option value="rating">По рейтингу</option>
                        <option value="students">По количеству учеников</option>
                        <option value="experience">По стажу</option>
                    </select>
                </div>
            </div>

            <div className={styles.content}>
                {/* Мои преподаватели */}
                {myTeachersFiltered.length > 0 && (
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>
                            <span className={styles.sectionIcon}>👨‍🎓</span>
                            Мои преподаватели ({myTeachersFiltered.length})
                        </h3>
                        
                        <div className={styles.teachersList}>
                            {myTeachersFiltered.map(teacher => (
                                <div key={teacher.id} className={`${styles.teacherCard} ${styles.myTeacher}`}>
                                    <div className={styles.teacherHeader}>
                                        <div className={styles.teacherInfo}>
                                            <div 
                                                className={styles.teacherAvatar}
                                                style={{ background: getSubjectColor(teacher.subject) }}
                                            >
                                                {teacher.avatar}
                                            </div>
                                            <div className={styles.teacherDetails}>
                                                <h4 className={styles.teacherName}>{teacher.name}</h4>
                                                <p className={styles.teacherSubject}>{teacher.subject}</p>
                                                <div className={styles.teacherStatus}>
                                                    <span 
                                                        className={styles.statusDot}
                                                        style={{ background: getStatusColor(teacher.status) }}
                                                    ></span>
                                                    <span className={styles.statusText}>
                                                        {getStatusText(teacher.status)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className={styles.teacherRating}>
                                            <span className={styles.ratingIcon}>⭐</span>
                                            <span className={styles.ratingValue}>{teacher.rating}</span>
                                        </div>
                                    </div>

                                    {teacher.nextLesson && (
                                        <div className={styles.nextLesson}>
                                            <span className={styles.lessonIcon}>📅</span>
                                            <span>Следующий урок: {formatNextLesson(teacher.nextLesson)}</span>
                                        </div>
                                    )}

                                    <div className={styles.teacherStats}>
                                        <div className={styles.stat}>
                                            <span className={styles.statIcon}>👥</span>
                                            <span>{teacher.studentsCount} учеников</span>
                                        </div>
                                        <div className={styles.stat}>
                                            <span className={styles.statIcon}>⏳</span>
                                            <span>{teacher.experience} лет опыта</span>
                                        </div>
                                        <div className={styles.stat}>
                                            <span className={styles.statIcon}>🎓</span>
                                            <span>{teacher.education}</span>
                                        </div>
                                    </div>

                                    <div className={styles.specializations}>
                                        {teacher.specialization.length > 0 ? teacher.specialization.map((spec, index) => (
                                            <span 
                                                key={index} 
                                                className={styles.specializationTag}
                                                style={{ borderColor: getSubjectColor(teacher.subject) }}
                                            >
                                                {spec}
                                            </span>
                                        )) : (
                                            <span className={styles.noSpecialization}>Специализация не указана</span>
                                        )}
                                    </div>

                                    <div className={styles.teacherActions}>
                                        <button className={styles.primaryAction}>
                                            <span>💬</span>
                                            Написать сообщение
                                        </button>
                                        <button className={styles.secondaryAction}>
                                            <span>📊</span>
                                            Мои оценки
                                        </button>
                                        <button className={styles.secondaryAction}>
                                            <span>📅</span>
                                            Расписание
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Сообщение если нет преподавателей */}
                {myTeachersFiltered.length === 0 && !isLoading && (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>👨‍🎓</div>
                        <h3 className={styles.emptyTitle}>Нет привязанных преподавателей</h3>
                        <p className={styles.emptyDescription}>
                            Используйте код приглашения в разделе "Подключения и действия" чтобы присоединиться к преподавателю
                        </p>
                    </div>
                )}

                {/* Доступные преподаватели - пока скрываем, так как нет API для них */}
                {availableTeachers.length > 0 && (
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>
                            <span className={styles.sectionIcon}>🔍</span>
                            Доступные преподаватели ({availableTeachers.length})
                        </h3>
                        <p>Функция поиска доступных преподавателей будет добавлена позже</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TeachersList;