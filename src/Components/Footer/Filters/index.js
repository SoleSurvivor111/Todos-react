import React,{Component} from 'react'
import './Filters.scss'

export default class Filters extends Component {
  render() {
    const {filterCompletedTasks, filterAllTasks, filterActiveTasks } = this.props
    return (
      <ul className="filters">
        <li className='li' key={33}
        onMouseDown={filterAllTasks}>
          <a href="#/" className="all highlight">All</a>
        </li>
        <li className='li' key={32}
        onMouseDown={filterActiveTasks}>
          <a
            href="#/active"
            className='active'>
              Active
          </a>
        </li>
        <li className='li' key={3}
        onMouseDown={filterCompletedTasks}>
          <a
            href="#/completed"
            className="completed"
            >
              Completed
          </a>
        </li>
      </ul>
    )
  }
}
