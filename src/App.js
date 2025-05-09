import React from 'react';
import './App.css';
import ArtCard from './components/ArtCard';
import artworks from './data/artworks';

function App() {
  return (
    <div className="App">
      <h1>Art Gallery</h1>
      <div className="gallery">
        {artworks.map(art => (
          <ArtCard key={art.id} art={art} />
        ))}
      </div>
    </div>
  );
}

export default App;
