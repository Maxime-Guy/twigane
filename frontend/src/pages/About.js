import React, { useState } from 'react';
import './About.css';

const About = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Twigane Contact: ${formData.subject} - ${formData.name}`);
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
Sent from Twigane Contact Form
    `);
    
    const mailtoLink = `mailto:guymaximebakunzi@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    alert('Your email client will open with your message. Please send the email to complete your inquiry.');
  };

  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-hero">
          <h1>About Twigane</h1>
          <p className="about-subtitle">
            Your AI-powered companion for learning Kinyarwanda
          </p>
        </div>

        <div className="about-content">
          <div className="about-section">
            <h2>Our Mission</h2>
            <p>
              Twigane aims to make learning Kinyarwanda accessible, engaging, and effective for everyone. 
              We believe that language learning should be interactive, personalized, and fun. Our comprehensive 
              platform offers multiple interactive features including AI-powered conversations, smart translation 
              tools, interactive quizzes, pronunciation guides, and progress tracking to help learners master 
              Kinyarwanda skills at their own pace.
            </p>
          </div>

          <div className="about-section">
            <h2>About the Founder</h2>
            <p>
              Twigane was created by <strong>Maxime Guy Bakunzi</strong>, a passionate developer and founder 
              dedicated to promoting Kinyarwanda language learning through innovative technology. With a vision 
              to bridge cultural gaps and make language learning accessible to everyone, Maxime has built 
              Twigane as a comprehensive learning platform that goes beyond traditional methods.
            </p>
            <div className="founder-contact">
              <p><strong>Contact the Founder:</strong> <a href="mailto:guymaximebakunzi@gmail.com">guymaximebakunzi@gmail.com</a></p>
            </div>
          </div>

          <div className="about-section">
            <h2>Why Learn Kinyarwanda?</h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">🇷🇼</div>
                <h3>Cultural Connection</h3>
                <p>Connect with Rwandan culture and heritage through its beautiful language.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🌍</div>
                <h3>Global Community</h3>
                <p>Join millions of Kinyarwanda speakers across Rwanda and the diaspora.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">💼</div>
                <h3>Career Opportunities</h3>
                <p>Enhance your professional prospects in Rwanda and East Africa.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🎓</div>
                <h3>Academic Excellence</h3>
                <p>Access educational resources and opportunities in Rwanda.</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>How Twigane Works</h2>
            <div className="steps-container">
              <div className="step">
                <div className="step-number">1</div>
                <h3>Start Chatting</h3>
                <p>Begin conversations with our AI assistant in Kinyarwanda or English.</p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <h3>Practice & Learn</h3>
                <p>Engage in meaningful conversations that help you practice grammar and vocabulary.</p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <h3>Listen & Repeat</h3>
                <p>Use our text-to-speech feature to improve pronunciation and listening skills.</p>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <h3>Progress Tracking</h3>
                <p>Monitor your learning progress and celebrate your achievements.</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>Technology Behind Twigane</h2>
            <p>
              Twigane is powered by advanced AI technology, including natural language processing 
              and machine learning models specifically trained on Kinyarwanda language data. 
              Our system uses:
            </p>
            <ul className="tech-list">
              <li>BART (Bidirectional and Auto-Regressive Transformers) for conversation generation</li>
              <li>Custom Kinyarwanda language models for accurate responses</li>
              <li>Text-to-speech synthesis for pronunciation practice</li>
              <li>Responsive web design for seamless user experience</li>
            </ul>
          </div>

          <div className="about-section contact-section">
            <h2>Contact Us</h2>
            <p>Have questions or feedback? We'd love to hear from you!</p>
            
            <div className="contact-content">
              <div className="contact-info">
                <div className="contact-methods">
                  <div className="contact-method">
                    <div className="contact-icon">📧</div>
                    <div className="contact-details">
                      <h3>Email</h3>
                      <p>guymaximebakunzi@gmail.com</p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <div className="contact-icon">🌐</div>
                    <div className="contact-details">
                      <h3>Website</h3>
                      <p>https://twigane.netlify.app/</p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <div className="contact-icon">📱</div>
                    <div className="contact-details">
                      <h3>Support</h3>
                      <p>Available 24/7 through our chat system</p>
                    </div>
                  </div>
                </div>

                <div className="faq-section">
                  <h3>Quick Questions?</h3>
                  <div className="faq-item">
                    <strong>Q: Is Twigane free to use?</strong>
                    <p>Yes! Twigane is completely free for all users.</p>
                  </div>
                  <div className="faq-item">
                    <strong>Q: Do I need to create an account?</strong>
                    <p>You can start using Twigane immediately, but creating an account unlocks progress tracking and personalized features.</p>
                  </div>
                  <div className="faq-item">
                    <strong>Q: Can I use Twigane offline?</strong>
                    <p>Currently, Twigane requires an internet connection to function.</p>
                  </div>
                </div>
              </div>

              <div className="contact-form-container">
                <h3>Send us a Message</h3>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="bug">Bug Report</option>
                      <option value="feature">Feature Request</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="submit-button">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="about-section cta-section">
            <h2>Ready to Start Learning?</h2>
            <p>Join thousands of learners who are already improving their Kinyarwanda skills with Twigane.</p>
            <button className="cta-button" onClick={() => window.location.href = '/chat'}>
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 