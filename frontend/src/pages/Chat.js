import React from 'react';
import TwiganeChat from '../components/TwiganeChat';
import './Chat.css';

const Chat = () => {
  return (
    <div className="chat-page">
      {/* Use the TwiganeChat component that provides the full modern interface */}
      <TwiganeChat />
    </div>
  );
};

export default Chat; 