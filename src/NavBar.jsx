import './NavBar.css';
import moon from './assets/moon.svg';

function NavBar() {
  return (
    <div className="outer">
      <ul className="nav-links-list">
        <li className="nav-link">
          <spam className="logo">HAVOC</spam>
        </li>
        <li className="nav-link">
          <ul className="nav-links-list">
            <li className="nav-link">
              <button className="tab-button">
                <img src={moon} />
              </button>
            </li>
            <li className="nav-link">
              <button className="a-button">Sign In</button>
            </li>
            <li className="nav-link">
              <button className="yes-button">Sign Up</button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
