import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Player.css';
import back_arrow from '../../assets/back_arrow_icon.png';
import { useParams, useNavigate } from 'react-router-dom';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: '',
    description: '',
    published_at: '',
    key: ''
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODU3NzQ2NmUyYmMwNjQ3ZjA2OTQ0MWI2Y2NkMDUyYyIsIm5iZiI6MTcyMTY3NTEzNS45MTU3NTgsInN1YiI6IjY2OWVhYzY5YWVlNjdjYmEzN2RkMmMyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3SxaH5FyAB0_T3bhF-qUoaLZuTqzJ8QjlIvTaeyD44k'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(response => response.json())
      .then(response => {
        if (response.results && response.results.length > 0) {
          const videoData = response.results[0];
          setApiData({
            name: videoData.name,
            description: videoData.description || 'No description available',
            published_at: videoData.published_at || 'N/A',
            key: videoData.key
          });
        } else {
          setApiData({
            name: 'No Video Available',
            description: 'No description available',
            published_at: 'N/A',
            key: ''
          });
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  return (
    <motion.div 
      className="player"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="player-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.img 
          src={back_arrow} 
          alt="Back" 
          onClick={() => navigate(-1)} 
          className="back-arrow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {apiData.name}
        </motion.h2>
      </motion.div>
      <motion.div 
        className="player-content"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.div 
          className="video-container"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {apiData.key ? (
            <iframe
              src={`https://www.youtube.com/embed/${apiData.key}`}
              title='trailer'
              frameBorder="0"
              allowFullScreen
            />
          ) : (
            <p>No trailer available for this movie.</p>
          )}
        </motion.div>
        <motion.div 
          className="player-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <motion.p 
            className="description"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {apiData.description}
          </motion.p>
          <motion.p 
            className="published-date"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            Published: {apiData.published_at}
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Player;