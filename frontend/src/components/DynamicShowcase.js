import React, { useState, useEffect } from 'react';
import './DynamicShowcase.css';

const DynamicShowcase = () => {
  const [activeVocabIndex, setActiveVocabIndex] = useState(0);
  const [currentDemo, setCurrentDemo] = useState(0);

  const vocabularyWords = [
    { kinyarwanda: 'Mwaramutse', english: 'Good morning', pronunciation: 'mwa-ra-mu-tse' },
    { kinyarwanda: 'Murakoze', english: 'Thank you', pronunciation: 'mu-ra-ko-ze' },
    { kinyarwanda: 'Umuryango', english: 'Family', pronunciation: 'u-mu-ryan-go' },
    { kinyarwanda: 'Ubwiyunge', english: 'Patience', pronunciation: 'u-bwi-yu-nge' },
    { kinyarwanda: 'Gukunda', english: 'To love', pronunciation: 'gu-kun-da' },
    { kinyarwanda: 'Ubwoba', english: 'Fear', pronunciation: 'u-bwo-ba' },
    { kinyarwanda: 'Kwiga', english: 'To learn', pronunciation: 'kwi-ga' },
    { kinyarwanda: 'Ubushake', english: 'Willingness', pronunciation: 'u-bu-sha-ke' }
  ];

  const chatDemos = [
    {
      user: "Hello! How do I say 'I love you' in Kinyarwanda?",
      bot: "Ndagukunda! That's how you say 'I love you' in Kinyarwanda. 💕",
      pronunciation: "n-da-gu-kun-da"
    },
    {
      user: "What's the word for 'beautiful' in Kinyarwanda?",
      bot: "Mwiza! It means 'beautiful' or 'good'. Try saying 'Ni mwiza' (It's beautiful)!",
      pronunciation: "mwi-za"
    },
    {
      user: "How do I greet someone in the evening?",
      bot: "Mwiriwe! This is how you greet someone in the evening. 🌙",
      pronunciation: "mwi-ri-we"
    }
  ];

  // Rotate vocabulary words
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVocabIndex(prev => (prev + 1) % vocabularyWords.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [vocabularyWords.length]);

  // Rotate chat demos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDemo(prev => (prev + 1) % chatDemos.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [chatDemos.length]);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'rw';
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <section className="dynamic-showcase">
      <div className="showcase-container">
        <div className="showcase-header">
          <h2>Learning Kinyarwanda Made Simple</h2>
          <p>Join thousands of learners discovering the beauty of Rwanda's language</p>
        </div>

        <div className="showcase-content">
          {/* Interactive Vocabulary */}
          <div className="vocabulary-section">
            <h3>Word of the Moment</h3>
            <div className="vocab-card">
              <div className="vocab-kinyarwanda">
                {vocabularyWords[activeVocabIndex].kinyarwanda}
                <button 
                  className="vocab-speak-btn"
                  onClick={() => speak(vocabularyWords[activeVocabIndex].kinyarwanda)}
                >
                  🔊
                </button>
              </div>
              <div className="vocab-english">
                {vocabularyWords[activeVocabIndex].english}
              </div>
              <div className="vocab-pronunciation">
                /{vocabularyWords[activeVocabIndex].pronunciation}/
              </div>
            </div>
            <div className="vocab-indicators">
              {vocabularyWords.map((_, index) => (
                <div
                  key={index}
                  className={`vocab-indicator ${index === activeVocabIndex ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>

          {/* Live Chat Demo */}
          <div className="chat-demo-section">
            <h3>See Twigane in Action</h3>
            <div className="demo-chat">
              <div className="demo-message user">
                <div className="message-bubble">
                  {chatDemos[currentDemo].user}
                </div>
              </div>
              <div className="demo-message bot">
                <div className="message-bubble">
                  {chatDemos[currentDemo].bot}
                  <button 
                    className="demo-speak-btn"
                    onClick={() => speak(chatDemos[currentDemo].bot.split('!')[0])}
                  >
                    🔊
                  </button>
                </div>
                <div className="pronunciation-guide">
                  /{chatDemos[currentDemo].pronunciation}/
                </div>
              </div>
            </div>
            <div className="demo-indicators">
              {chatDemos.map((_, index) => (
                <div
                  key={index}
                  className={`demo-indicator ${index === currentDemo ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Features */}
        <div className="interactive-features">
          <div className="feature-highlight">
            <div className="feature-icon">🎯</div>
            <h4>Personalized Learning</h4>
            <p>AI adapts to your learning pace and style</p>
          </div>
          <div className="feature-highlight">
            <div className="feature-icon">🗣️</div>
            <h4>Pronunciation Practice</h4>
            <p>Perfect your accent with voice feedback</p>
          </div>
          <div className="feature-highlight">
            <div className="feature-icon">📱</div>
            <h4>Learn Anywhere</h4>
            <p>Web, mobile, or your choice</p>
          </div>
          <div className="feature-highlight">
            <div className="feature-icon">🏆</div>
            <h4>Track Progress</h4>
            <p>See your improvement in real-time</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicShowcase; 