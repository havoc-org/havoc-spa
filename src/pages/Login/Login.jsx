import { Link, useNavigate, useLocation } from 'react-router-dom';
import Tile from '../../components/Tile/Tile';
import '../Login/Login.css';
import { useEffect, useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';

export default function Login() {
  const location = useLocation();
  const naviagate = useNavigate();
  const from = location.state?.from?.pathname || '/projects';
  const { login } = useAuth();
  const errorRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    async function handleRequest() {
      try {
        await login(email, password);
        setEmail('');
        setPassword('');
        naviagate(from, { replace: true });
      } catch (e) {
        switch (e.message) {
          case '400':
            setError('Login Failed');
            break;
          default:
            console.error(e);
            setError('Internal error');
            break;
        }
        errorRef.current.focus();
      }
    }
    handleRequest();
  };

  return (
    <Tile className="login-form flex-wrapper">
      <p ref={errorRef} className="error">
        {error}
      </p>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="flex-wrapper">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            autoComplete="off"
            required
            onInput={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex-wrapper">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            autoComplete="off"
            required
            onInput={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="buttons-wrapper">
          <button type="submit" className="yes-button">
            Login
          </button>
          <Link to="/register">
            <button className="a-button">First time? Join us!</button>
          </Link>
        </div>
      </form>
    </Tile>
  );
}
