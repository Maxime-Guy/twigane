import React, { useState } from 'react';
import './Feedback.css';

const Feedback = () => {
  const [feedback, setFeedback] = useState({
    type: 'general',
    rating: '',
    subject: '',
    message: '',
    email: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedback(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', feedback);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFeedback({
        type: 'general',
        rating: '',
        subject: '',
        message: '',
        email: ''
      });
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="feedback-page">
        <div className="feedback-container">
          <div className="success-message">
            <div className="success-icon">✅</div>
            <h2>Thank you for your feedback!</h2>
            <p>We've received your message and will review it carefully. Your input helps us make Twigane better for everyone.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-page">
      <div className="feedback-container">
        <div className="feedback-header">
          <h1>Send Feedback</h1>
          <p>Help us improve Twigane with your thoughts and suggestions</p>
        </div>

        <div className="feedback-content">
          <div className="feedback-intro">
            <div className="intro-cards">
              <div className="intro-card">
                <div className="card-icon">💡</div>
                <h3>Suggestions</h3>
                <p>Share ideas for new features or improvements</p>
              </div>
              <div className="intro-card">
                <div className="card-icon">🐛</div>
                <h3>Bug Reports</h3>
                <p>Let us know about any issues you've encountered</p>
              </div>
              <div className="intro-card">
                <div className="card-icon">⭐</div>
                <h3>General Feedback</h3>
                <p>Tell us about your overall experience</p>
              </div>
            </div>
          </div>

          <form className="feedback-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="type">Feedback Type</label>
              <select
                id="type"
                name="type"
                value={feedback.type}
                onChange={handleInputChange}
                required
              >
                <option value="general">General Feedback</option>
                <option value="bug">Bug Report</option>
                <option value="feature">Feature Request</option>
                <option value="content">Content Issue</option>
                <option value="performance">Performance Issue</option>
                <option value="ui">User Interface</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="rating">How would you rate your experience? (Optional)</label>
              <div className="rating-options">
                {[1, 2, 3, 4, 5].map(num => (
                  <label key={num} className="rating-option">
                    <input
                      type="radio"
                      name="rating"
                      value={num}
                      checked={feedback.rating === num.toString()}
                      onChange={handleInputChange}
                    />
                    <span className="rating-star">{'⭐'.repeat(num)}</span>
                    <span className="rating-text">
                      {num === 1 && 'Poor'}
                      {num === 2 && 'Fair'}
                      {num === 3 && 'Good'}
                      {num === 4 && 'Very Good'}
                      {num === 5 && 'Excellent'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={feedback.subject}
                onChange={handleInputChange}
                placeholder="Brief description of your feedback"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={feedback.message}
                onChange={handleInputChange}
                placeholder="Please provide detailed feedback. For bug reports, include steps to reproduce the issue. For feature requests, explain how it would help your learning experience."
                rows="6"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email (Optional)</label>
              <input
                type="email"
                id="email"
                name="email"
                value={feedback.email}
                onChange={handleInputChange}
                placeholder="your@email.com - if you'd like us to respond"
              />
              <small>Only provide your email if you want a response. We won't use it for marketing.</small>
            </div>

            <button type="submit" className="submit-button">
              Send Feedback
            </button>
          </form>

          <div className="feedback-footer">
            <div className="alternative-contact">
              <h3>Other Ways to Reach Us</h3>
              <div className="contact-methods">
                <div className="contact-method">
                  <strong>📧 Email Support:</strong>
                  <span>support@twigane.com</span>
                </div>
                <div className="contact-method">
                  <strong>📚 Help Center:</strong>
                  <a href="/help-center">Visit our Help Center</a>
                </div>
                <div className="contact-method">
                  <strong>❓ FAQ:</strong>
                  <a href="/faq">Check Frequently Asked Questions</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback; 