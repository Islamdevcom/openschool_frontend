import { useState, useEffect } from 'react';
import './MaterialsLibrary.css';
import { getToolHistory, getGeneratedContent, getToolStats } from '../../../api/toolsService';

function MaterialsLibrary({ isOpen, onClose }) {
    const [currentView, setCurrentView] = useState('categories'); // 'categories' or 'files'
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [typeFilter, setTypeFilter] = useState('all');
    const [subjectFilter, setSubjectFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [favorites, setFavorites] = useState(new Set([1, 5, 9])); // Demo favorites
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState(null);

    // Загрузка статистики и истории при открытии
    useEffect(() => {
        if (isOpen) {
            loadStats();
            // Загружаем всю историю при первом открытии
            if (currentView === 'categories') {
                loadHistory();
            }
        }
    }, [isOpen]);

    const loadStats = async () => {
        try {
            const result = await getToolStats();
            if (result.success) {
                setStats(result.data);
            }
        } catch (err) {
            // Использовать демо-данные при ошибке
            console.log('Using demo stats');
        }
    };

    const loadHistory = async (toolType = null) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await getToolHistory(toolType, 50);
            if (result.success && result.data) {
                // Маппим данные из API в формат, который ожидает UI
                const mappedFiles = result.data.map(item => ({
                    id: item.id,
                    type: item.tool_type || 'unknown',
                    icon: getIconForToolType(item.tool_type),
                    typeName: getToolTypeName(item.tool_type),
                    title: item.title || item.topic || 'Без названия',
                    subject: item.subject || 'Все',
                    grade: item.grade || '—',
                    date: item.created_at || new Date().toISOString().split('T')[0],
                    contentId: item.content_id
                }));
                setFiles(mappedFiles);
            }
        } catch (err) {
            console.log('Error loading history:', err);
            setError('Не удалось загрузить историю');
        } finally {
            setIsLoading(false);
        }
    };

    // Вспомогательные функции для маппинга данных API
    const getIconForToolType = (type) => {
        const iconMap = {
            'explanation': '💡',
            'tutor': '🎓',
            'homework': '✏️',
            'check': '✅',
            'analytics': '📊',
            'test': '📋',
            'lesson_plan': '📋',
            'rubric': '✅',
            'quiz': '📝',
            'game': '🎮',
            'cards': '🎴',
            'worksheet': '📄',
            'visual': '🎨',
            'goals': '🎯',
            'differentiation': '🎓'
        };
        return iconMap[type] || '📄';
    };

    const getToolTypeName = (type) => {
        const nameMap = {
            'explanation': 'Объяснение темы',
            'tutor': 'Объясни тему',
            'homework': 'Помощь с домашкой',
            'check': 'Проверка решения',
            'analytics': 'Аналитика',
            'test': 'Тест',
            'lesson_plan': 'План урока',
            'rubric': 'Критерии оценивания',
            'quiz': 'СОЧ/СОР',
            'game': 'Игра',
            'cards': 'Карточки',
            'worksheet': 'Рабочий лист',
            'visual': 'Визуальные материалы',
            'goals': 'Цели обучения',
            'differentiation': 'Дифференциация'
        };
        return nameMap[type] || 'Материал';
    };

    const loadContent = async (contentId) => {
        try {
            const result = await getGeneratedContent(contentId);
            if (result.success) {
                return result.data;
            }
        } catch (err) {
            console.log('Error loading content:', err);
        }
        return null;
    };

    const categories = [
        { id: 'materials', icon: '📚', title: 'Учебные материалы', desc: 'Загруженные файлы (PDF, видео, документы)', count: 125, gradient: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)' },
        { id: 'planning', icon: '📋', title: 'Планирование', desc: 'Инструменты для планирования уроков', count: 25, gradient: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)' },
        { id: 'creation', icon: '🎨', title: 'Создание', desc: 'Инструменты для создания учебных материалов', count: 42, gradient: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)' },
        { id: 'assessment', icon: '✅', title: 'Оценивание', desc: 'Инструменты для оценки знаний учеников', count: 38, gradient: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)' },
        { id: 'learning', icon: '📚', title: 'Обучение', desc: 'Инструменты для обучения и помощи ученикам', count: 123, gradient: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)' },
        { id: 'analytics', icon: '📊', title: 'Аналитика успеваемости', desc: 'Графики прогресса учеников', count: 12, gradient: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)' },
        { id: 'homework-check', icon: '🖊️', title: 'Проверка ДЗ', desc: 'AI проверяет домашние работы и дает оценку', count: 15, gradient: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)' },
        { id: 'tests', icon: '📋', title: 'Тест с вариантами', desc: 'Автоматическое создание тестов', count: 22, gradient: 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)' },
        { id: 'reports', icon: '📝', title: 'Отчет для руководства', desc: 'Автогенерация отчетов', count: 8, gradient: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)' },
        { id: 'hook', icon: '⚓', title: 'Зацепка урока', desc: 'Интересное начало урока', count: 18, gradient: 'linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%)' },
        { id: 'differentiation', icon: '🎓', title: 'Дифференциация', desc: 'Задания 3 уровней (А, Б, В)', count: 14, gradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' },
    ];

    const [files, setFiles] = useState([]);

    const subjects = ['Математика', 'Физика', 'Химия', 'Биология', 'Русский язык', 'Английский язык'];
    const fileTypes = [
        { value: 'explanation', label: '💡 Объяснение темы' },
        { value: 'homework', label: '✏️ Помощь с домашкой' },
        { value: 'tutor', label: '🎓 Объясни тему' },
        { value: 'check', label: '✅ Проверка решения' },
        { value: 'analytics', label: '📊 Аналитика' },
        { value: 'test', label: '📋 Тест' },
    ];

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    const filteredFiles = files.filter(file => {
        const matchesType = typeFilter === 'all' || file.type === typeFilter;
        const matchesSubject = subjectFilter === 'all' || file.subject === subjectFilter || file.subject === 'Все';
        const matchesSearch = searchQuery === '' || file.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesSubject && matchesSearch;
    });

    const openCategory = (category) => {
        setSelectedCategory(category);
        setCurrentView('files');
        setTypeFilter('all');
        setSubjectFilter('all');
        setSearchQuery('');
        // Не загружаем повторно - данные уже загружены при открытии библиотеки
    };

    const backToCategories = () => {
        setCurrentView('categories');
        setSelectedCategory(null);
    };

    const toggleFavorite = (fileId) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(fileId)) {
                newFavorites.delete(fileId);
            } else {
                newFavorites.add(fileId);
            }
            return newFavorites;
        });
    };

    const deleteFile = (fileId) => {
        if (window.confirm('Удалить этот материал?')) {
            setFiles(prev => prev.filter(f => f.id !== fileId));
        }
    };

    const handleClose = () => {
        setCurrentView('categories');
        setSelectedCategory(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="materials-library-overlay" onClick={handleClose}>
            <div className="materials-library-modal" onClick={e => e.stopPropagation()}>
                <button className="materials-library-close" onClick={handleClose}>×</button>

                {currentView === 'categories' ? (
                    <>
                        {/* Заголовок */}
                        <div className="materials-library-header">
                            <div className="materials-library-icon">📁</div>
                            <h1 className="materials-library-title">Библиотека</h1>
                            <p className="materials-library-desc">Все сохраненные материалы</p>
                        </div>

                        {/* Сетка категорий */}
                        {isLoading && currentView === 'categories' ? (
                            <div style={{ textAlign: 'center', padding: '40px' }}>
                                <div style={{ fontSize: '40px', marginBottom: '10px' }}>⏳</div>
                                <p>Загружаем материалы...</p>
                            </div>
                        ) : (
                            <div className="materials-categories-grid">
                                {categories.map(cat => {
                                    // Считаем реальное количество файлов для каждой категории
                                    const realCount = files.filter(f => {
                                        // Базовая логика фильтрации по категориям
                                        if (cat.id === 'materials') return true;
                                        return f.type === cat.id || f.typeName?.includes(cat.title);
                                    }).length;

                                    return (
                                        <div
                                            key={cat.id}
                                            className="materials-category-card"
                                            onClick={() => openCategory(cat)}
                                        >
                                            <div
                                                className="materials-category-icon"
                                                style={{ background: cat.gradient }}
                                            >
                                                <span>{cat.icon}</span>
                                            </div>
                                            <div className="materials-category-title">{cat.title}</div>
                                            <div className="materials-category-desc">{cat.desc}</div>
                                            <div className="materials-category-count">
                                                {realCount} {realCount === 1 ? 'файл' : realCount > 1 && realCount < 5 ? 'файла' : 'файлов'}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        {/* Кнопка назад */}
                        <button className="materials-back-btn" onClick={backToCategories}>
                            ← Назад к категориям
                        </button>

                        {/* Заголовок категории */}
                        <div className="materials-library-header">
                            <div className="materials-library-icon">{selectedCategory?.icon}</div>
                            <h1 className="materials-library-title">{selectedCategory?.title}</h1>
                            <p className="materials-library-desc">{selectedCategory?.desc}</p>
                        </div>

                        {/* Фильтры */}
                        <div className="materials-filters-card">
                            <div className="materials-filters-grid">
                                <div className="materials-filter-group">
                                    <label className="materials-filter-label">Тип материала</label>
                                    <select
                                        value={typeFilter}
                                        onChange={(e) => setTypeFilter(e.target.value)}
                                        className="materials-select"
                                    >
                                        <option value="all">Все материалы</option>
                                        {fileTypes.map(ft => (
                                            <option key={ft.value} value={ft.value}>{ft.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="materials-filter-group">
                                    <label className="materials-filter-label">Предмет</label>
                                    <select
                                        value={subjectFilter}
                                        onChange={(e) => setSubjectFilter(e.target.value)}
                                        className="materials-select"
                                    >
                                        <option value="all">Все предметы</option>
                                        {subjects.map(subj => (
                                            <option key={subj} value={subj}>{subj}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="materials-filter-group">
                                    <label className="materials-filter-label">Дата</label>
                                    <select
                                        value={dateFilter}
                                        onChange={(e) => setDateFilter(e.target.value)}
                                        className="materials-select"
                                    >
                                        <option value="all">За все время</option>
                                        <option value="today">Сегодня</option>
                                        <option value="week">На этой неделе</option>
                                        <option value="month">В этом месяце</option>
                                    </select>
                                </div>

                                <div className="materials-filter-group">
                                    <label className="materials-filter-label">Поиск</label>
                                    <div className="materials-search-box">
                                        <span className="materials-search-icon">🔍</span>
                                        <input
                                            type="text"
                                            className="materials-search-input"
                                            placeholder="Поиск по названию..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="materials-stats-bar">
                                <div className="materials-results-count">
                                    Найдено: <strong>{filteredFiles.length}</strong> материалов
                                </div>
                                <div className="materials-view-toggle">
                                    <button
                                        className={`materials-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                        onClick={() => setViewMode('grid')}
                                    >
                                        🔲 Сетка
                                    </button>
                                    <button
                                        className={`materials-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                        onClick={() => setViewMode('list')}
                                    >
                                        📋 Список
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Сетка файлов */}
                        {error ? (
                            <div className="materials-empty-state">
                                <div className="materials-empty-icon">⚠️</div>
                                <div className="materials-empty-title">Ошибка загрузки</div>
                                <div className="materials-empty-text">{error}</div>
                            </div>
                        ) : filteredFiles.length > 0 ? (
                            <div className={`materials-files-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                                {filteredFiles.map(file => (
                                    <div key={file.id} className={`materials-file-card type-${file.type}`}>
                                        <div className="materials-file-header">
                                            <div className="materials-file-icon">{file.icon}</div>
                                            <div className="materials-file-type">
                                                <div className="materials-file-type-name">{file.typeName}</div>
                                            </div>
                                            <div
                                                className={`materials-file-favorite ${favorites.has(file.id) ? 'active' : ''}`}
                                                onClick={() => toggleFavorite(file.id)}
                                            >
                                                ⭐
                                            </div>
                                        </div>
                                        <div className="materials-file-title">{file.title}</div>
                                        <div className="materials-file-meta">
                                            <span className="materials-file-tag">{file.subject}</span>
                                            <span className="materials-file-tag">{file.grade}</span>
                                        </div>
                                        <div className="materials-file-date">📅 {formatDate(file.date)}</div>
                                        <div className="materials-file-actions">
                                            <button
                                                className="materials-action-btn btn-open"
                                                onClick={async () => {
                                                    if (file.contentId) {
                                                        const content = await loadContent(file.contentId);
                                                        if (content) {
                                                            alert('Контент загружен! Добавьте модальное окно для отображения');
                                                        }
                                                    }
                                                }}
                                            >
                                                Открыть
                                            </button>
                                            <button className="materials-action-btn btn-download">📥</button>
                                            <button
                                                className="materials-action-btn btn-delete"
                                                onClick={() => deleteFile(file.id)}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="materials-empty-state">
                                <div className="materials-empty-icon">📂</div>
                                <div className="materials-empty-title">
                                    {files.length === 0 ? 'Нет сохраненных материалов' : 'Материалы не найдены'}
                                </div>
                                <div className="materials-empty-text">
                                    {files.length === 0
                                        ? 'Создайте материалы с помощью AI инструментов'
                                        : 'Попробуйте изменить фильтры или поисковый запрос'
                                    }
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default MaterialsLibrary;
