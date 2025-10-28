import React, { useState } from 'react';
import styles from './Achievements.module.css';

function Achievements() {
    const [activeTab, setActiveTab] = useState('achievements');
    
    // Моковые данные достижений
    const achievements = [
        {
            id: 1,
            title: 'Первые шаги',
            description: 'Присоединились к первой группе',
            icon: '🎯',
            category: 'beginner',
            earnedDate: '2025-08-01',
            progress: 100,
            rarity: 'common',
            points: 10
        },
        {
            id: 2,
            title: 'Отличник месяца',
            description: 'Получили только отличные оценки весь месяц',
            icon: '⭐',
            category: 'academic',
            earnedDate: '2025-08-15',
            progress: 100,
            rarity: 'rare',
            points: 50
        },
        {
            id: 3,
            title: 'Серия побед',
            description: 'Правильно ответили на 10 вопросов подряд',
            icon: '🔥',
            category: 'streak',
            earnedDate: '2025-08-10',
            progress: 100,
            rarity: 'uncommon',
            points: 25
        },
        {
            id: 4,
            title: 'Исследователь',
            description: 'Изучили 5 различных предметов',
            icon: '🔬',
            category: 'explorer',
            earnedDate: null,
            progress: 80,
            rarity: 'uncommon',
            points: 30
        },
        {
            id: 5,
            title: 'Мастер математики',
            description: 'Решили 100 задач по математике',
            icon: '📐',
            category: 'subject',
            earnedDate: null,
            progress: 67,
            rarity: 'rare',
            points: 40
        },
        {
            id: 6,
            title: 'Легенда',
            description: 'Достигли топ-10 в общем рейтинге',
            icon: '👑',
            category: 'legendary',
            earnedDate: null,
            progress: 15,
            rarity: 'legendary',
            points: 100
        }
    ];

    // Рейтинги
    const ratings = {
        personal: {
            totalPoints: 385,
            level: 8,
            nextLevelPoints: 450,
            rank: 24,
            percentile: 85
        },
        subjects: [
            { name: 'Математика', points: 150, rank: 12, grade: 'A+' },
            { name: 'Физика', points: 120, rank: 18, grade: 'A' },
            { name: 'Химия', points: 85, rank: 28, grade: 'B+' },
            { name: 'Биология', points: 30, rank: 45, grade: 'B' }
        ],
        leaderboard: [
            { rank: 1, name: 'Анна Смирнова', points: 1250, avatar: 'АС', isMe: false },
            { rank: 2, name: 'Дмитрий Козлов', points: 1180, avatar: 'ДК', isMe: false },
            { rank: 3, name: 'Елена Петрова', points: 1120, avatar: 'ЕП', isMe: false },
            { rank: 23, name: 'Михаил Иванов', points: 420, avatar: 'МИ', isMe: false },
            { rank: 24, name: 'Иван Петров', points: 385, avatar: 'ИП', isMe: true },
            { rank: 25, name: 'София Васильева', points: 375, avatar: 'СВ', isMe: false },
            { rank: 26, name: 'Артем Николаев', points: 360, avatar: 'АН', isMe: false }
        ]
    };

    const earnedAchievements = achievements.filter(a => a.earnedDate);
    const inProgressAchievements = achievements.filter(a => !a.earnedDate);

    const getRarityColor = (rarity) => {
        const colors = {
            'common': '#6B7280',
            'uncommon': '#10B981',
            'rare': '#3B82F6',
            'epic': '#8B5CF6',
            'legendary': '#F59E0B'
        };
        return colors[rarity] || '#6B7280';
    };

    const getCategoryIcon = (category) => {
        const icons = {
            'beginner': '🌱',
            'academic': '📚',
            'streak': '🔥',
            'explorer': '🗺️',
            'subject': '🎯',
            'legendary': '⚡'
        };
        return icons[category] || '🏆';
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const getLevelProgress = () => {
        const currentLevelStart = (ratings.personal.level - 1) * 50;
        const currentPoints = ratings.personal.totalPoints - currentLevelStart;
        const pointsForNextLevel = 50;
        return (currentPoints / pointsForNextLevel) * 100;
    };

    const getSubjectColor = (subject) => {
        const colors = {
            'Математика': '#3B82F6',
            'Физика': '#8B5CF6',
            'Химия': '#06B6D4',
            'Биология': '#10B981'
        };
        return colors[subject] || '#6B7280';
    };

    const getGradeColor = (grade) => {
        const colors = {
            'A+': '#10B981',
            'A': '#3B82F6',
            'B+': '#F59E0B',
            'B': '#EF4444',
            'C': '#6B7280'
        };
        return colors[grade] || '#6B7280';
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Достижения и рейтинги</h2>
                <p className={styles.subtitle}>Отслеживайте свой прогресс и соревнуйтесь с другими студентами</p>
            </div>

            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'achievements' ? styles.active : ''}`}
                    onClick={() => setActiveTab('achievements')}
                >
                    <span className={styles.tabIcon}>🏆</span>
                    <span>Достижения</span>
                    <span className={styles.badge}>{earnedAchievements.length}</span>
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'ratings' ? styles.active : ''}`}
                    onClick={() => setActiveTab('ratings')}
                >
                    <span className={styles.tabIcon}>📊</span>
                    <span>Рейтинги</span>
                    <span className={styles.badge}>#{ratings.personal.rank}</span>
                </button>
            </div>

            <div className={styles.content}>
                {activeTab === 'achievements' && (
                    <div className={styles.achievementsSection}>
                        {/* Общая статистика */}
                        <div className={styles.statsCard}>
                            <div className={styles.statItem}>
                                <div className={styles.statValue}>{earnedAchievements.length}</div>
                                <div className={styles.statLabel}>Получено наград</div>
                            </div>
                            <div className={styles.statItem}>
                                <div className={styles.statValue}>{ratings.personal.totalPoints}</div>
                                <div className={styles.statLabel}>Всего очков</div>
                            </div>
                            <div className={styles.statItem}>
                                <div className={styles.statValue}>Уровень {ratings.personal.level}</div>
                                <div className={styles.statLabel}>Текущий уровень</div>
                            </div>
                            <div className={styles.statItem}>
                                <div className={styles.statValue}>#{ratings.personal.rank}</div>
                                <div className={styles.statLabel}>Позиция в рейтинге</div>
                            </div>
                        </div>

                        {/* Прогресс до следующего уровня */}
                        <div className={styles.levelCard}>
                            <div className={styles.levelHeader}>
                                <div className={styles.levelInfo}>
                                    <h3 className={styles.levelTitle}>Уровень {ratings.personal.level}</h3>
                                    <p className={styles.levelDescription}>
                                        {ratings.personal.nextLevelPoints - ratings.personal.totalPoints} очков до следующего уровня
                                    </p>
                                </div>
                                <div className={styles.levelBadge}>🎖️</div>
                            </div>
                            <div className={styles.progressBar}>
                                <div 
                                    className={styles.progressFill}
                                    style={{ width: `${getLevelProgress()}%` }}
                                ></div>
                            </div>
                            <div className={styles.progressText}>
                                {ratings.personal.totalPoints} / {ratings.personal.nextLevelPoints} очков
                            </div>
                        </div>

                        {/* Полученные достижения */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>
                                🎯 Полученные достижения ({earnedAchievements.length})
                            </h3>
                            <div className={styles.achievementsList}>
                                {earnedAchievements.map(achievement => (
                                    <div 
                                        key={achievement.id} 
                                        className={`${styles.achievementCard} ${styles.earned}`}
                                        style={{ borderColor: getRarityColor(achievement.rarity) }}
                                    >
                                        <div className={styles.achievementHeader}>
                                            <div className={styles.achievementIcon}>
                                                {achievement.icon}
                                            </div>
                                            <div 
                                                className={styles.rarityBadge}
                                                style={{ background: getRarityColor(achievement.rarity) }}
                                            >
                                                {achievement.rarity}
                                            </div>
                                        </div>
                                        <div className={styles.achievementBody}>
                                            <h4 className={styles.achievementTitle}>{achievement.title}</h4>
                                            <p className={styles.achievementDescription}>{achievement.description}</p>
                                            <div className={styles.achievementFooter}>
                                                <span className={styles.achievementPoints}>+{achievement.points} очков</span>
                                                <span className={styles.achievementDate}>
                                                    {formatDate(achievement.earnedDate)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Достижения в процессе */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>
                                ⏳ В процессе получения ({inProgressAchievements.length})
                            </h3>
                            <div className={styles.achievementsList}>
                                {inProgressAchievements.map(achievement => (
                                    <div 
                                        key={achievement.id} 
                                        className={`${styles.achievementCard} ${styles.inProgress}`}
                                        style={{ borderColor: getRarityColor(achievement.rarity) }}
                                    >
                                        <div className={styles.achievementHeader}>
                                            <div className={styles.achievementIcon}>
                                                {achievement.icon}
                                            </div>
                                            <div 
                                                className={styles.rarityBadge}
                                                style={{ background: getRarityColor(achievement.rarity) }}
                                            >
                                                {achievement.rarity}
                                            </div>
                                        </div>
                                        <div className={styles.achievementBody}>
                                            <h4 className={styles.achievementTitle}>{achievement.title}</h4>
                                            <p className={styles.achievementDescription}>{achievement.description}</p>
                                            <div className={styles.progressSection}>
                                                <div className={styles.progressHeader}>
                                                    <span className={styles.progressLabel}>Прогресс</span>
                                                    <span className={styles.progressValue}>{achievement.progress}%</span>
                                                </div>
                                                <div className={styles.progressBar}>
                                                    <div 
                                                        className={styles.progressFill}
                                                        style={{ 
                                                            width: `${achievement.progress}%`,
                                                            background: getRarityColor(achievement.rarity)
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <div className={styles.achievementFooter}>
                                                <span className={styles.achievementPoints}>+{achievement.points} очков</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'ratings' && (
                    <div className={styles.ratingsSection}>
                        {/* Общий рейтинг */}
                        <div className={styles.personalRating}>
                            <div className={styles.ratingCard}>
                                <div className={styles.ratingHeader}>
                                    <h3 className={styles.ratingTitle}>Ваш общий рейтинг</h3>
                                    <div className={styles.ratingBadge}>
                                        <span className={styles.rankIcon}>👑</span>
                                        <span className={styles.rankText}>#{ratings.personal.rank}</span>
                                    </div>
                                </div>
                                <div className={styles.ratingStats}>
                                    <div className={styles.ratingStat}>
                                        <span className={styles.ratingStatValue}>{ratings.personal.totalPoints}</span>
                                        <span className={styles.ratingStatLabel}>Очков</span>
                                    </div>
                                    <div className={styles.ratingStat}>
                                        <span className={styles.ratingStatValue}>{ratings.personal.percentile}%</span>
                                        <span className={styles.ratingStatLabel}>Перцентиль</span>
                                    </div>
                                    <div className={styles.ratingStat}>
                                        <span className={styles.ratingStatValue}>Уровень {ratings.personal.level}</span>
                                        <span className={styles.ratingStatLabel}>Текущий уровень</span>
                                    </div>
                                </div>
                                <div className={styles.ratingDescription}>
                                    Вы опережаете {ratings.personal.percentile}% всех студентов!
                                </div>
                            </div>
                        </div>

                        {/* Рейтинг по предметам */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>📚 Рейтинг по предметам</h3>
                            <div className={styles.subjectRatings}>
                                {ratings.subjects.map((subject, index) => (
                                    <div key={index} className={styles.subjectCard}>
                                        <div className={styles.subjectHeader}>
                                            <div 
                                                className={styles.subjectIcon}
                                                style={{ background: getSubjectColor(subject.name) }}
                                            >
                                                {subject.name.charAt(0)}
                                            </div>
                                            <div className={styles.subjectInfo}>
                                                <h4 className={styles.subjectName}>{subject.name}</h4>
                                                <div className={styles.subjectMeta}>
                                                    <span className={styles.subjectRank}>#{subject.rank}</span>
                                                    <span 
                                                        className={styles.subjectGrade}
                                                        style={{ color: getGradeColor(subject.grade) }}
                                                    >
                                                        {subject.grade}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={styles.subjectPoints}>
                                                {subject.points} очков
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Таблица лидеров */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>🏆 Таблица лидеров</h3>
                            <div className={styles.leaderboard}>
                                {ratings.leaderboard.map((player, index) => (
                                    <div 
                                        key={index} 
                                        className={`${styles.leaderboardItem} ${player.isMe ? styles.isMe : ''}`}
                                    >
                                        <div className={styles.playerRank}>
                                            {player.rank <= 3 ? (
                                                <span className={styles.medalIcon}>
                                                    {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : '🥉'}
                                                </span>
                                            ) : (
                                                <span className={styles.rankNumber}>#{player.rank}</span>
                                            )}
                                        </div>
                                        <div className={styles.playerInfo}>
                                            <div className={styles.playerAvatar}>
                                                {player.avatar}
                                            </div>
                                            <div className={styles.playerDetails}>
                                                <span className={styles.playerName}>
                                                    {player.name}
                                                    {player.isMe && <span className={styles.meLabel}>(Вы)</span>}
                                                </span>
                                            </div>
                                        </div>
                                        <div className={styles.playerPoints}>
                                            {player.points} очков
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Achievements;