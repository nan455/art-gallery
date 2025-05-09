import React from 'react';
import './ArtCard.css';

const ArtCard = ({ art }) => {
  return (
    <div className="card">
      <img src={art.image} alt={art.title} />
      <h3>{art.title}</h3>
      <p>by {art.artist}</p>
    </div>
  );
};

export default ArtCard;
