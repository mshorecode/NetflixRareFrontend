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

export default getReactions;
