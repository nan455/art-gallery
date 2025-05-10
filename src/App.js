import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import ArtCard from './components/ArtCard';
import artworks from './data/artworks';
import ArtDetail from './components/ArtDetail';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '10px' }}>Gallery</Link>
          <Link to="/admin">Admin Panel</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Art Gallery</h1>
                <div className="gallery">
                  {artworks.map(art => (
                    <ArtCard key={art.id} art={art} />
                  ))}
                </div>
              </>
            }
          />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/art/:title" element={<ArtDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
