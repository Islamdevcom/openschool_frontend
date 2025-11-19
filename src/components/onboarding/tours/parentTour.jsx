/**
 * Онбординг-тур для Parents Page
 * Обзор основных функций для родителей
 */

export const getParentTourSteps = (t) => [
  {
    target: 'body',
    content: (
      <div>
        <h3>{t('onboarding.parent.welcome.title')}</h3>
        <p>{t('onboarding.parent.welcome.description')}</p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-child-selector]',
    content: (
      <div>
        <h3>{t('onboarding.parent.childSelector.title')}</h3>
        <p>{t('onboarding.parent.childSelector.description')}</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-quick-stats]',
    content: (
      <div>
        <h3>{t('onboarding.parent.quickStats.title')}</h3>
        <p>{t('onboarding.parent.quickStats.description')}</p>
      </div>
    ),
    placement: 'right',
  },
  {
    target: '[data-teacher-list]',
    content: (
      <div>
        <h3>{t('onboarding.parent.teacherList.title')}</h3>
        <p>{t('onboarding.parent.teacherList.description')}</p>
      </div>
    ),
    placement: 'right',
  },
  {
    target: '[data-ai-chat]',
    content: (
      <div>
        <h3>{t('onboarding.parent.aiChat.title')}</h3>
        <p>{t('onboarding.parent.aiChat.description')}</p>
      </div>
    ),
    placement: 'left',
  },
  {
    target: '[data-quick-questions]',
    content: (
      <div>
        <h3>{t('onboarding.parent.quickQuestions.title')}</h3>
        <p>{t('onboarding.parent.quickQuestions.description')}</p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '[data-profile]',
    content: (
      <div>
        <h3>{t('onboarding.parent.profile.title')}</h3>
        <p>{t('onboarding.parent.profile.description')}</p>
      </div>
    ),
    placement: 'left',
  },
];
