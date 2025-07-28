import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { shouldShowAdminFeatures } from '../utils/adminUtils';
import './Footer.css';

const Footer = () => {
  const { currentUser } = useAuth();
  const currentYear = new Date().getFullYear();
  const isAdmin = shouldShowAdminFeatures(currentUser);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section brand-section">
            <div className="footer-logo">
              <div className="logo-container">
                <h3 className="logo-text">
                  <span className="logo-letter">T</span>
                  <span className="logo-letter">w</span>
                  <span className="logo-letter">i</span>
                  <span className="logo-letter">g</span>
                  <span className="logo-letter">a</span>
                  <span className="logo-letter">n</span>
                  <span className="logo-letter">e</span>
                </h3>
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
            </div>
            <p className="footer-description">
              Your AI-powered companion for learning Kinyarwanda. 
              Discover the beauty of Rwanda's language through interactive conversations.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              {isAdmin ? (
                <>
                  <li><Link to="/admin" className="footer-link">Admin Dashboard</Link></li>
                  <li><Link to="/about" className="footer-link">About Us</Link></li>
                  <li><Link to="/settings" className="footer-link">Settings</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/chat" className="footer-link">Start Learning</Link></li>
                  <li><Link to="/translate" className="footer-link">Translation</Link></li>
                  <li><Link to="/quiz" className="footer-link">Take Quiz</Link></li>
                  <li><Link to="/dashboard" className="footer-link">Dashboard</Link></li>
                  <li><Link to="/about" className="footer-link">About Us</Link></li>
                  <li><Link to="/settings" className="footer-link">Settings</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Learning Resources - Only for learners */}
          {!isAdmin && (
            <div className="footer-section">
              <h4 className="footer-title">Learning</h4>
              <ul className="footer-links">
                <li><Link to="/chat" className="footer-link">Vocabulary</Link></li>
                <li><Link to="/chat" className="footer-link">Grammar</Link></li>
                <li><Link to="/chat" className="footer-link">Pronunciation</Link></li>
                <li><Link to="/quiz" className="footer-link">Practice Quiz</Link></li>
                <li><Link to="/translate" className="footer-link">Text Translation</Link></li>
                <li><Link to="/translate" className="footer-link">Document Translation</Link></li>
              </ul>
            </div>
          )}

          {/* Admin Resources - Only for admin */}
          {isAdmin && (
            <div className="footer-section">
              <h4 className="footer-title">Administration</h4>
              <ul className="footer-links">
                <li><Link to="/admin" className="footer-link">Dashboard</Link></li>
                <li><Link to="/admin" className="footer-link">User Management</Link></li>
                <li><Link to="/admin" className="footer-link">System Analytics</Link></li>
                <li><Link to="/admin" className="footer-link">Activity Monitor</Link></li>
                <li><Link to="/feedback" className="footer-link">User Feedback</Link></li>
              </ul>
            </div>
          )}

          {/* Support */}
          <div className="footer-section">
            <h4 className="footer-title">Support</h4>
            <ul className="footer-links">
              <li><Link to="/help-center" className="footer-link">Help Center</Link></li>
              <li><Link to="/faq" className="footer-link">FAQ</Link></li>
              <li><Link to="/privacy-policy" className="footer-link">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="footer-link">Terms of Service</Link></li>
              <li><Link to="/feedback" className="footer-link">Feedback</Link></li>
            </ul>
          </div>


        </div>



        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; {currentYear} Twigane. All rights reserved.</p>
              <p>Made with ❤️ in Rwanda for language learners worldwide.</p>
            </div>
            <div className="footer-bottom-links">
              <Link to="/privacy-policy" className="footer-bottom-link">Privacy</Link>
              <Link to="/terms-of-service" className="footer-bottom-link">Terms</Link>
              <Link to="/privacy-policy" className="footer-bottom-link">Cookies</Link>
              <Link to="/help-center" className="footer-bottom-link">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 