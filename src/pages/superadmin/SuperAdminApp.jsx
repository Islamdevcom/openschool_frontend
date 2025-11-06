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

  // Schools list state
  const [schools, setSchools] = useState([]);
  const [schoolsLoading, setSchoolsLoading] = useState(true);

  // Admins list state
  const [admins, setAdmins] = useState([]);
  const [adminsLoading, setAdminsLoading] = useState(true);

  // Admin form state
  const [adminForm, setAdminForm] = useState({
    full_name: '',
    email: '',
    school_id: '',
    password: ''
  });

  // Force scrollbar to prevent layout shift - SIMPLE APPROACH
  useEffect(() => {
    // Add class to HTML element (highest priority)
    const html = document.documentElement;
    html.classList.add('superadmin-active');

    return () => {
      html.classList.remove('superadmin-active');
    };
  }, []);

  // Load schools and admins on mount
  useEffect(() => {
    console.log('🚀 SuperAdminApp mounted! Starting to fetch data...');
    fetchSchools();
    fetchAdmins();
  }, []);

  // Fetch schools from API
  const fetchSchools = async () => {
    setSchoolsLoading(true);
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('❌ No token found');
        setSchoolsLoading(false);
        return;
      }

      console.log('📋 Fetching schools list from:', `${API_URL}${API_ENDPOINTS.SUPERADMIN_SCHOOLS}`);

      const response = await fetch(`${API_URL}${API_ENDPOINTS.SUPERADMIN_SCHOOLS}`, {
        method: 'GET',
        headers: getAuthHeaders(token)
      });

      console.log('📡 Response status:', response.status);

      const data = await handleApiResponse(response);

      console.log('✅ Schools loaded - Raw data:', data);
      console.log('📊 Data type:', typeof data);
      console.log('📊 Is array:', Array.isArray(data));

      // Handle different response formats
      let schoolsList = [];

      if (Array.isArray(data)) {
        // Data is already an array
        schoolsList = data;
      } else if (data && Array.isArray(data.schools)) {
        // Data is wrapped in object with 'schools' key
        schoolsList = data.schools;
      } else if (data && Array.isArray(data.data)) {
        // Data is wrapped in object with 'data' key
        schoolsList = data.data;
      } else if (data && typeof data === 'object') {
        // Data is a single object, wrap in array
        schoolsList = [data];
      }

      console.log('📋 Processed schools list:', schoolsList);
      console.log('📊 Schools count:', schoolsList.length);

      setSchools(schoolsList);
    } catch (err) {
      console.error('❌ Failed to fetch schools:', err);
      console.error('Error details:', err.message);

      // Show user-friendly error for validation issues
      if (err.message && err.message.includes('validation errors')) {
        console.warn('⚠️ Бэкенд вернул ошибку валидации. Вероятно, в БД есть школы без обязательных полей (address, max_users).');
        // Keep empty array - don't break UI
      }

      // Keep empty array on error
      setSchools([]);
    } finally {
      setSchoolsLoading(false);
    }
  };

  // Fetch admins from API
  const fetchAdmins = async () => {
    setAdminsLoading(true);
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('❌ No token found for admins');
        setAdminsLoading(false);
        return;
      }

      console.log('👤 Fetching admins list from:', `${API_URL}${API_ENDPOINTS.SUPERADMIN_ADMINS}`);

      const response = await fetch(`${API_URL}${API_ENDPOINTS.SUPERADMIN_ADMINS}`, {
        method: 'GET',
        headers: getAuthHeaders(token)
      });

      console.log('📡 Admins response status:', response.status);

      const data = await handleApiResponse(response);

      console.log('✅ Admins loaded - Raw data:', data);

      // Handle different response formats
      let adminsList = [];

      if (Array.isArray(data)) {
        adminsList = data;
      } else if (data && Array.isArray(data.admins)) {
        adminsList = data.admins;
      } else if (data && Array.isArray(data.data)) {
        adminsList = data.data;
      } else if (data && typeof data === 'object') {
        adminsList = [data];
      }

      console.log('👤 Processed admins list:', adminsList);
      console.log('📊 Admins count:', adminsList.length);

      setAdmins(adminsList);
    } catch (err) {
      console.error('❌ Failed to fetch admins:', err);
      console.error('Error details:', err.message);
      setAdmins([]);
    } finally {
      setAdminsLoading(false);
    }
  };

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

  // Transform schools data for DataTable
  const getSchoolsData = () => {
    if (schoolsLoading) {
      console.log('🔄 Schools loading...');
      return {
        columns: ['Название', 'Код', 'Пользователей', 'Статус', 'Действия'],
        rows: []
      };
    }

    console.log('📊 getSchoolsData called with schools:', schools);
    console.log('📊 Schools length:', schools.length);

    if (schools.length > 0) {
      console.log('📊 First school structure:', schools[0]);
    }

    return {
      columns: ['Название', 'Код', 'Пользователей', 'Статус', 'Действия'],
      rows: schools.map((school, index) => {
        console.log(`📋 Processing school ${index}:`, school);

        return {
          id: school.id || index,
          data: [
            {
              type: 'complex',
              content: {
                title: school.name || school.title || 'Без названия',
                subtitle: school.address || school.location || 'Адрес не указан'
              }
            },
            { type: 'code', content: school.code || school.school_code || '-' },
            {
              type: 'text',
              content: (school.users_count || school.usersCount || school.user_count || 0).toString()
            },
            {
              type: 'status',
              content: (school.is_active !== false && school.isActive !== false) ? 'Активна' : 'Неактивна',
              color: (school.is_active !== false && school.isActive !== false) ? '#28a745' : '#dc3545'
            },
            { type: 'actions', content: ['edit', 'toggle', 'delete'] }
          ]
        };
      })
    };
  };

  // Transform admins data for DataTable
  const getAdminsData = () => {
    if (adminsLoading) {
      console.log('🔄 Admins loading...');
      return {
        columns: ['ФИО', 'Email', 'Школа', 'Последний вход', 'Действия'],
        rows: []
      };
    }

    console.log('👤 getAdminsData called with admins:', admins);
    console.log('📊 Admins length:', admins.length);

    if (admins.length > 0) {
      console.log('👤 First admin structure:', admins[0]);
    }

    return {
      columns: ['ФИО', 'Email', 'Школа', 'Последний вход', 'Действия'],
      rows: admins.map((admin, index) => {
        console.log(`👤 Processing admin ${index}:`, admin);

        // Find school name by ID
        const school = schools.find(s => s.id === admin.school_id);
        const schoolName = school ? school.name : admin.school_name || 'Школа не указана';

        // Format last login time
        const lastLogin = admin.last_login
          ? new Date(admin.last_login).toLocaleString('ru-RU')
          : admin.lastLogin || 'Не входил';

        return {
          id: admin.id || index,
          data: [
            { type: 'text', content: admin.full_name || admin.name || 'Без имени' },
            { type: 'text', content: admin.email || '-' },
            { type: 'text', content: schoolName },
            { type: 'text', content: lastLogin },
            { type: 'actions', content: ['reset-password', 'delete'] }
          ]
        };
      })
    };
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
    } else if (modalId === 'createAdmin') {
      setAdminForm({
        full_name: '',
        email: '',
        school_id: '',
        password: ''
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

      // Refresh schools list
      await fetchSchools();

    } catch (err) {
      console.error('❌ Failed to create school:', err);
      setFormError(err.message || 'Ошибка при создании школы');
    } finally {
      setFormLoading(false);
    }
  };

  const handleAdminFormChange = (field, value) => {
    setAdminForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Не авторизован. Войдите в систему.');
      }

      // Validate form
      if (!adminForm.full_name || !adminForm.email || !adminForm.school_id || !adminForm.password) {
        throw new Error('Заполните все обязательные поля');
      }

      console.log('👤 Creating admin:', adminForm);

      const response = await fetch(`${API_URL}${API_ENDPOINTS.SUPERADMIN_CREATE_SCHOOL_ADMIN}`, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify({
          full_name: adminForm.full_name,
          email: adminForm.email,
          school_id: parseInt(adminForm.school_id),
          password: adminForm.password
        })
      });

      const data = await handleApiResponse(response);

      console.log('✅ Admin created successfully:', data);

      // Show success message
      alert(`✅ Администратор "${adminForm.full_name}" успешно назначен!`);

      closeModal();

      // Refresh admins list
      await fetchAdmins();

    } catch (err) {
      console.error('❌ Failed to create admin:', err);
      setFormError(err.message || 'Ошибка при назначении администратора');
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
          <form onSubmit={handleCreateAdmin}>
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
              <label className={styles.label}>ФИО: *</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Введите ФИО"
                value={adminForm.full_name}
                onChange={(e) => handleAdminFormChange('full_name', e.target.value)}
                required
                disabled={formLoading}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email: *</label>
              <input
                type="email"
                className={styles.input}
                placeholder="schooladmin@openschool.com"
                value={adminForm.email}
                onChange={(e) => handleAdminFormChange('email', e.target.value)}
                required
                disabled={formLoading}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Школа: *</label>
              <select
                className={styles.select}
                value={adminForm.school_id}
                onChange={(e) => handleAdminFormChange('school_id', e.target.value)}
                required
                disabled={formLoading}
              >
                <option value="">Выберите школу</option>
                {schools
                  .filter(school => school.is_active !== false)
                  .map(school => (
                    <option key={school.id} value={school.id}>
                      {school.name}
                    </option>
                  ))
                }
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Пароль: *</label>
              <input
                type="password"
                className={styles.input}
                placeholder="Введите пароль"
                value={adminForm.password}
                onChange={(e) => handleAdminFormChange('password', e.target.value)}
                required
                disabled={formLoading}
              />
            </div>
            <button
              type="submit"
              className={styles.btnPrimary}
              disabled={formLoading}
            >
              {formLoading ? '⏳ Назначение...' : '✅ Назначить администратора'}
            </button>
          </form>
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
        console.log('🏫 Rendering schools section');
        console.log('🔄 schoolsLoading:', schoolsLoading);
        console.log('📊 schools.length:', schools.length);
        console.log('📋 schools array:', schools);

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
            {(() => {
              if (schoolsLoading) {
                console.log('⏳ Showing loading state');
                return (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                    ⏳ Загрузка списка школ...
                  </div>
                );
              }

              if (schools.length === 0) {
                console.log('📋 Showing empty state');
                return (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                    📋 Школ пока нет. Создайте первую школу!
                  </div>
                );
              }

              console.log('✅ Showing schools table with', schools.length, 'schools');
              return <DataTable data={getSchoolsData()} />;
            })()}
          </ContentSection>
        );
      
      case 'admins':
        console.log('👤 Rendering admins section');
        console.log('🔄 adminsLoading:', adminsLoading);
        console.log('📊 admins.length:', admins.length);
        console.log('📋 admins array:', admins);

        return (
          <ContentSection
            title="Администраторы школ"
            showAddButton={true}
            addButtonText="➕ Назначить админа"
            onAddClick={() => openModal('createAdmin')}
          >
            {(() => {
              if (adminsLoading) {
                console.log('⏳ Showing loading state for admins');
                return (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                    ⏳ Загрузка списка администраторов...
                  </div>
                );
              }

              if (admins.length === 0) {
                console.log('📋 Showing empty state for admins');
                return (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                    👤 Администраторов пока нет. Назначьте первого админа!
                  </div>
                );
              }

              console.log('✅ Showing admins table with', admins.length, 'admins');
              return <DataTable data={getAdminsData()} />;
            })()}
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