import React,{Component} from 'react'
import PropTypes from 'prop-types'
import style from'Components/Footer/Filters/Filters.module.scss'

export default class Filters extends Component {
  static propTypes = {
    handleAllTasksFilter: PropTypes.func.isRequired,
    handleActiveTasksFilter: PropTypes.func.isRequired,
    handleCompletedTasksFilter: PropTypes.func.isRequired,
    filterState: PropTypes.string.isRequired,
  }

  render() {
    const {filterState} = this.props
    const all =  filterState === `All` ? `All ${style.highlight}` : style.all
    const  active =  filterState === `Active` ? `Active ${style.highlight}` : `Active`
    const  completed =  filterState === `Completed` ? `${style.Completed} ${style.highlight}` : `Completed`
    return (
      <ul className={style.filters} >
       <li className={style.li} key={33} onMouseDown={this.props.handleAllTasksFilter}>
         <a
           href="#/"
           className={all}
         >
          All
        </a>
       </li>
       <li className={style.li} key={32} onMouseDown={this.props.handleActiveTasksFilter}>
         <a
           href="#/active"
           className={active}
         >
           Active
         </a>
       </li>
       <li className={style.li} key={3} onMouseDown={this.props.handleCompletedTasksFilter}>
         <a
           href="#/completed"
           className={completed}
         >
           Completed
         </a>
       </li>
     </ul>
    )
  }
}
