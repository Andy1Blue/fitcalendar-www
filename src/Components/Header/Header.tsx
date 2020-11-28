import * as React from 'react';
import './Header.scss';

interface HeaderProps {
  children: any;
  userName: string;
  userLogoUrl: string;
}

const Header = ({ children, userName, userLogoUrl }: HeaderProps) => {
  const logoSrc = '../../Assets/logo-calendar.png';

  return (
    <div className="header">
      <div className="header__title">
        <img className="header__logo" src={logoSrc} alt="logo" /> FitCalendar
      </div>
      <div className="header__menuList">
        <div className="header__menuItem">
          Hello <img src={userLogoUrl} alt="user logo" className="header__userLogo" /> {userName}!
        </div>
        <div className="header__menuItem">Show training calendar</div>
        <div className="header__menuItem">{children}</div>
      </div>
    </div>
  );
};

export default Header;
