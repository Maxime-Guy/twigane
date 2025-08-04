#!/usr/bin/env python3
"""
Common Voice Audio System for Twigane
Replaces gTTS with real recorded audio clips from Common Voice dataset
"""

import os
import csv
import logging
from pathlib import Path
from typing import Dict, List, Optional, Tuple
from difflib import SequenceMatcher
import re

logger = logging.getLogger(__name__)

class CommonVoiceAudioSystem:
    """
    System to handle Common Voice audio clips for pronunciation
    """
    
    def __init__(self, 
                 dataset_path: str = "../datasets/cv-corpus-21.0-delta-2025-03-14/rw",
                 clips_subdir: str = "clips",
                 tsv_filename: str = "other.tsv"):
        """
        Initialize the Common Voice Audio System
        
        Args:
            dataset_path: Path to the Common Voice dataset directory
            clips_subdir: Subdirectory containing audio clips
            tsv_filename: Name of the TSV file containing sentence mappings
        """
        self.dataset_path = Path(dataset_path)
        self.clips_path = self.dataset_path / clips_subdir
        self.tsv_file = self.dataset_path / tsv_filename
        
        # Mapping from sentence to audio file info
        self.sentence_to_audio: Dict[str, Dict] = {}
        
        # List of all available sentences (for UI display)
        self.available_sentences: List[str] = []
        
        # Flag to track if system is loaded
        self.loaded = False
        
        logger.info(f"Initializing Common Voice Audio System")
        logger.info(f"Dataset path: {self.dataset_path}")
        logger.info(f"Clips path: {self.clips_path}")
        logger.info(f"TSV file: {self.tsv_file}")
        
    def load_dataset(self) -> bool:
        """
        Load the Common Voice dataset and create mappings
        
        Returns:
            bool: True if successfully loaded, False otherwise
        """
        try:
            if not self.tsv_file.exists():
                logger.error(f"TSV file not found: {self.tsv_file}")
                return False
                
            if not self.clips_path.exists():
                logger.error(f"Clips directory not found: {self.clips_path}")
                return False
            
            logger.info("Loading Common Voice dataset...")
            
            with open(self.tsv_file, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file, delimiter='\t')
                
                for row in reader:
                    sentence = row.get('sentence', '').strip()
                    path = row.get('path', '').strip()
                    
                    if sentence and path:
                        # Normalize sentence for better matching
                        normalized_sentence = self._normalize_sentence(sentence)
                        
                        # Full path to the audio file
                        audio_file_path = self.clips_path / path
                        
                        # Only add if the audio file actually exists
                        if audio_file_path.exists():
                            self.sentence_to_audio[normalized_sentence] = {
                                'original_sentence': sentence,
                                'audio_filename': path,
                                'audio_path': str(audio_file_path),
                                'sentence_id': row.get('sentence_id', ''),
                                'up_votes': int(row.get('up_votes', 0)),
                                'down_votes': int(row.get('down_votes', 0))
                            }
                            
                            self.available_sentences.append(sentence)
                        else:
                            logger.warning(f"Audio file not found: {audio_file_path}")
            
            # Sort available sentences for UI display
            self.available_sentences.sort()
            
            self.loaded = True
            logger.info(f"✅ Successfully loaded {len(self.sentence_to_audio)} audio mappings")
            logger.info(f"📊 Available sentences: {len(self.available_sentences)}")
            
            # Log some examples
            if self.available_sentences:
                logger.info(f"Example sentences: {self.available_sentences[:5]}")
            
            return True
            
        except Exception as e:
            logger.error(f"❌ Failed to load Common Voice dataset: {e}")
            return False
    
    def _normalize_sentence(self, sentence: str) -> str:
        """
        Normalize sentence for better matching
        
        Args:
            sentence: Original sentence
            
        Returns:
            str: Normalized sentence
        """
        # Convert to lowercase and strip whitespace
        normalized = sentence.lower().strip()
        
        # Remove extra spaces
        normalized = re.sub(r'\s+', ' ', normalized)
        
        # Remove punctuation for better matching
        normalized = re.sub(r'[^\w\s]', '', normalized)
        
        return normalized
    
    def find_audio_for_text(self, user_input: str) -> Optional[Dict]:
        """
        Find audio for user input with fuzzy matching
        
        Args:
            user_input: Text from user (word, phrase, or sentence)
            
        Returns:
            Dict with audio info if found, None otherwise
        """
        if not self.loaded:
            logger.warning("Common Voice system not loaded")
            return None
        
        normalized_input = self._normalize_sentence(user_input)
        
        # First try exact match
        if normalized_input in self.sentence_to_audio:
            return self.sentence_to_audio[normalized_input]
        
        # Try fuzzy matching
        best_match = self._find_best_fuzzy_match(normalized_input)
        if best_match:
            return best_match
        
        # Try partial matching (input is contained in a sentence)
        partial_match = self._find_partial_match(normalized_input)
        if partial_match:
            return partial_match
        
        logger.info(f"No audio found for: '{user_input}'")
        return None
    
    def _find_best_fuzzy_match(self, normalized_input: str, threshold: float = 0.8) -> Optional[Dict]:
        """
        Find best fuzzy match using similarity scoring
        
        Args:
            normalized_input: Normalized user input
            threshold: Minimum similarity threshold (0.0 to 1.0)
            
        Returns:
            Dict with audio info if good match found, None otherwise
        """
        best_score = 0
        best_match = None
        
        for sentence_key, audio_info in self.sentence_to_audio.items():
            # Calculate similarity
            similarity = SequenceMatcher(None, normalized_input, sentence_key).ratio()
            
            if similarity > best_score and similarity >= threshold:
                best_score = similarity
                best_match = audio_info
                
        if best_match:
            logger.info(f"Fuzzy match found with similarity {best_score:.2f}")
            
        return best_match
    
    def _find_partial_match(self, normalized_input: str) -> Optional[Dict]:
        """
        Find partial match where user input is contained in available sentences
        
        Args:
            normalized_input: Normalized user input
            
        Returns:
            Dict with audio info if partial match found, None otherwise
        """
        # Look for sentences that contain the user input
        for sentence_key, audio_info in self.sentence_to_audio.items():
            if normalized_input in sentence_key or sentence_key in normalized_input:
                logger.info(f"Partial match found: '{audio_info['original_sentence']}'")
                return audio_info
        
        return None
    
    def get_available_sentences(self) -> List[str]:
        """
        Get list of all available sentences for UI display
        
        Returns:
            List of available sentences
        """
        return self.available_sentences.copy()
    
    def get_sentences_by_category(self) -> Dict[str, List[str]]:
        """
        Get sentences organized by categories (for better UI organization)
        
        Returns:
            Dict mapping categories to lists of sentences
        """
        if not self.loaded:
            return {}
        
        # Simple categorization based on content and length
        categories = {
            'numbers': [],
            'short_words': [],
            'phrases': [],
            'long_sentences': []
        }
        
        # Number words in Kinyarwanda
        number_words = ['zeru', 'rimwe', 'kabiri', 'gatatu', 'kane', 'gatanu', 'gatandatu', 'karindwi', 'umunani', 'icyenda', 'icumi']
        
        for sentence in self.available_sentences:
            normalized = self._normalize_sentence(sentence)
            
            # Check if it's a number word
            if any(num in normalized for num in number_words):
                categories['numbers'].append(sentence)
            # Short single words
            elif len(sentence.split()) == 1 and len(sentence) <= 8:
                categories['short_words'].append(sentence)
            # Short phrases (2-4 words)
            elif len(sentence.split()) <= 4:
                categories['phrases'].append(sentence)
            # Longer sentences
            else:
                categories['long_sentences'].append(sentence)
        
        return categories
    
    def get_system_stats(self) -> Dict:
        """
        Get statistics about the loaded dataset
        
        Returns:
            Dict with system statistics
        """
        if not self.loaded:
            return {'loaded': False}
        
        return {
            'loaded': True,
            'total_audio_files': len(self.sentence_to_audio),
            'total_sentences': len(self.available_sentences),
            'dataset_path': str(self.dataset_path),
            'clips_path': str(self.clips_path)
        }


def test_common_voice_system():
    """Test function for the Common Voice Audio System"""
    
    print("🧪 Testing Common Voice Audio System...")
    
    # Initialize system
    cv_system = CommonVoiceAudioSystem()
    
    # Load dataset
    if cv_system.load_dataset():
        print("✅ Dataset loaded successfully")
        
        # Test some searches
        test_queries = [
            "gatanu",  # exact match
            "murwanda", # exact match
            "five",     # no match expected
            "zeru",     # exact match
            "amakuru",  # partial match
            "gumamurugo" # exact match
        ]
        
        print("\n🔍 Testing search queries:")
        for query in test_queries:
            result = cv_system.find_audio_for_text(query)
            if result:
                print(f"  '{query}' → Found: {result['original_sentence']} ({result['audio_filename']})")
            else:
                print(f"  '{query}' → No match found")
        
        # Show available sentences
        sentences = cv_system.get_available_sentences()
        print(f"\n📝 First 10 available sentences:")
        for i, sentence in enumerate(sentences[:10], 1):
            print(f"  {i}. {sentence}")
        
        # Show categories
        categories = cv_system.get_sentences_by_category()
        print(f"\n📂 Sentences by category:")
        for category, items in categories.items():
            print(f"  {category}: {len(items)} items")
            if items:
                print(f"    Examples: {items[:3]}")
        
        # Show stats
        stats = cv_system.get_system_stats()
        print(f"\n📊 System stats: {stats}")
        
    else:
        print("❌ Failed to load dataset")


if __name__ == "__main__":
    test_common_voice_system()