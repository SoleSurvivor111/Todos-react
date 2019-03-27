import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Filters from 'Components/Footer/Filters/Filters';
import style from 'Components/Footer/Footer.module.scss';

export default class Footer extends Component {
  static propTypes = {
    onAllTasksFilter: PropTypes.func.isRequired,
    onActiveTasksFilter: PropTypes.func.isRequired,
    onCompletedTasksFilter: PropTypes.func.isRequired,
    completedTasks: PropTypes.number.isRequired,
    listTask: PropTypes.func.isRequired,
    filterState: PropTypes.string.isRequired,
    onClearCompleted: PropTypes.func.isRequired,
  }

  render() {
    const {
      listTask,
      completedTasks,
      filterState,
      onAllTasksFilter,
      onActiveTasksFilter,
      onCompletedTasksFilter,
      onClearCompleted,
    } = this.props;
    const activeTasks = listTask.length - completedTasks;
    const theNumberOfActiveTasks = activeTasks === 1 ? '1 item left' : `${activeTasks} items left`;
    const clearCompletedValue = completedTasks === 0 ? false : 'Clear completed';
    const footer = listTask.length !== 0 && (
    <footer className={style.footer}>
      <span className={style['footer__todo-count']}>{theNumberOfActiveTasks}</span>
      <Filters
        filterState={filterState}
        onAllTasksFilter={onAllTasksFilter}
        onActiveTasksFilter={onActiveTasksFilter}
        onCompletedTasksFilter={onCompletedTasksFilter}
      />
      <button
        type="button"
        className={style['footer__clear-completed']}
        onMouseDown={onClearCompleted}
      >
        {clearCompletedValue}
      </button>
    </footer>
    );
    return footer;
  }
}
