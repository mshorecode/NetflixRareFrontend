import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getUserById = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export default getUserById;
