import TaskItem from './TaskItem'
import '../styles/TaskList.css'

/**
 * Container component that renders the list of tasks
 * @param {Object} props
 * @param {Array} props.tasks - Array of task objects to display
 * @param {Function} props.onToggle - Callback to toggle task completion
 * @param {Function} props.onEdit - Callback to edit task text
 * @param {Function} props.onDelete - Callback to delete a task
 */
function TaskList({ tasks, onToggle, onEdit, onDelete }) {
    // Handle empty state
    if (tasks.length === 0) {
        return (
            <div className="task-list-empty">
                <p>No tasks to display. Add a task to get started! 🎯</p>
            </div>
        )
    }

    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    )
}

export default TaskList
