import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './ArtCard.css';

const ArtCard = ({ art }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/art/${encodeURIComponent(art.title)}`);
  };

  return (
    <motion.div
      className="card"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onClick={handleClick}
      style={{ cursor: 'pointer' }} // optional but user-friendly
    >
      <img src={art.image} alt={art.title} />
      <h3>{art.title}</h3>
      <p>by {art.artist}</p>
    </motion.div>
  );
};

export default ArtCard;
