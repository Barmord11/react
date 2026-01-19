import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskFilters from './TaskFilters'

describe('TaskFilters', () => {
    it('renders all three filter buttons', () => {
        const mockOnFilterChange = vi.fn()

        render(
            <TaskFilters
                filter="all"
                onFilterChange={mockOnFilterChange}
                activeCount={5}
            />
        )

        expect(screen.getByText('All')).toBeInTheDocument()
        expect(screen.getByText('Active')).toBeInTheDocument()
        expect(screen.getByText('Completed')).toBeInTheDocument()
    })

    it('displays the correct active task count', () => {
        const mockOnFilterChange = vi.fn()

        render(
            <TaskFilters
                filter="all"
                onFilterChange={mockOnFilterChange}
                activeCount={3}
            />
        )

        expect(screen.getByText('3')).toBeInTheDocument()
        expect(screen.getByText('items left')).toBeInTheDocument()
    })

    it('displays singular "item" when count is 1', () => {
        const mockOnFilterChange = vi.fn()

        render(
            <TaskFilters
                filter="all"
                onFilterChange={mockOnFilterChange}
                activeCount={1}
            />
        )

        expect(screen.getByText('item left')).toBeInTheDocument()
    })

    it('highlights the active filter button', () => {
        const mockOnFilterChange = vi.fn()

        const { container } = render(
            <TaskFilters
                filter="active"
                onFilterChange={mockOnFilterChange}
                activeCount={5}
            />
        )

        const activeButton = screen.getByText('Active')
        expect(activeButton).toHaveClass('filter-btn-active')
    })

    it('calls onFilterChange when a filter button is clicked', async () => {
        const mockOnFilterChange = vi.fn()
        const user = userEvent.setup()

        render(
            <TaskFilters
                filter="all"
                onFilterChange={mockOnFilterChange}
                activeCount={5}
            />
        )

        const activeButton = screen.getByText('Active')
        await user.click(activeButton)

        expect(mockOnFilterChange).toHaveBeenCalledWith('active')
        expect(mockOnFilterChange).toHaveBeenCalledTimes(1)
    })

    it('all filter buttons are clickable', async () => {
        const mockOnFilterChange = vi.fn()
        const user = userEvent.setup()

        render(
            <TaskFilters
                filter="all"
                onFilterChange={mockOnFilterChange}
                activeCount={5}
            />
        )

        await user.click(screen.getByText('All'))
        expect(mockOnFilterChange).toHaveBeenCalledWith('all')

        await user.click(screen.getByText('Active'))
        expect(mockOnFilterChange).toHaveBeenCalledWith('active')

        await user.click(screen.getByText('Completed'))
        expect(mockOnFilterChange).toHaveBeenCalledWith('completed')

        expect(mockOnFilterChange).toHaveBeenCalledTimes(3)
    })
})
