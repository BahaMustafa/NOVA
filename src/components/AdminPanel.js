import React, { useState } from 'react';
import produceData from '../produceData.json';
import './AdminPanel.css';

const AdminPanel = ({ setProduceItems }) => {
  const [items, setItems] = useState(produceData);
  const [newItem, setNewItem] = useState({ name: '', code: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
    setIsValid(!!value.trim());
  };

  const handleAdd = () => {
    if (!newItem.name || !newItem.code) {
      setMessage('Please fill in both fields.');
      setIsValid(false);
      return;
    }
    setItems((prev) => [...prev, newItem]);
    setNewItem({ name: '', code: '' });
    setMessage('Item added successfully.');
    setIsValid(true);
  };

  const handleEdit = (index) => {
    setNewItem(items[index]);
    setEditingIndex(index);
    setMessage('');
    setIsValid(true);
  };

  const handleUpdate = () => {
    if (!newItem.name || !newItem.code) {
      setMessage('Please fill in both fields.');
      setIsValid(false);
      return;
    }
    setItems((prev) => {
      const updated = [...prev];
      updated[editingIndex] = newItem;
      return updated;
    });
    setNewItem({ name: '', code: '' });
    setEditingIndex(null);
    setMessage('Item updated successfully.');
    setIsValid(true);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems((prev) => prev.filter((_, i) => i !== index));
      setMessage('Item deleted successfully.');
    }
  };

  const handleSave = () => {
    setProduceItems(items);
    setMessage('Changes saved successfully.');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase()) || item.code.includes(filter)
  );

  const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      {message && <p className="message">{message}</p>}
      <div className="form">
        <input
          type="text"
          name="name"
          value={newItem.name}
          placeholder="Produce Name"
          onChange={handleInputChange}
          className={isValid ? '' : 'invalid'}
        />
        <input
          type="text"
          name="code"
          value={newItem.code}
          placeholder="Produce Code"
          onChange={handleInputChange}
          className={isValid ? '' : 'invalid'}
        />
        {editingIndex !== null ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={handleAdd}>Add</button>
        )}
      </div>
      <input
        type="text"
        placeholder="Search by name or code"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="search-bar"
      />
      <div className="items">
        {paginatedItems.map((item, index) => (
          <div key={index} className="item">
            <span>{item.name} - {item.code}</span>
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }, (_, i) => (
          <button key={i} onClick={() => handlePageChange(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default AdminPanel;
