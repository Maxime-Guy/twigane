import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is Twigane?",
      answer: "Twigane (meaning 'let's learn together' in Kinyarwanda) is an AI-powered platform designed to help users learn Kinyarwanda through interactive conversations, translations, quizzes, and pronunciation practice."
    },
    {
      question: "How do I start learning with Twigane?",
      answer: "Simply create an account, log in, and start chatting with our AI assistant. You can ask questions about Kinyarwanda vocabulary, grammar, or cultural context in either English or Kinyarwanda."
    },
    {
      question: "Is Twigane free to use?",
      answer: "Yes, Twigane is completely free to use. We believe in making language learning accessible to everyone, especially for preserving and promoting African languages."
    },
    {
      question: "What features does Twigane offer?",
      answer: "Twigane offers an interactive chatbot for learning, text translation between Kinyarwanda and English, pronunciation practice with audio, interactive quizzes, and progress tracking through your personalized dashboard."
    },
    {
      question: "How accurate is the translation feature?",
      answer: "Our translation system is trained specifically for Kinyarwanda and continues to improve. While it handles common phrases and vocabulary well, complex or cultural expressions may need context. We encourage feedback to help us improve."
    },
    {
      question: "Can I use Twigane on my mobile device?",
      answer: "Yes! Twigane is designed to work seamlessly on both desktop and mobile devices. Simply access it through your web browser."
    },
    {
      question: "Do you store my personal data?",
      answer: "We only collect and store essential information needed to provide our services. Your privacy is important to us. Please read our Privacy Policy for detailed information about data handling."
    },
    {
      question: "How can I track my learning progress?",
      answer: "Your learning dashboard shows your quiz scores, learning streaks, topics covered, and personalized recommendations based on your learning patterns."
    },
    {
      question: "What if I encounter technical issues?",
      answer: "If you experience any technical problems, please try refreshing your browser first. For persistent issues, contact our support team through the Help Center or send us feedback."
    },
    {
      question: "Can I suggest improvements or report errors?",
      answer: "Absolutely! We welcome your feedback. Use our Feedback page to report errors, suggest improvements, or share your learning experience. Your input helps us make Twigane better."
    },
    {
      question: "Is there customer support available?",
      answer: "Yes, you can reach our support team through email at support@twigane.com or use our Help Center for immediate assistance with common issues."
    },
    {
      question: "How often is the content updated?",
      answer: "We continuously update and improve our AI models, add new vocabulary, and enhance features based on user feedback and learning outcomes."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-container">
        <div className="faq-header">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about Twigane</p>
        </div>

        <div className="faq-content">
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={activeIndex === index}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">
                    {activeIndex === index ? '−' : '+'}
                  </span>
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-footer">
            <div className="still-questions">
              <h3>Still have questions?</h3>
              <p>Can't find what you're looking for? We're here to help!</p>
              <div className="contact-options">
                <a href="/help-center" className="contact-btn">
                  📚 Visit Help Center
                </a>
                <a href="/feedback" className="contact-btn">
                  💬 Send Feedback
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 