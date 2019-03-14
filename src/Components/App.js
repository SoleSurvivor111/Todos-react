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
      }
  }
  deleteTask = key => {
    const filteredTasks = this.state.listTask.filter(task => {
      return task.key !== key
    })
    this.setState({
      listTask: filteredTasks,
    })
  }
  handlerInput = e => {
    const taskText = e.target.defaultValue
    console.log(taskText);
    const currentTask = {
      text: taskText,
      key: Date.now()
    }
    this.setState({
      currentTask,
    })
  }
  addTask = e => {
    const enterKey = 13;
    const newTask = this.state.currentTask
    console.log(true);
    if ((newTask.text.trim() !== '') &&
    (e.which === enterKey || e.keyCode === enterKey)) {

      const nextListTask = [...this.state.listTask, newTask]
      this.setState({
        listTask: nextListTask,
        currentTask: { text: '', key: ''},
    })
   }
  }
  render() {
    return (
      <div className='container'>
        <div className="todos-logo">
          <h1 className="todos-logo__h1">TODOS</h1>
        </div>
        <section className="todoapp js-todoapp">
          <Header
            inputElement={this.inputElement}
            addTask={this.addTask}
            handleInput={this.handleInput}
            currentTask={this.state.currentTask}
          />
          <Main />
          <Footer />
        </section>
      </div>
    );
  }
}
export default App
