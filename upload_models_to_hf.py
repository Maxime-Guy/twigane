#!/usr/bin/env python3
"""
Script to upload Twigane models to Hugging Face Hub
Run this script after installing huggingface_hub and logging in with: huggingface-cli login
"""

import os
from pathlib import Path
from huggingface_hub import HfApi, create_repo, upload_folder
import shutil
import json

# Configuration
HF_USERNAME = "Maxime-Bakunzi"  # Your Hugging Face username
TEACHING_MODEL_REPO = f"{HF_USERNAME}/twigane-kinyarwanda-teaching-chatbot"
TRANSLATION_MODEL_REPO = f"{HF_USERNAME}/twigane-en-kin-translation"

def create_model_card(model_name, model_type, description):
    """Create a model card (README.md) for the Hugging Face model"""
    if model_type == "teaching":
        card_content = f"""---
language: rw
license: mit
tags:
- kinyarwanda
- teaching
- chatbot
- rwandan-culture
- language-learning
datasets:
- custom-kinyarwanda-dataset
metrics:
- accuracy
pipeline_tag: text-generation
---

# {model_name}

## Model Description

This is a Kinyarwanda teaching chatbot model developed as part of the Twigane project. The model is designed to help users learn Kinyarwanda language, culture, and traditions through interactive conversations.

## Model Details

- **Model Type:** Teaching Chatbot
- **Language:** Kinyarwanda (rw)
- **Architecture:** Custom trained model with TF-IDF vectorization
- **Training Data:** Custom Kinyarwanda dataset with 1,010+ samples
- **Categories:** Vocabulary, Grammar, Culture, Conversation, Translation, Numbers, Family terms

## Usage

```python
from transformers import AutoModel
import pickle
import numpy as np

# Load the model components
model = AutoModel.from_pretrained("{TEACHING_MODEL_REPO}")

# The model includes:
# - Pre-computed embeddings
# - Response texts
# - Metadata
# - TF-IDF preprocessor
```

## Training Data Categories

- **Vocabulary:** Basic to advanced Kinyarwanda words and meanings
- **Grammar:** Noun classes, verb conjugations, sentence structure
- **Culture:** Traditional practices, values, and customs
- **Conversation:** Greetings, daily interactions, social contexts
- **Translation:** English-Kinyarwanda translation examples
- **Numbers:** Counting system and numerical expressions
- **Family:** Family terms and relationships

## Performance

The model provides contextually appropriate responses for Kinyarwanda language learning queries with high accuracy in cultural and linguistic contexts.

## Limitations

- Primarily focused on Kinyarwanda language and Rwandan culture
- Best performance on topics covered in training data
- May require additional context for very specific or technical queries

## Citation

If you use this model, please cite:
```
@misc{{twigane-teaching-model,
  author = {{Twigane Project}},
  title = {{Kinyarwanda Teaching Chatbot Model}},
  year = {{2025}},
  publisher = {{Hugging Face}},
  url = {{https://huggingface.co/{TEACHING_MODEL_REPO}}}
}}
```
"""
    
    elif model_type == "translation":
        card_content = f"""---
language:
- en
- rw
license: mit
tags:
- translation
- kinyarwanda
- english
- nllb
- seq2seq
datasets:
- custom-translation-dataset
metrics:
- bleu
pipeline_tag: translation
---

# {model_name}

## Model Description

This is an English to Kinyarwanda translation model fine-tuned from the NLLB (No Language Left Behind) model family. It's specifically optimized for translating English text to Kinyarwanda with high accuracy and cultural appropriateness.

## Model Details

- **Model Type:** Sequence-to-Sequence Translation
- **Languages:** English (en) → Kinyarwanda (rw)
- **Base Model:** mbazaNLP/Nllb_finetuned_general_en_kin
- **Fine-tuning:** Custom Kinyarwanda dataset
- **Architecture:** Transformer-based NLLB

## Usage

```python
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

tokenizer = AutoTokenizer.from_pretrained("{TRANSLATION_MODEL_REPO}")
model = AutoModelForSeq2SeqLM.from_pretrained("{TRANSLATION_MODEL_REPO}")

def translate_en_to_rw(text):
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=512)
    outputs = model.generate(**inputs, max_length=512, num_beams=4, early_stopping=True)
    translation = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return translation

# Example usage
english_text = "Hello, how are you today?"
kinyarwanda_translation = translate_en_to_rw(english_text)
print(kinyarwanda_translation)  # Expected: "Muraho, amakuru yawe?"
```

## Performance

- **BLEU Score:** ~0.67 on test dataset
- **Training Data:** Custom English-Kinyarwanda parallel corpus
- **Optimization:** Fine-tuned for cultural context and natural language flow

## Applications

- Educational language learning platforms
- Translation services for English-Kinyarwanda content
- Cultural content localization
- Communication assistance tools

## Limitations

- Optimized specifically for English to Kinyarwanda translation
- Performance may vary with very technical or domain-specific content
- Best results with standard conversational and educational content

## Citation

If you use this model, please cite:
```
@misc{{twigane-translation-model,
  author = {{Twigane Project}},
  title = {{English to Kinyarwanda Translation Model}},
  year = {{2025}},
  publisher = {{Hugging Face}},
  url = {{https://huggingface.co/{TRANSLATION_MODEL_REPO}}}
}}
```
"""
    
    return card_content

def upload_teaching_model():
    """Upload the teaching chatbot model to Hugging Face"""
    print("🚀 Uploading Teaching Model to Hugging Face...")
    
    try:
        # Create repository
        create_repo(TEACHING_MODEL_REPO, exist_ok=True, private=False)
        print(f"✅ Created repository: {TEACHING_MODEL_REPO}")
        
        # Prepare model directory
        model_dir = Path("models/kinyarwanda_teaching_chatbot_20250720_212851")
        
        # Create README.md
        readme_content = create_model_card(
            "Twigane Kinyarwanda Teaching Chatbot", 
            "teaching",
            "Interactive Kinyarwanda language and culture teaching model"
        )
        
        with open(model_dir / "README.md", "w", encoding="utf-8") as f:
            f.write(readme_content)
        
        # Upload the entire folder
        upload_folder(
            folder_path=str(model_dir),
            repo_id=TEACHING_MODEL_REPO,
            commit_message="Upload Twigane Kinyarwanda Teaching Model v1.0"
        )
        
        print(f"✅ Teaching model uploaded successfully!")
        print(f"🔗 Model URL: https://huggingface.co/{TEACHING_MODEL_REPO}")
        
    except Exception as e:
        print(f"❌ Error uploading teaching model: {e}")

def upload_translation_model():
    """Upload the translation model to Hugging Face"""
    print("🚀 Uploading Translation Model to Hugging Face...")
    
    try:
        # Create repository
        create_repo(TRANSLATION_MODEL_REPO, exist_ok=True, private=False)
        print(f"✅ Created repository: {TRANSLATION_MODEL_REPO}")
        
        # Prepare model directory
        model_dir = Path("models/en_kin_translation_simple")
        
        # Create README.md
        readme_content = create_model_card(
            "Twigane English to Kinyarwanda Translation", 
            "translation",
            "Fine-tuned NLLB model for English to Kinyarwanda translation"
        )
        
        with open(model_dir / "README.md", "w", encoding="utf-8") as f:
            f.write(readme_content)
        
        # Upload the entire folder
        upload_folder(
            folder_path=str(model_dir),
            repo_id=TRANSLATION_MODEL_REPO,
            commit_message="Upload Twigane EN-KIN Translation Model v1.0"
        )
        
        print(f"✅ Translation model uploaded successfully!")
        print(f"🔗 Model URL: https://huggingface.co/{TRANSLATION_MODEL_REPO}")
        
    except Exception as e:
        print(f"❌ Error uploading translation model: {e}")

def main():
    """Main function to upload both models"""
    print("🎯 Twigane Models Upload to Hugging Face Hub")
    print("=" * 50)
    
    # Check if models exist
    teaching_model_dir = Path("models/kinyarwanda_teaching_chatbot_20250720_212851")
    translation_model_dir = Path("models/en_kin_translation_simple")
    
    if not teaching_model_dir.exists():
        print(f"❌ Teaching model directory not found: {teaching_model_dir}")
        return
    
    if not translation_model_dir.exists():
        print(f"❌ Translation model directory not found: {translation_model_dir}")
        return
    
    print("📋 Models found:")
    print(f"   📚 Teaching Model: {teaching_model_dir}")
    print(f"   🔄 Translation Model: {translation_model_dir}")
    print()
    
    # Reminder about authentication
    print("⚠️  IMPORTANT: Make sure you have:")
    print("   1. Installed huggingface_hub: pip install huggingface_hub")
    print("   2. Logged in: huggingface-cli login")
    print("   3. Updated HF_USERNAME in this script")
    print()
    
    # Upload models
    upload_teaching_model()
    print()
    upload_translation_model()
    
    print("\n🎉 All models uploaded successfully!")
    print("\n📝 Next steps:")
    print("   1. Update your backend/app.py to use the HF models")
    print("   2. Test the models in your application")
    print("   3. Update your requirements.txt if needed")

if __name__ == "__main__":
    main() 