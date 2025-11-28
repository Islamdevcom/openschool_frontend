import { API_URL, API_ENDPOINTS, getAuthHeaders, handleApiResponse } from '../config/api';

/**
 * API сервис для работы с дисциплинами (предметами)
 */

// ==================== ADMIN ENDPOINTS ====================

/**
 * Получить список доступных предметов для создания
 * @param {string} token - JWT токен
 * @returns {Promise<Object>} Список предметов и кодов
 */
export async function getAvailableSubjects(token) {
  const url = `${API_URL}${API_ENDPOINTS.ADMIN_AVAILABLE_SUBJECTS}`;
  console.log('🌐 Запрос к API:', url);
  console.log('🔑 Токен:', token ? `${token.substring(0, 20)}...` : 'НЕТ');

  const response = await fetch(url, {
    method: 'GET',
    headers: getAuthHeaders(token)
  });

  console.log('📨 Статус ответа:', response.status);
  const result = await handleApiResponse(response);
  console.log('📦 Результат:', result);

  return result;
}

/**
 * Получить всех учителей школы
 * @param {string} token - JWT токен
 * @returns {Promise<Array>} Список учителей
 */
export async function getSchoolTeachers(token) {
  const response = await fetch(`${API_URL}${API_ENDPOINTS.ADMIN_TEACHERS}`, {
    method: 'GET',
    headers: getAuthHeaders(token)
  });
  return handleApiResponse(response);
}

/**
 * Получить все дисциплины школы
 * @param {string} token - JWT токен
 * @returns {Promise<Array>} Список дисциплин с назначенными учителями
 */
export async function getSchoolDisciplines(token) {
  const response = await fetch(`${API_URL}${API_ENDPOINTS.ADMIN_DISCIPLINES}`, {
    method: 'GET',
    headers: getAuthHeaders(token)
  });
  return handleApiResponse(response);
}

/**
 * Создать новую дисциплину
 * @param {string} token - JWT токен
 * @param {Object} data - { subject: string, grade: number }
 * @returns {Promise<Object>} Созданная дисциплина
 */
export async function createDiscipline(token, data) {
  const response = await fetch(`${API_URL}${API_ENDPOINTS.ADMIN_DISCIPLINES}`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(data)
  });
  return handleApiResponse(response);
}

/**
 * Назначить дисциплину учителю
 * @param {string} token - JWT токен
 * @param {number} teacherId - ID учителя
 * @param {number} disciplineId - ID дисциплины
 * @returns {Promise<Object>} Информация о назначении
 */
export async function assignDisciplineToTeacher(token, teacherId, disciplineId) {
  const response = await fetch(`${API_URL}${API_ENDPOINTS.ADMIN_ASSIGN_DISCIPLINE(teacherId)}`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify({ discipline_id: disciplineId })
  });
  return handleApiResponse(response);
}

/**
 * Удалить дисциплину у учителя
 * @param {string} token - JWT токен
 * @param {number} teacherId - ID учителя
 * @param {number} disciplineId - ID дисциплины
 * @returns {Promise<Object>} Информация об удалении
 */
export async function removeDisciplineFromTeacher(token, teacherId, disciplineId) {
  const response = await fetch(`${API_URL}${API_ENDPOINTS.ADMIN_REMOVE_DISCIPLINE(teacherId, disciplineId)}`, {
    method: 'DELETE',
    headers: getAuthHeaders(token)
  });
  return handleApiResponse(response);
}

/**
 * Получить дисциплины конкретного учителя
 * @param {string} token - JWT токен
 * @param {number} teacherId - ID учителя
 * @returns {Promise<Object>} Учитель и его дисциплины
 */
export async function getTeacherDisciplines(token, teacherId) {
  const response = await fetch(`${API_URL}${API_ENDPOINTS.ADMIN_TEACHER_DISCIPLINES(teacherId)}`, {
    method: 'GET',
    headers: getAuthHeaders(token)
  });
  return handleApiResponse(response);
}

// ==================== TEACHER ENDPOINTS ====================

/**
 * Получить свои дисциплины (для учителя)
 * @param {string} token - JWT токен
 * @returns {Promise<Array>} Список назначенных дисциплин
 */
export async function getMyDisciplines(token) {
  const response = await fetch(`${API_URL}${API_ENDPOINTS.TEACHER_DISCIPLINES}`, {
    method: 'GET',
    headers: getAuthHeaders(token)
  });
  return handleApiResponse(response);
}

/**
 * Получить профиль учителя
 * @param {string} token - JWT токен
 * @returns {Promise<Object>} Профиль учителя с дисциплинами
 */
export async function getTeacherProfile(token) {
  const response = await fetch(`${API_URL}${API_ENDPOINTS.TEACHER_PROFILE}`, {
    method: 'GET',
    headers: getAuthHeaders(token)
  });
  return handleApiResponse(response);
}
