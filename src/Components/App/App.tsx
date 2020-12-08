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
import StatisticCard from '../StatisticCard/StatisticCard';
import { Training } from '../../Types/Training';
import { getUserTheLargestAmountOfCalories } from '../../Services/TrainingsStatisticsService';
import { actualYear } from '../../helpers';

export const App = () => {
  const [authorized, setAuthorized] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userLogoUrl, setUserLogoUrl] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [todayTraining, setTodayTraining] = useState(null);
  const [currentYear, setCurrentYear] = useState(actualYear);
  const [theLargestAmountOfCalories, setTheLargestAmountOfCalories] = useState(null);

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

  const logout = () => {
    localStorage.setItem('token', '');
    setAuthorized(false);
    isAuthorized(false);
    window.location.reload();
  };

  useEffect(() => {
    checkToken(setAuthorized, setUserName, setUserLogoUrl, setUserEmail);
    userTheLargestAmountOfCalories();
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
                clientId={process.env.REACT_APP_GOOGLE_ID}
                buttonText="Logout"
                onLogoutSuccess={logoutSuccess}
                onFailure={logoutFailure}
              />
            </Header>
            <div className="fitCalendar__contentContainer">
              <div className="fitCalendar__leftContainer">
                <TodayCard training={todayTraining} />
                <h2>Records</h2>
                {theLargestAmountOfCalories !== null && (
                  <StatisticCard title="Calories" training={theLargestAmountOfCalories} />
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
