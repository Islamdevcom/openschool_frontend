import React, { useState } from 'react';
import styles from './MaterialsLibrary.module.css';

function MaterialsLibrary() {
    const [activeTab, setActiveTab] = useState('my');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('all');
    const [selectedType, setSelectedType] = useState('all');

    // Моковые данные материалов
    const materials = [
        {
            id: 1,
            title: 'Интегралы и их применение',
            type: 'pdf',
            subject: 'Математика',
            teacher: 'Иванова М.В.',
            size: '2.4 MB',
            pages: 15,
            downloadCount: 127,
            rating: 4.8,
            addedDate: '2025-08-15',
            description: 'Подробный конспект по теме интегралов с примерами решений',
            tags: ['интегралы', 'математический анализ', 'высшая математика'],
            isFavorite: true,
            isDownloaded: true,
            preview: 'https://example.com/preview1.jpg'
        },
        {
            id: 2,
            title: 'Электродинамика - основы',
            type: 'video',
            subject: 'Физика',
            teacher: 'Петров А.С.',
            duration: '45:30',
            views: 89,
            rating: 4.6,
            addedDate: '2025-08-12',
            description: 'Видеолекция об основах электродинамики и магнитных полях',
            tags: ['электричество', 'магнетизм', 'поля'],
            isFavorite: false,
            isDownloaded: false,
            preview: 'https://example.com/preview2.jpg'
        },
        {
            id: 3,
            title: 'Органическая химия - презентация',
            type: 'presentation',
            subject: 'Химия',
            teacher: 'Смирнова О.И.',
            size: '8.1 MB',
            slides: 42,
            downloadCount: 67,
            rating: 4.9,
            addedDate: '2025-08-10',
            description: 'Интерактивная презентация по органической химии',
            tags: ['органика', 'углеводороды', 'реакции'],
            isFavorite: true,
            isDownloaded: true,
            preview: 'https://example.com/preview3.jpg'
        },
        {
            id: 4,
            title: 'Тестирование по истории России',
            type: 'test',
            subject: 'История',
            teacher: 'Николаев В.П.',
            questionsCount: 25,
            timeLimit: 30,
            attempts: 156,
            rating: 4.3,
            addedDate: '2025-08-08',
            description: 'Тест по истории России 19-20 веков',
            tags: ['Россия', '19 век', '20 век'],
            isFavorite: false,
            isDownloaded: false,
            preview: 'https://example.com/preview4.jpg'
        },
        {
            id: 5,
            title: 'Биология клетки - интерактивный урок',
            type: 'interactive',
            subject: 'Биология',
            teacher: 'Козлова Е.В.',
            duration: '25:15',
            completions: 43,
            rating: 4.7,
            addedDate: '2025-08-05',
            description: 'Интерактивный урок о строении и функциях клетки',
            tags: ['клетка', 'органеллы', 'биология'],
            isFavorite: true,
            isDownloaded: false,
            preview: 'https://example.com/preview5.jpg'
        },
        {
            id: 6,
            title: 'Тригонометрические функции',
            type: 'pdf',
            subject: 'Математика',
            teacher: 'Иванова М.В.',
            size: '1.8 MB',
            pages: 22,
            downloadCount: 89,
            rating: 4.5,
            addedDate: '2025-08-03',
            description: 'Справочник по тригонометрическим функциям с формулами',
            tags: ['тригонометрия', 'функции', 'формулы'],
            isFavorite: false,
            isDownloaded: true,
            preview: 'https://example.com/preview6.jpg'
        }
    ];

    const subjects = ['all', 'Математика', 'Физика', 'Химия', 'История', 'Биология'];
    const types = ['all', 'pdf', 'video', 'presentation', 'test', 'interactive'];

    const myMaterials = materials.filter(m => m.isDownloaded || m.isFavorite);
    const allMaterials = materials;

    const currentMaterials = activeTab === 'my' ? myMaterials : allMaterials;

    const filteredMaterials = currentMaterials.filter(material => {
        const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            material.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesSubject = selectedSubject === 'all' || material.subject === selectedSubject;
        const matchesType = selectedType === 'all' || material.type === selectedType;
        return matchesSearch && matchesSubject && matchesType;
    });

    const getTypeIcon = (type) => {
        const icons = {
            'pdf': '📄',
            'video': '🎥',
            'presentation': '📊',
            'test': '📝',
            'interactive': '🎮'
        };
        return icons[type] || '📄';
    };

    const getTypeLabel = (type) => {
        const labels = {
            'pdf': 'PDF документ',
            'video': 'Видео',
            'presentation': 'Презентация',
            'test': 'Тест',
            'interactive': 'Интерактив'
        };
        return labels[type] || type;
    };

    const getSubjectColor = (subject) => {
        const colors = {
            'Математика': '#3B82F6',
            'Физика': '#8B5CF6',
            'Химия': '#06B6D4',
            'История': '#F59E0B',
            'Биология': '#10B981'
        };
        return colors[subject] || '#6B7280';
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatFileSize = (size) => {
        if (!size) return '';
        return size;
    };

    const formatDuration = (duration) => {
        if (!duration) return '';
        return duration;
    };

    const toggleFavorite = (id) => {
        // В реальном приложении здесь была бы логика обновления избранного
        console.log('Toggle favorite for material', id);
    };

    const downloadMaterial = (id) => {
        // В реальном приложении здесь была бы логика скачивания
        console.log('Download material', id);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Библиотека материалов</h2>
                <p className={styles.subtitle}>Доступ к учебным материалам, конспектам и тестам</p>
            </div>

            {/* Вкладки */}
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'my' ? styles.active : ''}`}
                    onClick={() => setActiveTab('my')}
                >
                    <span className={styles.tabIcon}>⭐</span>
                    <span>Мои материалы</span>
                    <span className={styles.badge}>{myMaterials.length}</span>
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'all' ? styles.active : ''}`}
                    onClick={() => setActiveTab('all')}
                >
                    <span className={styles.tabIcon}>🗂️</span>
                    <span>Все материалы</span>
                    <span className={styles.badge}>{allMaterials.length}</span>
                </button>
            </div>

            {/* Фильтры и поиск */}
            <div className={styles.controls}>
                <div className={styles.searchContainer}>
                    <span className={styles.searchIcon}>🔍</span>
                    <input
                        type="text"
                        placeholder="Поиск материалов..."
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
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className={styles.select}
                    >
                        <option value="all">Все типы</option>
                        {types.slice(1).map(type => (
                            <option key={type} value={type}>{getTypeLabel(type)}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Статистика */}
            <div className={styles.stats}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>📚</div>
                    <div className={styles.statInfo}>
                        <div className={styles.statValue}>{filteredMaterials.length}</div>
                        <div className={styles.statLabel}>Найдено материалов</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>⭐</div>
                    <div className={styles.statInfo}>
                        <div className={styles.statValue}>{myMaterials.filter(m => m.isFavorite).length}</div>
                        <div className={styles.statLabel}>В избранном</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>💾</div>
                    <div className={styles.statInfo}>
                        <div className={styles.statValue}>{myMaterials.filter(m => m.isDownloaded).length}</div>
                        <div className={styles.statLabel}>Загружено</div>
                    </div>
                </div>
            </div>

            {/* Список материалов */}
            <div className={styles.content}>
                {filteredMaterials.length > 0 ? (
                    <div className={styles.materialsList}>
                        {filteredMaterials.map(material => (
                            <div key={material.id} className={styles.materialCard}>
                                <div className={styles.materialHeader}>
                                    <div className={styles.materialInfo}>
                                        <div className={styles.typeIcon}>
                                            {getTypeIcon(material.type)}
                                        </div>
                                        <div className={styles.materialDetails}>
                                            <h3 className={styles.materialTitle}>{material.title}</h3>
                                            <p className={styles.materialDescription}>{material.description}</p>
                                            <div className={styles.materialMeta}>
                                                <span 
                                                    className={styles.subjectTag}
                                                    style={{ background: getSubjectColor(material.subject) }}
                                                >
                                                    {material.subject}
                                                </span>
                                                <span className={styles.typeTag}>
                                                    {getTypeLabel(material.type)}
                                                </span>
                                                <span className={styles.teacherTag}>
                                                    👨‍🎓 {material.teacher}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className={styles.materialActions}>
                                        <button 
                                            className={`${styles.favoriteBtn} ${material.isFavorite ? styles.favorited : ''}`}
                                            onClick={() => toggleFavorite(material.id)}
                                            title={material.isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
                                        >
                                            {material.isFavorite ? '❤️' : '🤍'}
                                        </button>
                                        <div className={styles.rating}>
                                            <span className={styles.ratingIcon}>⭐</span>
                                            <span className={styles.ratingValue}>{material.rating}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.materialStats}>
                                    {material.size && (
                                        <div className={styles.stat}>
                                            <span className={styles.statIcon}>📏</span>
                                            <span>{formatFileSize(material.size)}</span>
                                        </div>
                                    )}
                                    {material.duration && (
                                        <div className={styles.stat}>
                                            <span className={styles.statIcon}>⏱️</span>
                                            <span>{formatDuration(material.duration)}</span>
                                        </div>
                                    )}
                                    {material.pages && (
                                        <div className={styles.stat}>
                                            <span className={styles.statIcon}>📄</span>
                                            <span>{material.pages} стр.</span>
                                        </div>
                                    )}
                                    {material.slides && (
                                        <div className={styles.stat}>
                                            <span className={styles.statIcon}>🎞️</span>
                                            <span>{material.slides} слайдов</span>
                                        </div>
                                    )}
                                    {material.questionsCount && (
                                        <div className={styles.stat}>
                                            <span className={styles.statIcon}>❓</span>
                                            <span>{material.questionsCount} вопросов</span>
                                        </div>
                                    )}
                                    <div className={styles.stat}>
                                        <span className={styles.statIcon}>📅</span>
                                        <span>{formatDate(material.addedDate)}</span>
                                    </div>
                                </div>

                                {material.tags && material.tags.length > 0 && (
                                    <div className={styles.tags}>
                                        {material.tags.map((tag, index) => (
                                            <span key={index} className={styles.tag}>
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className={styles.materialFooter}>
                                    <div className={styles.footerStats}>
                                        {material.downloadCount && (
                                            <span className={styles.footerStat}>
                                                📥 {material.downloadCount} загрузок
                                            </span>
                                        )}
                                        {material.views && (
                                            <span className={styles.footerStat}>
                                                👁️ {material.views} просмотров
                                            </span>
                                        )}
                                        {material.attempts && (
                                            <span className={styles.footerStat}>
                                                🎯 {material.attempts} попыток
                                            </span>
                                        )}
                                        {material.completions && (
                                            <span className={styles.footerStat}>
                                                ✅ {material.completions} завершений
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div className={styles.footerActions}>
                                        {material.type === 'video' && (
                                            <button className={styles.actionBtn}>
                                                <span>▶️</span>
                                                Смотреть
                                            </button>
                                        )}
                                        {material.type === 'test' && (
                                            <button className={styles.actionBtn}>
                                                <span>📝</span>
                                                Пройти тест
                                            </button>
                                        )}
                                        {material.type === 'interactive' && (
                                            <button className={styles.actionBtn}>
                                                <span>🎮</span>
                                                Запустить
                                            </button>
                                        )}
                                        {(material.type === 'pdf' || material.type === 'presentation') && (
                                            <>
                                                <button className={styles.actionBtn}>
                                                    <span>👁️</span>
                                                    Просмотр
                                                </button>
                                                <button 
                                                    className={styles.downloadBtn}
                                                    onClick={() => downloadMaterial(material.id)}
                                                >
                                                    <span>📥</span>
                                                    Скачать
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>📚</div>
                        <h3 className={styles.emptyTitle}>Материалы не найдены</h3>
                        <p className={styles.emptyDescription}>
                            Попробуйте изменить параметры поиска или фильтры
                        </p>
                        <button 
                            className={styles.resetButton}
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedSubject('all');
                                setSelectedType('all');
                            }}
                        >
                            Сбросить фильтры
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MaterialsLibrary;