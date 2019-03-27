import React from 'react';
import PropTypes from 'prop-types';
import style from 'Components/Footer/Filters/Filters.module.scss';

const Filters = (props) => {
  const {
    filterState,
    onAllTasksFilter,
    onActiveTasksFilter,
    onCompletedTasksFilter,
  } = props;
  const all = filterState === 'All' ? `All ${style.highlight}` : style.all;
  const active = filterState === 'Active' ? `Active ${style.highlight}` : 'Active';
  const completed = filterState === 'Completed'
    ? `${style.Completed} ${style.highlight}` : 'Completed';
  return (
    <ul className={style.filters}>
      <li className={style.li} key={33}>
        <a
          href="#/"
          className={all}
          onMouseDown={onAllTasksFilter}
        >
          All
        </a>
      </li>
      <li className={style.li} key={32}>
        <a
          href="#/active"
          className={active}
          onMouseDown={onActiveTasksFilter}
        >
           Active
        </a>
      </li>
      <li className={style.li} key={3}>
        <a
          href="#/completed"
          className={completed}
          onMouseDown={onCompletedTasksFilter}
        >
           Completed
        </a>
      </li>
    </ul>
  );
};
export default Filters;

PropTypes.Filters = {
  filterState: PropTypes.string.isRequired,
  onAllTasksFilter: PropTypes.func.isRequired,
  onActiveTasksFilter: PropTypes.func.isRequired,
  onCompletedTasksFilter: PropTypes.func.isRequired,
};
