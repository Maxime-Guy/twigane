import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { shouldShowLearnerFeatures } from '../utils/adminUtils';
import './Hero.css';

const Hero = () => {
  const { currentUser } = useAuth();
  const isLearner = shouldShowLearnerFeatures(currentUser);

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            {currentUser && isLearner ? (
              <>Continue Learning <span className="highlight">Kinyarwanda</span></>
            ) : (
              <>Learn <span className="highlight">Kinyarwanda</span> with AI</>
            )}
          </h1>
          <p className="hero-subtitle">
            {currentUser && isLearner ? (
              `Welcome back! Continue mastering Rwanda's beautiful language through interactive conversations with our AI-powered chatbot.`
            ) : (
              `Master Rwanda's beautiful language through interactive conversations with our AI-powered chatbot. Start your journey today!`
            )}
          </p>
          <div className="hero-actions">
            {currentUser && isLearner ? (
              <>
                <Link to="/dashboard" className="cta-button primary">
                  View Progress
                </Link>
                <Link to="/chat" className="cta-button secondary">
                  Continue Chat
                </Link>
                <Link to="/quiz" className="cta-button secondary">
                  Take Quiz
                </Link>
              </>
            ) : (
              <>
                <Link to="/chat" className="cta-button primary">
                  Start Learning
                </Link>
                <Link to="/translate" className="cta-button secondary">
                  Translate Text
                </Link>
                <Link to="/quiz" className="cta-button secondary">
                  Test Knowledge
                </Link>
              </>
            )}
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