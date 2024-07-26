import React, { useState, useEffect } from 'react'
import './Navbar.css'
import logo from '../../assets/logo-nav.svg'

import profile from "../../assets/profile_img.png"
import caret from "../../assets/caret_icon.svg"
import { logout } from '../../firebase'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-content">
        <div className="navbar-left">
        <a href="/">
  <img src={logo} alt="logo" className='logo' style={{width: '50px', height: 'auto'}}/>
</a>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="#tv-shows">TV Shows</a></li>
            <li><a href="#movies">Movies</a></li>
            <li><a href="#new-and-popular">New & Popular</a></li>
            <li><a href="#my-list">My List</a></li>
          </ul>
        </div>
        <div className="navbar-right">
          <div className="nav-profile" onClick={toggleProfileDropdown}>
            <img src={profile} alt="Profile" className='profile'/>
            <img src={caret} alt="Dropdown" className='caret'/>
            {profileDropdownOpen && (
              <div className="profile-dropdown">
                <button onClick={logout}>Sign Out</button>
              </div>
            )}
          </div>
        </div>
        <div className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="/" onClick={toggleMobileMenu}>Home</a></li>
          <li><a href="#tv-shows" onClick={toggleMobileMenu}>TV Shows</a></li>
          <li><a href="#movies" onClick={toggleMobileMenu}>Movies</a></li>
          <li><a href="#new-and-popular" onClick={toggleMobileMenu}>New & Popular</a></li>
          <li><a href="#my-list" onClick={toggleMobileMenu}>My List</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar