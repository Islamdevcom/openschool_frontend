import { useState, useEffect } from 'react';

/**
 * Хук для управления онбординг-турами
 * @param {string} role - роль пользователя (teacher, student, parent, landing)
 * @param {boolean} autoStart - автоматически запускать тур при первом посещении (по умолчанию true)
 * @param {number} delay - задержка перед показом тура в мс (по умолчанию 1000)
 */
export const useOnboarding = (role, autoStart = true, delay = 1000) => {
  const [runTour, setRunTour] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const storageKey = `onboarding_${role}_completed`;

  useEffect(() => {
    if (!autoStart) return;

    // Проверяем, показывали ли уже тур для этой роли
    const hasSeenTour = localStorage.getItem(storageKey);

    if (!hasSeenTour) {
      // Небольшая задержка перед показом тура, чтобы страница успела загрузиться
      const timer = setTimeout(() => {
        setRunTour(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [role, autoStart, delay, storageKey]);

  /**
   * Callback-функция для обработки событий тура
   */
  const handleTourCallback = (data) => {
    const { status, type, index, action } = data;

    // Обрабатываем завершение или пропуск тура
    if (status === 'finished' || status === 'skipped') {
      setRunTour(false);
      localStorage.setItem(storageKey, 'true');
      setStepIndex(0);
    }

    // Обновляем индекс текущего шага
    if (type === 'step:after') {
      setStepIndex(index + 1);
    }

    // Если пользователь нажал "назад"
    if (action === 'prev') {
      setStepIndex(index - 1);
    }
  };

  /**
   * Сбросить тур (удалить из localStorage и запустить заново)
   */
  const resetTour = () => {
    localStorage.removeItem(storageKey);
    setRunTour(true);
    setStepIndex(0);
  };

  /**
   * Запустить тур вручную
   */
  const startTour = () => {
    setRunTour(true);
    setStepIndex(0);
  };

  /**
   * Остановить тур
   */
  const stopTour = () => {
    setRunTour(false);
    setStepIndex(0);
  };

  /**
   * Проверить, был ли пройден тур
   */
  const hasTourCompleted = () => {
    return !!localStorage.getItem(storageKey);
  };

  return {
    runTour,
    stepIndex,
    setRunTour,
    handleTourCallback,
    resetTour,
    startTour,
    stopTour,
    hasTourCompleted,
  };
};
