import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import './Animation.scss';
import WelcomePage from '../WelcomePage/WelcomePage';
// import Footer from '../Footer/Footer';
import GoogleLogin from '../GoogleLogin/GoogleLogin';
import { useEffect, useState } from 'react';
import { GoogleLogout } from 'react-google-login';
import { checkToken } from '../../Services/OAuthService';
import Header from '../Header/Header';
import Calendar from '../Calendar/Calendar';
import UserPage from '../UserPage/UserPage';
import TodayCard from '../TodayCard/TodayCard';
import StatisticCard, { StatisticTypes } from '../StatisticCard/StatisticCard';
import SumStatisticCard from '../SumStatisticCard/SumStatisticCard';
import { Training } from '../../Types/Training';
import {
  getUserSumTrainingInMonth,
  getUserSumTrainingInYear,
  getUserTheLargestAmountOfCalories,
  getUserTheLargestAmountOfDistances,
  getUserTheLargestAmountOfTimes,
} from '../../Services/TrainingsStatisticsService';
import { actualMonth, actualYear } from '../../helpers';
import Spinner from '../Loader/Spinner';

export const App = () => {
  const [authorized, setAuthorized] = useState(false);
  const [loaded, setLoaded] = useState(true);
  const [isRecords, setIsRecords] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userLogoUrl, setUserLogoUrl] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [todayTraining, setTodayTraining] = useState(null);
  const [currentYear, setCurrentYear] = useState(actualYear);
  const [currentMonth] = useState(actualMonth);
  const [theLargestAmountOfCalories, setTheLargestAmountOfCalories] = useState(null);
  const [theLargestAmountOfTimes, setTheLargestAmountOfTimes] = useState(null);
  const [theLargestAmountOfDistances, setTheLargestAmountOfDistances] = useState(null);
  const [sumTrainingInYear, setSumTrainingInYear] = useState(null);
  const [sumTrainingInMonth, setSumTrainingInMonth] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
      setLoaded(false);
    }
  };

  const userTheLargestAmountOfTimes = async () => {
    const userTheLargestAmountOfTimes = await getUserTheLargestAmountOfTimes(currentYear.toString());

    if (userTheLargestAmountOfTimes.status === 200) {
      setTheLargestAmountOfTimes(userTheLargestAmountOfTimes.data[0]);
      setLoaded(false);
    }
  };

  const userTheLargestAmountOfDistances = async () => {
    const userTheLargestAmountOfDistances = await getUserTheLargestAmountOfDistances(currentYear.toString());

    if (userTheLargestAmountOfDistances.status === 200) {
      setTheLargestAmountOfDistances(userTheLargestAmountOfDistances.data[0]);
      setLoaded(false);
    }
  };

  const userSumTrainingInYear = async () => {
    const userSumTrainingInYear = await getUserSumTrainingInYear(currentYear.toString());

    if (userSumTrainingInYear.status === 200) {
      setSumTrainingInYear(userSumTrainingInYear.data);
      setIsRecords(userSumTrainingInYear?.data?.count === 0);
      setLoaded(false);
    }
  };

  const userSumTrainingInMonth = async () => {
    const userSumTrainingInMonth = await getUserSumTrainingInMonth(currentYear.toString(), currentMonth.toString());

    if (userSumTrainingInMonth.status === 200) {
      console.log({ userSumTrainingInMonth });
      setSumTrainingInMonth(userSumTrainingInMonth.data);
      setLoaded(false);
    }
  };

  const logout = () => {
    localStorage.setItem('token', '');
    setAuthorized(false);
    isAuthorized(false);

    const openLogoutPopup = () => {
      const logoutPopup = window.open(
        'https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout',
        'Disconnect from Google',
        'width=100,height=50,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,top=200,left=200'
      );

      const closeLogoutPopup = (logoutPopup: any) => {
        setTimeout(() => {
          logoutPopup.close();
          window.location.reload();
        }, 1000);
      };

      closeLogoutPopup(logoutPopup);
    };

    setTimeout(openLogoutPopup, 500);
  };

  useEffect(() => {
    checkToken(setAuthorized, setUserName, setUserLogoUrl, setUserEmail);

    if (authorized) {
      userTheLargestAmountOfCalories();
      userTheLargestAmountOfDistances();
      userTheLargestAmountOfTimes();
      userSumTrainingInYear();
      userSumTrainingInMonth();
    }

    setIsRefreshing(false);
  }, [currentYear, authorized, isRefreshing]);

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
            {' '}
            <Router>
              <Header userName={userName} userLogoUrl={userLogoUrl}>
                <GoogleLogout
                  className="header__logoutButton"
                  // @ts-ignore
                  // eslint-disable-next-line no-undef
                  clientId={GOOGLE_ID}
                  buttonText="Logout"
                  onLogoutSuccess={logoutSuccess}
                  onFailure={logoutFailure}
                />
              </Header>
              <div className="fitCalendar__contentContainer">
                <Route exact path="/">
                  <div className="fitCalendar__leftContainer">
                    <TodayCard training={todayTraining} />
                    <h2>Records</h2>

                    {isRecords && <div>No records</div>}

                    {loaded && <Spinner />}

                    {sumTrainingInMonth !== null && (
                      <SumStatisticCard
                        label="Yearly summary"
                        sumWorkouts={sumTrainingInMonth.count}
                        sumDuration={sumTrainingInMonth[0].duration_sec}
                        sumDistance={sumTrainingInMonth[0].distance_km}
                        sumCalories={sumTrainingInMonth[0].calories_kcal}
                      />
                    )}

                    {sumTrainingInYear !== null && (
                      <SumStatisticCard
                        label="Monthly summary"
                        sumWorkouts={sumTrainingInYear.count}
                        sumDuration={sumTrainingInYear[0].duration_sec}
                        sumDistance={sumTrainingInYear[0].distance_km}
                        sumCalories={sumTrainingInYear[0].calories_kcal}
                      />
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
                      refreshed={(refresh: boolean) => setIsRefreshing(refresh)}
                    />
                  </div>
                </Route>
                <Route exact path="/user">
                  <UserPage
                    sumTrainingInYear={sumTrainingInYear}
                    sumTrainingInMonth={sumTrainingInMonth}
                    theLargestAmountOfTimes={theLargestAmountOfTimes}
                    theLargestAmountOfDistances={theLargestAmountOfDistances}
                    theLargestAmountOfCalories={theLargestAmountOfCalories}
                  />
                </Route>
              </div>
            </Router>
          </div>
        )}
      </div>
      {/* TODO
      <Footer />
      */}
    </>
  );
};
