import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './TitleCard.css';
import { Link } from 'react-router-dom';

const TitleCard = ({ title, category }) => {
  const [data, setData] = useState([]);
  const cardsRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODU3NzQ2NmUyYmMwNjQ3ZjA2OTQ0MWI2Y2NkMDUyYyIsIm5iZiI6MTcyMTY3NTEzNS45MTU3NTgsInN1YiI6IjY2OWVhYzY5YWVlNjdjYmEzN2RkMmMyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3SxaH5FyAB0_T3bhF-qUoaLZuTqzJ8QjlIvTaeyD44k',
    },
  };

  useEffect(() => {
    const currentCardsRef = cardsRef.current;
    currentCardsRef.addEventListener('wheel', handleWheel);

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${category ? category : 'now_playing'}?language=en-US&page=1`,
          options
        );
        const result = await response.json();
        setData(result.results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    return () => {
      currentCardsRef.removeEventListener('wheel', handleWheel);
    };
  }, [category]);

  return (
    <motion.div
      className="title-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {title ? title : 'Popular Movies'}
      </motion.h2>
      <motion.div
        className="card-list"
        ref={cardsRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {data.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to={`/player/${card.id}`} style={{ textDecoration: 'none', color: 'white' }}>
              <div className="card">
                <motion.img
                  src={`https://image.tmdb.org/t/p/w500/${card.poster_path}`}
                  alt={card.poster_path}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                />
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.4, duration: 0.3 }}
                >
                  {card.original_title}
                </motion.p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default TitleCard;