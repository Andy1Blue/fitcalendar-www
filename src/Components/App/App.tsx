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
import { Training } from '../../Types/Training';

export const App = () => {
  const [authorized, setAuthorized] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userLogoUrl, setUserLogoUrl] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [todayTraining, setTodayTraining] = useState(null);

  const isAuthorized = (auth: boolean) => {
    setAuthorized(auth);

    return auth;
  };

  const getTodayTraining = (training: Training) => {
    setTodayTraining(training);
    return training;
  };

  const logoutLogic = () => {
    localStorage.setItem('token', '');
    checkToken(setAuthorized, setUserName, setUserLogoUrl, setUserEmail);
  };

  useEffect(() => {
    checkToken(setAuthorized, setUserName, setUserLogoUrl, setUserEmail);
  }, []);

  const logoutFailure = () => {
    logoutLogic();
  };

  const logoutSuccess = () => {
    logoutLogic();
  };

  return (<>
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
              clientId={process.env.GOOGLE_ID}
              buttonText="Logout"
              onLogoutSuccess={logoutSuccess}
              onFailure={logoutFailure}
            />
          </Header>
          <div className="fitCalendar__contentContainer">
            <div className="fitCalendar__leftContainer">
              <TodayCard training={todayTraining} />
            </div>
            <div className="fitCalendar__rightContainer">
              <Calendar isAuthorized={authorized} userEmail={userEmail} todayTraining={(training: any) => getTodayTraining(training)} />
            </div>
          </div>
        </div>
      )}

    </div><Footer /></>
  );
};
