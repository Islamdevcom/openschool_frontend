import React, { useState, useEffect } from 'react';
import Header from '../../components/schooladmin/Header';
import DashboardCard from '../../components/schooladmin/DashboardCard';
import QuickActions from '../../components/schooladmin/QuickActions';
import Modal from '../../components/schooladmin/Modal';
import Notification from '../../components/schooladmin/Notification';
import './SchoolAdminApp.css';

const SchoolAdminApp = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

const dashboardData = [
    {
      id: 'teachers',
      title: 'Управление преподавателями',
      icon: '🧑‍🏫',
      iconClass: 'teachersIcon',
      stats: [
        { number: '45', label: 'Всего' },
        { number: '42', label: 'Активных' },
        { number: '3', label: 'Новых' }
      ],
      actions: ['➕ Добавить', '📊 Excel импорт', '🔧 Настройки доступа']
    },
    {
      id: 'students',
      title: 'Управление учениками',
      icon: '👨‍🎓',
      iconClass: 'studentsIcon',
      stats: [
        { number: '756', label: 'Всего' },
        { number: '34', label: 'Классов' },
        { number: '12', label: 'Новых' }
      ],
      actions: ['➕ Добавить', '📥 Импорт', '📤 Экспорт']
    },
    {
      id: 'subjects',
      title: 'Учебная структура',
      icon: '📚',
      iconClass: 'subjectsIcon',
      stats: [
        { number: '18', label: 'Предметов' },
        { number: '89', label: 'Групп' },
        { number: '34', label: 'Классов' }
      ],
      actions: ['➕ Создать класс', '📅 Расписание', '🔗 Связи']
    },
    {
      id: 'reports',
      title: 'Статистика и отчёты',
      icon: '📊',
      iconClass: 'reportsIcon',
      stats: [
        { number: '85%', label: 'Активность' },
        { number: '92%', label: 'Успеваемость' },
        { number: '156', label: 'Заданий' }
      ],
      actions: ['📈 Активность', '📊 Успеваемость', '📥 Скачать']
    },
    {
      id: 'access',
      title: 'Контроль доступа',
      icon: '🔑',
      iconClass: 'accessIcon',
      stats: [
        { number: '45', label: 'Ролей' },
        { number: '12', label: 'Hybrid' },
        { number: '33', label: 'Strict' }
      ],
      actions: ['🛠 Роли', '⚠️ Ограничения', '🧪 Демо-доступ']
    },
    {
      id: 'settings',
      title: 'Настройки школы',
      icon: '⚙️',
      iconClass: 'settingsIcon',
      stats: [
        { number: '100%', label: 'Настроено' },
        { number: '5', label: 'Дней' },
        { number: '1000', label: 'Лимит' }
      ],
      actions: ['✏️ Редактировать', '🖼️ Логотип', '📅 Расписание']
    }
  ];

  const quickActionsData = [
    {
      icon: '📥',
      title: 'Импорт учеников',
      description: 'Загрузить списки классов из Excel',
      action: () => showNotification('Импорт учеников начат')
    },
    {
      icon: '📊',
      title: 'Генерация отчёта',
      description: 'Создать отчёт по успеваемости',
      action: () => showNotification('Отчёт генерируется')
    },
    {
      icon: '📢',
      title: 'Рассылка',
      description: 'Отправить уведомления всем',
      action: () => showNotification('Уведомления отправлены')
    },
    {
      icon: '💾',
      title: 'Резервная копия',
      description: 'Создать бэкап данных',
      action: () => showNotification('Резервная копия создана')
    }
  ];

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setActiveModal(null);
    
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const openModal = (modalId) => {
    setActiveModal(modalId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleFormSubmit = (modalId, formData) => {
    const messages = {
      teachers: 'Преподаватель добавлен',
      students: 'Ученик добавлен',
      subjects: 'Класс создан',
      reports: 'Отчёт генерируется',
      access: 'Доступ настроен',
      settings: 'Настройки сохранены'
    };
    
    showNotification(messages[modalId] || 'Действие выполнено');
  };

  const renderModalContent = () => {
    switch(activeModal) {
      case 'teachers':
        return (
          <div>
            <div className="form-group">
              <label className="form-label">Имя преподавателя</label>
              <input type="text" className="form-input" placeholder="Введите имя" />
            </div>
            <div className="form-group">
              <label className="form-label">Предметы</label>
              <select className="form-select">
                <option>Математика</option>
                <option>Русский язык</option>
                <option>Физика</option>
                <option>Химия</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Режим доступа</label>
              <select className="form-select">
                <option>Strict - только школьные группы</option>
                <option>Hybrid - может вести доп. образование</option>
              </select>
            </div>
            <button className="btn-primary" onClick={() => handleFormSubmit('teachers')}>
              Добавить преподавателя
            </button>
          </div>
        );
      
      case 'students':
        return (
          <div>
            <div className="form-group">
              <label className="form-label">Имя ученика</label>
              <input type="text" className="form-input" placeholder="Введите имя" />
            </div>
            <div className="form-group">
              <label className="form-label">Класс</label>
              <select className="form-select">
                <option>7А</option>
                <option>7Б</option>
                <option>8А</option>
                <option>8Б</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Логин</label>
              <input type="text" className="form-input" placeholder="Введите логин" />
            </div>
            <button className="btn-primary" onClick={() => handleFormSubmit('students')}>
              Добавить ученика
            </button>
          </div>
        );
      
      case 'subjects':
        return (
          <div>
            <div className="form-group">
              <label className="form-label">Название класса</label>
              <input type="text" className="form-input" placeholder="Например, 7А" />
            </div>
            <div className="form-group">
              <label className="form-label">Классный руководитель</label>
              <select className="form-select">
                <option>Иванова А.П.</option>
                <option>Петров С.И.</option>
                <option>Сидорова М.В.</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Предмет</label>
              <select className="form-select">
                <option>Математика</option>
                <option>Русский язык</option>
                <option>Физика</option>
              </select>
            </div>
            <button className="btn-primary" onClick={() => handleFormSubmit('subjects')}>
              Создать класс
            </button>
          </div>
        );
      
      case 'reports':
        return (
          <div>
            <div className="form-group">
              <label className="form-label">Тип отчёта</label>
              <select className="form-select">
                <option>Активность преподавателей</option>
                <option>Успеваемость учеников</option>
                <option>Прогресс по предметам</option>
                <option>История входов</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Период</label>
              <select className="form-select">
                <option>Последняя неделя</option>
                <option>Последний месяц</option>
                <option>Последняя четверть</option>
                <option>Весь учебный год</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Формат</label>
              <select className="form-select">
                <option>PDF</option>
                <option>Excel</option>
                <option>CSV</option>
              </select>
            </div>
            <button className="btn-primary" onClick={() => handleFormSubmit('reports')}>
              Создать отчёт
            </button>
          </div>
        );
      
      case 'access':
        return (
          <div>
            <div className="form-group">
              <label className="form-label">Преподаватель</label>
              <select className="form-select">
                <option>Иванова А.П.</option>
                <option>Петров С.И.</option>
                <option>Сидорова М.В.</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Роль</label>
              <select className="form-select">
                <option>Преподаватель</option>
                <option>Ассистент</option>
                <option>Стажёр</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Разрешения</label>
              <select className="form-select">
                <option>Полный доступ</option>
                <option>Только просмотр</option>
                <option>Создание учеников (Hybrid)</option>
                <option>Временный доступ</option>
              </select>
            </div>
            <button className="btn-primary" onClick={() => handleFormSubmit('access')}>
              Применить настройки
            </button>
          </div>
        );
      
      case 'settings':
        return (
          <div>
            <div className="form-group">
              <label className="form-label">Название школы</label>
              <input type="text" className="form-input" defaultValue="Гимназия №42" />
            </div>
            <div className="form-group">
              <label className="form-label">Адрес</label>
              <input type="text" className="form-input" placeholder="Введите адрес школы" />
            </div>
            <div className="form-group">
              <label className="form-label">Код школы</label>
              <input type="text" className="form-input" defaultValue="GYM42" />
            </div>
            <div className="form-group">
              <label className="form-label">Максимальное количество пользователей</label>
              <input type="number" className="form-input" defaultValue="1000" />
            </div>
            <button className="btn-primary" onClick={() => handleFormSubmit('settings')}>
              Сохранить настройки
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    const titles = {
      teachers: '🧑‍🏫 Управление преподавателями',
      students: '👨‍🎓 Управление учениками',
      subjects: '📚 Учебная структура',
      reports: '📊 Статистика и отчёты',
      access: '🔑 Контроль доступа',
      settings: '⚙️ Настройки школы'
    };
    return titles[activeModal] || '';
  };

  // Анимация карточек при загрузке
  useEffect(() => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.transition = 'all 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }, []);

  // Обработка клавиатурных сокращений
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey) {
        switch(e.key) {
          case 't':
            e.preventDefault();
            openModal('teachers');
            break;
          case 's':
            e.preventDefault();
            openModal('students');
            break;
          case 'r':
            e.preventDefault();
            openModal('reports');
            break;
        }
      }
      
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="container">
      <Header />
      
      <div className="dashboard-grid">
        {dashboardData.map((card) => (
          <DashboardCard 
            key={card.id}
            {...card}
            onClick={() => openModal(card.id)}
            onActionClick={(action) => showNotification(`Действие "${action}" выполняется...`, 'info')}
          />
        ))}
      </div>

      <QuickActions 
        actions={quickActionsData}
      />

      {activeModal && (
        <Modal 
          title={getModalTitle()}
          onClose={closeModal}
        >
          {renderModalContent()}
        </Modal>
      )}

      <Notification 
        show={notification.show}
        message={notification.message}
        type={notification.type}
      />
    </div>
  );
};

export default SchoolAdminApp;