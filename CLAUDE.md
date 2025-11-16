# OpenSchool Frontend - AI Assistant Guide

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Architecture](#architecture)
4. [Development Setup](#development-setup)
5. [File Structure](#file-structure)
6. [Authentication & Authorization](#authentication--authorization)
7. [State Management](#state-management)
8. [API Integration](#api-integration)
9. [Role-Based Features](#role-based-features)
10. [Component Patterns](#component-patterns)
11. [Styling Conventions](#styling-conventions)
12. [Key Systems](#key-systems)
13. [Common Tasks](#common-tasks)
14. [Best Practices](#best-practices)
15. [Troubleshooting](#troubleshooting)

---

## Project Overview

**OpenSchool** is a comprehensive educational management platform supporting five distinct user roles:
- **Students** - Access courses, chat with AI tutors, manage schedules
- **Teachers** - Manage disciplines, students, AI-powered tools, journals
- **Parents** - Monitor children's progress, communicate with teachers
- **School Admins** - Manage school-level operations, users, disciplines
- **Super Admins** - System-wide management, school creation, analytics

**Key Features:**
- Role-based dashboards and workflows
- AI-powered educational tools with energy/monetization system
- Parent-child linking system for family accounts
- Discipline (subject) management with groups and journals
- Real-time chat and messaging
- Invite code system for student-teacher connections

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI framework |
| React Router DOM | 6.30.1 | Client-side routing |
| Vite | 5.4.0 | Build tool & dev server |
| Axios | 1.13.1 | HTTP client (configured but fetch API also used) |
| Lucide React | 0.536.0 | Icon library |

**No Additional State Management Libraries** - Uses React Context API exclusively

**Backend:** `https://openschoolbackend-production.up.railway.app`

---

## Architecture

### Application Flow

```
index.html
    ↓
src/main.jsx (Entry point)
    ↓
<BrowserRouter>
    <AuthProvider>
        <App />  (Route definitions)
    </AuthProvider>
</BrowserRouter>
    ↓
Role-based routing with PrivateRoute guards
    ↓
User-specific applications:
- /teacher → TeacherApp
- /student → StudentApp
- /parent → ParentsPage
- /schooladmin → SchoolAdminApp
- /superadmin → SuperAdminApp
```

### Key Architectural Patterns

1. **Context Provider Pattern** - AuthContext wraps entire app
2. **Higher-Order Components** - PrivateRoute for route protection
3. **Custom Hooks** - useDisciplineData for complex state management
4. **Container/Presentational** - Pages (smart) vs Components (presentational)
5. **Role-Based Access Control** - Multi-tier authentication system

---

## Development Setup

### Prerequisites
```bash
Node.js (v16+)
npm or yarn
```

### Installation & Running
```bash
# Install dependencies
npm install

# Start dev server (port 5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Configuration
- Dev server: `http://localhost:5173`
- Backend API: `https://openschoolbackend-production.up.railway.app`
- API config: `src/config/api.js`

---

## File Structure

```
openschool_frontend/
├── public/                      # Static assets
├── src/
│   ├── main.jsx                # App entry point
│   ├── App.jsx                 # Main router
│   ├── index.css               # Global styles
│   │
│   ├── api/                    # API service modules
│   │   └── student.js          # Student-specific endpoints
│   │
│   ├── auth/                   # Authentication utilities
│   │   └── authService.js      # Login/logout helpers
│   │
│   ├── components/             # React components
│   │   ├── common/            # Shared components
│   │   │   ├── EnergyCircle.jsx
│   │   │   └── ProUpgradeModal.jsx
│   │   ├── teacher/           # Teacher-specific
│   │   ├── student/           # Student-specific
│   │   ├── parents/           # Parent portal
│   │   ├── schooladmin/       # School admin
│   │   ├── superadmin/        # Super admin
│   │   └── registration/      # Registration flows
│   │
│   ├── config/                # Configuration files
│   │   └── api.js             # API endpoints & helpers
│   │
│   ├── context/               # React contexts
│   │   └── AuthContext.jsx    # Authentication state
│   │
│   ├── hooks/                 # Custom React hooks
│   │   └── useDisciplineData.js
│   │
│   ├── pages/                 # Page components
│   │   ├── auth/              # Login pages
│   │   ├── teacher/           # TeacherApp
│   │   ├── student/           # StudentApp
│   │   ├── parents/           # ParentsPage
│   │   ├── schooladmin/       # SchoolAdminApp
│   │   ├── superadmin/        # SuperAdminApp
│   │   ├── registration/      # Registration flow
│   │   └── landing/           # Landing pages
│   │
│   ├── router/                # Routing config (if exists)
│   └── utils/                 # Utility functions
│       ├── PrivateRoute.jsx   # Route protection
│       └── faqCache.js        # FAQ caching
│
├── vite.config.js             # Vite configuration
├── jsconfig.json              # Path aliases
├── package.json               # Dependencies
└── vercel.json                # Deployment config
```

### Important File Reference

| File Path | Purpose | When to Modify |
|-----------|---------|----------------|
| `src/context/AuthContext.jsx` | Authentication & user state | Adding auth features, new roles |
| `src/config/api.js` | API endpoints | Adding new backend routes |
| `src/App.jsx` | Route definitions | Adding new pages/routes |
| `src/utils/PrivateRoute.jsx` | Route protection logic | Modifying access control |
| `src/hooks/useDisciplineData.js` | Discipline state management | Changing discipline data structure |
| `src/auth/authService.js` | Auth utility functions | Modifying login/logout flows |

---

## Authentication & Authorization

### AuthContext Structure

Location: `src/context/AuthContext.jsx`

```javascript
// Context State
{
  token: string,              // JWT token
  role: string,               // 'teacher' | 'student' | 'parent' | 'school_admin' | 'superadmin'
  schoolId: string,           // User's school ID
  userInfo: {                 // User details
    email: string,
    full_name: string
  },
  parentChildren: [],         // For parent role - list of children
  energy: number,             // Energy units (max 10) for AI features
  isAuthenticated: boolean    // Auth status
}

// Methods
- login(email, password)      // Authenticate user
- logout()                    // Clear session
- setAuthData(data)           // Direct auth data setting
- decreaseEnergy()            // Decrement energy by 1
- resetEnergy(amount)         // Restore energy (Pro subscription)
```

### Using Auth in Components

```javascript
import { useAuth } from '../../context/AuthContext';

function MyComponent() {
  const { token, role, userInfo, energy, decreaseEnergy } = useAuth();

  // Check authentication
  if (!token) {
    return <div>Please log in</div>;
  }

  // Role-based rendering
  if (role === 'teacher') {
    return <TeacherView />;
  }
}
```

### Login Endpoints by Role

| Role | Endpoint | Login Page |
|------|----------|------------|
| Student/Teacher | `POST /auth/login` | `/login` |
| School Admin | `POST /auth/admin/login` | `/schooladmin/login` |
| Super Admin | `POST /auth/superadmin/login` | `/superadmin/login` |
| Parent | `POST /auth/login` (with children validation) | `/login` |

### PrivateRoute Protection

Location: `src/utils/PrivateRoute.jsx`

```javascript
// Usage in App.jsx
<Route path="/teacher" element={
  <PrivateRoute allowedRoles={['teacher']}>
    <TeacherApp />
  </PrivateRoute>
} />
```

**Protection Logic:**
1. Checks for valid token in localStorage
2. Verifies user role matches `allowedRoles`
3. Redirects to appropriate login page if unauthorized
4. Prevents cross-role access (e.g., student accessing teacher routes)

### Data Persistence

All auth data stored in **localStorage**:
- `token` - JWT authentication token
- `role` - User role
- `school_id` - School identifier
- `user_info` - JSON string with email, full_name
- `parent_children` - JSON array (for parents only)
- `user_energy` - Remaining energy units

**Important:** Always sync state with localStorage on auth changes.

---

## State Management

### 1. Global State - AuthContext

**Purpose:** User authentication, role, energy system

**Access:**
```javascript
const { token, role, userInfo, energy } = useAuth();
```

### 2. Discipline State - useDisciplineData Hook

**Location:** `src/hooks/useDisciplineData.js`

**Purpose:** Manage per-discipline data for teachers

**Structure:**
```javascript
{
  groups: [],           // Student groups
  students: [],         // Students in discipline
  journal: {},          // Grade/attendance journal
  aiPrompts: {},        // AI configuration
  chatSessions: [],     // Chat history
  faqCache: {}          // Cached FAQ responses
}
```

**Usage:**
```javascript
import { useDisciplineData } from '../../hooks/useDisciplineData';

function DisciplineView({ disciplineId }) {
  const {
    disciplineData,
    updateGroups,
    updateStudents,
    updateJournal,
    updateChatSessions,
    clearChatHistory,
    loading
  } = useDisciplineData(disciplineId);

  // Access data
  const students = disciplineData.students || [];

  // Update data
  const addStudent = (student) => {
    updateStudents([...students, student]);
  };
}
```

**Persistence:** Each discipline's data stored in localStorage as:
- Key: `openschool_discipline_${disciplineId}`
- Value: JSON serialized discipline object

### 3. Local Component State

Use `useState` for component-specific state:
```javascript
const [activeTab, setActiveTab] = useState('home');
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedStudent, setSelectedStudent] = useState(null);
```

---

## API Integration

### Configuration

**File:** `src/config/api.js`

```javascript
// Base URL
const API_URL = 'https://openschoolbackend-production.up.railway.app';

// Endpoints
export const API_ENDPOINTS = {
  LOGIN_TEACHER_STUDENT: '/auth/login',
  LOGIN_SCHOOL_ADMIN: '/auth/admin/login',
  LOGIN_SUPERADMIN: '/auth/superadmin/login',
  TEACHER_DISCIPLINES: '/api/teacher/disciplines',
  TEACHER_PROFILE: '/api/teacher/profile',
  STUDENT_TEACHERS: '/student/teachers',
  // ... more endpoints
};

// Helper functions
export const getAuthHeaders = (token) => ({
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
});

export const handleApiResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'API request failed');
  }
  return response.json();
};
```

### Making API Calls

**Pattern 1: Using Fetch API**
```javascript
import { API_URL, API_ENDPOINTS, getAuthHeaders } from '../../config/api';

async function fetchTeacherDisciplines(token) {
  const response = await fetch(
    `${API_URL}${API_ENDPOINTS.TEACHER_DISCIPLINES}`,
    {
      method: 'GET',
      headers: getAuthHeaders(token)
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch disciplines');
  }

  return response.json();
}
```

**Pattern 2: Using Service Functions**
```javascript
// In src/api/student.js
import { API_URL, API_ENDPOINTS, getAuthHeaders } from '../config/api';

export const fetchMyTeachers = async ({ token }) => {
  const response = await fetch(
    `${API_URL}${API_ENDPOINTS.STUDENT_TEACHERS}`,
    { headers: getAuthHeaders(token) }
  );
  return response.json();
};

// In component
import { fetchMyTeachers } from '../../api/student';

const teachers = await fetchMyTeachers({ token });
```

### Error Handling

```javascript
try {
  const data = await fetchSomeData(token);
  setData(data);
} catch (error) {
  console.error('Error:', error.message);
  // Show user-friendly error message
  alert('Failed to load data. Please try again.');
}
```

### Important API Patterns

1. **Always include auth token** in protected endpoints
2. **Handle HTTP errors** with try-catch
3. **Use consistent error messages** for user feedback
4. **Cache responses** where appropriate (e.g., FAQ cache)
5. **Validate responses** before updating state

---

## Role-Based Features

### 1. Teacher (`/teacher`)

**Main File:** `src/pages/teacher/TeacherApp.jsx`

**Features:**
- Discipline management (subjects)
- Student group organization
- AI-powered tools (quiz generation, lesson planning)
- Grade journal
- Chat with AI assistant
- Analytics and reports
- Profile management

**Key Components:**
- `Header.jsx` - Top navigation with energy display
- `Navigation.jsx` - Main tab navigation
- `ToolsGrid.jsx` - AI tools dashboard
- `ManageStudents.jsx` - Student/group management
- `TeacherJournals.jsx` - Grade tracking

**State:**
- Uses `useDisciplineData` hook for current discipline
- Stores discipline history in localStorage
- Energy system for AI features

### 2. Student (`/student`)

**Main File:** `src/pages/student/StudentApp.jsx`

**Features:**
- Dashboard with upcoming classes
- AI chat tutor
- Study planning
- Digital journal
- Teacher connections via invite codes
- Materials library
- Profile settings

**Key Components:**
- `Dashboard.jsx` - Main overview
- `Chat.jsx` - AI tutor interface
- `Planning.jsx` - Study schedule
- `Journal.jsx` - Personal notes
- `ProfileModal/` - Settings and preferences

**Invite System:**
```javascript
import { useInviteCode } from '../../api/student';

const result = await useInviteCode({ code: 'ABC123', token });
// Joins student to teacher's discipline
```

### 3. Parent (`/parent`)

**Main File:** `src/pages/parents/Parentspage.jsx`

**Features:**
- Multi-child dashboard
- Quick stats (grades, attendance, behavior, warnings)
- Teacher communication
- AI chat for parenting advice
- Child progress monitoring

**Key Components:**
- `QuickStats.jsx` - Child performance overview
- `AIChat.jsx` - AI assistant for parents
- `TeacherChatModal.jsx` - Message teachers
- `Sidebar.jsx` - Child navigation

**Important:** Parent accounts must have linked children.

**Data Structure:**
```javascript
// From AuthContext
const { parentChildren } = useAuth();

// Each child object:
{
  id: number,
  name: string,
  email: string,
  grade: string,
  relationship: 'father' | 'mother' | 'guardian',
  avgGrade: number,
  attendance: number,
  warnings: number,
  behavior: number
}
```

**Backend Integration:** See `BACKEND_PARENTS_INTEGRATION.md` for complete API specification.

### 4. School Admin (`/schooladmin`)

**Main File:** `src/pages/schooladmin/SchoolAdminApp.jsx`

**Features:**
- User management (teachers, students, parents)
- Discipline creation
- School-level analytics
- Parent-child linking
- Invite code generation

**Key Components:**
- `DashboardCard.jsx` - Metric displays
- `Modal.jsx` - User creation/editing
- `QuickActions.jsx` - Common tasks

### 5. Super Admin (`/superadmin`)

**Main File:** `src/pages/superadmin/SuperAdminApp.jsx`

**Features:**
- School creation and management
- System-wide analytics
- Platform configuration
- Global user oversight

**Key Components:**
- `StatsGrid.jsx` - Platform metrics
- `DataTable.jsx` - Tabular data displays

---

## Component Patterns

### Naming Conventions

1. **Components** - PascalCase: `TeacherApp.jsx`, `ManageStudents.jsx`
2. **CSS Modules** - Same as component: `Header.module.css`
3. **Plain CSS** - kebab-case: `DisciplineSelector.css`
4. **Hooks** - camelCase with 'use' prefix: `useDisciplineData.js`
5. **Utils** - camelCase: `faqCache.js`

### Component Structure

**Standard Pattern:**
```javascript
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './Component.module.css';

function ComponentName({ prop1, prop2 }) {
  // 1. Hooks
  const { token, role } = useAuth();
  const [state, setState] = useState(null);

  // 2. Effects
  useEffect(() => {
    // Side effects
  }, [dependencies]);

  // 3. Event handlers
  const handleClick = () => {
    // Logic
  };

  // 4. Render
  return (
    <div className={styles.container}>
      {/* JSX */}
    </div>
  );
}

export default ComponentName;
```

### Common Component Types

**1. Modal Components**
```javascript
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
```

**2. Dashboard Cards**
```javascript
function DashboardCard({ title, value, icon, color }) {
  return (
    <div className={styles.card} style={{ borderColor: color }}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.content}>
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
}
```

**3. List Items**
```javascript
function StudentListItem({ student, onClick }) {
  return (
    <div className={styles.item} onClick={() => onClick(student)}>
      <div className={styles.avatar}>{student.name.slice(0, 2)}</div>
      <div className={styles.info}>
        <h4>{student.name}</h4>
        <span>{student.grade}</span>
      </div>
    </div>
  );
}
```

### Props Best Practices

1. **Destructure props** in function signature
2. **Use prop types** or TypeScript (if converting)
3. **Provide default values** for optional props
4. **Lift state up** when shared between components
5. **Use Context** for deeply nested props

---

## Styling Conventions

### CSS Modules

**Primary Approach** - Scoped CSS modules

```javascript
// Component.jsx
import styles from './Component.module.css';

function Component() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Title</h1>
    </div>
  );
}
```

```css
/* Component.module.css */
.container {
  padding: 20px;
  background: white;
  border-radius: 8px;
}

.title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}
```

### Global Styles

**File:** `src/index.css`

**Key Utilities:**
```css
/* Color Palette */
--primary-purple: #8b5cf6;
--background-gradient: linear-gradient(135deg, #e8d5f2 0%, #f0e7ff 100%);

/* Transitions */
transition: all 0.2s ease;

/* Shadows */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
```

### Design System

**Colors:**
- Primary: Purple (#8b5cf6, #a78bfa)
- Success: Green (#10b981)
- Warning: Orange (#f59e0b)
- Danger: Red (#ef4444)
- Neutral: Gray scale (#f3f4f6, #9ca3af, #374151)

**Typography:**
- Headings: 600 weight
- Body: 400 weight
- Small text: 14px
- System font stack

**Spacing:**
- 4px grid (4, 8, 12, 16, 20, 24, 32px)

**Border Radius:**
- Small: 4px
- Medium: 8px
- Large: 12px
- Circle: 50%

---

## Key Systems

### 1. Energy & Monetization System

**Purpose:** Limit AI feature usage, encourage Pro subscriptions

**Mechanics:**
- Users start with 10 energy units
- Each AI interaction costs 1 energy
- Energy persists in localStorage (`user_energy`)
- Pro subscription restores energy

**Implementation:**
```javascript
// In AuthContext
const { energy, decreaseEnergy, resetEnergy } = useAuth();

// Before AI call
if (energy <= 0) {
  setShowProModal(true);
  return;
}

// After successful AI call
decreaseEnergy();

// Pro subscription purchase
resetEnergy(10); // Restore to max
```

**Components:**
- `EnergyCircle.jsx` - Visual energy display
- `ProUpgradeModal.jsx` - Purchase prompt

### 2. Discipline (Subject) System

**Structure:**
```javascript
{
  id: string,           // e.g., "physics-7", "math-9"
  name: string,         // Display name
  groups: [],           // Student groups
  students: [],         // All students
  journal: {},          // Grades/attendance
  aiPrompts: {},        // AI configuration
  chatSessions: [],     // Chat history
  faqCache: {}          // Cached responses
}
```

**Usage Pattern:**
```javascript
// 1. Get discipline data
const { disciplineData, updateStudents } = useDisciplineData(disciplineId);

// 2. Read data
const students = disciplineData.students || [];

// 3. Update data
const newStudents = [...students, newStudent];
updateStudents(newStudents);
// Automatically persists to localStorage
```

**localStorage Key:** `openschool_discipline_${disciplineId}`

### 3. Parent-Child Linking System

**Database Structure:** (Backend)
```sql
parent_child table:
- parent_user_id (FK to users)
- student_user_id (FK to users)
- relationship ('father', 'mother', 'guardian')
- school_id
```

**Frontend Flow:**
1. Parent logs in
2. Backend validates children exist
3. Children data returned in login response
4. Stored in AuthContext: `parentChildren`
5. UI renders child cards with stats

**Validation:**
- Parents **must** have linked children to access system
- Backend returns 403 if no children linked
- School admin creates links via admin panel

**See:** `BACKEND_PARENTS_INTEGRATION.md` for complete specification

### 4. Invite Code System

**Purpose:** Students join teacher disciplines via unique codes

**Flow:**
1. Teacher generates invite code
2. Student enters code in profile
3. Backend validates and creates link
4. Student gains access to teacher's materials

**API:**
```javascript
import { useInviteCode } from '../../api/student';

const result = await useInviteCode({
  code: inviteCode,
  token
});

if (result.success) {
  // Refresh teacher list
}
```

---

## Common Tasks

### Adding a New Route

**File:** `src/App.jsx`

```javascript
import NewPage from './pages/NewPage';

function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/new-page" element={<NewPage />} />

      {/* Protected route */}
      <Route path="/teacher/new-feature" element={
        <PrivateRoute allowedRoles={['teacher']}>
          <NewFeature />
        </PrivateRoute>
      } />
    </Routes>
  );
}
```

### Adding a New API Endpoint

**File:** `src/config/api.js`

```javascript
export const API_ENDPOINTS = {
  // ... existing endpoints
  NEW_ENDPOINT: '/api/new-endpoint'
};
```

**Create service function:**
```javascript
// src/api/newService.js
import { API_URL, API_ENDPOINTS, getAuthHeaders } from '../config/api';

export const fetchNewData = async (token) => {
  const response = await fetch(
    `${API_URL}${API_ENDPOINTS.NEW_ENDPOINT}`,
    {
      method: 'GET',
      headers: getAuthHeaders(token)
    }
  );

  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};
```

### Adding a New Role

**1. Update AuthContext types**
```javascript
// src/context/AuthContext.jsx
// Add role to validation
const validRoles = ['teacher', 'student', 'parent', 'school_admin', 'superadmin', 'new_role'];
```

**2. Create login endpoint**
```javascript
// src/config/api.js
LOGIN_NEW_ROLE: '/auth/newrole/login'
```

**3. Add route in App.jsx**
```javascript
<Route path="/newrole/login" element={<NewRoleLoginPage />} />
<Route path="/newrole" element={
  <PrivateRoute allowedRoles={['new_role']}>
    <NewRoleApp />
  </PrivateRoute>
} />
```

**4. Update PrivateRoute**
```javascript
// src/utils/PrivateRoute.jsx
const loginPages = {
  // ... existing
  'new_role': '/newrole/login'
};
```

### Creating a Modal Component

```javascript
import React, { useState } from 'react';
import styles from './MyModal.module.css';

function MyModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({});

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Modal Title</h2>
          <button onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default MyModal;
```

### Adding AI Features with Energy System

```javascript
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import ProUpgradeModal from '../../components/common/ProUpgradeModal';

function AIFeature() {
  const { energy, decreaseEnergy } = useAuth();
  const [showProModal, setShowProModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAIRequest = async () => {
    // Check energy
    if (energy <= 0) {
      setShowProModal(true);
      return;
    }

    setLoading(true);
    try {
      // Make AI API call
      const result = await callAIEndpoint();

      // Decrease energy on success
      decreaseEnergy();

      // Handle result
      console.log(result);
    } catch (error) {
      console.error('AI request failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleAIRequest} disabled={loading || energy <= 0}>
        {loading ? 'Processing...' : 'Generate with AI'}
      </button>

      <ProUpgradeModal
        isOpen={showProModal}
        onClose={() => setShowProModal(false)}
      />
    </div>
  );
}
```

---

## Best Practices

### Code Quality

1. **Use functional components** with hooks (no class components)
2. **Destructure props** for clarity
3. **Extract reusable logic** into custom hooks
4. **Keep components small** (< 300 lines)
5. **Use meaningful variable names**
6. **Add error boundaries** for production

### State Management

1. **Use Context sparingly** - Only for truly global state
2. **Prefer local state** when possible
3. **Lift state up** only when needed by siblings
4. **Memoize expensive computations** with useMemo
5. **Avoid prop drilling** - Use Context or component composition

### Performance

1. **Lazy load routes** for code splitting
2. **Memoize components** with React.memo when appropriate
3. **Debounce search inputs** to reduce API calls
4. **Cache API responses** (e.g., FAQ cache pattern)
5. **Use loading states** for better UX

### Security

1. **Never expose sensitive data** in localStorage
2. **Validate user roles** on both frontend and backend
3. **Sanitize user input** before rendering
4. **Use HTTPS** for all API calls
5. **Implement CSRF protection** on backend

### localStorage Best Practices

```javascript
// Safe read with fallback
const getData = () => {
  try {
    const data = localStorage.getItem('key');
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error('localStorage read error:', error);
    return defaultValue;
  }
};

// Safe write
const setData = (data) => {
  try {
    localStorage.setItem('key', JSON.stringify(data));
  } catch (error) {
    console.error('localStorage write error:', error);
  }
};
```

### API Error Handling

```javascript
async function fetchData(token) {
  try {
    const response = await fetch(url, {
      headers: getAuthHeaders(token)
    });

    if (!response.ok) {
      // Handle specific status codes
      if (response.status === 401) {
        // Redirect to login
        logout();
        return;
      }

      if (response.status === 403) {
        throw new Error('Access denied');
      }

      throw new Error('Request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    // Show user-friendly message
    throw error;
  }
}
```

### Component Organization

```javascript
// ✅ Good - Clear separation of concerns
function StudentDashboard() {
  // Hooks
  const { token } = useAuth();
  const [students, setStudents] = useState([]);

  // Effects
  useEffect(() => {
    loadStudents();
  }, []);

  // API calls
  const loadStudents = async () => {
    const data = await fetchStudents(token);
    setStudents(data);
  };

  // Event handlers
  const handleStudentClick = (student) => {
    console.log(student);
  };

  // Render helpers
  const renderStudent = (student) => (
    <StudentCard
      key={student.id}
      student={student}
      onClick={handleStudentClick}
    />
  );

  // Main render
  return (
    <div>
      {students.map(renderStudent)}
    </div>
  );
}
```

---

## Troubleshooting

### Common Issues

**1. "Token expired" errors**
```javascript
// Check token validity
const token = localStorage.getItem('token');
if (!token) {
  // Redirect to login
  logout();
}
```

**2. localStorage quota exceeded**
```javascript
// Clear old discipline data
Object.keys(localStorage)
  .filter(key => key.startsWith('openschool_discipline_'))
  .forEach(key => {
    const data = JSON.parse(localStorage.getItem(key));
    if (isOldData(data)) {
      localStorage.removeItem(key);
    }
  });
```

**3. Parent login without children**
- Error: "У вас нет привязанных детей"
- Solution: Contact school admin to link children
- See: `BACKEND_PARENTS_INTEGRATION.md`

**4. Invite code not working**
```javascript
// Verify token is included
await useInviteCode({ code, token });

// Check backend logs for validation errors
```

**5. Energy not updating**
```javascript
// Force sync from localStorage
const storedEnergy = localStorage.getItem('user_energy');
if (storedEnergy) {
  setEnergy(parseInt(storedEnergy));
}
```

### Debug Tips

**1. Check localStorage state**
```javascript
console.log('Auth State:', {
  token: localStorage.getItem('token'),
  role: localStorage.getItem('role'),
  schoolId: localStorage.getItem('school_id'),
  energy: localStorage.getItem('user_energy')
});
```

**2. Inspect API calls**
```javascript
// Add logging to API helper
export const getAuthHeaders = (token) => {
  console.log('API Request with token:', token?.substring(0, 20) + '...');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};
```

**3. Component render debugging**
```javascript
useEffect(() => {
  console.log('Component mounted/updated:', {
    props,
    state
  });
}, [props, state]);
```

---

## AI Assistant Guidelines

### When Working on This Project

1. **Always check role context** - Understand which user role the feature is for
2. **Maintain role separation** - Don't mix teacher/student/parent features
3. **Preserve energy system** - Include energy checks for AI features
4. **Use existing patterns** - Follow established component/API patterns
5. **Update localStorage carefully** - Maintain data consistency
6. **Test authentication flows** - Verify role-based access works
7. **Check API endpoints** - Ensure backend routes exist before using
8. **Respect component boundaries** - Keep presentational components pure
9. **Handle errors gracefully** - Always show user-friendly messages
10. **Document changes** - Update this file if adding major features

### Before Making Changes

- [ ] Understand the affected user role(s)
- [ ] Check if similar functionality exists elsewhere
- [ ] Verify API endpoint availability in `src/config/api.js`
- [ ] Consider impact on AuthContext and state management
- [ ] Plan localStorage structure if adding new data
- [ ] Review role-based access requirements
- [ ] Consider energy system integration for AI features

### After Making Changes

- [ ] Test login flow for affected roles
- [ ] Verify localStorage updates correctly
- [ ] Check API calls with proper authentication
- [ ] Test role-based route protection
- [ ] Ensure UI updates reflect state changes
- [ ] Validate error handling paths
- [ ] Update documentation if needed

### Code Review Checklist

- [ ] Follows existing naming conventions
- [ ] Uses CSS modules for styling
- [ ] Includes proper error handling
- [ ] Handles loading states
- [ ] Validates user input
- [ ] Uses AuthContext for auth checks
- [ ] Implements energy checks (if AI feature)
- [ ] Maintains role separation
- [ ] Includes meaningful console logs for debugging
- [ ] Updates relevant documentation

---

## Additional Resources

### Documentation Files
- `README.md` - Project overview (currently minimal)
- `BACKEND_PARENTS_INTEGRATION.md` - Complete parent system specification
- `CLAUDE.md` - This file

### External References
- React Docs: https://react.dev
- React Router: https://reactrouter.com
- Vite Docs: https://vitejs.dev
- Lucide Icons: https://lucide.dev

### Project Contacts
- Backend API: `https://openschoolbackend-production.up.railway.app`
- Deployment: Vercel

---

**Last Updated:** 2025-11-16
**Version:** 1.0.0
**Maintained by:** AI Assistant (Claude)
