import { Link } from 'react-router-dom';

export default function login() {
  return (
    <>
      <Link to="/home">
        <button className="yes-button">Sign In</button>
      </Link>
    </>
  );
}
