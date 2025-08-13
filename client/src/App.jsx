import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import JsonFormatter from './pages/JsonFormatter';
import Base64Tool from './pages/Base64Tool';
import LoremGenerator from './pages/LoremGenerator';
import MarkdownEditor from './pages/MarkdownEditor';
import ColorPicker from './pages/ColorPicker';
import './App.css';
import QRGenerator from './pages/QRGenerator';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/json-formatter" element={<JsonFormatter />} />
            <Route path="/base64-tool" element={<Base64Tool />} />
            <Route path="/lorem-generator" element={<LoremGenerator />} />
            <Route path="/markdown-editor" element={<MarkdownEditor />} />
            <Route path="/cp" element={<ColorPicker />} />
            <Route path="/qr" element={<QRGenerator />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;