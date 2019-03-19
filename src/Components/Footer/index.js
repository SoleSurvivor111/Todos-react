import React, {Component} from 'react'
import Filters from './Filters'
import './Footer.scss'
export default class Footer extends Component {
  render () {
    const {
      allTasksFilter,
      activeTasksFilter,
      completedTasksFilter,
      clearCompleted,
      listTask
    } = this.props
    const activeTasks = listTask.filter(task => {
      return task.checked === false
    }).length
    const completedTasks = listTask.filter(task => {
      return task.checked === true
    }).length
    const theNumberOfActiveTasks = activeTasks === 1 ? '1 item left': `${activeTasks} items left`
    const clearCompletedValue = completedTasks === 0 ? false : 'Clear completed'
    const footer = listTask.length !== 0 && <footer className='footer'>
            <span className='footer__todo-count'>{theNumberOfActiveTasks}</span>
            <Filters
              allTasksFilter={allTasksFilter}
              activeTasksFilter={activeTasksFilter}
              completedTasksFilter={completedTasksFilter}
            />
            <button
              className='footer__clear-completed'
              onMouseDown={clearCompleted}
            >{clearCompletedValue}</button>
          </footer>
    return footer
  }
}
