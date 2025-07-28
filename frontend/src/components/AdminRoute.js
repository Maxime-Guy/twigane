import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { isAdmin, shouldShowLearnerFeatures } from '../utils/adminUtils';

// Component that redirects admin users away from learner-only pages
const AdminRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  // Wait for auth to load
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // If no user, show the page (they'll see login prompts)
  if (!currentUser) {
    return children;
  }

  // If admin user, redirect to admin dashboard
  if (isAdmin(currentUser)) {
    return <Navigate to="/admin" replace />;
  }

  // If learner, show the page
  return children;
};

// Component that only allows admin users
const AdminOnlyRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  // Wait for auth to load
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // If no user, redirect to home
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  // If not admin, redirect to learner dashboard
  if (!isAdmin(currentUser)) {
    return <Navigate to="/dashboard" replace />;
  }

  // If admin, show the page
  return children;
};

// Component that only allows learner users
const LearnerOnlyRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  // Wait for auth to load
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // If no user, show the page (they'll see login prompts)
  if (!currentUser) {
    return children;
  }

  // If admin user, redirect to admin dashboard
  if (isAdmin(currentUser)) {
    return <Navigate to="/admin" replace />;
  }

  // If learner, show the page
  return children;
};

export { AdminRoute, AdminOnlyRoute, LearnerOnlyRoute };
export default AdminRoute; 