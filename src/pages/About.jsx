import videoSrc from '../assets/videos/home_page_repeat.mp4';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useContext, useState } from 'react';

export default function About() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="about-flex">
      <div>
        <h1>
          <p>Organize Chaos.</p>
          <p>Achieve Greatness.</p>
        </h1>

        <h3>
          <p>Havoc is a powerful tool for managing projects and tasks.</p>
          <p> Plan, organize, and achieve goals efficiently.</p>
        </h3>

        <Link to={user?.token ? '/projects' : '/register'}>
          <button id="about-page" className="register-button signup-button">
            {user?.token ? 'Create New Project' : 'Get Started Today'}
          </button>
        </Link>

      </div>

      <div className="about-flex" id="video">
        <video
          className="w-full h-full object-cover"
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </div>
  );
}
