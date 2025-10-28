import React, { useState } from 'react';
import styles from './SubscriptionPlans.module.css';

function SubscriptionPlans() {
    const [billingPeriod, setBillingPeriod] = useState('monthly');
    
    // Информация о текущей подписке
    const currentSubscription = {
        plan: 'premium',
        expiryDate: '2025-09-18',
        daysLeft: 31,
        autoRenewal: true,
        nextPayment: 1299,
        paymentMethod: 'Карта •••• 4567'
    };

    // Тарифные планы
    const plans = [
        {
            id: 'free',
            name: 'Базовый',
            description: 'Идеально для начинающих',
            price: { monthly: 0, yearly: 0 },
            popular: false,
            features: [
                { text: 'Доступ к 3 группам', included: true },
                { text: 'Базовые материалы', included: true },
                { text: 'Чат с преподавателем', included: true },
                { text: 'Домашние задания', included: true },
                { text: 'Статистика прогресса', included: false },
                { text: 'Приоритетная поддержка', included: false },
                { text: 'Индивидуальные уроки', included: false },
                { text: 'Продвинутая аналитика', included: false }
            ],
            limitations: [
                '3 группы максимум',
                'Базовый функционал',
                'Стандартная поддержка'
            ]
        },
        {
            id: 'premium',
            name: 'Премиум',
            description: 'Лучший выбор для активного обучения',
            price: { monthly: 1299, yearly: 10999 },
            popular: true,
            features: [
                { text: 'Доступ к 15 группам', included: true },
                { text: 'Все материалы и тесты', included: true },
                { text: 'Чат с преподавателем', included: true },
                { text: 'Домашние задания', included: true },
                { text: 'Статистика прогресса', included: true },
                { text: 'Приоритетная поддержка', included: true },
                { text: 'Индивидуальные уроки', included: false },
                { text: 'Продвинутая аналитика', included: true }
            ],
            benefits: [
                'Безлимитные материалы',
                'Детальная статистика',
                'Быстрая поддержка'
            ]
        },
        {
            id: 'pro',
            name: 'Профессиональный',
            description: 'Максимальные возможности для серьезного обучения',
            price: { monthly: 2499, yearly: 21999 },
            popular: false,
            features: [
                { text: 'Безлимитное количество групп', included: true },
                { text: 'Все материалы и тесты', included: true },
                { text: 'Чат с преподавателем', included: true },
                { text: 'Домашние задания', included: true },
                { text: 'Статистика прогресса', included: true },
                { text: 'Приоритетная поддержка', included: true },
                { text: 'Индивидуальные уроки', included: true },
                { text: 'Продвинутая аналитика', included: true }
            ],
            benefits: [
                'Все возможности платформы',
                'Персональный менеджер',
                'Индивидуальные занятия'
            ]
        }
    ];

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ru-RU').format(price);
    };

    const calculateDiscount = (monthly, yearly) => {
        if (monthly === 0) return 0;
        const yearlyMonthly = yearly / 12;
        return Math.round(((monthly - yearlyMonthly) / monthly) * 100);
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const isCurrentPlan = (planId) => {
        return currentSubscription.plan === planId;
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Подписка и тарифы</h2>
                <p className={styles.subtitle}>Выберите подходящий тариф для эффективного обучения</p>
            </div>

            {/* Текущая подписка */}
            <div className={styles.currentSubscription}>
                <div className={styles.subscriptionCard}>
                    <div className={styles.subscriptionHeader}>
                        <div className={styles.subscriptionInfo}>
                            <h3 className={styles.subscriptionTitle}>
                                Ваша подписка: {plans.find(p => p.id === currentSubscription.plan)?.name}
                            </h3>
                            <p className={styles.subscriptionStatus}>
                                Активна до {formatDate(currentSubscription.expiryDate)}
                            </p>
                        </div>
                        <div className={styles.subscriptionBadge}>
                            <span className={styles.badgeIcon}>✨</span>
                            <span>Активна</span>
                        </div>
                    </div>
                    
                    <div className={styles.subscriptionDetails}>
                        <div className={styles.subscriptionStat}>
                            <div className={styles.statValue}>{currentSubscription.daysLeft}</div>
                            <div className={styles.statLabel}>дней осталось</div>
                        </div>
                        <div className={styles.subscriptionStat}>
                            <div className={styles.statValue}>{formatPrice(currentSubscription.nextPayment)} ₽</div>
                            <div className={styles.statLabel}>следующий платеж</div>
                        </div>
                        <div className={styles.subscriptionStat}>
                            <div className={styles.statValue}>{currentSubscription.autoRenewal ? 'Да' : 'Нет'}</div>
                            <div className={styles.statLabel}>автопродление</div>
                        </div>
                    </div>

                    <div className={styles.subscriptionActions}>
                        <button className={styles.manageBtn}>
                            <span>⚙️</span>
                            Управление подпиской
                        </button>
                        <button className={styles.paymentBtn}>
                            <span>💳</span>
                            Способы оплаты
                        </button>
                        <button className={styles.historyBtn}>
                            <span>📊</span>
                            История платежей
                        </button>
                    </div>
                </div>
            </div>

            {/* Переключатель периода оплаты */}
            <div className={styles.billingToggle}>
                <span className={styles.billingLabel}>Период оплаты:</span>
                <div className={styles.toggleContainer}>
                    <button
                        className={`${styles.toggleBtn} ${billingPeriod === 'monthly' ? styles.active : ''}`}
                        onClick={() => setBillingPeriod('monthly')}
                    >
                        Ежемесячно
                    </button>
                    <button
                        className={`${styles.toggleBtn} ${billingPeriod === 'yearly' ? styles.active : ''}`}
                        onClick={() => setBillingPeriod('yearly')}
                    >
                        Ежегодно
                        <span className={styles.discountBadge}>Скидка до 30%</span>
                    </button>
                </div>
            </div>

            {/* Тарифные планы */}
            <div className={styles.plansGrid}>
                {plans.map(plan => {
                    const currentPrice = plan.price[billingPeriod];
                    const discount = billingPeriod === 'yearly' ? calculateDiscount(plan.price.monthly, plan.price.yearly) : 0;
                    
                    return (
                        <div 
                            key={plan.id} 
                            className={`${styles.planCard} ${plan.popular ? styles.popular : ''} ${isCurrentPlan(plan.id) ? styles.current : ''}`}
                        >
                            {plan.popular && (
                                <div className={styles.popularBadge}>
                                    <span>🔥</span>
                                    Популярный
                                </div>
                            )}
                            
                            {isCurrentPlan(plan.id) && (
                                <div className={styles.currentBadge}>
                                    <span>✅</span>
                                    Текущий план
                                </div>
                            )}

                            <div className={styles.planHeader}>
                                <h3 className={styles.planName}>{plan.name}</h3>
                                <p className={styles.planDescription}>{plan.description}</p>
                                
                                <div className={styles.planPrice}>
                                    {currentPrice === 0 ? (
                                        <span className={styles.freePrice}>Бесплатно</span>
                                    ) : (
                                        <>
                                            <span className={styles.price}>{formatPrice(currentPrice)} ₽</span>
                                            <span className={styles.period}>
                                                /{billingPeriod === 'monthly' ? 'месяц' : 'год'}
                                            </span>
                                            {discount > 0 && (
                                                <div className={styles.originalPrice}>
                                                    <span className={styles.crossed}>
                                                        {formatPrice(plan.price.monthly * 12)} ₽/год
                                                    </span>
                                                    <span className={styles.discount}>
                                                        Экономия {discount}%
                                                    </span>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className={styles.planFeatures}>
                                <h4 className={styles.featuresTitle}>Что включено:</h4>
                                <ul className={styles.featuresList}>
                                    {plan.features.map((feature, index) => (
                                        <li 
                                            key={index} 
                                            className={`${styles.feature} ${feature.included ? styles.included : styles.excluded}`}
                                        >
                                            <span className={styles.featureIcon}>
                                                {feature.included ? '✅' : '❌'}
                                            </span>
                                            <span className={styles.featureText}>{feature.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {(plan.benefits || plan.limitations) && (
                                <div className={styles.planDetails}>
                                    {plan.benefits && (
                                        <div className={styles.benefits}>
                                            <h5 className={styles.detailsTitle}>🎯 Преимущества:</h5>
                                            <ul className={styles.detailsList}>
                                                {plan.benefits.map((benefit, index) => (
                                                    <li key={index} className={styles.benefit}>{benefit}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    
                                    {plan.limitations && (
                                        <div className={styles.limitations}>
                                            <h5 className={styles.detailsTitle}>⚠️ Ограничения:</h5>
                                            <ul className={styles.detailsList}>
                                                {plan.limitations.map((limitation, index) => (
                                                    <li key={index} className={styles.limitation}>{limitation}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className={styles.planFooter}>
                                {isCurrentPlan(plan.id) ? (
                                    <button className={styles.currentPlanBtn} disabled>
                                        <span>✅</span>
                                        Текущий план
                                    </button>
                                ) : plan.id === 'free' ? (
                                    <button className={styles.downgradePlanBtn}>
                                        <span>⬇️</span>
                                        Понизить до базового
                                    </button>
                                ) : (
                                    <button className={styles.upgradePlanBtn}>
                                        <span>⬆️</span>
                                        {currentSubscription.plan === 'free' ? 'Подключить' : 'Изменить план'}
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Дополнительная информация */}
            <div className={styles.additionalInfo}>
                <div className={styles.infoSection}>
                    <h3 className={styles.infoTitle}>💳 Способы оплаты</h3>
                    <div className={styles.paymentMethods}>
                        <div className={styles.paymentMethod}>
                            <span className={styles.methodIcon}>💳</span>
                            <span>Банковские карты (Visa, MasterCard, МИР)</span>
                        </div>
                        <div className={styles.paymentMethod}>
                            <span className={styles.methodIcon}>📱</span>
                            <span>Электронные кошельки (ЮMoney, QIWI)</span>
                        </div>
                        <div className={styles.paymentMethod}>
                            <span className={styles.methodIcon}>🏪</span>
                            <span>Оплата через терминалы</span>
                        </div>
                    </div>
                </div>

                <div className={styles.infoSection}>
                    <h3 className={styles.infoTitle}>🛡️ Гарантии</h3>
                    <div className={styles.guarantees}>
                        <div className={styles.guarantee}>
                            <span className={styles.guaranteeIcon}>↩️</span>
                            <span>Возврат средств в течение 14 дней</span>
                        </div>
                        <div className={styles.guarantee}>
                            <span className={styles.guaranteeIcon}>🔒</span>
                            <span>Безопасная обработка платежей</span>
                        </div>
                        <div className={styles.guarantee}>
                            <span className={styles.guaranteeIcon}>⚡</span>
                            <span>Мгновенная активация подписки</span>
                        </div>
                    </div>
                </div>

                <div className={styles.infoSection}>
                    <h3 className={styles.infoTitle}>❓ Часто задаваемые вопросы</h3>
                    <div className={styles.faq}>
                        <details className={styles.faqItem}>
                            <summary className={styles.faqQuestion}>
                                Можно ли изменить план в любое время?
                            </summary>
                            <div className={styles.faqAnswer}>
                                Да, вы можете повысить или понизить тариф в любое время. При повышении доплачиваете разницу, при понижении средства засчитываются в следующий период.
                            </div>
                        </details>
                        <details className={styles.faqItem}>
                            <summary className={styles.faqQuestion}>
                                Что происходит после окончания подписки?
                            </summary>
                            <div className={styles.faqAnswer}>
                                Аккаунт переводится на базовый план. Все ваши данные сохраняются, но доступ к премиум-функциям ограничивается.
                            </div>
                        </details>
                        <details className={styles.faqItem}>
                            <summary className={styles.faqQuestion}>
                                Можно ли получить возврат средств?
                            </summary>
                            <div className={styles.faqAnswer}>
                                Да, мы возвращаем деньги в течение 14 дней с момента покупки без лишних вопросов.
                            </div>
                        </details>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubscriptionPlans;