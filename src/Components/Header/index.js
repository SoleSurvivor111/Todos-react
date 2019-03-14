import React, {Component} from 'react'
import './Header.scss'
 class Header extends Component {
   componentDidUpdate() {
     this.props.inputElement.current.focus()
   }
  render() {
    const {
      inputElement,
      handleInput,
      addTask,
      currentTask
    } = this.props
    return (
      <header className="header">
          <input
            id="toggle-all"
            className="header__toggle-all"
            type="checkbox"
          />
          <label
            htmlFor="toggle-all"
            className='header__label'
          />
          <input className="header__new-todo"
            placeholder="What needs to be done?"
            ref={inputElement}
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
