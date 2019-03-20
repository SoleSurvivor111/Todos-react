import React, {Component} from 'react'
import './Task.scss'

 class ListTask extends Component {
   createTasks = task => {
    const filterState = this.props.filterState
    let liClassName;
    if (filterState === 'All') {
      liClassName = 'le'
    } else if (filterState === 'Active') {
      liClassName = task.checked ? 'le hidden' : 'le'
    } else if ((filterState === 'Completed')) {
      liClassName = task.checked ? 'le' : 'le hidden'
    }
     const {
       onDeleteTask,
       changeChecked,
       editInput,
       removeEditInput,
       keysRemoveEditInput
     } = this.props
     return (
       <li className={liClassName} data-id={task.key} key={task.key}  >
         <div className='view'>
           <input
             className='view__toggle'
             type='checkbox'
             onMouseDown={() => changeChecked(task.key)}
             checked={task.checked}
           />
           <div className='view__checkbox'/>
         <label className='view__lable' onDoubleClick={editInput}>{task.text}</label>
           <button
            className='view__destroy'
            onMouseDown={() => onDeleteTask(task.key)}
           />
           <input type={'textarea'} className={'le__edit'}
            onBlur={removeEditInput}
            onKeyDown={keysRemoveEditInput}
          />
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
