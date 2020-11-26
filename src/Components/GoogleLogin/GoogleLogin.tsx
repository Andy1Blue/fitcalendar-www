import * as React from 'react';
import './GoogleLogin.scss';
import GoogleAuth, { GoogleLogout } from 'react-google-login';
import { checkToken, responseGoogle, verifyToken } from '../../Services/OAuthService';
import { useEffect, useState } from 'react';
import { ApiResponse } from '../../Types/ApiResponse';

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
