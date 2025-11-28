import { API_URL, API_ENDPOINTS, getAuthHeaders, handleApiResponse } from '../config/api';

/**
 * Вход для учителя или ученика
 * @param {string} email - Email пользователя
 * @param {string} password - Пароль
 * @returns {Promise<Object>} Данные пользователя с токеном
 */
export async function loginTeacherStudent(email, password) {
  const response = await fetch(`${API_URL}${API_ENDPOINTS.LOGIN_TEACHER_STUDENT}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ email, password })
  });

  const data = await handleApiResponse(response);

  // Проверяем что роль правильная
  if (data.role !== 'teacher' && data.role !== 'student') {
    throw new Error('Неверная роль пользователя. Используйте соответствующую страницу входа.');
  }

  return data;
}

/**
 * Вход для школьного администратора
 * @param {string} email - Email администратора
 * @param {string} password - Пароль
 * @returns {Promise<Object>} Данные пользователя с токеном
 */
export async function loginSchoolAdmin(email, password) {
  // Используем общий endpoint /auth/login, так как /auth/admin/login имеет проблемы с CORS
  console.log('🔐 Попытка входа как администратор школы...');
  console.log('📍 URL:', `${API_URL}${API_ENDPOINTS.LOGIN_TEACHER_STUDENT}`);

  const response = await fetch(`${API_URL}${API_ENDPOINTS.LOGIN_TEACHER_STUDENT}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ email, password })
  });

  const data = await handleApiResponse(response);
  console.log('📦 Ответ от сервера:', data);

  // Проверяем что роль действительно school_admin
  if (data.role !== 'school_admin') {
    throw new Error('Неверная роль пользователя. Требуется роль администратора школы.');
  }

  return data;
}

/**
 * Вход для суперадминистратора
 * @param {string} email - Email суперадмина
 * @param {string} password - Пароль
 * @returns {Promise<Object>} Данные пользователя с токеном
 */
export async function loginSuperAdmin(email, password) {
  const response = await fetch(`${API_URL}${API_ENDPOINTS.LOGIN_SUPERADMIN}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ email, password })
  });

  const data = await handleApiResponse(response);

  // Проверяем что роль действительно superadmin
  if (data.role !== 'superadmin') {
    throw new Error('Неверная роль пользователя. Требуется роль суперадминистратора.');
  }

  return data;
}

/**
 * Сохранить данные пользователя в localStorage
 * @param {Object} data - Данные от API (с access_token, role, email и т.д.)
 */
export function saveUserData(data) {
  localStorage.setItem('token', data.access_token);
  localStorage.setItem('role', data.role);
  localStorage.setItem('email', data.email);

  if (data.full_name) {
    localStorage.setItem('full_name', data.full_name);
  }

  if (data.school_id) {
    localStorage.setItem('school_id', data.school_id);
  }
}

/**
 * Очистить данные пользователя из localStorage
 */
export function clearUserData() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('email');
  localStorage.removeItem('full_name');
  localStorage.removeItem('school_id');
}

/**
 * Получить токен из localStorage
 * @returns {string|null} JWT токен или null
 */
export function getToken() {
  return localStorage.getItem('token');
}

/**
 * Получить роль пользователя из localStorage
 * @returns {string|null} Роль или null
 */
export function getUserRole() {
  return localStorage.getItem('role');
}

/**
 * Проверить авторизован ли пользователь
 * @returns {boolean}
 */
export function isAuthenticated() {
  return !!getToken();
}

/**
 * Проверить роль пользователя
 * @param {string} requiredRole - Требуемая роль
 * @returns {boolean}
 */
export function checkRole(requiredRole) {
  const role = getUserRole();
  return role === requiredRole;
}
