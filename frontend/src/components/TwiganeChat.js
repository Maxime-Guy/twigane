import React, { useState, useRef, useEffect } from 'react';
import './TwiganeChat.css';

const TwiganeChat = () => {
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
  const audioRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Backend API URL
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

  // Check backend status on component mount
  useEffect(() => {
    checkBackendStatus();
  }, []);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const checkBackendStatus = async () => {
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
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const playAudio = async (audioPath) => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      // Extract filename from path
      const filename = audioPath.split('/').pop();
      const audioUrl = `${API_URL}/audio/${filename}`;
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      await audio.play();
      
      // Add audio status message
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
      timestamp: new Date().toLocaleTimeString(),
      ...message
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;
    
    const userMessage = inputText.trim();
    setInputText('');
    setIsLoading(true);

    // Add user message
    addMessage({
      text: userMessage,
      sender: 'user',
      type: 'question'
    });

    try {
      // Send to backend
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userMessage })
      });

      if (response.ok) {
        const data = await response.json();
        
        // Add bot response
        const botMessage = {
          text: data.response,
          sender: 'bot',
          type: data.type || 'teaching',
          category: data.category,
          difficulty: data.difficulty,
          confidence: data.confidence
        };

        addMessage(botMessage);

        // Handle pronunciation responses
        if (data.type === 'pronunciation' && data.audio_path) {
          // Add audio play button
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

  const quickQuestions = [
    "How do you say hello?",
    "What does Muraho mean?",
    'How does "Mwaramutse" sound?',
    "Teach me basic greetings",
    'How is "Amakuru" pronounced?',
    "What is good morning in Kinyarwanda?"
  ];

  const renderMessage = (message) => {
    const isUser = message.sender === 'user';
    
    return (
      <div key={message.id} className={`message ${isUser ? 'user' : 'bot'}`}>
        <div className="message-content">
          <div className="message-text">{message.text}</div>
          
          {/* Audio button for pronunciation */}
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
          
          {/* Message metadata */}
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

  return (
    <div className="twigane-chat">
      {/* Header */}
      <div className="chat-header">
        <div className="header-title">
          <h2>🇷🇼 Twigane - Kinyarwanda Teacher</h2>
          <div className="status-indicators">
            <span className={`status ${backendStatus.connected ? 'connected' : 'disconnected'}`}>
              {backendStatus.connected ? '🟢' : '🔴'} Server
            </span>
            <span className={`status ${backendStatus.teachingModel ? 'active' : 'inactive'}`}>
              {backendStatus.teachingModel ? '🧠' : '❌'} Teaching
            </span>
            <span className={`status ${backendStatus.ttsSystem ? 'active' : 'inactive'}`}>
              {backendStatus.ttsSystem ? '🎵' : '❌'} Audio
            </span>
          </div>
        </div>
        
        {backendStatus.availableWords && (
          <div className="audio-stats">
            {backendStatus.availableWords} words with audio available
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map(renderMessage)}
        
        {isLoading && (
          <div className="message bot loading">
            <div className="message-content">
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

      {/* Quick Questions */}
      <div className="quick-questions">
        <div className="quick-title">💡 Try asking:</div>
        <div className="quick-buttons">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              className="quick-btn"
              onClick={() => setInputText(question)}
              disabled={isLoading}
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="chat-input">
        <div className="input-container">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about Kinyarwanda or request pronunciation help..."
            disabled={isLoading || !backendStatus.connected}
            rows="2"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !inputText.trim() || !backendStatus.connected}
            className="send-btn"
          >
            {isLoading ? '⏳' : '📤'}
          </button>
        </div>
        
        {!backendStatus.connected && (
          <div className="connection-error">
            ❌ Backend not connected. Please make sure the server is running.
          </div>
        )}
      </div>
    </div>
  );
};

export default TwiganeChat; 