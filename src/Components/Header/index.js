import React, {Component} from 'react'
import './Header.scss'
 class Header extends Component {
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
          className="header__toggle-all"
          type="checkbox"
          checked={toggleAllChecked}
        />
        <label
          htmlFor="toggle-all"
          className='header__label'
          onMouseDown={this.props.handleToggleAll}
        />
      </div>

    return (
      <header className="header">
          {checkbox}
          <input className="header__new-todo"
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
