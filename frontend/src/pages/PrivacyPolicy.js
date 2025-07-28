import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <div className="privacy-header">
          <h1>Privacy Policy</h1>
          <p>Your privacy matters to us. Learn how we protect your information.</p>
          <div className="last-updated">
            <span>Last Updated: January 2025</span>
          </div>
        </div>

        <div className="privacy-content">
          <section className="privacy-section">
            <h2>🛡️ Your Privacy Rights</h2>
            <div className="rights-grid">
              <div className="right-item">
                <h3>Access Your Data</h3>
                <p>You can view and download your personal information at any time through your account settings.</p>
              </div>
              <div className="right-item">
                <h3>Delete Your Data</h3>
                <p>You can delete your account and all associated data permanently whenever you choose.</p>
              </div>
              <div className="right-item">
                <h3>Control Your Information</h3>
                <p>You decide what information to share and can update your preferences anytime.</p>
              </div>
            </div>
          </section>

          <section className="privacy-section">
            <h2>📊 What Information We Collect</h2>
            <div className="info-types">
              <div className="info-type">
                <h3>Account Information</h3>
                <ul>
                  <li>Email address (for login and communication)</li>
                  <li>Display name (optional)</li>
                  <li>Account preferences and settings</li>
                </ul>
              </div>
              <div className="info-type">
                <h3>Learning Data</h3>
                <ul>
                  <li>Quiz scores and progress</li>
                  <li>Chat interactions with our AI</li>
                  <li>Translation requests</li>
                  <li>Learning preferences and goals</li>
                </ul>
              </div>
              <div className="info-type">
                <h3>Technical Information</h3>
                <ul>
                  <li>Device type and browser information</li>
                  <li>Usage patterns and feature preferences</li>
                  <li>Error logs (to improve our service)</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="privacy-section">
            <h2>🎯 How We Use Your Information</h2>
            <div className="usage-list">
              <div className="usage-item">
                <h3>Personalized Learning</h3>
                <p>We use your learning data to customize your experience, recommend relevant content, and track your progress.</p>
              </div>
              <div className="usage-item">
                <h3>Service Improvement</h3>
                <p>We analyze usage patterns to improve our AI, fix bugs, and develop new features that benefit all users.</p>
              </div>
              <div className="usage-item">
                <h3>Communication</h3>
                <p>We may send you important updates about the service, new features, or educational content (you can opt out anytime).</p>
              </div>
            </div>
          </section>

          <section className="privacy-section">
            <h2>🔒 How We Protect Your Data</h2>
            <div className="protection-measures">
              <div className="measure">
                <h3>🔐 Encryption</h3>
                <p>All data is encrypted in transit and at rest using industry-standard security protocols.</p>
              </div>
              <div className="measure">
                <h3>🏦 Secure Storage</h3>
                <p>Your data is stored on secure servers with regular backups and monitoring.</p>
              </div>
              <div className="measure">
                <h3>👥 Limited Access</h3>
                <p>Only authorized team members can access user data, and only when necessary for service operation.</p>
              </div>
              <div className="measure">
                <h3>🔄 Regular Updates</h3>
                <p>We regularly update our security measures and conduct security audits.</p>
              </div>
            </div>
          </section>

          <section className="privacy-section">
            <h2>🤝 Data Sharing</h2>
            <div className="sharing-policy">
              <div className="sharing-item no-sharing">
                <h3>❌ We Do NOT Share</h3>
                <ul>
                  <li>Your personal information with third parties for marketing</li>
                  <li>Your chat conversations or learning data with anyone</li>
                  <li>Your email address with external companies</li>
                </ul>
              </div>
              <div className="sharing-item limited-sharing">
                <h3>⚠️ Limited Sharing Only When</h3>
                <ul>
                  <li>Required by law or legal process</li>
                  <li>Necessary to protect our users' safety</li>
                  <li>With service providers who help us operate (under strict agreements)</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="privacy-section">
            <h2>🍪 Cookies and Tracking</h2>
            <div className="cookies-info">
              <p>We use essential cookies to make our service work properly. These help us:</p>
              <ul>
                <li>Remember your login status</li>
                <li>Save your preferences</li>
                <li>Understand how our service is used (anonymously)</li>
              </ul>
              <p>You can control cookies through your browser settings, but some features may not work properly without them.</p>
            </div>
          </section>

          <section className="privacy-section">
            <h2>👶 Children's Privacy</h2>
            <div className="children-policy">
              <p>Twigane is designed for users 13 years and older. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us immediately.</p>
            </div>
          </section>

          <section className="privacy-section">
            <h2>📞 Contact Us</h2>
            <div className="contact-privacy">
              <p>If you have questions about this Privacy Policy or your data, please contact us:</p>
              <div className="contact-details">
                <p><strong>Email:</strong> privacy@twigane.com</p>
                <p><strong>Address:</strong> Twigane Privacy Team, African Leadership University, Rwanda</p>
              </div>
            </div>
          </section>

          <section className="privacy-section">
            <h2>🔄 Policy Updates</h2>
            <div className="updates-policy">
              <p>We may update this Privacy Policy occasionally. When we do, we'll notify you by email and update the "Last Updated" date. Continued use of Twigane after changes means you accept the new policy.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 