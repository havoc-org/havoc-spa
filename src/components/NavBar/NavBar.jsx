import './NavBar.css';
import moon from '../../assets/moon.svg';
import sun from '../../assets/sun.svg';
import exit from '../../assets/exit.svg';
import profile from '../../assets/profile.svg';
import bell from '../../assets/bell.svg';
import home from '../../assets/home.svg';
import { useState } from 'react';

export default function NavBar() {
  const [icon, setIcon] = useState(moon);
  const [loggedIn, setCookie] = useState(false);
  const Buttons = loggedIn ? ButtonsLoggedIn : ButtonsNotLoggedIn;
  return (
    <nav className="outer">
      <link
        href="https://fonts.googleapis.com/css?family=Akronim"
        rel="stylesheet"
      ></link>
      <ul>
        <li className="nav-link">
          <p className="logo">HAVOC</p>
        </li>
        <li className="nav-links">
          <Buttons
            icon={icon}
            onClickTheme={() => (icon == moon ? setIcon(sun) : setIcon(moon))}
            onLogOut={() => setCookie(false)}
            onLogin={() => setCookie(!loggedIn)}
          />
        </li>
      </ul>
    </nav>
  );
}

function ButtonsNotLoggedIn({ icon, onClickTheme, onLogin }) {
  return (
    <ul className="nav-links-list">
      <li className="nav-link">
        <button className="tab-button" onClick={onClickTheme}>
          <img src={icon} />
        </button>
      </li>
      <li className="nav-link">
        <button className="a-button" onClick={onLogin}>
          Sign In
        </button>
      </li>
      <li className="nav-link">
        <button className="yes-button">Sign Up</button>
      </li>
    </ul>
  );
}

function ButtonsLoggedIn({ icon, onClickTheme, onLogOut }) {
  return (
    <ul className="nav-links-list">
      <li className="nav-link">
        <button className="tab-button" onClick={onClickTheme}>
          <img src={icon} />
        </button>
      </li>
      <li className="nav-link">
        <button className="tab-button">
          <img src={home} />
        </button>
      </li>
      <li className="nav-link">
        <button className="tab-button">
          <img src={bell} />
        </button>
      </li>
      <li className="nav-link">
        <button className="tab-button">
          <img src={profile} />
        </button>
      </li>
      <li className="nav-link">
        <button className="no-button tab-button" onClick={onLogOut}>
          <img src={exit} />
        </button>
      </li>
    </ul>
  );
}
