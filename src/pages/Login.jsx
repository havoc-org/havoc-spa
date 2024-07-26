import { Link } from 'react-router-dom';

export default function login() {
  return (
    <>
      <Link to="/projects">
        <button className="yes-button">Sign In</button>
      </Link>
    </>
  );
}
