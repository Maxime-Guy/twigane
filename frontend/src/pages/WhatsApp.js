import React, { useState } from 'react';
import './WhatsApp.css';

const WhatsApp = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const whatsappBusinessNumber = '+250788123456'; // Replace with your actual WhatsApp Business number

  const generateWhatsAppLink = () => {
    const message = "Mwaramutse! I want to learn Kinyarwanda with Twigane. 🇷🇼";
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${whatsappBusinessNumber.replace('+', '')}?text=${encodedMessage}`;
  };

  const handleStartWhatsAppChat = () => {
    window.open(generateWhatsAppLink(), '_blank');
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber) {
      const message = `Mwaramutse! I want to learn Kinyarwanda with Twigane. My contact: ${phoneNumber} 🇷🇼`;
      const encodedMessage = encodeURIComponent(message);
      const link = `https://wa.me/${whatsappBusinessNumber.replace('+', '')}?text=${encodedMessage}`;
      window.open(link, '_blank');
    }
  };

  return (
    <div className="whatsapp-page">
      <div className="whatsapp-container">
        <div className="whatsapp-hero">
          <div className="whatsapp-icon">
            <svg viewBox="0 0 24 24" width="64" height="64" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.488"/>
            </svg>
          </div>
          <h1>Chat with Twigane on WhatsApp</h1>
          <p>Learn Kinyarwanda through your favorite messaging app!</p>
        </div>

        <div className="whatsapp-content">
          <div className="whatsapp-features">
            <h2>Why Use WhatsApp for Learning?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-emoji">📱</div>
                <h3>Always Available</h3>
                <p>Learn on the go with the app you already use every day.</p>
              </div>
              <div className="feature-card">
                <div className="feature-emoji">🔔</div>
                <h3>Push Notifications</h3>
                <p>Get reminded to practice and never miss a lesson.</p>
              </div>
              <div className="feature-card">
                <div className="feature-emoji">🎤</div>
                <h3>Voice Messages</h3>
                <p>Practice pronunciation with voice notes and audio feedback.</p>
              </div>
              <div className="feature-card">
                <div className="feature-emoji">👥</div>
                <h3>Personal Touch</h3>
                <p>One-on-one conversations that feel natural and engaging.</p>
              </div>
            </div>
          </div>

          <div className="whatsapp-actions">
            <div className="action-card primary-action">
              <h3>Start Learning Now!</h3>
              <p>Click the button below to open WhatsApp and start your Kinyarwanda learning journey.</p>
              <button className="whatsapp-btn primary" onClick={handleStartWhatsAppChat}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.488"/>
                </svg>
                Open WhatsApp Chat
              </button>
            </div>

            <div className="action-card">
              <h3>Send Your Number</h3>
              <p>Enter your phone number and we'll send you a welcome message to get started.</p>
              <form onSubmit={handlePhoneSubmit} className="phone-form">
                <div className="phone-input-group">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+250 788 123 456"
                    className="phone-input"
                    required
                  />
                  <button type="submit" className="whatsapp-btn secondary">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="whatsapp-info">
            <div className="info-section">
              <h3>How It Works</h3>
              <div className="steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Start the Chat</h4>
                    <p>Click the WhatsApp button to open a chat with Twigane</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Begin Learning</h4>
                    <p>Send "Mwaramutse" (Good morning) to start your first lesson</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Practice Daily</h4>
                    <p>Get daily lessons and practice conversations in Kinyarwanda</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="qr-section">
              <h3>QR Code</h3>
              <p>Scan this QR code with your phone to start chatting on WhatsApp:</p>
              <div className="qr-code">
                <div className="qr-placeholder">
                  <p>QR CODE</p>
                  <p className="qr-note">Scan with WhatsApp</p>
                </div>
              </div>
              <p className="qr-help">
                Open WhatsApp → Menu → Settings → WhatsApp Web → Scan QR Code
              </p>
            </div>
          </div>

          <div className="integration-info">
            <h3>For Developers</h3>
            <div className="api-info">
              <h4>WhatsApp Business API Integration</h4>
              <p>This integration uses the WhatsApp Business API to provide:</p>
              <ul>
                <li>Automated responses in Kinyarwanda</li>
                <li>Interactive learning sessions</li>
                <li>Voice message support for pronunciation</li>
                <li>Progress tracking and reminders</li>
                <li>Multimedia content (images, audio, documents)</li>
              </ul>
              
              <div className="webhook-info">
                <h4>Webhook Configuration</h4>
                <code>POST /api/whatsapp/webhook</code>
                <p>Configure your webhook URL to receive WhatsApp messages and send automated responses.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsApp; 