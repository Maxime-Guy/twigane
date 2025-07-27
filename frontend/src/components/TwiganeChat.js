import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './TwiganeChat.css';

const TwiganeChat = () => {
  const { currentUser } = useAuth();

  // Chat state
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Muraho! I'm your Kinyarwanda teacher. Ask me questions or request pronunciation help!",
      sender: 'bot',
      type: 'greeting'
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState({ connected: false, teachingModel: false, ttsSystem: false });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showLearningTools, setShowLearningTools] = useState(false);
  const audioRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Backend API URL
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

  const checkBackendStatus = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/health`);
      if (response.ok) {
        const data = await response.json();
        setBackendStatus({
          connected: true,
          teachingModel: data.teaching_model,
          ttsSystem: data.tts_system,
          availableWords: data.available_words
        });
      } else {
        setBackendStatus({ connected: false, teachingModel: false, ttsSystem: false });
      }
    } catch (error) {
      console.error('Backend connection error:', error);
      setBackendStatus({ connected: false, teachingModel: false, ttsSystem: false });
    }
  }, [API_URL]);

  // Check backend status on component mount
  useEffect(() => {
    checkBackendStatus();
  }, [checkBackendStatus]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (currentUser) {
      scrollToBottom();
    }
  }, [messages, currentUser]);

  // Auto-focus input when user logs in
  useEffect(() => {
    if (currentUser && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 500);
    }
  }, [currentUser]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const playAudio = async (audioPath) => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      const filename = audioPath.split('/').pop();
      const audioUrl = `${API_URL}/audio/${filename}`;
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      await audio.play();
      
      addMessage({
        text: `🎵 Playing audio for pronunciation...`,
        sender: 'bot',
        type: 'audio-status'
      });
      
    } catch (error) {
      console.error('Audio playback error:', error);
      addMessage({
        text: `❌ Sorry, I couldn't play the audio. Please try again.`,
        sender: 'bot',
        type: 'error'
      });
    }
  };

  const addMessage = (message) => {
    const newMessage = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      ...message
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;
    
    const userMessage = inputText.trim();
    setInputText('');
    setIsLoading(true);

    addMessage({
      text: userMessage,
      sender: 'user',
      type: 'question'
    });

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userMessage })
      });

      if (response.ok) {
        const data = await response.json();
        
        const botMessage = {
          text: data.response,
          sender: 'bot',
          type: data.type || 'teaching',
          category: data.category,
          difficulty: data.difficulty,
          confidence: data.confidence
        };

        addMessage(botMessage);

        if (data.type === 'pronunciation' && data.audio_path) {
          addMessage({
            text: `🎵 Click to hear "${data.word}" pronounced:`,
            sender: 'bot',
            type: 'audio-button',
            audioPath: data.audio_path,
            word: data.word,
            enhancedPronunciation: data.enhanced_pronunciation,
            duration: data.duration
          });
        }
        
      } else {
        addMessage({
          text: `❌ Sorry, I'm having trouble connecting to the server. Please try again.`,
          sender: 'bot',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Chat error:', error);
      addMessage({
        text: `❌ Network error. Please check your connection and try again.`,
        sender: 'bot',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const setQuickQuestion = (question) => {
    setInputText(question);
    // Focus the input after setting the question
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        // Move cursor to end
        inputRef.current.setSelectionRange(question.length, question.length);
      }
    }, 100);
  };

  const quickQuestions = [
    // Conversation/Greetings - from dataset
    "How do you say 'Good morning' in Kinyarwanda?",
    "How do you greet someone you haven't seen for a long time?",
    
    // Vocabulary - from dataset
    "What does Amakuru mean?",
    "How do you say 'Yes' and 'No' in Kinyarwanda?",
    
    // Grammar - from dataset
    "Explain Class 1 noun prefixes in Kinyarwanda",
    "How do possessive adjectives work in Kinyarwanda?",
    
    // Pronunciation - will trigger TTS system
    'How does "Muraho" sound?',
    'Can you pronounce "Mwaramutse"?',
    
    // Numbers - from dataset
    "Count from 1 to 10 in Kinyarwanda",
    "How do you say 'three books' in Kinyarwanda?",
    
    // Family/People - from dataset
    "What is the singular and plural of 'child' in Kinyarwanda?",
    "How do you say 'my child' in Kinyarwanda?",
    
    // Translation - will trigger translation model
    "Translate to Kinyarwanda: The man is working",
    "How do you say 'I want water' in Kinyarwanda?",
    
    // Culture - from dataset
    "What is a common Kinyarwanda proverb about patience?",
    "How do you show respect in Kinyarwanda?",
    
    // Daily phrases - from dataset
    "How do you say 'Thank you very much' in Kinyarwanda?",
    "What does 'Murakoze cyane' mean?"
  ];

  const learningTools = [
    { icon: "🔊", label: "Pronunciation", action: () => setQuickQuestion('How does "Murakoze" sound?') },
    { icon: "📚", label: "Grammar", action: () => setQuickQuestion("Explain Class 2 noun prefixes in Kinyarwanda") },
    { icon: "💬", label: "Phrases", action: () => setQuickQuestion("How do you say 'I like to read books' in Kinyarwanda?") },
    { icon: "🔤", label: "Vocabulary", action: () => setQuickQuestion("What is the singular and plural of 'teacher' in Kinyarwanda?") },
    { icon: "🎯", label: "Quiz", action: () => setQuickQuestion("Fill in the blank: '___ arakora.' (He is working)") },
  ];

  const renderMessage = (message) => {
    const isUser = message.sender === 'user';
    const isWelcome = message.isWelcome;
    
    return (
      <div key={message.id} className={`message ${isUser ? 'user' : 'bot'}`}>
        <div className={`message-bubble ${isWelcome ? 'welcome' : ''}`}>
          <div className="message-text">{message.text}</div>
          
          {message.type === 'audio-button' && (
            <div className="audio-controls">
              <button 
                className="audio-play-btn"
                onClick={() => playAudio(message.audioPath)}
              >
                🎵 Play Audio ({message.duration?.toFixed(1)}s)
              </button>
              <div className="pronunciation-info">
                <small>Enhanced: {message.enhancedPronunciation}</small>
              </div>
            </div>
          )}
          
          {message.category && (
            <div className="message-meta">
              <span className="category">{message.category}</span>
              {message.difficulty && (
                <span className="difficulty">{message.difficulty}</span>
              )}
              {message.confidence && (
                <span className="confidence">
                  {(message.confidence * 100).toFixed(0)}% match
                </span>
              )}
            </div>
          )}
          
          <div className="message-time">{message.timestamp}</div>
        </div>
      </div>
    );
  };

  // Show authentication required message if not logged in
  if (!currentUser) {
    return (
      <div className="modern-chat-container">
        <div className="auth-required">
          <div className="auth-content">
            <div className="auth-icon">🇷🇼</div>
            <h2>Welcome to Twigane</h2>
            <p>Sign in to start learning Kinyarwanda with your AI teacher!</p>
            <div className="auth-features">
              <div className="feature">
                <span className="feature-icon">💬</span>
                <span>Interactive conversations</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🔊</span>
                <span>Pronunciation help</span>
              </div>
              <div className="feature">
                <span className="feature-icon">📚</span>
                <span>Grammar lessons</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main modern chat UI
  return (
    <div className="modern-chat-container">
      {/* Minimal Header */}
      <div className="modern-header">
        <div className="header-left">
          <div className="brand">
            <span className="brand-icon">🇷🇼</span>
            <span className="brand-name">Twigane</span>
          </div>
          <div className="status-indicator">
            <span className={`status-dot ${backendStatus.connected ? 'online' : 'offline'}`}></span>
            <span className="status-text">
              {backendStatus.connected ? 'Active' : 'Disconnected'}
            </span>
          </div>
        </div>
        <div className="header-right">
          <button 
            className="toolbar-toggle"
            onClick={() => setShowLearningTools(!showLearningTools)}
            title="Learning Tools"
          >
            🛠️
          </button>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title="Toggle Suggestions"
          >
            {sidebarCollapsed ? '▶️' : '◀️'}
          </button>
        </div>
      </div>

      <div className="chat-body">
        {/* Messages Area */}
        <div className="messages-container">
          <div className="messages-area">
            {messages.map(renderMessage)}
            {isLoading && (
              <div className="message bot">
                <div className="message-bubble loading">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Learning Tools Floating Panel */}
          {showLearningTools && (
            <div className="learning-tools-panel">
              <div className="tools-header">
                <span>Learning Tools</span>
                <button onClick={() => setShowLearningTools(false)}>✖️</button>
              </div>
              <div className="tools-grid">
                {learningTools.map((tool, index) => (
                  <button 
                    key={index}
                    className="tool-btn"
                    onClick={tool.action}
                  >
                    <span className="tool-icon">{tool.icon}</span>
                    <span className="tool-label">{tool.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Collapsible Sidebar */}
        {!sidebarCollapsed && (
          <div className="suggestions-sidebar">
            <div className="sidebar-header">
              <h3>Quick Start</h3>
              <p>Try these questions:</p>
            </div>
            <div className="suggestions-list">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  className="suggestion-btn"
                  onClick={() => setQuickQuestion(question)}
                  disabled={isLoading || !backendStatus.connected}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fixed Input Bar */}
      <div className="input-bar">
        {!backendStatus.connected && (
          <div className="connection-warning">
            ⚠️ Connection lost. Please refresh to reconnect.
          </div>
        )}
        <div className="input-container">
          <textarea
            ref={inputRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about Kinyarwanda or request pronunciation help..."
            disabled={isLoading || !backendStatus.connected}
            rows="1"
            className="message-input"
          />
          <button 
            onClick={sendMessage} 
            disabled={isLoading || !inputText.trim() || !backendStatus.connected}
            className="send-button"
          >
            {isLoading ? '⏳' : '➤'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TwiganeChat; 