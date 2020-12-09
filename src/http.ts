import axios from 'axios';

export default axios.create({
  // @ts-ignore
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});
