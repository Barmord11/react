import { useState } from 'react'
import '../styles/TaskItem.css'

/**
 * Individual task item component with inline editing capabilities
 * @param {Object} props
 * @param {Object} props.task - Task object containing id, text, and completed status
 * @param {Function} props.onToggle - Callback to toggle task completion
 * @param {Function} props.onEdit - Callback to update task text
 * @param {Function} props.onDelete - Callback to delete the task
 */
function TaskItem({ task, onToggle, onEdit, onDelete }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(task.text)

    // Toggle edit mode on double-click
    const handleDoubleClick = () => {
        setIsEditing(true)
        setEditText(task.text)
    }

    // Save changes on blur or Enter key
    const handleSave = () => {
        if (editText.trim()) {
            onEdit(task.id, editText)
            setIsEditing(false)
        } else {
            // If empty, cancel the edit
            setEditText(task.text)
            setIsEditing(false)
        }
    }

    // Handle keyboard shortcuts
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave()
        } else if (e.key === 'Escape') {
            // Cancel editing - revert to original text
            setEditText(task.text)
            setIsEditing(false)
        }
    }

    // Handle edit button click
    const handleEditClick = () => {
        setIsEditing(true)
        setEditText(task.text)
    }

    return (
        <li className={`task-item ${task.completed ? 'task-item-completed' : ''}`}>
            <div className="task-item-content">
                {/* Checkbox for completion toggle */}
                <input
                    type="checkbox"
                    className="task-checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                    aria-label={`Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`}
                />

                {/* Task text or edit input */}
                {isEditing ? (
                    <input
                        type="text"
                        className="task-edit-input"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                ) : (
                    <span
                        className="task-text"
                        onDoubleClick={handleDoubleClick}
                        title="Double-click to edit"
                    >
                        {task.text}
                    </span>
                )}
            </div>

            {/* Action buttons */}
            <div className="task-actions">
                {isEditing ? (
                    <button
                        className="task-btn task-save-btn"
                        onClick={handleSave}
                        aria-label={`Save changes to "${task.text}"`}
                    >
                        ✓
                    </button>
                ) : (
                    <button
                        className="task-btn task-edit-btn"
                        onClick={handleEditClick}
                        aria-label={`Edit "${task.text}"`}
                    >
                        ✏️
                    </button>
                )}
                <button
                    className="task-btn task-delete-btn"
                    onClick={() => onDelete(task.id)}
                    aria-label={`Delete "${task.text}"`}
                >
                    🗑️
                </button>
            </div>
        </li>
    )
}

export default TaskItem
