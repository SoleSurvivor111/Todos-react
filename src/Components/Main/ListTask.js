import React, {Component} from 'react'
import './Task.scss'

 class ListTask extends Component {
   createTasks = task => {
     return (
       <li className='le'data-id={task.key} key={task.key}>
         <div className='view'>
           <input className='view__toggle' type='checkbox'/>
           <div className='view__checkbox'/>
           <label className='view__lable'>{task.text}</label>
           <button className='view__destroy' onClick={() => this.props.deleteTask(task.key)}/>
         </div>
       </li>
     )
   }
  render() {
    const listTask = this.props.listTask
    const createList = listTask.map(this.createTasks)
    return createList
  }
}
export default ListTask
