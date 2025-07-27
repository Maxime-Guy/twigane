import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import './Settings.css';

const Settings = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('account');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      progress: true,
      achievements: true,
      reminders: false
    },
    privacy: {
      profileVisible: true,
      progressVisible: false,
      analyticsOptOut: false
    },
    preferences: {
      language: 'en',
      theme: 'light',
      autoPlay: true,
      soundEffects: true
    }
  });

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmText === 'DELETE') {
      // Handle account deletion
      alert('Account deletion functionality would be implemented here.');
      setShowDeleteConfirm(false);
      setDeleteConfirmText('');
    }
  };

  const handleExportData = () => {
    // Handle data export
    alert('Data export functionality would be implemented here.');
  };

  if (!currentUser) {
    return (
      <div className="settings-page">
        <div className="auth-required">
          <h2>Authentication Required</h2>
          <p>Please sign in to access your settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="settings-header">
          <h1>Settings</h1>
          <p>Manage your account and preferences</p>
        </div>

        <div className="settings-content">
          <div className="settings-sidebar">
            <div className="settings-tabs">
              <button 
                className={`tab-button ${activeTab === 'account' ? 'active' : ''}`}
                onClick={() => setActiveTab('account')}
              >
                <span className="tab-icon">👤</span>
                Account
              </button>
              <button 
                className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('notifications')}
              >
                <span className="tab-icon">🔔</span>
                Notifications
              </button>
              <button 
                className={`tab-button ${activeTab === 'privacy' ? 'active' : ''}`}
                onClick={() => setActiveTab('privacy')}
              >
                <span className="tab-icon">🔒</span>
                Privacy
              </button>
              <button 
                className={`tab-button ${activeTab === 'preferences' ? 'active' : ''}`}
                onClick={() => setActiveTab('preferences')}
              >
                <span className="tab-icon">⚙️</span>
                Preferences
              </button>
              <button 
                className={`tab-button ${activeTab === 'data' ? 'active' : ''}`}
                onClick={() => setActiveTab('data')}
              >
                <span className="tab-icon">📊</span>
                Data & Privacy
              </button>
            </div>
          </div>

          <div className="settings-main">
            {activeTab === 'account' && (
              <div className="settings-section">
                <h2>Account Information</h2>
                
                <div className="account-info">
                  <div className="info-item">
                    <label>Email</label>
                    <div className="info-value">{currentUser.email}</div>
                  </div>
                  <div className="info-item">
                    <label>Display Name</label>
                    <div className="info-value">{currentUser.displayName || 'Not set'}</div>
                  </div>
                  <div className="info-item">
                    <label>Account Created</label>
                    <div className="info-value">
                      {currentUser.metadata?.creationTime ? 
                        new Date(currentUser.metadata.creationTime).toLocaleDateString() : 
                        'Unknown'
                      }
                    </div>
                  </div>
                  <div className="info-item">
                    <label>Last Sign In</label>
                    <div className="info-value">
                      {currentUser.metadata?.lastSignInTime ? 
                        new Date(currentUser.metadata.lastSignInTime).toLocaleDateString() : 
                        'Unknown'
                      }
                    </div>
                  </div>
                </div>

                <div className="account-actions">
                  <button className="action-button secondary">
                    Update Profile
                  </button>
                  <button className="action-button secondary">
                    Change Password
                  </button>
                  <button className="action-button" onClick={logout}>
                    Sign Out
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="settings-section">
                <h2>Notification Preferences</h2>
                <p>Choose what notifications you'd like to receive</p>
                
                <div className="settings-group">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Email Notifications</h3>
                      <p>Receive updates and news via email</p>
                    </div>
                    <label className="toggle">
                      <input 
                        type="checkbox" 
                        checked={settings.notifications.email}
                        onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Progress Updates</h3>
                      <p>Get notified about your learning progress</p>
                    </div>
                    <label className="toggle">
                      <input 
                        type="checkbox" 
                        checked={settings.notifications.progress}
                        onChange={(e) => handleSettingChange('notifications', 'progress', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Achievement Notifications</h3>
                      <p>Celebrate your achievements with notifications</p>
                    </div>
                    <label className="toggle">
                      <input 
                        type="checkbox" 
                        checked={settings.notifications.achievements}
                        onChange={(e) => handleSettingChange('notifications', 'achievements', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Learning Reminders</h3>
                      <p>Get reminded to practice regularly</p>
                    </div>
                    <label className="toggle">
                      <input 
                        type="checkbox" 
                        checked={settings.notifications.reminders}
                        onChange={(e) => handleSettingChange('notifications', 'reminders', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="settings-section">
                <h2>Privacy Settings</h2>
                <p>Control how your information is shared and used</p>
                
                <div className="settings-group">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Profile Visibility</h3>
                      <p>Make your profile visible to other learners</p>
                    </div>
                    <label className="toggle">
                      <input 
                        type="checkbox" 
                        checked={settings.privacy.profileVisible}
                        onChange={(e) => handleSettingChange('privacy', 'profileVisible', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Progress Sharing</h3>
                      <p>Allow others to see your learning progress</p>
                    </div>
                    <label className="toggle">
                      <input 
                        type="checkbox" 
                        checked={settings.privacy.progressVisible}
                        onChange={(e) => handleSettingChange('privacy', 'progressVisible', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Analytics Opt-out</h3>
                      <p>Opt out of usage analytics and tracking</p>
                    </div>
                    <label className="toggle">
                      <input 
                        type="checkbox" 
                        checked={settings.privacy.analyticsOptOut}
                        onChange={(e) => handleSettingChange('privacy', 'analyticsOptOut', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="settings-section">
                <h2>App Preferences</h2>
                <p>Customize your learning experience</p>
                
                <div className="settings-group">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Interface Language</h3>
                      <p>Choose your preferred interface language</p>
                    </div>
                    <select 
                      value={settings.preferences.language}
                      onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
                      className="setting-select"
                    >
                      <option value="en">English</option>
                      <option value="rw">Kinyarwanda</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Theme</h3>
                      <p>Choose your preferred color theme</p>
                    </div>
                    <select 
                      value={settings.preferences.theme}
                      onChange={(e) => handleSettingChange('preferences', 'theme', e.target.value)}
                      className="setting-select"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Auto-play Audio</h3>
                      <p>Automatically play pronunciation audio</p>
                    </div>
                    <label className="toggle">
                      <input 
                        type="checkbox" 
                        checked={settings.preferences.autoPlay}
                        onChange={(e) => handleSettingChange('preferences', 'autoPlay', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Sound Effects</h3>
                      <p>Enable sound effects for interactions</p>
                    </div>
                    <label className="toggle">
                      <input 
                        type="checkbox" 
                        checked={settings.preferences.soundEffects}
                        onChange={(e) => handleSettingChange('preferences', 'soundEffects', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'data' && (
              <div className="settings-section">
                <h2>Data & Privacy</h2>
                <p>Manage your data and account</p>
                
                <div className="data-section">
                  <h3>Export Your Data</h3>
                  <p>Download a copy of your learning data, progress, and account information.</p>
                  <button className="action-button secondary" onClick={handleExportData}>
                    Export Data
                  </button>
                </div>

                <div className="data-section danger-zone">
                  <h3>Danger Zone</h3>
                  <p>These actions are irreversible. Please be certain.</p>
                  
                  <div className="danger-actions">
                    <div className="danger-item">
                      <div className="danger-info">
                        <h4>Delete Account</h4>
                        <p>Permanently delete your account and all associated data. This cannot be undone.</p>
                      </div>
                      <button 
                        className="action-button danger"
                        onClick={() => setShowDeleteConfirm(true)}
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>

                {showDeleteConfirm && (
                  <div className="modal-overlay">
                    <div className="modal-content">
                      <h3>Delete Account</h3>
                      <p>
                        This will permanently delete your account and all associated data including:
                      </p>
                      <ul>
                        <li>Learning progress and statistics</li>
                        <li>Quiz results and achievements</li>
                        <li>Chat history</li>
                        <li>Account preferences</li>
                      </ul>
                      
                      <p><strong>This action cannot be undone.</strong></p>
                      
                      <div className="confirm-section">
                        <label htmlFor="confirm-delete">
                          Type "DELETE" to confirm:
                        </label>
                        <input
                          id="confirm-delete"
                          type="text"
                          value={deleteConfirmText}
                          onChange={(e) => setDeleteConfirmText(e.target.value)}
                          placeholder="DELETE"
                        />
                      </div>
                      
                      <div className="modal-actions">
                        <button 
                          className="action-button secondary"
                          onClick={() => {
                            setShowDeleteConfirm(false);
                            setDeleteConfirmText('');
                          }}
                        >
                          Cancel
                        </button>
                        <button 
                          className="action-button danger"
                          onClick={handleDeleteAccount}
                          disabled={deleteConfirmText !== 'DELETE'}
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 