import * as React from 'react';
import './GoogleLogin.scss';
import GoogleAuth from 'react-google-login';
import { checkToken, responseGoogle } from '../../Services/OAuthService';
import { useEffect, useState } from 'react';

interface GoogleLoginProps {
  isAuthorized: any;
}

const GoogleLogin = ({ isAuthorized }: GoogleLoginProps) => {
  return (
    <div className="googleLogin">
      <GoogleAuth
        className="googleLogin__loginButton"
        // @ts-ignore
        clientId={GOOGLE_ID}
        buttonText="Sign in with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default GoogleLogin;
