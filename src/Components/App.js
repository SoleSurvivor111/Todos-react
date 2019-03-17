import React, { Component } from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import './App.scss'


 class App extends Component {
  state = {
      listTask: [],
      filteredList: [],
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
    console.log('---deleteTask');
    const filteredTasks = this.state.listTask.filter(task => {
      return task.key !== key
    })
    this.setState({
      listTask: filteredTasks,
    })
  }

  handleInput = e => {
    console.log('---handleInput');
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

  addTask = e => {
    console.log('---addTask');
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
   this.filterListener()
  }

  toggleAll = (e) => {
    const {listTask} = this.state
    const completedTasks = listTask.filter(task => {
      return task.checked === true
    })
    let newList = [];
    if ((listTask.length !== completedTasks.length)) {
      newList = listTask.map(task => {
        task.checked = true
        return task
      })
    } else {
      newList = listTask.map(task => {
         task.checked = false
         return task
      })
    }
    this.setState({
      filteredList: newList
    })
    console.log('----toggleAll');
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

  filterListener = () => {
    const {filterState,listTask} = this.state
    let nextListTask = listTask.slice()

    if (filterState === 'All' || filterState === 'Active') {
      nextListTask = nextListTask.filter(task => {
      return task.checked === false
      })
      this.setState({
        activeTasks: nextListTask.length
      })
    }
    const completedTasksTask = listTask.filter(task => {
    return task.checked === true
    })
    this.setState({
      completedTasks: completedTasksTask.length
    })
    if (filterState === 'All') {
     nextListTask = listTask;
    } else if (filterState === 'Active') {
     nextListTask = nextListTask.filter(task => {
     return task.checked === false
     })
    } else if (filterState === 'Completed') {
      nextListTask = nextListTask.filter(task => {
      return task.checked === true
      })
    }
   this.setState({
     filteredList: nextListTask
   })
   console.log('----filterListener');
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
      filterListener,
      clearCompleted,
      toggleAll
    } = this
    const {filteredList, currentTask,listTask,activeTasks,completedTasks} = this.state
    return (
    <div className='container' onMouseUp={filterListener} onKeyUp={filterListener}>
        <div className="todos-logo">
          <h1 className="todos-logo__h1">TODOS</h1>
        </div>
        <section className="todoapp">
          <Header
            toggleAll={toggleAll}
            addTask={addTask}
            handleInput={handleInput}
            currentTask={currentTask}
            listTask={listTask}
          />
          <Main
            listTask={filteredList}
            deleteTask={deleteTask}
            changeChecked={changeChecked}
           />
          <Footer
            listTask={listTask}
            activeTasks={activeTasks}
            completedTasks={completedTasks}
            allTasksFilter={allTasksFilter}
            activeTasksFilter={activeTasksFilter}
            completedTasksFilter={completedTasksFilter}
            clearCompleted={clearCompleted}
          />
        </section>
      </div>
    );
  }
}
export default App
