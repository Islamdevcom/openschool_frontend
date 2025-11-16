import React from 'react';
import styles from './ProUpgradeModal.module.css';

const ProUpgradeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleUpgrade = () => {
    // TODO: Интеграция с платежной системой
    alert('Переход на страницу оплаты... (в разработке)');
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>

        <div className={styles.header}>
          <div className={styles.icon}>⚡</div>
          <h2>Энергия закончилась!</h2>
        </div>

        <div className={styles.content}>
          <p className={styles.description}>
            У вас закончилась бесплатная энергия для использования ИИ-ассистента.
            Обновитесь до Pro версии для неограниченного доступа!
          </p>

          <div className={styles.features}>
            <h3>OpenSchool Pro включает:</h3>
            <ul>
              <li>
                <span className={styles.checkmark}>✓</span>
                <span>Неограниченные вопросы к ИИ-ассистенту</span>
              </li>
              <li>
                <span className={styles.checkmark}>✓</span>
                <span>Приоритетная поддержка</span>
              </li>
              <li>
                <span className={styles.checkmark}>✓</span>
                <span>Расширенная аналитика</span>
              </li>
              <li>
                <span className={styles.checkmark}>✓</span>
                <span>Экспорт данных в PDF</span>
              </li>
            </ul>
          </div>

          <div className={styles.pricing}>
            <div className={styles.plan}>
              <div className={styles.planName}>Pro Monthly</div>
              <div className={styles.price}>
                <span className={styles.amount}>2000</span>
                <span className={styles.currency}>₸/месяц</span>
              </div>
            </div>
            <div className={styles.plan}>
              <div className={styles.planName}>Pro Yearly</div>
              <div className={styles.price}>
                <span className={styles.amount}>20000</span>
                <span className={styles.currency}>₸/год</span>
              </div>
              <div className={styles.badge}>Экономия 2 месяца!</div>
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.upgradeBtn} onClick={handleUpgrade}>
              Обновиться до Pro
            </button>
            <button className={styles.cancelBtn} onClick={onClose}>
              Может позже
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProUpgradeModal;
