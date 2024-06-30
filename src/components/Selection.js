import React, { useState, useEffect } from 'react';
import produceData from '../produceData.json';
import { useNavigate } from 'react-router-dom';
import './Selection.css';

const Selection = ({ setSelectedItems }) => {
  const [selectedCodes, setSelectedCodes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(produceData);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredItems(
      produceData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.includes(searchTerm)
      )
    );
  }, [searchTerm]);

  const handleSelect = (code) => {
    setSelectedCodes((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const handleSaveAndStartQuiz = () => {
    if (selectedCodes.length === 0) {
      alert('Please select at least one item.');
      return;
    }
    const selectedItems = produceData.filter((item) =>
      selectedCodes.includes(item.code)
    );
    setSelectedItems(selectedItems);
    navigate('/quiz'); // Redirect to the quiz page
  };

  const handleSelectAll = () => {
    setSelectedCodes(produceData.map((item) => item.code));
  };

  const handleDeselectAll = () => {
    setSelectedCodes([]);
  };

  return (
    <div className="selection">
      <h2>Select Items for Quiz</h2>
      <input
        type="text"
        placeholder="Search by name or code"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="buttons">
        <button onClick={handleSelectAll}>Select All</button>
        <button onClick={handleDeselectAll}>Deselect All</button>
      </div>
      <div className="items">
        {filteredItems.map((item) => (
          <div
            key={item.code}
            className={`item ${selectedCodes.includes(item.code) ? 'selected' : ''}`}
            onClick={() => handleSelect(item.code)}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className="footer">
        <button onClick={handleSaveAndStartQuiz}>Save & Start Quiz</button>
        <p>Selected Items: {selectedCodes.length}</p>
      </div>
    </div>
  );
};

export default Selection;
