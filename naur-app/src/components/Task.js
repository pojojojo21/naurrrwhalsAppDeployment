import { React, forwardRef, useState } from 'react'; // useState
import '../assets/Taskview.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { dateToStringLocal, stringToDateLocal } from '../modules/timeFuncs';
import { putTask, deleteTask, getTaskList } from '../modules/taskApi';

function rankOf(task) {
  return parseInt(task?.notes || '0', 10) || 0;
}

function Task({
  task, sortFunc, username, setTaskList,
}) {
  const [isInput, setIsInput] = useState(false);

  async function readTasks() {
    setTaskList(sortFunc.current(await getTaskList(username)));
  }

  async function updateTasks(newTask) {
    await putTask(username, newTask.task_id, newTask);
    readTasks();
  }

  function rankUp() {
    const newTask = { ...task };
    if (!newTask?.task_id) {
      return;
    }
    newTask.notes = `${rankOf(newTask) + 1}`;
    updateTasks(newTask);
  }

  function titleChange() {
    const newTitle = document.getElementById('editTaskName')?.value;
    if (!newTitle || !newTitle?.length) {
      setIsInput(false);
      return;
    }
    const newTask = { ...task };
    if (!newTask?.task_id) {
      setIsInput(false);
      return;
    }
    newTask.title = newTitle;
    updateTasks(newTask);
    setIsInput(false);
  }

  function dateChange(newDate) {
    const newTask = { ...task };
    if (!newTask?.task_id) {
      return;
    }
    newTask.due_date = dateToStringLocal(newDate);
    updateTasks(newTask);
  }

  function remove() {
    if (!task?.task_id) {
      return;
    }
    deleteTask(username, task.task_id);
    readTasks();
  }

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button type="submit" style={{ width: '10%', float: 'right' }} className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  if (!isInput) {
    return (
      <div className="btn-grp">
        <button
          type="submit"
          onClick={() => remove(task)}
          style={{ width: '10%' }}
        >
          complete
        </button>
        <button type="submit" id="rank-btn" onClick={() => rankUp()} style={{ width: '10%' }}>
          rank:
          {' '}
          {rankOf(task)}
        </button>
        <button
          type="submit"
          className="taskButton"
          onClick={() => setIsInput(!isInput)}
          style={{ width: '50%' }}
        >
          { task.title }
        </button>
        <DatePicker
          style={{ width: '10%' }}
          selected={stringToDateLocal(task.due_date)}
          onChange={(newDate) => dateChange(newDate)}
          customInput={<ExampleCustomInput />}
        />
      </div>
    );
  }
  return (
    <div className="btn-grp" id="container">
      <button type="submit" onClick={() => remove(task)}>
        complete
      </button>
      <button type="submit" onClick={() => rankUp()} style={{ width: '8%' }}>
        rank:
        {' '}
        {rankOf(task)}
      </button>
      <input
        type="text"
        id="editTaskName"
        placeholder={task.title}
        style={{ width: '40%' }}
      />
      <button
        type="submit"
        onClick={() => { titleChange(); }}
        style={{ width: '10%' }}
      >
        update
      </button>
      <DatePicker
        style={{ width: '10%' }}
        selected={stringToDateLocal(task.due_date)}
        onChange={(newDate) => dateChange(newDate)}
        customInput={<ExampleCustomInput />}
      />
    </div>
  );
}

export default Task;
