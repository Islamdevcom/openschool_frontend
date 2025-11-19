/**
 * Онбординг-тур для Landing Page
 * Краткий обзор платформы и возможностей
 */

export const getLandingTourSteps = (t) => [
  {
    target: 'body',
    content: (
      <div>
        <h3>{t('onboarding.landing.welcome.title')}</h3>
        <p>{t('onboarding.landing.welcome.description')}</p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '#teachers',
    content: (
      <div>
        <h3>{t('onboarding.landing.features.title')}</h3>
        <p>{t('onboarding.landing.features.description')}</p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '[data-hero-buttons]',
    content: (
      <div>
        <h3>{t('onboarding.landing.getStarted.title')}</h3>
        <p style={{ whiteSpace: 'pre-line' }}>
          {t('onboarding.landing.getStarted.description')}
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-login-btn]',
    content: (
      <div>
        <h3>{t('onboarding.landing.hasAccount.title')}</h3>
        <p>{t('onboarding.landing.hasAccount.description')}</p>
      </div>
    ),
    placement: 'bottom',
  },
];
