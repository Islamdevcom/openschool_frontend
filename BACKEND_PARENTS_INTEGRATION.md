# Интеграция ParentsPage с бэкендом

## Обзор
Родители входят через обычный логин (email/password) без отдельной регистрации. Учетные данные создает школьный администратор. Доступ разрешается только если у родителя есть привязанные дети в системе.

---

## 1. Структура базы данных

### Таблица: `users` (общая для всех ролей)
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL, -- 'student', 'teacher', 'parent', 'schooladmin', 'superadmin'
    school_id INTEGER,
    created_by INTEGER, -- ID админа который создал
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Таблица: `students`
```sql
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    grade VARCHAR(50), -- '8 класс', '10А класс' и т.д.
    school_id INTEGER NOT NULL
);
```

### Таблица: `parent_child` (связь родитель-ребенок)
```sql
CREATE TABLE parent_child (
    id SERIAL PRIMARY KEY,
    parent_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    student_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    relationship VARCHAR(50), -- 'father', 'mother', 'guardian'
    school_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(parent_user_id, student_user_id)
);
```

### Таблица: `student_stats` (статистика ученика)
```sql
CREATE TABLE student_stats (
    id SERIAL PRIMARY KEY,
    student_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    avg_grade DECIMAL(3,2), -- Средний балл (4.3, 3.8 и т.д.)
    attendance DECIMAL(5,2), -- Посещаемость в % (95.5, 88.0)
    warnings INTEGER DEFAULT 0, -- Количество замечаний
    behavior DECIMAL(3,2), -- Оценка поведения (8.5, 7.2)
    updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 2. API Endpoints для авторизации

### `POST /auth/login`

**Запрос:**
```json
{
  "email": "parent@example.com",
  "password": "password123"
}
```

**Успешный ответ для родителя:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "parent",
  "email": "ivanov@mail.com",
  "full_name": "Иванов Петр Сергеевич",
  "school_id": 123,
  "children": [
    {
      "id": 456,
      "name": "Иванова Анна Петровна",
      "email": "anna.ivanova@mail.com",
      "grade": "8 класс",
      "relationship": "father",
      "avgGrade": 4.3,
      "attendance": 95.5,
      "warnings": 2,
      "behavior": 8.5
    },
    {
      "id": 789,
      "name": "Иванов Михаил Петрович",
      "email": "mihail.ivanov@mail.com",
      "grade": "5 класс",
      "relationship": "father",
      "avgGrade": 3.8,
      "attendance": 88.0,
      "warnings": 5,
      "behavior": 7.2
    }
  ]
}
```

**Ошибка - нет привязанных детей:**
```json
{
  "detail": "У вас нет привязанных детей. Обратитесь к администратору школы.",
  "errorCode": "NO_CHILDREN_LINKED"
}
```

**Логика на бэкенде:**
```python
async def login(email: str, password: str):
    # 1. Проверить email/password
    user = await get_user_by_email(email)
    if not user or not verify_password(password, user.password_hash):
        raise HTTPException(status_code=401, detail="Неверный email или пароль")

    # 2. Проверить активен ли пользователь
    if not user.is_active:
        raise HTTPException(status_code=403, detail="Аккаунт деактивирован")

    # 3. ЕСЛИ РОЛЬ = PARENT - проверить привязанных детей
    if user.role == 'parent':
        children_links = await db.fetch_all(
            "SELECT * FROM parent_child WHERE parent_user_id = $1",
            user.id
        )

        if len(children_links) == 0:
            raise HTTPException(
                status_code=403,
                detail="У вас нет привязанных детей. Обратитесь к администратору школы.",
            )

        # Получить полные данные о детях
        children_data = []
        for link in children_links:
            student = await get_user_by_id(link.student_user_id)
            student_info = await db.fetch_one(
                "SELECT * FROM students WHERE user_id = $1",
                student.id
            )
            stats = await db.fetch_one(
                "SELECT * FROM student_stats WHERE student_user_id = $1",
                student.id
            )

            children_data.append({
                "id": student.id,
                "name": student.full_name,
                "email": student.email,
                "grade": student_info.grade,
                "relationship": link.relationship,
                "avgGrade": float(stats.avg_grade) if stats else 0,
                "attendance": float(stats.attendance) if stats else 0,
                "warnings": stats.warnings if stats else 0,
                "behavior": float(stats.behavior) if stats else 0
            })

        # Генерировать токен
        token = create_access_token({
            "userId": user.id,
            "email": user.email,
            "role": user.role,
            "schoolId": user.school_id
        })

        return {
            "access_token": token,
            "role": user.role,
            "email": user.email,
            "full_name": user.full_name,
            "school_id": user.school_id,
            "children": children_data
        }

    # 4. Для других ролей - обычный вход
    token = create_access_token({
        "userId": user.id,
        "email": user.email,
        "role": user.role,
        "schoolId": user.school_id
    })

    return {
        "access_token": token,
        "role": user.role,
        "email": user.email,
        "full_name": user.full_name,
        "school_id": user.school_id
    }
```

---

## 3. API для школьного администратора

### `POST /api/admin/parents/create`
Создать аккаунт родителя и привязать детей

**Запрос:**
```json
{
  "email": "parent@example.com",
  "password": "temp_password_123",
  "full_name": "Иванов Петр Сергеевич",
  "school_id": 123,
  "children_ids": [456, 789],
  "relationship": "father"
}
```

**Ответ:**
```json
{
  "id": 111,
  "email": "parent@example.com",
  "full_name": "Иванов Петр Сергеевич",
  "role": "parent",
  "children_count": 2,
  "message": "Родитель успешно создан и привязан к детям"
}
```

### `POST /api/admin/parents/link-child`
Привязать ребенка к существующему родителю

**Запрос:**
```json
{
  "parent_user_id": 111,
  "student_user_id": 456,
  "relationship": "father"
}
```

**Ответ:**
```json
{
  "success": true,
  "message": "Ребенок успешно привязан к родителю"
}
```

### `DELETE /api/admin/parents/unlink-child`
Отвязать ребенка от родителя

**Запрос:**
```json
{
  "parent_user_id": 111,
  "student_user_id": 456
}
```

**Ответ:**
```json
{
  "success": true,
  "message": "Ребенок отвязан от родителя"
}
```

### `GET /api/admin/parents/{parent_id}`
Получить информацию о родителе и его детях

**Ответ:**
```json
{
  "id": 111,
  "email": "parent@example.com",
  "full_name": "Иванов Петр Сергеевич",
  "role": "parent",
  "is_active": true,
  "children": [
    {
      "id": 456,
      "name": "Иванова Анна Петровна",
      "grade": "8 класс",
      "relationship": "father"
    }
  ]
}
```

---

## 4. Дополнительные API для ParentsPage

### `GET /api/parent/children`
Получить список детей текущего родителя (с актуальными данными)

**Headers:**
```
Authorization: Bearer <token>
```

**Ответ:**
```json
{
  "children": [
    {
      "id": 456,
      "name": "Иванова Анна Петровна",
      "grade": "8 класс",
      "avatar": "АИ",
      "avgGrade": 4.3,
      "attendance": 95.5,
      "warnings": 2,
      "behavior": 8.5
    }
  ]
}
```

### `GET /api/parent/child/{child_id}/teachers`
Получить список учителей ребенка

**Ответ:**
```json
{
  "teachers": [
    {
      "id": 10,
      "name": "Петрова Анна Ивановна",
      "subject": "Математика",
      "phone": "+7 (777) 123-45-67",
      "email": "petrova@school.com"
    }
  ]
}
```

### `GET /api/parent/child/{child_id}/grades`
Получить оценки ребенка

**Ответ:**
```json
{
  "grades": [
    {
      "subject": "Математика",
      "grade": 4,
      "date": "2025-11-10",
      "type": "Контрольная работа",
      "teacher": "Петрова А.И."
    }
  ]
}
```

### `GET /api/parent/child/{child_id}/attendance`
Получить посещаемость ребенка

### `GET /api/parent/child/{child_id}/behavior`
Получить замечания и похвалы

### `GET /api/parent/chat/history/{child_id}`
История чата родителя об этом ребенке

---

## 5. Интеграция на фронтенде

### AuthContext уже обновлен:
- Добавлено состояние `parentChildren`
- При логине сохраняется список детей в localStorage
- Доступно через `useAuth()` hook

### ParentsPage уже интегрирован:
- Использует `parentChildren` из AuthContext
- Fallback на тестовые данные если бэкенд не готов
- Генерирует аватары из имен детей

### Пример использования на фронтенде:
```javascript
import { useAuth } from '../../context/AuthContext';

const ParentsPage = () => {
  const { parentChildren, userInfo } = useAuth();

  // parentChildren содержит список детей родителя
  console.log(parentChildren);
  // [{ id: 456, name: "Иванова Анна", grade: "8 класс", ... }]
};
```

---

## 6. Тестирование

### Сценарий 1: Успешный вход родителя с детьми
1. Админ создает родителя: email=`test@parent.com`, password=`123456`
2. Админ привязывает 2 детей к родителю
3. Родитель логинится → получает токен + список детей
4. Фронтенд отображает ParentsPage с реальными детьми

### Сценарий 2: Вход родителя без детей
1. Админ создает родителя но НЕ привязывает детей
2. Родитель пытается войти
3. Бэкенд возвращает ошибку 403: "У вас нет привязанных детей"
4. Фронтенд показывает сообщение об ошибке

### Сценарий 3: Админ управляет привязками
1. Админ видит список всех родителей
2. Админ может добавить/удалить детей у родителя
3. При следующем входе родитель видит обновленный список

---

## 7. Безопасность

### Важно:
- Родитель может видеть ТОЛЬКО своих привязанных детей
- Проверять `parent_user_id` в токене при запросах к API
- Не давать доступ к данным других детей
- При отвязке ребенка - родитель больше не должен видеть его данные

### Пример проверки на бэкенде:
```python
@app.get("/api/parent/child/{child_id}/grades")
async def get_child_grades(child_id: int, current_user = Depends(get_current_user)):
    # Проверить что это родитель
    if current_user.role != 'parent':
        raise HTTPException(status_code=403, detail="Доступ запрещен")

    # Проверить что ребенок привязан к этому родителю
    link = await db.fetch_one(
        "SELECT * FROM parent_child WHERE parent_user_id = $1 AND student_user_id = $2",
        current_user.id, child_id
    )

    if not link:
        raise HTTPException(status_code=403, detail="Ребенок не привязан к вам")

    # Вернуть данные
    return get_grades(child_id)
```

---

## 8. Миграции базы данных

```sql
-- Создание таблиц
CREATE TABLE parent_child (
    id SERIAL PRIMARY KEY,
    parent_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    student_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    relationship VARCHAR(50),
    school_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(parent_user_id, student_user_id)
);

CREATE TABLE student_stats (
    id SERIAL PRIMARY KEY,
    student_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    avg_grade DECIMAL(3,2),
    attendance DECIMAL(5,2),
    warnings INTEGER DEFAULT 0,
    behavior DECIMAL(3,2),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Индексы для производительности
CREATE INDEX idx_parent_child_parent ON parent_child(parent_user_id);
CREATE INDEX idx_parent_child_student ON parent_child(student_user_id);
CREATE INDEX idx_student_stats_user ON student_stats(student_user_id);
```

---

## Вопросы?
Если что-то непонятно - пиши в чат!
