import './Register.css';
import { Link } from 'react-router-dom';
import { useState, useRef, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Tile from '../../components/Tile/Tile';
import Loading from '../../components/Loading/Loading';
import Message from '../../components/Message/Message';

import TextInput from '../../components/TextInput/TextInput';

const pwdRegex = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

const emailRegex = /^^[^@]+@[^@]+\.[^@]+$/;

export default function Register() {
  const naviagate = useNavigate();
  const { register, login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const errorRef = useRef();
  const emailListRef = useRef([]);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const [name, setName] = useState('');
  const [validName, setValidName] = useState(false);

  const [surname, setSurname] = useState('');
  const [validSurname, setValidSurname] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);

  const [validMatch, setValidMatch] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    async function handleRequest() {
      const oldEmail = email;
      try {
        await register(email, password, name, surname);
        setIsSuccess(true);
        await login(email, password);
        setEmail('');
        setPassword('');
        naviagate('/projects');
      } catch (e) {
        switch (e.message) {
          case '400':
            setError('Email is already in use');
            emailListRef.current.push(oldEmail);
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
      <form onSubmit={handleSubmit} className="login-form" autoComplete="off">
        <div className="flex-wrapper">
          {loading && (
            <span style={{ margin: '0 auto' }}>
              <Loading />
            </span>
          )}
          {!loading && (
            <Message
              message={isSuccess ? 'Account has been created' : error}
              success={isSuccess}
              ref={errorRef}
              className="error"
            />
          )}
          <TextInput
            autoComplete="off"
            type="email"
            id="email"
            label="Email"
            setOutsideData={setEmail}
            setOutsideValidationState={setValidEmail}
            validationFunc={(e) =>
              emailRegex.test(e) && !emailListRef.current.includes(e)
            }
          >
            {emailListRef.current.includes(email)
              ? 'Email is already in use'
              : 'Invalid email'}
          </TextInput>
          <TextInput
            autoComplete="off"
            type="text"
            id="name"
            label="Name"
            setOutsideData={setName}
            setOutsideValidationState={setValidName}
            validationFunc={(e) => e.length > 0}
          >
            Name is required
          </TextInput>
          <TextInput
            autoComplete="off"
            type="text"
            id="surname"
            label="Surname"
            setOutsideData={setSurname}
            setOutsideValidationState={setValidSurname}
            validationFunc={(e) => e.length > 0}
          >
            Surname is required
          </TextInput>
          <TextInput
            autoComplete="off"
            type="password"
            id="password"
            label="Password"
            setOutsideData={setPassword}
            setOutsideValidationState={setValidPassword}
            validationFunc={(e) => pwdRegex.test(e)}
          >
            From 8 to 20 latin only characters
            <br />
            Have 1 special character, number and upper case letter
            <br />
          </TextInput>
          <TextInput
            autoComplete="off"
            type="password"
            id="confirm-password"
            label="Confirm password"
            setOutsideValidationState={setValidMatch}
            validationFunc={(e) => password === e}
          >
            Passwords doesnt match
          </TextInput>
        </div>
        <div className="buttons-wrapper">
          <button
            type="submit"
            className="yes-button"
            disabled={
              loading ||
              !(
                validEmail &&
                validMatch &&
                validName &&
                validSurname &&
                validPassword
              )
            }
          >
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
