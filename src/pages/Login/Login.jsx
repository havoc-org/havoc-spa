import { Link, useNavigate, useLocation } from 'react-router-dom';
import Tile from '../../components/Tile/Tile';
import '../Login/Login.css';
import { useEffect, useRef, useState } from 'react';
import Message from '../../components/Message/Message';
import Loading from '../../components/Loading/Loading';
import useAuth from '../../hooks/useAuth';

export default function Login() {
  const location = useLocation();
  const naviagate = useNavigate();
  const from = location.state?.from?.pathname || '/projects';
  const context = useAuth();
  const [loading, setLoading] = useState(false);
  const errorRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    setError('');
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    async function handleRequest() {
      try {
        await context.login(email, password);
        setEmail('');
        setPassword('');
        naviagate(from, { replace: true });
      } catch (e) {
        switch (e.status) {
          case 400:
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
        {loading && (
          <span style={{ margin: '0 auto' }}>
            <Loading />
          </span>
        )}
        {!loading && (
          <Message message={error} ref={errorRef} className="error" />
        )}
        <div className="flex-wrapper">
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
        <div className="buttons-wrapper">
          <button type="submit" className="yes-button" disabled={loading}>
            Login
          </button>
          <Link to="/register">
            <button className="a-button" disabled={loading}>
              First time? Join us!
            </button>
          </Link>
        </div>
      </form>
    </Tile>
  );
}
