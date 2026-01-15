import '../styles/TaskFilters.css'

/**
 * Filter controls and task counter component
 * @param {Object} props
 * @param {string} props.filter - Current active filter ('all' | 'active' | 'completed')
 * @param {Function} props.onFilterChange - Callback to change the active filter
 * @param {number} props.activeCount - Number of active (incomplete) tasks
 */
function TaskFilters({ filter, onFilterChange, activeCount }) {
    return (
        <div className="task-filters">
            {/* Task counter */}
            <div className="task-counter">
                <strong>{activeCount}</strong> {activeCount === 1 ? 'item' : 'items'} left
            </div>

            {/* Filter buttons */}
            <div className="filter-buttons">
                <button
                    className={`filter-btn ${filter === 'all' ? 'filter-btn-active' : ''}`}
                    onClick={() => onFilterChange('all')}
                >
                    All
                </button>
                <button
                    className={`filter-btn ${filter === 'active' ? 'filter-btn-active' : ''}`}
                    onClick={() => onFilterChange('active')}
                >
                    Active
                </button>
                <button
                    className={`filter-btn ${filter === 'completed' ? 'filter-btn-active' : ''}`}
                    onClick={() => onFilterChange('completed')}
                >
                    Completed
                </button>
            </div>
        </div>
    )
}

export default TaskFilters
