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
            <div className="feature-icon text-generation-icon">
              <span className="icon-letter">B</span>
            </div>
            <h3 className="feature-title">Text Generation</h3>
            <p className="feature-description">
              Practice forming sentences and expressing yourself in Kinyarwanda with our text generation feature.
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
            <h3 className="feature-title">Text-to-Speech</h3>
            <p className="feature-description">
              Hear how words and phrases are pronounced with our text-to-speech feature, helping you master the language's sounds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features; 