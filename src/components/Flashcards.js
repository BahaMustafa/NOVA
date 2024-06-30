import React, { useState, useEffect } from 'react';
import './Flashcards.css';

const Flashcards = ({ items }) => {
  const [index, setIndex] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [shuffledItems, setShuffledItems] = useState([...items]);

  useEffect(() => {
    let timer;
    if (autoAdvance) {
      timer = setTimeout(() => {
        handleNext();
      }, 3000); // Auto-advance every 3 seconds
    }
    return () => clearTimeout(timer);
  }, [index, autoAdvance]);

  const handleNext = () => {
    setShowCode(false);
    setIndex((prevIndex) => (prevIndex + 1) % shuffledItems.length);
  };

  const handlePrevious = () => {
    setShowCode(false);
    setIndex((prevIndex) => (prevIndex - 1 + shuffledItems.length) % shuffledItems.length);
  };

  const handleShuffle = () => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setShuffledItems(shuffled);
    setIndex(0);
    setShowCode(false);
  };

  const handleToggleAutoAdvance = () => {
    setAutoAdvance((prev) => !prev);
  };

  return (
    <div className="flashcards">
      <h2>Flashcards</h2>
      <div className={`card ${showCode ? 'flip' : ''}`} onClick={() => setShowCode(!showCode)}>
        <div className="card-inner">
          <div className="card-front">{shuffledItems[index].name}</div>
          <div className="card-back">{shuffledItems[index].code}</div>
        </div>
      </div>
      <div className="controls">
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
        <button onClick={handleShuffle}>Shuffle</button>
        <button onClick={handleToggleAutoAdvance}>
          {autoAdvance ? 'Stop Auto-Advance' : 'Start Auto-Advance'}
        </button>
      </div>
      <p>Card {index + 1} of {shuffledItems.length}</p>
    </div>
  );
};

export default Flashcards;
