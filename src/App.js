import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [beers, setBeers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://api.punkapi.com/v2/beers');
        const data = await response.json();
        setBeers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const filteredBeers = beers.filter(beer =>
    beer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Punk Beers</h1>
      <input
        type="text"
        placeholder="Search by beer name"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="beer-container">
        {filteredBeers.map(beer => (
          <div key={beer.id} className="beer-card">
            <img className='img' src={beer.image_url} alt={beer.name} />
            <h2>{beer.name}</h2>
            <p>{beer.tagline}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
