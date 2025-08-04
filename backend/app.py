#!/usr/bin/env python3
"""
Twigane Backend - Enhanced Teaching Model, TTS System, and Translation Model
Uses models directly from Hugging Face Hub for better portability and deployment
"""

import os
import sys
import json
import torch
import pickle
import numpy as np
from flask import Flask, request, jsonify, send_file, send_from_directory
from flask_cors import CORS
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import re
from datetime import datetime
import logging
from pathlib import Path
import tempfile
import werkzeug
from huggingface_hub import hf_hub_download, snapshot_download
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import requests
from common_voice_audio import CommonVoiceAudioSystem

# Add models to path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'models', 'kinyarwanda-tts'))

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Hugging Face Model Configuration
HF_USERNAME = "Maxime-Bakunzi"  # Your Hugging Face username
TEACHING_MODEL_REPO = f"{HF_USERNAME}/twigane-kinyarwanda-teaching-chatbot"
TRANSLATION_MODEL_REPO = f"{HF_USERNAME}/twigane-en-kin-translation"

# Fallback to original models if HF models not available
FALLBACK_TEACHING_MODEL = "mbazaNLP/Nllb_finetuned_general_en_kin"  # Fallback option
FALLBACK_TRANSLATION_MODEL = "mbazaNLP/Nllb_finetuned_general_en_kin"

# Admin Configuration
ADMIN_EMAIL = "guymaximebakunzi@gmail.com"

# User tracking and analytics data structures
user_sessions = {}
analytics_data = {
    "total_users": 0,
    "chat_interactions": 0,
    "translation_requests": 0,
    "quiz_attempts": 0,
    "pronunciation_requests": 0,
    "daily_active_users": set(),
    "user_activities": {},  # user_email: [activities]
    "user_progress": {},    # user_email: {quiz_scores, chat_count, etc.}
    "system_performance": {
        "avg_response_time": 0,
        "error_count": 0,
        "uptime_start": datetime.now()
    }
}

def track_user_activity(user_email, activity_type, details=None):
    """Track user activity for analytics"""
    if user_email not in analytics_data["user_activities"]:
        analytics_data["user_activities"][user_email] = []
    
    activity = {
        "type": activity_type,
        "timestamp": datetime.now().isoformat(),
        "details": details or {}
    }
    
    analytics_data["user_activities"][user_email].append(activity)
    analytics_data["daily_active_users"].add(user_email)
    
    # Update counters
    if activity_type == "chat":
        analytics_data["chat_interactions"] += 1
    elif activity_type == "translation":
        analytics_data["translation_requests"] += 1
    elif activity_type == "quiz":
        analytics_data["quiz_attempts"] += 1
    elif activity_type == "pronunciation":
        analytics_data["pronunciation_requests"] += 1

def update_user_progress(user_email, metric, value):
    """Update user progress metrics"""
    if user_email not in analytics_data["user_progress"]:
        analytics_data["user_progress"][user_email] = {}
    
    if metric not in analytics_data["user_progress"][user_email]:
        analytics_data["user_progress"][user_email][metric] = 0
    
    analytics_data["user_progress"][user_email][metric] += value

def is_admin(user_email):
    """Check if user is admin"""
    return user_email == ADMIN_EMAIL

class TextPreprocessor:
    """Simple text preprocessor for compatibility with saved models"""
    def __init__(self):
        pass
    
    def preprocess(self, text):
        """Basic text preprocessing"""
        if isinstance(text, str):
            return text.lower().strip()
        return str(text).lower().strip()

def require_admin(func):
    """Decorator to require admin access"""
    from functools import wraps
    
    @wraps(func)
    def admin_wrapper(*args, **kwargs):
        # Try multiple ways to get user email
        data = request.get_json() or {}
        user_email = (
            data.get('user_email') or 
            request.args.get('user_email') or
            request.headers.get('X-User-Email')
        )
        
        if not is_admin(user_email):
            return jsonify({"error": "Admin access required"}), 403
        
        return func(*args, **kwargs)
    return admin_wrapper

class HuggingFaceTranslationModel:
    """Translation model that loads from Hugging Face Hub"""
    
    def __init__(self, model_repo=TRANSLATION_MODEL_REPO):
        self.model_repo = model_repo
        self.model = None
        self.tokenizer = None
        self.loaded = False
    
    def load_model(self):
        """Load translation model from Hugging Face Hub"""
        try:
            logger.info(f"🔄 Loading translation model from HF Hub: {self.model_repo}")
            
            # Try to load the custom model first
            try:
                self.tokenizer = AutoTokenizer.from_pretrained(self.model_repo)
                self.model = AutoModelForSeq2SeqLM.from_pretrained(self.model_repo)
                logger.info(f"✅ Loaded custom translation model from {self.model_repo}")
            except Exception as e:
                logger.warning(f"Custom model not found, using fallback: {e}")
                # Fallback to base model
                self.tokenizer = AutoTokenizer.from_pretrained(FALLBACK_TRANSLATION_MODEL)
                self.model = AutoModelForSeq2SeqLM.from_pretrained(FALLBACK_TRANSLATION_MODEL)
                logger.info(f"✅ Loaded fallback translation model: {FALLBACK_TRANSLATION_MODEL}")
            
            # Move to GPU if available
            if torch.cuda.is_available():
                self.model = self.model.cuda()
                logger.info("🚀 Model moved to GPU")
            
            self.loaded = True
            
        except Exception as e:
            logger.error(f"❌ Failed to load translation model: {e}")
            self.loaded = False
    
    def translate_text(self, text, max_length=512):
        """Translate text from English to Kinyarwanda"""
        if not self.loaded:
            return "Translation model not available"
        
        try:
            # Tokenize input
            inputs = self.tokenizer(
                text, 
                return_tensors="pt", 
                padding=True, 
                truncation=True, 
                max_length=max_length
            )
            
            # Move to GPU if model is on GPU
            if torch.cuda.is_available() and next(self.model.parameters()).is_cuda:
                inputs = {k: v.cuda() for k, v in inputs.items()}
            
            # Generate translation
            with torch.no_grad():
                outputs = self.model.generate(
                    **inputs,
                    max_length=max_length,
                    num_beams=4,
                    early_stopping=True,
                    pad_token_id=self.tokenizer.pad_token_id
                )
            
            # Decode translation
            translation = self.tokenizer.decode(
                outputs[0], 
                skip_special_tokens=True
            )
            
            return translation
            
        except Exception as e:
            logger.error(f"Translation error: {e}")
            return f"Translation error: {str(e)}"
    
    def translate_long_text(self, text, max_chunk_length=400):
        """Translate longer texts by breaking them into chunks"""
        if not self.loaded:
            return "Translation model not available"
        
        # If text is short enough, translate directly
        if len(text.split()) <= 50:
            return self.translate_text(text, max_length=512)
        
        # For longer texts, break into sentences and translate in chunks
        sentences = re.split(r'[.!?]+', text)
        sentences = [s.strip() for s in sentences if s.strip()]
        
        translated_sentences = []
        current_chunk = ""
        
        for sentence in sentences:
            # If adding this sentence would make chunk too long, translate current chunk
            if len(current_chunk.split()) + len(sentence.split()) > 40:
                if current_chunk:
                    translation = self.translate_text(current_chunk, max_length=512)
                    translated_sentences.append(translation)
                    current_chunk = sentence
                else:
                    current_chunk = sentence
            else:
                current_chunk = current_chunk + " " + sentence if current_chunk else sentence
        
        # Translate remaining chunk
        if current_chunk:
            translation = self.translate_text(current_chunk, max_length=512)
            translated_sentences.append(translation)
        
        # Join translated sentences
        return " ".join(translated_sentences)

class TwiganeBackend:
    def __init__(self):
        self.teaching_model = None
        self.common_voice_system = None  # Common Voice system (primary audio source)
        self.translation_model = None
        self.model_loaded = False
        self.common_voice_loaded = False
        self.translation_loaded = False
        self.vectorizer = None
        
        # Load systems
        self.load_teaching_model()
        self.load_common_voice_system()
        self.load_translation_model()
    
    def load_teaching_model(self):
        """Load the teaching model from Hugging Face or local fallback"""
        try:
            logger.info(f"🔄 Loading teaching model from HF Hub: {TEACHING_MODEL_REPO}")
            
            # Download model files to temporary directory
            try:
                cache_dir = snapshot_download(repo_id=TEACHING_MODEL_REPO)
                logger.info(f"✅ Downloaded model to: {cache_dir}")
            except Exception as e:
                logger.error(f"❌ Failed to download custom teaching model: {e}")
                logger.info("📂 Falling back to local model loading...")
                # Fallback to local model if HF model not available
                return self.load_local_fallback()
            
            # Load model components
            try:
                # Load embeddings
                embeddings_path = os.path.join(cache_dir, "output_embeddings.npy")
                if os.path.exists(embeddings_path):
                    self.embeddings = np.load(embeddings_path)
                    logger.info(f"✅ Loaded embeddings: {self.embeddings.shape}")
                
                # Load texts
                texts_path = os.path.join(cache_dir, "output_texts.pkl")
                if os.path.exists(texts_path):
                    with open(texts_path, 'rb') as f:
                        self.texts = pickle.load(f)
                    logger.info(f"✅ Loaded {len(self.texts)} response texts")
                
                # Load metadata
                metadata_path = os.path.join(cache_dir, "output_metadata.pkl")
                if os.path.exists(metadata_path):
                    with open(metadata_path, 'rb') as f:
                        self.metadata = pickle.load(f)
                    logger.info(f"✅ Loaded {len(self.metadata)} metadata entries")
                
                # Load preprocessor
                preprocessor_path = os.path.join(cache_dir, "preprocessor.pkl")
                if os.path.exists(preprocessor_path):
                    try:
                        with open(preprocessor_path, 'rb') as f:
                            self.preprocessor = pickle.load(f)
                        logger.info("✅ Loaded text preprocessor")
                    except Exception as e:
                        logger.warning(f"⚠️ Could not load preprocessor, using fallback: {e}")
                        self.preprocessor = TextPreprocessor()
                else:
                    self.preprocessor = TextPreprocessor()
                
                # Initialize TF-IDF vectorizer
                if hasattr(self, 'texts') and self.texts:
                    self.vectorizer = TfidfVectorizer(
                        max_features=5000,
                        stop_words='english',
                        ngram_range=(1, 2),
                        lowercase=True
                    )
                    # Create a corpus from all instructions for better matching
                    corpus = []
                    for i, metadata in enumerate(self.metadata):
                        instruction = metadata.get('instruction', '')
                        response = self.texts[i] if i < len(self.texts) else ''
                        corpus.append(f"{instruction} {response}")
                    
                    self.tfidf_matrix = self.vectorizer.fit_transform(corpus)
                    logger.info("✅ Initialized TF-IDF vectorizer for enhanced matching")
                
                self.model_loaded = True
                logger.info("✅ Teaching model loaded successfully from Hugging Face")
                logger.info(f"📊 Model has {len(self.texts)} responses available")
                
            except Exception as e:
                logger.error(f"❌ Error loading model components: {e}")
                return self.load_local_fallback()
                
        except Exception as e:
            logger.error(f"❌ Failed to load teaching model from HF: {e}")
            return self.load_local_fallback()
    
    def load_local_fallback(self):
        """Fallback to load local model if HF model is not available"""
        try:
            logger.info("🔄 Loading local fallback teaching model...")
            
            # Try the latest model first
            model_dir = Path("../models/kinyarwanda_teaching_chatbot_20250720_212851")
            if not model_dir.exists():
                model_dir = Path("../models/kinyarwanda_teaching_chatbot_20250715_022707")
                if not model_dir.exists():
                    logger.error("❌ No local teaching model found")
                    return
            
            # Load model components (same as original logic)
            embeddings_file = model_dir / "output_embeddings.npy"
            texts_file = model_dir / "output_texts.pkl"
            metadata_file = model_dir / "output_metadata.pkl"
            preprocessor_file = model_dir / "preprocessor.pkl"
            
            if embeddings_file.exists():
                self.embeddings = np.load(embeddings_file)
                logger.info(f"✅ Loaded local embeddings: {self.embeddings.shape}")
            
            if texts_file.exists():
                with open(texts_file, 'rb') as f:
                    self.texts = pickle.load(f)
                logger.info(f"✅ Loaded {len(self.texts)} local response texts")
            
            if metadata_file.exists():
                with open(metadata_file, 'rb') as f:
                    self.metadata = pickle.load(f)
                logger.info(f"✅ Loaded {len(self.metadata)} local metadata entries")
            
            if preprocessor_file.exists():
                try:
                    with open(preprocessor_file, 'rb') as f:
                        self.preprocessor = pickle.load(f)
                    logger.info("✅ Loaded local text preprocessor")
                except Exception as e:
                    logger.warning(f"⚠️ Could not load local preprocessor, using fallback: {e}")
                    self.preprocessor = TextPreprocessor()
            else:
                self.preprocessor = TextPreprocessor()
            
            # Initialize TF-IDF vectorizer
            if hasattr(self, 'texts') and self.texts:
                self.vectorizer = TfidfVectorizer(
                    max_features=5000,
                    stop_words='english',
                    ngram_range=(1, 2),
                    lowercase=True
                )
                # Create a corpus from all instructions for better matching
                corpus = []
                for i, metadata in enumerate(self.metadata):
                    instruction = metadata.get('instruction', '')
                    response = self.texts[i] if i < len(self.texts) else ''
                    corpus.append(f"{instruction} {response}")
                
                self.tfidf_matrix = self.vectorizer.fit_transform(corpus)
                logger.info("✅ Initialized TF-IDF vectorizer for enhanced matching")
            
            self.model_loaded = True
            logger.info("✅ Local fallback teaching model loaded successfully")
            
        except Exception as e:
            logger.error(f"❌ Failed to load local fallback model: {e}")
    
    def load_common_voice_system(self):
        """Load the Common Voice audio system"""
        try:
            logger.info("🔄 Loading Common Voice audio system...")
            self.common_voice_system = CommonVoiceAudioSystem()
            
            if self.common_voice_system.load_dataset():
                self.common_voice_loaded = True
                stats = self.common_voice_system.get_system_stats()
                logger.info(f"✅ Common Voice system loaded: {stats['total_audio_files']} audio files")
            else:
                self.common_voice_loaded = False
                logger.error("❌ Failed to load Common Voice dataset")
                
        except Exception as e:
            logger.error(f"❌ Failed to load Common Voice system: {e}")
            self.common_voice_loaded = False
    

    def load_translation_model(self):
        """Load the translation model from Hugging Face"""
        try:
            logger.info("🔄 Loading translation model from Hugging Face...")
            self.translation_model = HuggingFaceTranslationModel()
            self.translation_model.load_model()
            
            if self.translation_model.loaded:
                self.translation_loaded = True
                logger.info("✅ Translation model loaded successfully from Hugging Face")
            else:
                self.translation_loaded = False
                logger.error("❌ Translation model failed to load")
                
        except Exception as e:
            logger.error(f"❌ Failed to load translation model: {e}")
            self.translation_loaded = False

    def detect_question_type(self, question):
        """Enhanced detection of question type based on dataset categories"""
        
        question_lower = question.lower()
        
        # Enhanced pronunciation patterns
        pronunciation_patterns = [
            # Direct pronunciation requests
            r'how does .* sound',
            r'how do you pronounce',
            r'how is .* pronounced',
            r'can you pronounce',
            r'^pronounce ',
            r'what does .* sound like',
            r'how to pronounce',
            r'pronunciation of',
            
            # Audio-related requests
            r'play .* audio',
            r'listen to .*',
            r'audio for .*',
            r'hear .*',
            r'play [a-zA-Z]+',
            r'sound of .*',
            
            # Speaking requests
            r'say .* out loud',
            r'speak .*',
            r'voice .*',
        ]
        
        # Check for specific pronunciation patterns
        for pattern in pronunciation_patterns:
            if re.search(pattern, question_lower):
                return "pronunciation"
        
        # Enhanced translation patterns
        translation_patterns = [
            r'^translate',
            r'translate to kinyarwanda',
            r'translate.*:',
            r'how do you say.*in kinyarwanda',
            r'kinyarwanda translation',
            r'english to kinyarwanda'
        ]
        
        for pattern in translation_patterns:
            if re.search(pattern, question_lower):
                return "translation"
        
        # Grammar patterns
        grammar_patterns = [
            r'explain.*class.*noun',
            r'noun.*prefix',
            r'grammar.*rule',
            r'sentence.*structure',
            r'verb.*conjugation',
            r'possessive.*adjective',
            r'how.*grammar.*work',
            r'class \d+ noun',
            r'explain.*grammar'
        ]
        
        for pattern in grammar_patterns:
            if re.search(pattern, question_lower):
                return "grammar"
        
        # Culture patterns
        culture_patterns = [
            r'proverb',
            r'cultural',
            r'tradition',
            r'respect.*kinyarwanda',
            r'polite.*way',
            r'rwandan.*culture',
            r'show.*respect',
            r'cultural.*norm'
        ]
        
        for pattern in culture_patterns:
            if re.search(pattern, question_lower):
                return "culture"
        
        # Quiz patterns
        quiz_patterns = [
            r'^fill in.*blank',
            r'multiple.*choice',
            r'what is.*correct',
            r'choose.*answer',
            r'a\)|b\)|c\)|d\)',
            r'quiz.*question',
            r'test.*knowledge'
        ]
        
        for pattern in quiz_patterns:
            if re.search(pattern, question_lower):
                return "quiz"
        
        # Dialogue patterns
        dialogue_patterns = [
            r'^dialogue',
            r'^role.?play',
            r'conversation.*between',
            r'at the.*restaurant',
            r'asking.*for.*help',
            r'scenario.*',
            r'practice.*conversation'
        ]
        
        for pattern in dialogue_patterns:
            if re.search(pattern, question_lower):
                return "dialogue"
        
        # Numbers/counting patterns
        if any(word in question_lower for word in ['count', 'number', 'one', 'two', 'three', 'four', 'five', 'rimwe', 'kabiri', 'gatatu']):
            return "numbers"
            
        # Family/people patterns
        if any(word in question_lower for word in ['family', 'child', 'father', 'mother', 'brother', 'sister', 'umwana', 'papa', 'mama']):
            return "family"
        
        # Everything else is teaching
        return "teaching"

    def extract_word_for_pronunciation(self, question):
        """Enhanced word extraction for pronunciation"""
        
        # Enhanced patterns for pronunciation questions
        patterns = [
            # With quotes
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
            
            # Without quotes - more flexible
            r'how does ([a-zA-Z\s]+) sound',
            r'how do you say ([a-zA-Z\s]+)',
            r'how is ([a-zA-Z\s]+) pronounced',
            r'pronounce ([a-zA-Z\s]+)',
            r'what does ([a-zA-Z\s]+) sound like',
            r'how to say ([a-zA-Z\s]+)',
            r'sound of ([a-zA-Z\s]+)',
            r'audio for ([a-zA-Z\s]+)',
            r'listen to ([a-zA-Z\s]+)',
            r'hear ([a-zA-Z\s]+)',
            r'speak ([a-zA-Z\s]+)',
            r'play ([a-zA-Z\s]+)',
        ]
        
        question_lower = question.lower()
        
        for pattern in patterns:
            match = re.search(pattern, question_lower)
            if match:
                word = match.group(1).strip()
                # Clean up common words that shouldn't be pronounced
                stop_words = ['the', 'a', 'an', 'is', 'are', 'was', 'were', 'in', 'on', 'at']
                words = word.split()
                cleaned_words = [w for w in words if w not in stop_words]
                return ' '.join(cleaned_words) if cleaned_words else word
        
        # If no specific pattern found, try to extract last meaningful word
        words = question.split()
        if len(words) > 1:
            last_word = words[-1].strip('.,!?')
            if len(last_word) > 2:  # Avoid very short words
                return last_word
        
        return None

    def get_enhanced_teaching_response(self, question):
        """Enhanced teaching response using improved matching with dataset categories"""
        
        if not self.model_loaded or not hasattr(self, 'texts'):
            return self.get_fallback_response(question)
        
        try:
            # Detect question category for better routing
            question_type = self.detect_question_type(question)
            
            # Use TF-IDF for better semantic matching
            if self.vectorizer:
                question_vector = self.vectorizer.transform([question])
                similarities = cosine_similarity(question_vector, self.tfidf_matrix).flatten()
                
                # Find best matches based on category if detected
                if question_type != "teaching":
                    # Filter by category if available in metadata
                    category_filtered_indices = []
                    for i, metadata in enumerate(self.metadata):
                        meta_category = metadata.get('category', '').lower()
                        meta_tags = [tag.lower() for tag in metadata.get('tags', [])]
                        
                        # Check if this response matches the detected question type
                        if (question_type in meta_category or 
                            question_type in meta_tags or
                            any(question_type in tag for tag in meta_tags)):
                            category_filtered_indices.append(i)
                    
                    if category_filtered_indices:
                        # Use only category-filtered responses
                        filtered_similarities = np.array([similarities[i] for i in category_filtered_indices])
                        best_filtered_idx = np.argmax(filtered_similarities)
                        best_match_idx = category_filtered_indices[best_filtered_idx]
                        best_score = filtered_similarities[best_filtered_idx]
                    else:
                        best_match_idx = np.argmax(similarities)
                        best_score = similarities[best_match_idx]
                else:
                    best_match_idx = np.argmax(similarities)
                    best_score = similarities[best_match_idx]
                
                # If similarity is too low, try keyword matching
                if best_score < 0.1:
                    best_match_idx, best_score = self.fallback_keyword_matching(question, question_type)
            else:
                best_match_idx, best_score = self.fallback_keyword_matching(question, question_type)
            
            # Get the best response
            response_text = self.texts[best_match_idx]
            response_metadata = self.metadata[best_match_idx] if best_match_idx < len(self.metadata) else {}
            
            # Enhanced response formatting based on category
            formatted_response = self.format_enhanced_response(response_text, response_metadata, question_type)
            
            return {
                "response": formatted_response,
                "category": response_metadata.get('category', question_type),
                "difficulty": response_metadata.get('difficulty_level', 'intermediate'),
                "confidence": min(best_score * 2, 1.0),  # Scale confidence
                "type": "teaching",
                "source": "enhanced_model",
                "detected_type": question_type
            }
            
        except Exception as e:
            logger.error(f"Error in enhanced teaching response: {e}")
            return self.get_fallback_response(question)

    def fallback_keyword_matching(self, question, question_type="teaching"):
        """Enhanced fallback keyword-based matching with category awareness"""
        question_lower = question.lower()
        best_match_idx = 0
        best_score = 0
        
        for i, metadata in enumerate(self.metadata):
            instruction = metadata.get('instruction', '').lower()
            response = self.texts[i].lower() if i < len(self.texts) else ''
            meta_category = metadata.get('category', '').lower()
            meta_tags = [tag.lower() for tag in metadata.get('tags', [])]
            
            # Calculate keyword overlap
            question_words = set(question_lower.split())
            instruction_words = set(instruction.split())
            response_words = set(response.split()[:20])  # First 20 words of response
            
            # Score based on overlap with instruction and response
            instruction_overlap = len(question_words & instruction_words)
            response_overlap = len(question_words & response_words)
            
            # Base score
            score = (instruction_overlap * 2 + response_overlap) / max(len(question_words), 1)
            
            # Boost score if category matches detected question type
            if question_type != "teaching":
                if (question_type == meta_category or 
                    question_type in meta_tags or
                    any(question_type in tag for tag in meta_tags)):
                    score *= 1.5  # 50% boost for category match
            
            # Boost for exact phrase matches
            if any(phrase in instruction for phrase in question_lower.split() if len(phrase) > 3):
                score *= 1.2
            
            if score > best_score:
                best_score = score
                best_match_idx = i
        
        return best_match_idx, best_score

    def format_enhanced_response(self, response_text, metadata, question_type):
        """Format the teaching response for better presentation based on category"""
        
        # Clean up the response
        formatted_response = response_text.strip()
        
        # Ensure proper sentence structure
        if not formatted_response.endswith('.'):
            formatted_response += '.'
        
        # Add specific category-based enhancements
        if question_type == "pronunciation":
            if "sound" in formatted_response.lower():
                formatted_response += " Listen to the audio to hear how it sounds."
            elif "pronounce" in formatted_response.lower():
                formatted_response += " You can ask 'How does [word] sound?' to hear it."
        
        if question_type == "translation":
            if "translate" in formatted_response.lower():
                formatted_response += " You can ask 'How do you say [word] in Kinyarwanda?' to translate it."
        
        if question_type == "grammar":
            if "explain" in formatted_response.lower():
                formatted_response += " You can ask 'How does [word] work?' to learn more."
        
        if question_type == "culture":
            if "respect" in formatted_response.lower():
                formatted_response += " You can ask 'How do you show respect?' to learn more."
        
        if question_type == "quiz":
            if "quiz" in formatted_response.lower():
                formatted_response += " You can ask 'What is the correct answer?' to check your knowledge."
        
        if question_type == "dialogue":
            if "dialogue" in formatted_response.lower():
                formatted_response += " You can ask 'How do you start a conversation?' to practice."
        
        if question_type == "numbers":
            if "number" in formatted_response.lower():
                formatted_response += " You can ask 'How do you count?' to learn more."
        
        if question_type == "family":
            if "family" in formatted_response.lower():
                formatted_response += " You can ask 'How do you address your family?' to learn more."
        
        return formatted_response

    def get_fallback_response(self, question):
        """Enhanced fallback responses for when model isn't loaded"""
        
        question_lower = question.lower()
        
        # Enhanced greeting responses
        if any(word in question_lower for word in ['hello', 'hi', 'muraho', 'greeting']):
            return {
                "response": "Muraho! This is the most common greeting in Kinyarwanda, meaning 'Hello'. You can use it at any time of day. Other greetings include 'Mwaramutse' (good morning) and 'Mwiriwe' (good afternoon/evening).",
                "category": "greetings",
                "difficulty": "beginner",
                "confidence": 0.9,
                "type": "teaching"
            }
        
        # Enhanced goodbye responses
        elif any(word in question_lower for word in ['goodbye', 'bye', 'murabeho', 'farewell']):
            return {
                "response": "Murabeho! This means 'Goodbye' in Kinyarwanda. You can also say 'Tugire amahoro' which means 'Let's have peace' - a more formal way to say goodbye.",
                "category": "greetings",
                "difficulty": "beginner", 
                "confidence": 0.9,
                "type": "teaching"
            }
        
        # Enhanced thank you responses
        elif any(word in question_lower for word in ['thank', 'murakoze', 'appreciation']):
            return {
                "response": "Murakoze! This means 'Thank you' in Kinyarwanda. You can also say 'Murakoze cyane' which means 'Thank you very much' for expressing greater appreciation.",
                "category": "greetings",
                "difficulty": "beginner",
                "confidence": 0.9,
                "type": "teaching"
            }
        
        # General response
        else:
            return {
                "response": "Muraho! I'm here to help you learn Kinyarwanda. You can ask me about vocabulary, grammar, pronunciation, culture, or how to say things in Kinyarwanda. What would you like to learn?",
                "category": "general",
                "difficulty": "beginner",
                "confidence": 0.5,
                "type": "teaching"
            }

    def get_teaching_response(self, question):
        """Main teaching response - routes to enhanced or fallback"""
        return self.get_enhanced_teaching_response(question)

    def get_pronunciation_response(self, question):
        """Get pronunciation response with audio using Common Voice dataset only"""
        
        # Extract word/phrase to pronounce
        user_text = self.extract_word_for_pronunciation(question)
        if not user_text:
            user_text = question  # Use full question if no specific word extracted
        
        # Check if Common Voice system is available
        if not self.common_voice_loaded:
            return {
                "response": "Native speaker audio system is not available right now. Please try again later.",
                "word": user_text,
                "type": "pronunciation",
                "confidence": 0.1,
                "source": "none"
            }
        
        # Try to find audio in Common Voice system
        audio_info = self.common_voice_system.find_audio_for_text(user_text)
        
        if audio_info:
            # Found matching audio in Common Voice
            sentence = audio_info['original_sentence']
            audio_filename = audio_info['audio_filename']
            
            # Get teaching response about the word/phrase
            teaching_response = self.get_teaching_response(f"What does {sentence} mean?")
            
            return {
                "response": f"Here's how to pronounce '{sentence}' in Kinyarwanda (from native speaker):",
                "audio_file": audio_filename,
                "audio_url": f"/common-voice-audio/{audio_filename}",
                "word": sentence,
                "type": "pronunciation",
                "teaching_info": teaching_response.get('response', ''),
                "confidence": 0.98,
                "source": "common_voice",
                "votes": {
                    "up": audio_info.get('up_votes', 0),
                    "down": audio_info.get('down_votes', 0)
                }
            }
        
        # No audio available - provide helpful response with suggestions
        available_count = len(self.common_voice_system.get_available_sentences())
        available_sentences = self.common_voice_system.get_available_sentences()
        
        # Try to suggest similar words
        suggestions = []
        user_lower = user_text.lower()
        for sentence in available_sentences[:5]:  # Show first 5 as examples
            if any(word in sentence.lower() for word in user_lower.split()) or \
               any(word in user_lower for word in sentence.lower().split()):
                suggestions.append(sentence)
        
        suggestion_text = ""
        if suggestions:
            suggestion_text = f" Try these similar words: {', '.join(suggestions[:3])}"
        
        return {
            "response": f"I don't have native speaker audio for '{user_text}' yet. I currently have {available_count} words and phrases with native recordings.{suggestion_text} Click the 🎙️ button in the header to browse all available words!",
            "word": user_text,
            "type": "pronunciation",
            "confidence": 0.2,
            "source": "none",
            "available_count": available_count,
            "suggestions": suggestions[:3]
        }

# Initialize Flask app and backend
app = Flask(__name__)

# Configure CORS for production
if os.environ.get('FLASK_ENV') == 'production':
    # In production, only allow your frontend domain
    # Update this URL when you deploy your frontend
    CORS(app, origins=["https://your-frontend-domain.netlify.app"])
else:
    # In development, allow all origins
    CORS(app)

# Initialize backend
backend = TwiganeBackend()

# Import quiz system
try:
    from quiz_data import create_random_quiz, score_quiz, get_quiz_categories, get_quiz_difficulties
    quiz_loaded = True
    logger.info("✅ Quiz system loaded successfully")
except ImportError as e:
    logger.error(f"❌ Failed to load quiz system: {e}")
    quiz_loaded = False

# API Routes (keeping all the original routes)
@app.route('/health', methods=['GET'])
def health_check():
    """System health check endpoint"""
    
    system_status = {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "components": {
            "teaching_model": "loaded" if backend.model_loaded else "error",
            "common_voice_audio": "loaded" if backend.common_voice_loaded else "error", 
            "translation_model": "loaded" if backend.translation_loaded else "error",
            "quiz_system": "loaded" if quiz_loaded else "error"
        },
        "model_info": {
            "teaching_responses": len(backend.texts) if backend.model_loaded and hasattr(backend, 'texts') else 0,
            "native_audio_words": len(backend.common_voice_system.get_available_sentences()) if backend.common_voice_loaded else 0,
            "translation_source": "Hugging Face" if backend.translation_loaded else "unavailable"
        },
        "performance": {
            "uptime_seconds": (datetime.now() - analytics_data["system_performance"]["uptime_start"]).total_seconds(),
            "total_interactions": analytics_data["chat_interactions"] + analytics_data["translation_requests"],
            "daily_active_users": len(analytics_data["daily_active_users"])
        }
    }
    
    # Determine overall health
    all_critical_loaded = backend.model_loaded and backend.translation_loaded
    system_status["status"] = "healthy" if all_critical_loaded else "degraded"
    
    return jsonify(system_status)

@app.route('/stats', methods=['GET'])
def get_stats():
    """Get system statistics"""
    
    stats = {
        "model_status": {
            "teaching_model": backend.model_loaded,
            "common_voice_audio": backend.common_voice_loaded,
            "translation_model": backend.translation_loaded,
            "quiz_system": quiz_loaded
        },
        "model_details": {
            "teaching_model_name": "Twigane Enhanced Teaching Model (HF)",
            "translation_model_name": "mbazaNLP/Nllb_finetuned_general_en_kin (HF)",
            "audio_system_name": "Mozilla Common Voice (Native Speakers)",
            "total_responses": len(backend.texts) if backend.model_loaded and hasattr(backend, 'texts') else 0,
            "native_audio_available": len(backend.common_voice_system.get_available_sentences()) if backend.common_voice_loaded else 0
        },
        "system_performance": {
            "uptime_hours": round((datetime.now() - analytics_data["system_performance"]["uptime_start"]).total_seconds() / 3600, 2),
            "total_requests": analytics_data["chat_interactions"] + analytics_data["translation_requests"] + analytics_data["quiz_attempts"],
            "active_users_today": len(analytics_data["daily_active_users"])
        }
    }
    
    return jsonify(stats)

@app.route('/chat', methods=['POST'])
def chat():
    """Enhanced chat endpoint with intelligent routing"""
    
    try:
        data = request.get_json()
        question = data.get('question', '').strip()
        user_email = data.get('user_email', 'anonymous')
        
        if not question:
            return jsonify({"error": "No question provided"}), 400
        
        # Track user activity
        track_user_activity(user_email, "chat", {"question": question[:100]})
        
        # Detect question type and route appropriately
        question_type = backend.detect_question_type(question)
        logger.info(f"Detected type: {question_type}")
        
        if question_type == "pronunciation":
            response = backend.get_pronunciation_response(question)
            track_user_activity(user_email, "pronunciation", {"word": question})
            update_user_progress(user_email, "pronunciation_count", 1)
            
        elif question_type == "translation":
            if backend.translation_loaded:
                # Extract text to translate from question
                import re
                translate_match = re.search(r'translate.*?[:.]?\s*(.+)', question, re.IGNORECASE)
                if translate_match:
                    text_to_translate = translate_match.group(1).strip()
                    translation_result = backend.translation_model.translate_text(text_to_translate)
                    
                    response = {
                        "response": f"Translation: {translation_result}",
                        "category": "translation", 
                        "difficulty": "intermediate",
                        "confidence": 0.9,
                        "type": "translation",
                        "original_text": text_to_translate,
                        "translated_text": translation_result
                    }
                    
                    track_user_activity(user_email, "translation", {"text": text_to_translate})
                    update_user_progress(user_email, "translation_count", 1)
                else:
                    response = backend.get_teaching_response(question)
            else:
                response = backend.get_teaching_response(question)
                
        elif question_type in ["quiz", "dialogue", "grammar", "culture", "numbers", "family"]:
            response = backend.get_teaching_response(question)
            
        else:
            response = backend.get_teaching_response(question)
        
        # Update user progress
        update_user_progress(user_email, "chat_count", 1)
        
        return jsonify(response)
        
    except Exception as e:
        logger.error(f"Chat error: {e}")
        return jsonify({
            "error": "I'm having trouble processing your question right now. Please try again.",
            "type": "error"
        }), 500

@app.route('/translate', methods=['POST'])
def translate_text():
    """Translate text from English to Kinyarwanda using HF model"""
    
    try:
        data = request.get_json()
        text = data.get('text', '').strip()
        user_email = data.get('user_email', 'anonymous')
        
        if not text:
            return jsonify({"error": "No text provided for translation"}), 400
        
        if not backend.translation_loaded:
            return jsonify({"error": "Translation model not available"}), 503
        
        # Track user activity
        track_user_activity(user_email, "translation", {"text": text[:100]})
        
        # Determine if it's a long text
        if len(text.split()) > 50:
            translated_text = backend.translation_model.translate_long_text(text)
            translation_type = "long_text"
        else:
            translated_text = backend.translation_model.translate_text(text)
            translation_type = "short_text"
        
        # Update user progress
        update_user_progress(user_email, "translation_count", 1)
        
        return jsonify({
            "original_text": text,
            "translated_text": translated_text,
            "type": translation_type,
            "word_count": len(text.split()),
            "source_language": "English",
            "target_language": "Kinyarwanda",
            "model": "Hugging Face NLLB"
        })
        
    except Exception as e:
        logger.error(f"Translation error: {e}")
        return jsonify({"error": "Translation failed. Please try again."}), 500

@app.route('/quiz/categories', methods=['GET'])
def quiz_categories():
    """Get available quiz categories"""
    try:
        if not quiz_loaded:
            return jsonify({"error": "Quiz system not available"}), 503
        
        categories = get_quiz_categories()
        return jsonify({"categories": categories})
    except Exception as e:
        logger.error(f"Quiz categories error: {e}")
        return jsonify({"error": "Failed to get quiz categories"}), 500

@app.route('/quiz/generate', methods=['POST'])
def generate_quiz():
    """Generate a random quiz"""
    try:
        if not quiz_loaded:
            return jsonify({"error": "Quiz system not available"}), 503
        
        data = request.get_json()
        category = data.get('category', 'mixed')
        difficulty = data.get('difficulty', 'mixed')
        num_questions = data.get('num_questions', 10)
        user_email = data.get('user_email', 'anonymous')
        
        # Track user activity
        track_user_activity(user_email, "quiz", {"category": category, "difficulty": difficulty})
        
        quiz = create_random_quiz(category, difficulty, num_questions)
        return jsonify(quiz)
        
    except Exception as e:
        logger.error(f"Quiz generation error: {e}")
        return jsonify({"error": "Failed to generate quiz"}), 500

@app.route('/quiz/submit', methods=['POST'])
def submit_quiz():
    """Submit quiz answers and get score"""
    try:
        if not quiz_loaded:
            return jsonify({"error": "Quiz system not available"}), 503
        
        data = request.get_json()
        quiz_questions = data.get('questions', [])
        user_answers = data.get('answers', [])
        user_email = data.get('user_email', 'anonymous')
        
        # Calculate score
        results = score_quiz(quiz_questions, user_answers)
        
        # Track user activity and progress
        track_user_activity(user_email, "quiz_completion", {
            "score": results['percentage'],
            "questions": len(quiz_questions)
        })
        update_user_progress(user_email, "quiz_score_total", results['percentage'])
        update_user_progress(user_email, "quiz_attempts", 1)
        
        return jsonify(results)
        
    except Exception as e:
        logger.error(f"Quiz submission error: {e}")
        return jsonify({"error": "Failed to score quiz"}), 500

@app.route('/quiz/random', methods=['GET'])
def random_quiz():
    """Get a single random question"""
    try:
        if not quiz_loaded:
            return jsonify({"error": "Quiz system not available"}), 503
        
        quiz = create_random_quiz('mixed', 'mixed', 1)
        if quiz['questions']:
            return jsonify(quiz['questions'][0])
        else:
            return jsonify({"error": "No questions available"}), 404
            
    except Exception as e:
        logger.error(f"Random quiz error: {e}")
        return jsonify({"error": "Failed to get random question"}), 500

# Admin Analytics Routes
@app.route('/admin/analytics', methods=['GET'])
@require_admin
def admin_analytics():
    """Get comprehensive analytics for admin dashboard"""
    try:
        total_users = len(analytics_data["user_activities"])
        active_users = len(analytics_data["daily_active_users"])
        
        # Calculate average scores
        total_quiz_score = sum(
            progress.get("quiz_score_total", 0) 
            for progress in analytics_data["user_progress"].values()
        )
        total_quiz_attempts = sum(
            progress.get("quiz_attempts", 0) 
            for progress in analytics_data["user_progress"].values()
        )
        avg_quiz_score = total_quiz_score / max(total_quiz_attempts, 1)
        
        analytics = {
            "overview": {
                "total_users": total_users,
                "active_users_today": active_users,
                "total_interactions": analytics_data["chat_interactions"],
                "total_translations": analytics_data["translation_requests"],
                "total_quiz_attempts": analytics_data["quiz_attempts"],
                "avg_quiz_score": round(avg_quiz_score, 1)
            },
            "system_health": {
                "teaching_model": backend.model_loaded,
                "translation_model": backend.translation_loaded,
                "common_voice_audio": backend.common_voice_loaded,
                "quiz_system": quiz_loaded,
                "uptime_hours": round((datetime.now() - analytics_data["system_performance"]["uptime_start"]).total_seconds() / 3600, 2)
            },
            "user_engagement": {
                "daily_active": active_users,
                "avg_interactions_per_user": round(analytics_data["chat_interactions"] / max(total_users, 1), 1),
                "most_used_features": {
                    "chat": analytics_data["chat_interactions"],
                    "translation": analytics_data["translation_requests"],
                    "quiz": analytics_data["quiz_attempts"],
                    "pronunciation": analytics_data["pronunciation_requests"]
                }
            }
        }
        
        return jsonify(analytics)
        
    except Exception as e:
        logger.error(f"Admin analytics error: {e}")
        return jsonify({"error": "Failed to get analytics"}), 500

@app.route('/admin/users', methods=['GET'])
@require_admin 
def admin_users():
    """Get detailed user information for admin"""
    try:
        users = []
        for email, activities in analytics_data["user_activities"].items():
            progress = analytics_data["user_progress"].get(email, {})
            
            user_info = {
                "email": email,
                "total_activities": len(activities),
                "last_activity": activities[-1]["timestamp"] if activities else None,
                "chat_count": progress.get("chat_count", 0),
                "translation_count": progress.get("translation_count", 0),
                "quiz_attempts": progress.get("quiz_attempts", 0),
                "pronunciation_count": progress.get("pronunciation_count", 0),
                "avg_quiz_score": round(
                    progress.get("quiz_score_total", 0) / max(progress.get("quiz_attempts", 1), 1), 1
                ) if progress.get("quiz_attempts", 0) > 0 else 0
            }
            users.append(user_info)
        
        # Sort by total activities
        users.sort(key=lambda x: x["total_activities"], reverse=True)
        
        return jsonify({"users": users, "total_count": len(users)})
        
    except Exception as e:
        logger.error(f"Admin users error: {e}")
        return jsonify({"error": "Failed to get user data"}), 500

@app.route('/learner/dashboard', methods=['GET'])
def learner_dashboard():
    """Get personalized dashboard data for learners"""
    try:
        user_email = request.args.get('user_email')
        if not user_email:
            return jsonify({"error": "User email required"}), 400
        
        activities = analytics_data["user_activities"].get(user_email, [])
        progress = analytics_data["user_progress"].get(user_email, {})
        
        # Calculate learning streak (simplified)
        recent_activities = [a for a in activities if 
                           (datetime.now() - datetime.fromisoformat(a["timestamp"])).days <= 7]
        
        # Generate quiz scores from activities
        quiz_scores = []
        for activity in activities:
            if activity.get("type") == "quiz_completion":
                quiz_scores.append({
                    "date": activity["timestamp"][:10],
                    "score": activity.get("details", {}).get("score", 0),
                    "questions": activity.get("details", {}).get("questions", 0)
                })
        
        # Generate recommendations based on progress
        recommendations = []
        if progress.get("chat_count", 0) < 5:
            recommendations.append("Try having more conversations to improve your skills")
        if progress.get("translation_count", 0) < 10:
            recommendations.append("Practice translation to build vocabulary")
        if progress.get("quiz_attempts", 0) < 3:
            recommendations.append("Take quizzes to test your knowledge")
        if progress.get("pronunciation_count", 0) < 5:
            recommendations.append("Practice pronunciation with audio features")
        
        dashboard_data = {
            "overview": {
                "total_lessons": progress.get("chat_count", 0),
                "translations_made": progress.get("translation_count", 0),
                "quizzes_taken": progress.get("quiz_attempts", 0),
                "pronunciations_practiced": progress.get("pronunciation_count", 0),
                "learning_streak": len(set(a["timestamp"][:10] for a in recent_activities))  # Unique days
            },
            "progress": {
                "quiz_average": round(
                    progress.get("quiz_score_total", 0) / max(progress.get("quiz_attempts", 1), 1), 1
                ) if progress.get("quiz_attempts", 0) > 0 else 0,
                "total_interactions": len(activities),
                "this_week_activities": len(recent_activities),
                "quiz_scores": quiz_scores[-10:]  # Last 10 quiz scores
            },
            "achievements": [
                {"name": "First Steps", "earned": progress.get("chat_count", 0) >= 1},
                {"name": "Translator", "earned": progress.get("translation_count", 0) >= 5},
                {"name": "Quiz Master", "earned": progress.get("quiz_attempts", 0) >= 3},
                {"name": "Pronunciation Pro", "earned": progress.get("pronunciation_count", 0) >= 10}
            ],
            "recommendations": recommendations,
            "recent_activities": activities[-5:] if activities else []  # Last 5 activities
        }
        
        return jsonify(dashboard_data)
        
    except Exception as e:
        logger.error(f"Learner dashboard error: {e}")
        return jsonify({"error": "Failed to get dashboard data"}), 500



@app.route('/common-voice-audio/<filename>')
def serve_common_voice_audio(filename):
    """Serve Common Voice audio files for pronunciation"""
    try:
        if backend.common_voice_loaded:
            audio_dir = backend.common_voice_system.clips_path
            return send_from_directory(str(audio_dir), filename)
        else:
            return jsonify({"error": "Common Voice audio system not available"}), 503
    except Exception as e:
        logger.error(f"Common Voice audio serving error: {e}")
        return jsonify({"error": "Common Voice audio file not found"}), 404

@app.route('/available-sentences')
def get_available_sentences():
    """Get list of available sentences with audio recordings"""
    try:
        if not backend.common_voice_loaded:
            return jsonify({
                "error": "Common Voice system not available",
                "sentences": [],
                "categories": {},
                "total": 0
            }), 503
        
        sentences = backend.common_voice_system.get_available_sentences()
        categories = backend.common_voice_system.get_sentences_by_category()
        stats = backend.common_voice_system.get_system_stats()
        
        return jsonify({
            "sentences": sentences,
            "categories": categories,
            "total": len(sentences),
            "stats": stats
        })
        
    except Exception as e:
        logger.error(f"Available sentences error: {e}")
        return jsonify({
            "error": "Failed to get available sentences",
            "sentences": [],
            "categories": {},
            "total": 0
        }), 500

if __name__ == '__main__':
    print("\n" + "="*60)
    print("🚀 TWIGANE BACKEND WITH HUGGING FACE MODELS")
    print("="*60)
    print("🤖 Features:")
    print("   📚 Teaching Model (from Hugging Face)")
    print("   🔄 Translation Model (from Hugging Face)")  
    print("   🎙️ Common Voice Audio (native speaker recordings)")
    print("   📊 Analytics & Admin Dashboard")
    print("   🧪 Quiz System")
    print("="*60)
    print("🌐 API Endpoints:")
    print("   POST /chat - Chat with teaching model")
    print("   POST /translate - English to Kinyarwanda translation")
    print("   GET /health - System health check")
    print("   GET /stats - System statistics")
    print("   GET /quiz/* - Quiz endpoints")
    print("   GET /admin/* - Admin analytics (admin only)")
    print("   GET /learner/dashboard - Learner dashboard")
    print("   GET /common-voice-audio/<filename> - Native speaker audio")
    print("   GET /available-sentences - List of available sentences")
    print("="*60)
    print("⚙️  Configuration:")
    print(f"   🤗 Teaching Model: {TEACHING_MODEL_REPO}")
    print(f"   🔄 Translation Model: {TRANSLATION_MODEL_REPO}")
    print(f"   👨‍💼 Admin Email: {ADMIN_EMAIL}")
    print("="*60)
    
    # Start server - production vs development
    port = int(os.environ.get('PORT', 5001))
    debug = os.environ.get('FLASK_ENV') != 'production'
    
    if debug:
        print("🔧 Running in development mode")
        app.run(host='0.0.0.0', port=port, debug=True)
    else:
        print("🚀 Running in production mode")
        app.run(host='0.0.0.0', port=port, debug=False) 