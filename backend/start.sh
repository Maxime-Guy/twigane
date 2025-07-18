#!/bin/bash

# Twigane Backend Startup Script
echo "🚀 Starting Twigane Backend..."
echo "=" * 50

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if requirements are installed
if ! python3 -c "import flask, torch, numpy, librosa" &> /dev/null; then
    echo "📦 Installing required packages..."
    pip install -r requirements.txt
    
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install requirements. Please check your pip installation."
        exit 1
    fi
fi

# Check if models exist
if [ ! -d "../models/kinyarwanda_teaching_chatbot_20250715_022707" ]; then
    echo "❌ Teaching model not found. Please ensure the model is in the correct directory."
    exit 1
fi

if [ ! -d "../models/kinyarwanda-tts-v2" ]; then
    echo "❌ TTS system not found. Please ensure the TTS system is in the correct directory."
    exit 1
fi

echo "✅ All dependencies and models are available"
echo "🌐 Starting backend server on http://localhost:5001"
echo "📋 Available endpoints:"
echo "  - POST /chat (main chat endpoint)"
echo "  - POST /teach (teaching only)"
echo "  - POST /pronounce (pronunciation only)"
echo "  - GET /health (health check)"
echo "  - GET /stats (system statistics)"
echo "  - GET /audio/<filename> (serve audio files)"
echo ""
echo "🔧 To test the backend, run: python test_backend.py"
echo "=" * 50

# Start the backend
python3 app.py 