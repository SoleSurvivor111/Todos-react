import React, { Component } from 'react';
import Header from 'Components/Header/Header';
import Main from 'Components/Main/Main';
import Footer from 'Components/Footer/Footer';
import style from 'Components/App.module.scss';

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

export default class App extends Component {
  state = {
    listTask: JSON.parse(localStorage.getItem('js-todos')) || [],
    currentTask: {
      text: '',
      key: '',
      checked: false,
    },
    filterState: 'All',
    editButtonState: {
      text: '',
      key: '',
    },
  }

  onDeleteTask = (key) => {
    const { listTask } = this.state;
    const filteredTasks = listTask.filter(task => task.key !== key);
    this.setState({
      listTask: filteredTasks,
    });
  }

  handleInput = (e) => {
    const taskText = e.target.value;
    const currentTask = {
      text: taskText,
      key: Date.now(),
      checked: false,
    };
    this.setState({
      currentTask,
    });
  }

  onEditInput = (currentKey, currentText, prevEditButtonState) => {
    this.setState({
      editButtonState: {
        ...prevEditButtonState,
        key: currentKey,
        text: currentText,
      },
    });
  }

  handleChange = (e) => {
    const { editButtonState } = this.state;
    this.setState({
      editButtonState: {
        ...editButtonState,
        text: e.target.value,
      },
    });
  }

  onRemoveEditInput = (currentKey, e) => {
    const { editButtonState, listTask } = this.state;
    if (e.which === ENTER_KEY || e.which !== ESCAPE_KEY) {
      let newList;
      if (!editButtonState.text) {
        newList = listTask.filter((task) => {
          if (editButtonState.text.trim() === '' && task.key === Number(currentKey)) {
            return false;
          }
          return task;
        });
      } else {
        newList = listTask.map((task) => {
          if (task.key === Number(currentKey)) {
            return { ...task, text: editButtonState.text };
          }
          return task;
        });
      }
      this.setState({
        listTask: newList,
        editButtonState: {
          ...editButtonState,
          text: '',
          key: '',
        },
      });
    } else {
      this.setState({
        editButtonState: {
          ...editButtonState,
          text: '',
          key: '',
        },
      });
    }
  }

   onKeysRemoveEditInput = (key, e) => {
     if (e.which === ENTER_KEY || e.keyCode === ENTER_KEY || e.which === ESCAPE_KEY) {
       this.onRemoveEditInput(key, e);
     }
   };

  handleAddTask = (e) => {
    const { listTask, currentTask } = this.state;
    const newTask = currentTask;

    if ((newTask.text.trim() !== '')
    && (e.which === ENTER_KEY || e.keyCode === ENTER_KEY)) {
      const nextListTask = [...listTask, newTask];
      this.setState({
        listTask: nextListTask,
        currentTask: {
          text: '',
          key: '',
          checked: false,
        },
      });
    }
  }

  handletoggleAll = () => {
    const { listTask } = this.state;
    const completedTasks = listTask.filter(task => task.checked === true);

    let newList = [];
    const checked = listTask.length !== completedTasks.length;
    newList = listTask.map(task => ({
      ...task,
      checked,
    }));
    this.setState({
      listTask: newList,
    });
  }

  onChangeChecked = (key) => {
    const { listTask } = this.state;
    const filteredTasks = listTask.map((task) => {
      if (task.key === key) {
        return { ...task, checked: !task.checked };
      }
      return task;
    });
    this.setState({
      listTask: filteredTasks,
    });
  }

  handleAllTasksFilter = () => {
    this.setState({
      filterState: 'All',
    });
  }

  handleActiveTasksFilter = () => {
    this.setState({
      filterState: 'Active',
    });
  }

  handleCompletedTasksFilter = () => {
    this.setState({
      filterState: 'Completed',
    });
  }

  handleClearCompleted = () => {
    const { listTask } = this.state;
    const filteredTasks = listTask.filter(task => task.checked === false);
    this.setState({
      listTask: filteredTasks,
    });
  }

  render() {
    const {
      filterState,
      currentTask,
      listTask,
      editButtonState,
    } = this.state;
    localStorage.setItem('js-todos', JSON.stringify(listTask));
    const completedTasks = listTask.filter(task => task.checked === true).length;

    return (
      <div className="container">
        <div className={style['todos-logo']}>
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
