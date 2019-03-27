import React from 'react';
import ListTask from 'Components/Main/ListTask';
import PropTypes from 'prop-types';

const Main = (props) => {
  const {
    listTask,
    filterState,
    editButtonState,
    onEditInput,
    onDeleteTask,
    onKeysRemoveEditInput,
    onChangeChecked,
    onRemoveEditInput,
    onChange,
  } = props;
  return (
    <section className="main">
      <ul className="todo-list">
        <ListTask
          onEditInput={onEditInput}
          listTask={listTask}
          onDeleteTask={onDeleteTask}
          onKeysRemoveEditInput={onKeysRemoveEditInput}
          onChangeChecked={onChangeChecked}
          onRemoveEditInput={onRemoveEditInput}
          filterState={filterState}
          editButtonState={editButtonState}
          onChange={onChange}
        />
      </ul>
    </section>
  );
};
export default Main;

Main.propTypes = {
  listTask: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.arrayOf.isRequired,
  ]),
  filterState: PropTypes.string.isRequired,
  editButtonState: PropTypes.objectOf.isRequired,
  onEditInput: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onKeysRemoveEditInput: PropTypes.func.isRequired,
  onChangeChecked: PropTypes.func.isRequired,
  onRemoveEditInput: PropTypes.func.isRequired,
};
