/**
 * Онбординг-тур для Teacher App
 * Обзор основных функций для преподавателя
 */

export const getTeacherTourSteps = (t) => [
  {
    target: 'body',
    content: (
      <div>
        <h3>{t('onboarding.teacher.welcome.title')}</h3>
        <p>{t('onboarding.teacher.welcome.description')}</p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '.nav',
    content: (
      <div>
        <h3>{t('onboarding.teacher.categories.title')}</h3>
        <p>{t('onboarding.teacher.categories.description')}</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '.search-bar',
    content: (
      <div>
        <h3>{t('onboarding.teacher.search.title')}</h3>
        <p>{t('onboarding.teacher.search.description')}</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tool-card]:first-child',
    content: (
      <div>
        <h3>{t('onboarding.teacher.tools.title')}</h3>
        <p>{t('onboarding.teacher.tools.description')}</p>
      </div>
    ),
    placement: 'top',
    disableBeacon: true,
  },
  {
    target: '[data-nav-tab="Студенты"]',
    content: (
      <div>
        <h3>{t('onboarding.teacher.students.title')}</h3>
        <p>{t('onboarding.teacher.students.description')}</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-discipline-selector]',
    content: (
      <div>
        <h3>{t('onboarding.teacher.discipline.title')}</h3>
        <p>{t('onboarding.teacher.discipline.description')}</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-profile-dropdown]',
    content: (
      <div>
        <h3>{t('onboarding.teacher.profile.title')}</h3>
        <p>{t('onboarding.teacher.profile.description')}</p>
      </div>
    ),
    placement: 'left',
  },
];
