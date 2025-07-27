import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Learn <span className="highlight">Kinyarwanda</span> with AI
          </h1>
          <p className="hero-subtitle">
            Master Rwanda's beautiful language through interactive conversations with our AI-powered chatbot. 
            Start your journey today!
          </p>
          <div className="hero-actions">
            <Link to="/chat" className="cta-button primary">
              Start Learning
            </Link>
            <Link to="/translate" className="cta-button secondary">
              Translate Text
            </Link>
            <Link to="/quiz" className="cta-button secondary">
              Test Knowledge
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="chatbot-illustration">
            <div className="chat-bubble user">
              <p>Muraho! How do I say "thank you"?</p>
            </div>
            <div className="chat-bubble bot">
              <p>Murakoze! That's how you say "thank you" in Kinyarwanda. 🇷🇼</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 