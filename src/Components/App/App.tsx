import * as React from 'react';
import './App.scss';
import './Animation.scss';
import WelcomePage from '../WelcomePage/WelcomePage';
import Footer from '../Footer/Footer';
import GoogleLogin from '../GoogleLogin/GoogleLogin';
import { useEffect, useState } from 'react';
import { GoogleLogout } from 'react-google-login';
import { checkToken } from '../../Services/OAuthService';
import Header from '../Header/Header';
import Calendar from '../Calendar/Calendar';
import TodayCard from '../TodayCard/TodayCard';
import StatisticCard, { StatisticTypes } from '../StatisticCard/StatisticCard';
import { Training } from '../../Types/Training';
import {
  getUserSumTrainingInMonth,
  getUserSumTrainingInYear,
  getUserTheLargestAmountOfCalories,
  getUserTheLargestAmountOfDistances,
  getUserTheLargestAmountOfTimes,
} from '../../Services/TrainingsStatisticsService';
import { actualMonth, actualYear } from '../../helpers';

export const App = () => {
  const [authorized, setAuthorized] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userLogoUrl, setUserLogoUrl] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [todayTraining, setTodayTraining] = useState(null);
  const [currentYear, setCurrentYear] = useState(actualYear);
  const [currentMonth, setCurrentMonth] = useState(actualMonth);
  const [theLargestAmountOfCalories, setTheLargestAmountOfCalories] = useState(null);
  const [theLargestAmountOfTimes, setTheLargestAmountOfTimes] = useState(null);
  const [theLargestAmountOfDistances, setTheLargestAmountOfDistances] = useState(null);
  const [sumTrainingInYear, setSumTrainingInYear] = useState(null);
  const [sumTrainingInMonth, setSumTrainingInMonth] = useState(null);

  const isAuthorized = (auth: boolean) => {
    setAuthorized(auth);

    return auth;
  };

  const getTodayTraining = (training: Training) => {
    setTodayTraining(training);
    return training;
  };

  const getCurrentYear = (year: number) => {
    setCurrentYear(year);
    return year;
  };

  const userTheLargestAmountOfCalories = async () => {
    const userTheLargestAmountOfCalories = await getUserTheLargestAmountOfCalories(currentYear.toString());

    if (userTheLargestAmountOfCalories.status === 200) {
      setTheLargestAmountOfCalories(userTheLargestAmountOfCalories.data[0]);
    }
  };

  const userTheLargestAmountOfTimes = async () => {
    const userTheLargestAmountOfTimes = await getUserTheLargestAmountOfTimes(currentYear.toString());

    if (userTheLargestAmountOfTimes.status === 200) {
      setTheLargestAmountOfTimes(userTheLargestAmountOfTimes.data[0]);
    }
  };

  const userTheLargestAmountOfDistances = async () => {
    const userTheLargestAmountOfDistances = await getUserTheLargestAmountOfDistances(currentYear.toString());

    if (userTheLargestAmountOfDistances.status === 200) {
      setTheLargestAmountOfDistances(userTheLargestAmountOfDistances.data[0]);
    }
  };

  const userSumTrainingInYear = async () => {
    const userSumTrainingInYear = await getUserSumTrainingInYear(currentYear.toString());

    if (userSumTrainingInYear.status === 200) {
      setSumTrainingInYear(userSumTrainingInYear.data);
    }
  };

  const userSumTrainingInMonth = async () => {
    const userSumTrainingInMonth = await getUserSumTrainingInMonth(currentYear.toString(), currentMonth.toString());

    if (userSumTrainingInMonth.status === 200) {
      setSumTrainingInMonth(userSumTrainingInMonth.data);
    }
  };

  const logout = () => {
    localStorage.setItem('token', '');
    setAuthorized(false);
    isAuthorized(false);
    window.location.reload();
  };

  useEffect(() => {
    checkToken(setAuthorized, setUserName, setUserLogoUrl, setUserEmail);
    userTheLargestAmountOfCalories();
    userTheLargestAmountOfDistances();
    userTheLargestAmountOfTimes();
    userSumTrainingInYear();
    userSumTrainingInMonth();
  }, [currentYear]);

  const logoutFailure = () => {
    logout();
  };

  const logoutSuccess = () => {
    logout();
  };

  return (
    <>
      <div className="fitCalendar">
        {!authorized && (
          <WelcomePage>
            <GoogleLogin isAuthorized={(authorized: boolean) => isAuthorized(authorized)} />
          </WelcomePage>
        )}

        {authorized && (
          <div>
            <Header userName={userName} userLogoUrl={userLogoUrl}>
              <GoogleLogout
                className="header__logoutButton"
                // @ts-ignore
                clientId={GOOGLE_ID}
                buttonText="Logout"
                onLogoutSuccess={logoutSuccess}
                onFailure={logoutFailure}
              />
            </Header>
            <div className="fitCalendar__contentContainer">
              <div className="fitCalendar__leftContainer">
                <TodayCard training={todayTraining} />
                <h2>Records</h2>

                {sumTrainingInMonth !== null && (
                  <StatisticCard type={StatisticTypes.SumTrainingsInMonth} data={sumTrainingInMonth} />
                )}

                {sumTrainingInYear !== null && (
                  <StatisticCard type={StatisticTypes.SumTrainingsInYear} data={sumTrainingInYear} />
                )}

                {theLargestAmountOfTimes !== null && (
                  <StatisticCard type={StatisticTypes.Time} data={theLargestAmountOfTimes} />
                )}

                {theLargestAmountOfDistances !== null && (
                  <StatisticCard type={StatisticTypes.Distance} data={theLargestAmountOfDistances} />
                )}

                {theLargestAmountOfCalories !== null && (
                  <StatisticCard type={StatisticTypes.Calories} data={theLargestAmountOfCalories} />
                )}
              </div>
              <div className="fitCalendar__rightContainer">
                <Calendar
                  isAuthorized={authorized}
                  userEmail={userEmail}
                  todayTraining={(training: any) => getTodayTraining(training)}
                  year={(year: any) => getCurrentYear(year)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
