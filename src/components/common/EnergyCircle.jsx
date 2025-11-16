import React from 'react';
import styles from './EnergyCircle.module.css';

const EnergyCircle = ({ energy = 10, maxEnergy = 10, onClick }) => {
  // Определить цвет круга на основе энергии
  const getEnergyColor = () => {
    if (energy >= 7) return '#4ade80'; // Зеленый
    if (energy >= 3) return '#fbbf24'; // Желтый/оранжевый
    return '#ef4444'; // Красный
  };

  // Процент заполнения круга
  const percentage = (energy / maxEnergy) * 100;
  const circumference = 2 * Math.PI * 18; // radius = 18
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className={styles.energyCircle}
      onClick={onClick}
      style={{ cursor: energy === 0 ? 'pointer' : 'default' }}
    >
      <svg width="48" height="48" className={styles.svg}>
        {/* Фоновый круг */}
        <circle
          cx="24"
          cy="24"
          r="18"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="3"
        />
        {/* Прогресс круг */}
        <circle
          cx="24"
          cy="24"
          r="18"
          fill="none"
          stroke={getEnergyColor()}
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 24 24)"
          className={styles.progressCircle}
        />
      </svg>
      {/* Текст энергии внутри */}
      <div className={styles.energyText}>
        {energy}
      </div>
    </div>
  );
};

export default EnergyCircle;
