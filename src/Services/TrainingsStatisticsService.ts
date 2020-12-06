import http from '../http';
import { TokenHeaderData } from '../Types/ApiResponse';

const token = localStorage.getItem('token');

export const getUserTheLargestAmountOfCalories = async (year: string) => {
  try {
    const response = await getCaloriesYear(year, { headers: { token } });

    return response;
  } catch (e) {}
};

export const getCaloriesYear = (year: string, tokenHeaderData: TokenHeaderData) => {
  return http.get(`/trainings/user/calories/year/${year}`, tokenHeaderData);
};
