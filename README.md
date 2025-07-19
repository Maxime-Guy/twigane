# Twigane - A Kinyarwanda Learning Platform

<div align="center">

![Twigane Logo](https://img.shields.io/badge/Twigane-AI%20Learning%20Platform-blue?style=for-the-badge&logo=robot)
![Language](https://img.shields.io/badge/Language-Kinyarwanda-red?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-Web%20Application-green?style=for-the-badge)

**Master Rwanda's beautiful language through interactive AI conversations**

[![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-2.3.3-green?logo=flask)](https://flask.palletsprojects.com/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.0.1-orange?logo=pytorch)](https://pytorch.org/)

</div>

## 📖 Project Summary

<div align="center">

[![YouTube Demo](https://img.shields.io/badge/YouTube-Demo%20Video-red?style=for-the-badge&logo=youtube)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)

**[🎥 Watch Demo Video](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)**

*See Twigane in action! Learn how to interact with the AI chatbot, practice pronunciation, and explore the learning features.*

</div>

**Twigane** (meaning "Let's learn together" in Kinyarwanda) is a comprehensive AI-powered language learning platform specifically designed to help English speakers master Kinyarwanda, the national language of Rwanda. Born from the need to make Kinyarwanda learning accessible and engaging, this project combines cutting-edge natural language processing with advanced text-to-speech technology to create an immersive learning experience.

The platform features an intelligent chatbot that understands context and provides personalized responses, a sophisticated text-to-speech system with enhanced Kinyarwanda pronunciation rules, and a modern web interface that makes learning both effective and enjoyable. Whether you're a complete beginner or looking to improve your Kinyarwanda skills, Twigane adapts to your learning level and provides structured lessons across various categories including greetings, family vocabulary, numbers, and cultural expressions.

## 🌟 Overview

**Twigane** is an innovative AI-powered platform designed to help English speakers learn Kinyarwanda, the national language of Rwanda. The platform combines advanced natural language processing with text-to-speech capabilities to provide an immersive learning experience.

### Key Features

- 🤖 **Intelligent Teaching Chatbot** - Learn through natural conversations
- 🔊 **Text-to-Speech Pronunciation** - Hear correct Kinyarwanda pronunciation
- 🌐 **Web Interface** - Beautiful, responsive web application
- 📚 **Structured Learning** - Organized lessons by difficulty and category
- 🎯 **Personalized Responses** - AI adapts to your learning level

## 🏗️ Architecture

```
twigane/
├── frontend/                 # React web application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   └── App.js          # Main application
├── backend/                 # Flask API server
│   ├── app.py              # Main API endpoints
│   └── requirements.txt    # Python dependencies
├── models/                  # AI models and TTS system
│   ├── kinyarwanda_teaching_chatbot_20250715_022707/
│   └── kinyarwanda-tts-v2/
├── notebooks/              # Jupyter notebooks for model development
├── datasets/               # Training data and audio corpus
└── pretrained_models/      # Pre-trained AI models
```

## 🚀 Quick Start

### Prerequisites

- **Python 3.8+** with conda environment `ml_mac`
- **Node.js 16+** and npm
- **Mac with 16GB+ unified memory** (for optimal performance)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd twigane
   ```

2. **Set up the backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Set up the frontend**
   ```bash
   cd frontend
   npm install
   ```

4. **Start the services**
   ```bash
   # Terminal 1: Start backend
   cd backend
   python app.py
   
   # Terminal 2: Start frontend
   cd frontend
   npm start
   ```

5. **Access the application**
   - Web Interface: http://localhost:3000
   - API Endpoints: http://localhost:5001

## 🎯 Core Features

### 1. Intelligent Teaching Chatbot

The teaching system uses a custom-trained model based on the **DigitalUmuganda-education_model_en_to_kin** that provides:

- **Contextual Responses**: Answers questions about Kinyarwanda vocabulary, grammar, and culture
- **Difficulty Levels**: Beginner, intermediate, and advanced responses
- **Category Organization**: Greetings, family, numbers, conversation, etc.
- **Confidence Scoring**: Indicates response reliability

**Example Interaction:**
```
User: "How do you say 'Good morning' in Kinyarwanda?"
Bot: "Mwaramutseho (used until noon for someone you see nearly every day)."
```

### 2. Text-to-Speech Pronunciation

The TTS system provides accurate pronunciation for Kinyarwanda words:

- **Enhanced Pronunciation Rules**: Special handling for Kinyarwanda phonetics
- **Audio Generation**: Real-time audio creation using Google TTS
- **Audio Caching**: Pre-generated audio files for common words
- **Multiple Formats**: Support for WAV and MP3 formats

**Usage:**
```
User: "How does 'Muraho' sound?"
Bot: [Provides audio pronunciation + enhanced phonetic guide]
```

### 3. Web Interface

Modern, responsive web application featuring:

- **Interactive Chat Interface**: Real-time conversation with the AI
- **Audio Playback**: Click-to-hear pronunciation
- **Progress Tracking**: Visual feedback on learning progress
- **Mobile Responsive**: Works seamlessly on all devices

## 🔧 API Endpoints

### Core Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | System health check |
| `/chat` | POST | Main chat endpoint |
| `/pronounce` | POST | Text-to-speech pronunciation |
| `/teach` | POST | Teaching-specific responses |
| `/stats` | GET | System statistics |
| `/audio/<filename>` | GET | Serve audio files |

### Example API Usage

```bash
# Chat with the AI
curl -X POST http://localhost:5001/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "How do you say hello in Kinyarwanda?"}'

# Get pronunciation
curl -X POST http://localhost:5001/pronounce \
  -H "Content-Type: application/json" \
  -d '{"word": "Muraho"}'
```

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

## 📚 Dataset Information

### Training Data

- **Source**: Custom Kinyarwanda learning dataset
- **Format**: JSONL with instruction-following structure
- **Size**: 510 high-quality Q&A pairs
- **Categories**: Greetings, family, numbers, conversation, culture
- **Languages**: English → Kinyarwanda

### Audio Corpus

- **Source**: Common Voice dataset (Kinyarwanda)
- **Size**: 50+ audio clips
- **Format**: MP3/WAV
- **Quality**: High-fidelity pronunciation

## 🛠️ Development

### Environment Setup

```bash
# Create conda environment
conda create -n ml_mac python=3.8
conda activate ml_mac

# Install dependencies
pip install torch torchvision torchaudio
pip install transformers datasets
pip install flask flask-cors
pip install librosa soundfile gtts
```

### Model Training

The teaching model was trained using Jupyter notebooks in the `notebooks/` directory:

- `kinyarwanda_teaching_chatbot.ipynb` - Main training notebook
- `improved_kinyarwanda_tts.ipynb` - TTS system development
- `kinyarwanda_data_exploration.ipynb` - Dataset analysis

### Testing

```bash
# Backend tests
cd backend
python test_backend.py

# Frontend tests
cd frontend
npm test
```

## 🌍 Deployment

### Production Setup

1. **Environment Variables**
   ```bash
   export REACT_APP_API_URL=https://your-api-domain.com
   ```

2. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

3. **Deploy Backend**
   ```bash
   cd backend
   gunicorn -w 4 -b 0.0.0.0:5001 app:app
   ```

## 📈 Performance

### System Requirements

- **Minimum**: 8GB RAM, 4-core CPU
- **Recommended**: 16GB RAM, 8-core CPU (M1/M2 Mac)
- **Storage**: 10GB for models and audio files

### Response Times

- **Teaching Responses**: < 500ms
- **TTS Generation**: < 2s (cached), < 5s (new)

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

### Development Areas

- [ ] Expand vocabulary database
- [ ] Improve pronunciation accuracy
- [ ] Add gamification features
- [ ] Implement user progress tracking
- [ ] Add more language support

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **DigitalUmuganda** for providing the base models
- **MbazaNLP** for Kinyarwanda language resources
- **Common Voice** for audio corpus data
- **Rwanda Language Community** for cultural insights

## 📞 Support

- **Email**: guymaximebakunzi@gmail.com
- **Documentation**: [Wiki](link-to-wiki)
- **Issues**: [GitHub Issues](link-to-issues)

---

<div align="center">

**Made with ❤️ for the Kinyarwanda learning community**

🇷🇼 *"Twigane" - Let's learn together*

</div>

