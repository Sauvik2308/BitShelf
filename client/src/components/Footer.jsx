import React from 'react';
import './Footer.css';
import logo2 from "../assets/logo2.png"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-brand">
              <span className="brand-icon"><img src={logo2} alt="logo" className='footer-logo'></img></span>
              BitShelf
            </h3>
            <p className="footer-description">
              Your one-stop toolkit for all development needs. 
              Streamline your workflow with our collection of essential dev tools.
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-title">Tools</h4>
            <ul className="footer-links">
              <li><a href="/json-formatter">JSON Formatter</a></li>
              <li><a href="/base64-tool">Base64 Encoder/Decoder</a></li>
              <li><a href="/lorem-generator">Lorem Ipsum Generator</a></li>
              <li><a href="/markdown-editor">Markdown Editor</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 BitShelf. All rights reserved. Built with ❤️ for developers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;