import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const addSubscription = (data) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/subscriptions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => resolve(response.json()))
    .catch(reject);
});

const deleteSubscription = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/subscriptions/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(resolve({}))
    .catch(reject);
});

const getSubscriptionId = (followerId, authorId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/subscriptions/${followerId}/${authorId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.status === 200) {
      resolve(response.json());
    } else if (response.status === 204) {
      resolve(null);
    }
  })
    .catch(reject);
});

export {
  addSubscription,
  deleteSubscription,
  getSubscriptionId,
};
