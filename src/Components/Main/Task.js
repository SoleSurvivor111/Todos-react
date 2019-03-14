import React, {Component} from 'react'
import 'Task.scss'

export default class Task extends Component {
  render() {
    return (
      <li data-id={tusk.id}>
        <div className='view'>
          <input className='view__toggle' type='checkbox'/>
          <label className='view__checkbox'/>
          <label className='view__lable'>{tusk.value}</label>
          <button className='view__destroy'/>
        </div>
      </li>
    )
  }
}
