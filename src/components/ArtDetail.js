// src/components/ArtDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import artworks from '../data/artworks'; // Make sure this path is correct

const generateAIDescription = (title) => {
  // Simulated AI-generated content
  if (title.toLowerCase().includes('sunset')) {
    return 'A serene depiction of nature’s transition, this sunset art evokes warmth and peaceful introspection.';
  } else if (title.toLowerCase().includes('mountain')) {
    return 'A bold representation of nature’s majesty, highlighting resilience and awe through towering peaks.';
  } else if (title.toLowerCase().includes('abstract')) {
    return 'A conceptual exploration that challenges perception and embraces visual chaos in calculated harmony.';
  } else {
    return `An imaginative piece, '${title}' reflects a blend of emotion, thought, and artistic intuition.`;
  }
};

function ArtDetail() {
  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title);

  // Try to find the matching artwork
  const art = artworks.find(a => a.title === decodedTitle);

  if (!art) {
    return <h2>Artwork not found</h2>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{art.title}</h1>
      <img src={art.image} alt={art.title} style={{ maxWidth: '500px', width: '100%' }} />
      <p><strong>Artist:</strong> {art.artist}</p>
      <h3>AI-Generated Insight</h3>
      <p>{generateAIDescription(art.title)}</p>
    </div>
  );
}

export default ArtDetail;
