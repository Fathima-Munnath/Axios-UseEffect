import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'; // Ensure this file is imported for the styles

const RickAndMortyFetcher = () => {
  const [dataType, setDataType] = useState('character'); // Default value: 'character'
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/${dataType}`);
        setItems(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dataType]);

  const handleSelectChange = (event) => {
    setDataType(event.target.value);
  };

  return (
    <div className="container">
      <h1 className="title">Rick and Morty API Fetcher</h1>
      <label htmlFor="dataTypeSelect" className="label">
        Select Data Type:
      </label>
      <select
        id="dataTypeSelect"
        value={dataType}
        onChange={handleSelectChange}
        className="select"
      >
        <option value="character">Characters</option>
        <option value="episode">Episodes</option>
        <option value="location">Locations</option>
      </select>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <ul className="list">
          {items.map((item) => (
            <li key={item.id} className="list-item">
              <span className="id">{item.id}</span>: {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RickAndMortyFetcher;
