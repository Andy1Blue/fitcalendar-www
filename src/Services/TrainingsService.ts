import http from '../http';

export const getAllTrainings = async () => {
  const token = localStorage.getItem('token');

  try {
    const response = await get({ headers: { token } });

    return response;
  } catch (e) {}
};

interface TokenHeaderData {
  headers: {
    token: string;
  };
}

export const get = (tokenHeaderData: TokenHeaderData) => {
  return http.get('/trainings', tokenHeaderData);
};
