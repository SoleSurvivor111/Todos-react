import React, {Component} from 'react'
import style from './Task.module.scss'

 class ListTask extends Component {
   createTasks = task => {
    const filterState = this.props.filterState
    let liClassName;
    if (filterState === 'All') {
      liClassName = style.le
    } else if (filterState === 'Active') {
      liClassName = task.checked ? `${style.le} hidden` : style.le
    } else if ((filterState === 'Completed')) {
      liClassName = task.checked ? style.le : `${style.le} hidden`
    }

     return (
       <li className={liClassName} data-id={task.key} key={task.key}  >
         <div className={style.view}>
           <input
             className={style.view__toggle}
             type='checkbox'
             onMouseDown={() => this.props.onChangeChecked(task.key)}
             checked={task.checked}
           />
           <div className={style.view__checkbox}/>
         <label className={style.view__lable} onDoubleClick={this.props.handleEditInput}>{task.text}</label>
           <button
            className={style.view__destroy}
            onMouseDown={() => this.props.onDeleteTask(task.key)}
           />
           <input type={'textarea'} className={style.view__edit}
            onBlur={this.props.handleRemoveEditInput}
            onKeyDown={this.props.handleKeysRemoveEditInput}
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
