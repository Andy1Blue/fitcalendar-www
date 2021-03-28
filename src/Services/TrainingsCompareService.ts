import http from '../http';
import { TokenHeaderData } from '../Types/ApiResponse';

const token = localStorage.getItem('token');

type userCompareProps = { userOneEmail: string; userTwoEmail: string; year: string; month?: string };

export const getUserYearCompare = async ({ userOneEmail, userTwoEmail, year }: userCompareProps) => {
  try {
    const response = await getYear(userOneEmail, userTwoEmail, year, { headers: { token } });

    return response;
  } catch (e) {
    throw new Error("Can't get user year compare");
  }
};

export const getUserMonthCompare = async ({ userOneEmail, userTwoEmail, year, month }: userCompareProps) => {
  try {
    const response = await getMonth(userOneEmail, userTwoEmail, year, month, { headers: { token } });

    return response;
  } catch (e) {
    throw new Error("Can't get user month compare");
  }
};

export const getYear = (userOneEmail: string, userTwoEmail: string, year: string, tokenHeaderData: TokenHeaderData) => {
  return http.get(`/trainings/compare/user/${userOneEmail}/to/${userTwoEmail}/year/${year}`, tokenHeaderData);
};

export const getMonth = (
  userOneEmail: string,
  userTwoEmail: string,
  year: string,
  month: string,
  tokenHeaderData: TokenHeaderData
) => {
  return http.get(
    `/trainings/compare/user/${userOneEmail}/to/${userTwoEmail}/year/${year}/month/${month}`,
    tokenHeaderData
  );
};
