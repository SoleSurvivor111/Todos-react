import React, { Component } from 'react'
import Header from 'Components/Header/Header'
import Main from 'Components/Main/Main'
import Footer from 'Components/Footer/Footer'
import style from 'Components/App.module.scss'
import s from 'Components/Main/Task.module.scss'
const ENTER_KEY = 13;

 class App extends Component {
  state = {
      listTask: JSON.parse(localStorage.getItem('js-todos')) || [],
      currentTask: {
        text: '',
        key: '',
        checked: false
      },
      filterState: 'All',
  }

  onDeleteTask = key => {
    const filteredTasks = this.state.listTask.filter(task => {
      return task.key !== key
    })
    this.setState({
      listTask: filteredTasks,
    })
  }

  handleInput = e => {
    const taskText = e.target.value
    const currentTask = {
      text: taskText,
      key: Date.now(),
      checked: false
    }
    this.setState({
      currentTask,
    })
  }

  handleEditInput = (e) => {
    const checkbox = e.target.previousSibling
    checkbox.previousSibling.classList.add('invisible')
    checkbox.classList.add('invisible')
    const handleEditInput = e.target.nextSibling.nextSibling
    handleEditInput.classList.add(s.view__edit_active)
    handleEditInput.focus()
    handleEditInput.value = e.target.innerHTML
  }

  handleRemoveEditInput = (e) => {
    const le = e.target.closest(`.${s.le}`)
    const toggle = le.querySelector( `.${s.view__toggle}`)
    const checkbox =  le.querySelector(`.${s.view__checkbox}`)
    toggle.classList.remove('invisible')
    checkbox.classList.remove('invisible')
    e.target.classList.remove(s.view__edit_active)

    const newList = this.state.listTask.filter(task => {
      if (task.key === Number(le.dataset.id)) {
        task.text = e.target.value
        if (e.target.value.trim() === '') {
          return false
        }
      }
      return task
    })
    this.setState({
      listTask: newList
    })
  }

   handleKeysRemoveEditInput = (e) => {
    const escapeKey = 27;
    if (e.which === ENTER_KEY || e.keyCode === ENTER_KEY || e.which === escapeKey) {
      document.activeElement.blur()
    }
  };

  handleAddTask = e => {
    const {listTask, currentTask} = this.state
    const newTask = currentTask

    if ((newTask.text.trim() !== '') &&
    (e.which === ENTER_KEY || e.keyCode === ENTER_KEY)) {
      const nextListTask = [...listTask, newTask]
      this.setState({
        listTask: nextListTask,
        currentTask: {
        text: '',
        key: '',
        checked: false
      },
    })
   }
  }

  handletoggleAll = (e) => {
    const {listTask} = this.state
    const completedTasks = listTask.filter(task => {
      return task.checked === true
    })

    let newList = [];
    const checked = listTask.length !== completedTasks.length;
    newList = listTask.map(task => {
            return {
              ...task,
              checked,
            };
          })
    this.setState({
      listTask: newList
    })
  }

  onChangeChecked = key => {
    const filteredTasks = this.state.listTask.filter(task => {
      if (task.key === key) {
        task.checked = !task.checked
      }
      return task
    })
    this.setState({
      listTask: filteredTasks,
    })
  }


  handleAllTasksFilter = (e) => {
    this.setState({
      filterState: 'All'
    })
  }

  handleActiveTasksFilter = (e) => {
    this.setState({
      filterState: 'Active'
    })
  }

  handleCompletedTasksFilter = (e) => {
    this.setState({
      filterState: 'Completed'
    })
  }

  handleClearCompleted = (e) => {
    const filteredTasks = this.state.listTask.filter(task => {
      return task.checked === false
    })
    this.setState({
      listTask: filteredTasks
    })
  }

  render() {

    const {filterState, currentTask, listTask} = this.state
    localStorage.setItem('js-todos', JSON.stringify(this.state.listTask));
    const completedTasks = listTask.filter(task => {
      return task.checked === true
    }).length

    return (
    <div className={'container'}>
        <div className={style['todos-logo']}  >
          <h1 className={style['todos-logo__h1']}>TODOS</h1>
        </div>
        <section className={style.todoapp}>
          <Header
            handleToggleAll={this.handletoggleAll}
            handleAddTask={this.handleAddTask}
            handleInput={this.handleInput}
            currentTask={currentTask}
            listTask={listTask}
            completedTasks={completedTasks}
          />
          <Main
            handleKeysRemoveEditInput={this.handleKeysRemoveEditInput}
            listTask={listTask}
            onDeleteTask={this.onDeleteTask}
            onChangeChecked={this.onChangeChecked}
            handleEditInput={this.handleEditInput}
            handleRemoveEditInput={this.handleRemoveEditInput}
            filterState={filterState}
           />
          <Footer
            listTask={listTask}
            handleAllTasksFilter={this.handleAllTasksFilter}
            handleActiveTasksFilter={this.handleActiveTasksFilter}
            handleCompletedTasksFilter={this.handleCompletedTasksFilter}
            handleClearCompleted={this.handleClearCompleted}
            completedTasks={completedTasks}
            filterState={filterState}
          />
        </section>
      </div>
    );
  }
}
export default App
