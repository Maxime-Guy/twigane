#!/usr/bin/env python3
"""
Test script for Twigane Backend
Tests both teaching model and TTS integration
"""

import requests
import json
import time
import sys

# Backend URL
BASE_URL = "http://localhost:5001"

def test_health():
    """Test health endpoint"""
    print("🔍 Testing health endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Health check passed")
            print(f"  Teaching model: {'✅' if data['teaching_model'] else '❌'}")
            print(f"  TTS system: {'✅' if data['tts_system'] else '❌'}")
            print(f"  Available words: {data['available_words']}")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False

def test_teaching_questions():
    """Test teaching model questions"""
    print("\n📚 Testing teaching questions...")
    
    teaching_questions = [
        "How do you say hello in Kinyarwanda?",
        "What is the Kinyarwanda word for thank you?",
        "How do you greet someone in the morning?",
        "What does Muraho mean?",
        "Can you teach me basic Kinyarwanda greetings?"
    ]
    
    for i, question in enumerate(teaching_questions, 1):
        print(f"\n[{i}] Question: {question}")
        try:
            response = requests.post(f"{BASE_URL}/chat", json={"question": question})
            if response.status_code == 200:
                data = response.json()
                print(f"  Type: {data.get('type', 'unknown')}")
                print(f"  Response: {data.get('response', 'No response')[:100]}...")
                print(f"  Category: {data.get('category', 'N/A')}")
                print(f"  Difficulty: {data.get('difficulty', 'N/A')}")
                print(f"  ✅ Success")
            else:
                print(f"  ❌ Failed: {response.status_code}")
        except Exception as e:
            print(f"  ❌ Error: {e}")

def test_pronunciation_questions():
    """Test pronunciation/TTS questions"""
    print("\n🎵 Testing pronunciation questions...")
    
    pronunciation_questions = [
        'How does "Muraho" sound?',
        'How do you pronounce Mwaramutse?',
        'What does Amakuru sound like?',
        'Can you play the audio for Murakoze?',
        'How is Gatanu pronounced?'
    ]
    
    for i, question in enumerate(pronunciation_questions, 1):
        print(f"\n[{i}] Question: {question}")
        try:
            response = requests.post(f"{BASE_URL}/chat", json={"question": question})
            if response.status_code == 200:
                data = response.json()
                print(f"  Type: {data.get('type', 'unknown')}")
                print(f"  Word: {data.get('word', 'N/A')}")
                print(f"  Enhanced pronunciation: {data.get('enhanced_pronunciation', 'N/A')}")
                print(f"  Audio path: {data.get('audio_path', 'N/A')}")
                print(f"  Duration: {data.get('duration', 0):.2f}s")
                print(f"  ✅ Success")
            else:
                print(f"  ❌ Failed: {response.status_code}")
        except Exception as e:
            print(f"  ❌ Error: {e}")

def test_dedicated_endpoints():
    """Test dedicated endpoints"""
    print("\n🎯 Testing dedicated endpoints...")
    
    # Test teaching endpoint
    print("\n📚 Testing /teach endpoint:")
    try:
        response = requests.post(f"{BASE_URL}/teach", json={"question": "How do you say hello?"})
        if response.status_code == 200:
            data = response.json()
            print(f"  ✅ Teaching endpoint works")
            print(f"  Response: {data.get('response', 'No response')[:50]}...")
        else:
            print(f"  ❌ Teaching endpoint failed: {response.status_code}")
    except Exception as e:
        print(f"  ❌ Teaching endpoint error: {e}")
    
    # Test pronunciation endpoint
    print("\n🎵 Testing /pronounce endpoint:")
    try:
        response = requests.post(f"{BASE_URL}/pronounce", json={"word": "Muraho"})
        if response.status_code == 200:
            data = response.json()
            print(f"  ✅ Pronunciation endpoint works")
            print(f"  Word: {data.get('word', 'N/A')}")
            print(f"  Audio: {data.get('audio_path', 'N/A')}")
        else:
            print(f"  ❌ Pronunciation endpoint failed: {response.status_code}")
    except Exception as e:
        print(f"  ❌ Pronunciation endpoint error: {e}")

def test_stats():
    """Test statistics endpoint"""
    print("\n📊 Testing statistics endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/stats")
        if response.status_code == 200:
            data = response.json()
            print(f"  ✅ Stats endpoint works")
            print(f"  Teaching model loaded: {data['teaching_model']['loaded']}")
            print(f"  Teaching responses: {data['teaching_model']['responses_available']}")
            print(f"  TTS system loaded: {data['tts_system']['loaded']}")
            print(f"  TTS words available: {data['tts_system']['words_available']}")
        else:
            print(f"  ❌ Stats endpoint failed: {response.status_code}")
    except Exception as e:
        print(f"  ❌ Stats endpoint error: {e}")

def test_question_type_detection():
    """Test question type detection"""
    print("\n🤖 Testing question type detection...")
    
    test_cases = [
        ("How do you say hello?", "teaching"),
        ('How does "Muraho" sound?', "pronunciation"),
        ("What is the meaning of Amakuru?", "teaching"),
        ("Can you pronounce Mwaramutse?", "pronunciation"),
        ("How do you greet someone?", "teaching"),
        ("Play the audio for Gatanu", "pronunciation"),
        ("What does Murakoze mean?", "teaching"),
        ("How is Bitegeko pronounced?", "pronunciation")
    ]
    
    correct = 0
    total = len(test_cases)
    
    for question, expected_type in test_cases:
        try:
            response = requests.post(f"{BASE_URL}/chat", json={"question": question})
            if response.status_code == 200:
                data = response.json()
                detected_type = data.get('type', 'unknown')
                if detected_type == expected_type:
                    print(f"  ✅ '{question}' → {detected_type}")
                    correct += 1
                else:
                    print(f"  ❌ '{question}' → {detected_type} (expected {expected_type})")
            else:
                print(f"  ❌ '{question}' → Failed ({response.status_code})")
        except Exception as e:
            print(f"  ❌ '{question}' → Error: {e}")
    
    print(f"\n📊 Question type detection accuracy: {correct}/{total} ({correct/total*100:.1f}%)")

def main():
    """Run all tests"""
    print("🚀 Testing Twigane Backend")
    print("=" * 50)
    
    # Check if backend is running
    if not test_health():
        print("\n❌ Backend is not running or not healthy!")
        print("Please start the backend with: python backend/app.py")
        sys.exit(1)
    
    # Run tests
    test_teaching_questions()
    test_pronunciation_questions()
    test_dedicated_endpoints()
    test_stats()
    test_question_type_detection()
    
    print("\n🎉 All tests completed!")
    print("=" * 50)
    
    # Show integration examples
    print("\n📋 Frontend Integration Examples:")
    print("=" * 50)
    
    print("\n1. General chat endpoint:")
    print("""
    fetch('http://localhost:5001/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({question: 'How does Muraho sound?'})
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response:', data.response);
        if (data.type === 'pronunciation' && data.audio_path) {
            // Play audio
            const audio = new Audio(`http://localhost:5001/audio/${data.audio_path.split('/').pop()}`);
            audio.play();
        }
    });
    """)
    
    print("\n2. Direct pronunciation:")
    print("""
    fetch('http://localhost:5001/pronounce', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({word: 'Muraho'})
    })
    .then(response => response.json())
    .then(data => {
        if (data.audio_path) {
            const audio = new Audio(`http://localhost:5001/audio/${data.audio_path.split('/').pop()}`);
            audio.play();
        }
    });
    """)

if __name__ == "__main__":
    main() 