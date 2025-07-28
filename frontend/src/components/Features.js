import React from 'react';
import './Features.css';

const Features = () => {
  return (
    <section className="features">
      <div className="features-container">
        <h2 className="section-title">Interactive Learning Features</h2>
        <p className="section-description">
          Twigane offers a unique learning experience with features designed to make learning Kinyarwanda fun and effective.
        </p>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon chat-icon">
              <span className="icon-emoji">💬</span>
            </div>
            <h3 className="feature-title">AI Chat Practice</h3>
            <p className="feature-description">
              Engage in real-time conversations with our AI tutor. Practice everyday scenarios, ask questions, and improve your conversational skills naturally.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon translation-icon">
              <span className="icon-emoji">🔄</span>
            </div>
            <h3 className="feature-title">Smart Translation</h3>
            <p className="feature-description">
              Translate text between Kinyarwanda and other languages instantly. Perfect for understanding new words and phrases during your learning journey.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon quiz-icon">
              <span className="icon-emoji">🧠</span>
            </div>
            <h3 className="feature-title">Interactive Quizzes</h3>
            <p className="feature-description">
              Test your knowledge with dynamic quizzes covering vocabulary, grammar, and comprehension. Track your progress and identify areas for improvement.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon text-to-speech-icon">
              <div className="speaker-icon">
                <div className="speaker-body"></div>
                <div className="speaker-cone"></div>
                <div className="sound-waves">
                  <div className="wave wave1"></div>
                  <div className="wave wave2"></div>
                  <div className="wave wave3"></div>
                </div>
              </div>
            </div>
            <h3 className="feature-title">Pronunciation Guide</h3>
            <p className="feature-description">
              Master authentic Kinyarwanda pronunciation with our text-to-speech feature. Hear native-like pronunciation for words, phrases, and sentences.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon dashboard-icon">
              <span className="icon-emoji">📊</span>
            </div>
            <h3 className="feature-title">Progress Dashboard</h3>
            <p className="feature-description">
              Monitor your learning journey with detailed analytics. View your achievements, track streaks, and celebrate milestones as you advance.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon text-generation-icon">
              <span className="icon-emoji">✍️</span>
            </div>
            <h3 className="feature-title">Text Generation</h3>
            <p className="feature-description">
              Generate creative content in Kinyarwanda. Practice writing skills by creating stories, conversations, and expressions with AI assistance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features; 