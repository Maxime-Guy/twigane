import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import analyticsService from '../services/analyticsService';
import './Translate.css';

const Translate = () => {
  const { currentUser } = useAuth();
  
  // State management
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [languageDirection, setLanguageDirection] = useState('en-rw'); // en-rw or rw-en
  const [translationHistory, setTranslationHistory] = useState([]);

  // API configuration
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

  // Handle text translation
  const handleTranslation = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to translate');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_URL}/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text: inputText.trim(),
          direction: languageDirection,
          user_email: currentUser?.email
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const translatedResult = data.translated_text || data.response;
        setTranslatedText(translatedResult);
        
        // Add to history
        const newTranslation = {
          id: Date.now(),
          original: inputText.trim(),
          translated: translatedResult,
          direction: languageDirection,
          timestamp: new Date().toLocaleString()
        };
        setTranslationHistory(prev => [newTranslation, ...prev.slice(0, 4)]);

        // Track translation activity in Firebase
        if (currentUser?.email) {
          try {
            await analyticsService.trackUserActivity(
              currentUser.email,
              'translation',
              {
                original_text: inputText.trim().substring(0, 100), // Limit length
                translated_text: translatedResult.substring(0, 100),
                direction: languageDirection,
                word_count: inputText.trim().split(' ').length
              }
            );
          } catch (analyticsError) {
            console.warn('Analytics tracking failed:', analyticsError);
          }
        }
      } else {
        setError(data.error || 'Translation failed');
      }
    } catch (err) {
      setError('Failed to connect to translation service');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleTranslation();
    }
  };

  // Swap languages
  const swapLanguages = () => {
    const newDirection = languageDirection === 'en-rw' ? 'rw-en' : 'en-rw';
    setLanguageDirection(newDirection);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  // Clear all
  const clearAll = () => {
    setInputText('');
    setTranslatedText('');
    setError('');
  };

  // Copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // Add visual feedback here if needed
    });
  };

  // Set sample text
  const setSampleText = (text) => {
    setInputText(text);
    setTranslatedText('');
    setError('');
  };

  // Quick sample phrases with icons
  const quickSamples = [
    { icon: "👋", text: "Hello, how are you today?", category: "Greetings" },
    { icon: "❤️", text: "I love learning new languages.", category: "Learning" },
    { icon: "🌤️", text: "The weather is beautiful today.", category: "Weather" },
    { icon: "📚", text: "Can you help me with my homework?", category: "Education" },
    { icon: "🎯", text: "Education is the key to success.", category: "Motivation" },
    { icon: "🏠", text: "Welcome to my home.", category: "Home" },
    { icon: "🍽️", text: "Would you like something to eat?", category: "Food" },
    { icon: "💼", text: "What do you do for work?", category: "Work" }
  ];

  if (!currentUser) {
    return (
      <div className="modern-translate-page">
        <div className="auth-required-modern">
          <div className="auth-icon">🔐</div>
          <h2>Sign In Required</h2>
          <p>Please sign in to access the translation feature.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modern-translate-page">
      {/* Top Navigation */}
      <div className="translate-navbar">
        <div className="navbar-content">
          <h1 className="navbar-title">
            <span className="translate-icon">🌍</span>
            Translate English ↔ Kinyarwanda
          </h1>
          <div className="navbar-actions">
            <button 
              className="language-swap-btn"
              onClick={swapLanguages}
              title="Swap languages"
            >
              <span className="swap-icon">↔</span>
            </button>
            <button 
              className="clear-all-btn"
              onClick={clearAll}
              disabled={!inputText && !translatedText}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Main Translation Container */}
      <div className="translate-main">
        {/* Language Headers */}
        <div className="language-headers">
          <div className="language-header">
            <span className="flag-icon">🇺🇸</span>
            <span className="language-name">
              {languageDirection === 'en-rw' ? 'English' : 'Kinyarwanda'}
            </span>
          </div>
          <div className="language-divider"></div>
          <div className="language-header">
            <span className="flag-icon">🇷🇼</span>
            <span className="language-name">
              {languageDirection === 'en-rw' ? 'Kinyarwanda' : 'English'}
            </span>
          </div>
        </div>

        {/* Translation Interface */}
        <div className="translation-columns">
          {/* Input Column */}
          <div className="input-column">
            <div className="text-area-container">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  languageDirection === 'en-rw' 
                    ? "Enter English text here..." 
                    : "Andika ikinyarwanda hano..."
                }
                className="modern-textarea input-textarea"
                disabled={isLoading}
              />
              <div className="textarea-footer">
                <div className="char-count">
                  {inputText.length} characters
                </div>
                {inputText && (
                  <button
                    className="clear-input-btn"
                    onClick={() => setInputText('')}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Output Column */}
          <div className="output-column">
            <div className="text-area-container">
              <div className="modern-textarea output-textarea">
                {isLoading ? (
                  <div className="loading-container">
                    <div className="loading-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <p>Translating...</p>
                  </div>
                ) : translatedText ? (
                  <div className="translated-content">
                    {translatedText}
                  </div>
                ) : (
                  <div className="placeholder-content">
                    <span className="placeholder-icon">📝</span>
                    <p>Translation will appear here</p>
                  </div>
                )}
              </div>
              <div className="textarea-footer">
                <div className="char-count">
                  {translatedText.length} characters
                </div>
                {translatedText && (
                  <button
                    className="copy-btn-modern"
                    onClick={() => copyToClipboard(translatedText)}
                    title="Copy translation"
                  >
                    📋
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Translate Button */}
        <div className="translate-button-container">
          <button
            className="translate-fab"
            onClick={handleTranslation}
            disabled={!inputText.trim() || isLoading}
          >
            {isLoading ? (
              <span className="fab-loading">⏳</span>
            ) : (
              <span className="fab-icon">→</span>
            )}
          </button>
          <div className="translate-hint">
            Press Ctrl+Enter to translate
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-banner">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
            <button onClick={() => setError('')} className="error-close">✕</button>
          </div>
        )}
      </div>

      {/* Quick Samples */}
      <div className="quick-samples-section">
        <h3 className="samples-title">Quick Samples</h3>
        <div className="samples-scroll">
          {quickSamples.map((sample, index) => (
            <button
              key={index}
              className="sample-card"
              onClick={() => setSampleText(sample.text)}
              disabled={isLoading}
            >
              <span className="sample-icon">{sample.icon}</span>
              <div className="sample-content">
                <div className="sample-text">{sample.text}</div>
                <div className="sample-category">{sample.category}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Translation History */}
      {translationHistory.length > 0 && (
        <div className="history-section">
          <h3 className="history-title">Recent Translations</h3>
          <div className="history-grid">
            {translationHistory.map((item) => (
              <div key={item.id} className="history-card">
                <div className="history-direction">
                  {item.direction === 'en-rw' ? '🇺🇸 → 🇷🇼' : '🇷🇼 → 🇺🇸'}
                </div>
                <div className="history-text">
                  <div className="history-original">
                    {item.original.length > 60 
                      ? item.original.substring(0, 60) + '...' 
                      : item.original}
                  </div>
                  <div className="history-translated">
                    {item.translated.length > 60 
                      ? item.translated.substring(0, 60) + '...' 
                      : item.translated}
                  </div>
                </div>
                <div className="history-time">{item.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Translate; 