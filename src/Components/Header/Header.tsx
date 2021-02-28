import * as React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

interface HeaderProps {
  children: React.ReactNode;
  userName: string;
  userLogoUrl: string;
}

const Header = ({ children, userName, userLogoUrl }: HeaderProps) => {
  const logoSrc = '../../Assets/logo-calendar.png';

  return (
    <div className="header">
      <div className="header__title">
        <img className="header__logo" src={logoSrc} alt="logo" />{' '}
        <Link className="header__logo--link" to="/">
          FitCalendar
        </Link>
      </div>
      <div className="header__menuList">
        <Link className="header__menuItem--desktop" to="/user">
          Hello <img src={userLogoUrl} alt="user logo" className="header__userLogo" /> {userName}!
        </Link>
        <Link className="header__menuItem--mobile" to="/user">
          <img src={userLogoUrl} alt="user logo" className="header__userLogo" />
        </Link>
        <div className="header__menuItem">{children}</div>
      </div>
    </div>
  );
};

export default Header;
