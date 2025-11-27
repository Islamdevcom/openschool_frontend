import React, { useState, useEffect } from 'react';
import Header from '../../components/schooladmin/Header';
import DashboardCard from '../../components/schooladmin/DashboardCard';
import QuickActions from '../../components/schooladmin/QuickActions';
import Modal from '../../components/schooladmin/Modal';
import ManageSubjectsPage from '../../components/schooladmin/ManageSubjectsPage';
import Notification from '../../components/schooladmin/Notification';
import styles from './SchoolAdminApp.module.css';

const SchoolAdminApp = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [isSubjectsModalOpen, setIsSubjectsModalOpen] = useState(false);
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
      actions: ['➕ Создать класс', '📅 Расписание', '🔗 Связи', '📚 Предметы']
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
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Имя преподавателя</label>
              <input type="text" className={styles.formInput} placeholder="Введите имя" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Предметы</label>
              <select className={styles.formSelect}>
                <option>Математика</option>
                <option>Русский язык</option>
                <option>Физика</option>
                <option>Химия</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Режим доступа</label>
              <select className={styles.formSelect}>
                <option>Strict - только школьные группы</option>
                <option>Hybrid - может вести доп. образование</option>
              </select>
            </div>
            <button className={styles.btnPrimary} onClick={() => handleFormSubmit('teachers')}>
              Добавить преподавателя
            </button>
          </div>
        );
      
      case 'students':
        return (
          <div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Имя ученика</label>
              <input type="text" className={styles.formInput} placeholder="Введите имя" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Класс</label>
              <select className={styles.formSelect}>
                <option>7А</option>
                <option>7Б</option>
                <option>8А</option>
                <option>8Б</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Логин</label>
              <input type="text" className={styles.formInput} placeholder="Введите логин" />
            </div>
            <button className={styles.btnPrimary} onClick={() => handleFormSubmit('students')}>
              Добавить ученика
            </button>
          </div>
        );
      
      case 'subjects':
        return (
          <div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Название класса</label>
              <input type="text" className={styles.formInput} placeholder="Например, 7А" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Классный руководитель</label>
              <select className={styles.formSelect}>
                <option>Иванова А.П.</option>
                <option>Петров С.И.</option>
                <option>Сидорова М.В.</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Предмет</label>
              <select className={styles.formSelect}>
                <option>Математика</option>
                <option>Русский язык</option>
                <option>Физика</option>
              </select>
            </div>
            <button className={styles.btnPrimary} onClick={() => handleFormSubmit('subjects')}>
              Создать класс
            </button>
          </div>
        );
      
      case 'reports':
        return (
          <div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Тип отчёта</label>
              <select className={styles.formSelect}>
                <option>Активность преподавателей</option>
                <option>Успеваемость учеников</option>
                <option>Прогресс по предметам</option>
                <option>История входов</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Период</label>
              <select className={styles.formSelect}>
                <option>Последняя неделя</option>
                <option>Последний месяц</option>
                <option>Последняя четверть</option>
                <option>Весь учебный год</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Формат</label>
              <select className={styles.formSelect}>
                <option>PDF</option>
                <option>Excel</option>
                <option>CSV</option>
              </select>
            </div>
            <button className={styles.btnPrimary} onClick={() => handleFormSubmit('reports')}>
              Создать отчёт
            </button>
          </div>
        );
      
      case 'access':
        return (
          <div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Преподаватель</label>
              <select className={styles.formSelect}>
                <option>Иванова А.П.</option>
                <option>Петров С.И.</option>
                <option>Сидорова М.В.</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Роль</label>
              <select className={styles.formSelect}>
                <option>Преподаватель</option>
                <option>Ассистент</option>
                <option>Стажёр</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Разрешения</label>
              <select className={styles.formSelect}>
                <option>Полный доступ</option>
                <option>Только просмотр</option>
                <option>Создание учеников (Hybrid)</option>
                <option>Временный доступ</option>
              </select>
            </div>
            <button className={styles.btnPrimary} onClick={() => handleFormSubmit('access')}>
              Применить настройки
            </button>
          </div>
        );
      
      case 'settings':
        return (
          <div>
            <h3 className={styles.settingsSection}>🏫 Основные настройки</h3>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Название школы</label>
              <input type="text" className={styles.formInput} defaultValue="Гимназия №42" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Адрес</label>
              <input type="text" className={styles.formInput} placeholder="Введите адрес школы" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Код школы</label>
              <input type="text" className={styles.formInput} defaultValue="GYM42" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Максимальное количество пользователей</label>
              <input type="number" className={styles.formInput} defaultValue="1000" />
            </div>

            <h3 className={styles.settingsSection}>📊 Настройки журнала</h3>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Включить типы оценивания</label>
              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" defaultChecked={true} />
                  <span>ФО (Формативное оценивание)</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" defaultChecked={true} />
                  <span>СОР (Суммативное оценивание за раздел)</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" defaultChecked={true} />
                  <span>СОЧ (Суммативное оценивание за четверть)</span>
                </label>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Формула расчета четвертной оценки</label>
              <select className={styles.formSelect} id="grading-formula">
                <option value="bilimland">Билимланд (ФО+СОР=50%, СОЧ=50%)</option>
                <option value="mon2025">МОН РК 2025 (ФО=25%, СОР=25%, СОЧ=50%)</option>
                <option value="custom">Кастомная формула</option>
              </select>
            </div>

            <div className={styles.formGroup} id="custom-formula-section" style={{ display: 'none' }}>
              <label className={styles.formLabel}>Настройка процентов (сумма должна = 100%)</label>
              <div className={styles.percentInputs}>
                <div className={styles.percentInput}>
                  <label>ФО (%)</label>
                  <input type="number" min="0" max="100" defaultValue="25" />
                </div>
                <div className={styles.percentInput}>
                  <label>СОР (%)</label>
                  <input type="number" min="0" max="100" defaultValue="25" />
                </div>
                <div className={styles.percentInput}>
                  <label>СОЧ (%)</label>
                  <input type="number" min="0" max="100" defaultValue="50" />
                </div>
              </div>
            </div>

            <h3 className={styles.settingsSection}>📅 Календарь учебного года</h3>

            <div className={styles.quartersGrid}>
              <div className={styles.quarterCard}>
                <h4>1 четверть</h4>
                <div className={styles.dateInputs}>
                  <input type="date" className={styles.dateInput} defaultValue="2024-09-01" />
                  <span>—</span>
                  <input type="date" className={styles.dateInput} defaultValue="2024-10-31" />
                </div>
              </div>
              <div className={styles.quarterCard}>
                <h4>2 четверть</h4>
                <div className={styles.dateInputs}>
                  <input type="date" className={styles.dateInput} defaultValue="2024-11-01" />
                  <span>—</span>
                  <input type="date" className={styles.dateInput} defaultValue="2024-12-31" />
                </div>
              </div>
              <div className={styles.quarterCard}>
                <h4>3 четверть</h4>
                <div className={styles.dateInputs}>
                  <input type="date" className={styles.dateInput} defaultValue="2025-01-10" />
                  <span>—</span>
                  <input type="date" className={styles.dateInput} defaultValue="2025-03-20" />
                </div>
              </div>
              <div className={styles.quarterCard}>
                <h4>4 четверть</h4>
                <div className={styles.dateInputs}>
                  <input type="date" className={styles.dateInput} defaultValue="2025-04-01" />
                  <span>—</span>
                  <input type="date" className={styles.dateInput} defaultValue="2025-05-25" />
                </div>
              </div>
            </div>

            <button className={styles.btnPrimary} onClick={() => handleFormSubmit('settings')}>
              💾 Сохранить все настройки
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

  // Обработка выбора формулы расчета
  useEffect(() => {
    const formulaSelect = document.getElementById('grading-formula');
    const customSection = document.getElementById('custom-formula-section');

    if (formulaSelect && customSection) {
      const handleFormulaChange = () => {
        if (formulaSelect.value === 'custom') {
          customSection.style.display = 'block';
        } else {
          customSection.style.display = 'none';
        }
      };

      formulaSelect.addEventListener('change', handleFormulaChange);
      return () => formulaSelect.removeEventListener('change', handleFormulaChange);
    }
  }, [activeModal]);

  // Debug logging
  console.log('🎯 SchoolAdminApp rendering');
  console.log('📋 dashboardData length:', dashboardData.length);
  console.log('📦 dashboardData:', dashboardData.map(d => d.title));

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.dashboardGrid}>
        {dashboardData.map((card) => (
          <DashboardCard
            key={card.id}
            {...card}
            onClick={() => openModal(card.id)}
            onActionClick={(action) => {
              if (action === '📚 Предметы') {
                setIsSubjectsModalOpen(true);
              } else {
                showNotification(`Действие "${action}" выполняется...`, 'info');
              }
            }}
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

      {isSubjectsModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
          overflow: 'auto',
          padding: '20px'
        }}>
          <div style={{
            position: 'relative',
            maxWidth: '1400px',
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '20px',
            minHeight: '80vh'
          }}>
            <button
              onClick={() => setIsSubjectsModalOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f0f0f0',
                border: 'none',
                borderRadius: '8px',
                fontSize: '18px',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              ✕
            </button>
            <ManageSubjectsPage />
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolAdminApp;