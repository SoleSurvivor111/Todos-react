import React, { Component } from 'react'
import Header from 'Components/Header/Header'
import Main from 'Components/Main/Main'
import Footer from 'Components/Footer/Footer'
import style from 'Components/App.module.scss'
const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

 class App extends Component {
  state = {
      listTask: JSON.parse(localStorage.getItem('js-todos')) || [],
        currentTask: {
        text: '',
        key: '',
        checked: false
      },
      filterState: 'All',
      editButtonState:{
        text:'',
        key:''
      }
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

  onEditInput = (currentKey, currentText, prevEditButtonState) => {
    this.setState({
      editButtonState: {
        ...prevEditButtonState,
        key: currentKey,
        text: currentText
      }
    })
  }

  handleChange = (e) => {
    this.setState({
      editButtonState: {
        ...this.state.editButtonState,
        text: e.target.value
      }
    })
  }
  
  onRemoveEditInput = (currentKey, e) => {
    const {editButtonState} = this.state
    if (e.which === ENTER_KEY || e.which !== ESCAPE_KEY) {
    const newList = this.state.listTask.filter(task => {
      if (task.key === Number(currentKey)) {
        task.text = editButtonState.text
        if (editButtonState.text.trim() === '') {
          return false
        }
      }
      return task
    })

      this.setState({
        listTask: newList,
        editButtonState: {
          ...editButtonState,
          text: '',
          key: ''
        }
      })
    } else {
      this.setState({
        editButtonState: {
          ...editButtonState,
          text: '',
          key: ''
        }
      })
    }
  }

   onKeysRemoveEditInput = (key, e) => {
    if (e.which === ENTER_KEY || e.keyCode === ENTER_KEY || e.which === ESCAPE_KEY) {
      this.onRemoveEditInput(key, e)
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
    const {filterState, currentTask, listTask, editButtonState} = this.state
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
            onKeysRemoveEditInput={this.onKeysRemoveEditInput}
            listTask={listTask}
            onDeleteTask={this.onDeleteTask}
            onChangeChecked={this.onChangeChecked}
            onEditInput={this.onEditInput}
            onRemoveEditInput={this.onRemoveEditInput}
            handleChange={this.handleChange}
            filterState={filterState}
            editButtonState={editButtonState}
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
