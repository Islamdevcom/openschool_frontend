const BASE_URL = "https://openschoolbackend-production.up.railway.app";

/**
 * Присоединиться к преподавателю по коду приглашения.
 */
export async function useInviteCode({ code, token }) {
  if (!token || !code) throw new Error("Не указан токен или код");

  const res = await fetch(`${BASE_URL}/invites/use`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  let data = {};
  try {
    data = await res.json();
  } catch (e) {
    // В случае, если сервер не вернул JSON
    data = {};
  }

  if (!res.ok) throw new Error(data?.detail || "Ошибка при присоединении к преподавателю");
  return data;
}

/**
 * Получить список преподавателей текущего ученика.
 */
export async function fetchMyTeachers({ token }) {
  if (!token) throw new Error("Токен не найден");

  const res = await fetch(`${BASE_URL}/student/teachers`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  let data = [];
  try {
    data = await res.json();
  } catch (e) {
    data = [];
  }

  if (!res.ok) throw new Error(data?.detail || "Ошибка при получении преподавателей");
  return data;
}
