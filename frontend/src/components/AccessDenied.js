import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { isAdmin } from '../utils/adminUtils';
import './AccessDenied.css';

const AccessDenied = ({ message, redirectTo, redirectText }) => {
  const { currentUser } = useAuth();

  const defaultMessage = isAdmin(currentUser) 
    ? "This page is for learners only. As an administrator, you have access to the admin dashboard."
    : "You don't have permission to access this page.";

  const defaultRedirectTo = isAdmin(currentUser) ? "/admin" : "/dashboard";
  const defaultRedirectText = isAdmin(currentUser) ? "Go to Admin Dashboard" : "Go to Dashboard";

  return (
    <div className="access-denied">
      <div className="access-denied-container">
        <div className="access-denied-icon">🚫</div>
        <h2>Access Denied</h2>
        <p>{message || defaultMessage}</p>
        <div className="access-denied-actions">
          <Link 
            to={redirectTo || defaultRedirectTo} 
            className="access-denied-button"
          >
            {redirectText || defaultRedirectText}
          </Link>
          <Link to="/" className="access-denied-link">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied; 