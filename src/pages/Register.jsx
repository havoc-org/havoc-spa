import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Tile from '../components/Tile/Tile';
import Loading from '../components/Loading/Loading';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

export default function Register() {
  const naviagate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const errorRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    async function handleRequest() {
      try {
        await register(email, password);
        setEmail('');
        setPassword('');
        naviagate('/projects');
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
      } finally {
        setLoading(false);
      }
    }
    handleRequest();
  };

  return (
    <Tile className="login-form-tile flex-wrapper">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="flex-wrapper">
          {loading && (
            <span style={{ margin: '0 auto' }}>
              <Loading />{' '}
            </span>
          )}
          {!loading && (
            <ErrorMessage message={error} ref={errorRef} className="error" />
          )}
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="email"
            autoComplete="off"
            required
            onInput={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex-wrapper">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            id="name"
            type="text"
            autoComplete="off"
            required
            onInput={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex-wrapper">
          <label htmlFor="surname">Surname</label>
          <input
            name="surname"
            id="surname"
            type="text"
            autoComplete="off"
            required
            onInput={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex-wrapper">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            autoComplete="off"
            required
            onInput={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex-wrapper">
          <label htmlFor="confirm-password">Confirm password</label>
          <input
            name="confirm-password"
            id="confirm-password"
            type="password"
            autoComplete="off"
            required
            onInput={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="buttons-wrapper">
          <button type="submit" className="yes-button" disabled={loading}>
            Sign Up
          </button>
          <Link to="/login">
            <button className="a-button">Have account? Sign in</button>
          </Link>
        </div>
      </form>
    </Tile>
  );
}
