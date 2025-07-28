import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { isAdmin } from '../utils/adminUtils';
import Hero from '../components/Hero';
import DynamicShowcase from '../components/DynamicShowcase';
import Features from '../components/Features';

const Home = () => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect admin users to admin dashboard
    // Learners can stay on home page
    if (!loading && currentUser && isAdmin(currentUser)) {
      navigate('/admin');
    }
  }, [currentUser, loading, navigate]);

  // Show loading if auth is still loading
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Show home page for everyone (unauthenticated users and learners)
  // Only admin gets redirected
  return (
    <div className="home-page">
      <Hero />
      <DynamicShowcase />
      <Features />
    </div>
  );
};

export default Home; 