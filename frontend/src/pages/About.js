import React from 'react';
import './About.css';

const About = () => {
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
              We believe that language learning should be interactive, personalized, and fun. Our AI-powered 
              chatbot provides a natural conversation experience that helps learners practice and improve 
              their Kinyarwanda skills at their own pace.
            </p>
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