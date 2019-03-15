import React, { Component } from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import './App.scss'


 class App extends Component {
  inputElement = React.createRef()
  state = {
      listTask: [],
      currentTask: {
        text: '',
        key: '',
        checked: false
      },
      filterState: 'All'
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

  filterAllTasks = () => {
    this.setState({
      filterState: 'All'
    })
  }
    filterActiveTasks = () => {
      this.setState({
        filterState: 'Active'
      })
    }
  filterCompletedTasks = () => {
    this.setState({
      filterState: 'Completed'
    })
  }
  filterListener = () => {
    const listTask = this.props.listTask
    let nextListTask = listTask.slice()
    const {filterState} = this.props
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
     listTask: nextListTask
   })
  }
  render() {
    const {
      inputElement,
      addTask,
      handleInput,
      deleteTask,
      changeChecked,
      filterAllTasks,
      filterActiveTasks,
      filterCompletedTasks
    } = this
    const {listTask,currentTask, filterState} = this.state
    return (
      <div className='container'>
        <div className="todos-logo">
          <h1 className="todos-logo__h1">TODOS</h1>
        </div>
        <section className="todoapp js-todoapp">
          <Header
            inputElement={inputElement}
            addTask={addTask}
            handleInput={handleInput}
            currentTask={currentTask}
          />
          <Main
            filterState={filterState}
            listTask={listTask}
            deleteTask={deleteTask}
            changeChecked={changeChecked}
           />
          <Footer
            filterAllTasks={filterAllTasks}
            filterActiveTasks={filterActiveTasks}
            filterCompletedTasks={filterCompletedTasks}
          />
        </section>
      </div>
    );
  }
}
export default App
