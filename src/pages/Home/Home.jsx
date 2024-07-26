import React from "react";
import { motion } from "framer-motion";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import hero from "../../assets/hero_banner.jpg";
import title from "../../assets/hero_title.png";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import TitleCard from "../../components/TitleCard/TitleCard";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="home"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <Navbar />
      <motion.div className="hero" variants={fadeIn}>
        <motion.img
          src={hero}
          className="banner-img"
          alt="Hero Banner"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
        />
        <motion.div className="hero-caption" variants={staggerChildren}>
          <motion.img
            src={title}
            alt=""
            className="caption-img"
            variants={slideUp}
          />
          <motion.p variants={slideUp}>
            Discovering his ties to a secret ancient order, a young man living
            in modern Istanbul embarks on a quest to save the city from an
            immortal enemy.
          </motion.p>
          <motion.div className="hero-btns" variants={staggerChildren}>
            <motion.button
              className="btn-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={slideUp}
            >
              <img src={play_icon} alt="" />
              Play
            </motion.button>
            <motion.button
              className="btn-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={slideUp}
            >
              <img src={info_icon} alt="" />
              Information
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        className="more-cards"
        variants={staggerChildren}
        initial="hidden"
        animate="visible"
      >
        <motion.div id="tv-shows" variants={slideUp}>
          <TitleCard title={"Top Charts"} />
        </motion.div>
        <motion.div id="movies" variants={slideUp}>
          <TitleCard title={"Blockbuster Movies"} category={'popular'} />
        </motion.div>
        <motion.div id="new-and-popular" variants={slideUp}>
          <TitleCard title={"Only on Netflix"} category={"top_rated"} />
        </motion.div>
        <motion.div id="my-list" variants={slideUp}>
          <TitleCard title={"Upcoming"} category={"upcoming"} />
        </motion.div>
      </motion.div>
      <Footer />
    </motion.div>
  );
};

export default Home;