import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" className="logo-link">
            <div className="logo-container">
              <h1 className="logo-text">
                <span className="logo-letter">T</span>
                <span className="logo-letter">w</span>
                <span className="logo-letter">i</span>
                <span className="logo-letter">g</span>
                <span className="logo-letter">a</span>
                <span className="logo-letter">n</span>
                <span className="logo-letter">e</span>
              </h1>
              <div className="logo-underline"></div>
            </div>
            <div className="logo-accent">
              <span className="flag-emoji">🇷🇼</span>
              <div className="logo-sparkles">
                <span className="sparkle">✨</span>
                <span className="sparkle">⭐</span>
                <span className="sparkle">💫</span>
              </div>
            </div>
          </Link>
        </div>
        <nav className="nav">
          <Link to="/chat" className="nav-link">Chat</Link>
          <Link to="/whatsapp" className="nav-link">WhatsApp</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>
        <div className="header-actions">
          <Link to="/chat" className="start-chat-btn">
            Start Chat
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 