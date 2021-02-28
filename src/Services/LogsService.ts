import http from '../http';
import { TokenHeaderData } from '../Types/ApiResponse';

export interface PostBodyData {
  userId: string;
  createdDate: Date;
  log: string;
  category: string;
}

const token = localStorage.getItem('token');

export const addLog = async (data: PostBodyData) => {
  try {
    const response = await post(data, {
      headers: { token },
    });

    return response;
  } catch (e) {
    throw new Error("Can't add log");
  }
};

export const post = (postBodyData: PostBodyData, tokenHeaderData: TokenHeaderData) => {
  return http.post('/logs', postBodyData, tokenHeaderData);
};
