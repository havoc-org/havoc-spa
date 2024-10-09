import './NavBar.css';
import moon from '../../assets/moon.svg';
import sun from '../../assets/sun.svg';
import exit from '../../assets/exit.svg';
import profile from '../../assets/profile.svg';
import bell from '../../assets/bell.svg';
import home from '../../assets/home.svg';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export default function NavBar() {
  const [icon, setIcon] = useState(moon);
  const { user, logout } = useContext(AuthContext);
  const Buttons = user ? ButtonsLoggedIn : ButtonsNotLoggedIn;
  return (
    <nav className="outer">
      <link
        href="https://fonts.googleapis.com/css?family=Akronim"
        rel="stylesheet"
      ></link>
      <ul>
        <li className="nav-link">
          <Link to="/" style={{ textDecoration: 'none', color: '#BBD8EB' }}>
            <p className="logo">HAVOC</p>
          </Link>
        </li>
        <li className="nav-links">
          <Buttons
            icon={icon}
            onClickTheme={() => (icon == moon ? setIcon(sun) : setIcon(moon))}
            onLogOut={() => logout()}
          />
        </li>
      </ul>
    </nav>
  );
}

function ButtonsNotLoggedIn({ icon, onClickTheme }) {
  return (
    <ul className="nav-links-list">
      <li className="nav-link">
        <button className="tab-button" onClick={onClickTheme}>
          <img src={icon} />
        </button>
      </li>
      <li className="nav-link">
        <Link to="/login">
          <button className="a-button">Sign In</button>
        </Link>
      </li>
      <li className="nav-link">
        <Link to="/register">
          <button className="yes-button">Sign Up</button>
        </Link>
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
        <Link to="/projects">
          <button className="tab-button">
            <img src={home} />
          </button>
        </Link>
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
        <Link to="/">
          <button className="no-button tab-button" onClick={onLogOut}>
            <img src={exit} />
          </button>
        </Link>
      </li>
    </ul>
  );
}
