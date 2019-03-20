import React, {Component} from 'react'
import ListTask from './ListTask'


export default class Main extends Component {
  render() {
    const {listTask,
      onDeleteTask,
      changeChecked,
      editInput,
      removeEditInput,
      keysRemoveEditInput,
      filterState
    } = this.props
    return (
      <section className="main">
        <ul className="todo-list">
        <ListTask
          editInput={editInput}
          listTask={listTask}
          onDeleteTask={onDeleteTask}
          keysRemoveEditInput={keysRemoveEditInput}
          changeChecked={changeChecked}
          removeEditInput={removeEditInput}
          filterState={filterState}
        />
        </ul>
      </section>
    )
  }
}
