import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <header>
        <nav className="container">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="OpenSchool Logo"
              className="w-10 h-10 object-contain"
            />
            <div className="logo text-xl font-bold">OpenSchool.ai</div>
          </div>
          <ul className="nav-links">
            <li><a href="#teachers">Для преподавателей</a></li>
            <li><a href="#students">Для учеников</a></li>
            <li><a href="#schools">Для школ</a></li>
            <li><a href="#districts">Для районов</a></li>
          </ul>
          <Link to="/auth" className="login-btn">Вход</Link>
        </nav>
      </header>

      <section className="hero">
        <div className="container">
          <h1>Добро пожаловать в OpenSchool.ai</h1>
          <p className="hero-subtitle">AI-помощник для преподавателей и учеников</p>
          <p className="hero-description">
            Построено преподавателями для преподавателей. OpenSchool.ai упрощает вашу работу, сохраняя ваши данные и данные учеников в безопасности.
          </p>
          <div className="hero-buttons">
            <Link to="/auth" className="btn-primary">Начать бесплатно</Link>
            <a href="#teachers" className="btn-secondary">Узнать больше</a>
            <Link to="/teacher" className="btn-secondary">Демо: Кабинет преподавателя</Link>
          </div>
        </div>
      </section>

      <section className="features" id="teachers">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👨‍🏫</div>
              <h3>Для преподавателей</h3>
              <p>Сократите рутину — сосредоточьтесь на обучении.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏫</div>
              <h3>Для школ</h3>
              <p>Автоматизируйте расписания, уроки и учёт с помощью ИИ</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍🎓</div>
              <h3>Для учеников</h3>
              <p>Получайте помощь и задания от своего преподавателя онлайн</p>
            </div>
          </div>
        </div>
      </section>

      <section className="audience" id="students">
        <div className="container">
          <div className="audience-grid">
            <div className="audience-card">
              <h3>Преподаватели</h3>
              <p>OpenSchool.ai помогает вести учеников, создавать задания и экономить время.</p>
            </div>
            <div className="audience-card">
              <h3>Ученики</h3>
              <p>Решай задачи, получай подсказки и отслеживай свой прогресс в удобном кабинете.</p>
            </div>
            <div className="audience-card">
              <h3>Родители</h3>
              <p>Контролируйте процесс обучения ребёнка и получайте отчёты по успеваемости.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Готовы начать?</h2>
          <p>Тысячи преподавателей уже используют OpenSchool.ai</p>
          <Link to="/auth" className="cta-btn">Попробовать бесплатно</Link>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Платформа</h3>
              <ul>
                <li><a href="#">Возможности</a></li>
                <li><a href="#">Цены</a></li>
                <li><a href="#">Безопасность</a></li>
                <li><a href="#">API</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Ресурсы</h3>
              <ul>
                <li><a href="#">Документация</a></li>
                <li><a href="#">Центр поддержки</a></li>
                <li><a href="#">Блог</a></li>
                <li><a href="#">Сообщество</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Компания</h3>
              <ul>
                <li><a href="#">О нас</a></li>
                <li><a href="#">Карьера</a></li>
                <li><a href="#">Пресса</a></li>
                <li><a href="#">Контакты</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Юридическое</h3>
              <ul>
                <li><a href="#">Политика конфиденциальности</a></li>
                <li><a href="#">Пользовательское соглашение</a></li>
                <li><a href="#">Политика cookie</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 OpenSchool.ai. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
