## Project Overview
Twigane is an intelligent voice- and text-enabled chatbot designed to teach Kinyarwanda language interactively. The system uses advanced NLP and machine learning techniques to provide personalized language learning experiences.

## Project Structure
```
twigane/
├── dataset/                    # Raw dataset files
│   └── cv-corpus-21.0-delta-2025-03-14/
│       └── rw/                # Kinyarwanda Common Voice data
├── features/                  # Processed features and cleaned data
│   ├── cleaned_dataset.csv
│   ├── text_features.csv
│   ├── audio_features.csv
│   ├── combined_features.csv
│   └── data_manifest.json
├── models/                    # Trained models
├── outputs/                   # Visualizations and analysis results
├── logs/                      # Training and processing logs
└── notebooks/                 # Jupyter notebooks
    └── data_exploration.ipynb
```

## Dataset Information
- **Source**: Mozilla Common Voice v21.0 (Kinyarwanda subset)
- **Audio Files**: MP3 format, various durations
- **Text Data**: Kinyarwanda sentences with metadata
- **Features**: Extracted text and audio features for ML training

## Features Extracted

### Text Features
- Character and word counts
- Average word length
- Vowel/consonant ratios
- Punctuation analysis
- Complexity scoring
- Readability metrics

### Audio Features
- MFCC coefficients (13 dimensions)
- Spectral centroid and bandwidth
- Zero-crossing rate
- Chroma features
- RMS energy
- Duration statistics

## Getting Started

### Prerequisites
Install required packages:
```bash
pip install -r requirements.txt
```

### Data Setup
1. Download the Common Voice Kinyarwanda dataset
2. Extract to `dataset/cv-corpus-21.0-delta-2025-03-14/rw/`
3. Run the data exploration notebook

### Usage
Open and run the Jupyter notebook:
```bash
jupyter notebook notebooks/data_exploration.ipynb
```

## Analysis Results
- Check `outputs/` directory for visualizations
- Review `features/data_manifest.json` for processing summary
- See `outputs/comprehensive_analysis_summary.json` for key statistics

## Model Architecture Plans
1. **Language Understanding**: Multi-task classification for difficulty, grammar, and intent
2. **Speech Recognition**: Fine-tuned Whisper model for Kinyarwanda
3. **Conversation Generation**: GPT-based model for teaching responses
4. **Integration**: WhatsApp bot for accessible deployment

## Contributing
This project is part of a capstone project focused on AI-powered language education for Kinyarwanda.

## License
Educational use only.