import http from '../http';

export const get = (id) => {
  return http.get(`/trainings/${id}`);
};
