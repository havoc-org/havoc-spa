import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <>
      <Link to="/home">
        <button className="yes-button">Sign Up</button>
      </Link>
    </>
  );
}
