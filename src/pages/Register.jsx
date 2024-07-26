import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <>
      <Link to="/projects">
        <button className="yes-button">Sign Up</button>
      </Link>
    </>
  );
}
