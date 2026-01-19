import '../styles/TaskFilters.css'

/**
 * Filter controls and task counter component
 * @param {Object} props
 * @param {string} props.filter - Current active filter ('all' | 'active' | 'completed')
 * @param {Function} props.onFilterChange - Callback to change the active filter
 * @param {number} props.activeCount - Number of active (incomplete) tasks
 * @param {Function} props.onClearCompleted - Callback to remove all completed tasks
 * @param {Object} props.t - Translation strings
 */
function TaskFilters({ filter, onFilterChange, activeCount, onClearCompleted, t }) {
    return (
        <div className="task-filters">
            {/* Task counter */}
            <div className="task-counter">
                <strong>{activeCount}</strong> {activeCount === 1 ? t.itemLeft : t.itemsLeft}
            </div>

            {/* Filter buttons */}
            <div className="filter-buttons">
                <button
                    className={`filter-btn ${filter === 'all' ? 'filter-btn-active' : ''}`}
                    onClick={() => onFilterChange('all')}
                >
                    {t.filterAll}
                </button>
                <button
                    className={`filter-btn ${filter === 'active' ? 'filter-btn-active' : ''}`}
                    onClick={() => onFilterChange('active')}
                >
                    {t.filterActive}
                </button>
                <button
                    className={`filter-btn ${filter === 'completed' ? 'filter-btn-active' : ''}`}
                    onClick={() => onFilterChange('completed')}
                >
                    {t.filterCompleted}
                </button>
            </div>

            {/* Clear Completed button */}
            <button
                className="clear-completed-btn"
                onClick={onClearCompleted}
            >
                {t.clearCompleted}
            </button>
        </div>
    )
}

export default TaskFilters
