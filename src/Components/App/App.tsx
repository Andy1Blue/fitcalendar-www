import * as React from 'react';
import './App.scss';
import WelcomePage from '../WelcomePage/WelcomePage';
import Footer from '../Footer/Footer';
import GoogleLogin from '../GoogleLogin/GoogleLogin';
import { useEffect, useState } from 'react';
import { GoogleLogout } from 'react-google-login';
import { verifyToken } from '../../Services/OAuthService';
import Header from '../Header/Header';

export interface Props {
  appName: string;
  appLang: string;
}

export const App = () => {
  const [authorized, setAuthorized] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userLogoUrl, setUserLogoUrl] = useState(null);

  const isAuthorized = (auth: any) => {
    setAuthorized(auth);
    return auth;
  };

  const checkToken = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await verifyToken({
        token: token,
      });

      setAuthorized(response.data.isVerified);
      setUserName(response.data.payload.given_name);
      setUserLogoUrl(response.data.payload.picture);
      console.log(response.data);
    } catch (e) {
      setAuthorized(false);
      isAuthorized(false);
    }
  };

  const logoutLogic = () => {
    localStorage.setItem('token', '');
    checkToken();
  };

  useEffect(() => {
    checkToken();
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
        <Header userName={userName} userLogoUrl={userLogoUrl}>
          <GoogleLogout
            className="header__logoutButton"
            clientId={process.env.GOOGLE_ID}
            buttonText="Logout"
            onLogoutSuccess={logoutSuccess}
            onFailure={logoutFailure}
          />
        </Header>
      )}
      <Footer />
    </div>
  );
};
