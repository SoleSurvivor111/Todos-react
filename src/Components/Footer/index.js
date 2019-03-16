import React, {Component} from 'react'
import Filters from './Filters'
import './Footer.scss'
export default class Footer extends Component {
  render () {
    const {
      filterState,
      allTasksFilter,
      activeTasksFilter,
      completedTasksFilter,
      clearCompleted,
      listTask
    } = this.props

    const footer = listTask.length !== 0 && <footer className="footer">
            <span className="footer__todo-count js-todo-count"></span>
            <Filters
              filterState={filterState}
              allTasksFilter={allTasksFilter}
              activeTasksFilter={activeTasksFilter}
              completedTasksFilter={completedTasksFilter}
            />
            <button
              className="footer__clear-completed"
              onMouseDown={clearCompleted}
            >Clear completed</button>
          </footer>
    return footer
  }
}
