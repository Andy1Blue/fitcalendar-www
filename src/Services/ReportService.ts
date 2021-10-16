import http from '../http';
import { TokenHeaderData } from '../Types/ApiResponse';

export interface PostBodyData {}

const token = localStorage.getItem('token');

export const generateCsvContent = async (data: PostBodyData) => {
  try {
    const response = await post(data, {
      headers: { token },
    });

    return response;
  } catch (e) {
    throw new Error("Can't generate csv content");
  }
};

export const post = (postBodyData: PostBodyData, tokenHeaderData: TokenHeaderData) => {
  return http.post('/report/generate-csv', postBodyData, tokenHeaderData);
};
