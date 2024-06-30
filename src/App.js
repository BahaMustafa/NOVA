import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import produceData from './produceData.json';
import Flashcards from './components/Flashcards';
import Quiz from './components/Quiz';
import RegisterDemo from './components/RegisterDemo';
import Selection from './components/Selection';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [produceItems, setProduceItems] = useState(produceData);
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Produce Code Memorizer</h1>
          <nav>
            <Link to="/flashcards">Flashcards</Link>
            <Link to="/quiz">Quiz</Link>
            <Link to="/register-demo">Register Demo</Link>
            <Link to="/selection">Custom Selection</Link>
            <Link to="/admin-panel">Admin Panel</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/flashcards" element={<Flashcards items={selectedItems.length ? selectedItems : produceItems} />} />
            <Route path="/quiz" element={<Quiz items={selectedItems.length ? selectedItems : produceItems} />} />
            <Route path="/register-demo" element={<RegisterDemo items={produceItems} />} />
            <Route path="/selection" element={<Selection setSelectedItems={setSelectedItems} />} />
            <Route path="/admin-panel" element={<AdminPanel setProduceItems={setProduceItems} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
