import React, { useState, useEffect } from 'react';
import './RegisterDemo.css';

const RegisterDemo = ({ items }) => {
  const [inputCode, setInputCode] = useState('');
  const [feedback, setFeedback] = useState('');
  const [productName, setProductName] = useState('');
  const [history, setHistory] = useState([]);
  const [attempts, setAttempts] = useState(0);

  const handleInputChange = (e) => {
    setInputCode(e.target.value);
  };

  const handleSubmit = () => {
    const item = items.find((item) => item.code === inputCode);
    if (item) {
      setFeedback('correct');
      setProductName(item.name);
      setHistory((prevHistory) => [...prevHistory, { code: inputCode, result: 'Correct' }]);
    } else {
      setFeedback('incorrect');
      setProductName('');
      setHistory((prevHistory) => [...prevHistory, { code: inputCode, result: 'Incorrect', correctCode: item?.code, correctName: item?.name }]);
    }
    setInputCode('');
    setAttempts(attempts + 1);
  };

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => {
        setFeedback('');
        setProductName('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  return (
    <div className="register-demo">
      <h2>Register Demo</h2>
      <div className="screen">
        {productName && <p>Product: {productName}</p>}
        {feedback === 'incorrect' && history.length > 0 && (
          <p>Correct Code: {history[history.length - 1].correctCode}, Product: {history[history.length - 1].correctName}</p>
        )}
      </div>
      <div className="input-section">
        <input
          type="text"
          value={inputCode}
          onChange={handleInputChange}
          placeholder="Enter produce code"
          className={feedback === 'correct' ? 'correct-input' : feedback === 'incorrect' ? 'incorrect-input' : ''}
        />
        <button onClick={handleSubmit}>Enter Code</button>
      </div>
      {feedback && (
        <div className={`feedback ${feedback}`}>
          <p>{feedback === 'correct' ? 'Correct!' : 'Try Again'}</p>
        </div>
      )}
      <div className="history">
        <h3>History</h3>
        <ul>
          {history.slice(-10).map((entry, index) => ( // Show only the last 10 entries
            <li key={index} className={entry.result === 'Correct' ? 'correct' : 'incorrect'}>
              Code: {entry.code}, Result: {entry.result}
              {entry.result === 'Incorrect' && (
                <span>, Correct Code: {entry.correctCode}, Product: {entry.correctName}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RegisterDemo;
