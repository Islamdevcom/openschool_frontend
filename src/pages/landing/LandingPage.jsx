import React from "react";
import { Link } from "react-router-dom";
import OnboardingTour from "../../components/onboarding/OnboardingTour";
import { useOnboarding } from "../../components/onboarding/hooks/useOnboarding";
import { landingTourSteps } from "../../components/onboarding/tours/landingTour.jsx";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  const { runTour, handleTourCallback } = useOnboarding('landing', true, 2000);

  return (
    <div className={styles.landingPage}>
      <OnboardingTour
        steps={landingTourSteps}
        run={runTour}
        callback={handleTourCallback}
      />

      <header>
        <nav>
          <div className={styles.logoSection}>
            <img
              src="/logo.png"
              alt="OpenSchool Logo"
            />
            <div>OpenSchool.ai</div>
          </div>
          <ul className={styles.navLinks}>
            <li><a href="#teachers">Для преподавателей</a></li>
            <li><a href="#students">Для учеников</a></li>
            <li><a href="#schools">Для школ</a></li>
            <li><a href="#districts">Для районов</a></li>
          </ul>
          <Link to="/login" className={styles.loginBtn} data-login-btn>Вход</Link>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.container}>
          <h1>Добро пожаловать в OpenSchool.ai</h1>
          <p className={styles.heroSubtitle}>AI-платформа для современного образования</p>
          <p className={styles.heroDescription}>
            Построено преподавателями для преподавателей. OpenSchool.ai упрощает вашу работу,
            автоматизирует рутинные задачи и помогает сосредоточиться на главном — обучении.
            Ваши данные и данные учеников в полной безопасности.
          </p>
          <div className={styles.heroButtons} data-hero-buttons>
            <Link to="/self-register" className={styles.btnPrimary}>
              Начать бесплатно
            </Link>
            <Link to="/enter-code" className={styles.btnSecondary}>
              Зарегистрироваться через школу
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.features} id="teachers">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Все для образования в одном месте</h2>
          <p className={styles.sectionSubtitle}>
            Мощные инструменты для преподавателей, учеников и школ
          </p>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>👨‍🏫</div>
              <h3>Для преподавателей</h3>
              <p>
                Сократите рутину — сосредоточьтесь на обучении. Создавайте задания,
                отслеживайте прогресс учеников, общайтесь с родителями.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>👨‍🎓</div>
              <h3>Для учеников</h3>
              <p>
                Получайте задания онлайн, отслеживайте свой прогресс, задавайте вопросы
                преподавателю и работайте в удобном кабинете.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>👪</div>
              <h3>Для родителей</h3>
              <p>
                Контролируйте процесс обучения ребёнка, получайте отчёты по успеваемости,
                общайтесь с преподавателями.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.audience} id="students">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Кому подходит OpenSchool.ai</h2>
          <p className={styles.sectionSubtitle}>
            Платформа разработана для всех участников образовательного процесса
          </p>
          <div className={styles.audienceGrid}>
            <div className={styles.audienceCard}>
              <h3>Преподаватели</h3>
              <p>
                OpenSchool.ai помогает вести учеников, создавать задания, проверять работы
                с помощью ИИ и экономить до 10 часов в неделю на рутинных задачах.
              </p>
            </div>
            <div className={styles.audienceCard}>
              <h3>Ученики</h3>
              <p>
                Решай задачи, получай мгновенные подсказки от ИИ-помощника, отслеживай
                свой прогресс и учись в удобном темпе.
              </p>
            </div>
            <div className={styles.audienceCard}>
              <h3>Родители</h3>
              <p>
                Контролируйте процесс обучения ребёнка, получайте отчёты по успеваемости,
                будьте в курсе всех заданий и оценок.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.schoolsDistricts} id="schools">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Решения для школ и районов</h2>
          <p className={styles.sectionSubtitle}>
            Масштабируемые решения для образовательных учреждений
          </p>
          <div className={styles.schoolsGrid}>
            <div className={styles.schoolCard}>
              <div className={styles.schoolIcon}>🏫</div>
              <h3>Для школ</h3>
              <p>
                Автоматизируйте управление учебным процессом, расписания и учёта с помощью ИИ
              </p>
              <ul>
                <li>Управление всеми классами и преподавателями</li>
                <li>Автоматическое составление расписания</li>
                <li>Аналитика успеваемости по школе</li>
                <li>Интеграция с существующими системами</li>
                <li>Безопасность данных на уровне школы</li>
              </ul>
            </div>
            <div className={styles.schoolCard} id="districts">
              <div className={styles.schoolIcon}>🏛️</div>
              <h3>Для районов</h3>
              <p>
                Централизованное управление образованием на уровне района или города
              </p>
              <ul>
                <li>Управление несколькими школами</li>
                <li>Сводная аналитика по району</li>
                <li>Распределение ресурсов и кадров</li>
                <li>Отчётность для администрации</li>
                <li>Стандартизация образовательного процесса</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2>Готовы начать?</h2>
          <p>Присоединяйтесь к тысячам преподавателей, которые уже используют OpenSchool.ai</p>
          <div className={styles.ctaButtons}>
            <Link to="/self-register" className={styles.ctaBtn}>
              Попробовать бесплатно
            </Link>
            <Link to="/enter-code" className={styles.btnSecondary}>
              Есть код школы?
            </Link>
          </div>
        </div>
      </section>

      <footer>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerSection}>
              <h3>Платформа</h3>
              <ul>
                <li><a href="#teachers">Для преподавателей</a></li>
                <li><a href="#students">Для учеников</a></li>
                <li><a href="#schools">Для школ</a></li>
                <li><a href="#districts">Для районов</a></li>
              </ul>
            </div>
            <div className={styles.footerSection}>
              <h3>Начать работу</h3>
              <ul>
                <li><Link to="/self-register">Регистрация</Link></li>
                <li><Link to="/enter-code">Код школы</Link></li>
                <li><Link to="/login">Вход</Link></li>
              </ul>
            </div>
            <div className={styles.footerSection}>
              <h3>Роли</h3>
              <ul>
                <li><Link to="/login">Для преподавателей</Link></li>
                <li><Link to="/login">Для учеников</Link></li>
                <li><Link to="/login">Для родителей</Link></li>
                <li><Link to="/schooladmin/login">Для школ</Link></li>
              </ul>
            </div>
            <div className={styles.footerSection}>
              <h3>О платформе</h3>
              <ul>
                <li><a href="#teachers">Возможности</a></li>
                <li><a href="#schools">Безопасность</a></li>
                <li><Link to="/login">Поддержка</Link></li>
              </ul>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; 2024 OpenSchool.ai. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
