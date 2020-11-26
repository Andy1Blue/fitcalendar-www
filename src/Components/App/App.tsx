import * as React from 'react';
import './App.scss';
import GoogleLogin from '../GoogleLogin/GoogleLogin';

export interface Props {
  appName: string;
  appLang: string;
}

export const App = () => (
  <div>
    <GoogleLogin />
  </div>
);
