import * as React from 'react';
import './App.scss';
import WelcomePage from '../WelcomePage/WelcomePage';
import Footer from '../Footer/Footer';
import GoogleLogin from '../GoogleLogin/GoogleLogin';
import { useState } from 'react';
import { GoogleLogout } from 'react-google-login';
import { verifyToken } from '../../Services/OAuthService';

export interface Props {
  appName: string;
  appLang: string;
}

export const App = () => {
  const [authorized, setAuthorized] = useState(false);

  const isAuthorized = (auth: any) => {
    setAuthorized(auth);
    return auth;
  };

  const checkToken = async () => {
    const token = localStorage.getItem('token');

    try {
      const result = await verifyToken({
        token: token,
      });

      setAuthorized(result.data.isVerified);
    } catch (e) {
      setAuthorized(false);
      isAuthorized(false);
    }
  };

  const logoutLogic = () => {
    localStorage.setItem('token', '');
    checkToken();
  };

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
          <span>zalogowany</span>
          <GoogleLogout
            clientId={process.env.GOOGLE_ID}
            buttonText="Logout"
            onLogoutSuccess={logoutSuccess}
            onFailure={logoutFailure}
          />
        </div>
      )}
      <Footer />
    </div>
  );
};
