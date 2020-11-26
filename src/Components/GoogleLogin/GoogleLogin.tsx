import * as React from 'react';
import './GoogleLogin.scss';
import GoogleAuth, { GoogleLogout } from 'react-google-login';
import { responseGoogle, verifyToken } from '../../Services/OAuthService';
import { useEffect, useState } from 'react';

const GoogleLogin = ({ isAuthorized }: any) => {
  const checkToken = async () => {
    const token = localStorage.getItem('token');

    try {
      const result = await verifyToken({
        token: token,
      });

      isAuthorized(result.data.isVerified);
    } catch (e) {
      isAuthorized(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <div className="googleLogin">
      <GoogleAuth
        clientId={process.env.GOOGLE_ID}
        buttonText="Sign in with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default GoogleLogin;
