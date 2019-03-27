import React, { Component } from 'react';
import style from 'Components/Main/Task.module.scss';
import PropTypes from 'prop-types';

class ListTask extends Component {
   static propTypes = {
     filterState: PropTypes.string.isRequired,
     listTask: PropTypes.func.isRequired,
     editButtonState: PropTypes.objectOf.isRequired,
     onChangeChecked: PropTypes.func.isRequired,
     onDeleteTask: PropTypes.func.isRequired,
     onChange: PropTypes.func.isRequired,
     onEditInput: PropTypes.func.isRequired,
     onRemoveEditInput: PropTypes.func.isRequired,
     onKeysRemoveEditInput: PropTypes.func.isRequired,
   }

   createTasks = (task) => {
     const {
       filterState,
       editButtonState,
       onRemoveEditInput,
       onKeysRemoveEditInput,
       onChange,
       onChangeChecked,
       onEditInput,
       onDeleteTask,
     } = this.props;
     let liClassName;
     if (filterState === 'All') {
       liClassName = style.le;
     } else if (filterState === 'Active') {
       liClassName = task.checked ? `${style.le} hidden` : style.le;
     } else if ((filterState === 'Completed')) {
       liClassName = task.checked ? style.le : `${style.le} hidden`;
     }

     const viewToggleClass = editButtonState.key === task.key
       ? `${style.view__toggle} invisible`
       : style.view__toggle;
     const viewCheckboxClass = editButtonState.key === task.key
       ? `${style.view__checkbox} invisible`
       : style.view__checkbox;
     const editButton = editButtonState.key !== task.key
       ? false
       : (
         <input
           type="textarea"
           className={style.view__edit}
           autoFocus
           onBlur={e => onRemoveEditInput(task.key, e)}
           onKeyDown={e => onKeysRemoveEditInput(task.key, e)}
           onChange={onChange}
           defaultValue={task.text}
         />
       );
     return (
       <li className={liClassName} data-id={task.key} key={task.key}>
         <div className={style.view}>
           <input
             className={viewToggleClass}
             type="checkbox"
             onMouseDown={() => onChangeChecked(task.key)}
             checked={task.checked}
           />
           <div className={viewCheckboxClass} />
           <div
             className={style.view__lable}
             onDoubleClick={() => onEditInput(task.key, task.text, editButtonState)}
           >
             {task.text}
           </div>
           <button
             type="button"
             className={style.view__destroy}
             onMouseDown={() => onDeleteTask(task.key)}
           />
           {editButton}
         </div>
       </li>
     );
   }

   render() {
     const { listTask } = this.props;
     const createList = listTask.map(this.createTasks);
     return createList;
   }
}
export default ListTask;
