import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/superadmin/Sidebar';
import Header from '../../components/superadmin/Header';
import StatsGrid from '../../components/superadmin/StatsGrid';
import ContentSection from '../../components/superadmin/ContentSection';
import DataTable from '../../components/superadmin/DataTable';
import Modal from '../../components/superadmin/Modal';
import SearchInput from '../../components/superadmin/SearchInput';
import { API_URL, API_ENDPOINTS, getAuthHeaders, handleApiResponse } from '../../config/api';
import styles from './SuperAdminApp.module.css';
import './superadmin-global.css';

const SuperAdminApp = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeModal, setActiveModal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Form states
  const [schoolForm, setSchoolForm] = useState({
    name: '',
    address: '',
    code: '',
    max_users: 500
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // Force scrollbar to prevent layout shift - SIMPLE APPROACH
  useEffect(() => {
    // Add class to HTML element (highest priority)
    const html = document.documentElement;
    html.classList.add('superadmin-active');

    return () => {
      html.classList.remove('superadmin-active');
    };
  }, []);

  const sidebarItems = [
    { id: 'dashboard', label: '📊 Главная', title: 'Главная панель' },
    { id: 'schools', label: '🏫 Управление школами', title: 'Управление школами' },
    { id: 'admins', label: '👤 Администраторы', title: 'Администраторы школ' },
    { id: 'users', label: '👥 Пользователи', title: 'Управление пользователями' },
    { id: 'access', label: '🔐 Доступы и режимы', title: 'Управление доступами и режимами' },
    { id: 'support', label: '💬 Поддержка', title: 'Поддержка и обращения' },
    { id: 'settings', label: '⚙️ Настройки', title: 'Системные настройки' },
    { id: 'demo', label: '🧪 Демо-доступ', title: 'Демо-доступ' }
  ];

  const statsData = [
    {
      icon: '🏫',
      value: '24',
      label: 'Активных школ',
      gradient: 'linear-gradient(45deg, #667eea, #764ba2)'
    },
    {
      icon: '👥',
      value: '1,247',
      label: 'Пользователей',
      gradient: 'linear-gradient(45deg, #28a745, #20c997)'
    },
    {
      icon: '🟢',
      value: '89',
      label: 'Активных сессий',
      gradient: 'linear-gradient(45deg, #ffc107, #fd7e14)'
    },
    {
      icon: '💬',
      value: '3',
      label: 'Новых обращений',
      gradient: 'linear-gradient(45deg, #dc3545, #e83e8c)'
    }
  ];

  const schoolsData = {
    columns: ['Название', 'Код', 'Пользователей', 'Статус', 'Действия'],
    rows: [
      {
        id: 1,
        data: [
          {
            type: 'complex',
            content: {
              title: 'Школа №1',
              subtitle: 'Москва, ул. Ленина, 1'
            }
          },
          { type: 'code', content: 'SCH001' },
          { type: 'text', content: '127' },
          { type: 'status', content: 'Активна', color: '#28a745' },
          { type: 'actions', content: ['edit', 'toggle', 'delete'] }
        ]
      },
      {
        id: 2,
        data: [
          {
            type: 'complex',
            content: {
              title: 'Гимназия №5',
              subtitle: 'Спб, пр. Невский, 100'
            }
          },
          { type: 'code', content: 'GYM005' },
          { type: 'text', content: '89' },
          { type: 'status', content: 'Активна', color: '#28a745' },
          { type: 'actions', content: ['edit', 'toggle', 'delete'] }
        ]
      }
    ]
  };

  const adminsData = {
    columns: ['ФИО', 'Email', 'Школа', 'Последний вход', 'Действия'],
    rows: [
      {
        id: 1,
        data: [
          { type: 'text', content: 'Иванов Иван Иванович' },
          { type: 'text', content: 'ivanov@school1.ru' },
          { type: 'text', content: 'Школа №1' },
          { type: 'text', content: 'Сегодня, 14:32' },
          { type: 'actions', content: ['reset-password', 'delete'] }
        ]
      },
      {
        id: 2,
        data: [
          { type: 'text', content: 'Петрова Анна Сергеевна' },
          { type: 'text', content: 'petrova@gym5.ru' },
          { type: 'text', content: 'Гимназия №5' },
          { type: 'text', content: 'Вчера, 16:45' },
          { type: 'actions', content: ['reset-password', 'delete'] }
        ]
      }
    ]
  };

  const usersData = {
    columns: ['ФИО', 'Email', 'Роль', 'Школа', 'Режим доступа', 'Действия'],
    rows: [
      {
        id: 1,
        data: [
          { type: 'text', content: 'Сидоров Петр Петрович' },
          { type: 'text', content: 'sidorov@school1.ru' },
          { type: 'badge', content: 'Учитель', color: '#28a745' },
          { type: 'text', content: 'Школа №1' },
          { type: 'text', content: 'strict' },
          { type: 'actions', content: ['edit', 'toggle'] }
        ]
      },
      {
        id: 2,
        data: [
          { type: 'text', content: 'Козлова Мария Александровна' },
          { type: 'text', content: 'kozlova@gym5.ru' },
          { type: 'badge', content: 'Ученик', color: '#ffc107' },
          { type: 'text', content: 'Гимназия №5' },
          { type: 'text', content: '-' },
          { type: 'actions', content: ['edit', 'toggle'] }
        ]
      }
    ]
  };

  const accessData = {
    columns: ['Пользователь', 'Текущий режим', 'Тестовый доступ', 'Действия'],
    rows: [
      {
        id: 1,
        data: [
          { type: 'text', content: 'Сидоров П.П.' },
          { type: 'badge', content: 'strict', color: '#28a745' },
          { type: 'text', content: '-' },
          { type: 'actions', content: ['edit', 'demo'] }
        ]
      },
      {
        id: 2,
        data: [
          { type: 'text', content: 'Иванова А.А.' },
          { type: 'badge', content: 'hybrid', color: '#ffc107' },
          { type: 'text', content: 'До 20.07.2025', color: '#dc3545' },
          { type: 'actions', content: ['edit', 'delete'] }
        ]
      }
    ]
  };

  const supportData = {
    columns: ['Дата', 'Пользователь', 'Тема', 'Статус', 'Действия'],
    rows: [
      {
        id: 1,
        data: [
          { type: 'text', content: '14.07.2025' },
          { type: 'text', content: 'Петров А.В.' },
          { type: 'text', content: 'Не могу создать урок' },
          { type: 'status', content: 'Новое', color: '#dc3545' },
          { type: 'actions', content: ['reply', 'resolve'] }
        ]
      },
      {
        id: 2,
        data: [
          { type: 'text', content: '13.07.2025' },
          { type: 'text', content: 'Смирнова О.И.' },
          { type: 'text', content: 'Проблемы с доступом' },
          { type: 'status', content: 'Решено', color: '#28a745' },
          { type: 'actions', content: ['view'] }
        ]
      }
    ]
  };

  const activityData = {
    columns: ['Время', 'Пользователь', 'Действие', 'Школа'],
    rows: [
      {
        id: 1,
        data: [
          { type: 'text', content: '14:32' },
          { type: 'text', content: 'Иванов И.И.' },
          { type: 'text', content: 'Вход в систему' },
          { type: 'text', content: 'Школа №1' }
        ]
      },
      {
        id: 2,
        data: [
          { type: 'text', content: '14:15' },
          { type: 'text', content: 'Петрова А.С.' },
          { type: 'text', content: 'Создание урока' },
          { type: 'text', content: 'Гимназия №5' }
        ]
      },
      {
        id: 3,
        data: [
          { type: 'text', content: '13:45' },
          { type: 'text', content: 'Сидоров П.П.' },
          { type: 'text', content: 'Регистрация' },
          { type: 'text', content: 'Лицей №12' }
        ]
      }
    ]
  };

  const getCurrentPageTitle = () => {
    const item = sidebarItems.find(item => item.id === activeSection);
    return item ? item.title : 'Главная панель';
  };

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  };

  const openModal = (modalId) => {
    setActiveModal(modalId);
    setFormError('');
    // Reset form when opening
    if (modalId === 'createSchool') {
      setSchoolForm({
        name: '',
        address: '',
        code: '',
        max_users: 500
      });
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setFormError('');
    setFormLoading(false);
  };

  const handleSchoolFormChange = (field, value) => {
    setSchoolForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateSchool = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Не авторизован. Войдите в систему.');
      }

      // Validate form
      if (!schoolForm.name || !schoolForm.address || !schoolForm.code) {
        throw new Error('Заполните все обязательные поля');
      }

      console.log('🏫 Creating school:', schoolForm);

      const response = await fetch(`${API_URL}${API_ENDPOINTS.SUPERADMIN_CREATE_SCHOOL}`, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify({
          name: schoolForm.name,
          address: schoolForm.address,
          code: schoolForm.code,
          max_users: parseInt(schoolForm.max_users) || 500
        })
      });

      const data = await handleApiResponse(response);

      console.log('✅ School created successfully:', data);

      // Show success message
      alert(`✅ Школа "${schoolForm.name}" успешно создана!`);

      closeModal();

      // TODO: Refresh schools list

    } catch (err) {
      console.error('❌ Failed to create school:', err);
      setFormError(err.message || 'Ошибка при создании школы');
    } finally {
      setFormLoading(false);
    }
  };

  const renderModalContent = () => {
    switch(activeModal) {
      case 'createSchool':
        return (
          <form onSubmit={handleCreateSchool}>
            {formError && (
              <div style={{
                color: '#dc2626',
                backgroundColor: '#fee2e2',
                padding: '12px 16px',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '14px',
                border: '1px solid #fecaca'
              }}>
                ❌ {formError}
              </div>
            )}

            <div className={styles.formGroup}>
              <label className={styles.label}>Название школы: *</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Введите название школы"
                value={schoolForm.name}
                onChange={(e) => handleSchoolFormChange('name', e.target.value)}
                required
                disabled={formLoading}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Адрес: *</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Введите адрес школы"
                value={schoolForm.address}
                onChange={(e) => handleSchoolFormChange('address', e.target.value)}
                required
                disabled={formLoading}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Код школы: *</label>
              <input
                type="text"
                className={styles.input}
                placeholder="SCH001"
                value={schoolForm.code}
                onChange={(e) => handleSchoolFormChange('code', e.target.value)}
                required
                disabled={formLoading}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Максимум пользователей:</label>
              <input
                type="number"
                className={styles.input}
                value={schoolForm.max_users}
                onChange={(e) => handleSchoolFormChange('max_users', e.target.value)}
                min="1"
                disabled={formLoading}
              />
            </div>
            <button
              type="submit"
              className={styles.btnPrimary}
              disabled={formLoading}
            >
              {formLoading ? '⏳ Создание...' : '✅ Создать школу'}
            </button>
          </form>
        );
      
      case 'createAdmin':
        return (
          <div>
            <div className={styles.formGroup}>
              <label className={styles.label}>ФИО:</label>
              <input type="text" className={styles.input} placeholder="Введите ФИО" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email:</label>
              <input type="email" className={styles.input} placeholder="admin@school.ru" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Школа:</label>
              <select className={styles.select}>
                <option value="">Выберите школу</option>
                <option value="1">Школа №1</option>
                <option value="2">Гимназия №5</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Пароль:</label>
              <input type="password" className={styles.input} placeholder="Введите пароль" />
            </div>
            <button className={styles.btnPrimary} onClick={() => handleFormSubmit()}>
              Назначить администратора
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    const titles = {
      createSchool: 'Создание новой школы',
      createAdmin: 'Назначение администратора'
    };
    return titles[activeModal] || '';
  };

  const renderSectionContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return (
          <div>
            <StatsGrid stats={statsData} />
            <ContentSection 
              title="Последняя активность"
              showAddButton={false}
            >
              <DataTable data={activityData} />
            </ContentSection>
          </div>
        );
      
      case 'schools':
        return (
          <ContentSection 
            title="Управление школами"
            showAddButton={true}
            addButtonText="➕ Создать школу"
            onAddClick={() => openModal('createSchool')}
            showSearch={true}
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Поиск школ..."
          >
            <DataTable data={schoolsData} />
          </ContentSection>
        );
      
      case 'admins':
        return (
          <ContentSection 
            title="Администраторы школ"
            showAddButton={true}
            addButtonText="➕ Назначить админа"
            onAddClick={() => openModal('createAdmin')}
          >
            <DataTable data={adminsData} />
          </ContentSection>
        );
      
      case 'users':
        return (
          <ContentSection 
            title="Управление пользователями"
            showAddButton={false}
          >
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Выберите школу:</label>
                <select className={styles.select}>
                  <option value="">Все школы</option>
                  <option value="1">Школа №1</option>
                  <option value="2">Гимназия №5</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Роль:</label>
                <select className={styles.select}>
                  <option value="">Все роли</option>
                  <option value="teacher">Учитель</option>
                  <option value="student">Ученик</option>
                  <option value="assistant">Ассистент</option>
                </select>
              </div>
            </div>
            <DataTable data={usersData} />
          </ContentSection>
        );
      
      case 'access':
        return (
          <ContentSection 
            title="Управление доступами и режимами"
            showAddButton={false}
          >
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Пользователь:</label>
                <select className={styles.select}>
                  <option value="">Выберите пользователя</option>
                  <option value="1">Сидоров П.П. (Учитель)</option>
                  <option value="2">Иванова А.А. (Учитель)</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Режим доступа:</label>
                <select className={styles.select}>
                  <option value="strict">Strict - обычный учитель школы</option>
                  <option value="hybrid">Hybrid - может вести своих учеников</option>
                  <option value="individual">Individual - индивидуальный преподаватель</option>
                </select>
              </div>
            </div>
            <div className={styles.actionsContainer}>
              <button className={styles.btnPrimary}>Применить изменения</button>
              <button className={`${styles.btnWarning} ${styles.marginLeft}`}>
                🧪 Предоставить тестовый доступ
              </button>
            </div>
            <DataTable data={accessData} />
          </ContentSection>
        );
      
      case 'support':
        return (
          <ContentSection 
            title="Поддержка и обращения"
            showAddButton={false}
          >
            <DataTable data={supportData} />
          </ContentSection>
        );
      
      case 'settings':
        return (
          <ContentSection 
            title="Системные настройки"
            showAddButton={false}
          >
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Максимум пользователей в школе:</label>
                <input type="number" className={styles.input} defaultValue="500" min="1" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Максимальный размер файла (МБ):</label>
                <input type="number" className={styles.input} defaultValue="10" min="1" max="100" />
              </div>
            </div>
            <button className={styles.btnPrimary}>Сохранить настройки</button>
          </ContentSection>
        );
      
      case 'demo':
        return (
          <ContentSection 
            title="Демо-доступ"
            showAddButton={false}
          >
            <div className={styles.formGroup}>
              <label className={styles.label}>Предоставить демо-доступ пользователю:</label>
              <select className={styles.select}>
                <option value="">Выберите пользователя</option>
                <option value="1">Сидоров П.П.</option>
                <option value="2">Иванова А.А.</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Срок действия (дни):</label>
              <input type="number" className={styles.input} defaultValue="7" min="1" max="30" />
            </div>
            <button className={styles.btnPrimary}>Предоставить доступ</button>
          </ContentSection>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar 
        items={sidebarItems}
        activeItem={activeSection}
        onItemClick={handleSectionChange}
      />
      
      <div className={styles.mainContent}>
        <Header 
          title={getCurrentPageTitle()}
          user={{
            avatar: 'SA',
            name: 'Суперадмин',
            email: 'admin@openschool.com'
          }}
        />
        
        <div className={styles.contentWrapper}>
          {renderSectionContent()}
        </div>
      </div>

      {activeModal && (
        <Modal 
          title={getModalTitle()}
          onClose={closeModal}
        >
          {renderModalContent()}
        </Modal>
      )}
    </div>
  );
};

export default SuperAdminApp;