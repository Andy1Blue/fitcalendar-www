import http from '../http';
import { TokenHeaderData } from '../Types/ApiResponse';

const token = localStorage.getItem('token');

export const getUserTheLargestAmountOfCalories = async (year: string) => {
  try {
    const response = await getCaloriesYear(year, { headers: { token } });

    return response;
  } catch (e) {}
};

export const getUserTheLargestAmountOfDistances = async (year: string) => {
  try {
    const response = await getDistanceYear(year, { headers: { token } });

    return response;
  } catch (e) {}
};

export const getUserTheLargestAmountOfTimes = async (year: string) => {
  try {
    const response = await getTimeYear(year, { headers: { token } });

    return response;
  } catch (e) {}
};

export const getUserSumTrainingInYear = async (year: string) => {
  try {
    const response = await getSumTrainingInYear(year, { headers: { token } });

    return response;
  } catch (e) {}
};

export const getUserSumTrainingInMonth = async (year: string, month: string) => {
  try {
    const response = await getSumTrainingInMonth(year, month, { headers: { token } });

    return response;
  } catch (e) {}
};

export const getCaloriesYear = (year: string, tokenHeaderData: TokenHeaderData) => {
  return http.get(`/trainings/user/calories/year/${year}`, tokenHeaderData);
};

export const getDistanceYear = (year: string, tokenHeaderData: TokenHeaderData) => {
  return http.get(`/trainings/user/distance/year/${year}`, tokenHeaderData);
};

export const getTimeYear = (year: string, tokenHeaderData: TokenHeaderData) => {
  return http.get(`/trainings/user/time/year/${year}`, tokenHeaderData);
};

export const getSumTrainingInYear = (year: string, tokenHeaderData: TokenHeaderData) => {
  return http.get(`/trainings/user/sum/year/${year}`, tokenHeaderData);
};

export const getSumTrainingInMonth = (year: string, month: string, tokenHeaderData: TokenHeaderData) => {
  return http.get(`/trainings/user/sum/year/${year}/month/${month}`, tokenHeaderData);
};
