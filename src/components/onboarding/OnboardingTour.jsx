import React from 'react';
import Joyride from 'react-joyride';

/**
 * Компонент для отображения онбординг-тура
 * @param {Array} steps - массив шагов тура
 * @param {boolean} run - запустить ли тур
 * @param {function} callback - callback-функция для обработки событий
 * @param {boolean} continuous - показывать ли кнопки навигации (по умолчанию true)
 * @param {boolean} showProgress - показывать ли прогресс-бар (по умолчанию true)
 * @param {boolean} showSkipButton - показывать ли кнопку "Пропустить" (по умолчанию true)
 * @param {boolean} disableScrolling - отключить ли прокрутку к элементам (по умолчанию false)
 */
const OnboardingTour = ({
  steps,
  run,
  callback,
  continuous = true,
  showProgress = true,
  showSkipButton = true,
  disableScrolling = false,
}) => {
  return (
    <Joyride
      steps={steps}
      run={run}
      continuous={continuous}
      showSkipButton={showSkipButton}
      showProgress={showProgress}
      disableScrolling={disableScrolling}
      callback={callback}
      locale={{
        back: 'Назад',
        close: 'Закрыть',
        last: 'Завершить',
        next: 'Далее',
        open: 'Открыть',
        skip: 'Пропустить тур',
      }}
      styles={{
        options: {
          arrowColor: '#667eea',
          backgroundColor: '#fff',
          primaryColor: '#667eea',
          textColor: '#2d3748',
          overlayColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: 12,
          padding: 20,
          fontSize: 16,
          lineHeight: 1.6,
        },
        tooltipContainer: {
          textAlign: 'left',
        },
        tooltipTitle: {
          fontSize: 18,
          fontWeight: 700,
          marginBottom: 10,
          color: '#667eea',
        },
        tooltipContent: {
          padding: '10px 0',
        },
        buttonNext: {
          backgroundColor: '#667eea',
          borderRadius: 8,
          padding: '10px 20px',
          fontSize: 15,
          fontWeight: 600,
          outline: 'none',
          border: 'none',
        },
        buttonBack: {
          color: '#667eea',
          marginRight: 10,
          fontSize: 15,
          fontWeight: 600,
        },
        buttonSkip: {
          color: '#718096',
          fontSize: 14,
        },
        buttonClose: {
          color: '#718096',
          fontSize: 20,
          padding: 5,
        },
        spotlight: {
          borderRadius: 8,
        },
        overlay: {
          cursor: 'default',
        },
      }}
      floaterProps={{
        disableAnimation: false,
        styles: {
          arrow: {
            length: 8,
            spread: 16,
          },
          floater: {
            filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.2))',
          },
        },
      }}
    />
  );
};

export default OnboardingTour;
