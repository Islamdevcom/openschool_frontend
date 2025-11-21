import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import LanguageDropdown from "../../components/common/LanguageDropdown";
import styles from "./LandingPageNew.module.css";

export default function LandingPageNew() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className={styles.landingPage}>
      {/* Навигация */}
      <motion.header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <nav className={styles.nav}>
          <div className={styles.logoSection}>
            <img src="/logo.png" alt="OpenSchool Logo" className={styles.logo} />
            <span className={styles.logoText}>OpenSchool AI</span>
          </div>

          <ul className={styles.navLinks}>
            <li><a href="#features">Возможности</a></li>
            <li><a href="#benefits">Преимущества</a></li>
            <li><a href="#audience">Для кого</a></li>
            <li><a href="#pricing">Тарифы</a></li>
          </ul>

          <div className={styles.headerRight}>
            <LanguageDropdown />
            <Link to="/login" className={styles.loginBtn}>
              Войти
            </Link>
            <Link to="/self-register" className={styles.getStartedBtn}>
              Начать бесплатно
            </Link>
          </div>
        </nav>
      </motion.header>

      {/* Hero секция */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.gradientOrb1}></div>
          <div className={styles.gradientOrb2}></div>
          <div className={styles.gradientOrb3}></div>
        </div>

        <div className={styles.heroContent}>
          <motion.div
            className={styles.heroText}
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div className={styles.heroBadge} variants={fadeInUp}>
              <span className={styles.badgeIcon}>✨</span>
              <span>AI-ассистент для образования</span>
            </motion.div>

            <motion.h1 className={styles.heroTitle} variants={fadeInUp}>
              Образование будущего
              <br />
              <span className={styles.gradientText}>с искусственным интеллектом</span>
            </motion.h1>

            <motion.p className={styles.heroSubtitle} variants={fadeInUp}>
              OpenSchool AI — интеллектуальная платформа для учителей, учеников и родителей.
              Автоматизация рутины, персонализация обучения, аналитика в реальном времени.
            </motion.p>

            <motion.div className={styles.heroButtons} variants={fadeInUp}>
              <Link to="/self-register" className={styles.btnPrimary}>
                <span>Попробовать бесплатно</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12m-6-6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/enter-code" className={styles.btnSecondary}>
                <span>Есть код школы</span>
              </Link>
            </motion.div>

            <motion.div className={styles.heroStats} variants={fadeInUp}>
              <div className={styles.stat}>
                <div className={styles.statNumber}>10,000+</div>
                <div className={styles.statLabel}>Учителей</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>50,000+</div>
                <div className={styles.statLabel}>Учеников</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>500+</div>
                <div className={styles.statLabel}>Школ</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.heroVisual}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={styles.mockup}>
              <div className={styles.mockupWindow}>
                <div className={styles.mockupHeader}>
                  <div className={styles.mockupDots}>
                    <span></span><span></span><span></span>
                  </div>
                  <div className={styles.mockupTitle}>OpenSchool Dashboard</div>
                </div>
                <div className={styles.mockupContent}>
                  <div className={styles.mockupCard}>
                    <div className={styles.mockupIcon}>🤖</div>
                    <div className={styles.mockupText}>
                      <div className={styles.mockupLabel}>AI Ассистент</div>
                      <div className={styles.mockupDesc}>Автоматическая проверка ДЗ</div>
                    </div>
                  </div>
                  <div className={styles.mockupCard}>
                    <div className={styles.mockupIcon}>📊</div>
                    <div className={styles.mockupText}>
                      <div className={styles.mockupLabel}>Аналитика</div>
                      <div className={styles.mockupDesc}>Прогресс в реальном времени</div>
                    </div>
                  </div>
                  <div className={styles.mockupCard}>
                    <div className={styles.mockupIcon}>⚡</div>
                    <div className={styles.mockupText}>
                      <div className={styles.mockupLabel}>Автоматизация</div>
                      <div className={styles.mockupDesc}>Экономия 10+ часов в неделю</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Секция возможностей */}
      <section className={styles.features} id="features">
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.sectionTitle}>
              Мощные инструменты для <span className={styles.gradientText}>умного обучения</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Все что нужно учителям, ученикам и родителям в одной платформе
            </p>
          </motion.div>

          <div className={styles.featuresGrid}>
            {[
              {
                icon: "🤖",
                title: "AI Проверка ДЗ",
                description: "Автоматическая проверка домашних заданий с детальной обратной связью",
                color: "#E0D4F6"
              },
              {
                icon: "📝",
                title: "Генератор планов",
                description: "Создание КТП, поурочных планов и целей обучения за минуты",
                color: "#C2F0E2"
              },
              {
                icon: "📊",
                title: "Аналитика успеваемости",
                description: "Визуализация прогресса учеников в реальном времени",
                color: "#F6DADF"
              },
              {
                icon: "🎮",
                title: "Интерактивные материалы",
                description: "Создание игр, квизов и интерактивных упражнений",
                color: "#E0D4F6"
              },
              {
                icon: "👨‍🏫",
                title: "Персональный тьютор",
                description: "AI-ассистент для учеников с объяснениями и подсказками",
                color: "#C2F0E2"
              },
              {
                icon: "📱",
                title: "Родительский контроль",
                description: "Мониторинг прогресса детей и связь с учителями",
                color: "#F6DADF"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={styles.featureCard}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                style={{ '--card-color': feature.color }}
              >
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDesc}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Секция преимуществ */}
      <section className={styles.benefits} id="benefits">
        <div className={styles.container}>
          <div className={styles.benefitsContent}>
            <motion.div
              className={styles.benefitsText}
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={styles.benefitsTitle}>
                Экономьте время,
                <br />
                <span className={styles.gradientText}>улучшайте результаты</span>
              </h2>
              <div className={styles.benefitsList}>
                <div className={styles.benefitItem}>
                  <div className={styles.benefitIcon}>⚡</div>
                  <div className={styles.benefitText}>
                    <h4>Автоматизация рутины</h4>
                    <p>Экономьте до 10 часов в неделю на проверке работ и планировании</p>
                  </div>
                </div>
                <div className={styles.benefitItem}>
                  <div className={styles.benefitIcon}>🎯</div>
                  <div className={styles.benefitText}>
                    <h4>Персонализация обучения</h4>
                    <p>AI адаптирует материалы под уровень каждого ученика</p>
                  </div>
                </div>
                <div className={styles.benefitItem}>
                  <div className={styles.benefitIcon}>📈</div>
                  <div className={styles.benefitText}>
                    <h4>Рост успеваемости</h4>
                    <p>Средний рост оценок на 20% за первый семестр</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className={styles.benefitsVisual}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.statsCard}>
                <div className={styles.statsCardHeader}>
                  <h4>Статистика платформы</h4>
                  <span className={styles.statsCardBadge}>В реальном времени</span>
                </div>
                <div className={styles.statsCardBody}>
                  <div className={styles.statsCardItem}>
                    <div className={styles.statsCardLabel}>Проверено работ сегодня</div>
                    <div className={styles.statsCardValue}>12,547</div>
                    <div className={styles.statsCardTrend}>+18% за неделю</div>
                  </div>
                  <div className={styles.statsCardItem}>
                    <div className={styles.statsCardLabel}>Сэкономлено времени</div>
                    <div className={styles.statsCardValue}>3,245 ч</div>
                    <div className={styles.statsCardTrend}>+25% за месяц</div>
                  </div>
                  <div className={styles.statsCardItem}>
                    <div className={styles.statsCardLabel}>Средняя оценка</div>
                    <div className={styles.statsCardValue}>4.8/5</div>
                    <div className={styles.statsCardTrend}>От учителей</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Секция аудитории */}
      <section className={styles.audience} id="audience">
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.sectionTitle}>
              Создано для <span className={styles.gradientText}>всех участников</span> образования
            </h2>
            <p className={styles.sectionSubtitle}>
              Удобные инструменты для каждой роли
            </p>
          </motion.div>

          <div className={styles.audienceGrid}>
            {[
              {
                role: "Учителя",
                icon: "👨‍🏫",
                description: "Автоматизация проверки, планирования и аналитики",
                features: ["Проверка ДЗ за минуты", "Генератор материалов", "Журнал успеваемости"],
                color: "#E0D4F6"
              },
              {
                role: "Ученики",
                icon: "👨‍🎓",
                description: "Персональный AI-тьютор и интерактивное обучение",
                features: ["Помощь с уроками 24/7", "Игровые задания", "Отслеживание прогресса"],
                color: "#C2F0E2"
              },
              {
                role: "Родители",
                icon: "👪",
                description: "Контроль успеваемости и связь со школой",
                features: ["Мониторинг прогресса", "Чат с учителями", "Домашние задания"],
                color: "#F6DADF"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className={styles.audienceCard}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                style={{ '--audience-color': item.color }}
              >
                <div className={styles.audienceIcon}>{item.icon}</div>
                <h3 className={styles.audienceRole}>{item.role}</h3>
                <p className={styles.audienceDesc}>{item.description}</p>
                <ul className={styles.audienceFeatures}>
                  {item.features.map((feature, i) => (
                    <li key={i}>
                      <span className={styles.checkIcon}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className={styles.cta}>
        <div className={styles.ctaBackground}>
          <div className={styles.ctaOrb1}></div>
          <div className={styles.ctaOrb2}></div>
        </div>

        <div className={styles.container}>
          <motion.div
            className={styles.ctaContent}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.ctaTitle}>
              Готовы начать?
              <br />
              <span className={styles.gradientText}>Попробуйте бесплатно прямо сейчас</span>
            </h2>
            <p className={styles.ctaSubtitle}>
              Без кредитной карты. Полный доступ на 14 дней.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/self-register" className={styles.ctaBtnPrimary}>
                <span>Начать бесплатно</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12m-6-6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/enter-code" className={styles.ctaBtnSecondary}>
                <span>Есть код школы</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerBrand}>
              <div className={styles.footerLogo}>
                <img src="/logo.png" alt="OpenSchool Logo" />
                <span>OpenSchool AI</span>
              </div>
              <p className={styles.footerDesc}>
                Образование будущего с искусственным интеллектом
              </p>
            </div>

            <div className={styles.footerLinks}>
              <div className={styles.footerColumn}>
                <h4>Платформа</h4>
                <ul>
                  <li><a href="#features">Возможности</a></li>
                  <li><a href="#benefits">Преимущества</a></li>
                  <li><a href="#audience">Для кого</a></li>
                  <li><a href="#pricing">Тарифы</a></li>
                </ul>
              </div>

              <div className={styles.footerColumn}>
                <h4>Начать</h4>
                <ul>
                  <li><Link to="/self-register">Регистрация</Link></li>
                  <li><Link to="/enter-code">Код школы</Link></li>
                  <li><Link to="/login">Войти</Link></li>
                </ul>
              </div>

              <div className={styles.footerColumn}>
                <h4>Роли</h4>
                <ul>
                  <li><Link to="/login">Для учителей</Link></li>
                  <li><Link to="/login">Для учеников</Link></li>
                  <li><Link to="/login">Для родителей</Link></li>
                  <li><Link to="/schooladmin/login">Для школ</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>&copy; 2025 OpenSchool AI. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
