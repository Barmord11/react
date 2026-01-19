import { useState, useEffect, useRef } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import TaskFilters from './components/TaskFilters'
import { translations } from './translations'
import './styles/App.css'

function App() {
  // State management
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all') // 'all' | 'active' | 'completed'
  const [language, setLanguage] = useState('en') // 'en' | 'he'

  // Track first render to prevent overwriting localStorage on initial mount
  // This ref prevents the save effect from running before the load effect completes
  const isFirstRender = useRef(true)

  // Load tasks from localStorage on mount
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem('tasks')
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks))
      }

      // Load language preference
      const savedLanguage = localStorage.getItem('language')
      if (savedLanguage === 'he' || savedLanguage === 'en') {
        setLanguage(savedLanguage)
        document.documentElement.dir = savedLanguage === 'he' ? 'rtl' : 'ltr'
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error)
    }
  }, [])

  // Save tasks to localStorage whenever they change
  // Skip first render to avoid overwriting loaded data with empty array
  useEffect(() => {
    // On first render, just mark it as complete and skip saving
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    try {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error)
    }
  }, [tasks])

  /**
   * Adds a new task to the task list
   * @param {string} text - The task description
   * @returns {void}
   */
  const addTask = (text) => {
    // Validate input - reject empty or whitespace-only text
    if (!text || text.trim() === '') return

    const newTask = {
      id: crypto.randomUUID(), // Generate unique ID
      text: text.trim(),       // Remove leading/trailing whitespace
      completed: false
    }

    setTasks([...tasks, newTask])
  }

  /**
   * Toggles the completion status of a task
   * @param {string} id - The unique task ID
   * @returns {void}
   */
  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  /**
   * Updates the text of an existing task
   * @param {string} id - The unique task ID
   * @param {string} newText - The updated task description
   * @returns {void}
   */
  const editTask = (id, newText) => {
    // Validate input - reject empty or whitespace-only text
    if (!newText || newText.trim() === '') return

    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText.trim() } : task
    ))
  }

  /**
   * Removes a task from the task list
   * @param {string} id - The unique task ID
   * @returns {void}
   */
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  /**
   * Removes all completed tasks from the task list
   * @returns {void}
   */
  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed))
  }

  /**
   * Toggles between English and Hebrew languages
   * @returns {void}
   */
  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'he' : 'en'
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
    document.documentElement.dir = newLanguage === 'he' ? 'rtl' : 'ltr'
  }

  // Get current translations
  const t = translations[language]

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true // 'all'
  })

  // Count active tasks
  const activeTaskCount = tasks.filter(task => !task.completed).length

  return (
    <div className="app">
      <div className="app-header">
        <h1>{t.title}</h1>
        <button
          className="language-toggle-btn"
          onClick={toggleLanguage}
          aria-label="Toggle language"
          title={language === 'en' ? 'Switch to Hebrew' : 'Switch to English'}
        >
          {language === 'en' ? '🇮🇱' : '🇺🇸'}
        </button>
      </div>

      {/* TaskForm component */}
      <TaskForm onAddTask={addTask} t={t} />

      {/* TaskList component */}
      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onEdit={editTask}
        onDelete={deleteTask}
        filter={filter}
        t={t}
      />

      {/* TaskFilters component */}
      <TaskFilters
        filter={filter}
        onFilterChange={setFilter}
        activeCount={activeTaskCount}
        onClearCompleted={clearCompleted}
        t={t}
      />
    </div>
  )
}

export default App
