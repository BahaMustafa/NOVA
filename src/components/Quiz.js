import React, { useState, useEffect } from 'react';
import './Quiz.css';

const Quiz = ({ items }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    shuffleOptions();
  }, [questionIndex]);

  const shuffleOptions = () => {
    const currentQuestion = items[questionIndex];
    const options = [...items];
    options.sort(() => Math.random() - 0.5);
    const randomOptions = options.slice(0, 3); // Display 3 random options
    if (!randomOptions.includes(currentQuestion)) {
      randomOptions[Math.floor(Math.random() * 3)] = currentQuestion;
    }
    setShuffledOptions(randomOptions);
  };

  const handleAnswer = (code) => {
    if (code === items[questionIndex].code) {
      setScore(score + 1);
    }
    setSelectedAnswer(code);
    setTimeout(() => {
      setSelectedAnswer(null);
      setQuestionIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 1000);
  };

  const currentQuestion = items[questionIndex];

  return (
    <div className="quiz">
      <h2>Quiz</h2>
      <p>Question {questionIndex + 1} of {items.length}</p>
      <p>What is the code for: {currentQuestion.name}?</p>
      <div className="options">
        {shuffledOptions.map((item) => (
          <button
            key={item.code}
            onClick={() => handleAnswer(item.code)}
            className={selectedAnswer === item.code ? 'selected' : ''}
            disabled={!!selectedAnswer}
          >
            {item.code}
          </button>
        ))}
      </div>
      {selectedAnswer && (
        <p className="feedback">
          {selectedAnswer === currentQuestion.code ? 'Correct!' : 'Incorrect'}
        </p>
      )}
      <p>Score: {score}</p>
    </div>
  );
};

export default Quiz;
