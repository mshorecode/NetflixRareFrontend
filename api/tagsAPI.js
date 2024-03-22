import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getTags = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/tags`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getTagById = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/tags/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const removeTagFromPost = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/posts/${payload.post_Id}/remove`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export { getTags, getTagById, removeTagFromPost };
