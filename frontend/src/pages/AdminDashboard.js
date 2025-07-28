import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import analyticsService from '../services/analyticsService';
import './AdminDashboard.css';

const ADMIN_EMAIL = "guymaximebakunzi@gmail.com";

const AdminDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Check if current user is admin
  const isAdmin = currentUser?.email === ADMIN_EMAIL;

  const fetchAdminData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      // Try Firebase analytics service first
      try {
        console.log('Fetching admin data from Firebase Analytics');
        const [analyticsData, usersData] = await Promise.all([
          analyticsService.getAdminAnalytics(),
          analyticsService.getAllUsersForAdmin()
        ]);
        
        if (analyticsData && Object.keys(analyticsData).length > 0) {
          console.log('Successfully loaded Firebase admin analytics');
          setAnalytics(analyticsData);
          setUsers(usersData || []);
          return;
        }
      } catch (firebaseErr) {
        console.warn('Firebase analytics unavailable, falling back to backend API:', firebaseErr);
      }
      
      // Fallback to backend API
      const analyticsResponse = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/admin/analytics`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Email': currentUser?.email || ''
        }
      });

      if (!analyticsResponse.ok) {
        throw new Error('Failed to fetch analytics data');
      }

      const analyticsData = await analyticsResponse.json();
      setAnalytics(analyticsData);

      // Fetch users data
      const usersResponse = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/admin/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Email': currentUser?.email || ''
        }
      });

      if (!usersResponse.ok) {
        throw new Error('Failed to fetch users data');
      }

      const usersData = await usersResponse.json();
      setUsers(usersData.users || []);

    } catch (err) {
      console.error('Error fetching admin data:', err);
      setError('Failed to load admin data: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.email]);

  useEffect(() => {
    if (!isAdmin) {
      setError('Access denied. Admin privileges required.');
      setLoading(false);
      return;
    }

    fetchAdminData();
  }, [isAdmin, fetchAdminData]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isAdmin) {
    return (
      <div className="admin-dashboard">
        <div className="access-denied">
          <h2>Access Denied</h2>
          <p>Admin privileges required to access this page.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={fetchAdminData} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, Administrator</p>
        <button onClick={fetchAdminData} className="refresh-button">
          🔄 Refresh Data
        </button>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button 
          className={`tab-button ${activeTab === 'system' ? 'active' : ''}`}
          onClick={() => setActiveTab('system')}
        >
          System Health
        </button>
        <button 
          className={`tab-button ${activeTab === 'activities' ? 'active' : ''}`}
          onClick={() => setActiveTab('activities')}
        >
          Recent Activities
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && analytics && (
          <div className="overview-tab">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Users</h3>
                <div className="stat-number">{analytics.overview.total_users}</div>
                <div className="stat-label">Registered learners</div>
              </div>
              
              <div className="stat-card">
                <h3>Daily Active Users</h3>
                <div className="stat-number">{analytics.overview.daily_active_users}</div>
                <div className="stat-label">Today</div>
              </div>
              
              <div className="stat-card">
                <h3>Total Interactions</h3>
                <div className="stat-number">{analytics.overview.total_interactions}</div>
                <div className="stat-label">All time</div>
              </div>
              
              <div className="stat-card">
                <h3>System Uptime</h3>
                <div className="stat-number">{analytics.overview.system_uptime}</div>
                <div className="stat-label">Current session</div>
              </div>
            </div>

            <div className="feature-usage-section">
              <h3>Feature Usage</h3>
              <div className="feature-grid">
                <div className="feature-card">
                  <h4>Chat Interactions</h4>
                  <div className="feature-number">{analytics.feature_usage.chat_interactions}</div>
                </div>
                <div className="feature-card">
                  <h4>Translation Requests</h4>
                  <div className="feature-number">{analytics.feature_usage.translation_requests}</div>
                </div>
                <div className="feature-card">
                  <h4>Quiz Attempts</h4>
                  <div className="feature-number">{analytics.feature_usage.quiz_attempts}</div>
                </div>
                <div className="feature-card">
                  <h4>Pronunciation Requests</h4>
                  <div className="feature-number">{analytics.feature_usage.pronunciation_requests}</div>
                </div>
              </div>
            </div>

            <div className="engagement-section">
              <h3>User Engagement</h3>
              <div className="engagement-stats">
                <div className="engagement-item">
                  <span className="label">Total Quiz Attempts:</span>
                  <span className="value">{analytics.user_engagement.total_quiz_attempts}</span>
                </div>
                <div className="engagement-item">
                  <span className="label">Average Quiz Score:</span>
                  <span className="value">{analytics.user_engagement.avg_quiz_score}%</span>
                </div>
                <div className="engagement-item">
                  <span className="label">Active Users Today:</span>
                  <span className="value">{analytics.user_engagement.active_users_today}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-tab">
            <div className="users-header">
              <h3>User Management</h3>
              <div className="users-count">Total Users: {users.length}</div>
            </div>
            
            <div className="users-table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Quiz Attempts</th>
                    <th>Avg Score</th>
                    <th>Chat Count</th>
                    <th>Translations</th>
                    <th>Pronunciations</th>
                    <th>Total Activities</th>
                    <th>Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td className="user-email">{user.email}</td>
                      <td>{user.total_quiz_attempts}</td>
                      <td>{user.avg_quiz_score}%</td>
                      <td>{user.chat_interactions}</td>
                      <td>{user.translation_requests}</td>
                      <td>{user.pronunciation_requests}</td>
                      <td>{user.total_activities}</td>
                      <td className="last-active">
                        {user.last_active !== 'Never' ? formatDate(user.last_active) : 'Never'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'system' && analytics && (
          <div className="system-tab">
            <h3>System Health Status</h3>
            <div className="system-health-grid">
              <div className={`health-card ${analytics.system_health.teaching_model_loaded ? 'healthy' : 'warning'}`}>
                <h4>Teaching Model</h4>
                <div className="health-status">
                  {analytics.system_health.teaching_model_loaded ? '✅ Loaded' : '❌ Not Loaded'}
                </div>
              </div>
              
              <div className={`health-card ${analytics.system_health.tts_system_loaded ? 'healthy' : 'warning'}`}>
                <h4>TTS System</h4>
                <div className="health-status">
                  {analytics.system_health.tts_system_loaded ? '✅ Loaded' : '❌ Not Loaded'}
                </div>
              </div>
              
              <div className={`health-card ${analytics.system_health.translation_model_loaded ? 'healthy' : 'warning'}`}>
                <h4>Translation Model</h4>
                <div className="health-status">
                  {analytics.system_health.translation_model_loaded ? '✅ Loaded' : '❌ Not Loaded'}
                </div>
              </div>
              
              <div className="health-card">
                <h4>Error Count</h4>
                <div className="health-status">
                  {analytics.system_health.error_count} errors
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activities' && analytics && (
          <div className="activities-tab">
            <h3>Recent Activities</h3>
            <div className="activities-list">
              {analytics.recent_activities.length > 0 ? (
                analytics.recent_activities.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon">
                      {activity.type === 'chat' && '💬'}
                      {activity.type === 'translation' && '🌍'}
                      {activity.type === 'quiz' && '❓'}
                      {activity.type === 'pronunciation' && '🔊'}
                    </div>
                    <div className="activity-details">
                      <div className="activity-header">
                        <span className="activity-user">{activity.user_email}</span>
                        <span className="activity-type">{activity.type}</span>
                        <span className="activity-time">{formatDate(activity.timestamp)}</span>
                      </div>
                      {activity.details && Object.keys(activity.details).length > 0 && (
                        <div className="activity-metadata">
                          {Object.entries(activity.details).map(([key, value]) => (
                            <span key={key} className="metadata-item">
                              {key}: {value}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-activities">
                  <p>No recent activities to display</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 