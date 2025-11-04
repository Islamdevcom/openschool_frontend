import { API_URL, API_ENDPOINTS, getAuthHeaders, handleApiResponse } from '../config/api';

/**
 * E>4 4;O CG8B5;O 8;8 CG5=8:0
 * @param {string} email - Email ?>;L7>20B5;O
 * @param {string} password - 0@>;L
 * @returns {Promise<Object>} 0==K5 ?>;L7>20B5;O A B>:5=><
 */
export async function loginTeacherStudent(email, password) {
  const response = await fetch(`${API_URL}${API_ENDPOINTS.LOGIN_TEACHER_STUDENT}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ email, password })
  });

  const data = await handleApiResponse(response);

  // @>25@O5< GB> @>;L ?@028;L=0O
  if (data.role !== 'teacher' && data.role !== 'student') {
    throw new Error('525@=0O @>;L ?>;L7>20B5;O. A?>;L7C9B5 A>>B25BAB2CNICN AB@0=8FC 2E>40.');
  }

  return data;
}

/**
 * E>4 4;O H:>;L=>3> 04<8=8AB@0B>@0
 * @param {string} email - Email 04<8=8AB@0B>@0
 * @param {string} password - 0@>;L
 * @returns {Promise<Object>} 0==K5 ?>;L7>20B5;O A B>:5=><
 */
export async function loginSchoolAdmin(email, password) {
  const response = await fetch(`${API_URL}${API_ENDPOINTS.LOGIN_SCHOOL_ADMIN}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ email, password })
  });

  const data = await handleApiResponse(response);

  // @>25@O5< GB> @>;L 459AB28B5;L=> school_admin
  if (data.role !== 'school_admin') {
    throw new Error('525@=0O @>;L ?>;L7>20B5;O. "@51C5BAO @>;L 04<8=8AB@0B>@0 H:>;K.');
  }

  return data;
}

/**
 * E>4 4;O AC?5@04<8=8AB@0B>@0
 * @param {string} email - Email AC?5@04<8=0
 * @param {string} password - 0@>;L
 * @returns {Promise<Object>} 0==K5 ?>;L7>20B5;O A B>:5=><
 */
export async function loginSuperAdmin(email, password) {
  const response = await fetch(`${API_URL}${API_ENDPOINTS.LOGIN_SUPERADMIN}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ email, password })
  });

  const data = await handleApiResponse(response);

  // @>25@O5< GB> @>;L 459AB28B5;L=> superadmin
  if (data.role !== 'superadmin') {
    throw new Error('525@=0O @>;L ?>;L7>20B5;O. "@51C5BAO @>;L AC?5@04<8=8AB@0B>@0.');
  }

  return data;
}

/**
 * !>E@0=8BL 40==K5 ?>;L7>20B5;O 2 localStorage
 * @param {Object} data - 0==K5 >B API (A access_token, role, email 8 B.4.)
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
 * G8AB8BL 40==K5 ?>;L7>20B5;O 87 localStorage
 */
export function clearUserData() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('email');
  localStorage.removeItem('full_name');
  localStorage.removeItem('school_id');
}

/**
 * >;CG8BL B>:5= 87 localStorage
 * @returns {string|null} JWT B>:5= 8;8 null
 */
export function getToken() {
  return localStorage.getItem('token');
}

/**
 * >;CG8BL @>;L ?>;L7>20B5;O 87 localStorage
 * @returns {string|null}  >;L 8;8 null
 */
export function getUserRole() {
  return localStorage.getItem('role');
}

/**
 * @>25@8BL 02B>@87>20= ;8 ?>;L7>20B5;L
 * @returns {boolean}
 */
export function isAuthenticated() {
  return !!getToken();
}

/**
 * @>25@8BL @>;L ?>;L7>20B5;O
 * @param {string} requiredRole - "@51C5<0O @>;L
 * @returns {boolean}
 */
export function checkRole(requiredRole) {
  const role = getUserRole();
  return role === requiredRole;
}
