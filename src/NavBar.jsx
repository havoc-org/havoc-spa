import './NavBar.css';
import moon from './assets/moon.svg';

function NavBar() {
  return (
    <div className="outer">
      <ul className="nav-links-list">
        <li className="nav-link">
          <p className="logo">HAVOC</p>
        </li>
        <li className="nav-link">
          <button className="tab-button">
            <img src={moon} />
          </button>
        </li>
        <li className="nav-link">
          <div className="login-buttons">
            <button className="a-button">Sign In</button>
            <button className="yes-button">Sign Up</button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
