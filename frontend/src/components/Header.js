import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const { currentUser, login, signup, signInWithGoogle, logout, authError, isAuthInitialized } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [localAuthError, setLocalAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLocalAuthError('');
    setIsLoading(true);

    try {
      if (authMode === 'signup') {
        if (authData.password !== authData.confirmPassword) {
          setLocalAuthError('Passwords do not match');
          setIsLoading(false);
          return;
        }
        if (authData.name.trim().length < 2) {
          setLocalAuthError('Name must be at least 2 characters');
          setIsLoading(false);
          return;
        }
        await signup(authData.email, authData.password, authData.name);
      } else {
        await login(authData.email, authData.password);
      }
      
      // Reset form and close modal on success
      setAuthData({ email: '', password: '', name: '', confirmPassword: '' });
      setShowAuthModal(false);
    } catch (error) {
      setLocalAuthError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLocalAuthError('');
    setIsLoading(true);

    try {
      await signInWithGoogle();
      setShowAuthModal(false);
    } catch (error) {
      setLocalAuthError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const handleAuthInputChange = (e) => {
    setAuthData({
      ...authData,
      [e.target.name]: e.target.value
    });
    setLocalAuthError('');
  };

  const openAuthModal = (mode) => {
    if (!isAuthInitialized) {
      alert('Firebase is not properly configured. Please check your .env file with your Firebase project settings.');
      return;
    }
    setAuthMode(mode);
    setShowAuthModal(true);
    setLocalAuthError('');
    setAuthData({ email: '', password: '', name: '', confirmPassword: '' });
  };

  return (
    <>
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
                          <Link to="/translate" className="nav-link">Translate</Link>
                              <Link to="/quiz" className="nav-link">Quiz</Link>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                {currentUser?.email === 'guymaximebakunzi@gmail.com' && (
                  <Link to="/admin" className="nav-link admin-link">Admin</Link>
                )}
                <Link to="/about" className="nav-link">About</Link>
            <Link to="/settings" className="nav-link">Settings</Link>
          </nav>
          <div className="header-actions">
            {currentUser ? (
              <div className="user-menu">
                <span className="welcome-user">
                  Welcome, {currentUser.displayName || currentUser.email}!
                </span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <button 
                  onClick={() => openAuthModal('signin')} 
                  className={`auth-btn signin-btn ${!isAuthInitialized ? 'disabled' : ''}`}
                  disabled={!isAuthInitialized}
                  title={!isAuthInitialized ? 'Firebase configuration required' : ''}
                >
                  Sign In
                </button>
                <button 
                  onClick={() => openAuthModal('signup')} 
                  className={`auth-btn signup-btn ${!isAuthInitialized ? 'disabled' : ''}`}
                  disabled={!isAuthInitialized}
                  title={!isAuthInitialized ? 'Firebase configuration required' : ''}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Show Firebase configuration error */}
        {authError && (
          <div className="firebase-error-banner">
            <strong>⚠️ Configuration Required:</strong> {authError}
          </div>
        )}
      </header>

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="auth-modal-overlay" onClick={() => setShowAuthModal(false)}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <div className="auth-modal-header">
              <h2>🇷🇼 Welcome to Twigane</h2>
              <button 
                className="close-modal-btn"
                onClick={() => setShowAuthModal(false)}
              >
                ×
              </button>
            </div>

            <div className="auth-tabs">
              <button 
                className={`auth-tab ${authMode === 'signin' ? 'active' : ''}`}
                onClick={() => setAuthMode('signin')}
              >
                Sign In
              </button>
              <button 
                className={`auth-tab ${authMode === 'signup' ? 'active' : ''}`}
                onClick={() => setAuthMode('signup')}
              >
                Sign Up
              </button>
            </div>

            {/* Google Sign-In Button */}
            <div className="google-auth-section">
              <button 
                onClick={handleGoogleSignIn} 
                className="google-signin-btn"
                disabled={isLoading || !isAuthInitialized}
              >
                <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {isLoading ? 'Signing in...' : `Continue with Google`}
              </button>
            </div>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <form onSubmit={handleAuthSubmit} className="auth-form">
              {authMode === 'signup' && (
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={authData.name}
                    onChange={handleAuthInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={authData.email}
                  onChange={handleAuthInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={authData.password}
                  onChange={handleAuthInputChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {authMode === 'signup' && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={authData.confirmPassword}
                    onChange={handleAuthInputChange}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              )}

              {localAuthError && (
                <div className="auth-error">
                  {localAuthError}
                </div>
              )}

              <button type="submit" className="auth-submit-btn" disabled={isLoading || !isAuthInitialized}>
                {isLoading ? 'Loading...' : (authMode === 'signin' ? 'Sign In with Email' : 'Sign Up with Email')}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header; 