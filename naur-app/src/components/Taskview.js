/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { React, useState } from 'react'; // useState
import '../assets/Taskview.css';

function Taskview() {
  function Task(title) {
    // can also have a state as input for completed or not completed here
    // eslint-disable-next-line react/no-this-in-sfc
    this.title = title;
  }

  const [numTasks, setNumTasks] = useState(0);

  function addTask(taskObj) {
    let taskList = [];
    if (!localStorage.getItem('tasks')) {
      localStorage.setItem('tasks', '[]');
    }
    const data = localStorage.getItem('tasks');
    taskList = JSON.parse(data);
    taskList.push(taskObj);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    // console.log('task list length: %d', taskList.length);

    const parent = document.getElementById('parent');
    parent.removeChild(parent.firstChild);
    for (let i = 0; i < taskList.length; i += 1) {
      const task = document.createElement('button', {
        type: 'radio', id: numTasks, className: 'taskEl', onClick: 'remove(event)',
      });
      const value = taskList[i].title;
      task.appendChild(document.createTextNode(value));
      parent.appendChild(task);
    }
  }

  function handleAdd() {
    // user inputs task info
    const newTask = new Task(document.getElementById('newTask').value);
    addTask(newTask);
    setNumTasks(numTasks + 1);
    // console.log(numTasks);
  }

  //   function remove(e) {
  //     // document.getElementById(str).remove();
  //     // const val = 3 + 4;
  //     const element = e.target;
  //     // var element = e;
  //     element.remove();
  //     // this.setAttribute("className", "striked");
  //   }

  return (
    <div className="taskView">
      <div>
        <header>
          <h1>Here are your things!</h1>
        </header>
        <ul className="task-body" id="parent">No Tasks</ul>
      </div>
      <div>
        <form>
          <input type="text" id="newTask" placeholder="new task here" />
        </form>
        <button className="taskButton" type="submit" onClick={handleAdd}>New Task</button>
      </div>

    </div>

  );
}

export default Taskview;
