import React, {Component} from 'react'
import style from 'Components/Main/Task.module.scss'
import PropTypes from 'prop-types'

 class ListTask extends Component {
   static propTypes = {
     filterState: PropTypes.string.isRequired,
     listTask: PropTypes.array.isRequired,
     editButtonState: PropTypes.object.isRequired,
     onChangeChecked: PropTypes.func.isRequired,
     onDeleteTask: PropTypes.func.isRequired,
     handleChange: PropTypes.func.isRequired,
     onEditInput: PropTypes.func.isRequired,
     handleRemoveEditInput: PropTypes.func.isRequired,
     handleKeysRemoveEditInput: PropTypes.func.isRequired,
   }

   createTasks = task => {
    const {filterState, editButtonState} = this.props
    let liClassName;
    if (filterState === 'All') {
      liClassName = style.le
    } else if (filterState === 'Active') {
      liClassName = task.checked ? `${style.le} hidden` : style.le
    } else if ((filterState === 'Completed')) {
      liClassName = task.checked ? style.le : `${style.le} hidden`
    }

    const viewToggleClass = editButtonState.key === task.key ?
     `${style.view__toggle} invisible`
     :
     style.view__toggle
    const viewCheckboxClass = editButtonState.key === task.key ?
     `${style.view__checkbox} invisible`
     :
     style.view__checkbox
     const editButton = editButtonState.key !== task.key ? false :
     <input type={'textarea'} className={style.view__edit}
       onBlur={() => this.props.handleRemoveEditInput(task.key)}
       onKeyDown={this.props.handleKeysRemoveEditInput}
       onChange={this.props.handleChange}
       defaultValue={task.text}
       autoFocus
     />
     return (
       <li className={liClassName} data-id={task.key} key={task.key}  >
         <div className={style.view}>
           <input
             className={viewToggleClass}
             type='checkbox'
             onMouseDown={() => this.props.onChangeChecked(task.key)}
             checked={task.checked}
           />
           <div className={viewCheckboxClass}/>
         <label
          className={style.view__lable}
          onDoubleClick={() => this.props.onEditInput(task.key, task.text, editButtonState)}>
            {task.text}
         </label>
         <button
          className={style.view__destroy}
          onMouseDown={() => this.props.onDeleteTask(task.key)}
         />
         {editButton}
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
