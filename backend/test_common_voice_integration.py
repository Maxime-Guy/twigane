#!/usr/bin/env python3
"""
Test script for Common Voice Integration
Tests the new Common Voice audio system end-to-end
"""

import sys
import requests
import json
from common_voice_audio import CommonVoiceAudioSystem

def test_common_voice_system():
    """Test the Common Voice Audio System directly"""
    print("🧪 Testing Common Voice Audio System...")
    
    # Initialize and load system
    cv_system = CommonVoiceAudioSystem()
    
    if not cv_system.load_dataset():
        print("❌ Failed to load Common Voice dataset")
        return False
    
    print("✅ Common Voice dataset loaded successfully")
    
    # Test some searches
    test_queries = [
        "gatanu",      # exact match (five)
        "murwanda",    # exact match (Rwanda)
        "zeru",        # exact match (zero)
        "amakuru",     # partial match (news)
        "hello",       # no match expected
        "kabiri",      # exact match (second)
        "icyenda"      # exact match (nine)
    ]
    
    print("\n🔍 Testing search queries:")
    for query in test_queries:
        result = cv_system.find_audio_for_text(query)
        if result:
            print(f"  ✅ '{query}' → Found: {result['original_sentence']} ({result['audio_filename']})")
        else:
            print(f"  ❌ '{query}' → No match found")
    
    # Show statistics
    stats = cv_system.get_system_stats()
    print(f"\n📊 System stats:")
    print(f"  Total audio files: {stats['total_audio_files']}")
    print(f"  Total sentences: {stats['total_sentences']}")
    
    # Show categories
    categories = cv_system.get_sentences_by_category()
    print(f"\n📂 Categories:")
    for category, items in categories.items():
        print(f"  {category}: {len(items)} items")
        if items:
            print(f"    Examples: {items[:3]}")
    
    return True

def test_backend_integration():
    """Test the backend API integration"""
    print("\n🌐 Testing Backend API Integration...")
    
    base_url = "http://localhost:5001"
    
    # Test available sentences endpoint
    try:
        print("Testing /available-sentences endpoint...")
        response = requests.get(f"{base_url}/available-sentences", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Available sentences endpoint working: {data['total']} sentences")
            print(f"   Categories: {list(data['categories'].keys())}")
        else:
            print(f"❌ Available sentences endpoint failed: {response.status_code}")
            print(f"   Response: {response.text}")
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Cannot connect to backend: {e}")
        print("   Make sure the backend is running on port 5001")
        return False
    
    # Test pronunciation requests with Common Voice words
    test_pronunciation_queries = [
        'How does "gatanu" sound?',
        'Pronounce "zeru"',
        'How is "murwanda" pronounced?',
        'What does "kabiri" sound like?',
        'Can you play "hello"?'  # This should show fallback message
    ]
    
    print("\n🎵 Testing pronunciation queries:")
    for query in test_pronunciation_queries:
        try:
            response = requests.post(
                f"{base_url}/chat", 
                json={"question": query},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                audio_url = data.get('audio_url', 'None')
                source = data.get('source', 'unknown')
                confidence = data.get('confidence', 0)
                
                print(f"  ✅ '{query}'")
                print(f"     → Audio URL: {audio_url}")
                print(f"     → Source: {source}")
                print(f"     → Confidence: {confidence}")
                
                if source == 'common_voice':
                    print(f"     → 🎙️ Native speaker recording!")
                elif source == 'tts_generated':
                    print(f"     → 🤖 Generated audio (fallback)")
                else:
                    print(f"     → ❌ No audio available")
                    
            else:
                print(f"  ❌ '{query}' → Failed: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            print(f"  ❌ '{query}' → Network error: {e}")
    
    return True

def test_audio_serving():
    """Test audio file serving"""
    print("\n🔊 Testing audio file serving...")
    
    base_url = "http://localhost:5001"
    
    # First get an available sentence to test
    try:
        response = requests.get(f"{base_url}/available-sentences", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data['sentences']:
                # Get the first available sentence
                first_sentence = data['sentences'][0]
                
                # Ask for pronunciation to get the audio filename
                pron_response = requests.post(
                    f"{base_url}/chat", 
                    json={"question": f'How does "{first_sentence}" sound?'},
                    timeout=10
                )
                
                if pron_response.status_code == 200:
                    pron_data = pron_response.json()
                    audio_url = pron_data.get('audio_url')
                    
                    if audio_url:
                        # Test the audio URL
                        audio_response = requests.get(f"{base_url}{audio_url}", timeout=10)
                        
                        if audio_response.status_code == 200:
                            print(f"✅ Audio serving works: {audio_url}")
                            print(f"   Content-Type: {audio_response.headers.get('Content-Type', 'Unknown')}")
                            print(f"   File size: {len(audio_response.content)} bytes")
                        else:
                            print(f"❌ Audio serving failed: {audio_response.status_code}")
                    else:
                        print("❌ No audio URL in response")
                else:
                    print("❌ Failed to get pronunciation response")
            else:
                print("❌ No sentences available for testing")
        else:
            print("❌ Failed to get available sentences")
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Audio serving test failed: {e}")

def main():
    """Run all tests"""
    print("🚀 Common Voice Integration Test Suite")
    print("=" * 50)
    
    # Test 1: Common Voice system directly
    if not test_common_voice_system():
        print("\n❌ Common Voice system test failed. Check your dataset path.")
        return
    
    # Test 2: Backend integration
    if not test_backend_integration():
        print("\n❌ Backend integration test failed. Make sure backend is running.")
        return
    
    # Test 3: Audio serving
    test_audio_serving()
    
    print("\n" + "=" * 50)
    print("🎉 Test suite completed!")
    print("\n💡 Tips:")
    print("   - Try asking 'What words can you pronounce?' in the chat")
    print("   - Look for native speaker recordings marked with 🎙️")
    print("   - Check voting information [👍X 👎Y] for Common Voice clips")
    print("   - Use 'Available Words' tool in the chat interface")

if __name__ == "__main__":
    main()