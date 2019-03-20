import React, { Component } from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import './App.scss'

 class App extends Component {
  state = {
      listTask: JSON.parse(localStorage.getItem('js-todos')),
      activeTasks: [],
      completedTasks: [],
      currentTask: {
        text: '',
        key: '',
        checked: false
      },
      filterState: 'All',
      prevBtn: false
  }

  deleteTask = key => {
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

   newElement = (tag, nameClass, parent) => {
  	const el = document.createElement(tag);
    el.className = nameClass;
    parent.appendChild(el);
    return el;
  }

  editInput = (e) => {
    const checkbox = e.target.previousSibling
    const toggle = checkbox.previousSibling.classList.add('invisible')
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
    localStorage.setItem('js-todos', JSON.stringify(newList));
  }

   keysRemoveEditInput = (e) => {
    const list = this.state.listTask
    const enterKey = 13;
    const escapeKey = 27;
    if (e.which === enterKey || e.keyCode === enterKey || e.which === escapeKey) {
      document.activeElement.blur()
    }
  };

  addTask = e => {
    const enterKey = 13;
    const {listTask, currentTask} = this.state
    const newTask = currentTask

    if ((newTask.text.trim() !== '') &&
    (e.which === enterKey || e.keyCode === enterKey)) {
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
    if ((listTask.length !== completedTasks.length)) {
      newList = listTask.map(task => {
        return {
          ...task,
          checked: true,
        };
      })
    } else {
      newList = listTask.map(task => {
        return {
          ...task,
          checked: false,
        };
      })
    }
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

  activatedBtn = (e) => {
    const currentBtn = e.target.classList
    const prevBtn = this.state.prevBtn.classList
    if (prevBtn) {
      prevBtn.remove('highlight')
    }
    if (e.target.closest('.filters')) {
      const defaultBtn= e.target.closest('.filters').querySelector('.all').classList
      defaultBtn.remove('highlight')
    }
    currentBtn.add('highlight')
    this.setState({
      prevBtn: e.target
    })
 }

  allTasksFilter = (e) => {
    this.setState({
      filterState: 'All'
    })
    this.activatedBtn(e)
  }

    activeTasksFilter = (e) => {
      this.setState({
        filterState: 'Active'
      })
      this.activatedBtn(e)
    }

  completedTasksFilter = (e) => {
    this.setState({
      filterState: 'Completed'
    })
    this.activatedBtn(e)
  }

  clearCompleted = (e) => {
    const filteredTasks = this.state.listTask.filter(task => {
      return task.checked === false
    })
    this.setState({
      listTask: filteredTasks
    })
    this.activatedBtn(e)
  }

  render() {
    const {
      addTask,
      handleInput,
      deleteTask,
      changeChecked,
      allTasksFilter,
      activeTasksFilter,
      completedTasksFilter,
      clearCompleted,
      toggleAll,
      editInput,
      removeEditInput,
      keysRemoveEditInput,
      localStage
    } = this
    const {filterState, currentTask,listTask} = this.state
    localStorage.setItem('js-todos', JSON.stringify(this.state.listTask));
    const completedTasks = listTask.filter(task => {
      return task.checked === true
    }).length

    return (
    <div className='container'
      onKeyUp={localStage}
      onChange={localStage}
    >
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
            deleteTask={deleteTask}
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
          />
        </section>
      </div>
    );
  }
}
export default App
