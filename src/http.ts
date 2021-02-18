import axios from 'axios';

export default axios.create({
  // @ts-ignore
  // eslint-disable-next-line no-undef
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});
