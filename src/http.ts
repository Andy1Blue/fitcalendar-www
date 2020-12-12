import axios from 'axios';

export default axios.create({
  // @ts-ignore
  baseURL: API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
  },
});
