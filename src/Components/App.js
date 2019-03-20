import React, { Component } from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import './App.scss'
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

  editInput = (e) => {
    const checkbox = e.target.previousSibling
    checkbox.previousSibling.classList.add('invisible')
    checkbox.classList.add('invisible')
    const editInput = e.target.nextSibling.nextSibling
    editInput.classList.add('le__edit_active')
    editInput.focus()
    editInput.value = e.target.innerHTML
  }

  removeEditInput = (e) => {
    const le = e.target.closest('.le')
    const toggle = le.querySelector('.view__toggle')
    const checkbox =  le.querySelector('.view__checkbox')
    toggle.classList.remove('invisible')
    checkbox.classList.remove('invisible')
    e.target.classList.remove('le__edit_active')

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

   keysRemoveEditInput = (e) => {
    const escapeKey = 27;
    if (e.which === ENTER_KEY || e.keyCode === ENTER_KEY || e.which === escapeKey) {
      document.activeElement.blur()
    }
  };

  addTask = e => {
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

  toggleAll = (e) => {
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

  changeChecked = key => {
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


  allTasksFilter = (e) => {
    this.setState({
      filterState: 'All'
    })
  }

  activeTasksFilter = (e) => {
    this.setState({
      filterState: 'Active'
    })
  }

  completedTasksFilter = (e) => {
    this.setState({
      filterState: 'Completed'
    })
  }

  clearCompleted = (e) => {
    const filteredTasks = this.state.listTask.filter(task => {
      return task.checked === false
    })
    this.setState({
      listTask: filteredTasks
    })
  }

  render() {
    const {
      addTask,
      handleInput,
      onDeleteTask,
      changeChecked,
      allTasksFilter,
      activeTasksFilter,
      completedTasksFilter,
      clearCompleted,
      toggleAll,
      editInput,
      removeEditInput,
      keysRemoveEditInput,
    } = this
    const {filterState, currentTask, listTask} = this.state
    localStorage.setItem('js-todos', JSON.stringify(this.state.listTask));
    const completedTasks = listTask.filter(task => {
      return task.checked === true
    }).length

    return (
    <div className='container'>
        <div className="todos-logo"  >
          <h1 className="todos-logo__h1">TODOS</h1>
        </div>
        <section className="todoapp">
          <Header
            toggleAll={toggleAll}
            addTask={addTask}
            handleInput={handleInput}
            currentTask={currentTask}
            listTask={listTask}
            completedTasks={completedTasks}
          />
          <Main
            keysRemoveEditInput={keysRemoveEditInput}
            listTask={listTask}
            onDeleteTask={onDeleteTask}
            changeChecked={changeChecked}
            editInput={editInput}
            removeEditInput={removeEditInput}
            filterState={filterState}
           />
          <Footer
            listTask={listTask}
            allTasksFilter={allTasksFilter}
            activeTasksFilter={activeTasksFilter}
            completedTasksFilter={completedTasksFilter}
            clearCompleted={clearCompleted}
            completedTasks={completedTasks}
            filterState={filterState}
          />
        </section>
      </div>
    );
  }
}
export default App
