/**
 * Онбординг-тур для Landing Page
 * Краткий обзор платформы и возможностей
 */

export const landingTourSteps = [
  {
    target: 'body',
    content: (
      <div>
        <h3>Добро пожаловать в OpenSchool.ai!</h3>
        <p>
          Давайте быстро познакомимся с нашей платформой.
          Это займет всего минуту!
        </p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '#teachers',
    content: (
      <div>
        <h3>Возможности платформы</h3>
        <p>
          OpenSchool.ai - это полноценная образовательная платформа с ИИ-помощниками
          для преподавателей, учеников и родителей.
        </p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '[data-hero-buttons]',
    content: (
      <div>
        <h3>Начните прямо сейчас</h3>
        <p>
          <strong>"Начать бесплатно"</strong> - самостоятельная регистрация<br/>
          <strong>"Через школу"</strong> - регистрация с кодом от школы
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-login-btn]',
    content: (
      <div>
        <h3>Уже есть аккаунт?</h3>
        <p>
          Если вы уже зарегистрированы, нажмите "Вход" для доступа
          к личному кабинету.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
];
