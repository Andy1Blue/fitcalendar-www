import * as React from 'react';
import './GoogleLogin.scss';
import GoogleAuth from 'react-google-login';
import { checkToken, responseGoogle } from '../../Services/OAuthService';
import { useEffect, useState } from 'react';

interface GoogleLoginProps {
  isAuthorized: any;
}

const GoogleLogin = ({ isAuthorized }: GoogleLoginProps) => {
  useEffect(() => {
    checkToken(isAuthorized);
  }, []);

  return (
    <div className="googleLogin">
      <GoogleAuth
        className="googleLogin__loginButton"
        clientId={process.env.REACT_APP_GOOGLE_ID}
        buttonText="Sign in with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default GoogleLogin;
