import { API_URL, API_ENDPOINTS, getAuthHeaders, handleApiResponse } from '../config/api';

/**
 * API сервис для работы с заявками преподавателей
 */

/**
 * Получить список заявок от преподавателей
 * @param {string} token - JWT токен админа
 * @returns {Promise<Object>} { success: boolean, data: Array }
 */
export async function getTeacherApplications(token) {
  try {
    const url = `${API_URL}${API_ENDPOINTS.ADMIN_TEACHER_APPLICATIONS}`;
    console.log('🌐 Запрос заявок преподавателей:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(token)
    });

    const data = await handleApiResponse(response);
    console.log('✅ Заявки получены:', data);

    return { success: true, data: data.applications || data.data || data };
  } catch (error) {
    console.error('❌ Ошибка получения заявок:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Одобрить заявку преподавателя
 * @param {string} token - JWT токен админа
 * @param {number} applicationId - ID заявки
 * @returns {Promise<Object>} { success: boolean }
 */
export async function approveTeacherApplication(token, applicationId) {
  try {
    const url = `${API_URL}${API_ENDPOINTS.ADMIN_APPROVE_APPLICATION(applicationId)}`;
    console.log('🌐 Одобрение заявки:', url);

    const response = await fetch(url, {
      method: 'POST',
      headers: getAuthHeaders(token)
    });

    const data = await handleApiResponse(response);
    console.log('✅ Заявка одобрена:', data);

    return { success: true, data };
  } catch (error) {
    console.error('❌ Ошибка одобрения заявки:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Отклонить заявку преподавателя
 * @param {string} token - JWT токен админа
 * @param {number} applicationId - ID заявки
 * @returns {Promise<Object>} { success: boolean }
 */
export async function rejectTeacherApplication(token, applicationId) {
  try {
    const url = `${API_URL}${API_ENDPOINTS.ADMIN_REJECT_APPLICATION(applicationId)}`;
    console.log('🌐 Отклонение заявки:', url);

    const response = await fetch(url, {
      method: 'POST',
      headers: getAuthHeaders(token)
    });

    const data = await handleApiResponse(response);
    console.log('✅ Заявка отклонена:', data);

    return { success: true, data };
  } catch (error) {
    console.error('❌ Ошибка отклонения заявки:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Получить количество заявок
 * @param {string} token - JWT токен админа
 * @returns {Promise<number>} Количество заявок
 */
export async function getApplicationsCount(token) {
  try {
    const result = await getTeacherApplications(token);
    if (result.success) {
      return Array.isArray(result.data) ? result.data.length : 0;
    }
    return 0;
  } catch (error) {
    console.error('❌ Ошибка получения количества заявок:', error);
    return 0;
  }
}
