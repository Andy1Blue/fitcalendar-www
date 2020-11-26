import * as React from 'react';
import './GoogleLogin.scss';
import GoogleAuth, { GoogleLogout } from 'react-google-login';
import { responseGoogle, verifyToken } from '../../Services/OAuthService';
import { useEffect, useState } from 'react';

const GoogleLogin = () => {
  const [isTokenVerify, setIsTokenVerify] = useState(false);

  const checkToken = async () => {
    const token = localStorage.getItem('token');

    try {
      const data = await verifyToken({
        token: token
      });

      console.log(data.data);
      setIsTokenVerify(data.data.isVerified);
    } catch {
      throw new Error('No authorization');
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const logoutFailure = () => {
    console.log('onFailure');
  };

  const logoutSuccess = () => {
    console.log('onLogoutSuccess');
    localStorage.setItem('token', '');
    checkToken();
  };

  return (
    <div>
      <GoogleAuth
        className="g"
        clientId={process.env.GOOGLE_ID}
        buttonText="Sign in with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      <GoogleLogout clientId={process.env.GOOGLE_ID} buttonText="Logout" onLogoutSuccess={logoutSuccess} onFailure={logoutFailure} />

      {isTokenVerify ? 'ok' : 'nie'}
    </div>
  );
};

export default GoogleLogin;
