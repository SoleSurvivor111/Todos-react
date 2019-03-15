import React, {Component} from 'react'
import Filters from './Filters'
import './Footer.scss'
export default class Footer extends Component {
  render () {
    const {filterState,filterAllTasks,filterActiveTasks,filterCompletedTasks} = this.props
    return (
      <footer className="footer js-footer">
        <span className="footer__todo-count js-todo-count"></span>
        <Filters
          filterState={filterState}
          filterAllTasks={filterAllTasks}
          filterActiveTasks={filterActiveTasks}
          filterCompletedTasks={filterCompletedTasks}
        />
        <button className="footer__clear-completed js-clear-completed">Clear completed</button>
      </footer>
    )
  }
}
