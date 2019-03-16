import React, {Component} from 'react'
import './Header.scss'
 class Header extends Component {
  render() {
    const {
      handleInput,
      addTask,
      currentTask,
      listTask
    } = this.props
    const checkbox =  listTask.length !== 0 &&
      <div>
        <input
          id="toggle-all"
          className="header__toggle-all"
          type="checkbox"
        />
        <label
          htmlFor="toggle-all"
          className='header__label'
        />
      </div>
    return (
      <header className="header">
          {checkbox}
          <input className="header__new-todo"
            placeholder="What needs to be done?"
            value={currentTask.text}
            autoFocus
            onChange={handleInput}
            onKeyDown={addTask}
          />

      </header>
    )
  }
}
export default Header
