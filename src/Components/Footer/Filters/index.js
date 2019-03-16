import React,{Component} from 'react'
import './Filters.scss'

export default class Filters extends Component {


  render() {
    const {allTasksFilter, activeTasksFilter, completedTasksFilter} = this.props

    return (
      <ul className="filters" >
             <li className='li' key={33} onMouseDown={allTasksFilter}>
               <a
                 href="#/"
                 className="all highlight"
               >
                All
              </a>
             </li>
             <li className='li' key={32} onMouseDown={activeTasksFilter}>
               <a
                 href="#/active"
                 className='active'
               >
                 Active
               </a>
             </li>
             <li className='li' key={3} onMouseDown={completedTasksFilter}>
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
