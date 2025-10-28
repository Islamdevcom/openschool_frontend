import React from 'react';
import styles from './HelpModal.module.css';

const HelpModal = ({ isOpen, onClose }) => {
  const handleSupportContact = () => {
    window.open("https://t.me/your_support_bot", "_blank");
  };

  const handleEmailSupport = () => {
    window.open("mailto:support@openschool-ai.com?subject=Помощь с OpenSchool AI", "_blank");
  };

  const faqItems = [
    {
      question: "Как добавить нового ученика?",
      answer: "Перейдите в 'Управление учениками' → нажмите 'Добавить ученика' → заполните форму и сохраните."
    },
    {
      question: "Как создать план урока?",
      answer: "Выберите инструмент 'План урока' на главной странице → укажите тему и параметры → ИИ создаст план автоматически."
    },
    {
      question: "Можно ли экспортировать данные учеников?",
      answer: "Функция экспорта будет доступна в следующих обновлениях. Пока данные сохраняются в системе."
    },
    {
      question: "Как изменить пароль?",
      answer: "Функция смены пароля находится в разработке и будет доступна в ближайшие обновления."
    },
    {
      question: "Где посмотреть статистику по ученикам?",
      answer: "Откройте раздел 'Статистика' в меню профиля для просмотра детальной аналитики."
    }
  ];

  const quickActions = [
    {
      title: "📚 Создать план урока",
      description: "Быстро создать структурированный план урока с помощью ИИ",
      action: () => console.log("Navigate to lesson plan")
    },
    {
      title: "👥 Добавить ученика",
      description: "Добавить нового ученика в систему",
      action: () => console.log("Open student modal")
    },
    {
      title: "📊 Посмотреть статистику",
      description: "Проанализировать успеваемость и активность учеников",
      action: () => console.log("Open analytics")
    }
  ];

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>❓ Помощь</h2>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        <div className={styles.content}>
          {/* Добро пожаловать */}
          <div className={styles.welcomeSection}>
            <div className={styles.welcomeIcon}>🎓</div>
            <h3>Добро пожаловать в OpenSchool AI!</h3>
            <p>Мы здесь, чтобы помочь вам эффективно использовать наши ИИ-инструменты для обучения.</p>
          </div>

          {/* Быстрые действия */}
          <div className={styles.section}>
            <h3>🚀 Быстрые действия</h3>
            <div className={styles.actionsList}>
              {quickActions.map((action, index) => (
                <button key={index} className={styles.actionBtn} onClick={action.action}>
                  <div className={styles.actionTitle}>{action.title}</div>
                  <div className={styles.actionDesc}>{action.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Часто задаваемые вопросы */}
          <div className={styles.section}>
            <h3>❓ Часто задаваемые вопросы</h3>
            <div className={styles.faqList}>
              {faqItems.map((item, index) => (
                <details key={index} className={styles.faqItem}>
                  <summary className={styles.faqQuestion}>{item.question}</summary>
                  <div className={styles.faqAnswer}>{item.answer}</div>
                </details>
              ))}
            </div>
          </div>

          {/* Связаться с поддержкой */}
          <div className={styles.section}>
            <h3>📞 Связаться с поддержкой</h3>
            <div className={styles.contactOptions}>
              <button className={styles.supportBtn} onClick={handleSupportContact}>
                <span className={styles.supportIcon}>💬</span>
                <div>
                  <div className={styles.supportTitle}>Telegram поддержка</div>
                  <div className={styles.supportDesc}>Быстрая помощь в чате</div>
                </div>
              </button>

              <button className={styles.supportBtn} onClick={handleEmailSupport}>
                <span className={styles.supportIcon}>📧</span>
                <div>
                  <div className={styles.supportTitle}>Email поддержка</div>
                  <div className={styles.supportDesc}>support@openschool-ai.com</div>
                </div>
              </button>
            </div>
          </div>

          {/* Полезные ресурсы */}
          <div className={styles.section}>
            <h3>📖 Полезные ресурсы</h3>
            <div className={styles.resourcesList}>
              <a href="#" className={styles.resourceLink}>📚 Руководство пользователя</a>
              <a href="#" className={styles.resourceLink}>🎥 Видео-уроки</a>
              <a href="#" className={styles.resourceLink}>💡 Советы и рекомендации</a>
              <a href="#" className={styles.resourceLink}>🔄 История обновлений</a>
            </div>
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <p>Версия OpenSchool AI: 1.0.0</p>
            <small>Если вы не нашли ответ на свой вопрос, обратитесь в службу поддержки</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
