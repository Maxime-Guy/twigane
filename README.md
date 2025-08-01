# Twigane - Comprehensive Kinyarwanda Learning Platform

<div align="center">

![Twigane Logo](https://img.shields.io/badge/Twigane-AI%20Learning%20Platform-blue?style=for-the-badge&logo=robot)
![Language](https://img.shields.io/badge/Language-Kinyarwanda-red?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-Web%20Application-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge)

**Master Rwanda's beautiful language through comprehensive interactive learning**

[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10.8.0-orange?logo=firebase)](https://firebase.google.com/)
[![Flask](https://img.shields.io/badge/Flask-3.0.0-green?logo=flask)](https://flask.palletsprojects.com/)
[![Netlify](https://img.shields.io/badge/Netlify-Live-00C7B7?logo=netlify)](https://twigane.netlify.app/)

**🌐 <a href="https://twigane.netlify.app/" target="_blank">Visit Live Application</a>**

**📺 <a href="https://youtu.be/oBabq0fpe04" target="_blank">
<img src="https://img.shields.io/badge/Demo_Video-Watch_on_YouTube-red?style=for-the-badge&logo=youtube" alt="Demo Video">
</a>**

</div>

## 📖 Project Summary

**Twigane** (meaning "Let's learn together" in Kinyarwanda) is a comprehensive AI-powered language learning platform specifically designed to help users master Kinyarwanda, the national language of Rwanda. This full-stack web application combines modern web technologies with artificial intelligence to create an immersive, interactive learning experience.

The platform offers a complete learning ecosystem featuring AI-powered conversations, smart translation tools, interactive quizzes, pronunciation guides, and comprehensive progress tracking. Built with React.js and powered by Firebase, Twigane provides a seamless, responsive experience across all devices while maintaining detailed analytics for both learners and administrators.

### 🌟 **What Makes Twigane Special**

- **🤖 AI-Powered Conversations** - Practice real-world scenarios with intelligent chat responses
- **🔄 Smart Translation System** - Instant translation between Kinyarwanda and other languages
- **🧠 Interactive Quizzes** - Test knowledge with dynamic, categorized assessments
- **🔊 Pronunciation Guide** - Native-like audio for perfect pronunciation
- **📊 Progress Analytics** - Comprehensive tracking of learning journey and achievements
- **✍️ Text Generation** - Create content and practice writing skills with AI assistance

**Founded by**: Maxime Guy Bakunzi  
**Contact**: guymaximebakunzi@gmail.com  
**Live Platform**: <a href="https://twigane.netlify.app/" target="_blank">https://twigane.netlify.app/</a>

## 🚀 **Core Features**

### 💬 **AI Chat Practice**
Engage in real-time conversations with our intelligent AI tutor. Practice everyday scenarios, ask questions about grammar and vocabulary, and improve conversational skills through natural dialogue.

### 🔄 **Smart Translation**
Instantly translate text between Kinyarwanda and other languages. Perfect for understanding new words, phrases, and expressions during your learning journey.

### 🧠 **Interactive Quizzes**
Test your knowledge with dynamic quizzes covering vocabulary, grammar, and comprehension. Features multiple categories, difficulty levels, and detailed progress tracking.

### 🔊 **Pronunciation Guide**
Master authentic Kinyarwanda pronunciation with our text-to-speech system. Hear native-like pronunciation for words, phrases, and complete sentences.

### 📊 **Progress Dashboard**
Monitor your learning journey with detailed analytics including:
- **For Learners**: Personal progress, achievements, streaks, and recommendations
- **For Administrators**: System analytics, user management, and platform insights

### ✍️ **Text Generation**
Generate creative content in Kinyarwanda with AI assistance. Practice writing skills through stories, conversations, and expressions.

### 🔐 **Smart Authentication**
Secure user management with Firebase Authentication, including email/password login, Google Sign-In, and password reset functionality.

### 📱 **Fully Responsive Design**
Optimized experience across all devices - desktop, tablet, and mobile with touch-friendly interfaces and adaptive layouts.

## 🏗️ **System Architecture**

### **Frontend (Live Production)**
- **🌐 Platform**: Netlify (<a href="https://twigane.netlify.app/" target="_blank">https://twigane.netlify.app/</a>)
- **⚛️ Framework**: React.js 18.2.0
- **🎨 Styling**: Custom CSS with responsive design
- **🔐 Authentication**: Firebase Auth with Google Sign-In
- **📊 Analytics**: Firebase Firestore for real-time data

### **Backend (Local Development)**
- **🐍 Framework**: Flask 3.0.0 with Python
- **🤖 AI Models**: Transformers with PyTorch
- **🔊 TTS**: Google Text-to-Speech (gTTS)
- **📡 API**: RESTful endpoints for chat, translation, and quizzes

### **Database & Services**
- **🔥 Firebase Firestore**: User data, analytics, and progress tracking
- **🔑 Firebase Auth**: User authentication and session management
- **📈 Firebase Analytics**: Real-time user activity tracking

### **Project Structure**
```
twigane/
├── frontend/                    # React application (Deployed on Netlify)    
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Header.js       # Navigation with role-based access
│   │   │   ├── Footer.js       # Responsive footer
│   │   │   ├── Hero.js         # Dynamic hero section
│   │   │   ├── Features.js     # Feature showcase
│   │   │   └── TwiganeChat.js  # Chat interface
│   │   ├── pages/              # Main application pages
│   │   │   ├── Home.js         # Landing page
│   │   │   ├── Chat.js         # AI conversation page
│   │   │   ├── Quiz.js         # Interactive quiz system
│   │   │   ├── Translate.js    # Translation interface
│   │   │   ├── LearnerDashboard.js # Student progress tracking
│   │   │   ├── AdminDashboard.js   # Administrator analytics
│   │   │   ├── About.js        # Platform information
│   │   │   └── Settings.js     # User preferences
│   │   ├── contexts/           # React contexts
│   │   │   └── AuthContext.js  # Firebase authentication
│   │   ├── services/           # External service integrations
│   │   │   └── analyticsService.js # Firebase analytics
│   │   ├── utils/              # Utility functions
│   │   │   └── adminUtils.js   # Role-based access control
│   │   └── firebase/           # Firebase configuration
│   │       └── config.js       # Firebase setup
│   ├── netlify.toml           # Netlify deployment configuration
│   └── package.json           # Dependencies and scripts
├── backend/                    # Flask API server (Local development)
│   ├── app.py                 # Main API endpoints
│   ├── requirements.txt       # Python dependencies
│   ├── quiz_data.py          # Quiz questions and logic
│   └── test_backend.py       # API testing suite
├── models/                     # AI models and TTS system
├── notebooks/                  # Jupyter notebooks for development
│   ├── kinyarwanda_data_exploration.ipynb
│   ├── kinyarwanda_scratch_training.ipynb
│   └── simple_translation_model.ipynb
├── datasets/                   # Training data and audio corpus
│   ├── kinyarwanda_dataset_final.jsonl
│   ├── tts_data.csv
│   ├── cv-corpus-21.0-delta-2025-03-14/ # Common Voice Kinyarwanda
│   └── learn-kinyarwanda.pdf
└── upload_models_to_hf.py     # HuggingFace model deployment
```

## 🚀 **Getting Started**

### **🌐 Try Twigane Online (Recommended)**

**Visit the live application**: <a href="https://twigane.netlify.app/" target="_blank">https://twigane.netlify.app/</a>

- ✅ **No installation required**
- ✅ **Full feature access** (Chat, Translation, Quizzes, Dashboards)
- ✅ **Responsive design** for all devices
- ✅ **Real-time analytics** with Firebase
- ⚠️ **Note**: Backend-dependent features (AI chat, quizzes) show graceful fallbacks

### **🛠️ Local Development Setup**

#### **Prerequisites**
- **Node.js 18+** and npm
- **Python 3.8+** for backend development
- **Firebase Account** for authentication and analytics

#### **Frontend Setup**
```bash
# Clone the repository
git clone <repository-url>
cd twigane/frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Add your Firebase configuration to .env

# Start development server
npm start

# Access at http://localhost:3000
```

#### **Backend Setup (Optional)**
```bash
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start Flask server
python app.py

# API available at http://localhost:5001
```

#### **Firebase Configuration**
1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password, Google)
3. Enable Firestore Database
4. Add your configuration to `frontend/.env`:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

## 🎯 **Feature Deep Dive**

### **💬 AI Chat System**
- **Intelligent Responses**: Context-aware conversations about Kinyarwanda
- **Learning Categories**: Greetings, family, numbers, culture, and conversation
- **Pronunciation Help**: Integrated audio playback for proper pronunciation
- **Teaching Mode**: Structured responses with explanations and examples
- **Activity Tracking**: All conversations logged for progress analysis

### **🔄 Translation Engine** 
- **Bidirectional Translation**: English ↔ Kinyarwanda
- **Smart Interface**: Google Translate-inspired design
- **Quick Samples**: Pre-built common phrases for instant practice
- **Translation History**: Track and revisit previous translations
- **Mobile Optimized**: Touch-friendly controls and responsive layout

### **🧠 Quiz System**
- **Dynamic Questions**: Multiple choice questions across various categories
- **Difficulty Levels**: Beginner, Intermediate, Advanced
- **Real-time Scoring**: Instant feedback with detailed explanations
- **Progress Tracking**: Performance analytics and improvement suggestions
- **Category Variety**: Vocabulary, grammar, culture, and comprehension

### **📊 Analytics Dashboard**

#### **For Learners:**
- **Personal Progress**: Total interactions, quiz scores, learning streaks
- **Achievement System**: Unlock badges for milestones and consistency
- **Detailed Insights**: Performance breakdown by category and difficulty
- **Recommendations**: Personalized suggestions for improvement

#### **For Administrators:**
- **System Overview**: Total users, active learners, platform health
- **User Management**: Detailed user analytics and activity monitoring
- **Feature Usage**: Comprehensive tracking of all platform interactions
- **Performance Metrics**: Response times, success rates, and system statistics

### **🔊 Pronunciation System**
- **Native Audio**: High-quality Kinyarwanda pronunciation using Google TTS
- **Enhanced Phonetics**: Special handling for Kinyarwanda sound patterns
- **Interactive Playback**: Click-to-play audio in chat and translation interfaces
- **Audio Caching**: Optimized loading for common words and phrases

### **🎨 User Experience**
- **Role-Based Access**: Separate experiences for learners and administrators
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile
- **Modern Interface**: Clean, intuitive design with smooth animations
- **Accessibility**: Touch-friendly controls and readable typography

## 🔧 **Technical Implementation**

### **🌐 Frontend Architecture**
- **Framework**: React.js with functional components and hooks
- **State Management**: React Context API for authentication and global state
- **Routing**: React Router DOM with protected routes and role-based access
- **Styling**: Custom CSS with CSS Grid, Flexbox, and responsive design
- **Authentication**: Firebase Auth with email/password and Google Sign-In
- **Data Management**: Firebase Firestore for real-time analytics and user data

### **🐍 Backend API Endpoints**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | System health and status check |
| `/api/chat` | POST | AI-powered conversation responses |
| `/api/translate` | POST | Text translation between languages |
| `/api/quiz` | POST | Dynamic quiz question generation |
| `/pronounce` | POST | Text-to-speech audio generation |
| `/learner/dashboard` | GET | Learner progress and analytics |
| `/admin/dashboard` | GET | Administrator system insights |
| `/audio/<filename>` | GET | Serve generated audio files |

### **📊 Data Models**

#### **User Analytics**
```javascript
{
  userEmail: "user@example.com",
  totalActivities: 150,
  chatCount: 45,
  translationCount: 30,
  quizAttempts: 15,
  pronunciationCount: 60,
  bestQuizScore: 85,
  totalQuizScore: 420,
  lastActive: "2025-01-28T10:30:00Z"
}
```

#### **Activity Tracking**
```javascript
{
  userEmail: "user@example.com",
  activityType: "chat|translation|quiz|pronunciation",
  timestamp: "2025-01-28T10:30:00Z",
  details: {
    question: "User input",
    response: "System response",
    category: "greetings",
    success: true
  }
}
```

### **🔐 Security Features**
- **Firebase Authentication**: Secure user management with JWT tokens
- **Firestore Security Rules**: User-specific data access controls
- **Role-Based Access**: Admin vs learner permission systems
- **Data Privacy**: User data isolation and secure API endpoints
- **CORS Protection**: Configured for secure cross-origin requests

## 📊 Model Architecture

### Teaching Model

- **Base Model**: DigitalUmuganda-education_model_en_to_kin
- **Training Data**: 510 instruction-response pairs
- **Architecture**: M2M100ForConditionalGeneration
- **Features**: 
  - Instruction-following format
  - Category classification
  - Difficulty level assessment
  - Confidence scoring

### TTS System

- **Engine**: Google TTS (gTTS)
- **Enhancement**: Custom Kinyarwanda pronunciation rules
- **Caching**: Pre-generated audio files
- **Formats**: WAV, MP3 support

## 📚 **Data & Content**

### **Training Datasets**
- **Kinyarwanda Learning Dataset**: 510 high-quality instruction-response pairs
- **Common Voice Kinyarwanda**: Mozilla's open-source audio corpus
- **Custom TTS Data**: Curated pronunciation examples and phonetic rules
- **Quiz Database**: Comprehensive question bank across multiple categories

### **Content Categories**
- **📞 Greetings & Introductions**: Basic social interactions
- **👨‍👩‍👧‍👦 Family & Relationships**: Family members, relationships, personal life
- **🔢 Numbers & Time**: Counting, dates, time expressions
- **🏠 Daily Life**: Common activities, household items, routine conversations
- **🇷🇼 Culture & Traditions**: Rwandan culture, customs, and social norms
- **📖 Grammar & Structure**: Language rules, sentence construction, verb conjugations

### **Audio Resources**
- **Format**: MP3/WAV high-quality audio files
- **Source**: Google Text-to-Speech with Kinyarwanda optimization
- **Coverage**: 50+ common words and phrases
- **Quality**: Native-like pronunciation with enhanced phonetic rules

## 🛠️ **Development & Deployment**

### **🚀 Current Deployment Status**
- **✅ Frontend**: Live on Netlify at <a href="https://twigane.netlify.app/" target="_blank">https://twigane.netlify.app/</a>
- **⚠️ Backend**: Local development only (models require significant memory)
- **✅ Database**: Firebase Firestore (live and operational)
- **✅ Authentication**: Firebase Auth (fully functional)

### **📋 Development Workflow**

#### **Frontend Development**
```bash
# Local development
cd frontend
npm start                    # Development server
npm run build               # Production build
npm test                    # Run test suite

# Deployment (Automatic via Netlify)
git push origin main        # Triggers automatic deployment
```

#### **Backend Development**  
```bash
# Local API server
cd backend
python app.py              # Start Flask development server
python test_backend.py     # Run API tests

# Dependencies
pip install -r requirements.txt
```

### **🧪 Testing & Quality Assurance**

#### **Frontend Testing**
- **Unit Tests**: React Testing Library for component testing
- **Integration Tests**: Firebase service integration
- **Responsive Testing**: Cross-device compatibility verification
- **User Experience Testing**: Authentication flows and analytics

#### **Backend Testing**
- **API Testing**: Endpoint functionality and response validation
- **Model Testing**: AI response quality and accuracy
- **Performance Testing**: Response time and memory usage optimization

### **📱 Responsive Design Testing**
- **Mobile**: 320px - 767px (phones)
- **Tablet**: 768px - 1023px (tablets)
- **Desktop**: 1024px+ (laptops/desktops)
- **Cross-Browser**: Chrome, Safari, Firefox, Edge compatibility

## 🌍 **Deployment Architecture**

### **🟢 Production Environment**

#### **Frontend (Netlify)**
- **URL**: <a href="https://twigane.netlify.app/" target="_blank">https://twigane.netlify.app/</a>
- **Build Command**: `npm run build`
- **Publish Directory**: `build`
- **Auto-Deploy**: Triggered on `main` branch commits
- **Environment Variables**: Firebase configuration via Netlify dashboard

#### **Database & Services (Firebase)**
- **Authentication**: Firebase Auth with email/password and Google Sign-In
- **Database**: Firestore for real-time analytics and user data
- **Security**: Firestore security rules for user data protection
- **Analytics**: Real-time user activity and progress tracking

### **🔧 Local Development**

#### **Frontend Development Server**
```bash
cd frontend
npm start                    # http://localhost:3000
```

#### **Backend API Server (Optional)**
```bash
cd backend  
python app.py               # http://localhost:5001
```

### **⚙️ Configuration Files**

#### **Netlify Configuration (`netlify.toml`)**
```toml
[build]
  base = "frontend"
  command = "npm run build"
  publish = "build"

[build.environment]
  SECRETS_SCAN_OMIT_KEYS = "REACT_APP_FIREBASE_API_KEY,..."

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### **Firebase Security Rules**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.token.email == userId;
    }
    match /activities/{activityId} {
      allow read, write: if request.auth != null && request.auth.token.email == resource.data.userEmail;
    }
  }
}
```

## 📈 **Performance & Analytics**

### **🚀 Live Application Performance**
- **Page Load Time**: < 2 seconds on modern devices
- **Time to Interactive**: < 3 seconds
- **Mobile Performance**: Optimized for 3G networks and low-end devices
- **Responsive Design**: Seamless experience across all screen sizes
- **Firebase Queries**: Real-time data with sub-second response times

### **💻 System Requirements**

#### **End Users (Web Application)**
- **Browser**: Chrome 70+, Safari 12+, Firefox 65+, Edge 79+
- **Internet**: Stable internet connection for real-time features
- **Device**: Any modern smartphone, tablet, or computer
- **Storage**: No local storage required (cloud-based)

#### **Development Environment**
- **Node.js**: Version 18+ for frontend development
- **Python**: Version 3.8+ for backend development
- **RAM**: 8GB minimum, 16GB recommended for model development
- **Storage**: 5GB for complete development setup

### **📊 User Analytics**
- **Real-time Tracking**: User activities, progress, and engagement
- **Learning Metrics**: Quiz scores, conversation counts, improvement tracking
- **System Health**: Performance monitoring and error tracking
- **Usage Patterns**: Popular features, peak usage times, user retention

## 🤝 **Contributing & Development**

We welcome contributions to make Twigane even better! Here's how you can help:

### **🔄 Current Development Status**
- ✅ **Frontend**: Fully functional and deployed
- ✅ **Authentication**: Complete with Firebase Auth
- ✅ **Analytics**: Real-time tracking implemented
- ✅ **Responsive Design**: Cross-device compatibility
- ⚠️ **Backend API**: Local development ready, deployment pending
- 🚧 **AI Models**: Continuous improvement and optimization

### **🎯 Contributing Areas**

#### **High Priority**
- [ ] **Backend Deployment**: Deploy Flask API to cloud platform with sufficient memory
- [ ] **Content Expansion**: Add more quiz questions and conversation scenarios
- [ ] **Model Optimization**: Improve AI response accuracy and speed
- [ ] **Audio Quality**: Enhance pronunciation and add more audio samples

#### **Feature Enhancement**
- [ ] **Gamification**: Achievement systems, leaderboards, learning streaks
- [ ] **Social Learning**: User communities, shared progress, study groups
- [ ] **Advanced Analytics**: Learning pattern analysis, personalized recommendations
- [ ] **Mobile App**: Native iOS/Android applications
- [ ] **Offline Mode**: Cached content for learning without internet

#### **Technical Improvements**
- [ ] **Performance Optimization**: Faster loading, better caching
- [ ] **Accessibility**: Screen reader support, keyboard navigation
- [ ] **Internationalization**: Support for multiple interface languages
- [ ] **API Documentation**: Comprehensive developer documentation

### **💻 How to Contribute**
1. **Fork the repository** and create a feature branch
2. **Set up development environment** following the setup guide
3. **Make your changes** with proper testing
4. **Submit a pull request** with detailed description
5. **Collaborate** on code review and improvements

### **📧 Get in Touch**
- **Email**: guymaximebakunzi@gmail.com
- **Issues**: Use GitHub Issues for bug reports and feature requests
- **Discussions**: Open GitHub Discussions for questions and ideas

## 🏆 **Project Impact & Vision**

### **🎯 Mission Statement**
Twigane aims to make Kinyarwanda language learning accessible, engaging, and effective for everyone through innovative technology and comprehensive educational resources.

### **📊 Current Achievements**
- ✅ **Live Platform**: Fully deployed and operational web application
- ✅ **Comprehensive Features**: 6 core learning modules implemented
- ✅ **User Management**: Complete authentication and analytics system
- ✅ **Responsive Design**: Optimized for all devices and screen sizes
- ✅ **Real-time Analytics**: Detailed progress tracking and insights

### **🚀 Future Roadmap**
- **Phase 1**: Backend deployment with enhanced AI capabilities
- **Phase 2**: Mobile applications for iOS and Android
- **Phase 3**: Advanced gamification and social learning features
- **Phase 4**: Expansion to other African languages

## 📞 **Contact & Support**

### **👨‍💻 Developer**
**Maxime Guy Bakunzi**  
*Founder & Lead Developer*
- **Email**: [guymaximebakunzi@gmail.com](mailto:guymaximebakunzi@gmail.com)
- **Platform**: <a href="https://twigane.netlify.app/" target="_blank">https://twigane.netlify.app/</a>

### **💬 Get Help**
- **🐛 Bug Reports**: Use GitHub Issues for technical problems
- **💡 Feature Requests**: Share your ideas via GitHub Discussions  
- **❓ Questions**: Contact directly via email for support
- **📚 Documentation**: Comprehensive guides available in the repository

## 🙏 **Acknowledgments**

- **🔥 Firebase**: For robust backend services and real-time database
- **⚛️ React Community**: For excellent frontend framework and ecosystem
- **🌐 Netlify**: For seamless deployment and hosting services
- **🗣️ Mozilla Common Voice**: For Kinyarwanda audio corpus data
- **🇷🇼 Rwanda Language Community**: For cultural insights and language expertise
- **👨‍🎓 African Leadership University**: For educational support and resources

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

<a href="https://twigane.netlify.app/" target="_blank">
<img src="https://img.shields.io/badge/🌐_Live_Application-Visit_Twigane-blue?style=for-the-badge" alt="Live Application">
</a>

**Made with ❤️ for the global Kinyarwanda learning community**

🇷🇼 ***"Twigane" - Let's learn together***

*Empowering language learning through technology and innovation*

</div>

