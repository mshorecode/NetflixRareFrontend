import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getReactions = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/reactions`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const addReaction = (postId, reactionId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials}/post/addReaction`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        post_Id: postId,
        reactions_Id: reactionId,
      },
    ),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

export {
  getReactions,
  addReaction,
};
