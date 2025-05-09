import React from 'react';
import { motion } from 'framer-motion';
import './ArtCard.css';

const ArtCard = ({ art }) => {
  return (
    <motion.div
      className="card"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <img src={art.image} alt={art.title} />
      <h3>{art.title}</h3>
      <p>by {art.artist}</p>
    </motion.div>
  );
};

export default ArtCard;
