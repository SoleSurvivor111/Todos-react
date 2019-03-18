import React, {Component} from 'react'
import './Task.scss'

 class ListTask extends Component {
   createTasks = task => {
     const {deleteTask,changeChecked,editInput,removeEditInput,keysRemoveEditInput} = this.props
     return (
       <li className='le'data-id={task.key} key={task.key}  >
         <div className='view'>
           <input
             className='view__toggle'
             type='checkbox'
             onMouseDown={() => changeChecked(task.key)}
             defaultChecked={task.checked}
           />
           <div className='view__checkbox'/>
         <label className='view__lable' onDoubleClick={editInput}>{task.text}</label>
           <button
            className='view__destroy'
            onMouseDown={() => deleteTask(task.key)}
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
