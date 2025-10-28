import React, { useState } from 'react';
import styles from './HelpSupport.module.css';

function HelpSupport() {
    const [activeTab, setActiveTab] = useState('faq');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [ticketForm, setTicketForm] = useState({
        subject: '',
        category: 'general',
        priority: 'medium',
        description: '',
        attachments: []
    });

    // FAQ данные
    const faqData = [
        {
            id: 1,
            question: 'Как присоединиться к группе преподавателя?',
            answer: 'Получите код приглашения от преподавателя и введите его в разделе "Подключения и действия" → "Присоединиться к преподавателю". Код действителен 7 дней.',
            category: 'groups',
            tags: ['группа', 'преподаватель', 'код']
        },
        {
            id: 2,
            question: 'Как изменить свой тарифный план?',
            answer: 'Перейдите в раздел "Подписка/Тарифы" в настройках профиля. Выберите нужный план и нажмите "Изменить план". Доплата происходит автоматически.',
            category: 'subscription',
            tags: ['тариф', 'подписка', 'оплата']
        },
        {
            id: 3,
            question: 'Где посмотреть свои оценки и прогресс?',
            answer: 'Ваши оценки доступны в разделе "Достижения и рейтинги". Там же можно посмотреть статистику по предметам и общий прогресс обучения.',
            category: 'progress',
            tags: ['оценки', 'прогресс', 'статистика']
        },
        {
            id: 4,
            question: 'Как скачать материалы урока?',
            answer: 'В разделе "Библиотека материалов" найдите нужный материал и нажмите кнопку "Скачать". PDF и презентации можно скачать сразу, видео доступны для просмотра онлайн.',
            category: 'materials',
            tags: ['материалы', 'скачивание', 'библиотека']
        },
        {
            id: 5,
            question: 'Не приходят уведомления, что делать?',
            answer: 'Проверьте настройки уведомлений в разделе "Настройки" → "Уведомления". Убедитесь, что включены нужные типы уведомлений и способы доставки.',
            category: 'notifications',
            tags: ['уведомления', 'настройки', 'почта']
        },
        {
            id: 6,
            question: 'Как изменить пароль от аккаунта?',
            answer: 'Перейдите в "Настройки" → "Безопасность" и нажмите кнопку "Изменить пароль". Введите текущий пароль и новый пароль дважды.',
            category: 'security',
            tags: ['пароль', 'безопасность', 'аккаунт']
        },
        {
            id: 7,
            question: 'Можно ли вернуть деньги за подписку?',
            answer: 'Да, мы возвращаем деньги в течение 14 дней с момента покупки без дополнительных вопросов. Обратитесь в поддержку для оформления возврата.',
            category: 'subscription',
            tags: ['возврат', 'деньги', 'подписка']
        },
        {
            id: 8,
            question: 'Как пригласить друга на платформу?',
            answer: 'В разделе "Подключения и действия" → "Пригласить друга" сгенерируйте код приглашения и отправьте его другу. За каждого приглашенного друга вы получите бонусы.',
            category: 'groups',
            tags: ['друг', 'приглашение', 'бонус']
        }
    ];

    // Категории FAQ
    const faqCategories = [
        { id: 'all', name: 'Все вопросы', icon: '❓' },
        { id: 'groups', name: 'Группы и подключения', icon: '👥' },
        { id: 'subscription', name: 'Подписка и оплата', icon: '💰' },
        { id: 'progress', name: 'Прогресс и оценки', icon: '📊' },
        { id: 'materials', name: 'Материалы', icon: '📚' },
        { id: 'notifications', name: 'Уведомления', icon: '🔔' },
        { id: 'security', name: 'Безопасность', icon: '🔒' }
    ];

    // Контакты поддержки
    const supportContacts = [
        {
            type: 'email',
            icon: '📧',
            title: 'Email поддержка',
            value: 'support@studyplatform.ru',
            description: 'Ответим в течение 24 часов',
            action: 'Написать письмо'
        },
        {
            type: 'chat',
            icon: '💬',
            title: 'Онлайн чат',
            value: 'Доступен 24/7',
            description: 'Быстрые ответы на вопросы',
            action: 'Начать чат'
        },
        {
            type: 'phone',
            icon: '📞',
            title: 'Телефон',
            value: '+7 (800) 123-45-67',
            description: 'Пн-Пт с 9:00 до 18:00',
            action: 'Позвонить'
        },
        {
            type: 'telegram',
            icon: '📱',
            title: 'Telegram бот',
            value: '@StudyPlatformBot',
            description: 'Автоматические ответы',
            action: 'Открыть бота'
        }
    ];

    // Популярные руководства
    const guides = [
        {
            id: 1,
            title: 'Первые шаги на платформе',
            description: 'Как настроить профиль и начать обучение',
            duration: '5 мин',
            icon: '🚀',
            difficulty: 'Легко'
        },
        {
            id: 2,
            title: 'Работа с домашними заданиями',
            description: 'Как выполнять и сдавать домашние задания',
            duration: '8 мин',
            icon: '📝',
            difficulty: 'Легко'
        },
        {
            id: 3,
            title: 'Использование библиотеки материалов',
            description: 'Как найти и использовать учебные материалы',
            duration: '6 мин',
            icon: '📚',
            difficulty: 'Легко'
        },
        {
            id: 4,
            title: 'Настройка уведомлений',
            description: 'Как настроить уведомления под себя',
            duration: '4 мин',
            icon: '🔔',
            difficulty: 'Средне'
        }
    ];

    const filteredFAQ = faqData.filter(item => {
        const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleTicketFormChange = (field, value) => {
        setTicketForm(prev => ({ ...prev, [field]: value }));
    };

    const submitTicket = (e) => {
        e.preventDefault();
        // Здесь будет логика отправки тикета
        alert('Ваше обращение отправлено! Мы свяжемся с вами в ближайшее время.');
        setTicketForm({
            subject: '',
            category: 'general',
            priority: 'medium',
            description: '',
            attachments: []
        });
    };

    const renderFAQSection = () => (
        <div className={styles.faqSection}>
            {/* Поиск и фильтры */}
            <div className={styles.faqControls}>
                <div className={styles.searchContainer}>
                    <span className={styles.searchIcon}>🔍</span>
                    <input
                        type="text"
                        placeholder="Поиск по вопросам..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
                
                <div className={styles.categoryFilter}>
                    {faqCategories.map(category => (
                        <button
                            key={category.id}
                            className={`${styles.categoryBtn} ${selectedCategory === category.id ? styles.active : ''}`}
                            onClick={() => setSelectedCategory(category.id)}
                        >
                            <span className={styles.categoryIcon}>{category.icon}</span>
                            <span className={styles.categoryName}>{category.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Список FAQ */}
            <div className={styles.faqList}>
                {filteredFAQ.length > 0 ? (
                    filteredFAQ.map(item => (
                        <details key={item.id} className={styles.faqItem}>
                            <summary className={styles.faqQuestion}>
                                <span className={styles.questionText}>{item.question}</span>
                                <span className={styles.questionIcon}>+</span>
                            </summary>
                            <div className={styles.faqAnswer}>
                                <p>{item.answer}</p>
                                <div className={styles.faqTags}>
                                    {item.tags.map((tag, index) => (
                                        <span key={index} className={styles.faqTag}>
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </details>
                    ))
                ) : (
                    <div className={styles.noResults}>
                        <div className={styles.noResultsIcon}>🔍</div>
                        <h3 className={styles.noResultsTitle}>Ничего не найдено</h3>
                        <p className={styles.noResultsText}>
                            Попробуйте изменить поисковый запрос или выберите другую категорию
                        </p>
                        <button 
                            className={styles.resetSearchBtn}
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('all');
                            }}
                        >
                            Сбросить поиск
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

    const renderContactSection = () => (
        <div className={styles.contactSection}>
            <div className={styles.contactIntro}>
                <h3 className={styles.contactTitle}>Свяжитесь с нами</h3>
                <p className={styles.contactDescription}>
                    Выберите удобный способ связи. Мы всегда готовы помочь!
                </p>
            </div>

            <div className={styles.contactMethods}>
                {supportContacts.map((contact, index) => (
                    <div key={index} className={styles.contactCard}>
                        <div className={styles.contactIcon}>{contact.icon}</div>
                        <div className={styles.contactInfo}>
                            <h4 className={styles.contactMethodTitle}>{contact.title}</h4>
                            <p className={styles.contactValue}>{contact.value}</p>
                            <p className={styles.contactMethodDescription}>{contact.description}</p>
                        </div>
                        <button className={styles.contactAction}>
                            {contact.action}
                        </button>
                    </div>
                ))}
            </div>

            {/* Форма обращения */}
            <div className={styles.ticketForm}>
                <h4 className={styles.ticketFormTitle}>Создать обращение</h4>
                <form onSubmit={submitTicket} className={styles.form}>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Тема обращения</label>
                            <input
                                type="text"
                                value={ticketForm.subject}
                                onChange={(e) => handleTicketFormChange('subject', e.target.value)}
                                className={styles.input}
                                placeholder="Кратко опишите проблему"
                                required
                            />
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Категория</label>
                            <select
                                value={ticketForm.category}
                                onChange={(e) => handleTicketFormChange('category', e.target.value)}
                                className={styles.select}
                            >
                                <option value="general">Общие вопросы</option>
                                <option value="technical">Технические проблемы</option>
                                <option value="billing">Вопросы по оплате</option>
                                <option value="account">Проблемы с аккаунтом</option>
                                <option value="content">Вопросы по контенту</option>
                                <option value="feature">Предложения улучшений</option>
                            </select>
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Приоритет</label>
                            <select
                                value={ticketForm.priority}
                                onChange={(e) => handleTicketFormChange('priority', e.target.value)}
                                className={styles.select}
                            >
                                <option value="low">Низкий</option>
                                <option value="medium">Средний</option>
                                <option value="high">Высокий</option>
                                <option value="urgent">Срочный</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Описание проблемы</label>
                        <textarea
                            value={ticketForm.description}
                            onChange={(e) => handleTicketFormChange('description', e.target.value)}
                            className={styles.textarea}
                            rows="6"
                            placeholder="Подробно опишите вашу проблему или вопрос..."
                            required
                        />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Прикрепить файлы (необязательно)</label>
                        <div className={styles.fileUpload}>
                            <input
                                type="file"
                                multiple
                                className={styles.fileInput}
                                id="attachments"
                                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                            />
                            <label htmlFor="attachments" className={styles.fileLabel}>
                                <span className={styles.fileIcon}>📎</span>
                                <span>Выберите файлы или перетащите сюда</span>
                            </label>
                            <div className={styles.fileHint}>
                                Максимум 5 файлов, до 10 МБ каждый
                            </div>
                        </div>
                    </div>
                    
                    <button type="submit" className={styles.submitBtn}>
                        <span>📧</span>
                        Отправить обращение
                    </button>
                </form>
            </div>
        </div>
    );

    const renderGuidesSection = () => (
        <div className={styles.guidesSection}>
            <div className={styles.guidesIntro}>
                <h3 className={styles.guidesTitle}>Руководства пользователя</h3>
                <p className={styles.guidesDescription}>
                    Пошаговые инструкции по использованию платформы
                </p>
            </div>

            <div className={styles.guidesList}>
                {guides.map(guide => (
                    <div key={guide.id} className={styles.guideCard}>
                        <div className={styles.guideIcon}>{guide.icon}</div>
                        <div className={styles.guideContent}>
                            <h4 className={styles.guideTitle}>{guide.title}</h4>
                            <p className={styles.guideDescription}>{guide.description}</p>
                            <div className={styles.guideMeta}>
                                <span className={styles.guideDuration}>⏱️ {guide.duration}</span>
                                <span className={styles.guideDifficulty}>
                                    🎯 {guide.difficulty}
                                </span>
                            </div>
                        </div>
                        <button className={styles.guideAction}>
                            <span>👁️</span>
                            Посмотреть
                        </button>
                    </div>
                ))}
            </div>

            <div className={styles.additionalResources}>
                <h4 className={styles.resourcesTitle}>Дополнительные ресурсы</h4>
                <div className={styles.resourcesList}>
                    <a href="#" className={styles.resourceLink}>
                        <span className={styles.resourceIcon}>📖</span>
                        <span>Полная документация</span>
                        <span className={styles.externalIcon}>↗️</span>
                    </a>
                    <a href="#" className={styles.resourceLink}>
                        <span className={styles.resourceIcon}>🎥</span>
                        <span>Видеоуроки на YouTube</span>
                        <span className={styles.externalIcon}>↗️</span>
                    </a>
                    <a href="#" className={styles.resourceLink}>
                        <span className={styles.resourceIcon}>💬</span>
                        <span>Сообщество пользователей</span>
                        <span className={styles.externalIcon}>↗️</span>
                    </a>
                    <a href="#" className={styles.resourceLink}>
                        <span className={styles.resourceIcon}>📰</span>
                        <span>Блог с советами</span>
                        <span className={styles.externalIcon}>↗️</span>
                    </a>
                </div>
            </div>
        </div>
    );

    const renderStatusSection = () => (
        <div className={styles.statusSection}>
            <div className={styles.statusCard}>
                <div className={styles.statusHeader}>
                    <h3 className={styles.statusTitle}>Статус системы</h3>
                    <div className={styles.overallStatus}>
                        <span className={styles.statusIndicator}>🟢</span>
                        <span className={styles.statusText}>Все системы работают</span>
                    </div>
                </div>
                
                <div className={styles.servicesList}>
                    <div className={styles.serviceItem}>
                        <span className={styles.serviceName}>Веб-платформа</span>
                        <span className={styles.serviceStatus}>
                            <span className={styles.statusDot}></span>
                            Работает
                        </span>
                    </div>
                    <div className={styles.serviceItem}>
                        <span className={styles.serviceName}>Мобильное приложение</span>
                        <span className={styles.serviceStatus}>
                            <span className={styles.statusDot}></span>
                            Работает
                        </span>
                    </div>
                    <div className={styles.serviceItem}>
                        <span className={styles.serviceName}>Email уведомления</span>
                        <span className={styles.serviceStatus}>
                            <span className={styles.statusDot}></span>
                            Работает
                        </span>
                    </div>
                    <div className={styles.serviceItem}>
                        <span className={styles.serviceName}>Система оплаты</span>
                        <span className={styles.serviceStatus}>
                            <span className={styles.statusDot}></span>
                            Работает
                        </span>
                    </div>
                </div>
                
                <div className={styles.statusFooter}>
                    <a href="#" className={styles.statusLink}>
                        📊 Подробная статистика работы
                    </a>
                    <a href="#" className={styles.statusLink}>
                        📋 История инцидентов
                    </a>
                </div>
            </div>

            <div className={styles.feedbackCard}>
                <h4 className={styles.feedbackTitle}>Оставьте отзыв</h4>
                <p className={styles.feedbackDescription}>
                    Ваше мнение поможет нам улучшить платформу
                </p>
                <div className={styles.feedbackActions}>
                    <button className={styles.feedbackBtn}>
                        <span>⭐</span>
                        Оценить платформу
                    </button>
                    <button className={styles.feedbackBtn}>
                        <span>💡</span>
                        Предложить улучшение
                    </button>
                    <button className={styles.feedbackBtn}>
                        <span>🐛</span>
                        Сообщить о баге
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Помощь и поддержка</h2>
                <p className={styles.subtitle}>Найдите ответы на вопросы или свяжитесь с нашей командой</p>
            </div>

            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'faq' ? styles.active : ''}`}
                    onClick={() => setActiveTab('faq')}
                >
                    <span className={styles.tabIcon}>❓</span>
                    <span>Часто задаваемые вопросы</span>
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'contact' ? styles.active : ''}`}
                    onClick={() => setActiveTab('contact')}
                >
                    <span className={styles.tabIcon}>📞</span>
                    <span>Связаться с поддержкой</span>
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'guides' ? styles.active : ''}`}
                    onClick={() => setActiveTab('guides')}
                >
                    <span className={styles.tabIcon}>📚</span>
                    <span>Руководства</span>
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'status' ? styles.active : ''}`}
                    onClick={() => setActiveTab('status')}
                >
                    <span className={styles.tabIcon}>🔋</span>
                    <span>Статус системы</span>
                </button>
            </div>

            <div className={styles.content}>
                {activeTab === 'faq' && renderFAQSection()}
                {activeTab === 'contact' && renderContactSection()}
                {activeTab === 'guides' && renderGuidesSection()}
                {activeTab === 'status' && renderStatusSection()}
            </div>
        </div>
    );
}

export default HelpSupport;