import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Quiz.css';

const Quiz = () => {
  const { currentUser } = useAuth();
  
  // Quiz state management
  const [quizState, setQuizState] = useState('setup'); // setup, taking, results
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('mixed');
  const [selectedDifficulty, setSelectedDifficulty] = useState('mixed');
  const [numQuestions, setNumQuestions] = useState(10);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizResults, setQuizResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(null);
  const [quizStartTime, setQuizStartTime] = useState(null);

  // API configuration
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

  const loadCategories = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/quiz/categories`);
      const data = await response.json();
      
      if (response.ok) {
        setCategories(['mixed', ...data.categories]);
      } else {
        setError('Failed to load quiz categories');
      }
    } catch (err) {
      setError('Failed to connect to quiz service');
    }
  }, [API_URL]);

  const handleQuizSubmit = useCallback(async (finalAnswers = null) => {
    setLoading(true);
    
    const answersToSubmit = finalAnswers || userAnswers;
    const timeTaken = quizStartTime ? Math.floor((Date.now() - quizStartTime) / 1000) : 0;
    
    try {
      const response = await fetch(`${API_URL}/quiz/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quiz_questions: currentQuiz.questions,
          user_answers: answersToSubmit
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setQuizResults({
          ...data,
          time_taken: timeTaken,
          quiz_info: {
            category: currentQuiz.category,
            difficulty: currentQuiz.difficulty,
            total_questions: currentQuiz.total_questions
          }
        });
        setQuizState('results');
      } else {
        setError(data.error || 'Failed to submit quiz');
      }
    } catch (err) {
      setError('Failed to submit quiz');
    } finally {
      setLoading(false);
    }
  }, [userAnswers, currentQuiz, quizStartTime, API_URL]);

  // Load categories on component mount
  useEffect(() => {
    if (currentUser) {
      loadCategories();
    }
  }, [currentUser, loadCategories]);

  // Timer effect
  useEffect(() => {
    let timer;
    if (quizState === 'taking' && timeLeft !== null && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleQuizSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizState, timeLeft, handleQuizSubmit]);

  const startQuiz = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_URL}/quiz/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: selectedCategory,
          difficulty: selectedDifficulty,
          num_questions: numQuestions
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCurrentQuiz(data);
        setCurrentQuestionIndex(0);
        setUserAnswers(new Array(data.total_questions).fill(-1));
        setSelectedAnswer(null);
        setQuizState('taking');
        setQuizStartTime(Date.now());
        
        // Set timer based on number of questions (1 minute per question)
        setTimeLeft(data.total_questions * 60);
      } else {
        setError(data.error || 'Failed to generate quiz');
      }
    } catch (err) {
      setError('Failed to start quiz');
    } finally {
      setLoading(false);
    }
  };

  const selectAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const nextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestionIndex] = selectedAnswer;
      setUserAnswers(newAnswers);
      
      if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(userAnswers[currentQuestionIndex + 1] !== -1 ? userAnswers[currentQuestionIndex + 1] : null);
      } else {
        handleQuizSubmit(newAnswers);
      }
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestionIndex] = selectedAnswer !== null ? selectedAnswer : -1;
      setUserAnswers(newAnswers);
      
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(userAnswers[currentQuestionIndex - 1] !== -1 ? userAnswers[currentQuestionIndex - 1] : null);
    }
  };

  const resetQuiz = () => {
    setQuizState('setup');
    setCurrentQuiz(null);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedAnswer(null);
    setQuizResults(null);
    setError('');
    setTimeLeft(null);
    setQuizStartTime(null);
  };

  const retakeQuiz = () => {
    startQuiz();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPerformanceColor = (percentage) => {
    if (percentage >= 90) return '#10b981'; // green
    if (percentage >= 80) return '#3b82f6'; // blue
    if (percentage >= 70) return '#f59e0b'; // yellow
    if (percentage >= 60) return '#f97316'; // orange
    return '#ef4444'; // red
  };

  if (!currentUser) {
    return (
      <div className="quiz-page">
        <div className="auth-required">
          <h2>🔐 Authentication Required</h2>
          <p>Please sign in to access the quiz feature.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        
        {/* Quiz Setup */}
        {quizState === 'setup' && (
          <div className="quiz-setup">
            <div className="quiz-header">
              <h1>🧠 Kinyarwanda Knowledge Quiz</h1>
              <p>Test your Kinyarwanda skills with randomly generated questions</p>
            </div>

            <div className="quiz-config">
              <div className="config-section">
                <h3>📚 Quiz Category</h3>
                <div className="category-grid">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`category-btn ${selectedCategory === category ? 'selected' : ''}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category === 'mixed' ? '🎲 Mixed' : 
                       category === 'vocabulary' ? '📝 Vocabulary' :
                       category === 'grammar' ? '📖 Grammar' :
                       category === 'culture' ? '🏛️ Culture' :
                       category === 'pronunciation' ? '🗣️ Pronunciation' :
                       category === 'numbers' ? '🔢 Numbers' : category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="config-section">
                <h3>⚡ Difficulty Level</h3>
                <div className="difficulty-grid">
                  {['mixed', 'beginner', 'intermediate', 'advanced'].map((difficulty) => (
                    <button
                      key={difficulty}
                      className={`difficulty-btn ${selectedDifficulty === difficulty ? 'selected' : ''}`}
                      onClick={() => setSelectedDifficulty(difficulty)}
                    >
                      {difficulty === 'mixed' ? '🎲 Mixed' :
                       difficulty === 'beginner' ? '🟢 Beginner' :
                       difficulty === 'intermediate' ? '🟡 Intermediate' :
                       '🔴 Advanced'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="config-section">
                <h3>🔢 Number of Questions</h3>
                <div className="questions-selector">
                  <input
                    type="range"
                    min="5"
                    max="25"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                    className="questions-slider"
                  />
                  <span className="questions-count">{numQuestions} questions</span>
                </div>
                <p className="time-estimate">
                  ⏱️ Estimated time: {numQuestions} minutes
                </p>
              </div>

              <button
                onClick={startQuiz}
                disabled={loading}
                className="start-quiz-btn"
              >
                {loading ? '🔄 Generating Quiz...' : '🚀 Start Quiz'}
              </button>
            </div>

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}
          </div>
        )}

        {/* Quiz Taking */}
        {quizState === 'taking' && currentQuiz && (
          <div className="quiz-taking">
            <div className="quiz-progress">
              <div className="progress-header">
                <div className="question-counter">
                  Question {currentQuestionIndex + 1} of {currentQuiz.total_questions}
                </div>
                {timeLeft !== null && (
                  <div className={`timer ${timeLeft <= 60 ? 'warning' : ''}`}>
                    ⏰ {formatTime(timeLeft)}
                  </div>
                )}
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${((currentQuestionIndex + 1) / currentQuiz.total_questions) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="question-card">
              <div className="question-content">
                <h2 className="question-text">
                  {currentQuiz.questions[currentQuestionIndex].question}
                </h2>
                
                <div className="answer-options">
                  {currentQuiz.questions[currentQuestionIndex].options.map((option, index) => (
                    <button
                      key={index}
                      className={`answer-option ${selectedAnswer === index ? 'selected' : ''}`}
                      onClick={() => selectAnswer(index)}
                    >
                      <span className="option-letter">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="option-text">{option}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="question-navigation">
                <button
                  onClick={previousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="nav-btn prev-btn"
                >
                  ← Previous
                </button>
                
                <div className="question-dots">
                  {currentQuiz.questions.map((_, index) => (
                    <div
                      key={index}
                      className={`question-dot ${
                        index === currentQuestionIndex ? 'current' :
                        userAnswers[index] !== -1 ? 'answered' : 'unanswered'
                      }`}
                    ></div>
                  ))}
                </div>

                <button
                  onClick={nextQuestion}
                  disabled={selectedAnswer === null}
                  className="nav-btn next-btn"
                >
                  {currentQuestionIndex === currentQuiz.questions.length - 1 ? 'Finish' : 'Next →'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Results */}
        {quizState === 'results' && quizResults && (
          <div className="quiz-results">
            <div className="results-header">
              <h1>🎉 Quiz Completed!</h1>
              <div 
                className="score-circle"
                style={{ borderColor: getPerformanceColor(quizResults.percentage) }}
              >
                <span className="score-percentage">{quizResults.percentage}%</span>
                <span className="score-fraction">
                  {quizResults.correct_answers}/{quizResults.total_questions}
                </span>
              </div>
            </div>

            <div className="results-summary">
              <div className="summary-card">
                <h3>📊 Performance</h3>
                <p className="performance-text">
                  {quizResults.feedback}
                </p>
                <div className="performance-badge" style={{ backgroundColor: getPerformanceColor(quizResults.percentage) }}>
                  {quizResults.performance.replace('_', ' ').toUpperCase()}
                </div>
              </div>

              <div className="summary-card">
                <h3>⏱️ Quiz Details</h3>
                <div className="quiz-stats">
                  <div className="stat">
                    <span className="stat-label">Category:</span>
                    <span className="stat-value">{quizResults.quiz_info.category}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Difficulty:</span>
                    <span className="stat-value">{quizResults.quiz_info.difficulty}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Time taken:</span>
                    <span className="stat-value">{formatTime(quizResults.time_taken)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="results-details">
              <h3>📝 Detailed Results</h3>
              <div className="results-list">
                {quizResults.detailed_results.map((result, index) => (
                  <div key={result.question_id} className={`result-item ${result.is_correct ? 'correct' : 'incorrect'}`}>
                    <div className="result-header">
                      <span className="question-number">Q{index + 1}</span>
                      <span className={`result-icon ${result.is_correct ? 'correct' : 'incorrect'}`}>
                        {result.is_correct ? '✅' : '❌'}
                      </span>
                    </div>
                    
                    <div className="result-content">
                      <p className="result-question">{result.question}</p>
                      <div className="result-answers">
                        <div className="answer-line">
                          <strong>Your answer:</strong> 
                          <span className={result.is_correct ? 'correct' : 'incorrect'}>
                            {result.user_answer !== -1 ? result.options[result.user_answer] : 'No answer'}
                          </span>
                        </div>
                        {!result.is_correct && (
                          <div className="answer-line">
                            <strong>Correct answer:</strong> 
                            <span className="correct">{result.options[result.correct_answer]}</span>
                          </div>
                        )}
                      </div>
                      {result.explanation && (
                        <div className="explanation">
                          <strong>Explanation:</strong> {result.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="results-actions">
              <button onClick={retakeQuiz} className="action-btn retake-btn">
                🔄 Retake Quiz
              </button>
              <button onClick={resetQuiz} className="action-btn new-quiz-btn">
                ➕ New Quiz
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>Processing...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz; 