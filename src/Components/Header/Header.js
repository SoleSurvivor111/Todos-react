import React, {Component} from 'react'
import PropTypes from 'prop-types'
import style from 'Components/Header/Header.module.scss'

 class Header extends Component {
   static propTypes = {
     currentTask: PropTypes.object.isRequired,
     listTask: PropTypes.array.isRequired,
     completedTasks: PropTypes.number.isRequired,
     handleToggleAll: PropTypes.func.isRequired,
     handleInput: PropTypes.func.isRequired,
     handleAddTask: PropTypes.func.isRequired,
   }
   
  render() {
    const {
      currentTask,
      listTask,
      completedTasks
    } = this.props

    const toggleAllChecked = listTask.length === completedTasks ? true : false
    const checkbox =  listTask.length !== 0 &&
      <div>
        <input
          id="toggle-all"
          className={style['header__toggle-all']}
          type="checkbox"
          checked={toggleAllChecked}
        />
        <label
          htmlFor="toggle-all"
          className={style.header__label}
          onMouseDown={this.props.handleToggleAll}
        />
      </div>

    return (
      <header className={style.header}>
          {checkbox}
          <input className={style['header__new-todo']}
            placeholder="What needs to be done?"
            value={currentTask.text}
            autoFocus
            onChange={this.props.handleInput}
            onKeyDown={this.props.handleAddTask}
          />
      </header>
    )
  }
}
export default Header
