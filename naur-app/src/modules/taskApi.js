/* eslint-disable camelcase */
import axios from 'axios';

import rootURL from './url';

// GET /tasks/taskList/{user}
// get tasklist
async function getTaskList(user) {
  const url = `${rootURL}/tasks/tasklist/${user}`;
  try {
    const response = await axios.get(url);
    const rtnArr = Array.isArray(response?.data) ? response?.data : [];
    return rtnArr;
  } catch (err) {
    return [];
  }
}

// GET /tasks/{task_id}/{user}
// get tasklist
async function getTask(user, task_id) {
  const url = `${rootURL}/tasks/${task_id}/${user}`;
  try {
    const response = await axios.get(url);
    const rtnArr = Array.isArray(response?.data) ? response?.data : [];
    return rtnArr;
  } catch (err) {
    return [];
  }
}

// POST /tasks/create/{user}
// create new task
async function postNewTask(user, taskObj) {
  const url = `${rootURL}/tasks/create/${user}`;
  try {
    const response = await axios.post(url, taskObj);
    return response.status;
  } catch (err) {
    throw new Error(`Error when calling ${url}`);
  }
}

// DELETE /tasks/{task_id}/{user}
// delete task
async function deleteTask(user, task_id) {
  const url = `${rootURL}/tasks/${task_id}/${user}`;
  try {
    const response = await axios.delete(url);
    return response.status;
  } catch (err) {
    throw new Error(`Error when calling ${url}`);
  }
}

// POST /tasks/{task_id}/{user}
// update existing task
async function putTask(user, task_id, newTask) {
  const url = `${rootURL}/tasks/${task_id}/${user}`;
  try {
    const response = await axios.put(url, newTask);
    return response.status;
  } catch (err) {
    throw new Error(`Error when calling ${url}`);
  }
}

// For compatibility
const postUpdateTask = putTask;

export {
  getTask, getTaskList, postNewTask, deleteTask, putTask, postUpdateTask,
};
