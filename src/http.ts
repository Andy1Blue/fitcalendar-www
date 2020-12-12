import axios from 'axios';

export default axios.create({
  // @ts-ignore
  baseURL: API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    // 'Content-type': 'application/json',
  },
});
