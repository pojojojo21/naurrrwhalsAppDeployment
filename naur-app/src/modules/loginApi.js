import axios from 'axios';

import rootURL from './url';

async function postRegister(username, password) {
  const url = `${rootURL}/register`;
  try {
    const sendUserObj = { username, password };
    const response = await axios.post(url, sendUserObj);
    return response.status;
  } catch (err) {
    const status = err?.response?.status;
    if (status === 403) {
      return status;
    }
    throw new Error(`Error when calling ${url}`);
  }
}

async function postLogin(username, password) {
  const url = `${rootURL}/login`;
  try {
    const sendUserObj = { username, password };
    const response = await axios.post(url, sendUserObj);
    return response.status;
  } catch (err) {
    const status = err?.response?.status;
    if (status === 401 || status === 403 || status === 404) {
      return status;
    }
    throw new Error(`Error when calling ${url}`);
  }
}

// securityQuestions can be one question or an array of questions
async function postSecurityQuestions(username, securityQuestions) {
  const url = `${rootURL}/securityquestions/${username}`;
  try {
    const response = await axios.post(url, securityQuestions);
    return response.status;
  } catch (err) {
    throw new Error(`Error when calling ${url}`);
  }
}

async function getSecurityQuestions(username) {
  const url = `${rootURL}/securityquestions/${username}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    throw new Error(`Error when calling ${url}`);
  }
}

async function postResetPassword(username, newPassword, securityQuestions) {
  const url = `${rootURL}/resetpassword/${username}`;
  try {
    const sendObj = { new_password: newPassword, security_questions: securityQuestions };
    const response = await axios.post(url, sendObj);
    return response.status;
  } catch (err) {
    const status = err?.response?.status;
    if (status === 403) {
      return status;
    }
    throw new Error(`Error when calling ${url}`);
  }
}

async function deleteUser(username) {
  const url = `${rootURL}/deleteuser/${username}`;
  try {
    const response = await axios.delete(url);
    return response.status;
  } catch (err) {
    const status = err?.response?.status;
    if (status === 404) {
      return status;
    }
    throw new Error(`Error when calling ${url}`);
  }
}

export {
  postRegister, postLogin,
  postSecurityQuestions, getSecurityQuestions,
  postResetPassword, deleteUser,
};
