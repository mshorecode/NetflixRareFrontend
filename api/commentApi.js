import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getPostComments = (postId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/comments/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createComment = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/comments/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export { getPostComments, createComment };
