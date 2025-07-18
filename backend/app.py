#!/usr/bin/env python3
"""
Twigane Backend - Integrated Teaching Model and TTS System
Intelligently routes requests to teaching model or TTS based on question type
"""

import os
import sys
import json
import torch
import pickle
import numpy as np
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from sklearn.metrics.pairwise import cosine_similarity
import re
from datetime import datetime
import logging
from pathlib import Path

# Add models to path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'models', 'kinyarwanda-tts-v2'))

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

class TwiganeBackend:
    def __init__(self):
        self.teaching_model = None
        self.tts_system = None
        self.model_loaded = False
        self.tts_loaded = False
        
        # Load systems
        self.load_teaching_model()
        self.load_tts_system()
    
    def load_teaching_model(self):
        """Load the trained Kinyarwanda teaching model"""
        try:
            model_dir = Path("../models/kinyarwanda_teaching_chatbot_20250715_022707")
            
            if not model_dir.exists():
                logger.error(f"Teaching model directory not found: {model_dir}")
                return
            
            # Load model components
            model_file = model_dir / "kinyarwanda_teaching_model.pt"
            embeddings_file = model_dir / "output_embeddings.npy"
            texts_file = model_dir / "output_texts.pkl"
            metadata_file = model_dir / "output_metadata.pkl"
            preprocessor_file = model_dir / "preprocessor.pkl"
            
            logger.info("Loading teaching model components...")
            
            # Load embeddings and texts
            self.embeddings = np.load(embeddings_file)
            
            with open(texts_file, 'rb') as f:
                self.texts = pickle.load(f)
            
            with open(metadata_file, 'rb') as f:
                self.metadata = pickle.load(f)
            
            with open(preprocessor_file, 'rb') as f:
                self.preprocessor = pickle.load(f)
            
            self.model_loaded = True
            logger.info(f"✅ Teaching model loaded successfully")
            logger.info(f"📊 Model has {len(self.texts)} responses available")
            
        except Exception as e:
            logger.error(f"❌ Failed to load teaching model: {e}")
    
    def load_tts_system(self):
        """Load the TTS system"""
        try:
            # Add the TTS directory to Python path
            tts_dir = Path("../models/kinyarwanda-tts-v2")
            sys.path.append(str(tts_dir))
            
            from improved_tts_api import ImprovedKinyarwandaTTS
            
            # Initialize TTS with model directory
            self.tts_system = ImprovedKinyarwandaTTS(
                audio_dir=str(tts_dir / "audio"),
                results_file=str(tts_dir / "audio_results.json")
            )
            
            self.tts_loaded = True
            logger.info("✅ TTS system loaded successfully")
            
            # Log available words
            available_words = self.tts_system.list_available_words()
            logger.info(f"📊 TTS has {len(available_words)} pre-generated audio files")
            
        except Exception as e:
            logger.error(f"❌ Failed to load TTS system: {e}")
    
    def detect_question_type(self, question):
        """Detect if question is about pronunciation or regular teaching"""
        
        question_lower = question.lower()
        
        # ONLY these specific patterns should trigger pronunciation/TTS
        pronunciation_patterns = [
            # "How does X sound?" 
            r'how does .* sound',
            # "How do you pronounce X?"
            r'how do you pronounce',
            # "How is X pronounced?"
            r'how is .* pronounced',
            # "Can you pronounce X?"
            r'can you pronounce',
            # "Pronounce X"
            r'^pronounce ',
            # "What does X sound like?"
            r'what does .* sound like',
            # "How to pronounce X?"
            r'how to pronounce',
            # "Play audio for X"
            r'play .* audio',
            # "Listen to X"
            r'listen to .*',
            # "Audio for X"
            r'audio for .*',
            # "Hear X"
            r'hear .*',
            # "Play X" (for audio)
            r'play [a-zA-Z]+'
        ]
        
        # Check for specific pronunciation patterns
        for pattern in pronunciation_patterns:
            if re.search(pattern, question_lower):
                return "pronunciation"
        
        # Everything else is teaching
        return "teaching"
    
    def extract_word_for_pronunciation(self, question):
        """Extract the word/phrase the user wants to hear pronounced"""
        
        # Common patterns for pronunciation questions
        patterns = [
            r'how does "([^"]+)" sound',
            r'how do you say "([^"]+)"',
            r'how is "([^"]+)" pronounced',
            r'pronounce "([^"]+)"',
            r'what does "([^"]+)" sound like',
            r'how to say "([^"]+)"',
            r'sound of "([^"]+)"',
            r'audio for "([^"]+)"',
            r'listen to "([^"]+)"',
            r'hear "([^"]+)"',
            r'speak "([^"]+)"',
            r'play "([^"]+)"',
            
            # Without quotes
            r'how does ([a-zA-Z]+) sound',
            r'how do you say ([a-zA-Z]+)',
            r'how is ([a-zA-Z]+) pronounced',
            r'pronounce ([a-zA-Z]+)',
            r'what does ([a-zA-Z]+) sound like',
            r'how to say ([a-zA-Z]+)',
            r'sound of ([a-zA-Z]+)',
            r'audio for ([a-zA-Z]+)',
            r'listen to ([a-zA-Z]+)',
            r'hear ([a-zA-Z]+)',
            r'speak ([a-zA-Z]+)',
            r'play ([a-zA-Z]+)',
        ]
        
        question_lower = question.lower()
        
        for pattern in patterns:
            match = re.search(pattern, question_lower)
            if match:
                return match.group(1).strip()
        
        # If no specific pattern found, try to extract last word
        words = question.split()
        if len(words) > 1:
            return words[-1].strip('.,!?')
        
        return None
    
    def get_teaching_response(self, question):
        """Get response from teaching model"""
        
        if not self.model_loaded:
            # Provide basic responses for common questions
            question_lower = question.lower()
            
            if any(word in question_lower for word in ['hello', 'hi', 'muraho']):
                return {
                    "response": "Muraho! This means 'Hello' in Kinyarwanda. It's a common greeting used throughout the day.",
                    "category": "greetings",
                    "difficulty": "beginner",
                    "confidence": 0.8,
                    "type": "teaching"
                }
            elif any(word in question_lower for word in ['goodbye', 'bye', 'murabeho']):
                return {
                    "response": "Murabeho! This means 'Goodbye' in Kinyarwanda. It's used when parting ways.",
                    "category": "greetings", 
                    "difficulty": "beginner",
                    "confidence": 0.8,
                    "type": "teaching"
                }
            elif any(word in question_lower for word in ['thank', 'murakoze']):
                return {
                    "response": "Murakoze! This means 'Thank you' in Kinyarwanda. It's an important phrase to show appreciation.",
                    "category": "politeness",
                    "difficulty": "beginner", 
                    "confidence": 0.8,
                    "type": "teaching"
                }
            elif any(word in question_lower for word in ['please', 'nyabuneka']):
                return {
                    "response": "Nyabuneka! This means 'Please' in Kinyarwanda. It's used to make polite requests.",
                    "category": "politeness",
                    "difficulty": "beginner",
                    "confidence": 0.8,
                    "type": "teaching"
                }
            else:
                return {
                    "response": "I'm currently in basic mode. I can help with pronunciation questions (like 'How does Muraho sound?') and basic greetings like Muraho (hello), Murabeho (goodbye), Murakoze (thank you), and Nyabuneka (please).",
                    "category": "general",
                    "difficulty": "beginner",
                    "confidence": 0.5,
                    "type": "teaching"
                }
        
        try:
            # Simple similarity-based matching (since we don't have the full model)
            question_lower = question.lower()
            
            # Find best matching response
            best_match_idx = 0
            best_score = 0
            
            for i, metadata in enumerate(self.metadata):
                instruction = metadata.get('instruction', '').lower()
                
                # Simple keyword matching
                common_words = set(question_lower.split()) & set(instruction.split())
                score = len(common_words) / max(len(question_lower.split()), 1)
                
                if score > best_score:
                    best_score = score
                    best_match_idx = i
            
            # Get the best response
            response_text = self.texts[best_match_idx]
            response_metadata = self.metadata[best_match_idx]
            
            return {
                "response": response_text,
                "category": response_metadata.get('category', 'general'),
                "difficulty": response_metadata.get('difficulty_level', 'beginner'),
                "confidence": best_score,
                "type": "teaching"
            }
            
        except Exception as e:
            logger.error(f"Error getting teaching response: {e}")
            return {
                "error": str(e),
                "response": "Sorry, I had trouble understanding your question. Please try again."
            }
    
    def get_pronunciation_response(self, question):
        """Get pronunciation response with audio"""
        
        if not self.tts_loaded:
            return {
                "error": "TTS system not loaded",
                "response": "Sorry, the pronunciation system is not available right now."
            }
        
        try:
            # Extract word to pronounce
            word_to_pronounce = self.extract_word_for_pronunciation(question)
            
            if not word_to_pronounce:
                return {
                    "error": "Could not extract word",
                    "response": "Please specify which word you'd like to hear pronounced. For example: 'How does Muraho sound?'"
                }
            
            # Check if audio exists
            audio_info = self.tts_system.get_audio_for_word(word_to_pronounce)
            
            if not audio_info:
                # Generate audio
                logger.info(f"Generating audio for: {word_to_pronounce}")
                audio_result = self.tts_system.generate_audio_for_word(word_to_pronounce)
                
                if audio_result:
                    audio_info = {
                        'path': audio_result['audio_path'],
                        'duration': audio_result['duration'],
                        'engine': audio_result['engine_used'],
                        'enhanced_text': audio_result['enhanced_text']
                    }
                else:
                    return {
                        "error": "Audio generation failed",
                        "response": f"Sorry, I couldn't generate audio for '{word_to_pronounce}'. Please try again."
                    }
            
            # Create response
            response_text = f"The word '{word_to_pronounce}' is pronounced as '{audio_info['enhanced_text']}'. Listen to the audio to hear how it sounds."
            
            return {
                "response": response_text,
                "word": word_to_pronounce,
                "audio_path": audio_info['path'],
                "duration": audio_info['duration'],
                "engine": audio_info['engine'],
                "enhanced_pronunciation": audio_info['enhanced_text'],
                "type": "pronunciation"
            }
            
        except Exception as e:
            logger.error(f"Error getting pronunciation response: {e}")
            return {
                "error": str(e),
                "response": "Sorry, I had trouble with the pronunciation request. Please try again."
            }

# Initialize backend
backend = TwiganeBackend()

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "teaching_model": backend.model_loaded,
        "tts_system": backend.tts_loaded,
        "available_words": len(backend.tts_system.list_available_words()) if backend.tts_loaded else 0
    })

@app.route('/chat', methods=['POST'])
def chat():
    """Main chat endpoint - routes to teaching model or TTS"""
    try:
        data = request.get_json()
        
        if not data or 'question' not in data:
            return jsonify({
                "error": "Missing question in request",
                "example": {"question": "How do you say hello in Kinyarwanda?"}
            }), 400
        
        question = data['question'].strip()
        
        if not question:
            return jsonify({
                "error": "Empty question provided"
            }), 400
        
        # Detect question type
        question_type = backend.detect_question_type(question)
        
        logger.info(f"Question: {question}")
        logger.info(f"Detected type: {question_type}")
        
        # Route to appropriate system
        if question_type == "pronunciation":
            response = backend.get_pronunciation_response(question)
        else:
            response = backend.get_teaching_response(question)
        
        return jsonify(response)
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}")
        return jsonify({
            "error": "Internal server error",
            "message": str(e)
        }), 500

@app.route('/audio/<path:filename>', methods=['GET'])
def serve_audio(filename):
    """Serve audio files"""
    try:
        audio_dir = Path("../models/kinyarwanda-tts-v2/audio")
        audio_path = audio_dir / filename
        
        if not audio_path.exists():
            return jsonify({"error": "Audio file not found"}), 404
        
        return send_file(str(audio_path), as_attachment=False)
        
    except Exception as e:
        logger.error(f"Error serving audio: {e}")
        return jsonify({"error": "Failed to serve audio"}), 500

@app.route('/pronounce', methods=['POST'])
def pronounce():
    """Dedicated pronunciation endpoint"""
    try:
        data = request.get_json()
        
        if not data or 'word' not in data:
            return jsonify({
                "error": "Missing word in request",
                "example": {"word": "Muraho"}
            }), 400
        
        word = data['word'].strip()
        
        if not word:
            return jsonify({
                "error": "Empty word provided"
            }), 400
        
        # Force pronunciation response
        fake_question = f'How does "{word}" sound?'
        response = backend.get_pronunciation_response(fake_question)
        
        return jsonify(response)
        
    except Exception as e:
        logger.error(f"Error in pronounce endpoint: {e}")
        return jsonify({
            "error": "Internal server error",
            "message": str(e)
        }), 500

@app.route('/teach', methods=['POST'])
def teach():
    """Dedicated teaching endpoint"""
    try:
        data = request.get_json()
        
        if not data or 'question' not in data:
            return jsonify({
                "error": "Missing question in request",
                "example": {"question": "How do you say hello in Kinyarwanda?"}
            }), 400
        
        question = data['question'].strip()
        
        if not question:
            return jsonify({
                "error": "Empty question provided"
            }), 400
        
        # Force teaching response
        response = backend.get_teaching_response(question)
        
        return jsonify(response)
        
    except Exception as e:
        logger.error(f"Error in teach endpoint: {e}")
        return jsonify({
            "error": "Internal server error",
            "message": str(e)
        }), 500

@app.route('/stats', methods=['GET'])
def stats():
    """Get system statistics"""
    try:
        stats = {
            "teaching_model": {
                "loaded": backend.model_loaded,
                "responses_available": len(backend.texts) if backend.model_loaded else 0
            },
            "tts_system": {
                "loaded": backend.tts_loaded,
                "words_available": len(backend.tts_system.list_available_words()) if backend.tts_loaded else 0
            }
        }
        
        if backend.tts_loaded:
            tts_stats = backend.tts_system.get_statistics()
            stats["tts_system"].update(tts_stats)
        
        return jsonify(stats)
        
    except Exception as e:
        logger.error(f"Error getting stats: {e}")
        return jsonify({
            "error": "Failed to get statistics",
            "message": str(e)
        }), 500

if __name__ == '__main__':
    print("🚀 Starting Twigane Backend...")
    print("=" * 50)
    print(f"📊 Teaching Model: {'✅ Loaded' if backend.model_loaded else '❌ Not loaded'}")
    print(f"🎵 TTS System: {'✅ Loaded' if backend.tts_loaded else '❌ Not loaded'}")
    
    if backend.tts_loaded:
        available_words = backend.tts_system.list_available_words()
        print(f"🎯 Available audio: {len(available_words)} words")
    
    print("\n🔗 API Endpoints:")
    print("  POST /chat - Main chat (auto-routes to teaching/TTS)")
    print("  POST /teach - Teaching questions only")
    print("  POST /pronounce - Pronunciation only")
    print("  GET /health - Health check")
    print("  GET /stats - System statistics")
    print("  GET /audio/<filename> - Serve audio files")
    
    print("\n🌐 Starting server on http://localhost:5001")
    print("=" * 50)
    
    app.run(debug=True, host='0.0.0.0', port=5001) 