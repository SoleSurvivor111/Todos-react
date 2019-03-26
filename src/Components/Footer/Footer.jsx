import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Filters from 'Components/Footer/Filters/Filters';
import style from 'Components/Footer/Footer.module.scss';

export default class Footer extends Component {
  static propTypes = {
    handleAllTasksFilter: PropTypes.func.isRequired,
    handleActiveTasksFilter: PropTypes.func.isRequired,
    handleCompletedTasksFilter: PropTypes.func.isRequired,
    completedTasks: PropTypes.number.isRequired,
    listTask: PropTypes.InstanceOf(Array).isRequired,
    filterState: PropTypes.string.isRequired,
    handleClearCompleted: PropTypes.func.isRequired,
  }

  render() {
    const {
      listTask,
      completedTasks,
      filterState,
      handleAllTasksFilter,
      handleActiveTasksFilter,
      handleCompletedTasksFilter,
      handleClearCompleted,
    } = this.props;
    const activeTasks = listTask.length - completedTasks;
    const theNumberOfActiveTasks = activeTasks === 1 ? '1 item left' : `${activeTasks} items left`;
    const clearCompletedValue = completedTasks === 0 ? false : 'Clear completed';
    const footer = listTask.length !== 0 && (
    <footer className={style.footer}>
      <span className={style['footer__todo-count']}>{theNumberOfActiveTasks}</span>
      <Filters
        filterState={filterState}
        handleAllTasksFilter={handleAllTasksFilter}
        handleActiveTasksFilter={handleActiveTasksFilter}
        handleCompletedTasksFilter={handleCompletedTasksFilter}
      />
      <button
        type="button"
        className={style['footer__clear-completed']}
        onMouseDown={handleClearCompleted}
      >
        {clearCompletedValue}
      </button>
    </footer>
    );
    return footer;
  }
}
