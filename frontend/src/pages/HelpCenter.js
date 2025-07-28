import React from 'react';
import './HelpCenter.css';

const HelpCenter = () => {
  return (
    <div className="help-center-page">
      <div className="help-container">
        <div className="help-header">
          <h1>Help Center</h1>
          <p>Get the help you need to make the most of Twigane</p>
        </div>

        <div className="help-content">
          <section className="help-section">
            <h2>Getting Started</h2>
            <div className="help-cards">
              <div className="help-card">
                <h3>🚀 First Steps</h3>
                <p>Create your account and start your Kinyarwanda learning journey with our interactive chatbot.</p>
              </div>
              <div className="help-card">
                <h3>💬 Using the Chat</h3>
                <p>Ask questions in English or Kinyarwanda. Our AI will help you learn vocabulary, grammar, and pronunciation.</p>
              </div>
              <div className="help-card">
                <h3>🔄 Translation Tool</h3>
                <p>Translate text between Kinyarwanda and English instantly. Perfect for understanding new words.</p>
              </div>
            </div>
          </section>

          <section className="help-section">
            <h2>Features Guide</h2>
            <div className="help-cards">
              <div className="help-card">
                <h3>📝 Quiz System</h3>
                <p>Test your knowledge with interactive quizzes. Track your progress and improve your skills.</p>
              </div>
              <div className="help-card">
                <h3>🔊 Pronunciation</h3>
                <p>Listen to correct pronunciation of Kinyarwanda words to improve your speaking skills.</p>
              </div>
              <div className="help-card">
                <h3>📊 Dashboard</h3>
                <p>View your learning progress, quiz scores, and personalized recommendations.</p>
              </div>
            </div>
          </section>

          <section className="help-section">
            <h2>Common Issues</h2>
            <div className="help-faq">
              <div className="faq-item">
                <h4>Audio not working?</h4>
                <p>Check your device volume and browser permissions. Refresh the page if the issue persists.</p>
              </div>
              <div className="faq-item">
                <h4>Can't log in?</h4>
                <p>Ensure you're using the correct email address. Try resetting your password if needed.</p>
              </div>
              <div className="faq-item">
                <h4>Translation seems incorrect?</h4>
                <p>Our AI is continuously learning. Report any issues through our feedback form to help us improve.</p>
              </div>
            </div>
          </section>

          <section className="help-section">
            <h2>Contact Support</h2>
            <div className="contact-info">
              <p>Still need help? We're here to assist you!</p>
              <div className="contact-methods">
                <div className="contact-method">
                  <h4>📧 Email Support</h4>
                  <p>Send us an email at <strong>support@twigane.com</strong></p>
                </div>
                <div className="contact-method">
                  <h4>💬 Live Chat</h4>
                  <p>Use our chatbot for immediate assistance with basic questions</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter; 