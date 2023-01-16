import { React, useRef, useState } from 'react'; // useState
import Task from './Task';
import '../assets/Taskview.css';
import {
  postNewTask, getTaskList,
} from '../modules/taskApi';
import { dateToStringLocal } from '../modules/timeFuncs';

// on passing functions to child and back up:
// https://stackoverflow.com/questions/38394015/how-to-pass-data-from-child-component-to-its-parent-in-reactjs

function rankOf(task) {
  return parseInt(task?.notes || '0', 10) || 0;
}

function noSorter(arr) {
  return arr;
}

function alphaSorter(arr) {
  return arr.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    } if (a.title > b.title) {
      return 1;
    }
    return 0;
  });
}

function dateSorter(arr) {
  return arr.sort((a, b) => {
    if (a.due_date < b.due_date) {
      return -1;
    } if (a.due_date > b.due_date) {
      return 1;
    }
    return 0;
  });
}

function rankSorter(arr) {
  return arr.sort((a, b) => {
    if (rankOf(a) < rankOf(b)) {
      return 1;
    } if (rankOf(a) > rankOf(b)) {
      return -1;
    }
    return 0;
  });
}

function TaskView({ username }) {
  const sortFunc = useRef(noSorter);
  const [taskList, setTaskList] = useState([]);
  const gotList = useRef(false);

  if (!gotList.current) {
    gotList.current = true;
    (async () => {
      setTaskList(sortFunc.current(await getTaskList(username)));
    })();
  }

  function handleAdd(e) {
    e.preventDefault();
    const title = document.getElementById('newTask')?.value;
    if ((!title) || (!title?.length)) {
      return;
    }
    const date = dateToStringLocal(new Date());
    const rank = 0;
    const newTask = {
      title,
      due_date: date,
      notes: `${rank}`,
    };
    (async () => {
      await postNewTask(username, newTask);
      setTaskList(sortFunc.current(await getTaskList(username)));
    })();
  }

  function setSorter(sorter) {
    sortFunc.current = sorter;
    (async () => {
      setTaskList(sortFunc.current(await getTaskList(username)));
    })();
  }

  return (
    <div className="taskView">
      <header>
        <h1>Here are your things!</h1>
      </header>
      <div className="task-body" id="parent">
        {taskList.map((task) => (
          <div key={`${task.task_id}`}>
            <Task
              task={task}
              sortFunc={sortFunc}
              setTaskList={setTaskList}
              username={username}
            />
          </div>
        ))}
      </div>
      <footer>
        <form>
          <input type="text" id="newTask" placeholder="New task name here" />
        </form>
        <div>
          <button type="submit" className="taskButton" onClick={() => { setSorter(alphaSorter); }}>Sort by Name</button>
          <button type="submit" className="taskButton" onClick={handleAdd}>Add</button>
          <button type="submit" className="taskButton" onClick={() => { setSorter(rankSorter); }}>Sort by Rank</button>
          <br />
          <button type="submit" className="taskButton" onClick={() => { setSorter(dateSorter); }}>Sort by Date</button>
          <button type="submit" className="taskButton" onClick={() => { setSorter(noSorter); }}>Don&apos;t Sort</button>
        </div>
      </footer>
    </div>

  );
}

export default TaskView;
