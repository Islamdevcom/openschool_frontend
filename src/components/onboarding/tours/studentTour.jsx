/**
 * Онбординг-тур для Student App
 * Обзор основных функций для ученика
 */

export const getStudentTourSteps = (t) => [
  {
    target: 'body',
    content: (
      <div>
        <h3>{t('onboarding.student.welcome.title')}</h3>
        <p>{t('onboarding.student.welcome.description')}</p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: 'header nav',
    content: (
      <div>
        <h3>{t('onboarding.student.navigation.title')}</h3>
        <p>{t('onboarding.student.navigation.description')}</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-section="dashboard"]',
    content: (
      <div>
        <h3>{t('onboarding.student.dashboard.title')}</h3>
        <p>{t('onboarding.student.dashboard.description')}</p>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '[data-section="chat"]',
    content: (
      <div>
        <h3>{t('onboarding.student.chat.title')}</h3>
        <p>{t('onboarding.student.chat.description')}</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-section="assignments"]',
    content: (
      <div>
        <h3>{t('onboarding.student.assignments.title')}</h3>
        <p>{t('onboarding.student.assignments.description')}</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-energy-circle]',
    content: (
      <div>
        <h3>{t('onboarding.student.energy.title')}</h3>
        <p>{t('onboarding.student.energy.description')}</p>
      </div>
    ),
    placement: 'left',
  },
  {
    target: '[data-profile]',
    content: (
      <div>
        <h3>{t('onboarding.student.profile.title')}</h3>
        <p>{t('onboarding.student.profile.description')}</p>
      </div>
    ),
    placement: 'left',
  },
];
