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
      description: 'Encode and decode Base64 strings quickly and efficiently for data processing.',
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
    }
  ];

  return (
    <div className="retro-container">
      {/* Animated background elements */}
      <div className="retro-bg-elements">
        <div className="floating-shape shape1">◆</div>
        <div className="floating-shape shape2">●</div>
        <div className="floating-shape shape3">■</div>
        <div className="floating-shape shape4">▲</div>
        <div className="floating-shape shape5">★</div>
      </div>

      <div className="container">
        <div className="retro-header">
          <div className="glitch-wrapper">
            <h1 className="retro-title glitch" data-text="Welcome to BitShelf">
              Welcome to BitShelf
            </h1>
          </div>
          <div className="retro-subtitle-container">
            <div className="neon-border">
              <p className="retro-subtitle">
                <span className="typing-text">Your ultimate collection of developer tools</span>
                <span className="cursor">|</span>
              </p>
              <p className="retro-tagline">
                🌟 RADICAL TOOLS FOR RADICAL DEVELOPERS 🌟
              </p>
            </div>
          </div>
        </div>

        <div className="retro-tools-section">
          <h2 className="section-title">
            <span className="rainbow-text">◄ TOTALLY AWESOME TOOLS ►</span>
          </h2>
          
          <div className="retro-grid">
            {tools.map((tool, index) => (
              <Link
                key={index}
                to={tool.path}
                className="retro-tool-card"
                style={{ textDecoration: 'none' }}
              >
                <div className="retro-card">
                  <div className="card-header">
                    <div className="card-icon">
                      {tool.icon}
                    </div>
                    <div className="card-corner">●</div>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{tool.title}</h3>
                    <p className="card-description">{tool.description}</p>
                    <div className="card-footer">
                      <span className="retro-btn">
                        <span className="btn-text">TRY NOW</span>
                        <span className="btn-arrow">►</span>
                      </span>
                    </div>
                  </div>
                  <div className="card-scan-lines"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="retro-features-section">
          <div className="features-container">
            <h2 className="features-title">
              <span className="cyber-text">◄◄◄ WHY CHOOSE BITSHELF? ►►►</span>
            </h2>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h4 className="feature-title">FAST & EFFICIENT</h4>
                <div className="feature-separator">═══════════</div>
                <p className="feature-description">
                  Lightning-fast tools that process your data instantly without any delays.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h4 className="feature-title">PRIVACY FIRST</h4>
                <div className="feature-separator">═══════════</div>
                <p className="feature-description">
                  All processing happens locally in your browser. Your data never leaves your device.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h4 className="feature-title">RESPONSIVE DESIGN</h4>
                <div className="feature-separator">═══════════</div>
                <p className="feature-description">
                  Works perfectly on desktop, tablet, and mobile devices for on-the-go development.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="retro-footer">
          <div className="footer-text">
            <span className="blink">★</span> 
            WELCOME TO THE FUTURE OF DEVELOPMENT 
            <span className="blink">★</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');

        .retro-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #ff006e, #8338ec, #3a86ff, #06ffa5);
          background-size: 400% 400%;
          animation: gradientShift 8s ease infinite;
          position: relative;
          overflow-x: hidden;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .retro-bg-elements {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .floating-shape {
          position: absolute;
          font-size: 2rem;
          color: rgba(255, 255, 255, 0.1);
          animation: float 6s ease-in-out infinite;
        }

        .shape1 { top: 10%; left: 10%; animation-delay: 0s; }
        .shape2 { top: 20%; right: 15%; animation-delay: 1s; }
        .shape3 { bottom: 30%; left: 20%; animation-delay: 2s; }
        .shape4 { top: 60%; right: 25%; animation-delay: 3s; }
        .shape5 { bottom: 20%; right: 10%; animation-delay: 4s; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        .container {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .retro-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .glitch-wrapper {
          margin-bottom: 2rem;
        }

        .retro-title {
          font-family: 'Orbitron', monospace;
          font-size: 4rem;
          font-weight: 900;
          color: #00ff00;
          text-shadow: 
            0 0 5px #00ff00,
            0 0 10px #00ff00,
            0 0 15px #00ff00,
            0 0 20px #00ff00;
          margin: 0;
          position: relative;
        }

        .glitch {
          position: relative;
          animation: glitch 2s infinite;
        }

        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .glitch::before {
          animation: glitch-1 0.5s infinite;
          color: #ff00ff;
          z-index: -1;
        }

        .glitch::after {
          animation: glitch-2 0.5s infinite;
          color: #00ffff;
          z-index: -2;
        }

        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }

        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          10% { transform: translate(-2px, -2px); }
          20% { transform: translate(2px, 2px); }
        }

        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          30% { transform: translate(2px, -2px); }
          40% { transform: translate(-2px, 2px); }
        }

        .retro-subtitle-container {
          margin-top: 2rem;
        }

        .neon-border {
          border: 2px solid #ff00ff;
          border-radius: 10px;
          padding: 1.5rem;
          background: rgba(0, 0, 0, 0.7);
          box-shadow: 
            0 0 10px #ff00ff,
            inset 0 0 10px rgba(255, 0, 255, 0.1);
        }

        .retro-subtitle {
          font-family: 'Share Tech Mono', monospace;
          font-size: 1.5rem;
          color: #00ffff;
          margin: 0 0 1rem 0;
          text-shadow: 0 0 10px #00ffff;
        }

        .typing-text {
          display: inline-block;
        }

        .cursor {
          animation: blink 1s infinite;
          color: #00ffff;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .retro-tagline {
          font-family: 'Orbitron', monospace;
          font-size: 1.2rem;
          color: #ffff00;
          margin: 0;
          text-shadow: 0 0 10px #ffff00;
        }

        .retro-tools-section {
          margin-bottom: 4rem;
        }

        .section-title {
          text-align: center;
          margin-bottom: 3rem;
        }

        .rainbow-text {
          font-family: 'Orbitron', monospace;
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(45deg, #ff0000, #ff8800, #ffff00, #00ff00, #0088ff, #0000ff, #8800ff);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: rainbow 3s linear infinite;
          text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
        }

        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        .retro-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .retro-tool-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .retro-tool-card:hover {
          transform: translateY(-10px) scale(1.05);
        }

        .retro-card {
          background: linear-gradient(135deg, #1a1a2e, #16213e);
          border: 2px solid #00ff00;
          border-radius: 15px;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
          box-shadow: 
            0 0 20px rgba(0, 255, 0, 0.3),
            inset 0 0 20px rgba(0, 255, 0, 0.1);
          transition: all 0.3s ease;
        }

        .retro-card:hover {
          border-color: #ff00ff;
          box-shadow: 
            0 0 30px rgba(255, 0, 255, 0.5),
            inset 0 0 30px rgba(255, 0, 255, 0.1);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .card-icon {
          font-size: 3rem;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .card-corner {
          color: #00ff00;
          font-size: 1.5rem;
        }

        .card-content {
          color: #ffffff;
        }

        .card-title {
          font-family: 'Orbitron', monospace;
          font-size: 1.5rem;
          color: #00ffff;
          margin-bottom: 1rem;
          text-shadow: 0 0 10px #00ffff;
        }

        .card-description {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.9rem;
          line-height: 1.6;
          color: #cccccc;
          margin-bottom: 1.5rem;
        }

        .card-footer {
          text-align: center;
        }

        .retro-btn {
          font-family: 'Orbitron', monospace;
          font-weight: 700;
          background: linear-gradient(45deg, #ff006e, #8338ec);
          color: #ffffff;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 0 15px rgba(255, 0, 110, 0.5);
          transition: all 0.3s ease;
        }

        .retro-btn:hover {
          background: linear-gradient(45deg, #8338ec, #ff006e);
          box-shadow: 0 0 25px rgba(255, 0, 110, 0.8);
          transform: scale(1.1);
        }

        .btn-arrow {
          animation: bounce 1s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }

        .card-scan-lines {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 0, 0.03) 2px,
            rgba(0, 255, 0, 0.03) 4px
          );
          pointer-events: none;
        }

        .retro-features-section {
          margin-bottom: 4rem;
        }

        .features-container {
          background: rgba(0, 0, 0, 0.8);
          border: 2px solid #ffff00;
          border-radius: 20px;
          padding: 3rem;
          box-shadow: 0 0 30px rgba(255, 255, 0, 0.3);
        }

        .features-title {
          text-align: center;
          margin-bottom: 3rem;
        }

        .cyber-text {
          font-family: 'Orbitron', monospace;
          font-size: 2rem;
          font-weight: 700;
          color: #ffff00;
          text-shadow: 0 0 20px #ffff00;
          letter-spacing: 2px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          text-align: center;
          padding: 2rem;
          background: linear-gradient(135deg, #0f3460, #16213e);
          border: 1px solid #00ffff;
          border-radius: 15px;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          border-color: #ff00ff;
          box-shadow: 0 0 20px rgba(255, 0, 255, 0.5);
          transform: translateY(-5px);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .feature-title {
          font-family: 'Orbitron', monospace;
          font-size: 1.2rem;
          color: #00ff00;
          margin-bottom: 1rem;
          text-shadow: 0 0 10px #00ff00;
          letter-spacing: 1px;
        }

        .feature-separator {
          color: #ff00ff;
          font-family: monospace;
          margin-bottom: 1rem;
          font-size: 0.8rem;
        }

        .feature-description {
          font-family: 'Share Tech Mono', monospace;
          color: #cccccc;
          line-height: 1.6;
          font-size: 0.9rem;
        }

        .retro-footer {
          text-align: center;
          margin-top: 4rem;
          padding: 2rem;
        }

        .footer-text {
          font-family: 'Orbitron', monospace;
          font-size: 1.5rem;
          color: #ffff00;
          text-shadow: 0 0 15px #ffff00;
          letter-spacing: 2px;
        }

        .blink {
          animation: blink 1s infinite;
        }

        @media (max-width: 768px) {
          .retro-title {
            font-size: 2.5rem;
          }
          
          .rainbow-text {
            font-size: 1.8rem;
          }
          
          .retro-grid {
            grid-template-columns: 1fr;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
          }
          
          .container {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;