import React, { useState } from 'react';

const Base64Tool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');
  const [error, setError] = useState('');

  const encode = () => {
    try {
      if (!input.trim()) {
        setError('Please enter text to encode');
        setOutput('');
        return;
      }

      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
      setError('');
    } catch (err) {
      setError(`Encoding error: ${err.message}`);
      setOutput('');
    }
  };

  const decode = () => {
    try {
      if (!input.trim()) {
        setError('Please enter Base64 data to decode');
        setOutput('');
        return;
      }

      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
      setError('');
    } catch (err) {
      setError('Invalid Base64 data. Please check your input.');
      setOutput('');
    }
  };

  const handleProcess = () => {
    if (mode === 'encode') {
      encode();
    } else {
      decode();
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const copyOutput = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      alert('Copied to clipboard!');
    }
  };

  const swapInputOutput = () => {
    if (output) {
      setInput(output);
      setOutput('');
      setMode(mode === 'encode' ? 'decode' : 'encode');
      setError('');
    }
  };

  return (
    <div className="container">
      <div className="text-center mb-3">
        <h1 className="page-title">Base64 Encoder/Decoder</h1>
        <p className="page-subtitle">
          Encode and decode Base64 strings quickly and securely
        </p>
      </div>

      <div className="card">
        <div className="form-group">
          <div className="text-center mb-2">
            <div style={{ display: 'inline-flex', background: '#f8f9fa', borderRadius: '8px', padding: '4px' }}>
              <button
                className={`btn ${mode === 'encode' ? '' : 'btn-secondary'}`}
                onClick={() => setMode('encode')}
                style={{ 
                  background: mode === 'encode' ? 'var(--primary-brown)' : 'transparent',
                  color: mode === 'encode' ? 'white' : 'var(--primary-brown)',
                  border: 'none',
                  margin: '0',
                  borderRadius: '6px'
                }}
              >
                Encode
              </button>
              <button
                className={`btn ${mode === 'decode' ? '' : 'btn-secondary'}`}
                onClick={() => setMode('decode')}
                style={{ 
                  background: mode === 'decode' ? 'var(--primary-brown)' : 'transparent',
                  color: mode === 'decode' ? 'white' : 'var(--primary-brown)',
                  border: 'none',
                  margin: '0',
                  borderRadius: '6px'
                }}
              >
                Decode
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">
              {mode === 'encode' ? 'Text to Encode:' : 'Base64 to Decode:'}
            </label>
            <textarea
              className="form-textarea"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 data to decode...'}
              style={{ minHeight: '200px' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              {mode === 'encode' ? 'Base64 Output:' : 'Decoded Text:'}
            </label>
            <textarea
              className="form-textarea"
              value={output}
              readOnly
              placeholder={mode === 'encode' ? 'Base64 encoded data will appear here...' : 'Decoded text will appear here...'}
              style={{ minHeight: '200px', backgroundColor: '#f8f9fa' }}
            />
          </div>
        </div>

        {error && (
          <div style={{
            background: '#fee',
            color: '#c33',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            border: '1px solid #fcc'
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="text-center" style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn" onClick={handleProcess}>
              {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
            </button>
            <button className="btn btn-secondary" onClick={swapInputOutput}>
              Swap Input/Output
            </button>
            <button className="btn btn-secondary" onClick={copyOutput}>
              Copy Output
            </button>
            <button
              className="btn"
              onClick={clearAll}
              style={{ background: '#dc3545' }}
            >
              Clear All
            </button>
          </div>
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
          <h4 style={{ color: 'var(--primary-brown)', marginBottom: '1rem' }}>About Base64:</h4>
          <div className="grid grid-2" style={{ textAlign: 'left' }}>
            <div>
              <h5 style={{ color: 'var(--primary-brown)', marginBottom: '0.5rem' }}>Encoding</h5>
              <p style={{ color: 'var(--text-light)' }}>
                Converts text or binary data into a Base64 string format using A-Z, a-z, 0-9, +, and / characters.
              </p>
            </div>
            <div>
              <h5 style={{ color: 'var(--primary-brown)', marginBottom: '0.5rem' }}>Decoding</h5>
              <p style={{ color: 'var(--text-light)' }}>
                Converts Base64 encoded strings back to their original text or binary format.
              </p>
            </div>
          </div>
          <p style={{ color: 'var(--text-light)', marginTop: '1rem' }}>
            <strong>Common uses:</strong> Data transmission, email attachments, storing binary data in text format, 
            web APIs, and embedding images in HTML/CSS.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Base64Tool;