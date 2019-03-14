import React, {Component} from 'react'
import './Header.scss'
 class Header extends Component {
   componentDidUpdate() {
     this.props.inputElement.current.focus()
   }
  render() {
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
            ref={this.props.inputElement}
            value={this.props.currentTask.text}
            autoFocus
            onChange={this.props.handleInput}
            onKeyDown={this.props.addTask}
          />

      </header>
    )
  }
}
export default Header
