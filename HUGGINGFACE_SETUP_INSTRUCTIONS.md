# 🤗 Twigane Models on Hugging Face Hub

This guide will help you upload your Twigane models to Hugging Face Hub and configure your backend to use them directly from there.

## 📋 Prerequisites

1. **Hugging Face Account**: Create an account at [huggingface.co](https://huggingface.co)
2. **Access Token**: Generate a write access token from your HF settings
3. **Git LFS**: Make sure Git LFS is installed (for large model files)

## 🛠️ Step 1: Install Required Packages

```bash
pip install huggingface_hub transformers
```

## 🔑 Step 2: Login to Hugging Face

```bash
# Login using the CLI (recommended)
huggingface-cli login

# Or set your token as environment variable
export HUGGINGFACE_HUB_TOKEN="your_token_here"
```

## 📝 Step 3: Update Configuration

1. **Edit the upload script:**
   - Open `upload_models_to_hf.py`
   - Replace `"your-username"` with your actual Hugging Face username
   - The script will create repositories named:
     - `your-username/twigane-kinyarwanda-teaching-chatbot`
     - `your-username/twigane-en-kin-translation`

2. **Update backend configuration:**
   - Open `app_with_hf_models.py`
   - Replace `"your-username"` with your actual Hugging Face username

## 🚀 Step 4: Upload Models to Hugging Face

```bash
# Run the upload script
python upload_models_to_hf.py
```

The script will:
- ✅ Create repositories on Hugging Face
- ✅ Generate comprehensive model cards (README.md)
- ✅ Upload all model files
- ✅ Provide repository URLs

Expected output:
```
🎯 Twigane Models Upload to Hugging Face Hub
==================================================
📋 Models found:
   📚 Teaching Model: models/kinyarwanda_teaching_chatbot_20250720_212851
   🔄 Translation Model: models/en_kin_translation_simple

🚀 Uploading Teaching Model to Hugging Face...
✅ Created repository: your-username/twigane-kinyarwanda-teaching-chatbot
✅ Teaching model uploaded successfully!
🔗 Model URL: https://huggingface.co/your-username/twigane-kinyarwanda-teaching-chatbot

🚀 Uploading Translation Model to Hugging Face...
✅ Created repository: your-username/twigane-en-kin-translation
✅ Translation model uploaded successfully!
🔗 Model URL: https://huggingface.co/your-username/twigane-en-kin-translation

🎉 All models uploaded successfully!
```

## 🔄 Step 5: Switch Backend to Use HF Models

### Option A: Replace Current Backend
```bash
# Backup current backend
cp backend/app.py backend/app_local_backup.py

# Replace with HF version
cp app_with_hf_models.py backend/app.py
```

### Option B: Gradual Migration
```bash
# Test the new backend first
cd backend
python ../app_with_hf_models.py
```

## 📦 Step 6: Update Requirements

Add to your `backend/requirements.txt`:
```txt
huggingface_hub>=0.20.0
transformers>=4.36.0
torch>=2.1.0
```

Install new dependencies:
```bash
cd backend
pip install -r requirements.txt
```

## ✅ Step 7: Test the Integration

1. **Start the backend:**
   ```bash
   cd backend
   python app.py
   ```

2. **Check the logs for:**
   ```
   🔄 Loading teaching model from HF Hub: your-username/twigane-kinyarwanda-teaching-chatbot
   ✅ Teaching model loaded successfully from Hugging Face
   🔄 Loading translation model from HF Hub: your-username/twigane-en-kin-translation
   ✅ Translation model loaded successfully from Hugging Face
   ```

3. **Test endpoints:**
   ```bash
   # Test health check
   curl http://localhost:5001/health
   
   # Test chat
   curl -X POST http://localhost:5001/chat \
     -H "Content-Type: application/json" \
     -d '{"question": "How do you say hello in Kinyarwanda?", "user_email": "test@example.com"}'
   
   # Test translation
   curl -X POST http://localhost:5001/translate \
     -H "Content-Type: application/json" \
     -d '{"text": "Hello, how are you?"}'
   ```

## 🎯 Benefits of Using Hugging Face Models

### ✅ **Advantages:**
- **🌐 Universal Access**: Models accessible from anywhere
- **🚀 Easy Deployment**: No need to include large model files in deployments
- **📱 Scalability**: Automatic model caching and CDN distribution
- **🔄 Version Control**: Easy model versioning and updates
- **👥 Collaboration**: Share models with team members
- **💾 Storage Efficiency**: No local storage requirements
- **📊 Analytics**: Built-in download and usage statistics

### ⚡ **Performance:**
- **First Load**: Slightly slower (downloads model)
- **Subsequent Loads**: Fast (uses cache)
- **Memory**: Same performance as local models
- **Inference**: Identical speed

## 🔧 Configuration Options

### Environment Variables
You can configure models using environment variables:

```bash
# Set in your environment or .env file
export TWIGANE_TEACHING_MODEL="your-username/twigane-kinyarwanda-teaching-chatbot"
export TWIGANE_TRANSLATION_MODEL="your-username/twigane-en-kin-translation"
```

### Fallback Strategy
The backend includes automatic fallback:
1. **First**: Try your custom HF models
2. **Second**: Try local models
3. **Third**: Use base models from mbazaNLP

## 🛠️ Advanced Usage

### Private Models
To make models private:
```python
# In upload_models_to_hf.py, change:
create_repo(TEACHING_MODEL_REPO, exist_ok=True, private=True)  # Set private=True
```

### Custom Model Names
```python
# Use custom repository names:
TEACHING_MODEL_REPO = f"{HF_USERNAME}/my-custom-teaching-model"
TRANSLATION_MODEL_REPO = f"{HF_USERNAME}/my-custom-translation-model"
```

### Organization Models
```python
# Use organization repositories:
ORG_NAME = "your-organization"
TEACHING_MODEL_REPO = f"{ORG_NAME}/twigane-teaching-model"
```

## 🐛 Troubleshooting

### Common Issues:

1. **Authentication Error:**
   ```bash
   # Re-login to Hugging Face
   huggingface-cli login --token your_new_token
   ```

2. **Large File Error:**
   ```bash
   # Make sure Git LFS is installed
   git lfs install
   ```

3. **Download Issues:**
   ```bash
   # Clear HF cache
   python -c "from huggingface_hub import delete_cache_dir; delete_cache_dir()"
   ```

4. **Fallback to Local:**
   ```
   ❌ Failed to download custom teaching model: ...
   📂 Falling back to local model loading...
   ✅ Local fallback teaching model loaded successfully
   ```

### Debug Mode:
```python
# Add to your backend for detailed logging
import logging
logging.basicConfig(level=logging.DEBUG)
```

## 📚 Model Cards Generated

The upload script automatically creates comprehensive model cards with:

### Teaching Model Card:
- Model description and architecture
- Training data categories
- Usage examples
- Performance metrics
- Limitations and citations

### Translation Model Card:
- NLLB-based architecture details
- BLEU score performance
- Usage examples with code
- Applications and limitations
- Citation information

## 🎉 Next Steps

1. **Monitor Usage**: Check your HF model pages for download stats
2. **Update Models**: Upload new versions as you improve them
3. **Share**: Make your models available to the community
4. **Deploy**: Use in production with confidence

## 📞 Support

If you encounter issues:
1. Check the [Hugging Face documentation](https://huggingface.co/docs)
2. Review the backend logs for detailed error messages
3. Test with the fallback local models first
4. Ensure all dependencies are correctly installed

---

🎯 **Your Twigane models are now ready for global deployment via Hugging Face Hub!** 