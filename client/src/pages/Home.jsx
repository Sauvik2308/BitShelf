import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const tools = [
    {
      title: 'JSON Formatter',
      description: 'Format, validate, and beautify JSON data with syntax highlighting and error detection.',
      path: '/json-formatter',
      icon: '📋'
    },
    {
      title: 'Base64 Encoder/Decoder',
      description: 'Encode and decode Base64 strings quickly and efficiently for data analysis and processing.',
      path: '/base64-tool',
      icon: '🔐'
    },
    {
      title: 'Lorem Ipsum Generator',
      description: 'Generate placeholder text in various lengths for your design and development needs.',
      path: '/lorem-generator',
      icon: '📝'
    },
    {
      title: 'Markdown Editor',
      description: 'Write and preview Markdown with a live editor and real-time rendering.',
      path: '/markdown-editor',
      icon: '📄'
    },
    {
      title: 'Color Picker',
      description: 'Write and preview Markdown with a live editor and real-time rendering.',
      path: '/color-picker',
      icon: '🎨'    
    },
    {
      title: 'QR Code Generator',
      description: 'Write and preview Markdown with a live editor and real-time rendering.',
      path: '/qr-generator',
      icon: '🏾'    
    }
  ];

  return (
    <div className="container">
      <div className="text-center mb-3">
        <h1 className="page-title">Welcome to BitShelf</h1>
        <p className="page-subtitle">
          Your ultimate collection of developer tools. Everything you need in one place.
        </p>
      </div>

      <div className="grid grid-2">
        {tools.map((tool, index) => (
          <Link
            key={index}
            to={tool.path}
            className="tool-card"
            style={{ textDecoration: 'none' }}
          >
            <div className="card">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                {tool.icon}
              </div>
              <h3>{tool.title}</h3>
              <p>{tool.description}</p>
              <div style={{ marginTop: '1rem' }}>
                <span className="btn">Try Now →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center" style={{ marginTop: '4rem' }}>
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ color: 'var(--primary-brown)', marginBottom: '1rem' }}>
            Why Choose BitShelf?
          </h2>
          <div className="grid grid-3" style={{ textAlign: 'left' }}>
            <div>
              <h4 style={{ color: 'var(--primary-brown)', marginBottom: '0.5rem' }}>
                ⚡ Fast & Efficient
              </h4>
              <p style={{ color: 'var(--text-light)' }}>
                Lightning-fast tools that process your data instantly without any delays.
              </p>
            </div>
            <div>
              <h4 style={{ color: 'var(--primary-brown)', marginBottom: '0.5rem' }}>
                🔒 Privacy First
              </h4>
              <p style={{ color: 'var(--text-light)' }}>
                All processing happens locally in your browser. Your data never leaves your device.
              </p>
            </div>
            <div>
              <h4 style={{ color: 'var(--primary-brown)', marginBottom: '0.5rem' }}>
                📱 Responsive Design
              </h4>
              <p style={{ color: 'var(--text-light)' }}>
                Works perfectly on desktop, tablet, and mobile devices for on-the-go development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;