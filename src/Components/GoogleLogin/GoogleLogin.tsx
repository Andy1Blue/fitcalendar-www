import * as React from 'react';
import './GoogleLogin.scss';
import GoogleAuth from 'react-google-login';
import { responseGoogle } from '../../Services/OAuthService';

interface GoogleLoginProps {
  isAuthorized: any;
}

// eslint-disable-next-line no-unused-vars
const GoogleLogin = ({ isAuthorized }: GoogleLoginProps) => {
  return (
    <div className="googleLogin">
      <GoogleAuth
        className="googleLogin__loginButton"
        // @ts-ignore
        // eslint-disable-next-line no-undef
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
