import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Filters from './Filters/Filters'
import style from './Footer.module.scss'

export default class Footer extends Component {
  static propTypes = {
    handleAllTasksFilter: PropTypes.func.isRequired,
    handleActiveTasksFilter: PropTypes.func.isRequired,
    handleCompletedTasksFilter: PropTypes.func.isRequired,
    completedTasks: PropTypes.number.isRequired,
    listTask: PropTypes.array.isRequired,
    filterState: PropTypes.string.isRequired,
    handleClearCompleted: PropTypes.func.isRequired
  }

  render () {
    const {
      listTask,
      completedTasks,
      filterState
    } = this.props
    const activeTasks = listTask.length - completedTasks;
    const theNumberOfActiveTasks = activeTasks === 1 ? '1 item left': `${activeTasks} items left`
    const clearCompletedValue = completedTasks === 0 ? false : 'Clear completed'
    const footer = listTask.length !== 0 && <footer className={style.footer}>
            <span className={style['footer__todo-count']}>{theNumberOfActiveTasks}</span>
            <Filters
              filterState={filterState}
              handleAllTasksFilter={this.props.handleAllTasksFilter}
              handleActiveTasksFilter={this.props.handleActiveTasksFilter}
              handleCompletedTasksFilter={this.props.handleCompletedTasksFilter}
            />
            <button
              className={style['footer__clear-completed']}
              onMouseDown={this.props.handleClearCompleted}
            >{clearCompletedValue}</button>
          </footer>
    return footer
  }
}
