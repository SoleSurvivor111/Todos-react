import React,{Component} from 'react'
import './Filters.scss'

export default class Filters extends Component {
  render() {
    return (
      <ul className="filters">
        <li className='li'>
          <a href="#/" className="all js-all highlight">All</a>
        </li>
        <li className='li'>
          <a href="#/active" className='active js-active'>Active</a>
        </li>
        <li className='li'>
          <a href="#/completed" className="completed js-completed">Completed</a>
        </li>
      </ul>
    )
  }
}
