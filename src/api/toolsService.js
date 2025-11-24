/**
 * API сервис для AI-инструментов учителя
 * Все 26 инструментов + дополнительные эндпоинты
 */

import { API_URL, getAuthHeaders, handleApiResponse } from '../config/api';

const TOOLS_BASE_URL = `${API_URL}/api/tools`;

/**
 * Получить токен из localStorage
 */
function getToken() {
  return localStorage.getItem('token');
}

/**
 * Базовый запрос к API инструментов
 */
async function toolRequest(endpoint, data) {
  const token = getToken();
  if (!token) {
    throw new Error('Необходима авторизация');
  }

  const response = await fetch(`${TOOLS_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(data)
  });

  return handleApiResponse(response);
}

/**
 * GET запрос к API инструментов
 */
async function toolGetRequest(endpoint) {
  const token = getToken();
  if (!token) {
    throw new Error('Необходима авторизация');
  }

  const response = await fetch(`${TOOLS_BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: getAuthHeaders(token)
  });

  return handleApiResponse(response);
}

// ============= ЭКСПОРТЫ ФУНКЦИЙ =============

// 1. План урока
export async function generateLessonPlan({ subject, topic, grade, duration = 45, additional_requirements = '' }) {
  return toolRequest('/lesson-plan', { subject, topic, grade, duration, additional_requirements });
}

// 2. Цели обучения
export async function generateLearningObjectives({ subject, topic, grade }) {
  return toolRequest('/learning-objectives', { subject, topic, grade });
}

// 3. Расписание
export async function generateSchedule({ grade, period, subjects, constraints = '' }) {
  return toolRequest('/schedule', { grade, period, subjects, constraints });
}

// 4. Учебные материалы
export async function generateMaterials({ subject, topic, grade, material_type }) {
  return toolRequest('/materials', { subject, topic, grade, material_type });
}

// 5. Рабочие листы
export async function generateWorksheet({ subject, topic, grade, num_tasks = 5, difficulty = 'medium' }) {
  return toolRequest('/worksheet', { subject, topic, grade, num_tasks, difficulty });
}

// 6. Тесты/Викторины
export async function generateQuiz({ subject, topic, grade, num_questions = 10, difficulty = 'medium' }) {
  return toolRequest('/quiz', { subject, topic, grade, num_questions, difficulty });
}

// 7. Презентации
export async function generatePresentation({ subject, topic, grade, num_slides = 10 }) {
  return toolRequest('/presentation', { subject, topic, grade, num_slides });
}

// 8. Оценивание
export async function evaluateStudentWork({ subject, topic, criteria, student_work }) {
  return toolRequest('/assessment', { subject, topic, criteria, student_work });
}

// 9. Рубрики
export async function generateRubric({ subject, topic, grade, assignment_type }) {
  return toolRequest('/rubric', { subject, topic, grade, assignment_type });
}

// 10. Ключ ответов
export async function generateAnswerKey({ subject, topic, questions }) {
  return toolRequest('/answer-key', { subject, topic, questions });
}

// 11. Стратегии преподавания
export async function generateTeachingStrategy({ subject, topic, grade, class_profile = '' }) {
  return toolRequest('/teaching-strategy', { subject, topic, grade, class_profile });
}

// 12. Вопросы для обсуждения
export async function generateDiscussionPrompts({ subject, topic, grade, discussion_type = 'socratic' }) {
  return toolRequest('/discussion-prompts', { subject, topic, grade, discussion_type });
}

// 13. Интерактивные активности
export async function generateInteractiveActivities({ subject, topic, grade, num_students = 25, duration = 15 }) {
  return toolRequest('/interactive-activities', { subject, topic, grade, num_students, duration });
}

// 14. Аналитика ученика
export async function analyzeStudentPerformance({ student_data, period }) {
  return toolRequest('/student-analytics', { student_data, period });
}

// 15. Аналитика класса
export async function analyzeClassPerformance({ subject, class_data, period }) {
  return toolRequest('/class-analytics', { subject, class_data, period });
}

// 16. Отслеживание прогресса
export async function trackProgress({ progress_data, goals }) {
  return toolRequest('/progress-tracking', { progress_data, goals });
}

// 17. Библиотека ресурсов
export async function searchResources({ subject, topic, grade, resource_type = 'all' }) {
  return toolRequest('/resource-library', { subject, topic, grade, resource_type });
}

// 18. Краткое содержание документа
export async function summarizeDocument({ document_content }) {
  return toolRequest('/document-summary', { document_content });
}

// 19. Проверка ДЗ
export async function checkHomework({ subject, topic, assignment, student_answers }) {
  return toolRequest('/homework-check', { subject, topic, assignment, student_answers });
}

// 20. Создание ДЗ
export async function generateHomework({ subject, topic, grade, difficulty = 'medium', estimated_time = 30 }) {
  return toolRequest('/homework-generator', { subject, topic, grade, difficulty, estimated_time });
}

// 21. Тесты с вариантами (MCQ)
export async function generateMCQTest({ subject, topic, grade, num_questions = 10 }) {
  return toolRequest('/mcq-test', { subject, topic, grade, num_questions });
}

// 22. Банк вопросов
export async function generateQuestionBank({ subject, topic, grade, num_questions = 20, question_types = 'mixed' }) {
  return toolRequest('/question-bank', { subject, topic, grade, num_questions, question_types });
}

// 23. Генерация отчетов
export async function generateReport({ report_type, period, data }) {
  return toolRequest('/report-generator', { report_type, period, data });
}

// 24. Отчет об оценках
export async function generateGradeReport({ grades_data, period }) {
  return toolRequest('/grade-report', { grades_data, period });
}

// 25. Зацепка урока
export async function generateLessonHook({ subject, topic, grade, engagement_style = 'question' }) {
  return toolRequest('/lesson-hook', { subject, topic, grade, engagement_style });
}

// 26. Дифференциация
export async function generateDifferentiation({ subject, topic, grade, base_content }) {
  return toolRequest('/differentiation', { subject, topic, grade, base_content });
}

// ============= ИСТОРИЯ И СТАТИСТИКА =============

export async function getToolHistory(tool_type = null, limit = 20) {
  let endpoint = `/history?limit=${limit}`;
  if (tool_type) {
    endpoint += `&tool_type=${tool_type}`;
  }
  return toolGetRequest(endpoint);
}

export async function getGeneratedContent(contentId) {
  return toolGetRequest(`/history/${contentId}`);
}

export async function getToolStats() {
  return toolGetRequest('/stats');
}
