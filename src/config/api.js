// Конфигурация API для OpenSchool
export const API_URL = 'https://openschoolbackend-production.up.railway.app';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN_TEACHER_STUDENT: '/auth/login',
  LOGIN_SCHOOL_ADMIN: '/auth/admin/login',
  LOGIN_SUPERADMIN: '/auth/superadmin/login',

  // Teacher endpoints
  TEACHER_DISCIPLINES: '/api/teacher/disciplines',
  TEACHER_PROFILE: '/api/teacher/profile',

  // Admin endpoints
  ADMIN_DISCIPLINES: '/api/admin/disciplines',
  ADMIN_TEACHERS: '/api/admin/teachers',
  ADMIN_ASSIGN_DISCIPLINE: (teacherId) => `/api/admin/teacher/${teacherId}/assign-discipline`,
  ADMIN_REMOVE_DISCIPLINE: (teacherId, disciplineId) => `/api/admin/teacher/${teacherId}/remove-discipline/${disciplineId}`,
  ADMIN_TEACHER_DISCIPLINES: (teacherId) => `/api/admin/teachers/${teacherId}/disciplines`,

  // Superadmin endpoints
  SUPERADMIN_SCHOOLS: '/api/superadmin/schools',
  SUPERADMIN_CREATE_SCHOOL: '/api/superadmin/create-school',
  SUPERADMIN_ADMINS: '/api/superadmin/admins',
  SUPERADMIN_CREATE_ADMIN: '/api/superadmin/create-admin',
  SUPERADMIN_USERS: '/api/superadmin/users',

  // Student endpoints
  STUDENT_TEACHERS: '/student/teachers',
  STUDENT_USE_INVITE: '/invites/use',
};

/**
 * Создать заголовки для API запроса с авторизацией
 * @param {string} token - JWT токен
 * @returns {Object} Headers объект
 */
export function getAuthHeaders(token) {
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
}

/**
 * Обработать ответ от API
 * @param {Response} response - Fetch response
 * @returns {Promise<Object>} Parsed JSON
 */
export async function handleApiResponse(response) {
  let data;
  try {
    data = await response.json();
  } catch (e) {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data?.detail || data?.message || `HTTP Error: ${response.status}`);
  }

  return data;
}
