import React from 'react';
import PropTypes from 'prop-types';
import style from 'Components/Header/Header.module.scss';

const Header = (props) => {
  const {
    currentTask,
    listTask,
    completedTasks,
    onToggleAll,
    onInput,
    onAddTask,
  } = props;

  const toggleAllChecked = listTask.length === completedTasks;
  const checkbox = listTask.length !== 0
      && (
      <div>
        <input
          id="toggle-all"
          className={style['header__toggle-all']}
          type="checkbox"
          checked={toggleAllChecked}
        />
        <label
          htmlFor="toggle-all"
          className={style.header__label}
          onMouseDown={onToggleAll}
        />
      </div>
      );

  return (
    <header className={style.header}>
      {checkbox}
      <input
        className={style['header__new-todo']}
        placeholder="What needs to be done?"
        value={currentTask.text}
        autoFocus
        onChange={onInput}
        onKeyDown={onAddTask}
      />
    </header>
  );
};
export default Header;

Header.propTypes = {
  currentTask: PropTypes.objectOf.isRequired,
  listTask: PropTypes.func.isRequired,
  completedTasks: PropTypes.number.isRequired,
  onToggleAll: PropTypes.func.isRequired,
  onInput: PropTypes.func.isRequired,
  onAddTask: PropTypes.func.isRequired,
};
