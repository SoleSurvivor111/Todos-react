import React, {Component} from 'react'
import ListTask from 'Components/Main/ListTask'
import PropTypes from 'prop-types'

export default class Main extends Component {
  static propTypes = {
    listTask: PropTypes.array.isRequired,
    filterState: PropTypes.string.isRequired,
    editButtonState: PropTypes.object.isRequired,
    onEditInput:PropTypes.func.isRequired,
    handleChange:PropTypes.func.isRequired,
    onDeleteTask:PropTypes.func.isRequired,
    handleKeysRemoveEditInput:PropTypes.func.isRequired,
    onChangeChecked:PropTypes.func.isRequired,
    handleRemoveEditInput:PropTypes.func.isRequired,
  }
  render() {
    const {
      listTask,
      filterState,
      editButtonState
    } = this.props
    return (
      <section className="main">
        <ul className="todo-list">
        <ListTask
          onEditInput={this.props.onEditInput}
          listTask={listTask}
          onDeleteTask={this.props.onDeleteTask}
          handleKeysRemoveEditInput={this.props.handleKeysRemoveEditInput}
          onChangeChecked={this.props.onChangeChecked}
          handleRemoveEditInput={this.props.handleRemoveEditInput}
          filterState={filterState}
          editButtonState={editButtonState}
          handleChange={this.props.handleChange}
        />
        </ul>
      </section>
    )
  }
}
