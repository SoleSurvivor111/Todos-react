import React, {Component} from 'react'
import ListTask from './ListTask'


export default class Main extends Component {
  render() {
    const {listTask, deleteTask,changeChecked} = this.props
    return (
      <section className="main">
        <ul className="todo-list js-todo-list">
        <ListTask
          listTask={listTask}
          deleteTask={deleteTask}
          changeChecked={changeChecked}
        />
        </ul>
      </section>
    )
  }
}