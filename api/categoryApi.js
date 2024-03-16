import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getCategoryById = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/categories/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export default getCategoryById;
