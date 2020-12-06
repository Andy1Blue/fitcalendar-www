import http from '../http';
import { TokenHeaderData } from '../Types/ApiResponse';
import { Points, Source, Sport, Training } from '../Types/Training';

export interface PostBodyData {
  userEmail: string;
  sport: Sport;
  tagColor?: string;
  source: Source;
  startTime: string;
  endTime: string;
  durationSec: number;
  distanceKm?: number;
  caloriesKcal?: number;
  description?: string;
  heartRateAvgBpm?: number;
  heartRateMaxBpm?: number;
  speedAvgKmh?: number;
  speedMaxKmh?: number;
  points?: Points[] | null;
}

const token = localStorage.getItem('token');

export const getUserTrainings = async () => {
  try {
    const response = await get({ headers: { token } });

    return response;
  } catch (e) {}
};

export const addUserTraining = async (data: PostBodyData) => {
  try {
    const response = await post(data, {
      headers: { token },
    });

    return response;
  } catch (e) {}
};

export const updateUserTraining = async (trainingId: string, data: PostBodyData) => {
  try {
    const response = await put(trainingId, data, {
      headers: { token },
    });

    return response;
  } catch (e) {}
};

export const deleteUserTraining = async (trainingId: string) => {
  try {
    const response = await remove(trainingId, {
      headers: { token },
    });

    return response;
  } catch (e) {}
};

export const get = (tokenHeaderData: TokenHeaderData) => {
  return http.get('/trainings/user', tokenHeaderData);
};

export const post = (postBodyData: PostBodyData, tokenHeaderData: TokenHeaderData) => {
  return http.post('/trainings/user', postBodyData, tokenHeaderData);
};

export const put = (trainingId: string, postBodyData: PostBodyData, tokenHeaderData: TokenHeaderData) => {
  return http.put(`/trainings/user/id/${trainingId}`, postBodyData, tokenHeaderData);
};

export const remove = (trainingId: string, tokenHeaderData: TokenHeaderData) => {
  return http.delete(`/trainings/user/id/${trainingId}`, tokenHeaderData);
};
