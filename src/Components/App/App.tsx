import * as React from 'react';
import './App.scss';
import WelcomePage from '../WelcomePage/WelcomePage';
import Footer from '../Footer/Footer';
import GoogleLogin from '../GoogleLogin/GoogleLogin';
import { useEffect, useState } from 'react';
import { GoogleLogout } from 'react-google-login';
import { checkToken } from '../../Services/OAuthService';
import Header from '../Header/Header';
import Calendar from '../Calendar/Calendar';

export const App = () => {
  const [authorized, setAuthorized] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userLogoUrl, setUserLogoUrl] = useState(null);

  const isAuthorized = (auth: boolean) => {
    setAuthorized(auth);

    return auth;
  };

  const logoutLogic = () => {
    localStorage.setItem('token', '');
    checkToken(setAuthorized, setUserName, setUserLogoUrl);
  };

  useEffect(() => {
    checkToken(setAuthorized, setUserName, setUserLogoUrl);
  }, []);

  const logoutFailure = () => {
    logoutLogic();
  };

  const logoutSuccess = () => {
    logoutLogic();
  };

  return (
    <div>
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
          <Calendar isAuthorized={authorized}></Calendar>
        </div>
      )}
      <Footer />
    </div>
  );
};
