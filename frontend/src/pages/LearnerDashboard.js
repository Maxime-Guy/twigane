import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import './LearnerDashboard.css';

const LearnerDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLearnerData = useCallback(async () => {
    try {
      setLoading(true);
      
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/learner/dashboard`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Email': currentUser?.email || ''
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const data = await response.json();
      setDashboardData(data);

    } catch (err) {
      console.error('Error fetching learner dashboard:', err);
      setError('Failed to load dashboard data: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.email]);

  useEffect(() => {
    if (currentUser) {
      fetchLearnerData();
    }
  }, [currentUser, fetchLearnerData]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAchievementIcon = (achievement) => {
    const icons = {
      first_chat: '💬',
      first_quiz: '🎯',
      quiz_master: '🏆',
      consistent_learner: '⭐',
      translation_explorer: '🌍'
    };
    return icons[achievement] || '🎯';
  };

  const getAchievementTitle = (achievement) => {
    const titles = {
      first_chat: 'First Chat',
      first_quiz: 'Quiz Beginner',
      quiz_master: 'Quiz Master',
      consistent_learner: 'Consistent Learner',
      translation_explorer: 'Translation Explorer'
    };
    return titles[achievement] || achievement;
  };

  const getAchievementDescription = (achievement) => {
    const descriptions = {
      first_chat: 'Started your first conversation',
      first_quiz: 'Completed your first quiz',
      quiz_master: 'Scored 80% or higher on a quiz',
      consistent_learner: 'Maintained regular learning activity',
      translation_explorer: 'Made 5 or more translations'
    };
    return descriptions[achievement] || 'Achievement unlocked!';
  };

  if (!currentUser) {
    return (
      <div className="learner-dashboard">
        <div className="auth-required">
          <h2>Authentication Required</h2>
          <p>Please sign in to view your learning dashboard.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="learner-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="learner-dashboard">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={fetchLearnerData} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="learner-dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {currentUser.displayName || currentUser.email?.split('@')[0]}!</h1>
          <p>Continue your Kinyarwanda learning journey</p>
        </div>
        <button onClick={fetchLearnerData} className="refresh-button">
          🔄 Refresh
        </button>
      </div>

      {dashboardData && (
        <div className="dashboard-content">
          {/* Overview Stats */}
          <div className="overview-section">
            <h2>Your Learning Overview</h2>
            <div className="stats-grid">
              <div className="stat-card total-interactions">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <div className="stat-number">{dashboardData.overview.total_interactions}</div>
                  <div className="stat-label">Total Interactions</div>
                </div>
              </div>
              
              <div className="stat-card quiz-attempts">
                <div className="stat-icon">🎯</div>
                <div className="stat-info">
                  <div className="stat-number">{dashboardData.overview.quiz_attempts}</div>
                  <div className="stat-label">Quiz Attempts</div>
                </div>
              </div>
              
              <div className="stat-card avg-score">
                <div className="stat-icon">⭐</div>
                <div className="stat-info">
                  <div className="stat-number">{dashboardData.overview.avg_quiz_score}%</div>
                  <div className="stat-label">Average Quiz Score</div>
                </div>
              </div>
              
              <div className="stat-card learning-streak">
                <div className="stat-icon">🔥</div>
                <div className="stat-info">
                  <div className="stat-number">{dashboardData.overview.learning_streak}</div>
                  <div className="stat-label">Learning Streak</div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="progress-section">
            <h2>Your Progress</h2>
            <div className="progress-grid">
              <div className="progress-card">
                <h3>💬 Chat Practice</h3>
                <div className="progress-bar">
                  <div 
                    className="progress-fill chat" 
                    style={{width: `${Math.min(dashboardData.progress.chat_interactions * 10, 100)}%`}}
                  ></div>
                </div>
                <div className="progress-text">{dashboardData.progress.chat_interactions} conversations</div>
              </div>
              
              <div className="progress-card">
                <h3>🌍 Translations</h3>
                <div className="progress-bar">
                  <div 
                    className="progress-fill translation" 
                    style={{width: `${Math.min(dashboardData.progress.translations_made * 20, 100)}%`}}
                  ></div>
                </div>
                <div className="progress-text">{dashboardData.progress.translations_made} translations</div>
              </div>
              
              <div className="progress-card">
                <h3>🔊 Pronunciation</h3>
                <div className="progress-bar">
                  <div 
                    className="progress-fill pronunciation" 
                    style={{width: `${Math.min(dashboardData.progress.pronunciation_practice * 20, 100)}%`}}
                  ></div>
                </div>
                <div className="progress-text">{dashboardData.progress.pronunciation_practice} practices</div>
              </div>
            </div>
          </div>

          {/* Quiz Scores Chart */}
          {dashboardData.progress.quiz_scores.length > 0 && (
            <div className="quiz-scores-section">
              <h2>Recent Quiz Performance</h2>
              <div className="quiz-chart">
                {dashboardData.progress.quiz_scores.map((score, index) => (
                  <div key={index} className="quiz-score-bar">
                    <div 
                      className="score-fill" 
                      style={{
                        height: `${score}%`,
                        backgroundColor: score >= 80 ? '#28a745' : score >= 60 ? '#ffc107' : '#dc3545'
                      }}
                    ></div>
                    <div className="score-label">{score}%</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          <div className="achievements-section">
            <h2>Your Achievements</h2>
            <div className="achievements-grid">
              {Object.entries(dashboardData.achievements).map(([key, unlocked]) => (
                <div key={key} className={`achievement-card ${unlocked ? 'unlocked' : 'locked'}`}>
                  <div className="achievement-icon">
                    {unlocked ? getAchievementIcon(key) : '🔒'}
                  </div>
                  <div className="achievement-info">
                    <h4>{getAchievementTitle(key)}</h4>
                    <p>{getAchievementDescription(key)}</p>
                  </div>
                  {unlocked && <div className="achievement-badge">✓</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          {dashboardData.recommendations.length > 0 && (
            <div className="recommendations-section">
              <h2>Personalized Recommendations</h2>
              <div className="recommendations-list">
                {dashboardData.recommendations.map((recommendation, index) => (
                  <div key={index} className="recommendation-card">
                    <div className="recommendation-icon">💡</div>
                    <p>{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Activities */}
          {dashboardData.recent_activities.length > 0 && (
            <div className="activities-section">
              <h2>Recent Activity</h2>
              <div className="activities-timeline">
                {dashboardData.recent_activities.slice(0, 5).map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon">
                      {activity.type === 'chat' && '💬'}
                      {activity.type === 'translation' && '🌍'}
                      {activity.type === 'quiz' && '🎯'}
                      {activity.type === 'pronunciation' && '🔊'}
                    </div>
                    <div className="activity-details">
                      <div className="activity-type">{activity.type}</div>
                      <div className="activity-time">{formatDate(activity.timestamp)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="quick-actions-section">
            <h2>Continue Learning</h2>
            <div className="quick-actions-grid">
              <a href="/chat" className="action-card chat-action">
                <div className="action-icon">💬</div>
                <h3>Practice Chat</h3>
                <p>Continue conversations in Kinyarwanda</p>
              </a>
              
              <a href="/quiz" className="action-card quiz-action">
                <div className="action-icon">🎯</div>
                <h3>Take Quiz</h3>
                <p>Test your knowledge</p>
              </a>
              
              <a href="/translate" className="action-card translate-action">
                <div className="action-icon">🌍</div>
                <h3>Translate Text</h3>
                <p>Practice with translations</p>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnerDashboard; 