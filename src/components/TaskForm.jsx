import { useState } from 'react'
import '../styles/TaskForm.css'

/**
 * Form component for adding new tasks
 * @param {Object} props
 * @param {Function} props.onAddTask - Callback function to add a new task
 * @param {Object} props.t - Translation strings
 */
function TaskForm({ onAddTask, t }) {
    const [taskText, setTaskText] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        // Prevent empty or whitespace-only submissions
        if (!taskText.trim()) {
            return
        }

        // Add the task
        onAddTask(taskText)

        // Clear input after successful submission
        setTaskText('')
    }

    const handleInputChange = (e) => {
        setTaskText(e.target.value)
    }

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="task-input"
                placeholder={t.inputPlaceholder}
                value={taskText}
                onChange={handleInputChange}
                autoFocus
            />
            <button type="submit" className="task-submit-btn">
                {t.addTask}
            </button>
        </form>
    )
}

export default TaskForm
