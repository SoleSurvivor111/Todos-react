import React,{Component} from 'react'
import './Filters.scss'

export default class Filters extends Component {


  render() {
    const {allTasksFilter, activeTasksFilter, completedTasksFilter, filterState} = this.props
    const all =  filterState === 'All' ? 'All highlight' : 'All'
    const  active =  filterState === 'Active' ? 'Active highlight' : 'Active'
    const  completed =  filterState === 'Completed' ? 'Completed highlight' : 'Active'
    return (
      <ul className="filters" >
             <li className='li' key={33} onMouseDown={allTasksFilter}>
               <a
                 href="#/"
                 className={all}
               >
                All
              </a>
             </li>
             <li className='li' key={32} onMouseDown={activeTasksFilter}>
               <a
                 href="#/active"
                 className={active}
               >
                 Active
               </a>
             </li>
             <li className='li' key={3} onMouseDown={completedTasksFilter}>
               <a
                 href="#/completed"
                 className={completed}
               >
                 Completed
               </a>
             </li>
           </ul>
    )
  }
}
