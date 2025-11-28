import { API_URL, API_ENDPOINTS, getAuthHeaders, handleApiResponse } from '../config/api';

/**
 * API сервис для работы с преподавателями
 */

/**
 * Создать нового преподавателя
 * @param {string} token - JWT токен админа
 * @param {Object} teacherData - Данные преподавателя
 * @param {string} teacherData.fullName - ФИО преподавателя
 * @param {string} teacherData.email - Email преподавателя
 * @returns {Promise<Object>} { success: boolean, data?: Object, error?: string }
 */
export async function createTeacher(token, teacherData) {
  try {
    const url = `${API_URL}${API_ENDPOINTS.ADMIN_CREATE_TEACHER}`;
    console.log('🌐 Создание преподавателя:', url, teacherData);

    const response = await fetch(url, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify({
        full_name: teacherData.fullName,
        email: teacherData.email
      })
    });

    const data = await handleApiResponse(response);
    console.log('✅ Преподаватель создан:', data);

    return { success: true, data };
  } catch (error) {
    console.error('❌ Ошибка создания преподавателя:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Получить статистику по преподавателям
 * @param {string} token - JWT токен админа
 * @returns {Promise<Object>} { success: boolean, data?: Object, error?: string }
 */
export async function getTeachersStats(token) {
  try {
    const url = `${API_URL}${API_ENDPOINTS.ADMIN_TEACHERS_STATS}`;
    console.log('🌐 Запрос статистики преподавателей:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(token)
    });

    const data = await handleApiResponse(response);
    console.log('✅ Статистика получена:', data);

    return { success: true, data };
  } catch (error) {
    console.error('❌ Ошибка получения статистики:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Получить список всех преподавателей школы
 * @param {string} token - JWT токен админа
 * @returns {Promise<Object>} { success: boolean, data?: Array, error?: string }
 */
export async function getTeachers(token) {
  try {
    const url = `${API_URL}${API_ENDPOINTS.ADMIN_TEACHERS}`;
    console.log('🌐 Запрос списка преподавателей:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(token)
    });

    const data = await handleApiResponse(response);
    console.log('✅ Список преподавателей получен:', data);

    return { success: true, data: data.teachers || data.data || data };
  } catch (error) {
    console.error('❌ Ошибка получения списка преподавателей:', error);
    return { success: false, error: error.message };
  }
}
