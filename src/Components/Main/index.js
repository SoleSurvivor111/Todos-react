import React, {Component} from 'react'
import ListTask from './ListTask'


export default class Main extends Component {
  render() {
    return (
      <section className="main">
        <ul className="todo-list js-todo-list">
        <ListTask
          listTask={this.props.listTask}
          deleteTask={this.props.deleteTask} 
        />
        </ul>
      </section>
    )
  }
}
