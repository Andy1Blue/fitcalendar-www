import * as React from 'react';
import './WelcomePage.scss';

interface WelcomePageProps {
  children: React.ReactNode;
}

const WelcomePage = ({ children }: WelcomePageProps) => {
  const logoSrc = '../../Assets/logo-calendar.png';
  return (
    <div className="welcomePage">
      <div className="welcomePage__container">
        <img className="logo-welcome-page" src={logoSrc} alt="logo" />
        <p>FitCalendar</p>
        <div>{children}</div>
        <div className="welcomePage__footer">Photos by https://picsum.photo</div>
      </div>
    </div>
  );
};

export default WelcomePage;
