import * as React from 'react';
import './WelcomePage.scss';
import { useLayoutEffect, useEffect, useState } from 'react';

const WelcomePage = ({ children }: any) => {
  const logoSrc = '../../Assets/logo-calendar.png';

  return (
    <div className="welcomePage">
      <div className="welcomePage__container">
        <img className="logo-welcome-page" src={logoSrc} alt="logo" />
        <p>FitCalendar</p>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default WelcomePage;
