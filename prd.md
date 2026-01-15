# Product Requirements Document (PRD)
## Task Management Application

### 1. Project Overview

**Project Name:** Task Management (Todo) Application  
**Tech Stack:** React 19 (Functional Components), Vite, CSS Modules/Vanilla CSS, LocalStorage  
**Target Role:** Senior React Developer  
**Objective:** Build a modern, accessible task management application with persistent data storage.

---

### 2. Core Features

#### 2.1 Task Management
The application must support full CRUD operations on tasks:

- **Create:** Add new tasks with text descriptions
- **Read:** Display all tasks in a list format
- **Update:** 
  - Toggle completion status (mark as complete/incomplete)
  - Edit existing task descriptions inline
- **Delete:** Remove tasks permanently

#### 2.2 Filtering System
Implement three filter states:

- **All:** Display all tasks regardless of status
- **Active:** Show only incomplete tasks
- **Completed:** Show only completed tasks

**Requirements:**
- Active filter must be visually highlighted
- Filter state should be reflected in the UI
- Filtering should be instant (no page reload)

#### 2.3 Data Persistence
- Use browser's `localStorage` API
- Automatically save tasks on every state change
- Load saved tasks on application mount
- Sync state with storage using `useEffect` hook

#### 2.4 Task Counter
- Display count of remaining "Active" (incomplete) tasks
- Update counter dynamically as tasks are completed/uncompleted
- Format: "X items left" or similar user-friendly text

---

### 3. Technical Architecture

#### 3.1 Component Structure
Minimum of **4 meaningful components** with separation of concerns:

**Suggested Component Breakdown:**

| Component | Responsibility |
|-----------|----------------|
| `App` | Root component, owns state, manages localStorage sync |
| `TaskForm` | Input form for adding new tasks |
| `TaskList` | Container component for rendering task list |
| `TaskItem` | Individual task component with edit/delete/toggle actions |
| `TaskFilters` | Filter buttons and task counter display |

#### 3.2 State Management

**Rules:**
- Use **React Hooks only** (`useState`, `useEffect`)
- **No external state management libraries** (Redux, Zustand, MobX, etc.)
- Follow **"Props Down, Events Up"** pattern
- Parent components pass data via props
- Child components communicate via callback functions

**State Shape:**
```javascript
{
  tasks: [
    {
      id: 'unique-id',        // crypto.randomUUID() or Date.now()
      text: 'Task description',
      completed: false
    }
  ],
  filter: 'all' // 'all' | 'active' | 'completed'
}
```

#### 3.3 Technical Constraints

- **Unique IDs:** Every task must have a unique identifier using:
  - `crypto.randomUUID()` (preferred), or
  - `Date.now()` (fallback)
  
- **LocalStorage Implementation:**
  - Key: `tasks` or similar
  - Store as JSON string
  - Parse on load with error handling

- **Build Tool:** Vite (already configured in this project)

- **Code Quality:**
  - Zero React warnings/errors in console
  - Meaningful variable and function names
  - Consistent code formatting
  - Proper component organization

---

### 4. User Interface Requirements

#### 4.1 Visual Requirements
- Clean, modern design
- Accessible UI elements (proper labels, focus states)
- Clear visual feedback for:
  - Completed tasks (strikethrough, different color, etc.)
  - Active filter state (highlighted button/tab)
  - Hover states on interactive elements

#### 4.2 User Interactions
- **Add Task:** Input field + submit button (or Enter key)
- **Toggle Complete:** Checkbox or clickable element
- **Edit Task:** Double-click or edit button to enable inline editing
- **Delete Task:** Delete button with clear icon/label
- **Filter:** Clickable filter buttons (All/Active/Completed)

---

### 5. Deliverables

#### 5.1 Code Structure
Organized folder structure:
```
src/
├── components/
│   ├── App.jsx
│   ├── TaskForm.jsx
│   ├── TaskList.jsx
│   ├── TaskItem.jsx
│   └── TaskFilters.jsx
├── hooks/          (optional, for custom hooks)
├── styles/         (CSS modules or vanilla CSS)
└── main.jsx
```

#### 5.2 Documentation (README.md)
Must include:

1. **Project Description** - Short overview of the application
2. **Installation & Setup** - Clear step-by-step instructions:
   - Clone repository
   - Install dependencies (`npm install`)
   - Run development server (`npm run dev`)
3. **Component Architecture** - List each component with one-sentence responsibility description
4. **Known Issues/Limitations** - Transparent documentation of any limitations

---

### 6. Acceptance Criteria

The project is considered complete when:

✅ All CRUD operations work correctly  
✅ All three filters work and active filter is visually highlighted  
✅ Tasks persist across browser sessions using localStorage  
✅ Active task counter displays correctly  
✅ At least 4 meaningful components with proper separation of concerns  
✅ No React warnings or errors in browser console  
✅ Code follows modern React best practices (hooks, functional components)  
✅ README.md is comprehensive and accurate  
✅ Project runs without errors using `npm run dev`  

---

### 7. Non-Functional Requirements

- **Performance:** Application should load and respond instantly (< 100ms for interactions)
- **Browser Compatibility:** Modern browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)
- **Accessibility:** Keyboard navigation support, semantic HTML
- **Code Maintainability:** Clear separation of concerns, reusable components
- **Error Handling:** Graceful handling of localStorage errors or quota exceeded

---

### 8. Out of Scope

The following features are **not required** for this version:

- User authentication
- Backend/API integration
- Task categories or tags
- Due dates or priorities
- Drag-and-drop reordering
- Task search functionality
- Bulk actions
- Undo/redo functionality
- Multiple task lists

---

### 9. Technical Implementation Notes

#### LocalStorage Sync Pattern
```javascript
// Save to localStorage whenever tasks change
useEffect(() => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}, [tasks]);

// Load from localStorage on mount
useEffect(() => {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    setTasks(JSON.parse(saved));
  }
}, []);
```

#### Filter Logic
```javascript
const filteredTasks = tasks.filter(task => {
  if (filter === 'active') return !task.completed;
  if (filter === 'completed') return task.completed;
  return true; // 'all'
});
```

---

### 10. Definition of Done

- [ ] All features implemented per specifications
- [ ] Code is clean, well-organized, and follows React best practices
- [ ] No console warnings or errors
- [ ] README.md is complete and accurate
- [ ] Application works correctly in development mode (`npm run dev`)
- [ ] All acceptance criteria met
