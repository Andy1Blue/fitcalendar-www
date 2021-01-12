import http from '../http';
import { TokenHeaderData } from '../Types/ApiResponse';

const token = localStorage.getItem('token');

export const getUserTheLargestAmountOfCalories = async (year: string) => {
  try {
    const response = await getCaloriesYear(year, { headers: { token } });

    return response;
  } catch (e) {
    throw new Error("Can't get calories by year");
  }
};

export const getUserTheLargestAmountOfDistances = async (year: string) => {
  try {
    const response = await getDistanceYear(year, { headers: { token } });

    return response;
  } catch (e) {
    throw new Error("Can't get distance by year");
  }
};

export const getUserTheLargestAmountOfTimes = async (year: string) => {
  try {
    const response = await getTimeYear(year, { headers: { token } });

    return response;
  } catch (e) {
    throw new Error("Can't get time by year");
  }
};

export const getUserSumTrainingInYear = async (year: string) => {
  try {
    const response = await getSumTrainingInYear(year, { headers: { token } });

    return response;
  } catch (e) {
    throw new Error("Can't get sum trainings in year");
  }
};

export const getUserSumTrainingInMonth = async (year: string, month: string) => {
  try {
    const response = await getSumTrainingInMonth(year, month, { headers: { token } });

    return response;
  } catch (e) {
    throw new Error("Can't get sum trainings in month");
  }
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
