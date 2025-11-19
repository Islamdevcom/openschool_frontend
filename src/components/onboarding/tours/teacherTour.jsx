/**
 * Онбординг-тур для Teacher App
 * Обзор основных функций для преподавателя
 */

export const teacherTourSteps = [
  {
    target: 'body',
    content: (
      <div>
        <h3>Добро пожаловать в кабинет преподавателя!</h3>
        <p>
          Давайте познакомимся с вашими инструментами.
          OpenSchool.ai поможет вам экономить до 10 часов в неделю!
        </p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '.nav',
    content: (
      <div>
        <h3>Категории инструментов</h3>
        <p>
          Все инструменты разделены по категориям:<br/>
          <strong>Планирование</strong> - планы уроков, цели обучения<br/>
          <strong>Создание</strong> - тесты, вопросы, материалы<br/>
          <strong>Поддержка</strong> - помощь ученикам<br/>
          <strong>Обучение</strong> - дискуссии, оценки<br/>
          <strong>Студенты</strong> - управление учениками
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '.search-bar',
    content: (
      <div>
        <h3>Поиск инструментов</h3>
        <p>
          Используйте поиск для быстрого доступа к нужному инструменту.
          Например, попробуйте "план урока" или "тест".
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tool-card]:first-child',
    content: (
      <div>
        <h3>AI-инструменты</h3>
        <p>
          Каждая карточка - это AI-помощник для конкретной задачи.
          Кликните на любую карточку, чтобы начать работу.
        </p>
      </div>
    ),
    placement: 'top',
    disableBeacon: true,
  },
  {
    target: '[data-nav-tab="Студенты"]',
    content: (
      <div>
        <h3>Управление учениками</h3>
        <p>
          В разделе "Студенты" вы можете добавлять учеников в группы,
          просматривать их прогресс и общаться с родителями.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-discipline-selector]',
    content: (
      <div>
        <h3>Выбор дисциплины</h3>
        <p>
          Выберите предмет и класс для персонализации AI-помощников
          под вашу программу обучения.
        </p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-profile-dropdown]',
    content: (
      <div>
        <h3>Профиль и настройки</h3>
        <p>
          Здесь вы найдете настройки, аналитику, журналы
          и сможете посмотреть обучение заново.
        </p>
      </div>
    ),
    placement: 'left',
  },
];
