import React, {Component} from 'react'
import ListTask from 'Components/Main/ListTask'

export default class Main extends Component {
  render() {
    const {
      listTask,
      filterState
    } = this.props
    return (
      <section className="main">
        <ul className="todo-list">
        <ListTask
          handleEditInput={this.props.handleEditInput}
          listTask={listTask}
          onDeleteTask={this.props.onDeleteTask}
          handleKeysRemoveEditInput={this.props.handleKeysRemoveEditInput}
          onChangeChecked={this.props.onChangeChecked}
          handleRemoveEditInput={this.props.handleRemoveEditInput}
          filterState={filterState}
        />
        </ul>
      </section>
    )
  }
}
