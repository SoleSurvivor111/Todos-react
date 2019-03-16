import React, { Component } from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import './App.scss'


 class App extends Component {
  state = {
      listTask: [],
      filteredList: [],
      currentTask: {
        text: '',
        key: '',
        checked: false
      },
      filterState: 'All'
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

  allTasksFilter = () => {
    this.setState({
      filterState: 'All'
    })
  }
    activeTasksFilter = () => {
      this.setState({
        filterState: 'Active'
      })
    }
  completedTasksFilter = () => {
    this.setState({
      filterState: 'Completed'
    })
  }
  clearCompleted = () => {
    const filteredTasks = this.state.listTask.filter(task => {
      return task.checked === false
    })
    this.setState({
      listTask: filteredTasks
    })
  }
  filterListener = () => {
    console.log('---filterListener');
    const listTask = this.state.listTask
    let nextListTask = listTask.slice()
    const {filterState} = this.state
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
      clearCompleted
    } = this
    const {filteredList, currentTask,listTask} = this.state
    return (
      <div className='container' onMouseUp={filterListener} onKeyUp={filterListener}>
        <div className="todos-logo">
          <h1 className="todos-logo__h1">TODOS</h1>
        </div>
        <section className="todoapp">
          <Header
            addTask={addTask}
            handleInput={handleInput}
            currentTask={currentTask}
          />
          <Main
            listTask={filteredList}
            deleteTask={deleteTask}
            changeChecked={changeChecked}
           />
          <Footer
            listTask={listTask}
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
