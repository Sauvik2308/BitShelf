import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo1 from "../assets/logo1.png"
import logo2 from "../assets/logo2.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          {/* <span className="brand-icon">🛠️</span> */}
          <span className="brand-icon"><img src={logo2} alt="Logo" className='navbar-logo'></img></span>
          BitShelf
        </Link>
        
        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="navbar-link" onClick={closeMobileMenu}>
            Home
          </Link>
          
          <div className="navbar-dropdown" ref={dropdownRef}>
            <button 
              className="navbar-link dropdown-toggle" 
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
            >
              Tools
              <span className={`dropdown-arrow ${isDropdownOpen ? 'active' : ''}`}>▼</span>
            </button>
            
            <div className={`dropdown-menu ${isDropdownOpen ? 'active' : ''}`}>
              <Link 
                to="/json-formatter" 
                className="dropdown-link" 
                onClick={closeMobileMenu}
              >
                JSON Formatter
              </Link>
              <Link 
                to="/base64-tool" 
                className="dropdown-link" 
                onClick={closeMobileMenu}
              >
                Base64 Tool
              </Link>
              <Link 
                to="/lorem-generator" 
                className="dropdown-link" 
                onClick={closeMobileMenu}
              >
                Lorem Generator
              </Link>
              <Link 
                to="/markdown-editor" 
                className="dropdown-link" 
                onClick={closeMobileMenu}
              >
                Markdown Editor
              </Link>
            </div>
          </div>
        </div>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className={`bar ${isOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isOpen ? 'active' : ''}`}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;