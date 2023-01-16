/* eslint-disable object-shorthand */
import axios from 'axios';
import { getCurrentTimeString, getCurrentDateString } from './timeFuncs';

import rootURL from './url';

export async function getUserExists(username) {
  if (username === undefined) {
    throw new Error('invalid username');
  }
  try {
    const response = await axios.get(`${rootURL}/messaging/user/exists/${username}`);
    return response.data.result;
  } catch (err) {
    throw new Error('Error sending request');
  }
}

export async function postMessagingUser(username) {
  if (username === undefined) {
    throw new Error('invalid username');
  }
  try {
    await axios.post(`${rootURL}/messaging/user/${username}`);
  } catch (err) {
    throw new Error('Error sending request');
  }
}

export async function deleteMessagingUser(username) {
  if (username === undefined) {
    throw new Error('invalid username');
  }
  try {
    await axios.delete(`${rootURL}/messaging/user/${username}`);
  } catch (err) {
    throw new Error('Error sending request');
  }
}

export async function getFriendExists(username, friendName) {
  if (username === undefined) {
    throw new Error('invalid username');
  }
  if (friendName === undefined) {
    throw new Error('invalid username');
  }
  try {
    const response = await axios.get(`${rootURL}/messaging/friends/exists/${username}/${friendName}`);
    return response.data.result;
  } catch (err) {
    throw new Error('Error sending request');
  }
}

export async function getPendingExists(username, friendName) {
  if (username === undefined) {
    throw new Error('invalid username');
  }
  if (friendName === undefined) {
    throw new Error('invalid username');
  }
  try {
    const response = await axios.get(`${rootURL}/messaging/pending/exists/${username}/${friendName}`);
    return response.data.result;
  } catch (err) {
    throw new Error('Error sending request');
  }
}

export async function getRequestedExists(username, friendName) {
  if (username === undefined) {
    throw new Error('invalid username');
  }
  if (friendName === undefined) {
    throw new Error('invalid username');
  }
  try {
    const response = await axios.get(`${rootURL}/messaging/requested/exists/${username}/${friendName}`);
    return response.data.result;
  } catch (err) {
    throw new Error('Error sending request');
  }
}

export async function getFriendFirst(username) {
  if (username === undefined) {
    throw new Error('invalid username');
  }
  try {
    const response = await axios.get(`${rootURL}/messaging/friends/first/${username}`);
    return response.data.friend;
  } catch (err) {
    if (err.response.status === 404) {
      return undefined;
    }
    throw new Error('Error sending request');
  }
}

export async function getPendingFirst(username) {
  if (username === undefined) {
    throw new Error('invalid username');
  }
  try {
    const response = await axios.get(`${rootURL}/messaging/pending/first/${username}`);
    return response.data.friend;
  } catch (err) {
    if (err.response.status === 404) {
      return undefined;
    }
    throw new Error('Error sending request');
  }
}

export async function getRequestedFirst(username) {
  if (username === undefined) {
    throw new Error('invalid username');
  }
  try {
    const response = await axios.get(`${rootURL}/messaging/requested/first/${username}`);
    return response.data.friend;
  } catch (err) {
    if (err.response.status === 404) {
      return undefined;
    }
    throw new Error('Error sending request');
  }
}

export async function getFriendList(username) {
  if (username === undefined) {
    throw new Error('invalid username');
  }
  try {
    const response = await axios.get(`${rootURL}/messaging/friends/list/${username}`);
    return response.data.list;
  } catch (err) {
    throw new Error('Error sending request');
  }
}

export async function getPendingList(username) {
  if (username === undefined) {
    throw new Error('invalid username');
  }
  try {
    const response = await axios.get(`${rootURL}/messaging/pending/list/${username}`);
    return response.data.list;
  } catch (err) {
    throw new Error('Error sending request');
  }
}

export async function getRequestedList(username) {
  if (username === undefined) {
    throw new Error('invalid username');
  }
  try {
    const response = await axios.get(`${rootURL}/messaging/requested/list/${username}`);
    return response.data.list;
  } catch (err) {
    throw new Error('Error sending request');
  }
}

export async function putFriend(username, friendName) {
  if (username === undefined) {
    throw new Error('invalid username');
  }
  if (friendName === undefined) {
    throw new Error('invalid username');
  }
  try {
    await axios.put(`${rootURL}/messaging/friends/${username}/${friendName}`);
    return;
  } catch (err) {
    throw new Error('Error sending request');
  }
}

export async function putPending(username, friendName) {
  if (username === undefined) {
    throw new Error('invalid username');
  }
  if (friendName === undefined) {
    throw new Error('invalid username');
  }
  try {
    await axios.put(`${rootURL}/messaging/pending/${username}/${friendName}`);
    return;
  } catch (err) {
    throw new Error('Error sending request');
  }
}

export async function putRequested(username, friendName) {
  if (username === undefined) {
    throw new Error('invalid username');
  }
  if (friendName === undefined) {
    throw new Error('invalid username');
  }
  try {
    await axios.put(`${rootURL}/messaging/requested/${username}/${friendName}`);
    return;
  } catch (err) {
    throw new Error('Error sending request');
  }
}

export async function deleteFriend(username, friendName) {
  if (username === undefined) {
    throw new Error('invalid username');
  }
  if (friendName === undefined) {
    throw new Error('invalid username');
  }
  try {
    await axios.delete(`${rootURL}/messaging/friends/${username}/${friendName}`);
    return;
  } catch (err) {
    throw new Error('Error sending request');
  }
}

export async function deletePending(username, friendName) {
  if (username === undefined) {
    throw new Error('invalid username');
  }
  if (friendName === undefined) {
    throw new Error('invalid username');
  }
  try {
    await axios.delete(`${rootURL}/messaging/pending/${username}/${friendName}`);
    return;
  } catch (err) {
    throw new Error('Error sending request');
  }
}

export async function deleteRequested(username, friendName) {
  if (username === undefined) {
    throw new Error('invalid username');
  }
  if (friendName === undefined) {
    throw new Error('invalid username');
  }
  try {
    await axios.delete(`${rootURL}/messaging/requested/${username}/${friendName}`);
    return;
  } catch (err) {
    throw new Error('Error sending request');
  }
}

export async function undoFriendRequest(username, friendName) {
  await deletePending(username, friendName);
  await deleteRequested(friendName, username);
}

export async function getMessageCount(username) {
  if (username === undefined) {
    throw new Error('invalid username');
  }
  try {
    const response = await axios.get(`${rootURL}/messaging/messagecount/${username}`);
    return response.data.count;
  } catch (err) {
    throw new Error('Error sending request');
  }
}

export async function getMessageLog(username, friendName) {
  if (username === undefined) {
    throw new Error('invalid username');
  }
  if (friendName === undefined) {
    throw new Error('invalid username');
  }
  try {
    const response = await axios.get(`${rootURL}/messaging/messages/${username}/${friendName}`);
    return response.data.log;
  } catch (err) {
    throw new Error('Error sending request');
  }
}

export async function putMessageLog(username, friendName, message) {
  if (username === undefined) {
    throw new Error('invalid username');
  }
  if (friendName === undefined) {
    throw new Error('invalid username');
  }
  try {
    await axios.put(
      `${rootURL}/messaging/messages/${username}/${friendName}`,
      { message: message, date: getCurrentDateString(), time: getCurrentTimeString() },
    );
  } catch (err) {
    throw new Error('Error sending request');
  }
}

export async function deleteMessageLog(username, friendName) {
  if (username === undefined) {
    throw new Error('invalid username');
  }
  if (friendName === undefined) {
    throw new Error('invalid username');
  }
  try {
    await axios.delete(`${rootURL}/messaging/messages/${username}/${friendName}`);
  } catch (err) {
    throw new Error('Error sending request');
  }
}

export async function sendFriendRequest(username, friendName) {
  // add friendName to pending of username,
  // add username to requested of friendName
  await putPending(username, friendName);
  await putRequested(friendName, username);
}

export async function acceptFriendRequest(username, friendName) {
  // remove friendName from requested of username
  // remove username to pending of friendName
  // add friendName to friends of username
  // add username to friends of friendName
  await deleteRequested(username, friendName);
  await deletePending(friendName, username);
  await putFriend(username, friendName);
  await putFriend(friendName, username);
}

export async function rejectFriendRequest(username, friendName) {
  // remove friendName from requested of username
  // remove username to pending of friendName
  await deleteRequested(username, friendName);
  await deletePending(friendName, username);
}

export async function removeFriendfromFriendList(username, friendName) {
  // remove friendName from requested of username
  // remove username to pending of friendName
  await deleteMessageLog(username, friendName);
  await deleteFriend(username, friendName);
  await deleteFriend(friendName, username);
}
